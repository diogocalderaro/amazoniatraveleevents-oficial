import React from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-page" style={{ paddingTop: '5rem' }}>
      {/* Contact Header */}
      <section style={{ backgroundColor: '#000', padding: '6rem 0', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Fale Conosco</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
            Estamos aqui para ajudar você a planejar sua próxima grande aventura. Entre em contato!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '8rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.5fr)', gap: '5rem' }}>
            
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Informações de Contato</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><Phone size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Telefone</h4>
                    <p style={{ color: '#64748b' }}>(92) 99123-4567</p>
                    <p style={{ color: '#64748b' }}>(92) 3234-5678</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><Mail size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>E-mail</h4>
                    <p style={{ color: '#64748b' }}>contato@amazoniaevents.com</p>
                    <p style={{ color: '#64748b' }}>reservas@amazoniaevents.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><MapPin size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Nosso Escritório</h4>
                    <p style={{ color: '#64748b' }}>Av. Eduardo Ribeiro, 1234 - Centro</p>
                    <p style={{ color: '#64748b' }}>Manaus, Amazonas - Brasil</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><Clock size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Horário de Atendimento</h4>
                    <p style={{ color: '#64748b' }}>Segunda a Sexta: 08:00 - 18:00</p>
                    <p style={{ color: '#64748b' }}>Sábado: 09:00 - 13:00</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '4rem' }}>
                <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Siga-nos</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#" style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Facebook size={20} /></a>
                  <a href="#" style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Instagram size={20} /></a>
                  <a href="#" style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Twitter size={20} /></a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ backgroundColor: '#f8fafc', padding: '3.5rem', borderRadius: '25px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Envie uma mensagem</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Nome Completo</label>
                    <input type="text" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} placeholder="Seu nome" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>E-mail</label>
                    <input type="email" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} placeholder="seu@email.com" />
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Assunto</label>
                  <select style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}>
                    <option>Dúvida sobre Pacotes</option>
                    <option>Personalizar Roteiro</option>
                    <option>Parcerias</option>
                    <option>Suporte</option>
                  </select>
                </div>
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Mensagem</label>
                  <textarea rows="6" style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', resize: 'none' }} placeholder="Como podemos ajudar?"></textarea>
                </div>
                <button style={{ 
                  width: '100%', padding: '1.25rem', backgroundColor: '#FFD700', border: 'none', borderRadius: '10px', 
                  fontSize: '1rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' 
                }}>
                  Enviar Mensagem <Send size={20} />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section style={{ height: '500px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ textAlign: 'center', color: '#64748b' }}>
            <MapPin size={48} style={{ marginBottom: '1rem', margin: '0 auto' }} />
            <p style={{ fontWeight: 800 }}>Mapa Interativo (Coming Soon)</p>
            <p>Escritório Central: Manaus - AM</p>
         </div>
      </section>
    </div>
  );
};

export default Contact;
