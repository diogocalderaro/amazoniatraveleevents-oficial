import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';

const AdminPerguntas = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Perguntas Frequentes (FAQ)</h1>
          <p className="admin-page-subtitle">Gerencie as perguntas e respostas disponíveis no site.</p>
        </div>
        <button className="admin-btn admin-btn-primary">
          <Plus size={18} />
          Nova Pergunta
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-placeholder">
          <MessageSquare size={48} />
          <h3>Nenhuma pergunta cadastrada</h3>
          <p>Integração para o crud do FAQ será feita nesta página.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPerguntas;
