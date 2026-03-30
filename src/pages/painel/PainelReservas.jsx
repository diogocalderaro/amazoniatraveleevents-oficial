import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Check, X, Trash2, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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
      const params = new URLSearchParams();
      if (statusFilter !== 'todos') params.append('status', statusFilter);
      if (search) params.append('search', search);
      const res = await fetch(`/api/reservations?${params}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setReservations(data.reservations || []);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  async function updateStatus(id, status) {
    await fetch(`/api/reservations/${id}/status`, { method: 'PUT', headers, body: JSON.stringify({ status }) });
    fetchReservations();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function handleDelete(id) {
    if (!confirm('Remover esta reserva?')) return;
    await fetch(`/api/reservations/${id}`, { method: 'DELETE', headers });
    fetchReservations();
    if (selected?.id === id) setSelected(null);
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
          <input className="search-input" style={{ width: '100%', borderRadius: '8px' }} placeholder="Buscar por nome, email, telefone ou pacote..." value={search} onChange={e => setSearch(e.target.value)} />
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
                <th>Pessoas</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(r => (
                <tr key={r.id} className={selected?.id === r.id ? 'row-selected' : ''}>
                  <td>
                    <div className="cell-main">{r.customer_name}</div>
                    <div className="cell-sub">{r.customer_phone}</div>
                  </td>
                  <td className="cell-main">{r.package_title || '-'}</td>
                  <td className="cell-sub">{r.travel_date ? new Date(r.travel_date).toLocaleDateString('pt-BR') : '-'}</td>
                  <td>{r.guests}</td>
                  <td className="cell-money">R$ {(r.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColors[r.status] + '20', color: statusColors[r.status] }}>
                      {statusLabels[r.status] || r.status}
                    </span>
                  </td>
                  <td>
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

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalhes da Reserva #{selected.id}</h2>
              <button className="btn-icon" onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item"><label>Cliente</label><span>{selected.customer_name}</span></div>
                <div className="detail-item"><label>Telefone</label><span>{selected.customer_phone}</span></div>
                <div className="detail-item"><label>Email</label><span>{selected.customer_email || '-'}</span></div>
                <div className="detail-item"><label>Pacote</label><span>{selected.package_title || '-'}</span></div>
                <div className="detail-item"><label>Data da Viagem</label><span>{selected.travel_date || '-'}</span></div>
                <div className="detail-item"><label>Pessoas</label><span>{selected.guests}</span></div>
                <div className="detail-item"><label>Valor Total</label><span className="cell-money">R$ {(selected.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span></div>
                <div className="detail-item">
                  <label>Status</label>
                  <span className="status-badge" style={{ backgroundColor: statusColors[selected.status] + '20', color: statusColors[selected.status] }}>
                    {statusLabels[selected.status]}
                  </span>
                </div>
                {selected.notes && <div className="detail-item full-width"><label>Observações</label><span>{selected.notes}</span></div>}
                <div className="detail-item"><label>Criada em</label><span>{new Date(selected.created_at).toLocaleString('pt-BR')}</span></div>
              </div>
              <div className="modal-footer">
                {selected.status === 'pendente' && (
                  <>
                    <button className="admin-btn admin-btn-success" onClick={() => updateStatus(selected.id, 'confirmada')}><Check size={16} /> Confirmar</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => updateStatus(selected.id, 'cancelada')}><X size={16} /> Cancelar</button>
                  </>
                )}
                <button className="admin-btn admin-btn-secondary" onClick={() => setSelected(null)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelReservas;
