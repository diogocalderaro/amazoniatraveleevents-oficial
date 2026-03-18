import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  MessageSquare, 
  Image as ImageIcon, 
  MessageCircle,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/admin" className="sidebar-logo">
          Amazonia<span>Admin</span>
        </Link>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <LayoutDashboard size={20} />
              <span>Início</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/pacotes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <Package size={20} />
              <span>Pacotes</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/categorias" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <Tags size={20} />
              <span>Categorias</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/vendas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <ShoppingCart size={20} />
              <span>Vendas</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/perguntas" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <MessageSquare size={20} />
              <span>Perguntas (FAQ)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/galeria" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <ImageIcon size={20} />
              <span>Galeria da Home</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/comentarios" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              <MessageCircle size={20} />
              <span>Comentários</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/" className="nav-link logout-link">
          <LogOut size={20} />
          <span>Sair & Voltar ao Site</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
