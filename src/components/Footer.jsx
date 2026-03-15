import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Check } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#000',
      paddingTop: 'var(--spacing-xl)',
      paddingBottom: 'var(--spacing-lg)',
      color: 'rgba(255,255,255,0.7)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '4rem',
        marginBottom: '3rem'
      }}>
        
        {/* Column 1: Brand Info & Payments */}
        <div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.5rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            lineHeight: 1,
            marginBottom: '1rem'
          }}>
            AMAZONIA<br/>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', color: '#fff' }}>
              TRAVEL E EVENTS<span style={{ color: '#FFD700' }}>X</span>
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            Criando jornadas personalizadas para você descobrir o mundo. Viva aventuras inesquecíveis com nossos pacotes selecionados.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <a href="#" style={{ 
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <Facebook size={20} />
            </a>
            <a href="#" style={{ 
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              <Instagram size={20} />
            </a>
          </div>
          
          <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: '#fff' }}>Aceitamos:</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', filter: 'brightness(0) invert(1) opacity(0.8)' }}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '18px' }} />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '18px' }} />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Logo_pix.png" alt="Pix" style={{ height: '18px' }} />
             <img src="https://upload.wikimedia.org/wikipedia/pt/b/bd/Elo_logo.png" alt="Elo" style={{ height: '18px' }} />
          </div>
        </div>

        {/* Column 2: Highlights */}
        <div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#fff' }}>Destaques</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/about" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Sobre a Agência</Link></li>
            <li><Link to="/destinations" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Destinos</Link></li>
            <li><Link to="/contact" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Contato</Link></li>
            <li><Link to="/blog" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Blog</Link></li>
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#fff' }}>Links Úteis</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li><Link to="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Início</Link></li>
            <li><Link to="/plans" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Categorias</Link></li>
            <li><Link to="/faq" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Nossa Equipe</Link></li>
            <li><Link to="/terms" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Termos e Condições</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            <Phone size={16} /> (92) 99123-4567
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            <Mail size={16} /> contato@amazoniaevents.com
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            <MapPin size={16} /> Manaus, Amazonas - Brasil
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
          ©2024 Amazonia Travel. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
