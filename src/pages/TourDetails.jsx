import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, Clock, Calendar, Check, Users, Navigation, 
  ChevronRight, Share2, Heart, ShieldCheck, Info, FileText, 
  Image as ImageIcon, ListChecks, Map, MessageSquare, Plus, ShoppingCart
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleAddToCart = () => {
    const tourData = {
      id: id || 'amazon-adventure',
      title: "Expedição Amazônia Profunda",
      duration: "5 dias",
      destinations: "3 Destinos",
      date: selectedDate || "A combinar",
      guests: `${adults} adultos - ${children} crianças`,
      price: "1250.00",
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800"
    };
    addToCart(tourData);
    navigate('/checkout');
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tourData = {
    title: "Exploração Encontro das Águas",
    location: "Manaus, Amazonas",
    price: "1.250,00",
    rating: 4.9,
    reviews: 128,
    duration: "7 Dias / 6 Noites",
    groupSize: "Máx 12 Pessoas",
    languages: "Português, Inglês",
    tourType: "Aventura e Natureza",
    description: "Embarque em uma jornada inesquecível pelo majestoso Rio Negro e Solimões. Esta expedição de 7 dias é projetada para mergulhar você na beleza natural de tirar o fôlego, na cultura ancestral e nas paisagens emocionantes da Amazônia. Seja você um explorador ávido ou um entusiasta da natureza, este tour oferece o equilíbrio perfeito entre desafio e recompensa.",
    highlights: [
      "Guias locais bilíngues especializados.",
      "Acomodações em eco-lodges confortáveis.",
      "Vista icônica do Encontro das Águas ao amanhecer.",
      "Visita a comunidades indígenas locais.",
      "Todo o transporte fluvial e terrestre incluso.",
      "Refeições regionais autênticas inclusas."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1978&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581333100576-b73bbe92c19a?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589556264800-08ae9e129a8a?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebe?q=80&w=2000&auto=format&fit=crop"
    ],
    itinerary: [
      { day: "Dia 1", title: "Chegada em Manaus", desc: "Boas-vindas à Amazônia! Traslado do aeroporto para o hotel. À noite, briefing com a equipe sobre a expedição." },
      { day: "Dia 2", title: "Navegação para o Janauari", desc: "Início da jornada fluvial. Visita ao Parque Ecológico Janauari para ver as vitórias-régias e os igapós." },
      { day: "Dia 3", title: "O Grande Encontro", desc: "Observação do fenômeno natural do Encontro das Águas sob a luz do nascer do sol. Pesca esportiva e focagem noturna." },
      { day: "Dia 4-7", title: "Selva Adentro e Retorno", desc: "Trilhas interpretativas, visitas a comunidades e retorno para Manaus no final do sétimo dia." }
    ],
    included: [
      "Traslados Aeroporto/Hotel/Porto",
      "Guia bilíngue certificado",
      "Todas as refeições (Pensão Completa)",
      "Equipamentos de segurança",
      "Seguro viagem básico"
    ],
    excluded: [
      "Passagens aéreas",
      "Bebidas alcoólicas",
      "Gorjetas",
      "Compras pessoais"
    ]
  };

  return (
    <div className="tour-details-page" style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${tourData.gallery[0]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ 
            fontSize: '1rem', 
            fontWeight: 700, 
            letterSpacing: '3px', 
            textTransform: 'uppercase', 
            marginBottom: '1rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            A partir de R$ {tourData.price}
          </p>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            fontWeight: 800, 
            marginBottom: '2rem',
            lineHeight: 1.1,
            textShadow: '0 5px 15px rgba(0,0,0,0.5)'
          }}>
            {tourData.title}
          </h1>
          
          <div style={{
            backgroundColor: '#fff',
            color: '#000',
            padding: '1rem 2rem',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            transform: 'translateY(50%)',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transformOrigin: 'center',
            transform: 'translateX(-50%) translateY(50%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} fill="#FFD700" color="#FFD700" />
              <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>{tourData.rating}</span>
            </div>
            <div style={{ height: '24px', width: '1px', backgroundColor: '#e2e8f0' }}></div>
            <div style={{ fontWeight: 600 }}>{tourData.reviews} Avaliações</div>
            <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
               <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><Share2 size={20} /></button>
               <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}><Heart size={20} /></button>
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: '5rem 0 3rem 0' }}>
        <div className="container">
          {/* Quick Info Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            padding: '2.5rem',
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            marginBottom: '4rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: '#000', backgroundColor: '#FFD700', padding: '0.75rem', borderRadius: '12px' }}><Clock size={24} /></div>
              <div><p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Duração</p> <p style={{ fontWeight: 700 }}>{tourData.duration}</p></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: '#000', backgroundColor: '#FFD700', padding: '0.75rem', borderRadius: '12px' }}><Users size={24} /></div>
              <div><p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Tamanho do Grupo</p> <p style={{ fontWeight: 700 }}>{tourData.groupSize}</p></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: '#000', backgroundColor: '#FFD700', padding: '0.75rem', borderRadius: '12px' }}><MessageSquare size={24} /></div>
              <div><p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Idiomas</p> <p style={{ fontWeight: 700 }}>{tourData.languages}</p></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ color: '#000', backgroundColor: '#FFD700', padding: '0.75rem', borderRadius: '12px' }}><Map size={24} /></div>
              <div><p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Tipo de Tour</p> <p style={{ fontWeight: 700 }}>{tourData.tourType}</p></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'start' }}>
            {/* Left Column Content */}
            <div>
              {/* About Section */}
              <section id="about" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <Info size={32} className="text-primary" /> Sobre o Pacote
                </h2>
                <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>O que esperar:</h3>
                  <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
                    {tourData.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <div style={{ color: '#22c55e', marginTop: '3px' }}><Check size={20} strokeWidth={3} /></div>
                        <span style={{ color: '#475569', fontSize: '0.95rem' }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem' }}>{tourData.description}</p>
                </div>
              </section>

              {/* Gallery Section */}
              <section id="gallery" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <ImageIcon size={32} className="text-primary" /> Galeria de Fotos
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gridTemplateRows: 'repeat(2, 200px)',
                  gap: '1rem',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}>
                  <div style={{ gridRow: 'span 2' }}>
                    <img src={tourData.gallery[1]} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <img src={tourData.gallery[2]} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <img src={tourData.gallery[3]} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                    <img src={tourData.gallery[4]} alt="Gallery" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '15px' }} />
                    <img src={tourData.gallery[5]} alt="Gallery" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '15px' }} />
                    <div style={{ position: 'relative', height: '150px', borderRadius: '15px', overflow: 'hidden' }}>
                      <img src={tourData.gallery[0]} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                        +15 fotos
                      </div>
                    </div>
                </div>
              </section>

              {/* Itinerary Section */}
              <section id="itinerary" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <ListChecks size={32} className="text-primary" /> Roteiro da Viagem
                </h2>
                <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', backgroundColor: '#e2e8f0' }}></div>
                    {tourData.itinerary.map((item, i) => (
                      <div key={i} style={{ position: 'relative', paddingLeft: '3rem' }}>
                        <div style={{ 
                          position: 'absolute', 
                          left: 0, 
                          top: 0, 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          backgroundColor: i === 0 ? '#FFD700' : '#fff', 
                          border: '2px solid #FFD700', 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                          fontSize: '0.85rem',
                          fontWeight: 800
                        }}>{i + 1}</div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                          <span style={{ color: '#000' }}>{item.day}:</span> {item.title}
                        </h4>
                        <p style={{ color: '#64748b', lineHeight: 1.7 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Policy Section */}
              <section id="policy" style={{ marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <FileText size={32} className="text-primary" /> Políticas do Tour
                </h2>
                <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                       O que está incluso:
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {tourData.included.map((item, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
                          <Check size={18} className="text-primary" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Não incluso:</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {tourData.excluded.map((item, i) => (
                        <li key={i} style={{ display: 'flex', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
                          <div style={{ color: '#ef4444' }}><Plus size={18} style={{ transform: 'rotate(45deg)' }} /></div> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky Sidebar Booking Widget */}
            <div style={{ position: 'sticky', top: '100px' }}>
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
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000' }}>R$ {tourData.price}</span>
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
                        onChange={(e) => setAdults(e.target.value)}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                      >
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>CRIANÇAS</label>
                      <select 
                        value={children}
                        onChange={(e) => setChildren(e.target.value)}
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
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Reserve esta aventura hoje!</h2>
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
    </div>
  );
};

export default TourDetails;
