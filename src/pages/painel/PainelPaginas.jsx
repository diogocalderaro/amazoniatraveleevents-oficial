import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';

const PainelPaginas = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchPages(); }, []);

  async function fetchPages() {
    try {
      const res = await fetch('/api/pages', { headers });
      if (res.ok) setPages(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function selectPage(page) {
    setSelected(page);
    try {
      const data = JSON.parse(page.content_json || '{}');
      setContent(data.html || '');
    } catch {
      setContent('');
    }
    setSaved(false);
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    try {
      await fetch(`/api/pages/${selected.slug}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ title: selected.title, content_json: JSON.stringify({ html: content }) })
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Páginas</h1>
          <p className="admin-page-subtitle">Edite o conteúdo das páginas do site.</p>
        </div>
        {selected && (
          <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? 'Salvando...' : saved ? 'Salvo ✓' : 'Salvar Alterações'}
          </button>
        )}
      </div>

      {/* Page List Section */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome da Página</th>
                <th>Slug</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(p => (
                <tr key={p.id} className={selected?.id === p.id ? 'row-selected' : ''}>
                  <td className="cell-main">{p.title}</td>
                  <td className="cell-sub">{p.slug}</td>
                  <td>
                    <button className="admin-btn admin-btn-secondary btn-sm" onClick={() => selectPage(p)}>
                      <FileText size={14} /> {selected?.id === p.id ? 'Editando' : 'Editar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected ? (
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="card-header" style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--admin-border)' }}>
            <h3 style={{ margin: 0, fontSize: '0.9rem' }}>Editando: {selected.title}</h3>
          </div>
          <RichTextEditor value={content} onChange={setContent} placeholder="Edite o conteúdo da página aqui..." />
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-placeholder">
            <FileText size={48} />
            <h3>Selecione uma página acima</h3>
            <p>Clique no botão editar de uma das páginas da lista para começar.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelPaginas;
