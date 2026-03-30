import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, User, LogOut } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button className="btn-icon show-mobile-only hamburger-btn" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
      </div>

      <div className="topbar-actions">
        <div className="user-profile">
          <div className="avatar">
            <User size={18} />
          </div>
          <div className="user-info hide-mobile">
            <span className="user-name">{user?.name || 'Admin'}</span>
            <span className="user-role">{user?.role === 'admin' ? 'Administrador' : user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
