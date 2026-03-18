import React from 'react';
import { Users, DollarSign, Package, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="admin-card stat-card">
    <div className="stat-header">
      <div className="stat-info">
        <h4 className="stat-title">{title}</h4>
        <span className="stat-value">{value}</span>
      </div>
      <div className="stat-icon-wrapper">
        <Icon size={24} className="stat-icon text-admin-primary" />
      </div>
    </div>
    <div className="stat-footer">
      <span className={`trend ${trend.isPositive ? 'positive' : 'negative'}`}>
        {trend.isPositive ? '+' : '-'}{trend.value}%
      </span>
      <span className="trend-text">em relação ao mês passado</span>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Visão Geral</h1>
          <p className="admin-page-subtitle">Acompanhe as métricas e atividades recentes do seu negócio.</p>
        </div>
      </div>
      
      <div className="grid-responsive" style={{ marginBottom: '2rem' }}>
        <StatCard 
          title="Vendas Totais (Mês)" 
          value="R$ 45.231,00" 
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard 
          title="Novas Reservas" 
          value="142" 
          icon={Package}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard 
          title="Novos Clientes" 
          value="89" 
          icon={Users}
          trend={{ value: 2.4, isPositive: false }}
        />
        <StatCard 
          title="Taxa de Conversão" 
          value="4.2%" 
          icon={TrendingUp}
          trend={{ value: 1.1, isPositive: true }}
        />
      </div>

      <div className="admin-card">
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--admin-border)', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: '#fff' }}>Atividades Recentes</h3>
        </div>
        <div className="admin-placeholder" style={{ padding: '2rem' }}>
          <p>Gráficos e tabelas detalhadas serão implementados em breve.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
