import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      textAlign: 'center',
      fontFamily: 'var(--font-heading)'
    }}>
      <div style={{ maxWidth: '600px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '120px',
          height: '120px',
          backgroundColor: '#FFD700',
          borderRadius: '50%',
          marginBottom: '2rem',
          animation: 'pulse 2s infinite'
        }}>
          <Compass size={60} color="#000" />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(3rem, 10vw, 6rem)', 
          fontWeight: 900, 
          color: '#001a2c',
          lineHeight: 1,
          marginBottom: '1rem' 
        }}>
          404
        </h1>
        
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#001a2c' }}>
          Parece que você se perdeu na selva!
        </h2>
        
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.6 }}>
          A página que você está procurando não existe ou foi movida para outro lugar. 
          Não se preocupe, nossos guias podem te levar de volta para um local seguro.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '1rem 2rem',
              borderRadius: '100px',
              border: '2px solid #001a2c',
              backgroundColor: 'transparent',
              color: '#001a2c',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#001a2c';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#001a2c';
            }}
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '1rem 2rem',
              borderRadius: '100px',
              backgroundColor: '#FFD700',
              color: '#000',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
            }}
          >
            <Home size={20} /> Ir para Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 215, 0, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
