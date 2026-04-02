import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, ToggleLeft, ToggleRight, HelpCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelFAQ = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', category: 'Geral', sort_order: 0 });
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchItems(); }, []);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) { 
      console.error('Error fetching FAQ items:', err); 
    } finally { 
      setLoading(false); 
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ question: '', answer: '', category: 'Geral', sort_order: 0 });
    setShowModal(true);
  }

  function openEdit(item) {
    setEditing(item);
    setForm({ question: item.question, answer: item.answer, category: item.category || 'Geral', sort_order: item.sort_order || 0 });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      if (editing) {
        const { error } = await supabase
          .from('faqs')
          .update(form)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert(form);
        if (error) throw error;
      }
      setShowModal(false);
      fetchItems();
    } catch (err) { 
      console.error('Error saving FAQ:', err); 
      alert('Erro ao salvar FAQ.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Excluir esta pergunta?')) return;
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Error deleting FAQ:', err);
    }
  }

  async function toggleActive(item) {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !item.is_active })
        .eq('id', item.id);
      if (error) throw error;
      fetchItems();
    } catch (err) {
      console.error('Error toggling FAQ status:', err);
    }
  }

  async function handleSort(draggedId, droppedId) {
    const list = [...items];
    const draggedIndex = list.findIndex(i => i.id === draggedId);
    const droppedIndex = list.findIndex(i => i.id === droppedId);
    if (draggedIndex === droppedIndex) return;

    const item = list.splice(draggedIndex, 1)[0];
    list.splice(droppedIndex, 0, item);

    // Update locally for instant feedback
    setItems(list.map((it, idx) => ({ ...it, sort_order: idx + 1 })));

    // Send all updates to backend
    try {
      const { error } = await supabase
        .from('faqs')
        .upsert(updates);
      if (error) throw error;
    } catch (err) { 
      console.error('Error reordering FAQ:', err); 
    }
  }

  const [draggedItemId, setDraggedItemId] = useState(null);

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Perguntas Frequentes</h1>
          <p className="admin-page-subtitle">Arraste para reordenar as perguntas e respostas do FAQ.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={18} /> Nova Pergunta</button>
      </div>

      <div className="admin-card">
        {items.length === 0 ? (
          <div className="admin-placeholder">
            <HelpCircle size={48} />
            <h3>Nenhuma pergunta cadastrada</h3>
            <p>Clique em "Nova Pergunta" para adicionar ao FAQ.</p>
          </div>
        ) : (
          <div className="faq-list">
            {items.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(item => (
              <div 
                key={item.id} 
                className={`faq-item ${!item.is_active ? 'faq-inactive' : ''} ${draggedItemId === item.id ? 'dragging' : ''}`}
                draggable
                onDragStart={() => setDraggedItemId(item.id)}
                onDragEnd={() => setDraggedItemId(null)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleSort(draggedItemId, item.id)}
              >
                <div className="faq-drag-handle">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ display: 'block', width: '12px', height: '2px', background: 'var(--admin-text-muted)', opacity: 0.5 }}></span>
                    <span style={{ display: 'block', width: '12px', height: '2px', background: 'var(--admin-text-muted)', opacity: 0.5 }}></span>
                    <span style={{ display: 'block', width: '12px', height: '2px', background: 'var(--admin-text-muted)', opacity: 0.5 }}></span>
                  </div>
                </div>
                <div className="faq-item-content">
                  <div className="faq-question">{item.question}</div>
                  <div className="faq-answer">{item.answer}</div>
                  <div className="faq-meta">
                    <span className="tag">{item.category}</span>
                  </div>
                </div>
                <div className="faq-actions">
                  <button className="btn-icon" onClick={() => toggleActive(item)} title={item.is_active ? 'Desativar' : 'Ativar'}>
                    {item.is_active ? <ToggleRight size={20} style={{ color: 'var(--admin-success)' }} /> : <ToggleLeft size={20} />}
                  </button>
                  <button className="btn-icon" onClick={() => openEdit(item)} title="Editar"><Edit size={16} /></button>
                  <button className="btn-icon btn-danger" onClick={() => handleDelete(item.id)} title="Excluir"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Editar Pergunta' : 'Nova Pergunta'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-body">
              <div className="form-group">
                <label>Pergunta *</label>
                <input value={form.question} onChange={e => setForm({...form, question: e.target.value})} required placeholder="Ex: Como faço para reservar?" />
              </div>
              <div className="form-group">
                <label>Resposta *</label>
                <textarea rows="4" value={form.answer} onChange={e => setForm({...form, answer: e.target.value})} required placeholder="Resposta detalhada..." />
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

export default PainelFAQ;
