import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { supabase } from '../../lib/supabase';

const PainelPaginas = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchPages(); }, []);

  async function fetchPages() {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('title');
      
      if (error) throw error;
      setPages(data || []);
    } catch (err) {
      console.error('Error fetching pages:', err);
    } finally {
      setLoading(false);
    }
  }

  async function selectPage(page) {
    setSelected(page);
    try {
      const parsed = typeof page.content_json === 'string' 
        ? JSON.parse(page.content_json || '{}') 
        : (page.content_json || {});
      setContent(parsed.html || '');
    } catch {
      setContent('');
    }
    setSaved(false);
  }

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('pages')
        .update({ 
          content_json: JSON.stringify({ html: content }),
          updated_at: new Date().toISOString()
        })
        .eq('id', selected.id);
      
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving page:', err);
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setSaving(false);
    }
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
              {pages.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--admin-text-muted)' }}>
                    Nenhuma página cadastrada.
                  </td>
                </tr>
              )}
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
