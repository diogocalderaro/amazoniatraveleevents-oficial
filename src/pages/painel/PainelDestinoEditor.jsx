import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Save, Plus, Trash2, Image as ImageIcon, 
  MapPin, Clock, Calendar, DollarSign, Users, 
  ListChecks, FileText, Star, ArrowRight, X, Info
} from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';

const PainelDestinoEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id && id !== 'novo';
  
  const [activeTab, setActiveTab] = useState('geral');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    location: '',
    category: '',
    price: '',
    price_vip: '',
    price_exec: '',
    price_child: '',
    price_display: '',
    duration: '',
    travel_date: '',
    max_adults: 10,
    max_children: 10,
    description: '',
    image_url: '',
    featured_review: '',
    featured_review_author: '',
    highlights: [],
    itinerary: [],
    included: [],
    excluded: [],
    features: [],
    gallery: []
  });

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const token = localStorage.getItem('admin_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  useEffect(() => {
    if (isEditing) {
      fetchPackage();
    }
  }, [id]);

  async function fetchPackage() {
    try {
      const res = await fetch(`/api/packages/${id}`);
      if (res.ok) {
        const data = await res.json();
        // Ensure all arrays exist
        setFormData({
          ...data,
          price: data.price ? (data.price * 100).toFixed(0) : '',
          price_vip: data.price_vip ? (data.price_vip * 100).toFixed(0) : '',
          price_exec: data.price_exec ? (data.price_exec * 100).toFixed(0) : '',
          price_child: data.price_child ? (data.price_child * 100).toFixed(0) : '',
          highlights: data.highlights?.map(h => h.text) || [],
          itinerary: data.itinerary?.map(it => ({ 
            day: it.day, 
            title: it.title, 
            desc: it.description,
            type: it.day?.toLowerCase().includes(':') ? 'hora' : 'dia'
          })) || [],
          included: data.included?.map(i => i.text) || [],
          excluded: data.excluded?.map(e => e.text) || [],
          features: data.features?.map(f => f.text) || [],
          gallery: data.gallery?.map(g => g.image_url) || []
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'title' && !isEditing) {
        newData.slug = slugify(value);
      }
      return newData;
    });
  };

  const updateList = (field, index, value) => {
    const newList = [...formData[field]];
    if (value === null) {
      newList.splice(index, 1);
    } else {
      newList[index] = value;
    }
    setFormData(prev => ({ ...prev, [field]: newList }));
  };

  const addToList = (field, defaultValue = '') => {
    setFormData(prev => ({ ...prev, [field]: [...formData[field], defaultValue] }));
  };

  const formatBRL = (val) => {
    if (!val && val !== 0) return '';
    const valStr = String(val);
    const number = parseFloat(valStr.replace(/[^\d]/g, '')) / 100;
    return isNaN(number) ? '' : number.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Remove formatting to store raw number or at least handle it better
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleImageUpload = async (e, field = 'image_url', isGallery = false) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    for (const file of files) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadFormData
        });
        const data = await res.json();
        if (data.url) {
          if (isGallery) {
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, data.url] }));
          } else {
            setFormData(prev => ({ ...prev, [field]: data.url }));
          }
        }
      } catch (err) {
        console.error('Upload error:', err);
      }
    }
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const body = {
        ...formData,
        price: parseFloat(formData.price) / 100 || 0,
        price_vip: parseFloat(formData.price_vip) / 100 || null,
        price_exec: parseFloat(formData.price_exec) / 100 || null,
        price_child: parseFloat(formData.price_child) / 100 || null,
        max_adults: parseInt(formData.max_adults) || 10,
        max_children: parseInt(formData.max_children) || 10,
        // Map itinerary to match backend structure if different
        itinerary: formData.itinerary.map(it => ({ day: it.day, title: it.title, description: it.desc }))
      };

      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/packages/${id}` : '/api/packages';
      
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        navigate('/painel/destinos');
      } else {
        const error = await res.json();
        alert(error.error || 'Erro ao salvar pacote');
      }
    } catch (err) {
      console.error(err);
      alert('Erro na conexão com o servidor');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-page"><div className="admin-loading">Carregando dados...</div></div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn-icon" onClick={() => navigate('/painel/destinos')}>
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="admin-page-title">{isEditing ? 'Editar Destino' : 'Novo Destino'}</h1>
            <p className="admin-page-subtitle">{formData.title || 'Preencha as informações do pacote'}</p>
          </div>
        </div>
        <div className="header-actions">
           <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/painel/destinos')}>Cancelar</button>
           <button className="admin-btn admin-btn-primary" onClick={handleSubmit} disabled={saving}>
             {saving ? 'Salvando...' : <><Save size={18} /> Salvar Alterações</>}
           </button>
        </div>
      </div>

      <div className="admin-tabs-container">
        <div className="admin-tabs">
          <button type="button" className={`tab-btn ${activeTab === 'geral' ? 'active' : ''}`} onClick={() => setActiveTab('geral')}>Informações Gerais</button>
          <button type="button" className={`tab-btn ${activeTab === 'precos' ? 'active' : ''}`} onClick={() => setActiveTab('precos')}>Planos e Preços</button>
          <button type="button" className={`tab-btn ${activeTab === 'galeria' ? 'active' : ''}`} onClick={() => setActiveTab('galeria')}>Galeria</button>
          <button type="button" className={`tab-btn ${activeTab === 'roteiro' ? 'active' : ''}`} onClick={() => setActiveTab('roteiro')}>Itinerário</button>
          <button type="button" className={`tab-btn ${activeTab === 'politicas' ? 'active' : ''}`} onClick={() => setActiveTab('politicas')}>Políticas e Extras</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-tab-content">
          {/* TAB: GERAL */}
          {activeTab === 'geral' && (
            <div className="tab-pane">
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                {/* Coluna Esquerda: Texto Principal */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="admin-card">
                    <div className="form-group">
                      <label>Título do Pacote *</label>
                      <input name="title" value={formData.title} onChange={handleInputChange} required placeholder="Ex: Excursão de Páscoa - Lago Robertinho" />
                    </div>
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label>Slug (URL automática)</label>
                      <input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="excursao-pascoa-robertinho" />
                    </div>
                  </div>

                  <div className="admin-card">
                    <div className="form-group">
                      <label>Descrição Completa (Editor)</label>
                      <RichTextEditor 
                        value={formData.description} 
                        onChange={(val) => setFormData(p => ({ ...p, description: val }))} 
                        placeholder="Descreva todos os detalhes da aventura..."
                      />
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: Metadados e Imagem */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="admin-card">
                    <div className="card-header"><h3><ImageIcon size={18} /> Imagem e Local</h3></div>
                    <div className="form-group">
                      <label>Imagem de Destaque (Thumbnail) *</label>
                      <div className="mini-upload-zone">
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image_url')} hidden id="thumb-upload" />
                        <label htmlFor="thumb-upload" className="mini-upload-label">
                          {formData.image_url ? (
                            <div className="mini-preview">
                               <img src={formData.image_url} alt="Preview" />
                               <div className="change-overlay">Trocar Foto</div>
                            </div>
                          ) : (
                            <div className="upload-placeholder">
                              <ImageIcon size={20} />
                              <span>Clique para enviar foto</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label>Localização (Cidade, Estado) *</label>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                        <input 
                          name="location" 
                          list="city-list" 
                          value={formData.location} 
                          onChange={handleInputChange} 
                          required 
                          style={{ paddingLeft: '2.5rem' }} 
                          placeholder="Ex: Boa Vista, RR" 
                        />
                        <datalist id="city-list">
                          <option value="Boa Vista, RR" />
                          <option value="Pacaraima, RR" />
                          <option value="Cantá, RR" />
                          <option value="Lethem, Guyana" />
                          <option value="Santa Elena, Venezuela" />
                          <option value="Manaus, AM" />
                          <option value="São Paulo, SP" />
                        </datalist>
                      </div>
                      <small style={{ color: 'var(--admin-text-muted)', display: 'block', marginTop: '5px' }}>
                        Você pode digitar qualquer cidade, não está limitado à lista acima.
                      </small>
                    </div>
                  </div>

                  <div className="admin-card">
                    <div className="card-header"><h3><Info size={18} /> Detalhes</h3></div>
                    <div className="form-group">
                      <label>Categoria</label>
                      <select name="category" value={formData.category} onChange={handleInputChange}>
                        <option value="">Selecione</option>
                        <option>Natureza</option>
                        <option>Lazer</option>
                        <option>Compras</option>
                        <option>Aventura</option>
                        <option>Internacional</option>
                        <option>Cultura</option>
                      </select>
                    </div>
                    <div className="form-row" style={{ marginTop: '1rem' }}>
                       <div className="form-group">
                        <label>Duração</label>
                        <div style={{ position: 'relative' }}>
                          <Clock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                          <input name="duration" value={formData.duration} onChange={handleInputChange} style={{ paddingLeft: '2.5rem' }} placeholder="Ex: 4 Dias" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Data Fixa</label>
                        <div style={{ position: 'relative' }}>
                          <Calendar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
                          <input name="travel_date" type="date" value={formData.travel_date} onChange={handleInputChange} style={{ paddingLeft: '2.5rem' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)', gap: '2rem', marginTop: '2rem' }}>
                <div className="admin-card">
                   <label>Destaques (Bullet points curtos)</label>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                     {formData.highlights.map((h, i) => (
                       <div key={i} style={{ display: 'flex', gap: '8px' }}>
                         <input value={h} onChange={(e) => updateList('highlights', i, e.target.value)} placeholder="Ex: Café da manhã incluso" />
                         <button type="button" className="btn-icon btn-danger" onClick={() => updateList('highlights', i, null)}><Trash2 size={16} /></button>
                       </div>
                     ))}
                     <button type="button" className="admin-btn admin-btn-secondary btn-sm" onClick={() => addToList('highlights')} style={{ alignSelf: 'flex-start' }}>
                       <Plus size={14} /> Adicionar Destaque
                     </button>
                   </div>
                </div>

                <div className="admin-card">
                    <div className="card-header"><h3><Star size={18} /> Depoimento</h3></div>
                    <textarea name="featured_review" value={formData.featured_review} onChange={handleInputChange} rows="3" placeholder="Principal elogio de um cliente..." />
                    <input name="featured_review_author" value={formData.featured_review_author} onChange={handleInputChange} placeholder="Autor do Depoimento" style={{ marginTop: '10px' }} />
                </div>
              </div>
            </div>
          )}

          {/* TAB: PREÇOS */}
          {activeTab === 'precos' && (
            <div className="tab-pane">
              <div className="admin-card">
                <div className="card-header"><h3><DollarSign size={18} /> Configuração de Planos</h3></div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Preço Base (Plano Regional) *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="price" value={formatBRL(formData.price)} onChange={handlePriceChange} required style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Preço Plano VIP</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="price_vip" value={formatBRL(formData.price_vip)} onChange={handlePriceChange} style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Preço Plano Executivo</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="price_exec" value={formatBRL(formData.price_exec)} onChange={handlePriceChange} style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Preço Especial (Crianças)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="price_child" value={formatBRL(formData.price_child)} onChange={handlePriceChange} style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                </div>

                <div className="form-row" style={{ marginTop: '1rem' }}>
                  <div className="form-group">
                    <label>Preço para Exibição (Texto Livre)</label>
                    <input name="price_display" value={formData.price_display} onChange={handleInputChange} placeholder="Sob Consulta / A partir de R$ 350" />
                  </div>
                  <div className="form-group">
                    <label>Parcelamento (Máx Vezes)</label>
                    <input name="installments" type="number" value={formData.installments} onChange={handleInputChange} placeholder="Ex: 10" />
                  </div>
                  <div className="form-group">
                    <label>Valor da Parcela</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="installment_price" value={formatBRL(formData.installment_price)} onChange={handlePriceChange} style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <div className="card-header"><h3><Users size={18} /> Limites de Hóspedes</h3></div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Máximo de Adultos</label>
                    <input name="max_adults" type="number" value={formData.max_adults} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Máximo de Crianças</label>
                    <input name="max_children" type="number" value={formData.max_children} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: GALERIA */}
          {activeTab === 'galeria' && (
            <div className="tab-pane">
              <div className="admin-card">
                <div className="card-header"><h3><ImageIcon size={18} /> Galeria de Fotos do Tour</h3></div>
                <div className="gallery-manager-grid">
                   {formData.gallery.map((img, i) => (
                     <div key={i} className="gallery-item-preview">
                       <img src={img} alt="" />
                       <button type="button" className="remove-gallery-img" onClick={() => updateList('gallery', i, null)}><Trash2 size={14} /></button>
                     </div>
                   ))}
                   <label className="add-gallery-img">
                     <Plus size={24} />
                     <span>Adicionar Fotos</span>
                     <input type="file" accept="image/*" multiple hidden onChange={(e) => handleImageUpload(e, '', true)} />
                   </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ROTEIRO */}
          {activeTab === 'roteiro' && (
            <div className="tab-pane">
              <div className="admin-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="card-header" style={{ borderBottom: '1px solid var(--admin-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h3><ListChecks size={20} /> Itinerário do Passeio</h3>
                    <button type="button" className="admin-btn admin-btn-primary btn-sm" onClick={() => addToList('itinerary', { day: `Dia ${formData.itinerary.length + 1}`, title: '', desc: '', type: 'dia' })}>
                      <Plus size={16} /> Adicionar Item
                    </button>
                  </div>
                </div>

                <div className="itinerary-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {formData.itinerary.map((it, i) => (
                    <div key={i} className="itinerary-item-editor-card">
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Tipo</label>
                          <select 
                            className="type-select" 
                            value={it.type || 'dia'} 
                            onChange={(e) => {
                              const newList = [...formData.itinerary];
                              newList[i].type = e.target.value;
                              if (e.target.value === 'hora') {
                                newList[i].day = '08:00';
                              } else {
                                newList[i].day = `Dia ${i+1}`;
                              }
                              setFormData(p => ({ ...p, itinerary: newList }));
                            }}
                            style={{ height: '42px', minWidth: '100px' }}
                          >
                            <option value="dia">📅 Dia</option>
                            <option value="hora">⏰ Hora</option>
                          </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '120px' }}>
                          <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Rótulo</label>
                          <input 
                            value={it.day} 
                            onChange={(e) => {
                              const newList = [...formData.itinerary];
                              newList[i].day = e.target.value;
                              setFormData(p => ({ ...p, itinerary: newList }));
                            }} 
                            placeholder={it.type === 'hora' ? "08:00" : "Dia 1"}
                            style={{ textAlign: 'center', fontWeight: 700, height: '42px' }}
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                          <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Título da Atividade</label>
                          <input 
                            value={it.title} 
                            onChange={(e) => {
                              const newList = [...formData.itinerary];
                              newList[i].title = e.target.value;
                              setFormData(p => ({ ...p, itinerary: newList }));
                            }} 
                            placeholder="Ex: Chegada ao Aeroporto e Transfer"
                            style={{ height: '42px' }}
                          />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                          <button type="button" className="btn-icon btn-danger" onClick={() => updateList('itinerary', i, null)} style={{ height: '42px', width: '42px' }}>
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Descrição detalhada</label>
                        <textarea 
                          value={it.desc} 
                          onChange={(e) => {
                            const newList = [...formData.itinerary];
                            newList[i].desc = e.target.value;
                            setFormData(p => ({ ...p, itinerary: newList }));
                          }} 
                          placeholder="Descreva o que acontecerá nesta etapa..."
                          rows="3"
                          style={{ resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  ))}

                  {formData.itinerary.length === 0 && (
                    <div className="empty-itinerary" style={{ textAlign: 'center', padding: '3rem', border: '2px dashed var(--admin-border)', borderRadius: '12px', color: 'var(--admin-text-muted)' }}>
                      <ListChecks size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                      <p>Nenhum item no itinerário. Comece adicionando o primeiro dia ou horário.</p>
                    </div>
                  )}

                  <button type="button" className="admin-btn admin-btn-secondary" onClick={() => addToList('itinerary', { day: `Dia ${formData.itinerary.length + 1}`, title: '', desc: '', type: 'dia' })} style={{ marginTop: '1rem', width: '100%', height: '50px', borderStyle: 'dashed' }}>
                    <Plus size={20} /> Adicionar Nova Etapa ao Roteiro
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: POLÍTICAS */}
          {activeTab === 'politicas' && (
            <div className="tab-pane">
               <div className="admin-card">
                  <div className="card-header"><h3><FileText size={18} /> Itens Inclusos e Excluídos</h3></div>
                  <div className="form-row">
                    <div className="form-group">
                       <label style={{ color: 'var(--admin-success)' }}>O QUE ESTÁ INCLUSO</label>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                         {formData.included.map((item, i) => (
                           <div key={i} style={{ display: 'flex', gap: '8px' }}>
                             <input value={item} onChange={(e) => updateList('included', i, e.target.value)} />
                             <button type="button" className="btn-icon btn-danger" onClick={() => updateList('included', i, null)}><Trash2 size={16} /></button>
                           </div>
                         ))}
                         <button type="button" className="admin-btn admin-btn-secondary btn-sm" onClick={() => addToList('included')}><Plus size={14} /> Adicionar Item</button>
                       </div>
                    </div>
                    <div className="form-group">
                       <label style={{ color: 'var(--admin-danger)' }}>O QUE NÃO ESTÁ INCLUSO</label>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                         {formData.excluded.map((item, i) => (
                           <div key={i} style={{ display: 'flex', gap: '8px' }}>
                             <input value={item} onChange={(e) => updateList('excluded', i, e.target.value)} />
                             <button type="button" className="btn-icon btn-danger" onClick={() => updateList('excluded', i, null)}><Trash2 size={16} /></button>
                           </div>
                         ))}
                         <button type="button" className="admin-btn admin-btn-secondary btn-sm" onClick={() => addToList('excluded')}><Plus size={14} /> Adicionar Item</button>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                  <div className="card-header"><h3>Outras Comodidades / Características</h3></div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     {formData.features.map((f, i) => (
                       <div key={i} style={{ display: 'flex', gap: '8px' }}>
                         <input value={f} onChange={(e) => updateList('features', i, e.target.value)} />
                         <button type="button" className="btn-icon btn-danger" onClick={() => updateList('features', i, null)}><Trash2 size={16} /></button>
                       </div>
                     ))}
                     <button type="button" className="admin-btn admin-btn-secondary btn-sm" onClick={() => addToList('features')}><Plus size={14} /> Adicionar Característica</button>
                  </div>
               </div>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .admin-tabs-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--admin-border);
          padding-bottom: 0.5rem;
          overflow-x: auto;
        }
        .tab-btn {
          padding: 0.75rem 1.25rem;
          background: none;
          border: none;
          color: var(--admin-text-secondary);
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .tab-btn:hover { background: var(--admin-bg-surface); color: var(--admin-text-primary); }
        .tab-btn.active { background: var(--admin-primary); color: var(--admin-primary-text); }

        .gallery-manager-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }
        .gallery-item-preview {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid var(--admin-border);
        }
        .gallery-item-preview img { width: 100%; height: 100%; object-fit: cover; }
        .remove-gallery-img {
          position: absolute;
          top: 5px;
          right: 5px;
          background: var(--admin-danger);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          padding: 4px;
        }
        .add-gallery-img {
          aspect-ratio: 1;
          border: 2px dashed var(--admin-border);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          color: var(--admin-text-muted);
          transition: border-color 0.2s;
        }
        .add-gallery-img:hover { border-color: var(--admin-primary); color: var(--admin-text-primary); }

        .itinerary-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .itinerary-item-editor {
          background: var(--admin-bg-base);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--admin-border);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .itinerary-item-header { display: flex; gap: 10px; align-items: center; }
        .day-badge {
          background: var(--admin-primary);
          color: var(--admin-primary-text);
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .mini-upload-zone {
          border: 2px dashed var(--admin-border);
          border-radius: 12px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--admin-bg-base);
          transition: border-color 0.2s;
          margin-top: 5px;
        }
        .mini-upload-zone:hover { border-color: var(--admin-primary); }
        .mini-upload-label { cursor: pointer; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
        .mini-preview { width: 100%; height: 100%; position: relative; }
        .mini-preview img { width: 100%; height: 100%; object-fit: cover; }
        .change-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.5); color: white;
          display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; font-weight: 700;
        }
        .mini-preview:hover .change-overlay { opacity: 1; }
        .upload-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--admin-text-muted); font-size: 0.85rem; }

        .type-select {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--admin-border);
          background: var(--admin-bg-surface);
          font-weight: 600;
          color: var(--admin-text-primary);
          outline: none;
        }

        .itinerary-item-editor-card {
          background: var(--admin-bg-surface);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--admin-border);
          transition: all 0.2s;
        }
        .itinerary-item-editor-card:hover {
          border-color: var(--admin-primary);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default PainelDestinoEditor;
