import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

const AdminGaleria = () => {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Galeria da Home</h1>
          <p className="admin-page-subtitle">Gerencie as imagens que aparecem em destaque na página inicial.</p>
        </div>
        <button className="admin-btn admin-btn-primary">
          <Upload size={18} />
          Fazer Upload
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-placeholder">
          <ImageIcon size={48} />
          <h3>Galeria Vazia</h3>
          <p>O crud e área de upload para as fotos da home serão inseridas aqui.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminGaleria;
