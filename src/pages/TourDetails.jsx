import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, Clock, Calendar, Check, Users, Navigation, 
  ChevronRight, Share2, Heart, ShieldCheck, Info, FileText, 
  Image as ImageIcon, ListChecks, Map, MessageSquare, Plus, ShoppingCart,
  CheckCircle2, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Import gallery images
import gal010 from '../assets/galeria/010.jpg';
import gal011 from '../assets/galeria/011.jpg';
import gal012 from '../assets/galeria/012.jpg';
import gal013 from '../assets/galeria/013.jpg';
import gal001 from '../assets/galeria/001.jpg';
import gal002 from '../assets/galeria/002.jpg';

import { packagesData } from '../data/toursData';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState('sobre');

  const tourData = packagesData.find(pkg => pkg.id === id) || packagesData[0];

  const handleAddToCart = () => {
    const cartData = {
      id: id || tourData.id,
      title: tourData.title,
      duration: tourData.duration,
      destinations: tourData.destinations || "1 Destino",
      date: selectedDate || "A combinar",
      guests: `${adults} adultos - ${children} crianças`,
      price: tourData.price,
      image: tourData.gallery[0]
    };
    addToCart(cartData);
    navigate('/checkout');
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Logic to detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['sobre', 'fotos', 'itinerario', 'politicas'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveTab(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="tour-details-page" style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${tourData.gallery[1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: '#fff'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', width: 'fit-content', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
             <MapPin size={16} /> {tourData.location}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            maxWidth: '800px',
            color: '#fff'
          }}>
            {tourData.title}
          </h1>
        </div>
      </section>

      {/* Internal Navigation Tabs */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', gap: '2rem', overflowX: 'auto' }}>
          {[
            { id: 'sobre', label: 'Sobre', icon: <Info size={18} /> },
            { id: 'fotos', label: 'Fotos', icon: <ImageIcon size={18} /> },
            { id: 'itinerario', label: 'Itinerário', icon: <ListChecks size={18} /> },
            { id: 'politicas', label: 'Políticas', icon: <FileText size={18} /> }
          ].map((tab) => (
            <a 
              key={tab.id} 
              href={`#${tab.id}`} 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(tab.id);
                if (element) {
                  const offset = 150;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              style={{ 
                padding: '1.5rem 0', 
                color: activeTab === tab.id ? '#000' : '#64748b', 
                textDecoration: 'none', 
                fontWeight: 700, 
                fontSize: '0.95rem',
                borderBottom: `3px solid ${activeTab === tab.id ? '#FFD700' : 'transparent'}`,
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon} {tab.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0' }}>
         <div className="tour-details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '4rem', alignItems: 'start' }}>
            {/* Left Column Content */}
            <div>
               {/* Sobre Section */}
               <section id="sobre" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <Info size={32} className="text-primary" /> Sobre o Pacote
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {tourData.description}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {tourData.highlights.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155', fontWeight: 600 }}>
                      <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '6px', borderRadius: '50%' }}><Check size={18} /></div>
                      {item}
                    </div>
                  ))}
                </div>
              </section>

               {/* Gallery Section */}
               <section id="fotos" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <ImageIcon size={32} className="text-primary" /> Galeria de Fotos
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {tourData.gallery.map((img, i) => (
                    <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
                      <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </section>

               {/* Itinerary Section */}
               <section id="itinerario" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <ListChecks size={32} className="text-primary" /> Roteiro da Viagem
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {tourData.itinerary.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '2rem', borderLeft: '3px solid #FFD700', paddingLeft: '2rem', paddingBottom: '1rem' }}>
                      <div style={{ flexShrink: 0 }}>
                        <div style={{ backgroundColor: '#000', color: '#FFD700', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>{item.day}</div>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h4>
                        <p style={{ color: '#64748b' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

               {/* Policy Section */}
               <section id="politicas" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <FileText size={32} className="text-primary" /> Políticas do Tour
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#16a34a' }}><CheckCircle2 size={24} /> O QUE ESTÁ INCLUSO</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {tourData.included.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.95rem' }}>
                          <div style={{ color: '#16a34a' }}><Check size={18} /></div> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ef4444' }}><X size={24} /> NÃO INCLUSO</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {tourData.excluded.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.95rem' }}>
                          <div style={{ color: '#ef4444' }}><Plus size={18} style={{ transform: 'rotate(45deg)' }} /></div> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

             {/* Sticky Sidebar Booking Widget */}
             <div style={{ position: 'sticky', top: '160px' }}>
              <div style={{ 
                backgroundColor: '#fff', 
                padding: '2.5rem', 
                borderRadius: '25px', 
                boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Preço Total</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000' }}>{tourData.priceDisplay || `R$ ${typeof tourData.price === 'number' ? tourData.price.toLocaleString('pt-BR') : tourData.price}`}</span>
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>/pessoa</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>SELECIONE A DATA</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600 }} 
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>ADULTOS</label>
                      <select 
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                      >
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>CRIANÇAS</label>
                      <select 
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value))}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                      >
                        {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  style={{
                  width: '100%',
                  padding: '1.25rem',
                  borderRadius: '15px',
                  backgroundColor: '#000',
                  color: '#FFD700',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <ShoppingCart size={22} /> ADICIONAR AO CARRINHO
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                   <ShieldCheck size={16} /> Pagamento 100% Seguro
                </div>
              </div>

              <div style={{
                marginTop: '1.5rem',
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '20px',
                border: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.75rem', borderRadius: '12px' }}><Plus size={24} /></div>
                <div>
                  <p style={{ fontWeight: 700 }}>Precisa de Ajuda?</p>
                  <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Fale com um especialista agora.</p>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Reviews Banner Section */}
      <section style={{ backgroundColor: '#fff', padding: '6rem 0' }}>
         <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
               <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Avaliações de Clientes</h2>
               <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: '#FFD700', marginBottom: '2rem' }}>
                  <Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" />
               </div>
               <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.8, fontStyle: 'italic' }}>
                  "Uma experiência que mudou minha vida. A organização da Amazonia Travel foi impecável desde o primeiro contato até o retorno para casa."
               </p>
               <p style={{ fontWeight: 800, marginTop: '1.5rem', fontSize: '1.1rem' }}>— Marcos Silveira, São Paulo</p>
            </div>
         </div>
      </section>

      {/* Bottom Booking Banner */}
      <section style={{
        backgroundColor: '#000',
        padding: '5rem 0',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${tourData.gallery[1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
           <div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>Reserve esta aventura hoje!</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px' }}>Não deixe para depois. As vagas para nossas expedições são limitadas para garantir exclusividade e preservação.</p>
          </div>
          <button 
            onClick={handleAddToCart}
            style={{
            padding: '1.5rem 3.5rem',
            backgroundColor: '#FFD700',
            color: '#000',
            borderRadius: '100px',
            border: 'none',
            fontSize: '1.25rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            RESERVAR AGORA
          </button>
        </div>
      </section>
      <style>{`
        .tour-details-grid {
          display: grid;
        }
        @media (max-width: 991px) {
          .tour-details-grid {
            grid-template-columns: 1fr !important;
          }
          .tour-stats-bar {
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
            border-radius: 50px !important;
          }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default TourDetails;
