import React from 'react';
import { Plus, PackageSearch } from 'lucide-react';

const AdminPacotes = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Gerenciar Pacotes</h1>
          <p className="admin-page-subtitle">Adicione, edite ou remova os pacotes de viagem.</p>
        </div>
        <button className="admin-btn admin-btn-primary">
          <Plus size={18} />
          Novo Pacote
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-placeholder">
          <PackageSearch size={48} />
          <h3>Nenhum pacote encontrado</h3>
          <p>O crud de listagem, criação e edição de pacotes será implementado aqui.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPacotes;
