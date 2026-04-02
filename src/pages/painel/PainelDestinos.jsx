import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const PainelDestinos = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchPackages(); }, []);

  async function fetchPackages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPackages(data || []);
    } catch (err) { 
      console.error('Error fetching packages:', err); 
    } finally { 
      setLoading(false); 
    }
  }

  function openCreate() {
    navigate('/painel/destinos/novo');
  }

  function openEdit(pkg) {
    navigate(`/painel/destinos/${pkg.id}`);
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir este pacote?')) return;
    try {
      const { error } = await supabase.from('packages').delete().eq('id', id);
      if (error) throw error;
      fetchPackages();
    } catch (err) {
      console.error('Error deleting package:', err);
      alert('Erro ao excluir pacote.');
    }
  }

  async function handleToggle(id) {
    const pkg = packages.find(p => p.id === id);
    if (!pkg) return;
    try {
      const { error } = await supabase
        .from('packages')
        .update({ is_active: !pkg.is_active })
        .eq('id', id);
      
      if (error) throw error;
      fetchPackages();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Destinos & Pacotes</h1>
          <p className="admin-page-subtitle">Gerencie todos os pacotes de viagem com detalhes completos.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={18} /> Novo Pacote</button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pacote</th>
                <th>Local</th>
                <th>Preço Base</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.id}>
                  <td>
                    <div className="cell-with-img">
                      {pkg.image_url && <img src={pkg.image_url} alt="" className="row-thumb" />}
                      <div className="cell-main">{pkg.title}</div>
                    </div>
                  </td>
                  <td><div className="cell-sub"><MapPin size={14} /> {pkg.location}</div></td>
                  <td className="cell-money">
                    {pkg.price_display || `R$ ${(pkg.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  </td>
                  <td><span className="tag">{pkg.category || '-'}</span></td>
                  <td>
                    <button className="btn-icon" onClick={() => handleToggle(pkg.id)} title={pkg.is_active ? 'Desativar' : 'Ativar'}>
                      {pkg.is_active ? <ToggleRight size={22} style={{ color: 'var(--admin-success)' }} /> : <ToggleLeft size={22} style={{ color: 'var(--admin-text-muted)' }} />}
                    </button>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon" onClick={() => openEdit(pkg)} title="Editar Detalhes">
                        <Edit size={16} />
                      </button>
                      <Link to={`/passeio/${pkg.slug || pkg.id}`} target="_blank" className="btn-icon" title="Ver no Site">
                        <ExternalLink size={16} />
                      </Link>
                      <button className="btn-icon btn-danger" onClick={() => handleDelete(pkg.id)} title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!packages.length && <tr><td colSpan="6" className="empty-row">Nenhum pacote cadastrado. Clique em "Novo Pacote" para começar.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PainelDestinos;
