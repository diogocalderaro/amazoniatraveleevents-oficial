import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Save, FileText } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';

const PainelBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image_url: '', author: 'Admin', category: '', is_published: false });
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      const res = await fetch('/api/blog', { headers });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', image_url: '', author: 'Admin', category: '', is_published: false });
    setShowModal(true);
  }

  async function openEdit(post) {
    try {
      const res = await fetch(`/api/blog/${post.id}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setEditing(data);
        setForm({ title: data.title, excerpt: data.excerpt || '', content: data.content || '', image_url: data.image_url || '', author: data.author || 'Admin', category: data.category || '', is_published: !!data.is_published });
        setShowModal(true);
      }
    } catch (err) { console.error(err); }
  }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const body = { ...form, slug };
    try {
      if (editing) {
        await fetch(`/api/blog/${editing.id}`, { method: 'PUT', headers, body: JSON.stringify(body) });
      } else {
        await fetch('/api/blog', { method: 'POST', headers, body: JSON.stringify(body) });
      }
      setShowModal(false);
      fetchPosts();
    } catch (err) { console.error(err); }
  }

  async function handleDelete(id) {
    if (!confirm('Excluir este post?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE', headers });
    fetchPosts();
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
      const data = await res.json();
      if (data.url) setForm(f => ({ ...f, image_url: data.url }));
    } catch (err) { console.error(err); }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Blog</h1>
          <p className="admin-page-subtitle">Gerencie os posts do blog.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={18} /> Novo Post</button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoria</th>
                <th>Autor</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>
                    <div className="cell-with-img">
                      {post.image_url && <img src={post.image_url} alt="" className="row-thumb" />}
                      <div>
                        <div className="cell-main">{post.title}</div>
                        <div className="cell-sub">{post.excerpt?.substring(0, 60)}...</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="tag">{post.category || '-'}</span></td>
                  <td className="cell-sub">{post.author}</td>
                  <td>
                    <span className={`status-badge ${post.is_published ? 'status-success' : 'status-warning'}`}>
                      {post.is_published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td className="cell-sub">{new Date(post.created_at).toLocaleDateString('pt-BR')}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon" onClick={() => openEdit(post)} title="Editar"><Edit size={16} /></button>
                      <button className="btn-icon btn-danger" onClick={() => handleDelete(post.id)} title="Excluir"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!posts.length && <tr><td colSpan="6" className="empty-row">Nenhum post criado ainda.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Editor Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-fullscreen" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Editar Post' : 'Novo Post'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-body blog-editor-form">
              <div className="blog-editor-main">
                <div className="form-group">
                  <label>Título *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Título do post" className="input-lg" />
                </div>
                <div className="form-group">
                  <label>Resumo</label>
                  <textarea rows="2" value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} placeholder="Breve descrição do post..." />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Conteúdo</label>
                  <RichTextEditor value={form.content} onChange={content => setForm(f => ({...f, content}))} placeholder="Escreva o conteúdo do post aqui..." />
                </div>
              </div>
              <div className="blog-editor-sidebar">
                <div className="form-group">
                  <label>Imagem de Capa</label>
                  <div className="upload-area">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    {form.image_url && <img src={form.image_url} alt="Preview" className="upload-preview" />}
                  </div>
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="Natureza, Dicas..." />
                </div>
                <div className="form-group">
                  <label>Autor</label>
                  <input value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} />
                    <span>Publicar imediatamente</span>
                  </label>
                </div>
                <div className="modal-footer" style={{ flexDirection: 'column' }}>
                  <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%' }}><Save size={16} /> Salvar</button>
                  <button type="button" className="admin-btn admin-btn-secondary" style={{ width: '100%' }} onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelBlog;
