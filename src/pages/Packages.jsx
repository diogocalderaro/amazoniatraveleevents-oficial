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
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1978&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1549543048-4ddd3121b2ca?q=80&w=2000&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebe?q=80&w=2000&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1581333100576-b73bbe92c19a?q=80&w=2000&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1520690214124-2405c5217036?q=80&w=2000&auto=format&fit=crop',
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 800 }}>Nossos Destinos</h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}>
            Explore os melhores pacotes selecionados para você viver a Amazônia de forma autêntica e segura.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
          
          {/* Sidebar Filters */}
          <aside>
            <div style={{ position: 'sticky', top: '2rem' }}>
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
                        backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'transparent',
                        color: activeCategory === cat ? '#fff' : 'var(--color-text-main)',
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

              <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--color-secondary)', color: '#fff' }}>
                <h4 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Precisa de Ajuda?</h4>
                <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', opacity: 0.9 }}>
                  Nossos especialistas podem criar um roteiro 100% personalizado para você.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  Falar com Consultor
                </Link>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <p style={{ color: 'var(--color-text-muted)' }}>
                Mostrando <strong>{filteredPackages.length}</strong> pacotes em <strong>{activeCategory}</strong>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', cursor: 'pointer' }}>
                Ordenar por: <span style={{ color: 'var(--color-secondary)', fontWeight: 600 }}>Mais Recentes</span> <ChevronDown size={16} />
              </div>
            </div>

            {filteredPackages.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                {filteredPackages.map(pkg => (
                  <div key={pkg.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
                    <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.25rem' }}>
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        style={{ width: '100%', height: '260px', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                        className="pkg-img"
                      />
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                        <Star size={16} fill="var(--color-primary)" className="text-primary" /> {pkg.rating}
                      </div>
                      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: 'var(--color-secondary)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600 }}>
                        {pkg.category}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                        <Clock size={14} className="text-primary" /> {pkg.duration}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                        <MapPin size={14} className="text-primary" /> {pkg.location.split(',')[0]}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', lineHeight: 1.3 }}>{pkg.title}</h3>
                    
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {pkg.features.map((feat, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: '#F1F5F9', borderRadius: '4px', color: 'var(--color-text-muted)' }}>
                          • {feat}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                      <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>R$ {pkg.price}</span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}> / pessoa</span>
                      </div>
                      <Link to={`/tour/${pkg.id}`} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
                        Detalhes
                      </Link>
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
      
      {/* Newsletter Block */}
      <section style={{ backgroundColor: 'var(--color-bg-alt)', padding: '6rem 0' }}>
        <div className="container">
           <div className="card" style={{ 
             padding: '4rem', 
             backgroundColor: 'var(--color-secondary)', 
             color: '#fff', 
             textAlign: 'center',
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
             gap: '2rem'
           }}>
              <PlaneTakeoff size={48} className="text-primary" />
              <div style={{ maxWidth: '600px' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Receba Experiências Exclusivas</h2>
                <p style={{ opacity: 0.8 }}>Inscreva-se para receber novidades sobre novos roteiros, expedições científicas e promoções antecipadas.</p>
              </div>
              <form style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: 'none', outline: 'none' }}
                />
                <button className="btn btn-primary" style={{ padding: '0 2rem' }}>Cadastrar</button>
              </form>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
