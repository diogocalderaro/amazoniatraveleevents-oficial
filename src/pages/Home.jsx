import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Play, MapPin, Star, Calendar, Clock, 
  ChevronRight, ArrowRight, Shield, Award, 
  Compass, Check, X, Search, User, CheckCircle2, Phone, ChevronDown, ChevronUp, ChevronLeft
} from 'lucide-react';

/* Using the local assets images */
import pkgHimalaya from '../assets/pkg-himalaya.png';
import pkgEurope from '../assets/pkg-europe.png';
import pkgBeach from '../assets/pkg-beach.png';
import heroBg from '../assets/galeria/013.jpg';

// Import gallery images
import gal001 from '../assets/galeria/001.jpg';
import gal002 from '../assets/galeria/002.jpg';
import gal003 from '../assets/galeria/003.jpg';
import gal004 from '../assets/galeria/004.jpg';
import gal005 from '../assets/galeria/005.jpg';
import gal006 from '../assets/galeria/006.jpg';
import gal008 from '../assets/galeria/008.jpg';
import gal009 from '../assets/galeria/009.jpg';
import gal010 from '../assets/galeria/010.jpg';
import gal011 from '../assets/galeria/011.jpg';
import gal012 from '../assets/galeria/012.jpg';
import gal013 from '../assets/galeria/013.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroIdx1, setHeroIdx1] = useState(0);
  const [heroIdx2, setHeroIdx2] = useState(1);
  const [heroIdx3, setHeroIdx3] = useState(2);

  const heroImageList = [gal010, gal011, gal012, gal001, gal002, gal003, gal004, gal005, gal006, gal008, gal009, gal013];
  
  const [packagesData, setPackagesData] = useState([]);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => setPackagesData(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer1 = setInterval(() => setHeroIdx1(prev => (prev + 1) % heroImageList.length), 5000);
    const timer2 = setInterval(() => setHeroIdx2(prev => (prev + 1) % heroImageList.length), 6500);
    const timer3 = setInterval(() => setHeroIdx3(prev => (prev + 1) % heroImageList.length), 8000);
    return () => { clearInterval(timer1); clearInterval(timer2); clearInterval(timer3); };
  }, []);

  const carouselRef = React.useRef(null);
  const isHoveredRef = React.useRef(false);


  const handleCarouselScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.clientWidth;
    const currentSlide = Math.round(scrollLeft / width);
    setActiveSlide(currentSlide);
  };

  // 5 second auto-play for carousel (pauses on hover)
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current && !isHoveredRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // If near end, jump back to start smoothly (will improve with cloning later if needed)
        // For now, making it a continuous loop by detecting the end
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Infinite loop logic for manual arrows
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const scrollAmount = 350;
      
      if (direction === 'left') {
        if (scrollLeft <= 0) {
          carouselRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 50) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { 
      question: "Quais serviços sua agência de viagens oferece?", 
      answer: "Oferecemos uma ampla gama de serviços, incluindo reserva de hotéis, passagens aéreas, passeios guiados personalizados, expedições pela selva, transporte fluvial e suporte local completo em Manaus e região." 
    },
    { 
      question: "Vocês oferecem pacotes de viagem personalizados?", 
      answer: "Sim! Somos especialistas em criar roteiros sob medida de acordo com seus interesses, tempo disponível e orçamento. Seja para aventura solo ou viagem em família." 
    },
    { 
      question: "Posso reservar voos, hotéis e passeios separadamente?", 
      answer: "Nossa agência oferece flexibilidade total. Você pode optar por pacotes 'all-inclusive' ou reservar apenas os serviços específicos que necessita, como guias especializados ou estadias em jungle lodges." 
    },
    { 
      question: "Você oferece assistência para visto?", 
      answer: "Prestamos orientações gerais sobre os requisitos de entrada no Brasil para estrangeiros e auxiliamos com a documentação necessária para viajantes brasileiros em destinos internacionais parceiros." 
    },
    { 
      question: "Quais métodos de pagamento você aceita?", 
      answer: "Aceitamos todos os principais cartões de crédito (Visa, Mastercard, Amex), PayPal, transferências bancárias e PIX." 
    },
    { 
      question: "Quais Documentos de Viagem São Necessários?", 
      answer: "Para destinos nacionais, RG ou CNH original com foto. Para estrangeiros, passaporte válido. Dependendo da região da Amazônia, recomenda-se o comprovante de vacinação contra febre amarela." 
    }
  ];

  const galleryImages = [
    { src: gal001, title: "Encontro das Águas" },
    { src: gal002, title: "Floresta Amazônica" },
    { src: gal003, title: "Pôr do sol no Rio" },
    { src: gal004, title: "Reflexos na Água" },
    { src: gal005, title: "Rio Negro" },
    { src: gal006, title: "Cachoeiras de Figueiredo" },
    { src: gal008, title: "Cultura Local" },
    { src: gal009, title: "Fauna Regional" }
  ];

  return (
    <div className="home-page">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              style={{ 
                maxWidth: '100%',
                maxHeight: '80vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '8px', 
                boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                animation: 'zoom 0.3s ease',
                objectFit: 'contain'
              }} 
            />
            <div style={{
              position: 'absolute',
              bottom: '-40px',
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#fff',
              fontSize: '1.25rem',
              fontWeight: 600
            }}>
              {selectedImage.title}
            </div>
            <button style={{
              position: 'absolute',
              top: '-50px',
              right: '0',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
               <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero" style={{ 
        position: 'relative',
        padding: '6rem 0 12rem 0',
        backgroundColor: '#000',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'visible'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem', 
            alignItems: 'center',
            position: 'relative', 
            zIndex: 10 
          }}>
            <div style={{ maxWidth: '650px' }}>
              <h1 style={{ 
                color: '#fff',
                fontSize: 'clamp(2.3rem, 10vw, 6rem)',
                marginBottom: '1rem',
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: '-2px'
              }}>
                <span style={{ color: '#FFD700' }}>PASSEIO TURÍSTICO</span><br className="hide-mobile"/>REGIONAL
              </h1>

              {/* Discount Badge */}
              <div className="discount-badge" style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '150px',
                height: '150px',
                backgroundColor: '#FFD700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1rem',
                fontWeight: 800,
                transform: 'rotate(-10deg)',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                zIndex: 5
              }}>
                <span style={{ fontSize: '1.2rem', color: '#000', fontWeight: 900 }}>Saída todos os dias</span>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>TODOS OS PACOTES INCLUEM</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                   {[
                     "Seguro de Viagem", "Reserva de Hotéis",
                     "Voo de Volta", "Passagens de Avião",
                     "Acomodação", "Serviços de Visto",
                     "Aluguel de Veículos", "Suporte 24h"
                   ].map((feat, i) => (
                     <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ color: '#FFD700' }}>
                           <CheckCircle2 size={18} fill="#FFD700" color="#000" />
                        </div>
                        <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{feat}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => navigate('/destinos')}
                  className="btn btn-primary" 
                  style={{ backgroundColor: '#FFD700', color: '#000', padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: '100px', fontWeight: 800, border: 'none' }}
                >
                  Reserve Agora
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFD700' }}>
                     <Phone size={24} fill="#FFD700" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>92 99350-2913</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Ligue Agora</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tilted Images Container */}
            <div className="hero-images hide-mobile" style={{ position: 'relative', height: '500px' }}>
              {/* Image 1 (Top Left) */}
              <img 
                key={`img1-${heroIdx1}`}
                src={heroImageList[heroIdx1]} 
                alt="Exploração 1" 
                loading="lazy"
                style={{ 
                  position: 'absolute', top: '0', left: '-50px',
                  width: '320px', height: '220px', objectFit: 'cover',
                  borderRadius: '20px', border: '8px solid #fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'rotate(-10deg)', zIndex: 3,
                  animation: 'heroFade 2s ease-in-out'
                }} 
              />
              {/* Image 2 (Middle) */}
              <img 
                key={`img2-${heroIdx2}`}
                src={heroImageList[heroIdx2]} 
                alt="Exploração 2" 
                loading="lazy"
                style={{ 
                  position: 'absolute', top: '25%', right: '-40px',
                  width: '380px', height: '260px', objectFit: 'cover',
                  borderRadius: '20px', border: '8px solid #fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'rotate(5deg)', zIndex: 4,
                  animation: 'heroFade 2s ease-in-out'
                }} 
              />
              {/* Image 3 (Bottom) */}
              <img 
                key={`img3-${heroIdx3}`}
                src={heroImageList[heroIdx3]} 
                alt="Exploração 3" 
                loading="lazy"
                style={{ 
                  position: 'absolute', bottom: '0', left: '0',
                  width: '350px', height: '240px', objectFit: 'cover',
                  borderRadius: '20px', border: '8px solid #fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'rotate(-5deg)', zIndex: 5,
                  animation: 'heroFade 2s ease-in-out'
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Bar - outside hero so it doesn't overlap on mobile */}
      <div className="container search-container" style={{
        position: 'relative',
        marginTop: '-60px',
        zIndex: 30,
        width: '95%',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div className="search-bar glass" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
          border: '1px solid #f1f5f9'
        }}>
          <div style={{ flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0' }} className="search-field">
            <MapPin style={{ color: '#FFD700' }} />
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Para onde?</p>
              <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: 600, fontSize: '16px' }}>
                <option>Selecione o local</option>
                <option>Manaus - AM</option>
                <option>Presidente Figueiredo - AM</option>
                <option>Anavilhanas - AM</option>
              </select>
            </div>
          </div>
          <label 
            htmlFor="date-ida"
            className="search-field" 
            style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0', cursor: 'pointer' }}
            onClick={(e) => {
              const input = document.getElementById('date-ida');
              if (input && typeof input.showPicker === 'function') {
                input.showPicker();
              }
            }}
          >
             <Calendar style={{ color: '#FFD700', flexShrink: 0 }} />
             <div style={{ width: '100%' }}>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>Data de Ida</p>
                <input id="date-ida" type="date" style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 600, fontFamily: 'inherit', fontSize: '16px', color: '#333', width: '100%', cursor: 'pointer' }} />
             </div>
          </label>
          <label 
            htmlFor="date-volta"
            className="search-field" 
            style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0', cursor: 'pointer' }}
            onClick={(e) => {
              const input = document.getElementById('date-volta');
              if (input && typeof input.showPicker === 'function') {
                input.showPicker();
              }
            }}
          >
             <Calendar style={{ color: '#FFD700', flexShrink: 0 }} />
             <div style={{ width: '100%' }}>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>Data de Volta</p>
                <input id="date-volta" type="date" style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 600, fontFamily: 'inherit', fontSize: '16px', color: '#333', width: '100%', cursor: 'pointer' }} />
             </div>
          </label>
          <div className="search-field" style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem' }}>
            <User style={{ color: '#FFD700' }} />
            <div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Viajantes</p>
                <select defaultValue="1 Pessoa" style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: 600, fontSize: '16px' }}>
                  <option value="1 Pessoa">1 Pessoa</option>
                  <option value="2 Pessoas">2 Pessoas</option>
                  <option value="3+ Pessoas">3+ Pessoas</option>
                </select>
            </div>
          </div>
          <button 
            onClick={() => navigate('/buscar')}
            className="btn btn-primary" style={{
            minWidth: '140px', height: '60px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.5rem', backgroundColor: '#000', color: '#fff', border: 'none'
          }}>
            <Search size={22} /> <span style={{ fontWeight: 700 }}>BUSCAR</span>
          </button>
        </div>
      </div>

      {/* Popular Packages Section */}
      <section style={{ paddingTop: '3rem', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>Pacotes de Viagem Populares</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2.5rem' }}>Escolha seu destino e conecte-se com a natureza exuberante.</p>
          </div>

          <div style={{ position: 'relative' }}
            onMouseEnter={() => isHoveredRef.current = true}
            onMouseLeave={() => isHoveredRef.current = false}
          >
            <div 
              ref={carouselRef}
              className="home-packages-carousel" 
              style={{
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                padding: '1rem 0.5rem 2rem 0.5rem',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
              onScroll={handleCarouselScroll}
            >
              {packagesData.slice(0, 6).map((pkg) => (
                <div key={pkg.id} className="package-card-new package-item" style={{ 
                  flex: '0 0 auto', 
                  width: 'calc(25% - 1.125rem)', 
                  minWidth: '280px',
                  scrollSnapAlign: 'start', 
                  backgroundColor: '#fff', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
                  display: 'flex', 
                  flexDirection: 'column',
                  margin: '0.5rem 0'
                }}>
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <Link to={`/passeio/${pkg.slug || pkg.id}`}>
                      <img src={pkg.image_url || pkg.image} alt={pkg.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="pkg-img-hover" />
                    </Link>
                  </div>
                  
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Link to={`/passeio/${pkg.slug || pkg.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3, height: '2.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {pkg.title}
                      </h3>
                    </Link>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', color: '#64748b', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} color="#7EB53F" /> {pkg.duration}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} color="#7EB53F" /> {pkg.location}
                      </div>
                    </div>

                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {pkg.installments && (pkg.installment_price || pkg.installmentPrice) ? (
                          <>
                            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                              {pkg.installments}x no cartão de{' '}
                              <strong style={{ color: '#000' }}>
                                R$ {Number(pkg.installment_price || pkg.installmentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </strong>
                            </span>
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#000' }}>
                              à vista R$ {Number(pkg.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </>
                        ) : (
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#000' }}>{pkg.price_display || pkg.priceDisplay || new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pkg.price)}</span>
                        )}
                      </div>
                      <Link to={`/passeio/${pkg.slug || pkg.id}`} className="nav-arrow-btn">
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Navigation Buttons */}
            <button 
              onClick={() => scrollCarousel('left')}
              className="carousel-control-btn left hide-mobile"
              aria-label="Anterior"
              style={{ left: '-60px' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="carousel-control-btn right hide-mobile"
              aria-label="Próximo"
              style={{ right: '-60px' }}
            >
              <ChevronRight size={24} />
            </button>
            <div className="carousel-dots hide-desktop" style={{ display: 'none', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
              {packagesData.slice(0, 6).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.scrollTo({ left: idx * carouselRef.current.clientWidth, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    width: activeSlide === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: activeSlide === idx ? '#FFD700' : '#e2e8f0',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <style>{`
              .home-packages-carousel::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/destinos" className="btn" style={{ padding: '1rem 3rem', border: '2px solid #000', borderRadius: '100px', fontWeight: 800, color: '#000', textDecoration: 'none' }}>Ver Todos os Pacotes</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ backgroundColor: '#fff', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', fontWeight: 900, textAlign: 'center', marginBottom: '1rem', color: '#000' }}>Perguntas e Respostas</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '3rem', fontSize: '1.25rem' }}>Estamos comprometidos em oferecer mais do que apenas produtos — proporcionamos experiências excepcionais.</p>
          </div>

          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '1.5rem', borderRadius: '12px', border: activeFaq === index ? '2px solid #FFD700' : '1px solid #e2e8f0', backgroundColor: activeFaq === index ? '#fff' : '#f8fafc', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                <button 
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#000' }}>{faq.question}</span>
                  {activeFaq === index ? <ChevronUp size={24} color="#FFD700" /> : <ChevronDown size={24} color="#64748b" />}
                </button>
                <div style={{ 
                  maxHeight: activeFaq === index ? '500px' : '0',
                  opacity: activeFaq === index ? 1 : 0,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '0 2rem 2rem 2rem', color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8 }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ backgroundColor: '#f8fafc', padding: '5rem 0' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>Galeria da Amazônia</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '3rem' }}>Um vislumbre das maravilhas que esperam por você.</p>
          </div>
          <div className="gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: '280px',
            gap: '1.5rem'
          }}>
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(img)}
                style={{ 
                  borderRadius: '15px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'zoom-in',
                  position: 'relative'
                }}
                className="gallery-item"
              >
                <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  padding: '1rem',
                  textAlign: 'center'
                }}
                className="gallery-overlay"
                >
                   <Search size={32} style={{ marginBottom: '1rem', color: '#fff' }} />
                   <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>O Que Dizem os Viajantes</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '3rem' }}>Somos referência em atendimento personalizado e experiências inesquecíveis.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
             {/* Review 1 */}
             <div style={{ backgroundColor: '#f8fafc', padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1.5rem' }}>
                <Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" />
              </div>
              <p style={{ color: '#475569', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                "O passeio foi muito bem organizado e aproveitamos cada minuto. A equipe foi impecável e nos sentimos muito seguros o tempo todo. Recomendo muito!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000' }}>RM</div>
                <div>
                  <div style={{ fontWeight: 800 }}>Ricardo Mendes</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Viajante Solo</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1.5rem' }}>
                <Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" />
              </div>
              <p style={{ color: '#475569', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                "A Amazônia é mágica, mas com o guia certo tudo fica ainda melhor. O roteiro foi perfeito para conhecer a cultura local e as belezas naturais."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000' }}>AL</div>
                <div>
                  <div style={{ fontWeight: 800 }}>André Lima</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Viajante Solo</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div style={{ backgroundColor: '#f8fafc', padding: '2.5rem', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1.5rem' }}>
                <Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" /><Star size={18} fill="#fbbf24" />
              </div>
              <p style={{ color: '#475569', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                "Viagem maravilhosa em família. Tudo pensado nos mínimos detalhes. Com certeza voltaremos para conhecer mais desse paraíso brasileiro."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000' }}>MS</div>
                <div>
                  <div style={{ fontWeight: 800 }}>Maria Santos</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Viagem em Família</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .package-card-new {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .package-card-new:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.12) !important;
        }
        .package-card-new:hover .pkg-img-hover {
          transform: scale(1.1);
        }
        .nav-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #FFD700;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .nav-arrow-btn:hover {
          background-color: #000;
          color: #FFD700;
          transform: scale(1.1);
        }
        .carousel-control-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          zIndex: 10;
          transition: all 0.3s ease;
        }
        .carousel-control-btn:hover {
          background-color: #FFD700;
          color: #000;
          border-color: #FFD700;
          box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
        }
        .carousel-control-btn.left { left: -24px; }
        .carousel-control-btn.right { right: -24px; }

        .home-packages-carousel::-webkit-scrollbar {
          display: none;
        }
        
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
        @keyframes zoom {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .search-bar { flex-direction: column; align-items: stretch !important; gap: 1rem; }
          .search-field { border-right: none !important; border-bottom: 1px solid #E2E8F0; padding-bottom: 1rem !important; }
          .search-container { margin-top: 0 !important; width: 100% !important; }
          .hero { padding-bottom: 4rem !important; }
          .discount-badge { width: 110px !important; height: 110px !important; position: relative !important; margin: -1rem 0 2rem auto !important; top: auto !important; right: auto !important; transform: rotate(5deg) !important; box-shadow: none !important; }
          .home-packages-carousel { scroll-snap-type: x mandatory !important; }
          .package-item { width: 100% !important; min-width: 100% !important; scroll-snap-align: center !important; flex: 0 0 100% !important; }
          .carousel-dots { display: flex !important; }
        @keyframes heroFade {
          from { opacity: 0.1; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-auto-rows: 150px !important;
            gap: 0.5rem !important;
          }
          .gallery-overlay h4 {
            font-size: 0.85rem !important;
          }
          .gallery-overlay svg {
            width: 20px;
            height: 20px;
            margin-bottom: 0.5rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Home;
