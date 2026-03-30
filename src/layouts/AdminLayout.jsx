import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import '../styles/admin.css';

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="admin-layout dark-theme" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="admin-loading">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/painel/login" replace />;
  }

  return (
    <div className={`admin-layout dark-theme ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="admin-content-wrapper">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
