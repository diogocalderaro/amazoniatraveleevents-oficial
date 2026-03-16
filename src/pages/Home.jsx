import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, User, Search, MapPin, Star, PlaneTakeoff, 
  ShieldCheck, HeartHandshake, Clock, X, CheckCircle, Phone 
} from 'lucide-react';

/* Using the generated placeholder images */
import pkgHimalaya from '../assets/pkg-himalaya.png';
import pkgEurope from '../assets/pkg-europe.png';
import pkgBeach from '../assets/pkg-beach.png';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1000", title: "Encontro das Águas" },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000", title: "Floresta Amazônica" },
    { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000", title: "Pôr do sol no Rio" },
    { src: "https://images.unsplash.com/photo-1520690214124-2405c5217036?q=80&w=1000", title: "Reflexos na Água" },
    { src: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1000", title: "Rio Negro" },
    { src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000", title: "Cachoeiras de Figueiredo" },
    { src: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000", title: "Cultura Local" },
    { src: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=1000", title: "Fauna Regional" }
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
                width: '100%',
                height: 'auto',
                borderRadius: '8px', 
                boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                animation: 'zoom 0.3s ease'
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'visible'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', 
            gap: '2rem', 
            alignItems: 'center',
            position: 'relative', 
            zIndex: 10 
          }}>
            <div style={{ maxWidth: '650px' }}>
              <p style={{ 
                color: '#FFD700', 
                fontWeight: 800, 
                fontSize: '1.25rem',
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}>
                TEMPO PARA VIAJAR
              </p>
              <h1 style={{ 
                color: '#fff',
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                marginBottom: '1rem',
                lineHeight: 0.9,
                fontWeight: 900,
                letterSpacing: '-2px'
              }}>
                EXPLORE<br/>CONOSCO
              </h1>

              {/* Discount Badge */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '35%',
                width: '180px',
                height: '180px',
                backgroundColor: '#FFD700',
                borderRadius: '50%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1rem',
                fontWeight: 800,
                transform: 'rotate(-10deg)',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                zIndex: 5
              }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#000' }}>Levante-se até</span>
                <span style={{ fontSize: '2.5rem', lineHeight: 1, color: '#000' }}>50% DE</span>
                <span style={{ fontSize: '1.2rem', color: '#000' }}>DESCONTO</span>
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
                           <CheckCircle size={18} fill="#FFD700" color="#000" />
                        </div>
                        <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{feat}</span>
                     </div>
                   ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => window.location.href='/destinations'}
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
                    <p style={{ fontWeight: 800, fontSize: '1.25rem', color: '#fff' }}>410-123-4597</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase' }}>Ligue Agora</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tilted Images Container */}
            <div style={{ position: 'relative', height: '500px' }}>
              {/* Image 1 (Top Left) */}
              <img 
                src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=600" 
                alt="Exploração 1" 
                style={{ 
                  position: 'absolute', top: '0', left: '-50px',
                  width: '320px', height: '220px', objectFit: 'cover',
                  borderRadius: '20px', border: '8px solid #fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'rotate(-10deg)', zIndex: 3
                }} 
              />
              {/* Image 2 (Middle) */}
              <img 
                src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600" 
                alt="Exploração 2" 
                style={{ 
                  position: 'absolute', top: '25%', right: '-40px',
                  width: '380px', height: '260px', objectFit: 'cover',
                  borderRadius: '20px', border: '8px solid #fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'rotate(5deg)', zIndex: 4
                }} 
              />
              {/* Image 3 (Bottom) */}
              <img 
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=600" 
                alt="Exploração 3" 
                style={{ 
                  position: 'absolute', bottom: '0', left: '0',
                  width: '350px', height: '240px', objectFit: 'cover',
                  borderRadius: '20px', border: '8px solid #fff',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transform: 'rotate(-5deg)', zIndex: 5
                }} 
              />
            </div>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="container" style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          width: '100%',
          maxWidth: '1200px'
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
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0' }}>
              <MapPin style={{ color: '#FFD700' }} />
              <div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Para onde?</p>
                <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: 600, fontSize: '16px' }}>
                  <option>Selecione o local</option>
                  <option>Manaus - AM</option>
                  <option>Presidente Figueiredo - AM</option>
                  <option>Anavilhanas - AM</option>
                </select>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0' }}>
               <Calendar style={{ color: '#FFD700' }} />
               <div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Quando?</p>
                  <input type="date" style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 600, fontFamily: 'inherit', fontSize: '14px' }} />
               </div>
            </div>
            <div style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem' }}>
              <User style={{ color: '#FFD700' }} />
              <div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>Viajantes</p>
                  <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: 600, fontSize: '16px' }}>
                    <option>2 Pessoas</option>
                    <option>1 Pessoa</option>
                    <option>3+ Pessoas</option>
                  </select>
              </div>
            </div>
            <button className="btn btn-primary" style={{
              minWidth: '140px', height: '60px', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', backgroundColor: '#000', color: '#fff', border: 'none'
            }}>
              <Search size={24} /> <span style={{ fontWeight: 700 }}>BUSCAR</span>
            </button>
          </div>
        </div>
      </section>

      {/* Popular Packages Section */}
      <section style={{ paddingTop: '10rem', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>Pacotes de Viagem Populares</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '4rem' }}>Escolha seu destino e conecte-se com a natureza exuberante.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Package 1 */}
            <Link to="/tour/amazon-adventure" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="package-card" style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease' }}>
                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img src={pkgHimalaya} alt="Aventura na Selva" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} fill="#FFD700" color="#FFD700" /> 4.9
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} color="#FFD700" /> Manaus, Amazonas
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Trilha de Aventura na Selva</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000' }}>R$ 899</span>
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}> / pessoa</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#64748b' }}>
                      <Clock size={16} /> 5 Dias
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Package 2 */}
            <Link to="/tour/encontro-das-aguas" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="package-card" style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease' }}>
                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img src={pkgEurope} alt="Encontro das Águas" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} fill="#FFD700" color="#FFD700" /> 4.8
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} color="#FFD700" /> Rio Negro e Solimões
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Expedição Encontro das Águas</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000' }}>R$ 1250</span>
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}> / pessoa</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#64748b' }}>
                      <Clock size={16} /> 7 Dias
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Package 3 */}
            <Link to="/tour/anavilhanas" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="package-card" style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.3s ease' }}>
                <div style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <img src={pkgBeach} alt="Anavilhanas" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#fff', padding: '0.25rem 0.5rem', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={16} fill="#FFD700" color="#FFD700" /> 5.0
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} color="#FFD700" /> Novo Airão, AM
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Sossego no Arquipélago Anavilhanas</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000' }}>R$ 2200</span>
                    <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}> / pessoa</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: '#64748b' }}>
                      <Clock size={16} /> 10 Dias
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link to="/destinations" className="btn" style={{ padding: '1rem 3rem', border: '2px solid #000', borderRadius: '100px', fontWeight: 800, color: '#000', textDecoration: 'none' }}>Ver Todos os Pacotes</Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ backgroundColor: '#fff', padding: '10rem 0', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
           <div style={{ 
             display: 'grid', 
             gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
             gap: '4rem',
             textAlign: 'center'
           }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <div style={{ 
                      width: '240px', height: '240px', borderRadius: '50%', backgroundColor: '#f4f7f6', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=400" 
                        alt="Seleção" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                      />
                    </div>
                    <div style={{ 
                      position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: '#2563eb', color: '#fff', padding: '0.4rem 1.5rem', 
                      borderRadius: '50px', fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap'
                    }}>
                      Passo 01
                    </div>
                 </div>
                 <h4 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Selecione seu Tour</h4>
                 <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>Escolha entre nossos roteiros exclusivos ou personalize sua própria expedição pela selva.</p>
              </div>
              
              {/* Step 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <div style={{ 
                      width: '240px', height: '240px', borderRadius: '50%', backgroundColor: '#f4f7f6', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400" 
                        alt="Pagamento" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                      />
                    </div>
                    <div style={{ 
                      position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: '#2563eb', color: '#fff', padding: '0.4rem 1.5rem', 
                      borderRadius: '50px', fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap'
                    }}>
                      Passo 02
                    </div>
                 </div>
                 <h4 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Pague de forma segura</h4>
                 <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>Preencha suas informações e complete a reserva usando nosso gateway de pagamento seguro.</p>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <div style={{ 
                      width: '240px', height: '240px', borderRadius: '50%', backgroundColor: '#f4f7f6', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                    }}>
                      <img 
                        src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=400" 
                        alt="Confirmação" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
                      />
                    </div>
                    <div style={{ 
                      position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: '#2563eb', color: '#fff', padding: '0.4rem 1.5rem', 
                      borderRadius: '50px', fontSize: '1rem', fontWeight: 700, whiteSpace: 'nowrap'
                    }}>
                      Passo 03
                    </div>
                 </div>
                 <h4 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Confirme e Aproveite</h4>
                 <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>Nossa equipe entrará em contato com os detalhes finais do tour e informações sobre o seu guia.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>Galeria da Amazônia</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '4rem' }}>Um vislumbre das maravilhas que esperam por você.</p>
          </div>
          <div style={{
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
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem' }}>O Que Dizem os Viajantes</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '4rem' }}>Somos referência em atendimento personalizado e experiências inesquecíveis.</p>
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
        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1 !important;
        }
        @keyframes zoom {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

    </div>
  );
};

export default Home;
