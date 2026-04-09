import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
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
  X,
  Users
} from 'lucide-react';

const menuItems = [
  { to: '/painel', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/painel/destinos', icon: Map, label: 'Destinos' },
  { to: '/painel/paginas', icon: FileText, label: 'Páginas' },
  { to: '/painel/reservas', icon: ClipboardList, label: 'Reservas' },
  { 
    label: 'Blog', 
    icon: PenSquare, 
    subItems: [
      { to: '/painel/blog', label: 'Posts', end: true },
      { to: '/painel/blog/categorias', label: 'Categorias' }
    ]
  },
  { to: '/painel/clientes', icon: Users, label: 'Clientes' },
  { to: '/painel/faq', icon: HelpCircle, label: 'FAQ' },
  { to: '/painel/galeria', icon: ImageIcon, label: 'Galeria' },
  { to: '/painel/comentarios', icon: MessageCircle, label: 'Comentários' },
  { to: '/painel/relatorios', icon: BarChart3, label: 'Relatórios' },
];

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingCount = async () => {
    try {
      const { count } = await supabase
        .from('reservations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pendente');
      setPendingCount(count || 0);
    } catch (err) {}
  };

  const toggleSubmenu = (label) => {
    setOpenSubmenus(prev => 
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    menuItems.forEach(item => {
      if (item.subItems && item.subItems.some(sub => location.pathname.startsWith(sub.to))) {
        setOpenSubmenus(prev => prev.includes(item.label) ? prev : [...prev, item.label]);
      }
    });

    fetchPendingCount();
    
    const sub = supabase.channel('sidebar-reservations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => {
        fetchPendingCount();
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(sub);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && <div className="sidebar-overlay" onClick={onMobileClose} />}

      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/painel" className="sidebar-logo">
            {!collapsed && <>Painel</>}
            {collapsed && <span>P</span>}
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
              <li key={item.label} className="nav-item">
                {item.subItems ? (
                  <>
                    <div 
                      className={`nav-link submenu-trigger ${item.subItems.some(sub => window.location.pathname === sub.to) ? 'active' : ''}`}
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      <item.icon size={20} />
                      {!collapsed && (
                        <>
                          <span>{item.label}</span>
                          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', opacity: 0.5 }}>
                            {openSubmenus.includes(item.label) ? '▼' : '▶'}
                          </span>
                        </>
                      )}
                    </div>
                    {openSubmenus.includes(item.label) && !collapsed && (
                      <ul className="submenu-list">
                        {item.subItems.map(subItem => (
                          <li key={subItem.to} className="submenu-item">
                            <NavLink
                              to={subItem.to}
                              end={subItem.end}
                              className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                              onClick={onMobileClose}
                            >
                              {subItem.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={onMobileClose}
                    title={collapsed ? item.label : ''}
                    style={{ position: 'relative' }}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span>{item.label}</span>}
                    {item.label === 'Reservas' && pendingCount > 0 && (
                      <span style={{
                        position: 'absolute',
                        right: collapsed ? '8px' : '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--admin-success)',
                        borderRadius: '50%',
                        boxShadow: '0 0 0 2px var(--admin-bg-base)'
                      }} />
                    )}
                  </NavLink>
                )}
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
