import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Topbar from '../components/admin/Topbar';
import '../styles/admin.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout dark-theme">
      <Sidebar />
      <div className="admin-content-wrapper">
        <Topbar />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
