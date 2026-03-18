import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Trash2, Check, ArrowRight, 
  ChevronRight, CreditCard, Banknote, User, 
  Phone, Mail, Home as HomeIcon, Map as CityIcon, 
  Globe, CheckCircle2, ChevronLeft, X, AlertTriangle, ShoppingCart,
  QrCode, FileText, Landmark, ShieldCheck
} from 'lucide-react';

import { useCart } from '../context/CartContext';

const BookingFlow = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleDeleteClick = (item) => {
    setItemToRemove(item);
  };

  const confirmDelete = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setItemToRemove(null);
    }
  };

  const handleFinalizeBooking = () => {
    setIsLoading(true);
    // Simulate processing payment
    setTimeout(() => {
      setIsLoading(false);
      clearCart(); // Clear cart after success
      setStep(3);
    }, 2500);
  };

  const renderStepHeader = (smallText, mainTitle) => (
    <div style={{ marginBottom: '2.5rem' }}>
      <p style={{ color: '#7EB53F', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{smallText}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 800, color: '#333' }}>{mainTitle}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666' }} className="hide-mobile">
           <Link to="/" style={{ textDecoration: 'none', color: '#7EB53F' }}>Casa</Link> 
           <span style={{ color: '#ccc' }}>/</span> 
           <span style={{ color: '#7EB53F' }}>Páginas</span> 
           <span style={{ color: '#ccc' }}>/</span> 
           <span>{mainTitle}</span>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div style={{ position: 'relative', marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: '#e2e8f0', transform: 'translateY(-50%)', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', top: '50%', left: 0, width: `${(step - 1) * 50}%`, height: '2px', backgroundColor: '#7EB53F', transform: 'translateY(-50%)', zIndex: 2, transition: 'width 0.3s ease' }}></div>
      
      {[1, 2, 3].map((num) => (
        <div key={num} style={{ 
          width: '28px', 
          height: '28px', 
          borderRadius: '50%', 
          backgroundColor: step >= num ? '#7EB53F' : '#fff', 
          border: `2px solid ${step >= num ? '#7EB53F' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: step >= num ? '#fff' : '#ccc',
          fontSize: '0.8rem',
          fontWeight: 700,
          zIndex: 3,
          boxShadow: '0 0 0 4px #f8fafc'
        }}>
          {num}
        </div>
      ))}
    </div>
  );

  const renderPaymentSubScreen = () => {
    switch(paymentMethod) {
      case 'credit_card':
      case 'debit_card':
        return (
          <div className="payment-form fade-in" style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem', border: '1px solid #e2e8f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={18} /> Dados do Cartão de {paymentMethod === 'credit_card' ? 'Crédito' : 'Débito'}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              <input type="text" placeholder="Nome impresso no cartão" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <input type="text" placeholder="Número do Cartão" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input type="text" placeholder="Validade (MM/AA)" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="CVV" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
            </div>
          </div>
        );
      case 'pix':
        return (
          <div className="payment-form fade-in" style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '12px', marginTop: '1rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', color: '#32bcad' }}><QrCode size={120} style={{ margin: '0 auto' }} /></div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Escaneie o QR Code</h4>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>Abra o app do seu banco e aponte a câmera para o código acima.</p>
            <div style={{ backgroundColor: '#fff', padding: '0.75rem', borderRadius: '8px', border: '1px dashed #ccc', fontSize: '0.8rem', wordBreak: 'break-all' }}>
              00020126360014br.gov.bcb.pix0114+5592993502913520400005303986540410.005802BR5915AmazoniaTravel6006Manaus62070503***6304E2B4
            </div>
            <button style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#32bcad', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>Copiar código PIX</button>
          </div>
        );
      case 'boleto':
        return (
          <div className="payment-form fade-in" style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', color: '#444' }}><FileText size={48} style={{ margin: '0 auto' }} /></div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Boleto Bancário</h4>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1.5rem' }}>O boleto será gerado após a finalização. Você terá 3 dias úteis para pagar.</p>
            <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem' }}>
              23793.38128 60083.033128 56000.633306 1 95430000035000
            </div>
            <button style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px', margin: '1rem auto 0 auto', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #ddd', background: '#fff', fontWeight: 700 }}>
              <Landmark size={16} /> Ver PDF do Boleto
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-process" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '4rem 0' }}>
      
      {/* Confirmation Modal */}
      {itemToRemove && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 3000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '16px', padding: '2rem',
            maxWidth: '400px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ef4444', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
               <AlertTriangle size={48} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Remover item?</h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>Tem certeza que deseja remover "{itemToRemove.title}" do seu carrinho?</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setItemToRemove(null)}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button 
                onClick={confirmDelete}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        
        {step === 1 && (
          <div className="fade-in">
            {renderStepHeader("RESERVAS", "Carrinho de compras")}
            {renderProgress()}
            
            <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cartItems.length === 0 ? (
                  <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '4rem 2rem', textAlign: 'center' }}>
                     <div style={{ color: '#ccc', marginBottom: '1.5rem' }}><ShoppingCart size={64} /></div>
                     <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Seu carrinho está vazio</h3>
                     <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Explorar Destinos</Link>
                  </div>
                ) : cartItems.map((item) => (
                  <div key={item.id} className="cart-item" style={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    padding: '1.25rem', 
                    display: 'flex', 
                    gap: '1.5rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    flexWrap: 'wrap'
                  }}>
                    <Link to={`/tour/${item.id}`} style={{ minWidth: '150px' }}>
                      <img src={item.image} alt={item.title} loading="lazy" style={{ width: '100%', maxWidth: '180px', height: '120px', borderRadius: '8px', objectFit: 'cover' }} />
                    </Link>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Link to={`/tour/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                        </Link>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>R$ {item.price}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem', color: '#666', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} className="text-primary" /> {item.duration}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} className="text-primary" /> {item.destinations}</div>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#444', marginBottom: '0.25rem' }}>
                        <strong>Data da turnê:</strong> {item.date}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: '#444' }}>
                        <strong>Convidados:</strong> {item.guests}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginLeft: 'auto' }}>
                       <button 
                         onClick={() => handleDeleteClick(item)}
                         style={{ 
                         background: 'none', 
                         border: 'none', 
                         color: '#ef4444', 
                         display: 'flex', 
                         alignItems: 'center', 
                         gap: '4px', 
                         fontSize: '0.85rem', 
                         fontWeight: 600,
                         cursor: 'pointer'
                       }}>
                         <Trash2 size={16} /> Remover
                       </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ position: 'sticky', top: '100px' }}>
                <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem' }}>
                    <span style={{ fontWeight: 700 }}>Total ({cartItems.length}):</span>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>R$ {cartTotal}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic', textAlign: 'right', marginBottom: '2rem' }}>
                    * Todos os impostos e taxas incluídos
                  </p>
                  
                  <button 
                    disabled={cartItems.length === 0}
                    onClick={() => setStep(2)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      backgroundColor: cartItems.length === 0 ? '#ccc' : '#7EB53F',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      marginBottom: '2rem'
                    }}
                  >
                    <CheckCircle2 size={18} /> Confira
                  </button>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ color: '#7EB53F', marginTop: '2px' }}><Check size={16} strokeWidth={3} /></div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Reserva 100% Segura</div>
                        <div style={{ color: '#999', fontSize: '0.8rem' }}>Seus dados estão protegidos</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ color: '#7EB53F', marginTop: '2px' }}><Check size={16} strokeWidth={3} /></div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Cancelamento fácil</div>
                        <div style={{ color: '#999', fontSize: '0.8rem' }}>Fale conosco via WhatsApp</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            {renderStepHeader("RESERVAS", "Confira")}
            {renderProgress()}

            <div className="booking-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 380px) 1fr', gap: '2rem', alignItems: 'start' }}>
              {/* Summary Column */}
              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>1. Resumo da Reserva</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ borderBottom: '1px solid #f5f5f5', paddingBottom: '1.5rem' }}>
                      <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h4>
                      <div style={{ display: 'flex', gap: '1rem', color: '#999', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {item.date}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={12} /> {item.guests}</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>Valor:</span>
                        <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>R$ {item.price}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '1rem' }}>
                    <span style={{ fontWeight: 700 }}>Total Geral:</span>
                    <span style={{ fontSize: '1.75rem', fontWeight: 800 }}>R$ {cartTotal}</span>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div style={{ backgroundColor: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2.5rem', borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>2. Informações e Pagamento</h2>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>Seus dados de contato</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                  <div className="input-field">
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#444', marginBottom: '0.5rem' }}>Primeiro nome<span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} placeholder="Ex: João" />
                  </div>
                  <div className="input-field">
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#444', marginBottom: '0.5rem' }}>Sobrenome<span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="text" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} placeholder="Ex: Silva" />
                  </div>
                  <div className="input-field">
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#444', marginBottom: '0.5rem' }}>Telefone (WhatsApp)<span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="tel" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} placeholder="(92) 9XXXX-XXXX" />
                  </div>
                  <div className="input-field">
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#444', marginBottom: '0.5rem' }}>E-mail<span style={{ color: '#ef4444' }}>*</span></label>
                    <input type="email" style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} placeholder="email@exemplo.com" />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Escolha o Método de Pagamento <ShieldCheck size={20} style={{ color: '#7EB53F' }} />
                </h3>
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    
                    {/* Payment Options Cards */}
                    {[
                      { id: 'credit_card', label: 'Cartão de Crédito', icon: <CreditCard /> },
                      { id: 'debit_card', label: 'Cartão de Débito', icon: <CreditCard /> },
                      { id: 'pix', label: 'PIX QR Code', icon: <QrCode /> },
                      { id: 'boleto', label: 'Boleto', icon: <FileText /> }
                    ].map(method => (
                      <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '12px',
                          border: `2px solid ${paymentMethod === method.id ? '#7EB53F' : '#f1f5f9'}`,
                          backgroundColor: paymentMethod === method.id ? 'rgba(126, 181, 63, 0.05)' : '#fff',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ color: paymentMethod === method.id ? '#7EB53F' : '#94a3b8', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                          {React.cloneElement(method.icon, { size: 28 })}
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: paymentMethod === method.id ? '#7EB53F' : '#475569' }}>{method.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Payment Details Sub-Screen */}
                  {renderPaymentSubScreen()}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setStep(1)}
                    style={{
                      padding: '1rem 2rem',
                      backgroundColor: '#fff',
                      color: '#666',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Voltar
                  </button>
                  <button 
                    onClick={handleFinalizeBooking}
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: '1rem 2.5rem',
                      backgroundColor: '#000',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {isLoading ? (
                      <div className="btn-spinner"></div>
                    ) : (
                      <>
                        FINALIZAR RESERVA <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {renderStepHeader("RESERVAS", "Concluído")}
            {renderProgress()}

            <div style={{ backgroundColor: '#fff', padding: '4rem 3rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ color: '#7EB53F', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                 <CheckCircle2 size={100} strokeWidth={1.5} />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#333' }}>
                Reserva Realizada com Sucesso!
              </h2>
              
              <div style={{ fontSize: '1.25rem', color: '#666', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                <p>Recebemos seu pedido. Um consultor da <strong>Amazonia Travel</strong> entrará em contato em breve para confirmar todos os detalhes da sua aventura.</p>
                <p style={{ marginTop: '1rem' }}>Verifique seu e-mail para mais detalhes e os vouchers da viagem.</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                <Link to="/" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  backgroundColor: '#7EB53F',
                  color: '#fff', 
                  padding: '1rem 2.5rem',
                  borderRadius: '100px',
                  textDecoration: 'none', 
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Voltar para o Início <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .text-primary { color: #7EB53F; }
        .input-field input:focus, .input-field select:focus {
           border-color: #7EB53F !important;
           box-shadow: 0 0 0 2px rgba(126, 181, 63, 0.1);
        }
        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 991px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
          }
          .hide-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .cart-item {
            flex-direction: column;
            align-items: stretch !important;
          }
          .cart-item img { width: 100% !important; max-width: none !important; }
        }
      `}</style>
    </div>
  );
};

export default BookingFlow;
