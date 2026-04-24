import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Package, Download, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelRelatorios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  useEffect(() => { fetchData(); }, [period]);

  async function fetchData() {
    setLoading(true);
    try {
      const now = new Date();
      const fromDate = new Date(now - parseInt(period) * 24 * 60 * 60 * 1000).toISOString();

      // 1. Fetch sales in period (status confirmada/concluida)
      const { data: salesData, error: salesErr } = await supabase
        .from('reservations')
        .select('*')
        .in('status', ['confirmada', 'concluida'])
        .gte('created_at', fromDate)
        .order('created_at', { ascending: false });

      if (salesErr) throw salesErr;

      const totalRevenue = salesData?.reduce((acc, s) => acc + (s.total_price || 0), 0) || 0;
      const count = salesData?.length || 0;

      // 2. Calculate top packages locally
      const packageCounts = {};
      salesData?.forEach(s => {
        if (s.package_title) {
          if (!packageCounts[s.package_title]) packageCounts[s.package_title] = { reservations: 0, revenue: 0 };
          packageCounts[s.package_title].reservations++;
          packageCounts[s.package_title].revenue += s.total_price || 0;
        }
      });
      
      const topPackages = Object.entries(packageCounts)
        .map(([title, val]) => ({ package_title: title, ...val }))
        .sort((a, b) => b.reservations - a.reservations);

      // 3. Monthly revenue calculation
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const monthlyMap = {};
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        monthlyMap[key] = 0;
      }
      salesData?.forEach(s => {
        const d = new Date(s.created_at);
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        if (monthlyMap[key] !== undefined) monthlyMap[key] += (s.total_price || 0);
      });
      const monthlyRevenue = Object.entries(monthlyMap).map(([month, revenue]) => ({ month, revenue }));

      // 4. Status distribution (all reservations, not just period)
      const { data: allRes, error: allErr } = await supabase
        .from('reservations')
        .select('status');
      
      const statusDist = { pendente: 0, confirmada: 0, cancelada: 0, concluida: 0 };
      if (!allErr && allRes) {
        allRes.forEach(r => { if (statusDist[r.status] !== undefined) statusDist[r.status]++; });
      }

      setData({
        sales: { sales: salesData || [], totalRevenue, count },
        topPackages,
        monthlyRevenue,
        statusDistribution: statusDist,
        totalReservations: allRes?.length || 0
      });
    } catch (err) { 
      console.error('Error fetching reports:', err); 
    } finally { 
      setLoading(false); 
    }
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

      {/* Status Distribution */}
      {data?.statusDistribution && data.totalReservations > 0 && (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-header"><h3><Package size={18} /> Distribuição de Reservas</h3></div>
          <div style={{ padding: '1.5rem' }}>
            {[
              { key: 'confirmada', label: 'Confirmadas', color: '#10b981' },
              { key: 'concluida', label: 'Concluídas', color: '#3b82f6' },
              { key: 'pendente', label: 'Pendentes', color: '#f59e0b' },
              { key: 'cancelada', label: 'Canceladas', color: '#ef4444' }
            ].map(st => {
              const count = data.statusDistribution[st.key] || 0;
              const pct = data.totalReservations > 0 ? (count / data.totalReservations * 100).toFixed(0) : 0;
              return (
                <div key={st.key} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>{st.label}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: st.color }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, backgroundColor: st.color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
