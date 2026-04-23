import React, { useState, useEffect } from 'react';
import { Save, FileText, Edit, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import RichTextEditor from '../../components/admin/RichTextEditor';
import { supabase } from '../../lib/supabase';

const PainelPaginas = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [view, setView] = useState('list'); // 'list' or 'edit'

  useEffect(() => { fetchPages(); }, []);

  async function fetchPages() {
    try {
      setLoading(true);
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
    setView('edit');
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
      setTimeout(() => {
        setSaved(false);
        setView('list');
        fetchPages();
      }, 1500);
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
      {view === 'list' ? (
        <>
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Gerenciar Páginas</h1>
              <p className="admin-page-subtitle">Personalize o conteúdo das páginas institucionais.</p>
            </div>
          </div>

          <div className="admin-card">
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nome da Página</th>
                    <th>URL Amigável (Slug)</th>
                    <th>Última Atualização</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="cell-with-img">
                          <div className="row-icon-box"><FileText size={18} /></div>
                          <div className="cell-main">{p.title}</div>
                        </div>
                      </td>
                      <td className="cell-sub">{p.slug}</td>
                      <td className="cell-sub">{p.updated_at ? new Date(p.updated_at).toLocaleDateString('pt-BR') : '-'}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-icon" onClick={() => selectPage(p)} title="Editar Conteúdo">
                            <Edit size={16} />
                          </button>
                          <Link 
                            to={p.slug === 'politica-de-privacidade' || p.slug === 'termos-de-uso' ? `/${p.slug}` : `/pagina/${p.slug}`} 
                            target="_blank" 
                            className="btn-icon" 
                            title="Ver no Site"
                          >
                            <ExternalLink size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!pages.length && <tr><td colSpan="4" className="empty-row">Nenhuma página encontrada.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="admin-page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="admin-btn admin-btn-secondary btn-sm" onClick={() => setView('list')} style={{ padding: '0.5rem' }}>
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="admin-page-title" style={{ fontSize: '1.25rem' }}>Editando: {selected.title}</h1>
                <p className="admin-page-subtitle">Modifique o conteúdo HTML da página.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="admin-btn admin-btn-secondary" onClick={() => setView('list')}>Cancelar</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                <Save size={16} /> {saving ? 'Salvando...' : saved ? 'Salvo ✓' : 'Salvar Alterações'}
              </button>
            </div>
          </div>

          <div className="admin-card" style={{ padding: 0, overflow: 'hidden', minHeight: '600px' }}>
            <RichTextEditor value={content} onChange={setContent} placeholder="Edite o conteúdo da página aqui..." />
          </div>
        </>
      )}
      
      <style>{`
        .row-icon-box {
          background: #f1f5f9;
          color: #64748b;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          alignItems: center;
          justifyContent: center;
          margin-right: 12px;
        }
        .row-selected {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default PainelPaginas;
