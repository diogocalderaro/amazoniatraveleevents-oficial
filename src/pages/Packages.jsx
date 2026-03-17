import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Filter, 
  ChevronDown, 
  PlaneTakeoff,
  ArrowRight,
  Wifi,
  Coffee,
  Shield
} from 'lucide-react';

// Import gallery images
import gal001 from '../assets/galeria/001.jpg';
import gal002 from '../assets/galeria/002.jpg';
import gal003 from '../assets/galeria/003.jpg';
import gal004 from '../assets/galeria/004.jpg';
import gal005 from '../assets/galeria/005.jpg';
import gal006 from '../assets/galeria/006.jpg';

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const packages = [
    {
      id: 'amazon-trail',
      title: 'Trilha de Aventura na Selva',
      location: 'Manaus, Amazonas',
      price: 899,
      duration: '5 Dias',
      rating: 4.9,
      category: 'Aventura',
      image: gal001,
      features: ['Guia Local', 'Equipamento', 'Alimentação']
    },
    {
      id: 'meeting-waters',
      title: 'Expedição Encontro das Águas',
      location: 'Rio Negro e Solimões',
      price: 1250,
      duration: '7 Dias',
      rating: 4.8,
      category: 'Rios',
      image: gal002,
      features: ['Passeio de Barco', 'Observação de Botos', 'Almoço Regional']
    },
    {
      id: 'anavilhanas',
      title: 'Sossego no Arquipélago Anavilhanas',
      location: 'Novo Airão, AM',
      price: 2200,
      duration: '10 Dias',
      rating: 5.0,
      category: 'Natureza',
      image: gal003,
      features: ['Hotel de Selva', 'Transfer Incluso', 'Pensão Completa']
    },
    {
      id: 'culture-manaus',
      title: 'Imersão Cultural em Manaus',
      location: 'Centro Histórico, AM',
      price: 450,
      duration: '3 Dias',
      rating: 4.7,
      category: 'Cultura',
      image: gal004,
      features: ['Teatro Amazonas', 'Mercado Municipal', 'Museus']
    },
    {
      id: 'survival-skills',
      title: 'Curso de Sobrevivência na Selva',
      location: 'Reserva Particular, AM',
      price: 1800,
      duration: '4 Dias',
      rating: 4.9,
      category: 'Aventura',
      image: gal005,
      features: ['Técnicas Reais', 'Abrigo de Selva', 'Certificado']
    },
    {
      id: 'birdwatching',
      title: 'Expedição de Observação de Aves',
      location: 'Rio Urubu, AM',
      price: 1550,
      duration: '6 Dias',
      rating: 4.8,
      category: 'Natureza',
      image: gal006,
      features: ['Binóculos Inclusos', 'Guia Ornitólogo', 'Fotos']
    }
  ];

  const categories = ['Todos', 'Aventura', 'Rios', 'Natureza', 'Cultura'];

  const filteredPackages = packages.filter(pkg => {
    const matchesCategory = activeCategory === 'Todos' || pkg.category === activeCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="packages-page">
      {/* Page Hero */}
      <section style={{
        padding: '6rem 0 4rem 0',
        backgroundColor: '#000',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${gal001})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', marginBottom: '1rem', fontWeight: 800, color: '#fff' }}>Nossos Destinos</h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Explore os melhores pacotes selecionados para você viver a Amazônia de forma autêntica e segura.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="packages-grid-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '3rem' }}>
          
          {/* Sidebar Filters */}
          <aside>
            <div style={{ position: 'sticky', top: '160px' }}>
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Search size={20} /> Buscar Destino
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

              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Filter size={20} /> Categorias
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
                        padding: '0.75rem 1rem',
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

              <div className="card" style={{ padding: '1.5rem', backgroundColor: '#003D5C', color: '#fff', borderRadius: '20px' }}>
                <h4 style={{ color: '#FFD700', marginBottom: '1rem' }}>Precisa de Ajuda?</h4>
                <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                  Nossos especialistas podem criar um roteiro 100% personalizado para você.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: '#FFD700', color: '#000' }}>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}>
                Ordenar por: <span style={{ color: '#003D5C', fontWeight: 600 }}>Mais Recentes</span> <ChevronDown size={16} />
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
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: '#003D5C', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {pkg.category}
                      </div>
                    </div>
                    
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          <Clock size={14} color="#7EB53F" /> {pkg.duration}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                          <MapPin size={14} color="#7EB53F" /> {pkg.location.split(',')[0]}
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
                          <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#000' }}>R$ {pkg.price}</span>
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
