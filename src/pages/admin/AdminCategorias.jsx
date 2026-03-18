import React from 'react';
import { Plus, Tags } from 'lucide-react';

const AdminCategorias = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Gerenciar Categorias</h1>
          <p className="admin-page-subtitle">Organize os pacotes por categorias como Aventura, Relaxamento, etc.</p>
        </div>
        <button className="admin-btn admin-btn-primary">
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-placeholder">
          <Tags size={48} />
          <h3>Nenhuma categoria cadastrada</h3>
          <p>O crud de listagem e gerenciamento de categorias será implementado aqui.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminCategorias;
