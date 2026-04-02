import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelBlogCategorias = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '' });
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (err) { 
      console.error('Error fetching categories:', err); 
    } finally { 
      setLoading(false); 
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ name: '', slug: '' });
    setShowModal(true);
  }

  function openEdit(cat) {
    setEditing(cat);
    setForm({ name: cat.name, slug: cat.slug });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const body = { ...form, slug };
    try {
      if (editing) {
        const { error } = await supabase
          .from('blog_categories')
          .update(body)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_categories')
          .insert(body);
        if (error) throw error;
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) { 
      console.error('Error saving category:', err); 
      alert('Erro ao salvar categoria.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Excluir esta categoria?')) return;
    try {
      const { error } = await supabase
        .from('blog_categories')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categorias do Blog</h1>
          <p className="admin-page-subtitle">Gerencie as categorias dos posts.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={18} /> Nova Categoria</button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Slug</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td className="cell-main">{cat.name}</td>
                  <td className="cell-sub">{cat.slug}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon" onClick={() => openEdit(cat)} title="Editar"><Edit size={16} /></button>
                      <button className="btn-icon btn-danger" onClick={() => handleDelete(cat.id)} title="Excluir"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!categories.length && <tr><td colSpan="3" className="empty-row">Nenhuma categoria criada ainda.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Editar Categoria' : 'Nova Categoria'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-body">
              <div className="form-group">
                <label>Nome *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Ex: Natureza" autoFocus />
              </div>
              <div className="form-group">
                <label>Slug (opcional)</label>
                <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} placeholder="ex-natureza" />
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

export default PainelBlogCategorias;
