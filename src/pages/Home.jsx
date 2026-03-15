import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Search, MapPin, Star, PlaneTakeoff, ShieldCheck, HeartHandshake, Clock, X } from 'lucide-react';

/* Using the generated placeholder images */
import heroBg from '../assets/hero-bg.png';
import pkgHimalaya from '../assets/pkg-himalaya.png';
import pkgEurope from '../assets/pkg-europe.png';
import pkgBeach from '../assets/pkg-beach.png';

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549543048-4ddd3121b2ca?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581333100576-b73bbe92c19a?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1589556264800-08ae9e129a8a?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebe?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520690214124-2405c5217036?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528605248644-14dd04cb484c?q=80&w=2000&auto=format&fit=crop"
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
          <img 
            src={selectedImage} 
            alt="Galeria Ampliada" 
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%', 
              borderRadius: '8px', 
              boxShadow: '0 0 50px rgba(0,0,0,0.5)',
              animation: 'zoom 0.3s ease'
            }} 
          />
          <button style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            background: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}>
             <X size={24} />
          </button>
        </div>
      )}
      {/* Hero Section */}
      <section className="hero" style={{ 
        position: 'relative',
        padding: '6rem 0 10rem 0',
        backgroundColor: '#000',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'visible'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '4rem', 
            alignItems: 'center',
            position: 'relative', 
            zIndex: 10 
          }}>
            <div style={{ maxWidth: '600px' }}>
              <p style={{ 
                color: 'var(--color-primary)', 
                fontWeight: 600, 
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <PlaneTakeoff size={20} /> A AVENTURA ESPERA POR VOCÊ
              </p>
              <h1 style={{ 
                color: 'var(--color-text-light)',
                fontSize: '4.5rem',
                marginBottom: '1.5rem',
                lineHeight: 1.1,
                fontWeight: 800
              }}>
                VAMOS NESSA!
              </h1>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.125rem',
                marginBottom: '2.5rem',
                maxWidth: '480px'
              }}>
                Descubra jornadas personalizadas em aventuras incríveis e atividades planejadas para você explorar a Amazônia.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                  Ver Todos os Pacotes
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '60px', height: '60px', 
                    borderRadius: '50%', border: '2px dashed var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-primary)',
                    fontWeight: 700, fontSize: '1.25rem'
                  }}>
                    80+
                  </div>
                  <div style={{ color: 'var(--color-text-light)', fontSize: '0.875rem', lineHeight: 1.2 }}>
                    Pacotes de<br/>Turismo Selecionados
                  </div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1978&auto=format&fit=crop" 
                alt="Passeios Regionais" 
                style={{ 
                  width: '100%', 
                  maxWidth: '500px', 
                  borderRadius: 'var(--radius-lg)', 
                  boxShadow: 'var(--shadow-xl)',
                  transform: 'rotate(2deg)'
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
          width: '100%'
        }}>
          <div className="search-bar glass" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            backgroundColor: 'var(--color-bg-main)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.8)'
          }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0' }}>
              <MapPin className="text-primary" />
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Para onde?</p>
                <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: 600, fontSize: '16px', color: 'var(--color-secondary)' }}>
                  <option>Selecione o local</option>
                  <option>Manaus - AM</option>
                  <option>Presidente Figueiredo - AM</option>
                  <option>Anavilhanas - AM</option>
                </select>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRight: '1px solid #E2E8F0' }}>
               <Calendar className="text-primary" />
               <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Quando?</p>
                  <input type="date" style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 600, fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-secondary)' }} />
               </div>
            </div>
            <div style={{ flex: 1, minWidth: '150px', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem' }}>
              <User className="text-primary" />
              <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Viajantes</p>
                  <select style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontWeight: 600, fontSize: '16px', color: 'var(--color-secondary)' }}>
                    <option>2 Pessoas</option>
                    <option>1 Pessoa</option>
                    <option>3+ Pessoas</option>
                  </select>
              </div>
            </div>
            <button className="btn btn-secondary" style={{
              minWidth: '140px', height: '64px', borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <Search size={24} /> <span style={{ fontWeight: 700 }}>BUSCAR</span>
            </button>
          </div>
        </div>
      </section>

      {/* Popular Packages Section */}
      <section style={{ paddingTop: '10rem', backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Pacotes de Viagem Populares</h2>
            <p>Escolha seu destino e conecte-se com a natureza exuberante.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {/* Package 1 */}
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img src={pkgHimalaya} alt="Aventura na Selva" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--color-bg-main)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <Star size={16} fill="var(--color-primary)" className="text-primary" /> 4.9
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} /> Manaus, Amazonas
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Trilha de Aventura na Selva</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <div>
                   <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>R$ 899</span>
                   <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}> / pessoa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={16} /> 5 Dias
                   </div>
                   <Link to="/tour/amazon-trail" className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <Calendar size={20} />
                   </Link>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img src={pkgEurope} alt="Encontro das Águas" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--color-bg-main)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <Star size={16} fill="var(--color-primary)" className="text-primary" /> 4.8
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} /> Rio Negro e Solimões
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Expedição Encontro das Águas</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <div>
                   <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>R$ 1250</span>
                   <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}> / pessoa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={16} /> 7 Dias
                   </div>
                   <Link to="/tour/meeting-waters" className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <Calendar size={20} />
                   </Link>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img src={pkgBeach} alt="Anavilhanas" style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'var(--color-bg-main)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <Star size={16} fill="var(--color-primary)" className="text-primary" /> 5.0
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} /> Novo Airão, AM
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sossego no Arquipélago Anavilhanas</h3>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <div>
                   <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-accent)' }}>R$ 2200</span>
                   <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}> / pessoa</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      <Clock size={16} /> 10 Dias
                   </div>
                   <Link to="/tour/anavilhanas" className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
                      <Calendar size={20} />
                   </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/destinations" className="btn btn-outline" style={{ padding: '0.75rem 2.5rem' }}>Ver Todos os Pacotes</Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
           <div style={{ 
             display: 'grid', 
             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
             gap: '2rem',
             textAlign: 'center'
           }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                   <PlaneTakeoff size={36} />
                 </div>
                 <h4 style={{ fontSize: '1.25rem' }}>Reserva Fácil e Rápida</h4>
                 <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Reserve sua viagem com segurança em poucos cliques.</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#F0F9FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
                   <ShieldCheck size={36} />
                 </div>
                 <h4 style={{ fontSize: '1.25rem' }}>Transações Seguras</h4>
                 <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Seu pagamento e informações estão 100% seguros.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                   <Star size={36} />
                 </div>
                 <h4 style={{ fontSize: '1.25rem' }}>As Melhores Experiências</h4>
                 <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Aventuras selecionadas no coração da Amazônia.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#FCE7F3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DB2777' }}>
                   <HeartHandshake size={36} />
                 </div>
                 <h4 style={{ fontSize: '1.25rem' }}>Suporte Especializado</h4>
                 <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Equipe de atendimento 24 horas dedicada a você.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Galeria da Amazônia</h2>
            <p>Um vislumbre das maravilhas que esperam por você.</p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: '280px',
            gap: '1rem'
          }}>
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(img)}
                style={{ 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s ease',
                  cursor: 'zoom-in',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <img src={img} alt={`Galeria ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0}
                >
                   <Search size={32} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes zoom {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {/* Testimonials Section */}
      <section style={{ 
        backgroundColor: 'var(--color-bg-main)',
        backgroundImage: 'radial-gradient(circle at 100% 100%, #f1f5f9 10%, transparent 10%), radial-gradient(circle at 0% 0%, #f1f5f9 10%, transparent 10%)',
        backgroundSize: '40px 40px'
      }}>
        <div className="container">
          <div className="section-title">
            <h2>O Que Dizem os Viajantes</h2>
            <p>Somos referência em atendimento personalizado e experiências inesquecíveis.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Review 1 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Experiência Única!</h4>
              <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                "O passeio foi muito bem organizado e aproveitamos cada minuto. A equipe foi impecável e nos sentimos muito seguros o tempo todo. Recomendo muito!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>RM</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Ricardo Mendes</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Viajante Solo</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Inesquecível</h4>
              <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                "A Amazônia é mágica, mas com o guia certo tudo fica ainda melhor. O roteiro foi perfeito para conhecer a cultura local e as belezas naturais."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>AL</div>
                <div>
                  <div style={{ fontWeight: 600 }}>André Lima</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Viajante Solo</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
              </div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Surpreendente</h4>
              <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                "Viagem maravilhosa em família. Tudo pensado nos mínimos detalhes. Com certeza voltaremos para conhecer mais desse paraíso brasileiro."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>MS</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Maria Santos</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Viagem em Família</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
