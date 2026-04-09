import React, { useState, useEffect } from 'react';
import { Check, X, Trash2, MessageCircle, Star, Filter, Plus, Edit, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelComentarios = () => {
  const [comments, setComments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ author_name: '', author_email: '', content: '', rating: 5, is_approved: true, package_id: null });
  const token = localStorage.getItem('admin_token');

  useEffect(() => { 
    fetchComments(); 
    fetchPackages();
  }, [filter]);

  async function fetchPackages() {
    const { data } = await supabase.from('packages').select('id, title');
    setPackages(data || []);
  }

  async function fetchComments() {
    try {
      setLoading(true);
      let query = supabase.from('comments').select('*').order('created_at', { ascending: false });
      
      if (filter === 'approved') query = query.eq('is_approved', true);
      if (filter === 'pending') query = query.eq('is_approved', false);

      const { data, error } = await query;
      if (error) throw error;
      setComments(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  function openCreate() {
    setEditing(null);
    setForm({ author_name: '', author_email: '', content: '', rating: 5, is_approved: true, package_id: null });
    setShowModal(true);
  }

  function openEdit(c) {
    setEditing(c);
    setForm({ 
      author_name: c.author_name, 
      author_email: c.author_email || '', 
      content: c.content, 
      rating: c.rating, 
      is_approved: !!c.is_approved,
      package_id: c.package_id || null
    });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      // Find package title if package_id set
      const pkgTitle = form.package_id ? packages.find(p => p.id === form.package_id)?.title : 'Testemunho Geral';
      const payload = { ...form, package_title: pkgTitle };

      if (editing) {
        const { error } = await supabase.from('comments').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('comments').insert(payload);
        if (error) throw error;
      }
      setShowModal(false);
      fetchComments();
    } catch (err) { console.error(err); }
  }

  async function approve(id) {
    await supabase.from('comments').update({ is_approved: true }).eq('id', id);
    fetchComments();
  }

  async function reject(id) {
    await supabase.from('comments').update({ is_approved: false }).eq('id', id);
    fetchComments();
  }

  async function handleDelete(id) {
    if (!confirm('Excluir este comentário?')) return;
    await supabase.from('comments').delete().eq('id', id);
    fetchComments();
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Comentários</h1>
          <p className="admin-page-subtitle">Modere e gerencie as avaliações dos clientes.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={18} /> Novo Comentário</button>
      </div>

      <div className="filter-tabs">
        {[{ key: 'all', label: 'Todos' }, { key: 'pending', label: 'Pendentes' }, { key: 'approved', label: 'Aprovados' }].map(f => (
          <button key={f.key} className={`filter-tab ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {comments.length === 0 ? (
        <div className="admin-card">
          <div className="admin-placeholder">
            <MessageCircle size={48} />
            <h3>Nenhum comentário</h3>
            <p>Os comentários dos clientes aparecerão aqui.</p>
          </div>
        </div>
      ) : (
        <div className="comments-list">
          {comments.map(c => (
            <div key={c.id} className={`admin-card comment-card ${!c.is_approved ? 'comment-pending' : ''}`}>
              <div className="comment-header">
                <div>
                  <span className="comment-author">{c.author_name}</span>
                  {c.author_email && <span className="cell-sub" style={{ marginLeft: '0.5rem' }}>({c.author_email})</span>}
                </div>
                <div className="comment-meta">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={14} fill={s <= c.rating ? '#FFD700' : 'none'} color={s <= c.rating ? '#FFD700' : 'var(--admin-text-muted)'} />
                    ))}
                  </div>
                  <span className="cell-sub">{new Date(c.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              {c.package_title && <div className="comment-package">Pacote: <strong>{c.package_title}</strong></div>}
              <div className="comment-content">{c.content}</div>
              <div className="comment-actions">
                <span className={`status-badge ${c.is_approved ? 'status-success' : 'status-warning'}`}>
                  {c.is_approved ? 'Aprovado' : 'Pendente'}
                </span>
                <div className="action-btns">
                  <button className="btn-icon" onClick={() => openEdit(c)} title="Editar"><Edit size={16} /></button>
                  {!c.is_approved && (
                    <button className="admin-btn admin-btn-success btn-sm" onClick={() => approve(c.id)}><Check size={14} /> Aprovar</button>
                  )}
                  {c.is_approved && (
                    <button className="admin-btn admin-btn-secondary btn-sm" onClick={() => reject(c.id)}><X size={14} /> Rejeitar</button>
                  )}
                  <button className="btn-icon btn-danger" onClick={() => handleDelete(c.id)}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Editar Comentário' : 'Novo Comentário'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-body">
              <div className="form-group">
                <label>Autor *</label>
                <input value={form.author_name} onChange={e => setForm({...form, author_name: e.target.value})} required placeholder="Nome do cliente" />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" value={form.author_email} onChange={e => setForm({...form, author_email: e.target.value})} placeholder="cliente@email.com" />
              </div>
              <div className="form-group">
                <label>Vincular a um Passeio (opcional)</label>
                <select value={form.package_id || ''} onChange={e => setForm({...form, package_id: e.target.value || null})}>
                  <option value="">-- Testemunho Geral (Home) --</option>
                  {packages.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Avaliação (1-5)</label>
                <select value={form.rating} onChange={e => setForm({...form, rating: parseInt(e.target.value)})}>
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Estrelas</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Comentário *</label>
                <textarea rows="4" value={form.content} onChange={e => setForm({...form, content: e.target.value})} required placeholder="Escreva a avaliação aqui..." />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={form.is_approved} onChange={e => setForm({...form, is_approved: e.target.checked})} />
                  <span>Aprovado (visível no site)</span>
                </label>
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

export default PainelComentarios;
