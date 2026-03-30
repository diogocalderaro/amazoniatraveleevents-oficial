import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Package, Download, Calendar } from 'lucide-react';

const PainelRelatorios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => { fetchData(); }, [period]);

  async function fetchData() {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const headers = { Authorization: `Bearer ${token}` };

      // Dashboard data
      const dashRes = await fetch('/api/reports/dashboard', { headers });
      const dashData = dashRes.ok ? await dashRes.json() : {};

      // Sales with date filter
      const now = new Date();
      const from = new Date(now - parseInt(period) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const salesRes = await fetch(`/api/reports/sales?from=${from}`, { headers });
      const salesData = salesRes.ok ? await salesRes.json() : {};

      setData({ ...dashData, sales: salesData });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  function exportCSV() {
    if (!data?.sales?.sales?.length) return;
    const rows = [['ID', 'Cliente', 'Pacote', 'Valor', 'Status', 'Data']];
    data.sales.sales.forEach(s => {
      rows.push([s.id, s.customer_name, s.package_title || '', s.total_price, s.status, s.created_at]);
    });
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-vendas-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  const stats = data?.stats || {};
  const sales = data?.sales || {};

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Relatórios</h1>
          <p className="admin-page-subtitle">Análise de desempenho e vendas.</p>
        </div>
        <div className="header-actions">
          <select className="admin-select" value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Último ano</option>
          </select>
          <button className="admin-btn admin-btn-secondary" onClick={exportCSV}><Download size={16} /> Exportar CSV</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Receita no Período</h4>
              <span className="stat-value">R$ {(sales.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
              <DollarSign size={22} style={{ color: 'var(--admin-success)' }} />
            </div>
          </div>
        </div>
        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Vendas Confirmadas</h4>
              <span className="stat-value">{sales.count || 0}</span>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
              <TrendingUp size={22} style={{ color: 'var(--admin-accent)' }} />
            </div>
          </div>
        </div>
        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Ticket Médio</h4>
              <span className="stat-value">R$ {sales.count ? ((sales.totalRevenue || 0) / sales.count).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}</span>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(252, 203, 48, 0.15)' }}>
              <Package size={22} style={{ color: 'var(--admin-primary)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      {data?.monthlyRevenue?.length > 0 && (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header"><h3><TrendingUp size={18} /> Receita por Mês</h3></div>
          <div className="chart-container">
            {data.monthlyRevenue.map((m, i) => {
              const maxRev = Math.max(...data.monthlyRevenue.map(r => r.revenue));
              const pct = maxRev > 0 ? (m.revenue / maxRev) * 100 : 0;
              return (
                <div key={i} className="chart-bar-group">
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: `${Math.max(pct, 8)}%` }}>
                      <span className="chart-bar-value">R$ {m.revenue?.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                  <span className="chart-label">{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Packages */}
      {data?.topPackages?.length > 0 && (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header"><h3><Package size={18} /> Pacotes Mais Vendidos</h3></div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead><tr><th>Pacote</th><th>Reservas</th><th>Receita</th></tr></thead>
              <tbody>
                {data.topPackages.map((p, i) => (
                  <tr key={i}>
                    <td className="cell-main">{p.package_title}</td>
                    <td>{p.reservations}</td>
                    <td className="cell-money">R$ {(p.revenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sales Detail */}
      <div className="admin-card">
        <div className="card-header"><h3><Calendar size={18} /> Vendas no Período</h3></div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr><th>Cliente</th><th>Pacote</th><th>Valor</th><th>Data</th></tr>
            </thead>
            <tbody>
              {(sales.sales || []).map(s => (
                <tr key={s.id}>
                  <td className="cell-main">{s.customer_name}</td>
                  <td>{s.package_title || '-'}</td>
                  <td className="cell-money">R$ {(s.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="cell-sub">{new Date(s.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
              {(!sales.sales?.length) && <tr><td colSpan="4" className="empty-row">Nenhuma venda no período selecionado.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PainelRelatorios;
