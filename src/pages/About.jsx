import React from 'react';
import { CheckCircle2, Users, Target, ShieldCheck, Heart } from 'lucide-react';
import gal011 from '../assets/galeria/011.jpg';
import tourHero from '../assets/tour-hero.png';

const About = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="about-page">
        <section style={{ backgroundColor: '#000', padding: '5rem 0', textAlign: 'center' }}>
          <div className="container">
            <div className="skeleton" style={{ height: '20px', width: '180px', margin: '0 auto 1rem', borderRadius: '4px' }}></div>
            <div className="skeleton" style={{ height: '60px', width: '400px', margin: '0 auto', borderRadius: '8px' }}></div>
          </div>
        </section>
        <div className="container" style={{ padding: '6rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem' }}>
            <div className="skeleton" style={{ height: '500px', width: '100%', borderRadius: '24px' }}></div>
            <div>
              <div className="skeleton" style={{ height: '40px', width: '80%', marginBottom: '2rem', borderRadius: '4px' }}></div>
              <div className="skeleton" style={{ height: '20px', width: '100%', marginBottom: '1rem', borderRadius: '4px' }}></div>
              <div className="skeleton" style={{ height: '20px', width: '95%', marginBottom: '1rem', borderRadius: '4px' }}></div>
              <div className="skeleton" style={{ height: '20px', width: '90%', marginBottom: '2rem', borderRadius: '4px' }}></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: '30px', width: '100%', borderRadius: '4px' }}></div>)}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .skeleton {
            background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
          }
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }
  return (
    <div className="about-page">
      {/* Page Header */}
      <section style={{ 
        backgroundColor: '#000', 
        padding: '5rem 0', 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${tourHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div className="container">
          <p style={{ color: '#FFD700', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Conheça nossa história</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '2rem', color: '#fff' }}>Sobre a Amazonia Travel</h1>
        </div>
      </section>

      {/* Our Mission */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={gal011} 
                alt="Nossa Missão" 
                loading="lazy"
                style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', objectFit: 'cover', maxHeight: '550px' }} 
              />
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', backgroundColor: '#FFD700', color: '#000', padding: '1.5rem', borderRadius: '16px', fontWeight: 800, fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)' }} className="hide-mobile">
                +10 Anos de<br/>Experiência
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.2 }}>Especialistas em Experiências na Amazônia</h2>
              <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.8, marginBottom: '2rem' }}>
                A Amazonia Travel nasceu da paixão profunda pela maior floresta tropical do mundo. Com mais de 10 anos de experiência, nossa missão é conectar viajantes do mundo todo com a essência vibrante e os mistérios da Amazônia.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle2 color="#FFD700" size={24} />
                  <span style={{ fontWeight: 700 }}>Turismo Sustentável</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle2 color="#FFD700" size={24} />
                  <span style={{ fontWeight: 700 }}>Guias Locais</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle2 color="#FFD700" size={24} />
                  <span style={{ fontWeight: 700 }}>Logística Segura</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle2 color="#FFD700" size={24} />
                  <span style={{ fontWeight: 700 }}>Roteiros Únicos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Values */}
      <section style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
        <div className="container">
           <div style={{ 
             display: 'grid', 
             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
             gap: '3rem'
           }}>
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                 <Users size={40} color="#FFD700" style={{ marginBottom: '1.5rem' }} />
                 <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>15k+</h3>
                 <p style={{ color: '#64748b' }}>Viajantes Felizes</p>
              </div>
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                 <Target size={40} color="#FFD700" style={{ marginBottom: '1.5rem' }} />
                 <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>100+</h3>
                 <p style={{ color: '#64748b' }}>Roteiros Exclusivos</p>
              </div>
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                 <ShieldCheck size={40} color="#FFD700" style={{ marginBottom: '1.5rem' }} />
                 <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>10+</h3>
                 <p style={{ color: '#64748b' }}>Anos de Estrada</p>
              </div>
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                 <Heart size={40} color="#FFD700" style={{ marginBottom: '1.5rem' }} />
                 <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>100%</h3>
                 <p style={{ color: '#64748b' }}>Paixão Local</p>
              </div>
           </div>
        </div>
      </section>

      {/* History Section */}
      <section style={{ padding: '8rem 0', backgroundColor: '#fff', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#003D5C', marginBottom: '2.5rem', position: 'relative', display: 'inline-block' }}>
              Nossa Trajetória
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '4px', backgroundColor: '#FFD700', borderRadius: '2px' }}></div>
            </h2>
            
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: '#334155' }}>
                A <strong>Amazonia Travel e Events</strong> não nasceu apenas como uma agência de viagens, mas como um sonho de compartilhar a imensidão da nossa terra com o mundo. Fundada em Manaus, a empresa começou com pequenos roteiros personalizados para amigos e familiares que desejavam ver a floresta além dos cartões-postais.
              </p>
              
              <div style={{ backgroundColor: '#f8fafc', padding: '3rem', borderRadius: '30px', borderLeft: '8px solid #FFD700', margin: '1rem 0' }}>
                <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: '#475569', lineHeight: '1.8' }}>
                  "Lembro-me da primeira expedição oficial; chovia torrencialmente, mas o brilho nos olhos dos viajantes ao verem o encontro das águas pela primeira vez me deu a certeza de que estávamos no caminho certo. A Amazônia não é um lugar para se visitar, é um lugar para se sentir."
                </p>
                <p style={{ marginTop: '1.5rem', fontWeight: 800, color: '#003D5C' }}>— Carlos Silva, Fundador</p>
              </div>

              <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: '#334155' }}>
                Ao longo dos últimos 10 anos, evoluímos de uma operadora local para uma referência em turismo de experiência e eventos corporativos na região norte. Hoje, contamos com uma frota própria de embarcações e ônibus semi-leito, garantindo que o conforto caminhe lado a lado com a aventura.
              </p>

              <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: '#334155' }}>
                Nossa história é escrita a cada novo sorriso, a cada interação segura com os animais e a cada parceria firmada com as comunidades ribeirinhas, que são os verdadeiros guardiões deste paraíso. Continuamos explorando, crescendo e, acima de tudo, preservando o coração verde do Brasil.
              </p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) {
          .about-page section { padding: 4rem 0 !important; }
          .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hide-mobile { display: none; }
        }
      `}</style>
    </div>
  );
};

export default About;
