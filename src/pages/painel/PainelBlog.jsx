import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { supabase } from '../../lib/supabase';

const PainelBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', image_url: '', author: 'Admin', category: '', is_published: false });
  const [categories, setCategories] = useState([]);

  useEffect(() => { 
    fetchPosts(); 
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      
      if (error) {
        if (error.message?.includes('JWT') || error.code === 'PGRST301') {
          await supabase.auth.signOut();
          window.location.href = '/login';
          return;
        }
        throw error;
      }
      setCategories(data || []);
    } catch (err) { 
      console.error('Error fetching categories:', err); 
    }
  }

  const [errMessage, setErrMessage] = useState(null);

  async function fetchPosts() {
    try {
      setLoading(true);
      setErrMessage(null);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        if (error.message?.includes('JWT') || error.code === 'PGRST301') {
          await supabase.auth.signOut();
          window.location.href = '/login';
          return;
        }
        throw error;
      }
      setPosts(data || []);
    } catch (err) { 
      console.error('Error fetching posts:', err); 
      setErrMessage(err.message || JSON.stringify(err));
    } finally { 
      setLoading(false); 
    }
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', image_url: '', author: 'Admin', category: '', is_published: false });
    setShowModal(true);
  }

  async function openEdit(post) {
    try {
      setEditing(post);
      setForm({
        title: post.title,
        excerpt: post.excerpt || '',
        content: post.content || '',
        image_url: post.image_url || '',
        author: post.author || 'Admin',
        category: post.category || '',
        is_published: !!post.is_published
      });
      setShowModal(true);
    } catch (err) { console.error(err); }
  }

  async function handleSave(e) {
    e.preventDefault();
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const body = { ...form, slug };
    try {
      if (editing) {
        const { error } = await supabase.from('blog_posts').update(body).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(body);
        if (error) throw error;
      }
      setShowModal(false);
      fetchPosts();
    } catch (err) { 
      console.error('Error saving post:', err); 
      alert('Erro ao salvar post: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Excluir este post?')) return;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (publicUrl) setForm(f => ({ ...f, image_url: publicUrl }));
    } catch (err) { 
      console.error('Upload error:', err);
      alert('Erro no upload: ' + err.message);
    }
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
        {errMessage && <div style={{color: 'red', margin: '1rem', padding: '1rem', background: '#ffebee'}}>{errMessage}</div>}
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
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Sem Categoria</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
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
