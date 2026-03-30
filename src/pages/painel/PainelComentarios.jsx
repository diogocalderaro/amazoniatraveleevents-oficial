import React, { useState, useEffect } from 'react';
import { Check, X, Trash2, MessageCircle, Star, Filter } from 'lucide-react';

const PainelComentarios = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchComments(); }, [filter]);

  async function fetchComments() {
    try {
      const params = filter !== 'all' ? `?approved=${filter === 'approved' ? 1 : 0}` : '';
      const res = await fetch(`/api/comments${params}`, { headers });
      if (res.ok) setComments(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function approve(id) {
    await fetch(`/api/comments/${id}/approve`, { method: 'PUT', headers });
    fetchComments();
  }

  async function reject(id) {
    await fetch(`/api/comments/${id}/reject`, { method: 'PUT', headers });
    fetchComments();
  }

  async function handleDelete(id) {
    if (!confirm('Excluir este comentário?')) return;
    await fetch(`/api/comments/${id}`, { method: 'DELETE', headers });
    fetchComments();
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Comentários</h1>
          <p className="admin-page-subtitle">Modere os comentários e avaliações dos clientes.</p>
        </div>
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
    </div>
  );
};

export default PainelComentarios;
