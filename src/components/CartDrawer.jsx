import React from 'react';
import { X, ShoppingBag, CreditCard, Trash2 } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose }) => {
  // Mock cart items for demonstration based on the user's screenshot
  const cartItems = [
    {
      id: 1,
      title: 'Tour Guiado no Museu do Louvre com Entrada Sem Fila',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
      price: 95.85,
      oldPrice: 105.85,
      details: '2 Adultos, 1 Criança, 1 Bebê'
    },
    {
      id: 2,
      title: 'Passeio de Gôndola no Grande Canal com Comentários App',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=2024&auto=format&fit=crop',
      price: 85.85,
      oldPrice: 89.85,
      details: '2 Adultos, 2 Crianças'
    },
    {
      id: 3,
      title: 'Tour de Dia Inteiro Windsor, Stonehenge e Oxford',
      image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop',
      price: 102.85,
      oldPrice: 115.85,
      details: '2 Adultos, 1 Criança'
    }
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          transition: 'all 0.3s ease'
        }}
      />
      
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        maxWidth: '450px',
        height: '100vh',
        backgroundColor: '#fff',
        zIndex: 1001,
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Meu Carrinho</h2>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
              <button style={{
                position: 'absolute',
                top: '-5px',
                left: '75px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2
              }}>
                <X size={12} strokeWidth={3} />
              </button>
              
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '85px', height: '85px', borderRadius: '8px', objectFit: 'cover' }} 
              />
              
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem', lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  De: <span style={{ color: '#ef4444', fontWeight: 700 }}>${item.price.toFixed(2)}</span> <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>${item.oldPrice.toFixed(2)}</span>
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '2rem 1.5rem',
          borderTop: '1px solid #f1f5f9',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Total ({cartItems.length} itens): <span style={{ color: '#ef4444' }}>${total}</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Todos os impostos e taxas incluídos
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button className="btn btn-outline" style={{ 
              borderRadius: '8px', 
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontWeight: 700
            }}>
              <ShoppingBag size={20} /> Ver Carrinho
            </button>
            <button className="btn btn-secondary" style={{ 
              borderRadius: '8px', 
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#3b82f6', // Screenshot blue
              color: '#fff',
              border: 'none',
              fontWeight: 700
            }}>
              <CreditCard size={20} /> Checkout
            </button>
          </div>
        </div>

        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </div>
    </>
  );
};

export default CartDrawer;
