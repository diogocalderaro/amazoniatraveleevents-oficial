import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinos', path: '/destinations' },
    { name: 'Como comprar', path: '/how-to-buy' },
    { name: 'Sobre', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contato', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="header" style={{
      backgroundColor: '#FFD700',
      padding: '0.75rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Amazonia Travel" style={{ height: '50px', width: 'auto' }} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{
          display: 'none',
        }}>
          <ul style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  style={{
                    color: isActive(link.path) ? '#000' : 'rgba(0,0,0,0.7)',
                    fontWeight: isActive(link.path) ? 800 : 600,
                    fontSize: '0.925rem',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#000';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = isActive(link.path) ? '#000' : 'rgba(0,0,0,0.7)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Language Switcher */}
          <div className="language-switcher" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', paddingRight: '0.75rem', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
            <button title="Português" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <img src="https://flagcdn.com/w40/br.png" alt="Brasil" style={{ width: '24px', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
            </button>
            <button title="English" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <img src="https://flagcdn.com/w40/us.png" alt="USA" style={{ width: '24px', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
            </button>
            <button title="Español" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <img src="https://flagcdn.com/w40/es.png" alt="Espanha" style={{ width: '24px', height: 'auto', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
            </button>
          </div>

          <Link 
            to="/checkout"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              position: 'relative',
              color: '#000',
              textDecoration: 'none'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span style={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: '#000',
              color: '#FFD700',
              fontSize: '10px',
              fontWeight: 700,
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>{cartItems.length}</span>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#000',
              padding: '0.5rem',
              display: 'block'
            }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="mobile-nav" style={{
          backgroundColor: '#FFD700',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1rem var(--spacing-lg)',
          boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0',
                    color: isActive(link.path) ? '#000' : 'rgba(0,0,0,0.7)',
                    fontWeight: isActive(link.path) ? 800 : 600,
                    fontSize: '1.125rem',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase'
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Injecting media query through a style tag for the component */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: block !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .language-switcher { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
