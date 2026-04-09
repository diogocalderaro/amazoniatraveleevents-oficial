import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Search, ExternalLink, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PainelClientes = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reservations')
        .select('customer_name, customer_email, customer_phone, created_at, id')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const uniqueCustomers = [];
      const seen = new Set();
      
      for (const res of (data || [])) {
        const key = res.customer_phone || res.customer_email || res.customer_name;
        if (!seen.has(key) && key) {
          seen.add(key);
          uniqueCustomers.push({
            id: res.id,
            name: res.customer_name,
            email: res.customer_email,
            phone: res.customer_phone,
            created_at: res.created_at
          });
        }
      }
      
      setCustomers(uniqueCustomers);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando clientes...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Gestão de Clientes</h1>
          <p className="admin-page-subtitle">Visualize e gerencie a base de clientes que realizaram reservas.</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou telefone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: '10px', border: '1px solid var(--admin-border)', background: 'var(--admin-bg-base)', color: 'var(--admin-text-primary)' }}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Desde</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{customer.name}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={14} className="text-muted" /> {customer.email || '-'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={14} className="text-muted" /> {customer.phone || '-'}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                      <Calendar size={14} /> {new Date(customer.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td>
                    <div className="action-btns">
                      <a href={`mailto:${customer.email}`} className="btn-icon" title="Enviar E-mail"><Mail size={16} /></a>
                      <a href={`https://wa.me/55${customer.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn-icon" title="WhatsApp"><ExternalLink size={16} /></a>
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredCustomers.length && (
                <tr>
                  <td colSpan="5" className="empty-row">Nenhum cliente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PainelClientes;
