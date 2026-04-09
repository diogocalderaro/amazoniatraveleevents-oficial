import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, MessageSquare } from 'lucide-react';
import { supabasePublic as supabase } from '../lib/supabase';

// Fallback image
import gal008 from '../assets/galeria/008.jpg';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchPost() {
      try {
        setLoading(true);
        const isUuid = id && id.length > 20; 
        const query = supabase.from('blog_posts').select('*');
        const { data, error } = await (isUuid 
          ? query.eq('id', id).single() 
          : query.eq('slug', id).single());

        if (error || !data) {
          console.error('Error fetching post:', error);
          return;
        }
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) return <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Carregando artigo...</div>;
  if (!post) return <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Artigo não encontrado.</div>;

  return (
    <div className="blog-post-page" style={{ backgroundColor: '#fff' }}>
      {/* Post Header */}
      <section style={{ 
        height: '50vh', 
        minHeight: '400px',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${post.image_url || gal008})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '4rem',
        color: '#fff'
      }}>
        <div className="container">
          <Link to="/blog" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#fff', 
            textDecoration: 'none', 
            marginBottom: '2rem',
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            fontSize: '0.85rem',
            fontWeight: 700
          }}>
            <ArrowLeft size={16} /> Voltar ao Blog
          </Link>
          <div style={{ backgroundColor: '#FFD700', color: '#000', padding: '0.4rem 1rem', borderRadius: '50px', width: 'fit-content', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            {post.category}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, maxWidth: '800px', lineHeight: 1.2, color: '#FFFFFF' }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* Post Content */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '4rem' }}>
            <main>
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="#FFD700" /> {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={18} color="#FFD700" /> Por {post.author}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={18} color="#FFD700" /> {post.comments_count || 0} Comentários</div>
              </div>

              <div 
                className="blog-content-rich"
                style={{ fontSize: '1.15rem', color: '#334155', lineHeight: 1.8 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontWeight: 800 }}>Compartilhar:</span>
                    <Share2 size={20} style={{ cursor: 'pointer', color: '#64748b' }} />
                 </div>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {post.tags ? post.tags.split(',').map(tag => (
                      <span key={tag} style={{ backgroundColor: '#f1f5f9', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>#{tag.trim()}</span>
                    )) : (
                      <>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>#Viagem</span>
                        <span style={{ backgroundColor: '#f1f5f9', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>#Amazônia</span>
                      </>
                    )}
                 </div>
              </div>
            </main>

            <aside>
               <div style={{ backgroundColor: '#000', padding: '2rem', borderRadius: '20px', color: '#fff' }}>
                  <h4 style={{ color: '#FFD700', fontWeight: 800, marginBottom: '1rem' }}>Viaje Conosco!</h4>
                  <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem', opacity: 0.8 }}>Gostou do conteúdo? Venha viver essa experiência de perto.</p>
                  <Link to="/destinos" style={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    backgroundColor: '#FFD700', 
                    color: '#000', 
                    padding: '0.8rem', 
                    borderRadius: '10px', 
                    textDecoration: 'none', 
                    fontWeight: 800 
                  }}>
                    Ver Roteiros
                  </Link>
               </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 991px) {
          main + aside { display: none; }
          .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
