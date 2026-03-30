import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Map,
  FileText,
  ClipboardList,
  PenSquare,
  HelpCircle,
  Image as ImageIcon,
  MessageCircle,
  BarChart3,
  LogOut,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { to: '/painel', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/painel/destinos', icon: Map, label: 'Destinos' },
  { to: '/painel/paginas', icon: FileText, label: 'Páginas' },
  { to: '/painel/reservas', icon: ClipboardList, label: 'Reservas' },
  { to: '/painel/blog', icon: PenSquare, label: 'Blog' },
  { to: '/painel/faq', icon: HelpCircle, label: 'FAQ' },
  { to: '/painel/galeria', icon: ImageIcon, label: 'Galeria' },
  { to: '/painel/comentarios', icon: MessageCircle, label: 'Comentários' },
  { to: '/painel/relatorios', icon: BarChart3, label: 'Relatórios' },
];

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}

      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/painel" className="sidebar-logo">
            {!collapsed && <>Amazonia<span>Admin</span></>}
            {collapsed && <span>A</span>}
          </Link>
          <button className="btn-icon sidebar-toggle hide-mobile" onClick={onToggle}>
            <ChevronLeft size={18} style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>
          <button className="btn-icon show-mobile-only" onClick={onMobileClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map(item => (
              <li key={item.to} className="nav-item">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : ''}
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-link" style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }} onClick={onMobileClose}>
            <ChevronLeft size={18} />
            {!collapsed && <span>Voltar ao Site</span>}
          </Link>
          <button className="nav-link logout-link" onClick={logout}>
            <LogOut size={20} />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
