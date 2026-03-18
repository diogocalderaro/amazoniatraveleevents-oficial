import React from 'react';
import { MessageCircle } from 'lucide-react';

const AdminComentarios = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Comentários & Avaliações</h1>
          <p className="admin-page-subtitle">Modere os comentários e avaliações dos clientes sobre os pacotes.</p>
        </div>
      </div>
      
      <div className="admin-card">
        <div className="admin-placeholder">
          <MessageCircle size={48} />
          <h3>Sem comentários</h3>
          <p>Os comentários recebidos serão listados aqui para aprovação e resposta.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminComentarios;
