import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Star, Clock, Calendar, Search as SearchIcon, Filter, ChevronDown, ArrowRight } from 'lucide-react';

// Import gallery images
import gal001 from '../assets/galeria/001.jpg';
import gal002 from '../assets/galeria/002.jpg';
import gal003 from '../assets/galeria/003.jpg';
import gal004 from '../assets/galeria/004.jpg';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const packages = [
    {
      id: 'amazon-trail',
      title: 'Trilha de Aventura na Selva',
      location: 'Manaus, AM',
      destinations: '3 Destinos',
      price: 899,
      oldPrice: 1100,
      duration: '5 Dias',
      rating: 4.9,
      reviews: 128,
      image: gal001,
    },
    {
      id: 'meeting-waters',
      title: 'Expedição Encontro das Águas',
      location: 'Rio Negro, AM',
      destinations: '2 Destinos',
      price: 1250,
      oldPrice: 1500,
      duration: '7 Dias',
      rating: 4.8,
      reviews: 95,
      image: gal002,
    },
    {
      id: 'anavilhanas',
      title: 'Sossego no Arquipélago Anavilhanas',
      location: 'Novo Airão, AM',
      destinations: '4 Destinos',
      price: 2200,
      oldPrice: 2600,
      duration: '10 Dias',
      rating: 5.0,
      reviews: 54,
      image: gal003,
    },
    {
      id: 'culture-manaus',
      title: 'Imersão Cultural em Manaus',
      location: 'Manaus, AM',
      destinations: '1 Destino',
      price: 450,
      oldPrice: 600,
      duration: '3 Dias',
      rating: 4.7,
      reviews: 210,
      image: gal004,
    }
  ];

  return (
    <div className="search-results-page" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <section style={{ 
        backgroundColor: '#003D5C', 
        padding: '6rem 0', 
        color: '#fff',
        backgroundImage: `linear-gradient(rgba(0, 61, 92, 0.85), rgba(0, 61, 92, 0.85)), url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>Resultados da sua Busca</h1>
          <p style={{ opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px' }}>Mostrando resultados para sua próxima aventura na Amazônia.</p>
        </div>
      </section>

      <div className="container" style={{ padding: '5rem 0' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '2rem' 
        }}>
          {packages.map(pkg => (
            <div key={pkg.id} className="package-card-new" style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '200px' }}>
                <Link to={`/tour/${pkg.id}`}>
                  <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <Link to={`/tour/${pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3, height: '3rem', overflow: 'hidden' }}>
                    {pkg.title}
                  </h3>
                </Link>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} color="#7EB53F" /> {pkg.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#7EB53F" /> {pkg.destinations}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{pkg.rating}</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={12} fill="#FFD700" color="#FFD700" />)}
                  </div>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>({pkg.reviews} avaliações)</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', marginRight: '8px' }}>R$ {pkg.oldPrice}</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#000' }}>R$ {pkg.price}</span>
                  </div>
                  <Link to={`/tour/${pkg.id}`} style={{ 
                    width: '38px', height: '38px', borderRadius: '50%', 
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
      </div>
    </div>
  );
};

export default SearchResults;
