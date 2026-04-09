import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Star, Clock, Calendar, Check, Users, Navigation, 
  ChevronRight, Share2, Heart, ShieldCheck, Info, FileText, 
  Image as ImageIcon, ListChecks, Map, MessageSquare, Plus, ShoppingCart,
  CheckCircle2, X, ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Import gallery images
import gal010 from '../assets/galeria/010.jpg';
import gal011 from '../assets/galeria/011.jpg';
import gal012 from '../assets/galeria/012.jpg';
import gal013 from '../assets/galeria/013.jpg';
import gal001 from '../assets/galeria/001.jpg';
import gal002 from '../assets/galeria/002.jpg';


import { supabasePublic as supabase } from '../lib/supabase';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [tourData, setTourData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState('sobre');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [extras, setExtras] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchTour();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function fetchComments(pkgId) {
      if (!pkgId) return;
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('package_id', pkgId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (!error) setComments(data || []);
    }

    if (tourData?.id) {
      fetchComments(tourData.id);
    }
  }, [tourData?.id]);

  // Update SEO Meta Tags
  useEffect(() => {
    if (tourData) {
      document.title = `${tourData.title} | Amazônia Travel e Events`;
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      // Removendo HTML e pegando primeiros 150 caracteres para descrição SEO
      const cleanDesc = (tourData.description || '').replace(/<[^>]+>/g, '');
      const shortDesc = cleanDesc.substring(0, 150) + (cleanDesc.length > 150 ? '...' : '');
      metaDescription.content = `Reserve o pacote ${tourData.title}. ${shortDesc}`;
    }
  }, [tourData]);

  async function fetchTour() {
    try {
      setIsLoading(true);
      const isUuid = id.length > 20; // Rough check for UUID vs Slug
      const query = supabase
        .from('packages')
        .select(`
          *,
          highlights:package_highlights(*),
          itinerary:package_itinerary(*),
          included:package_included(*),
          excluded:package_excluded(*),
          gallery:package_gallery(*),
          features:package_features(*),
          plans:package_plans(*)
        `);
      
      const { data, error } = await (isUuid 
        ? query.eq('id', id).single() 
        : query.eq('slug', id).single());

      if (error || !data) {
        console.error('Error fetching tour:', error);
        navigate('/destinos');
        return;
      }

      const sortedPlans = (data.plans || []).sort((a, b) => a.sort_order - b.sort_order);
      setPlans(sortedPlans);
      const defaultPlan = sortedPlans.find(p => p.is_default) || sortedPlans[0] || null;
      setSelectedPlan(defaultPlan);

      setTourData({
        ...data,
        highlights: data.highlights?.sort((a, b) => a.sort_order - b.sort_order).map(h => h.text) || [],
        itinerary: data.itinerary?.sort((a, b) => a.sort_order - b.sort_order).map(it => ({ day: it.day, title: it.title, desc: it.desc || it.description })) || [],
        included: data.included?.map(i => i.text) || [],
        excluded: data.excluded?.map(e => e.text) || [],
        gallery: data.gallery?.sort((a, b) => a.sort_order - b.sort_order).map(g => g.image_url) || [data.image_url],
        extras: data.extras?.sort((a, b) => a.sort_order - b.sort_order) || []
      });
      setExtras(data.extras || []);
      fetchComments(data.id);
      if (data.travel_date) setSelectedDate(data.travel_date);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getPlanPrice = () => {
    if (!tourData) return 0;
    const basePrice = selectedPlan ? Number(selectedPlan.price) : (tourData.price || 0);
    
    const adultTotal = basePrice * adults;
    const childTotal = (tourData.price_child || basePrice * 0.7) * children;
    
    const extrasTotal = selectedExtras.reduce((acc, extraId) => {
      const extra = extras.find(e => e.id === extraId);
      return acc + Number(extra?.price || 0);
    }, 0);
    
    return adultTotal + childTotal + extrasTotal;
  };

  const totalPrice = getPlanPrice();
  const perPersonPrice = (adults + children) > 0 ? totalPrice / (adults + children) : 0;

  const handleAddToCart = () => {
    if (!selectedDate) return;
    
    // Simulate cart add animation
    const cartData = {
      id: tourData.id,
      title: tourData.title,
      duration: tourData.duration,
      date: selectedDate,
      guests: `${adults} adultos - ${children} crianças`,
      price: totalPrice,
      plan: selectedPlan?.name || 'Padrão',
      extras: selectedExtras.map(id => extras.find(e => e.id === id)?.name).join(', '),
      image: tourData.image_url
    };
    addToCart(cartData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const openWhatsApp = () => {
    const phoneNumber = "9293502913";
    const message = `Olá! Gostaria de mais informações sobre o pacote: ${tourData?.title}`;
    window.open(`https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Logic to detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['sobre', 'fotos', 'itinerario', 'politicas'];
      const scrollPosition = window.scrollY + 250;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveTab(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading || !tourData) return <div className="loading-screen" style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando destino...</div>;

  return (
    <div className="tour-details-page" style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${tourData.gallery[0] || tourData.image_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: '#fff'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', width: 'fit-content', padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
             <MapPin size={16} /> {tourData.location}
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: 800, 
            lineHeight: 1.1,
            textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            maxWidth: '800px',
            color: '#fff'
          }}>
            {tourData.title}
          </h1>
        </div>
      </section>

      {/* Internal Navigation Tabs */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: '70px', zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {[
            { id: 'sobre', label: 'Sobre', icon: <Info size={18} />, show: true },
            { id: 'fotos', label: 'Fotos', icon: <ImageIcon size={18} />, show: tourData.gallery?.length > 1 },
            { id: 'itinerario', label: 'Roteiro', icon: <ListChecks size={18} />, show: tourData.itinerary?.length > 0 },
            { id: 'politicas', label: 'Políticas', icon: <FileText size={18} />, show: (tourData.included?.length > 0 || tourData.excluded?.length > 0) }
          ].filter(t => t.show).map((tab) => (
            <a 
              key={tab.id} 
              href={`#${tab.id}`} 
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(tab.id);
                if (element) {
                  const offset = 150;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              style={{ 
                padding: '1.5rem 0.5rem', 
                color: activeTab === tab.id ? '#000' : '#64748b', 
                textDecoration: 'none', 
                fontWeight: 700, 
                fontSize: '0.95rem',
                borderBottom: `3px solid ${activeTab === tab.id ? '#FFD700' : 'transparent'}`,
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon} {tab.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 0' }}>
         <div className="tour-details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 420px', gap: '4rem', alignItems: 'start' }}>
            {/* Left Column Content */}
            <div>
               {/* Sobre Section */}
               <section id="sobre" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <Info size={32} className="text-primary" /> Sobre o Pacote
                </h2>
                <div 
                  className="tour-desc-content"
                  style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.8, marginBottom: '2rem' }}
                  dangerouslySetInnerHTML={{ __html: tourData.description }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  {tourData.highlights?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155', fontWeight: 600 }}>
                      <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '6px', borderRadius: '50%' }}><Check size={18} /></div>
                      {item}
                    </div>
                  ))}
                </div>
              </section>

               {/* Gallery Section */}
               {tourData.gallery?.length > 1 && (
                 <section id="fotos" style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <ImageIcon size={32} className="text-primary" /> Galeria de Fotos
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {tourData.gallery.map((img, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedImage(img)}
                        style={{ 
                          borderRadius: '12px', 
                          overflow: 'hidden', 
                          height: '180px', 
                          cursor: 'zoom-in',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <img src={img} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </section>
               )}

               {/* Itinerary Section */}
               {tourData.itinerary?.length > 0 && (
                 <section id="itinerario" style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <ListChecks size={32} className="text-primary" /> Roteiro da Viagem
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {tourData.itinerary.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '2rem', borderLeft: '3px solid #FFD700', paddingLeft: '2rem', paddingBottom: '1rem' }}>
                        <div style={{ flexShrink: 0 }}>
                           <div style={{ backgroundColor: '#000', color: '#FFD700', width: 'auto', minWidth: '60px', padding: '0 10px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
                             {item.day}
                           </div>
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h4>
                          <p style={{ color: '#64748b' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
               )}

               {/* Policy Section */}
               {(tourData.included?.length > 0 || tourData.excluded?.length > 0) && (
                 <section id="politicas" style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <FileText size={32} className="text-primary" /> Políticas do Tour
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {tourData.included?.length > 0 && (
                      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#16a34a' }}><CheckCircle2 size={24} /> O QUE ESTÁ INCLUSO</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {tourData.included.map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.95rem' }}>
                              <div style={{ color: '#16a34a' }}><Check size={18} /></div> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {tourData.excluded?.length > 0 && (
                      <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ef4444' }}><X size={24} /> NÃO INCLUSO</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {tourData.excluded.map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.95rem' }}>
                              <div style={{ color: '#ef4444' }}><Plus size={18} style={{ transform: 'rotate(45deg)' }} /></div> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
               )}

               {/* Comments Section */}
               <section id="comentarios" style={{ marginBottom: '4rem' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <MessageSquare size={32} className="text-primary" /> Avaliações ({comments.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {comments.map((comment, i) => (
                      <div key={i} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#334155' }}>
                              {comment.author_name?.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 800 }}>{comment.author_name}</div>
                              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{new Date(comment.created_at).toLocaleDateString('pt-BR')}</div>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2px', color: '#FFD700' }}>
                            {[...Array(5)].map((_, starIdx) => (
                              <Star key={starIdx} size={14} fill={starIdx < comment.rating ? "#FFD700" : "none"} strokeWidth={ starIdx < comment.rating ? 0 : 2} />
                            ))}
                          </div>
                        </div>
                        <p style={{ color: '#64748b', lineHeight: 1.6 }}>{comment.content}</p>
                      </div>
                    ))}
                    {comments.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#fff', borderRadius: '20px', border: '1.5px dashed #e2e8f0', color: '#94a3b8' }}>
                         Nenhuma avaliação ainda. Seja o primeiro a avaliar!
                      </div>
                    )}
                  </div>
                </section>
            </div>

             {/* Sticky Sidebar Booking Widget */}
             <div style={{ position: 'sticky', top: '160px' }}>
              <div style={{ 
                backgroundColor: '#fff', 
                padding: '2.5rem', 
                borderRadius: '25px', 
                boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Preço Total</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#000' }}>R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div 
                    onClick={() => document.getElementById('tour-date-input').showPicker()} 
                    style={{ cursor: 'pointer' }}
                  >
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155', cursor: 'pointer' }}>SELECIONE A DATA</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        id="tour-date-input"
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '1rem', 
                          borderRadius: '12px', 
                          border: `1.5px solid ${selectedDate ? '#7EB53F' : '#e2e8f0'}`, 
                          outline: 'none', 
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: '#fff'
                        }} 
                      />
                    </div>
                  </div>

                  {/* Dynamic Pricing Plans */}
                  {plans.length > 0 && (
                    <div style={{ backgroundColor: '#f8fafc', padding: '1.1rem', borderRadius: '15px', border: '1.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {plans.map((plan, idx) => (
                        <React.Fragment key={plan.id}>
                          {idx > 0 && <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '2px 0' }} />}
                          <div 
                            onClick={() => setSelectedPlan(plan)}
                            style={{ cursor: 'pointer', padding: '0.2rem 0' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: plan.description ? '4px' : '0' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                <div style={{ 
                                  width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                                  border: `2px solid ${selectedPlan?.id === plan.id ? '#7EB53F' : '#cbd5e1'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  marginTop: '2px'
                                }}>
                                  {selectedPlan?.id === plan.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#7EB53F' }} />}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: selectedPlan?.id === plan.id ? 800 : 600, color: selectedPlan?.id === plan.id ? '#000' : '#334155' }}>
                                  {plan.name}
                                </span>
                              </div>
                              <span style={{ fontWeight: 800, fontSize: '0.9rem', marginLeft: '10px', whiteSpace: 'nowrap' }}>
                                R$ {Number(plan.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            {plan.description && (
                              <p style={{ marginLeft: '26px', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                                {plan.description}
                              </p>
                            )}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* Extras Selection */}
                  {extras.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: '#334155' }}>SERVIÇOS ADICIONAIS</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {extras.map((extra) => (
                          <div key={extra.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', cursor: 'pointer' }} onClick={() => {
                            if (selectedExtras.includes(extra.id)) {
                              setSelectedExtras(selectedExtras.filter(id => id !== extra.id));
                            } else {
                              setSelectedExtras([...selectedExtras, extra.id]);
                            }
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ 
                                width: '18px', height: '18px', borderRadius: '4px', border: `2px solid ${selectedExtras.includes(extra.id) ? '#7EB53F' : '#cbd5e1'}`,
                                backgroundColor: selectedExtras.includes(extra.id) ? '#7EB53F' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}>
                                {selectedExtras.includes(extra.id) && <Check size={14} color="#fff" strokeWidth={3} />}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  {extra.name}
                                  {extra.description && (
                                    <div className="tooltip-container" style={{ position: 'relative', display: 'inline-block' }}>
                                      <Info size={14} className="text-primary" />
                                      <div className="tooltip-text">{extra.description}</div>
                                    </div>
                                  )}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#7EB53F', fontWeight: 700 }}>+ R$ {Number(extra.price).toLocaleString('pt-BR')}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>ADULTOS</label>
                      <select 
                        value={adults}
                        onChange={(e) => setAdults(parseInt(e.target.value))}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                      >
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#334155' }}>CRIANÇAS</label>
                      <select 
                        value={children}
                        onChange={(e) => setChildren(parseInt(e.target.value))}
                        style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                      >
                        {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={!selectedDate || isLoading}
                  style={{
                  width: '100%',
                  padding: '1.25rem',
                  borderRadius: '15px',
                  backgroundColor: !selectedDate ? '#cbd5e1' : '#7EB53F',
                  color: '#fff',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  cursor: !selectedDate ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: !selectedDate ? 'none' : '0 10px 20px rgba(126, 181, 63, 0.2)',
                  opacity: isLoading ? 0.8 : 1
                }}
                onMouseEnter={(e) => { if(selectedDate) e.target.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={(e) => { if(selectedDate) e.target.style.transform = 'translateY(0)'; }}
                >
                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <ShoppingCart size={22} /> ADICIONAR AO CARRINHO
                    </>
                  )}
                </button>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                   <ShieldCheck size={16} /> Pagamento 100% Seguro
                </div>
              </div>
            </div>
          </div>
      </div>

      {tourData.featured_review && (
        <section style={{ backgroundColor: '#fff', padding: '6rem 0' }}>
           <div className="container">
              <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Avaliação de Cliente</h2>
                 <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', color: '#FFD700', marginBottom: '2rem' }}>
                    <Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" /><Star size={32} fill="#FFD700" />
                 </div>
                 <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.8, fontStyle: 'italic' }}>
                    "{tourData.featured_review}"
                 </p>
                 {tourData.featured_review_author && (
                   <p style={{ fontWeight: 800, marginTop: '1.5rem', fontSize: '1.1rem' }}>— {tourData.featured_review_author}</p>
                 )}
              </div>
           </div>
        </section>
      )}

      {/* Bottom Booking Banner */}
      <section style={{
        backgroundColor: '#000',
        padding: '5rem 0',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${tourData.gallery[1]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
           <div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>Reserve esta aventura hoje!</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px' }}>Não deixe para depois. As vagas para nossas expedições são limitadas para garantir exclusividade e preservação.</p>
          </div>
          <button 
            onClick={openWhatsApp}
            style={{
            padding: '1.5rem 3.5rem',
            backgroundColor: '#FFD700',
            color: '#000',
            borderRadius: '100px',
            border: 'none',
            fontSize: '1.25rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            RESERVAR AGORA
          </button>
         </div>
       </section>
 
       {/* Toast Notification */}
       <div style={{
         position: 'fixed',
         bottom: showToast ? '2rem' : '-100px',
         left: '50%',
         transform: 'translateX(-50%)',
         backgroundColor: '#000',
         color: '#fff',
         padding: '1.25rem 2.5rem',
         borderRadius: '50px',
         display: 'flex',
         alignItems: 'center',
         gap: '1.5rem',
         boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
         zIndex: 3000,
         transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
         width: 'max-content',
         maxWidth: '90vw'
       }}>
         <span style={{ fontWeight: 700, fontSize: '1rem' }}>Inserido no carrinho.</span>
         <Link to="/reservar" style={{ color: '#FFD700', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
           Ver carrinho <ArrowRight size={18} />
         </Link>
         <button onClick={() => setShowToast(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', marginLeft: '10px' }}>
           <X size={18} />
         </button>
       </div>
 
       {/* Lightbox Modal */}
       {selectedImage && (
         <div 
           onClick={() => setSelectedImage(null)}
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             backgroundColor: 'rgba(0,0,0,0.9)',
             zIndex: 2000,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             padding: '2rem',
             cursor: 'zoom-out'
           }}
         >
           <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
             <img 
               src={selectedImage} 
               alt="Zoomed" 
               style={{ 
                 maxWidth: '100%',
                 maxHeight: '85vh',
                 borderRadius: '8px',
                 boxShadow: '0 0 50px rgba(0,0,0,0.5)',
                 animation: 'zoom 0.3s ease'
               }} 
             />
             <button 
               onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }} // Prevent closing when clicking button
               style={{
                 position: 'absolute',
                 top: '-40px',
                 right: '0',
                 background: 'none',
                 border: 'none',
                 color: '#fff',
                 cursor: 'pointer'
               }}
             >
               <X size={32} />
             </button>
           </div>
         </div>
       )}
 
       <style>{`
         .spinner {
           width: 24px;
           height: 24px;
           border: 3px solid rgba(255,255,255,0.3);
           border-top-color: #fff;
           border-radius: 50%;
           animation: spin 1s linear infinite;
         }
         @keyframes spin {
           to { transform: rotate(360deg); }
         }
         @keyframes zoom {
           from { transform: scale(0.9); opacity: 0; }
           to { transform: scale(1); opacity: 1; }
         }
        .tour-details-grid {
          display: grid;
        }
        @media (max-width: 991px) {
          .tour-details-grid {
            grid-template-columns: 1fr !important;
          }
          .tour-stats-bar {
            padding: 0.5rem 1rem !important;
            font-size: 0.8rem !important;
            border-radius: 50px !important;
          }
          .hide-mobile { display: none !important; }
        }
        
        .tooltip-container {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .tooltip-text {
          visibility: hidden;
          width: 200px;
          background-color: #333;
          color: #fff;
          text-align: center;
          border-radius: 8px;
          padding: 8px;
          position: absolute;
          z-index: 1000;
          bottom: 125%;
          left: 50%;
          margin-left: -100px;
          opacity: 0;
          transition: opacity 0.3s;
          font-size: 0.75rem;
          font-weight: 400;
          line-height: 1.4;
          pointer-events: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .tooltip-text::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #333 transparent transparent transparent;
        }
        .tooltip-container:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TourDetails;
