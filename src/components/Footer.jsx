import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';
import logoWhite from '../assets/logo-branco.png';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#001a2c',
      paddingTop: '5rem',
      paddingBottom: '2rem',
      color: '#fff',
      fontFamily: 'var(--font-heading)'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        
        {/* Column 1: Brand & Social */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <img src={logoWhite} alt="Amazonia Travel" style={{ height: '70px', width: 'auto' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Empresa especializada em Turismo regionais, nacionais e internacionais.<br/><br/>Serviços: Passeios, Excursões, Traslados, Passagens e Eventos  etc.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
              <a key={i} href="#" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#FFD700'} onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}>
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem', color: '#FFD700' }}>Informações de Contato</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              <MapPin size={20} style={{ color: '#FFD700', flexShrink: 0 }} />
              <span>Av. Eduardo Ribeiro, 123, Centro, Manaus, AM.</span>
            </div>
            
            <a href="https://wa.me/5592993502913" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#25D366', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.543 3.838-2.544 6.159 0 1.302.28 2.569.824 3.733l-1.076 3.929 4.02-1.055c1.121.611 2.379.932 3.655.933h.001c2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.543-3.839 2.544-6.16 0-1.303-.28-2.57-.824-3.733l-1.077-3.929-3.925 1.056c-1.12-.612-2.378-.933-3.655-.934zm.001 1.056c1.096 0 2.172.274 3.136.8L15.65 8.27l2.454-.658-.658 2.454.242.483c.525.964.8 2.04.8 3.137 0 1.966-.765 3.812-2.155 5.202-1.39 1.39-3.236 2.156-5.202 2.156h-.001c-1.096 0-2.172-.274-3.137-.8l-.482-.242-2.455.658.658-2.454-.242-.483c-.525-.964-.8-2.041-.8-3.138 0-1.966.765-3.811 2.155-5.202 1.39-1.39 3.236-2.156 5.202-2.156z"/></svg>
              </div>
              <span>(92) 99350-2913</span>
            </a>

            <a href="https://wa.me/5592981474760" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', textDecoration: 'none' }}>
              <div style={{ backgroundColor: '#25D366', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.543 3.838-2.544 6.159 0 1.302.28 2.569.824 3.733l-1.076 3.929 4.02-1.055c1.121.611 2.379.932 3.655.933h.001c2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.543-3.839 2.544-6.16 0-1.303-.28-2.57-.824-3.733l-1.077-3.929-3.925 1.056c-1.12-.612-2.378-.933-3.655-.934zm.001 1.056c1.096 0 2.172.274 3.136.8L15.65 8.27l2.454-.658-.658 2.454.242.483c.525.964.8 2.04.8 3.137 0 1.966-.765 3.812-2.155 5.202-1.39 1.39-3.236 2.156-5.202 2.156h-.001c-1.096 0-2.172-.274-3.137-.8l-.482-.242-2.455.658.658-2.454-.242-.483c-.525-.964-.8-2.041-.8-3.138 0-1.966.765-3.811 2.155-5.202 1.39-1.39 3.236-2.156 5.202-2.156z"/></svg>
              </div>
              <span>(92) 98147-4760</span>
            </a>

            <div style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              <Mail size={20} style={{ color: '#FFD700', flexShrink: 0 }} />
              <span>contato@amazoniatraveleevents.com</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              <ExternalLink size={20} style={{ color: '#FFD700', flexShrink: 0 }} />
              <span>www.amazoniatraveleevents.com</span>
            </div>
          </div>
        </div>

        {/* Column 3: Links */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem', color: '#FFD700' }}>Viagem Amazonia</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Destinos', path: '/destinations' },
              { name: 'Como comprar', path: '/how-to-buy' },
              { name: 'Sobre nós', path: '/about' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contato', path: '/contact' }
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.path} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'padding-left 0.3s' }} onMouseEnter={(e) => e.target.style.paddingLeft = '5px'} onMouseLeave={(e) => e.target.style.paddingLeft = '0'}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Payment & WhatsApp */}
        <div>
          <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#FFD700' }}>Formas de pagamento</h4>
          <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>
            Adquira seus Tours com Segurança. Pague com:
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{ height: '30px', backgroundColor: '#fff', padding: '5px 10px', borderRadius: '4px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{ height: '30px', backgroundColor: '#fff', padding: '5px', borderRadius: '4px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" style={{ height: '30px', backgroundColor: '#fff', padding: '5px', borderRadius: '4px' }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/American_Express_logo.svg/1200px-American_Express_logo.svg.png" alt="Amex" style={{ height: '30px', backgroundColor: '#fff', padding: '5px', borderRadius: '4px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="https://wa.me/5592993502913" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              color: '#fff', 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              textDecoration: 'none' 
            }}>
              <div style={{ backgroundColor: '#25D366', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.543 3.838-2.544 6.159 0 1.302.28 2.569.824 3.733l-1.076 3.929 4.02-1.055c1.121.611 2.379.932 3.655.933h.001c2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.543-3.839 2.544-6.16 0-1.303-.28-2.57-.824-3.733l-1.077-3.929-3.925 1.056c-1.12-.612-2.378-.933-3.655-.934zm.001 1.056c1.096 0 2.172.274 3.136.8L15.65 8.27l2.454-.658-.658 2.454.242.483c.525.964.8 2.04.8 3.137 0 1.966-.765 3.812-2.155 5.202-1.39 1.39-3.236 2.156-5.202 2.156h-.001c-1.096 0-2.172-.274-3.137-.8l-.482-.242-2.455.658.658-2.454-.242-.483c-.525-.964-.8-2.041-.8-3.138 0-1.966.765-3.811 2.155-5.202 1.39-1.39 3.236-2.156 5.202-2.156z"/></svg>
              </div>
              (92) 99350-2913
            </a>
            <a href="https://wa.me/5592981474760" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              color: '#fff', 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              textDecoration: 'none' 
            }}>
              <div style={{ backgroundColor: '#25D366', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.519.903-6.16 2.544-1.64 1.64-2.543 3.838-2.544 6.159 0 1.302.28 2.569.824 3.733l-1.076 3.929 4.02-1.055c1.121.611 2.379.932 3.655.933h.001c2.321 0 4.519-.903 6.16-2.544 1.64-1.64 2.543-3.839 2.544-6.16 0-1.303-.28-2.57-.824-3.733l-1.077-3.929-3.925 1.056c-1.12-.612-2.378-.933-3.655-.934zm.001 1.056c1.096 0 2.172.274 3.136.8L15.65 8.27l2.454-.658-.658 2.454.242.483c.525.964.8 2.04.8 3.137 0 1.966-.765 3.812-2.155 5.202-1.39 1.39-3.236 2.156-5.202 2.156h-.001c-1.096 0-2.172-.274-3.137-.8l-.482-.242-2.455.658.658-2.454-.242-.483c-.525-.964-.8-2.041-.8-3.138 0-1.966.765-3.811 2.155-5.202 1.39-1.39 3.236-2.156 5.202-2.156z"/></svg>
              </div>
              (92) 98147-4760
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
            © Agência de Viagens Amazonia 2024. Todos os direitos reservados.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Política de Privacidade</Link>
            <Link to="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper for Chevron (not imported from lucide-react in replacement, adding it here)
const ChevronDown = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export default Footer;

