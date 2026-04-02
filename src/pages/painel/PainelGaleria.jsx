import React, { useState, useEffect } from 'react';
import { Upload, Trash2, X, Save, Image as ImageIcon, Edit } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelGaleria = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ image_url: '', caption: '', category: 'Geral', sort_order: 0 });
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) { 
      console.error('Error fetching gallery items:', err); 
    } finally { 
      setLoading(false); 
    }
  }

  async function handleUpload(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        if (publicUrl) {
          const { error: insertError } = await supabase
            .from('gallery')
            .insert({
              image_url: publicUrl,
              caption: file.name.split('.')[0],
              category: 'Geral',
              sort_order: items.length + 1
            });
          if (insertError) throw insertError;
        }
      }
      fetchItems();
    } catch (err) { 
      console.error('Upload/Gallery error:', err);
      alert('Erro no upload ou ao salvar na galeria.');
    } finally { 
      setUploading(false); 
      e.target.value = ''; 
    }
  }

  function openEdit(item) {
    setEditing(item);
    setForm({ image_url: item.image_url, caption: item.caption || '', category: item.category || 'Geral', sort_order: item.sort_order || 0 });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('gallery')
        .update(form)
        .eq('id', editing.id);
      if (error) throw error;
      setShowModal(false);
      fetchItems();
    } catch (err) {
      console.error('Error saving gallery item:', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remover esta imagem?')) return;
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Galeria</h1>
          <p className="admin-page-subtitle">Gerencie as imagens do site.</p>
        </div>
        <label className="admin-btn admin-btn-primary" style={{ cursor: 'pointer' }}>
          <Upload size={18} /> {uploading ? 'Enviando...' : 'Fazer Upload'}
          <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleUpload} disabled={uploading} />
        </label>
      </div>

      {items.length === 0 ? (
        <div className="admin-card">
          <div className="admin-placeholder">
            <ImageIcon size={48} />
            <h3>Galeria vazia</h3>
            <p>Faça upload de imagens para começar.</p>
          </div>
        </div>
      ) : (
        <div className="gallery-grid">
          {items.map(item => (
            <div key={item.id} className="gallery-item admin-card">
              <div className="gallery-thumb">
                <img src={item.image_url} alt={item.caption || ''} />
                <div className="gallery-overlay">
                  <button className="btn-icon" onClick={() => openEdit(item)} title="Editar"><Edit size={18} /></button>
                  <button className="btn-icon btn-danger" onClick={() => handleDelete(item.id)} title="Excluir"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="gallery-info">
                <span className="cell-main">{item.caption || 'Sem legenda'}</span>
                <span className="tag">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Imagem</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-body">
              {form.image_url && <img src={form.image_url} alt="Preview" className="upload-preview" style={{ marginBottom: '1rem' }} />}
              <div className="form-group">
                <label>Legenda</label>
                <input value={form.caption} onChange={e => setForm({...form, caption: e.target.value})} placeholder="Legenda da imagem" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Categoria</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Geral" />
                </div>
                <div className="form-group">
                  <label>Ordem</label>
                  <input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: parseInt(e.target.value) || 0})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="admin-btn admin-btn-primary"><Save size={16} /> Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelGaleria;
