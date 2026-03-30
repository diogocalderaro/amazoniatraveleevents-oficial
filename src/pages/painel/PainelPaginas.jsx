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

      {/* Page Tabs */}
      <div className="filter-tabs" style={{ marginBottom: '1.5rem' }}>
        {pages.map(p => (
          <button key={p.id} className={`filter-tab ${selected?.id === p.id ? 'active' : ''}`} onClick={() => selectPage(p)}>
            <FileText size={16} /> {p.title}
          </button>
        ))}
      </div>

      {selected ? (
        <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
          <RichTextEditor value={content} onChange={setContent} placeholder="Edite o conteúdo da página aqui..." />
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-placeholder">
            <FileText size={48} />
            <h3>Selecione uma página</h3>
            <p>Clique em uma das abas acima para editar o conteúdo.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelPaginas;
