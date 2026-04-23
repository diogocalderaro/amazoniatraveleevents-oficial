import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { supabasePublic as supabase } from '../lib/supabase';

const PageContent = () => {
  const { slug: paramSlug } = useParams();
  const location = useLocation();
  
  // Robust slug extraction
  const getSlug = () => {
    if (paramSlug) return paramSlug;
    
    // Fallback for direct routes like /politica-de-privacidade
    const pathParts = location.pathname.split('/').filter(Boolean);
    return pathParts[pathParts.length - 1] || 'home';
  };

  const slug = getSlug();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      if (!slug) return;
      
      try {
        setLoading(true);
        console.log('Fetching page for slug:', slug);
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.error('Supabase error fetching page:', error);
          throw error;
        }
        
        setPage(data);
      } catch (err) {
        console.error('General error fetching page:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
    window.scrollTo(0, 0);
  }, [slug, location.pathname]);

  if (loading) {
    return (
      <div className="page-content" style={{ backgroundColor: '#fff' }}>
        <div style={{ backgroundColor: '#000', padding: '5rem 0', textAlign: 'center' }}>
          <div className="container">
            <div className="skeleton" style={{ height: '40px', width: '300px', margin: '0 auto 1.5rem', borderRadius: '8px' }}></div>
            <div className="skeleton" style={{ height: '20px', width: '150px', margin: '0 auto', borderRadius: '4px' }}></div>
          </div>
        </div>
        <div className="container" style={{ padding: '5rem 0', maxWidth: '900px' }}>
          <div className="skeleton" style={{ height: '25px', width: '100%', marginBottom: '1rem', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '25px', width: '90%', marginBottom: '1rem', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '25px', width: '95%', marginBottom: '2.5rem', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '25px', width: '85%', marginBottom: '1rem', borderRadius: '4px' }}></div>
          <div className="skeleton" style={{ height: '25px', width: '100%', marginBottom: '1rem', borderRadius: '4px' }}></div>
        </div>
        <style>{`
          .skeleton {
            background: linear-gradient(90deg, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
          }
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  if (!page) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2>Página não encontrada</h2>
        <Link to="/" style={{ color: '#FFD700', fontWeight: 700 }}>Voltar ao início</Link>
      </div>
    );
  }

  const content = (() => {
    try {
      const parsed = JSON.parse(page.content_json || '{}');
      return parsed.html || '';
    } catch {
      return typeof page.content_json === 'object' ? page.content_json?.html || '' : '';
    }
  })();

  return (
    <div className="page-content">
      {/* Header */}
      <section style={{ backgroundColor: '#000', padding: '5rem 0', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, marginBottom: '1rem', color: '#fff' }}>
            {page.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#FFD700' }}>{page.title}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '5rem 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div 
            className="legal-content"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.9,
              color: '#334155'
            }}
          />
        </div>
      </section>

      <style>{`
        .legal-content h2 {
          font-size: 2rem;
          font-weight: 900;
          color: #000;
          margin-bottom: 1.5rem;
        }
        .legal-content h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #000;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #FFD700;
        }
        .legal-content p {
          margin-bottom: 1rem;
        }
        .legal-content ul {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .legal-content li {
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
        }
        .legal-content strong {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default PageContent;
