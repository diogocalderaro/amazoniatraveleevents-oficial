import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Filter, 
  ChevronDown, 
  ArrowRight
} from 'lucide-react';

import { packagesData } from '../data/toursData';

// Import hero background image
import imgSafari from '../assets/destinos/safari_amazonico.jpg';

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = packagesData;

  const categories = ['Todos', 'Compras', 'Passeios', 'Natureza'];

  // Map original categories to the new reduced set for filtering
  const categoryMap = {
    'Natureza': 'Natureza',
    'Compras': 'Compras',
    'Lazer': 'Passeios',
    'Aventura': 'Passeios',
    'Internacional': 'Passeios',
    'Cultura': 'Passeios'
  };

  let filteredPackages = packages.filter(pkg => {
    const displayCategory = categoryMap[pkg.category] || 'Passeios';
    const matchesCategory = activeCategory === 'Todos' || displayCategory === activeCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Apply Sorting
  if (sortBy === 'price-low') {
    filteredPackages.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredPackages.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredPackages.sort((a, b) => b.rating - a.rating);
  }

  const sortOptions = [
    { label: 'Mais Recentes', value: 'recent' },
    { label: 'Menor Preço', value: 'price-low' },
    { label: 'Maior Preço', value: 'price-high' },
    { label: 'Melhor Avaliados', value: 'rating' }
  ];

  return (
    <div className="packages-page">
      {/* Page Hero */}
      <section style={{
        padding: '6rem 0 4rem 0',
        backgroundColor: '#000',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${imgSafari})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '1rem', fontWeight: 800, color: '#fff' }}>Nossos Destinos</h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Explore os melhores pacotes selecionados para você viver experiências inesquecíveis.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="packages-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '3rem' }}>
          
          {/* Sidebar Filters */}
          <aside>
            <div style={{ position: 'sticky', top: '160px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search size={18} /> Buscar Destino
                </h3>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="Para onde vamos?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid #E2E8F0',
                      outline: 'none',
                      fontSize: '0.875rem'
                    }}
                  />
                  <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={18} /> Categorias
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'left',
                        backgroundColor: activeCategory === cat ? '#FFD700' : 'transparent',
                        color: activeCategory === cat ? '#000' : 'var(--color-text-main)',
                        fontWeight: activeCategory === cat ? 600 : 400,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {cat}
                      {activeCategory === cat && <ArrowRight size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: '1.25rem', backgroundColor: '#000', color: '#fff', borderRadius: '15px', border: '1px solid #FFD700' }}>
                <h4 style={{ color: '#FFD700', marginBottom: '1rem' }}>Precisa de Ajuda?</h4>
                <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                  Nossos especialistas podem criar um roteiro 100% personalizado para você.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#FFD700', color: '#000', fontWeight: 800 }}>
                  Falar com Consultor
                </Link>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Mostrando <strong>{filteredPackages.length}</strong> pacotes em <strong>{activeCategory}</strong>
              </p>
              
              <div style={{ position: 'relative' }}>
                <div 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}
                >
                  Ordenar por: <span style={{ color: '#000', fontWeight: 600 }}>{sortOptions.find(o => o.value === sortBy)?.label}</span> <ChevronDown size={16} />
                </div>
                
                {isSortOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '0.5rem',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    width: '180px',
                    overflow: 'hidden',
                    border: '1px solid #f1f5f9'
                  }}>
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          textAlign: 'left',
                          backgroundColor: sortBy === option.value ? '#f8fafc' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: sortBy === option.value ? 700 : 500,
                          color: sortBy === option.value ? '#000' : '#64748b',
                          transition: 'all 0.2s'
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {filteredPackages.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {filteredPackages.map(pkg => (
                  <div key={pkg.id} className="package-card-new" style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', height: '220px' }}>
                      <Link to={`/tour/${pkg.id}`}>
                        <img 
                          src={pkg.image} 
                          alt={pkg.title} 
                          loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </Link>
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: '#000', color: '#FFD700', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {pkg.category}
                      </div>
                    </div>
                    
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          <Clock size={14} color="#FFD700" /> {pkg.duration}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          <MapPin size={14} color="#FFD700" /> {pkg.location.split(',')[0]}
                        </div>
                      </div>

                      <Link to={`/tour/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.3, height: '3.2rem', overflow: 'hidden', fontWeight: 800 }}>{pkg.title}</h3>
                      </Link>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{pkg.rating}</span>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#FFD700" color="#FFD700" />)}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                        <div>
                          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#000' }}>{pkg.priceDisplay || `R$ ${pkg.price.toLocaleString('pt-BR')}`}</span>
                          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}> /pessoa</span>
                        </div>
                        <Link to={`/tour/${pkg.id}`} style={{ 
                          width: '40px', height: '40px', borderRadius: '50%', 
                          backgroundColor: '#FFD700', color: '#000', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <ArrowRight size={20} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <Search size={48} style={{ color: '#E2E8F0', marginBottom: '1.5rem' }} />
                <h3>Nenhum pacote encontrado</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Tente ajustar seus filtros ou busca.</p>
                <button onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                  Limpar Todos os Filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <style>{`
        .packages-grid-layout {
          display: grid;
        }
        @media (max-width: 991px) {
          .packages-grid-layout {
            grid-template-columns: 1fr !important;
          }
          aside { margin-bottom: 3rem; }
        }
      `}</style>
    </div>
  );
};

export default Packages;
