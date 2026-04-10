import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Clock, CheckCircle, AlertCircle, Check, X } from 'lucide-react';
import { supabasePublic as supabase } from '../lib/supabase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Dúvida sobre Pacotes',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'O nome é obrigatório';
    if (!formData.email.trim()) {
      errs.email = 'O e-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'E-mail inválido';
    }
    if (!formData.message.trim()) errs.message = 'A mensagem é obrigatória';
    else if (formData.message.trim().length < 10) errs.message = 'Mensagem muito curta (mínimo 10 caracteres)';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setStatus(null);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });

      if (error) throw error;

      setShowSuccessPopup(true);
      setFormData({ name: '', email: '', subject: 'Dúvida sobre Pacotes', message: '' });
      
      // Auto close and redirect
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/');
      }, 4000);

    } catch (err) {
      console.error('Error sending message:', err);
      setStatus('error');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '1rem',
    borderRadius: '10px',
    border: errors[field] ? '2px solid #ef4444' : '1px solid #e2e8f0',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontSize: '1rem'
  });

  return (
    <div className="contact-page">
      {/* Contact Header */}
      <section style={{ backgroundColor: '#000', padding: '6rem 0', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>Fale Conosco</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Estamos aqui para ajudar você a planejar sua próxima grande aventura. Entre em contato!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '8rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="grid-responsive" style={{ gap: '4rem' }}>
            
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Informações de Contato</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><Phone size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Telefone</h4>
                    <p style={{ color: '#64748b' }}>(92) 99350-2913</p>
                    <p style={{ color: '#64748b' }}>(92) 98147-4760</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><Mail size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>E-mail</h4>
                    <p style={{ color: '#64748b' }}>contato@amazoniatraveleevents.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '15px', color: '#FFD700' }}><MapPin size={24} /></div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>Nosso Escritório</h4>
                    <p style={{ color: '#64748b' }}>Boa Vista, Roraima - Brasil</p>
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
            <div style={{ backgroundColor: '#f8fafc', padding: '3.5rem', borderRadius: '25px', position: 'relative' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Envie uma mensagem</h2>

              {/* Success Popup Modal */}
              {showSuccessPopup && (
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 9999,
                  backdropFilter: 'blur(5px)'
                }}>
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '3rem',
                    borderRadius: '24px',
                    textAlign: 'center',
                    maxWidth: '450px',
                    width: '90%',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    animation: 'slideUp 0.4s ease-out'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#7EB53F',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem auto',
                      color: '#fff'
                    }}>
                      <Check size={48} strokeWidth={3} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1rem', color: '#000' }}>
                      Mensagem Enviada!
                    </h2>
                    <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2rem' }}>
                      Obrigado por entrar em contato. Retornaremos o mais breve possível para planejar sua próxima aventura.
                    </p>
                    <div style={{ fontSize: '0.85rem', color: '#999' }}>
                      Redirecionando para a página inicial...
                    </div>
                    <div style={{ 
                      marginTop: '1.5rem', 
                      height: '4px', 
                      backgroundColor: '#eee', 
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        height: '100%', 
                        backgroundColor: '#7EB53F', 
                        width: '0%', 
                        animation: 'progress 4s linear forwards' 
                      }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message (now only for errors) */}
              {status === 'error' && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '1.25rem', borderRadius: '12px',
                  backgroundColor: '#fef2f2', border: '1px solid #fecaca',
                  marginBottom: '2rem', color: '#ef4444'
                }}>
                  <AlertCircle size={24} />
                  <div>
                    <p style={{ fontWeight: 700 }}>Erro ao enviar mensagem.</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Tente novamente ou entre em contato via WhatsApp.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid-responsive" style={{ gap: '1.5rem', marginBottom: '1.5rem' }} id="form-fields">
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Nome Completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle('name')}
                      placeholder="Seu nome"
                    />
                    {errors.name && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{errors.name}</p>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle('email')}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{errors.email}</p>}
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Assunto</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                  >
                    <option>Dúvida sobre Pacotes</option>
                    <option>Personalizar Roteiro</option>
                    <option>Parcerias</option>
                    <option>Suporte</option>
                  </select>
                </div>
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Mensagem *</label>
                  <textarea
                    rows="6"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...inputStyle('message'), resize: 'none' }}
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                  {errors.message && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', fontWeight: 600 }}>{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  style={{ 
                    width: '100%', padding: '1.25rem', backgroundColor: sending ? '#cbd5e1' : '#FFD700', border: 'none', borderRadius: '10px', 
                    fontSize: '1rem', fontWeight: 800, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {sending ? 'Enviando...' : <><Send size={20} /> Enviar Mensagem</>}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
