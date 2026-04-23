import React, { useState, useEffect } from 'react';
import { Search, Eye, Check, X, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelReservas = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchReservations(); }, [statusFilter, search]);

  async function fetchReservations() {
    try {
      setLoading(true);
      let query = supabase.from('reservations').select('*');
      
      if (statusFilter !== 'todos') {
        query = query.eq('status', statusFilter);
      }
      
      if (search) {
        query = query.or(`customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,package_title.ilike.%${search}%,token.ilike.%${search}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      setReservations(data || []);
    } catch (err) { 
      console.error('Error fetching reservations:', err); 
    } finally { 
      setLoading(false); 
    }
  }

  async function updateStatus(id, status) {
    try {
      const { error } = await supabase.from('reservations').update({ status }).eq('id', id);
      if (error) throw error;
      fetchReservations();
      if (selected?.id === id) setSelected({ ...selected, status });
    } catch (err) {
      console.error('Error updating reservation status:', err);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Remover esta reserva?')) return;
    try {
      const { error } = await supabase.from('reservations').delete().eq('id', id);
      if (error) throw error;
      fetchReservations();
      if (selected?.id === id) setSelected(null);
    } catch (err) {
      console.error('Error deleting reservation:', err);
    }
  }

  const statusColors = { pendente: '#f59e0b', confirmada: '#10b981', cancelada: '#ef4444', concluida: '#3b82f6' };
  const statusIcons = { pendente: Clock, confirmada: CheckCircle, cancelada: XCircle, concluida: CheckCircle };
  const statusLabels = { pendente: 'Pendente', confirmada: 'Confirmada', cancelada: 'Cancelada', concluida: 'Concluída' };

  const statCounts = {
    todos: reservations.length,
    pendente: reservations.filter(r => r.status === 'pendente').length,
    confirmada: reservations.filter(r => r.status === 'confirmada').length,
    cancelada: reservations.filter(r => r.status === 'cancelada').length,
  };

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Reservas</h1>
          <p className="admin-page-subtitle">Gerencie as reservas feitas pelo site.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {['todos', 'pendente', 'confirmada', 'cancelada'].map(s => (
          <button key={s} className={`filter-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
            {s === 'todos' ? 'Todas' : statusLabels[s]}
            <span className="filter-count">{statCounts[s]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="admin-card" style={{ marginBottom: '1rem', padding: '0.75rem 1rem' }}>
        <div className="search-input-wrapper" style={{ width: '100%' }}>
          <Search size={18} className="search-icon" />
          <input className="search-input" style={{ width: '100%', borderRadius: '8px' }} placeholder="Buscar por código (AMZ-...), nome, email ou pacote..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Pacote</th>
                <th>Data Viagem</th>
                <th>Token</th>
                <th>Pessoas</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr 
                  key={r.id} 
                  className={selected?.id === r.id ? 'row-selected' : ''} 
                  onClick={() => setSelected(r)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>
                    <div className="cell-main">{r.customer_name}</div>
                    <div className="cell-sub">{r.customer_phone}</div>
                  </td>
                  <td className="cell-main">{r.package_title || '-'}</td>
                  <td className="cell-sub">{r.travel_date ? new Date(r.travel_date).toLocaleDateString('pt-BR') : '-'}</td>
                  <td><strong style={{ letterSpacing: '1px', fontFamily: 'monospace' }}>{r.token || '-'}</strong></td>
                  <td>{r.guests}</td>
                  <td className="cell-money">R$ {(r.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColors[r.status] + '20', color: statusColors[r.status] }}>
                      {statusLabels[r.status] || r.status}
                    </span>
                  </td>
                  <td onClick={e => e.stopPropagation()}>
                    <div className="action-btns">
                      <button className="btn-icon" title="Ver detalhes" onClick={() => setSelected(r)}><Eye size={16} /></button>
                      {r.status === 'pendente' && (
                        <>
                          <button className="btn-icon btn-success" title="Confirmar" onClick={() => updateStatus(r.id, 'confirmada')}><Check size={16} /></button>
                          <button className="btn-icon btn-danger" title="Cancelar" onClick={() => updateStatus(r.id, 'cancelada')}><X size={16} /></button>
                        </>
                      )}
                      <button className="btn-icon btn-danger" title="Excluir" onClick={() => handleDelete(r.id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!reservations.length && <tr><td colSpan="7" className="empty-row">Nenhuma reserva encontrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Slideover */}
      {selected && (
        <div className="side-panel-overlay" onClick={() => setSelected(null)}>
          <div className="side-panel" onClick={e => e.stopPropagation()}>
            <div className="side-panel-header">
              <div>
                <span className="side-panel-tag">RESERVA #{selected.id.toString().slice(-6).toUpperCase()}</span>
                <h2 className="side-panel-title">{selected.customer_name}</h2>
              </div>
              <button className="btn-close" onClick={() => setSelected(null)}><X size={24} /></button>
            </div>
            
            <div className="side-panel-body">
              <div className="info-section">
                <div className="status-container" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="status-badge-large" style={{ backgroundColor: statusColors[selected.status] + '20', color: statusColors[selected.status] }}>
                    {statusLabels[selected.status]}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <div className="cell-sub" style={{ fontSize: '0.75rem' }}>Token de Check-in</div>
                    <div style={{ fontWeight: 900, fontSize: '1.25rem', fontFamily: 'monospace', letterSpacing: '1px' }}>{selected.token || '---'}</div>
                  </div>
                </div>

                <div className="info-group">
                  <label>Pacote</label>
                  <div className="info-value-highlight">{selected.package_title || '-'}</div>
                </div>

                <div className="info-grid">
                  <div className="info-group">
                    <label>Data da Viagem</label>
                    <div className="info-value">{selected.travel_date ? new Date(selected.travel_date).toLocaleDateString('pt-BR') : '-'}</div>
                  </div>
                  <div className="info-group">
                    <label>Quantidade de Pessoas</label>
                    <div className="info-value">{selected.guests} {selected.guests > 1 ? 'Pessoas' : 'Pessoa'}</div>
                  </div>
                </div>

                <div className="divider"></div>

                <h3 className="sub-title">Dados do Cliente</h3>
                <div className="info-group">
                  <label>WhatsApp / Telefone</label>
                  <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selected.customer_phone}
                    <a href={`https://wa.me/${selected.customer_phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="wa-link">Abrir Conversa</a>
                  </div>
                </div>
                <div className="info-group">
                  <label>E-mail</label>
                  <div className="info-value">{selected.customer_email || 'Não informado'}</div>
                </div>

                <div className="divider"></div>

                <div className="total-box">
                  <label>Valor Total da Reserva</label>
                  <div className="total-value">R$ {(selected.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                </div>

                {selected.notes && (
                  <>
                    <div className="divider"></div>
                    <div className="info-group">
                      <label>Observações</label>
                      <div className="info-notes">{selected.notes}</div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="side-panel-footer">
              <div className="footer-actions">
                {selected.status === 'pendente' && (
                  <>
                    <button className="admin-btn admin-btn-success w-full" onClick={() => updateStatus(selected.id, 'confirmada')}><CheckCircle size={18} /> Confirmar Reserva</button>
                    <button className="admin-btn admin-btn-danger w-full" onClick={() => updateStatus(selected.id, 'cancelada')}><XCircle size={18} /> Cancelar Reserva</button>
                  </>
                )}
                {selected.status === 'confirmada' && (
                  <button className="admin-btn admin-btn-primary w-full" onClick={() => updateStatus(selected.id, 'concluida')}><Check size={18} /> Marcar como Concluída</button>
                )}
                <button className="admin-btn admin-btn-secondary w-full" onClick={() => handleDelete(selected.id)}><Trash2 size={16} /> Excluir Registro</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .side-panel-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: fade-in 0.2s ease;
        }
        .side-panel {
          width: 100%;
          max-width: 450px;
          background: #fff;
          height: 100%;
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          animation: slide-in 0.3s cubic-bezier(0, 0, 0.2, 1);
        }
        .side-panel-header {
          padding: 2rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .side-panel-tag {
          font-size: 0.7rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 0.5rem;
        }
        .side-panel-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 900;
          color: #0f172a;
        }
        .btn-close {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
          transition: color 0.2s;
        }
        .btn-close:hover { color: #0f172a; }
        
        .side-panel-body {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }
        .sub-title {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #0f172a;
          font-weight: 800;
          margin-bottom: 1.25rem;
        }
        .info-group { margin-bottom: 1.5rem; }
        .info-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }
        .info-value { font-size: 1rem; color: #334155; font-weight: 500; }
        .info-value-highlight { font-size: 1.1rem; color: #0f172a; font-weight: 800; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .divider { height: 1px; background: #f1f5f9; margin: 2rem 0; }
        
        .total-box {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .total-value { font-size: 1.75rem; font-weight: 900; color: #0f172a; margin-top: 0.25rem; }
        
        .info-notes {
          background: #fffbeb;
          color: #92400e;
          padding: 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          line-height: 1.6;
          border: 1px solid #fef3c7;
        }
        
        .wa-link {
          font-size: 0.75rem;
          color: #10b981;
          font-weight: 700;
          text-decoration: none;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .side-panel-footer {
          padding: 2rem;
          border-top: 1px solid #f1f5f9;
          background: #f8fafc;
        }
        .footer-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .w-full { width: 100%; justify-content: center; }

        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PainelReservas;
