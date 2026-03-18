import React from 'react';
import { ShoppingCart } from 'lucide-react';

const AdminVendas = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Vendas & Reservas</h1>
          <p className="admin-page-subtitle">Acompanhe todas as reservas e status de pagamento.</p>
        </div>
      </div>
      
      <div className="admin-card">
        <div className="admin-placeholder">
          <ShoppingCart size={48} />
          <h3>Aguardando Integração</h3>
          <p>A listagem de todas as vendas e informações de clientes aparecerá aqui.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminVendas;
