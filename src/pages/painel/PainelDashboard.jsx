import React, { useState, useEffect } from 'react';
import { DollarSign, Package, ClipboardList, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      setLoading(true);
      
      // 1. Total Revenue (sum of total_price for confirmada and concluida)
      const { data: revData } = await supabase
        .from('reservations')
        .select('total_price, created_at')
        .in('status', ['confirmada', 'concluida']);
      
      const totalRevenue = revData?.reduce((acc, r) => acc + (r.total_price || 0), 0) || 0;

      // Calculate monthly revenue (Last 6 months)
      const monthlyData = {};
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const today = new Date();
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
        monthlyData[key] = 0;
      }

      if (revData) {
        revData.forEach(r => {
          const d = new Date(r.created_at);
          const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
          if (monthlyData[key] !== undefined) {
            monthlyData[key] += (r.total_price || 0);
          }
        });
      }
      const monthlyRevenue = Object.entries(monthlyData).map(([month, revenue]) => ({ month, revenue }));

      // 2. Total Reservations
      const { count: totalReservations } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true });

      // 3. Pending Reservations
      const { count: pendingReservations } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pendente');

      // 4. Total Packages (active)
      const { count: totalPackages } = await supabase
        .from('packages')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      // 5. Recent Reservations
      const { data: recentReservations } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setData({
        stats: {
          totalRevenue,
          totalReservations: totalReservations || 0,
          pendingReservations: pendingReservations || 0,
          totalPackages: totalPackages || 0
        },
        recentReservations: recentReservations || [],
        monthlyRevenue
      });
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  const stats = data?.stats || {};
  const statusColors = {
    pendente: 'var(--admin-warning)',
    confirmada: 'var(--admin-success)',
    cancelada: 'var(--admin-danger)',
    concluida: 'var(--admin-accent)'
  };

  const statusLabels = { pendente: 'Pendente', confirmada: 'Confirmada', cancelada: 'Cancelada', concluida: 'Concluída' };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Visão Geral</h1>
          <p className="admin-page-subtitle">Acompanhe as métricas e atividades recentes.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Receita Total</h4>
              <span className="stat-value">R$ {(stats.totalRevenue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}>
              <DollarSign size={22} style={{ color: 'var(--admin-success)' }} />
            </div>
          </div>
        </div>

        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Total Reservas</h4>
              <span className="stat-value">{stats.totalReservations || 0}</span>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
              <ClipboardList size={22} style={{ color: 'var(--admin-accent)' }} />
            </div>
          </div>
        </div>

        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Reservas Pendentes</h4>
              <span className="stat-value">{stats.pendingReservations || 0}</span>
            </div>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)' }}>
              <AlertCircle size={22} style={{ color: 'var(--admin-warning)' }} />
            </div>
          </div>
        </div>

        <div className="admin-card stat-card">
          <div className="stat-header">
            <div className="stat-info">
              <h4 className="stat-title">Pacotes Ativos</h4>
              <span className="stat-value">{stats.totalPackages || 0}</span>
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
          <div className="card-header">
            <h3><TrendingUp size={18} /> Receita Mensal</h3>
          </div>
          <div className="chart-container">
            {data.monthlyRevenue.map((m, i) => {
              const maxRev = Math.max(...data.monthlyRevenue.map(r => r.revenue));
              const pct = maxRev > 0 ? (m.revenue / maxRev) * 100 : 0;
              return (
                <div key={i} className="chart-bar-group">
                  <div className="chart-bar-wrapper">
                    <div className="chart-bar" style={{ height: `${Math.max(pct, 5)}%` }}>
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

      {/* Recent Reservations */}
      <div className="admin-card">
        <div className="card-header">
          <h3><Clock size={18} /> Reservas Recentes</h3>
        </div>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Pacote</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {(data?.recentReservations || []).map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="cell-main">{r.customer_name}</div>
                    <div className="cell-sub">{r.customer_phone}</div>
                  </td>
                  <td>{r.package_title || '-'}</td>
                  <td className="cell-money">R$ {(r.total_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColors[r.status] + '20', color: statusColors[r.status] }}>
                      {statusLabels[r.status] || r.status}
                    </span>
                  </td>
                  <td className="cell-sub">{new Date(r.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
              {(!data?.recentReservations?.length) && (
                <tr><td colSpan="5" className="empty-row">Nenhuma reserva encontrada</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PainelDashboard;
