import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, X, Save, MapPin } from 'lucide-react';

const PainelDestinos = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', location: '', price: '', price_display: '', duration: '', category: '', description: '', image_url: '' });
  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => { fetchPackages(); }, []);

  async function fetchPackages() {
    try {
      const res = await fetch('/api/packages');
      if (res.ok) setPackages(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }

  function openCreate() {
    setEditing(null);
    setForm({ title: '', location: '', price: '', price_display: '', duration: '', category: '', description: '', image_url: '' });
    setShowModal(true);
  }

  function openEdit(pkg) {
    setEditing(pkg);
    setForm({ title: pkg.title, location: pkg.location, price: pkg.price || '', price_display: pkg.price_display || '', duration: pkg.duration || '', category: pkg.category || '', description: pkg.description || '', image_url: pkg.image_url || '' });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const body = { ...form, price: parseFloat(form.price) || 0, slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
    try {
      if (editing) {
        await fetch(`/api/packages/${editing.id}`, { method: 'PUT', headers, body: JSON.stringify(body) });
      } else {
        await fetch('/api/packages', { method: 'POST', headers, body: JSON.stringify(body) });
      }
      setShowModal(false);
      fetchPackages();
    } catch (err) { console.error(err); }
  }

  async function handleDelete(id) {
    if (!confirm('Tem certeza que deseja excluir este pacote?')) return;
    await fetch(`/api/packages/${id}`, { method: 'DELETE', headers });
    fetchPackages();
  }

  async function handleToggle(id) {
    await fetch(`/api/packages/${id}/toggle`, { method: 'PATCH', headers });
    fetchPackages();
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData });
      const data = await res.json();
      if (data.url) setForm(f => ({ ...f, image_url: data.url }));
    } catch (err) { console.error(err); }
  }

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Destinos & Pacotes</h1>
          <p className="admin-page-subtitle">Gerencie todos os pacotes de viagem.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}><Plus size={18} /> Novo Pacote</button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pacote</th>
                <th>Local</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.id}>
                  <td>
                    <div className="cell-with-img">
                      {pkg.image_url && <img src={pkg.image_url} alt="" className="row-thumb" />}
                      <div className="cell-main">{pkg.title}</div>
                    </div>
                  </td>
                  <td><div className="cell-sub"><MapPin size={14} /> {pkg.location}</div></td>
                  <td className="cell-money">{pkg.price_display || `R$ ${(pkg.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</td>
                  <td><span className="tag">{pkg.category || '-'}</span></td>
                  <td>
                    <button className="btn-icon" onClick={() => handleToggle(pkg.id)} title={pkg.is_active ? 'Desativar' : 'Ativar'}>
                      {pkg.is_active ? <ToggleRight size={22} style={{ color: 'var(--admin-success)' }} /> : <ToggleLeft size={22} style={{ color: 'var(--admin-text-muted)' }} />}
                    </button>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon" onClick={() => openEdit(pkg)} title="Editar"><Edit size={16} /></button>
                      <button className="btn-icon btn-danger" onClick={() => handleDelete(pkg.id)} title="Excluir"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!packages.length && <tr><td colSpan="6" className="empty-row">Nenhum pacote cadastrado. Clique em "Novo Pacote" para começar.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editing ? 'Editar Pacote' : 'Novo Pacote'}</h2>
              <button className="btn-icon" onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSave} className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Título *</label>
                  <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required placeholder="Nome do pacote" />
                </div>
                <div className="form-group">
                  <label>Localização *</label>
                  <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} required placeholder="Cidade, Estado" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Preço (R$)</label>
                  <input type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Preço Display</label>
                  <input value={form.price_display} onChange={e => setForm({...form, price_display: e.target.value})} placeholder="Sob Consulta" />
                </div>
                <div className="form-group">
                  <label>Duração</label>
                  <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="3 Dias" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Categoria</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                    <option value="">Selecione</option>
                    <option>Natureza</option>
                    <option>Aventura</option>
                    <option>Lazer</option>
                    <option>Compras</option>
                    <option>Cultura</option>
                    <option>Internacional</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Descrição do pacote..." />
              </div>
              <div className="form-group">
                <label>Imagem</label>
                <div className="upload-area">
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {form.image_url && <img src={form.image_url} alt="Preview" className="upload-preview" />}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="admin-btn admin-btn-primary"><Save size={16} /> Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelDestinos;
