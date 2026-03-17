import React, { useEffect } from 'react';
import { ShoppingBag, Search, Calendar, CreditCard, CheckCircle, ShieldCheck, Mail, Phone } from 'lucide-react';

const HowToBuy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      icon: <Search size={40} />,
      title: "1. Escolha seu Destino",
      desc: "Navegue pelas categorias ou use a barra de busca para encontrar o pacote perfeito para sua próxima aventura."
    },
    {
      icon: <Calendar size={40} />,
      title: "2. Selecione a Data e Pessoas",
      desc: "Na página do pacote, escolha a data desejada e a quantidade de adultos e crianças que irão participar."
    },
    {
      icon: <ShoppingBag size={40} />,
      title: "3. Adicione ao Carrinho",
      desc: "Confira todos os itens no seu carrinho de compras e prossiga para o checkout seguro."
    },
    {
      icon: <CreditCard size={40} />,
      title: "4. Pagamento e Confirmação",
      desc: "Preencha seus dados, escolha a forma de pagamento e receba seu voucher instantaneamente por e-mail."
    }
  ];

  return (
    <div className="how-to-buy-page">
      {/* Hero Section */}
      <section style={{ 
        backgroundColor: '#000', 
        padding: '8rem 0 6rem 0', 
        color: '#fff',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', color: '#fff' }}>Como Comprar</h1>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto' }}>
            Planejar sua viagem para a Amazônia é simples, rápido e 100% seguro. Siga os passos abaixo e prepare as malas!
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section style={{ padding: '8rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem', borderRadius: '25px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', transition: 'transform 0.3s ease' }}>
                <div style={{ color: '#FFD700', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{step.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section style={{ backgroundColor: '#000', padding: '8rem 0', color: '#fff' }}>
        <div className="container">
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: '#fff' }}>Segurança em Primeiro Lugar</h2>
                 <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '2rem' }}>
                    Utilizamos as tecnologias de criptografia mais modernas para garantir que seus dados estejam sempre protegidos. Aceitamos diversas formas de pagamento para sua comodidade.
                 </p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <CheckCircle color="#FFD700" size={24} />
                       <span style={{ fontWeight: 700 }}>Parcelamento em até 10x sem juros</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <CheckCircle color="#FFD700" size={24} />
                       <span style={{ fontWeight: 700 }}>Desconto de 10% no Pix</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                       <ShieldCheck color="#FFD700" size={24} />
                       <span style={{ fontWeight: 700 }}>Plataforma Certificada PCI Compliance</span>
                    </div>
                 </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                 <div style={{ padding: '3rem', backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: '30px', border: '2px dashed #FFD700' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#FFD700' }}>Suporte Especializado</h3>
                    <p style={{ marginBottom: '2rem' }}>Dúvidas durante a compra? Nossa equipe está pronta para ajudar.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                       <div style={{ textAlign: 'center' }}>
                          <Phone color="#FFD700" size={32} style={{ marginBottom: '0.5rem' }} />
                          <p style={{ fontWeight: 700 }}>(92) 99123-4567</p>
                       </div>
                       <div style={{ textAlign: 'center' }}>
                          <Mail color="#FFD700" size={32} style={{ marginBottom: '0.5rem' }} />
                          <p style={{ fontWeight: 700 }}>sac@amazonia.com</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HowToBuy;
