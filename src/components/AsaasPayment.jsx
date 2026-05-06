import React, { useState, useEffect } from 'react';
import { Check, Copy, RefreshCw, Smartphone, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

const AsaasPayment = ({ pixData, onPaymentConfirmed }) => {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('pending'); // pending, confirmed, error
  const [pollingCount, setPollingCount] = useState(0);

  const handleCopyCode = () => {
    if (pixData?.payload) {
      navigator.clipboard.writeText(pixData.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Polling to check payment status
  useEffect(() => {
    if (!pixData?.paymentId || status === 'confirmed') return;

    const checkStatus = async () => {
      try {
        const res = await fetch('/api/asaas/payment-status/' + pixData.paymentId);
        const data = await res.json();
        
        if (data.status === 'CONFIRMED' || data.status === 'RECEIVED') {
          setStatus('confirmed');
          if (onPaymentConfirmed) onPaymentConfirmed();
        }
      } catch (err) {
        console.error('Erro ao verificar status:', err);
      }
    };

    const interval = setInterval(() => {
      setPollingCount(prev => prev + 1);
      checkStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [pixData?.paymentId, status]);

  if (status === 'confirmed') {
    return (
      <div className="payment-confirmed-ui fade-in" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <Check size={40} strokeWidth={3} />
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#000' }}>Pagamento Confirmado!</h2>
        <p style={{ color: '#64748b' }}>Sua reserva foi processada com sucesso. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="asaas-payment-ui fade-in">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Pague com PIX</h3>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Aponte a câmera do seu banco para o QR Code abaixo</p>
      </div>

      <div style={{ 
        backgroundColor: '#fff', 
        padding: '1.5rem', 
        borderRadius: '20px', 
        border: '2px solid #f1f5f9',
        textAlign: 'center',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        {pixData?.qrCodeImage ? (
          <img 
            src={'data:image/png;base64,' + pixData.qrCodeImage} 
            alt="QR Code PIX" 
            style={{ width: '240px', height: '240px', margin: '0 auto 1rem auto', display: 'block' }}
          />
        ) : (
          <div style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
            <RefreshCw className="animate-spin" />
          </div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#7EB53F', fontWeight: 700, fontSize: '0.85rem' }}>
          <RefreshCw size={14} className="animate-spin" /> Aguardando pagamento...
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#64748b', textTransform: 'uppercase' }}>Ou copie o código abaixo</label>
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#f8fafc', 
          padding: '0.5rem', 
          borderRadius: '12px', 
          border: '1px solid #e2e8f0',
          alignItems: 'center'
        }}>
          <div style={{ 
            flex: 1, 
            padding: '0.5rem 0.75rem', 
            fontSize: '0.8rem', 
            color: '#334155', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            fontFamily: 'monospace'
          }}>
            {pixData?.payload || 'Carregando código...'}
          </div>
          <button 
            onClick={handleCopyCode}
            style={{
              backgroundColor: copied ? '#16a34a' : '#000',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              minWidth: '100px',
              justifyContent: 'center'
            }}
          >
            {copied ? <><Check size={16} /> Copiado!</> : <><Copy size={16} /> Copiar</>}
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1rem',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
          <Smartphone size={20} color="#7EB53F" />
          <span>Abra o app do seu banco</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px' }}>
          <ShieldCheck size={20} color="#7EB53F" />
          <span>Pagamento seguro via Asaas</span>
        </div>
      </div>
    </div>
  );
};

export default AsaasPayment;
