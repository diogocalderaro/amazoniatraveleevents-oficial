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
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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

