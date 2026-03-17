import React from 'react';
import { CheckCircle2, Users, Target, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section style={{ 
        backgroundColor: '#000', 
        padding: '6rem 0', 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1581333100576-b73bbe92c19a?q=80&w=2000)',
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
      <section style={{ padding: '8rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800" 
                alt="Nossa Missão" 
                loading="lazy"
                style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem' }}>Especialistas em Experiências na Amazônia</h2>
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

      {/* Team Section */}
      <section style={{ padding: '8rem 0', backgroundColor: '#fff' }}>
        <div className="container">
           <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '4rem' }}>Nossa Liderança</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
              {[
                { name: "Carlos Silva", role: "Fundador & Guia Master", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400" },
                { name: "Ana Amazonas", role: "Diretora de Operações", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" },
                { name: "Roberto Ferreira", role: "Especialista em Logística", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
                { name: "Julia Santos", role: "Atendimento ao Cliente", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" }
              ].map((member, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                   <img 
                     src={member.img} 
                     alt={member.name} 
                     loading="lazy"
                     style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '5px solid #f1f5f9' }} 
                   />
                   <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{member.name}</h4>
                   <p style={{ color: '#64748b' }}>{member.role}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
