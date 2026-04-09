import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Save, Plus, Trash2, Image as ImageIcon, 
  MapPin, Clock, Calendar, DollarSign, Users, 
  ListChecks, FileText, Star, Info
} from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';

import { supabase } from '../../lib/supabase';

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

  const [plans, setPlans] = useState([]);
  const [extras, setExtras] = useState([]);

  const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  useEffect(() => {
    if (isEditing) {
      fetchPackage();
    }
  }, [id]);

  async function fetchPackage() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('packages')
        .select(`
          *,
          highlights:package_highlights(*),
          itinerary:package_itinerary(*),
          included:package_included(*),
          excluded:package_excluded(*),
          gallery:package_gallery(*),
          features:package_features(*),
          plans:package_plans(*),
          extras:package_extras(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (data) {
        setFormData({
          ...data,
          price: data.price ? (data.price * 100).toFixed(0) : '',
          price_vip: data.price_vip ? (data.price_vip * 100).toFixed(0) : '',
          price_exec: data.price_exec ? (data.price_exec * 100).toFixed(0) : '',
          price_child: data.price_child ? (data.price_child * 100).toFixed(0) : '',
          highlights: data.highlights?.sort((a, b) => a.sort_order - b.sort_order).map(h => h.text) || [],
          itinerary: data.itinerary?.sort((a, b) => a.sort_order - b.sort_order).map(it => ({ 
            day: it.day, 
            title: it.title, 
            desc: it.description,
            type: it.day?.toLowerCase().includes(':') ? 'hora' : 'dia'
          })) || [],
          included: data.included?.map(i => i.text) || [],
          excluded: data.excluded?.map(e => e.text) || [],
          features: data.features?.map(f => f.text) || [],
          gallery: data.gallery?.sort((a, b) => a.sort_order - b.sort_order).map(g => g.image_url) || []
        });

        const loadedPlans = (data.plans || []).sort((a, b) => a.sort_order - b.sort_order).map(p => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: (p.price * 100).toFixed(0)
        }));
        setPlans(loadedPlans.length > 0 ? loadedPlans : [{ name: 'Plano Regional', description: '', price: data.price ? (data.price * 100).toFixed(0) : '' }]);
        
        // Remove extras loading as it's being removed
        setExtras([]);
      }
    } catch (err) {
      console.error('Error fetching package details:', err);
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
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleImageUpload = async (e, field = 'image_url', isGallery = false) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `packages/${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        if (isGallery) {
          setFormData(prev => ({ ...prev, gallery: [...prev.gallery, publicUrl] }));
        } else {
          setFormData(prev => ({ ...prev, [field]: publicUrl }));
        }
      } catch (err) {
        console.error('Upload error:', err);
        alert('Erro no upload: ' + err.message);
      }
    }
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    
    try {
      const packageData = {
        title: formData.title,
        slug: formData.slug || slugify(formData.title),
        location: formData.location,
        category: formData.category,
        price: parseFloat(formData.price) / 100 || 0,
        price_vip: parseFloat(formData.price_vip) / 100 || null,
        price_exec: parseFloat(formData.price_exec) / 100 || null,
        price_child: parseFloat(formData.price_child) / 100 || null,
        price_display: formData.price_display,
        duration: formData.duration,
        travel_date: formData.travel_date || null,
        max_adults: parseInt(formData.max_adults) || 10,
        max_children: parseInt(formData.max_children) || 10,
        description: formData.description,
        image_url: formData.image_url,
        featured_review: formData.featured_review,
        featured_review_author: formData.featured_review_author,
        is_active: formData.is_active ?? true,
        installments: parseInt(formData.installments) || null,
        installment_price: parseFloat(formData.installment_price) / 100 || null
      };

      let pkgId = id;
      if (isEditing) {
        const { error } = await supabase.from('packages').update(packageData).eq('id', id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('packages').insert(packageData).select().single();
        if (error) throw error;
        pkgId = data.id;
      }

      // Sync sub-tables
      const subTables = [
        { table: 'package_highlights', data: formData.highlights.map((text, i) => ({ package_id: pkgId, text, sort_order: i })) },
        { table: 'package_itinerary', data: formData.itinerary.map((it, i) => ({ package_id: pkgId, day: it.day, title: it.title, description: it.desc, sort_order: i })) },
        { table: 'package_included', data: formData.included.map((text, i) => ({ package_id: pkgId, text, sort_order: i })) },
        { table: 'package_excluded', data: formData.excluded.map((text, i) => ({ package_id: pkgId, text, sort_order: i })) },
        { table: 'package_features', data: formData.features.map((text, i) => ({ package_id: pkgId, text, sort_order: i })) },
        { table: 'package_gallery', data: formData.gallery.map((url, i) => ({ package_id: pkgId, image_url: url, sort_order: i })) }
      ];

      for (const st of subTables) {
        await supabase.from(st.table).delete().eq('package_id', pkgId);
        if (st.data.length > 0) {
          const { error } = await supabase.from(st.table).insert(st.data);
          if (error) console.error(`Error updating ${st.table}:`, error);
        }
      }

      // Sync plans
      await supabase.from('package_plans').delete().eq('package_id', pkgId);
      if (plans.length > 0) {
        const plansData = plans.map((p, i) => ({
          package_id: pkgId,
          name: p.name,
          description: p.description,
          price: parseFloat(p.price) / 100 || 0,
          sort_order: i
        }));
        const { error: plansError } = await supabase.from('package_plans').insert(plansData);
        if (plansError) console.error('Error updating plans:', plansError);
      }

      // Extras removed from editor
      await supabase.from('package_extras').delete().eq('package_id', pkgId);

      navigate('/painel/destinos');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar: ' + err.message);
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
          <button type="button" className={`tab-btn ${activeTab === 'politicas' ? 'active' : ''}`} onClick={() => setActiveTab('politicas')}>Políticas</button>
        </div>

        <form onSubmit={handleSubmit} className="admin-tab-content">
          {activeTab === 'geral' && (
            <div className="tab-pane">
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
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

              <div style={{ marginTop: '1.5rem' }}>
                <div className="admin-card">
                  <div className="card-header"><h3><Star size={18} /> Depoimento em Destaque</h3></div>
                  <div className="form-group">
                    <label>Texto do Depoimento</label>
                    <textarea 
                      name="featured_review" 
                      value={formData.featured_review} 
                      onChange={handleInputChange} 
                      rows="3" 
                      placeholder="Principal elogio de um cliente..." 
                      style={{ 
                        background: 'var(--admin-bg-base)', 
                        color: 'var(--admin-text-primary)',
                        border: '1px solid var(--admin-border)',
                        borderRadius: '8px',
                        padding: '0.75rem'
                      }}
                    />
                  </div>
                  <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Autor</label>
                    <input 
                      name="featured_review_author" 
                      value={formData.featured_review_author} 
                      onChange={handleInputChange} 
                      placeholder="Nome do cliente" 
                      style={{ 
                        background: 'var(--admin-bg-base)', 
                        color: 'var(--admin-text-primary)',
                        border: '1px solid var(--admin-border)',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'precos' && (
            <div className="tab-pane">
              <div className="admin-card">
                <div className="card-header"><h3><DollarSign size={18} /> Configuração de Preço</h3></div>
                
                <div className="form-row">
                  <div className="form-group" style={{ flex: 1.5 }}>
                    <label>Preço para Exibição (Texto Livre)</label>
                    <input name="price_display" value={formData.price_display} onChange={handleInputChange} placeholder="Sob Consulta / A partir de R$ 350" />
                  </div>
                  <div className="form-group">
                    <label>Preço Especial (Crianças)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="price_child" value={formatBRL(formData.price_child)} onChange={handlePriceChange} style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                  <div className="form-group" style={{ width: '120px' }}>
                    <label>Parcelamento</label>
                    <input name="installments" type="number" value={formData.installments} onChange={handleInputChange} placeholder="Ex: 10" />
                  </div>
                  <div className="form-group">
                    <label>Valor Parcela</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                      <input name="installment_price" value={formatBRL(formData.installment_price)} onChange={handlePriceChange} style={{ paddingLeft: '2.5rem' }} placeholder="0,00" />
                    </div>
                  </div>
                </div>

                <div className="card-header" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--admin-border)', paddingTop: '1.5rem' }}><h3><DollarSign size={18} /> PLANOS DE PREÇO</h3></div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {plans.map((plan, idx) => (
                    <div key={idx} style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg-secondary)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px auto', gap: '1rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {idx === 0 && <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)', fontWeight: 700 }}>Plano Padrão (Visível por Defeito)</label>}
                          <input 
                            value={plan.name} 
                            onChange={(e) => { const updated = [...plans]; updated[idx].name = e.target.value; setPlans(updated); }}
                            placeholder={idx === 0 ? "Ex: Plano Econômico" : "Ex: Premium / VIP"} 
                            style={{ 
                              fontWeight: 600,
                              background: 'var(--admin-bg-base)',
                              border: '1px solid var(--admin-border)',
                              color: 'var(--admin-text-primary)',
                              padding: '0.6rem 0.75rem',
                              borderRadius: '8px'
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {idx === 0 && <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)', fontWeight: 700 }}>Valor</label>}
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)', fontWeight: 600 }}>R$</span>
                            <input 
                              value={formatBRL(plan.price)} 
                              onChange={(e) => { const raw = e.target.value.replace(/\D/g, ''); const updated = [...plans]; updated[idx].price = raw; setPlans(updated); }}
                              style={{ 
                                paddingLeft: '2.5rem',
                                background: 'var(--admin-bg-base)',
                                border: '1px solid var(--admin-border)',
                                color: 'var(--admin-text-primary)',
                                height: '38px',
                                borderRadius: '8px',
                                width: '100%'
                              }}
                              placeholder="0,00"
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                          {idx === 0 && <label style={{ fontSize: '0.75rem', opacity: 0 }}>Ação</label>}
                          {idx !== 0 ? (
                            <button type="button" className="btn-icon btn-danger" onClick={() => setPlans(plans.filter((_, i) => i !== idx))} style={{ marginTop: '0.2rem' }}>
                              <Trash2 size={16} />
                            </button>
                          ) : (
                            <div style={{ width: '36px' }}></div>
                          )}
                        </div>
                      </div>
                      <textarea 
                        value={plan.description || ''}
                        onChange={(e) => { const updated = [...plans]; updated[idx].description = e.target.value; setPlans(updated); }}
                        placeholder="O que este plano inclui? (Ex: Almoço e Transfer inclusos)"
                        rows="2"
                        style={{ 
                          fontSize: '0.85rem', 
                          width: '100%', 
                          resize: 'vertical',
                          background: 'var(--admin-bg-base)',
                          border: '1px solid var(--admin-border)',
                          color: 'var(--admin-text-primary)',
                          padding: '0.75rem',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  ))}
                  <button type="button" className="admin-btn admin-btn-secondary btn-sm" style={{ width: 'fit-content' }} onClick={() => setPlans([...plans, { name: '', description: '', price: '' }])}>
                    <Plus size={14} /> Adicionar Plano
                  </button>
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
          ) }

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
                            style={{ 
                              height: '42px', 
                              minWidth: '100px',
                              background: 'var(--admin-bg-base)',
                              border: '1px solid var(--admin-border)',
                              color: 'var(--admin-text-primary)'
                            }}
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
                            style={{ 
                              textAlign: 'center', 
                              fontWeight: 700, 
                              height: '42px', 
                              background: 'var(--admin-bg-base)', 
                              color: 'var(--admin-text-primary)', 
                              border: '1px solid var(--admin-border)',
                              borderRadius: '8px'
                            }}
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
                            placeholder="Ex: Chegada em Manaus / Visita ao Encontro das Águas"
                            style={{ 
                              height: '42px',
                              background: 'var(--admin-bg-base)', 
                              color: 'var(--admin-text-primary)', 
                              border: '1px solid var(--admin-border)',
                              borderRadius: '8px'
                            }}
                          />
                        </div>

                        <button type="button" className="btn-icon btn-danger" onClick={() => updateList('itinerary', i, null)} style={{ alignSelf: 'flex-end', height: '42px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>Descrição Detalhada</label>
                        <textarea 
                          value={it.desc} 
                          onChange={(e) => {
                            const newList = [...formData.itinerary];
                            newList[i].desc = e.target.value;
                            setFormData(p => ({ ...p, itinerary: newList }));
                          }} 
                          rows="3"
                          placeholder="Descreva as atividades deste dia ou hora..." 
                          style={{ 
                            width: '100%', 
                            background: 'var(--admin-bg-base)', 
                            color: 'var(--admin-text-primary)', 
                            border: '1px solid var(--admin-border)',
                            borderRadius: '8px',
                            padding: '10px'
                          }}
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
          background: #fff;
          font-weight: 600;
          color: #000;
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
