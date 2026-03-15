import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "As maravilhas do Encontro das Águas",
      excerpt: "Entenda por que o Rio Negro e o Solimões não se misturam e como visitar esse espetáculo da natureza.",
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=800",
      date: "10 Ago, 2024",
      author: "Carlos Silva",
      category: "Natureza"
    },
    {
      id: 2,
      title: "Guia de Sobrevivência: O que levar para a Selva?",
      excerpt: "Preparamos um checklist completo para você não passar sufoco durante sua expedição na Floresta Amazônica.",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800",
      date: "05 Ago, 2024",
      author: "Ana Amazonas",
      category: "Dicas de Viagem"
    },
    {
      id: 3,
      title: "Preservação e Turismo: Como viajar de forma consciente",
      excerpt: "Descubra como seu turismo pode ajudar na conservação da maior floresta tropical do planeta.",
      image: "https://images.unsplash.com/photo-1581333100576-b73bbe92c19a?q=80&w=800",
      date: "28 Jul, 2024",
      author: "Roberto Ferreira",
      category: "Sustentabilidade"
    },
    {
      id: 4,
      title: "A Gastronomia Amazônica que você precisa provar",
      excerpt: "Do Tacacá ao Tambaqui assado: conheça as iguarias que fazem de Manaus uma referência culinária.",
      image: "https://images.unsplash.com/photo-1579705745817-a166292199b9?q=80&w=800",
      date: "22 Jul, 2024",
      author: "Julia Santos",
      category: "Culinária"
    }
  ];

  return (
    <div className="blog-page" style={{ paddingTop: '5rem' }}>
      {/* Blog Header */}
      <section style={{ backgroundColor: '#f8fafc', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Blog Amazonia Travel</h1>
          <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
            Dicas, guias e histórias fascinantes sobre a vida no coração da floresta.
          </p>
        </div>
      </section>

      {/* Main Blog Post */}
      <section style={{ padding: '6rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {posts.map(post => (
              <div key={post.id} className="blog-card" style={{ 
                backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' 
              }}>
                <div style={{ position: 'relative' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                  <div style={{ 
                    position: 'absolute', top: '1rem', left: '1rem', 
                    backgroundColor: '#FFD700', color: '#000', padding: '0.5rem 1rem', 
                    borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800 
                  }}>
                    {post.category}
                  </div>
                </div>
                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {post.date}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {post.author}</div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ color: '#64748b', marginBottom: '2rem', flex: 1 }}>{post.excerpt}</p>
                  <Link to={`/blog/${post.id}`} style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    color: '#000', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem' 
                  }}>
                    Ler Mais <ArrowRight size={18} color="#FFD700" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination Placeholder */}
      <section style={{ paddingBottom: '6rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
           {[1, 2, 3].map(n => (
             <button key={n} style={{ 
               width: '40px', height: '40px', borderRadius: '10px', 
               border: '1px solid #e2e8f0', backgroundColor: n === 1 ? '#000' : '#fff', 
               color: n === 1 ? '#fff' : '#000', fontWeight: 700, cursor: 'pointer' 
             }}>
               {n}
             </button>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
