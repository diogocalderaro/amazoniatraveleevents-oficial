import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Instagram, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';
import logoWhite from '../assets/logo-branco.png';
import cadasturLogo from '../assets/cadastur-logo.png';
import tripadvisorLogo from '../assets/tripadvisor.svg';
import asaasLogo from '../assets/asaas.png';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#001a2c',
      paddingTop: '5rem',
      paddingBottom: '2rem',
      color: '#fff',
      fontFamily: 'var(--font-heading)'
    }}>
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.2)'
        }}>
          <img src={cadasturLogo} alt="Cadastur" style={{ height: '60px', width: 'auto', filter: 'brightness(1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={tripadvisorLogo} alt="Tripadvisor" style={{ height: '50px', width: 'auto' }} />
            <span style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-1px' }}></span>
          </div>
          <img src={asaasLogo} alt="Asaas" style={{ height: '66px', width: 'auto' }} />
        </div>
      </div>

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '4rem'
      }}>

        {/* Column 1: Brand & Social */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <img src={logoWhite} alt="Amazonia Travel" style={{ height: 'clamp(40px, 8vw, 70px)', width: 'auto' }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '280px' }}>
            Empresa especializada em Turismo regionais, nacionais e internacionais.<br /><br />Serviços: Passeios, Excursões, Traslados, Passagens e Eventos  etc.
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {/* Visa */}
            <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderRadius: '6px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 780 500" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M293.2 348.7l33.4-195.7h53.4l-33.4 195.7zM540.9 157.5c-10.6-4-27.2-8.3-47.9-8.3-52.8 0-90 26.6-90.3 64.7-.3 28.2 26.6 43.9 46.9 53.3 20.8 9.6 27.8 15.8 27.7 24.4-.1 13.2-16.6 19.2-32 19.2-21.4 0-32.7-3-50.3-10.3l-6.9-3.1-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5 56.2 0 92.6-26.3 93-67.1.2-22.4-14.1-39.4-45.1-53.4-18.8-9.1-30.3-15.1-30.2-24.3 0-8.1 9.7-16.8 30.8-16.8 17.6-.3 30.3 3.6 40.2 7.6l4.8 2.3 7.2-42.5zM676.3 153h-41.3c-12.8 0-22.4 3.5-28 16.3L520.3 348.7h56.2s9.2-24.1 11.3-29.4c6.1 0 60.8.1 68.6.1 1.6 6.9 6.5 29.3 6.5 29.3h49.7l-36.3-195.7zm-65.9 126.2c4.4-11.3 21.4-54.7 21.4-54.7-.3.5 4.4-11.4 7.1-18.8l3.6 17s10.3 47 12.4 56.5h-44.5zM232.8 153L180.4 282l-5.6-27.1c-9.7-31.3-40-65.2-73.9-82.2l47.9 173.9h56.6l84.2-195.6h-56.8" fill="#1A1F71" /><path d="M131.9 153H48.8l-.6 3.6c67.2 16.2 111.7 55.4 130.1 102.5L160 172.1c-3.2-12.4-12.6-16-28.1-16" fill="#F9A533" /></svg>
            </div>
            {/* Mastercard */}
            <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderRadius: '6px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 780 500" height="22" xmlns="http://www.w3.org/2000/svg"><circle cx="299.6" cy="250" r="167.7" fill="#EB001B" /><circle cx="480.4" cy="250" r="167.7" fill="#F79E1B" /><path d="M390 116.1a167.5 167.5 0 00-63 133.9 167.5 167.5 0 0063 133.9 167.5 167.5 0 0063-133.9 167.5 167.5 0 00-63-133.9z" fill="#FF5F00" /></svg>
            </div>
            {/* Pix */}
            <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderRadius: '6px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <path d="M179.2 179.2c-10.5 10.5-24.4 16.2-39.2 16.2s-28.7-5.8-39.2-16.2l-37-37c-2-2-5.2-2-7.2 0l-37 37c-3 3-5.5 6.3-7.6 9.8H27.4l47.5 47.5c21.6 21.6 56.8 21.6 78.4 0l47.5-47.5h-2.3c-5.1-7.4-11.9-13.5-19.3-9.8z" fill="#32BCAD" />
                <path d="M56.8 93.6l37 37c2 2 5.2 2 7.2 0l37-37c10.5-10.5 24.4-16.2 39.2-16.2s28.7 5.8 39.2 16.2l2.3-9.8h2.3L173.3 36.3c-21.6-21.6-56.8-21.6-78.4 0L47.4 83.8H59c-2.1 3.5-4.6 6.8-7.6 9.8h5.4z" fill="#32BCAD" />
                <path d="M236.3 94.9L200.5 59.1l-21.3 21.3c-10.5 10.5-24.4 16.2-39.2 16.2s-28.7-5.8-39.2-16.2l-37-37c-2-2-5.2-2-7.2 0l-37 37L0 59.1v0L19.7 94.9 0 130.7v0l19.6-21.3 37 37c2 2 5.2 2 7.2 0l37-37c10.5-10.5 24.4-16.2 39.2-16.2s28.7 5.8 39.2 16.2l21.3 21.3 36.1-36.1L256 130.7v0l-19.7-35.8z" fill="#32BCAD" />
              </svg>
              <span style={{ color: '#32BCAD', fontWeight: 900, fontSize: '1rem', letterSpacing: '0.5px' }}>PIX</span>
            </div>
            {/* Boleto */}
            <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderRadius: '6px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="4" width="22" height="16" rx="2" stroke="#333" strokeWidth="1.5" />
                <line x1="4" y1="8" x2="4" y2="16" stroke="#333" strokeWidth="2" />
                <line x1="7" y1="8" x2="7" y2="16" stroke="#333" strokeWidth="1" />
                <line x1="9" y1="8" x2="9" y2="16" stroke="#333" strokeWidth="2" />
                <line x1="12" y1="8" x2="12" y2="16" stroke="#333" strokeWidth="1" />
                <line x1="14" y1="8" x2="14" y2="16" stroke="#333" strokeWidth="1.5" />
                <line x1="16.5" y1="8" x2="16.5" y2="16" stroke="#333" strokeWidth="2" />
                <line x1="19" y1="8" x2="19" y2="16" stroke="#333" strokeWidth="1" />
                <line x1="20.5" y1="8" x2="20.5" y2="16" stroke="#333" strokeWidth="1.5" />
              </svg>
              <span style={{ color: '#333', fontWeight: 900, fontSize: '0.85rem', letterSpacing: '0.5px' }}>BOLETO</span>
            </div>
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
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
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
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
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
            © Amazônia Travel e Events 2026. Todos os direitos reservados.
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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
);

export default Footer;

