import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import logoWhite from '../assets/logo-branco.png';
import cadasturLogo from '../assets/cadastur-logo.png';
import tripadvisorLogo from '../assets/tripadvisor.svg';


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
            <a href="https://www.facebook.com/AMAZONIATRAVELEEVENTS" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD700'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/amazoniatraveleevents/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#FFD700'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
              <Instagram size={20} />
            </a>
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


            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://wa.me/5592993502913" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 800,
                textDecoration: 'none'
              }}>
                <div style={{ backgroundColor: '#25D366', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
                (92) 99350-2913
              </a>
              <a href="https://wa.me/5592981474760" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 800,
                textDecoration: 'none'
              }}>
                <div style={{ backgroundColor: '#25D366', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.43 5.623 1.43h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
                (92) 98147-4760
              </a>
            </div>
          </div>
        </div>

        {/* Column 3: Links */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem', color: '#FFD700' }}>Viagem Amazonia</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0 }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'Destinos', path: '/destinos' },
              { name: 'Como comprar', path: '/como-comprar' },
              { name: 'Sobre nós', path: '/sobre' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contato', path: '/contato' }
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
          <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', color: '#FFD700' }}>Formas de pagamento</h4>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
            {/* PayPal Logo */}
            <div style={{ backgroundColor: '#fff', padding: '16px 28px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 124 33">
                <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" fill="#253B80"/>
                <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822a.949.949 0 0 0 .939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" fill="#179BD7"/>
                <path d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73a2.259 2.259 0 0 0-2.235 1.909l-.055.299-1.151 7.295-.042.215a.182.182 0 0 1-.182.155H7.266z" fill="#253B80"/>
                <path d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32a1.166 1.166 0 0 1 1.152-.993h.727c4.699 0 8.381-1.909 9.457-7.429.449-2.307.217-4.228-.971-5.579a4.665 4.665 0 0 0-1.276-1.019z" fill="#179BD7"/>
                <path d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.152 1.152 0 0 0-1.153.993L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429l-.277-.087z" fill="#222D65"/>
              </svg>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7EB53F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Pague com segurança
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 500, margin: '-10px 0 0 24px' }}>
              Aceitamos cartões de débito e crédito
            </p>
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
            <Link to="/politica-de-privacidade" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Política de Privacidade</Link>
            <Link to="/termos-de-uso" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>Termos de Uso</Link>
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

