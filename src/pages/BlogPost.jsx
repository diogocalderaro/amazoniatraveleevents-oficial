import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Tag, Share2, MessageSquare } from 'lucide-react';

/* Gallery imports */
import gal008 from '../assets/galeria/008.jpg';

const BlogPost = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use dummy data matching Blog.jsx
  const posts = [
    {
      id: 1,
      title: "As maravilhas do Encontro das Águas",
      content: `O Encontro das Águas é um fenômeno natural que ocorre na confluência entre o Rio Negro e o Rio Solimões. É um dos pontos turísticos mais visitados de Manaus e um espetáculo que impressiona pela beleza e pela ciência envolvida.\n\nA principal razão para os rios não se misturarem imediatamente são as diferenças de temperatura, velocidade e densidade. O Rio Negro corre a cerca de 2km/h com temperatura de 28°C, enquanto o Solimões é mais rápido, 4 a 6km/h, e mais frio, 22°C.\n\nAcompanhado por guias experientes da Amazonia Travel, você poderá ver de perto esse contraste e entender como a vida local se adapta a esse ecossistema único.`,
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200",
      date: "10 Ago, 2024",
      author: "Carlos Silva",
      category: "Natureza"
    },
    {
      id: 2,
      title: "Guia de Sobrevivência: O que levar para a Selva?",
      content: `Viajar para a Amazônia é uma aventura incrível, mas requer preparação. O clima úmido e as trilhas na mata exigem itens específicos para garantir seu conforto e segurança.\n\nItens essenciais:\n1. Repelente de alta eficácia.\n2. Roupas leves de manga comprida (proteção contra insetos).\n3. Calçados fechados e confortáveis.\n4. Protetor solar e chapéu.\n5. Capa de chuva (sempre pode chover na selva!).\n\nNa Amazonia Travel, fornecemos uma lista detalhada antes de cada embarque para que você não esqueça nada importante.`,
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200",
      date: "05 Ago, 2024",
      author: "Ana Amazonas",
      category: "Dicas de Viagem"
    },
    {
       id: 3,
       title: "Preservação e Turismo: Como viajar de forma consciente",
       content: `O turismo sustentável é o pilar da Amazonia Travel. Acreditamos que é possível explorar a beleza da nossa floresta sem deixar marcas negativas no ambiente.\n\nComo você pode ajudar:\n- Não alimente animais silvestres.\n- Leve seu lixo de volta para a cidade.\n- Respeite as comunidades indígenas e ribeirinhas.\n- Escolha operadoras que valorizam a mão de obra local.\n\nPreservar a Amazônia é garantir que as futuras gerações também possam se encantar com sua magnitude.`,
       image: "https://images.unsplash.com/photo-1581333100576-b73bbe92c19a?q=80&w=1200",
       date: "28 Jul, 2024",
       author: "Roberto Ferreira",
       category: "Sustentabilidade"
    },
    {
       id: 4,
       title: "A Gastronomia Amazônica que você precisa provar",
       content: `A culinária do Amazonas é uma das mais ricas e autênticas do Brasil. Ingredientes como tucupi, jambu e peixes de água doce criam sabores inesquecíveis.\n\nPratos imperdíveis:\n- Tacacá: servido bem quente com camarão seco.\n- Tambaqui Assado: o peixe mais famoso da região.\n- Açaí original: consumido com peixe frito ou farinha.\n\nEm nossos tours gastronômicos, levamos você aos melhores mercados e restaurantes locais.`,
       image: "https://images.unsplash.com/photo-1579705745817-a166292199b9?q=80&w=1200",
       date: "22 Jul, 2024",
       author: "Julia Santos",
       category: "Culinária"
    },
    {
       id: 5,
       title: "Curiosidades sobre o Boto-Cor-de-Rosa",
       content: `O boto-cor-de-rosa é cercado de lendas e fatos fascinantes. Além de ser uma figura central no folclore amazônico, ele é um animal extremamente inteligente.\n\nAo contrário dos golfinhos oceânicos, o boto tem o pescoço flexível, o que permite que ele nade entre as árvores das florestas alagadas durante a cheia.\n\nInteragir com esses animais deve ser feito com respeito e seguindo todas as normas de segurança ambiental.`,
       image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200",
       date: "15 Jul, 2024",
       author: "Carlos Silva",
       category: "Fauna"
    },
    {
       id: 6,
       title: "Festas Folclóricas: Parintins e muito mais",
       content: `A cultura amazonense brilha intensamente durante as festas populares. O Festival de Parintins, com o duelo entre os bois Caprichoso e Garantido, é o auge dessa celebração.\n\nMas não é só Parintins! Temos festas do Sairé em Alter do Chão e o Festival de Ciranda de Manacapuru. A cultura local é uma mistura vibrante de influências indígenas e europeias.\n\nPlaneje sua viagem durante esses eventos para vivenciar a Amazônia em sua forma mais colorida.`,
       image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200",
       date: "10 Jul, 2024",
       author: "Ana Amazonas",
       category: "Cultura"
    }
  ];

  const post = posts.find(p => p.id === parseInt(id)) || posts[0];

  return (
    <div className="blog-post-page" style={{ backgroundColor: '#fff' }}>
      {/* Post Header */}
      <section style={{ 
        height: '50vh', 
        minHeight: '400px',
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${gal008})`,
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={18} color="#FFD700" /> {post.date}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={18} color="#FFD700" /> Por {post.author}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={18} color="#FFD700" /> 0 Comentários</div>
              </div>

              <div style={{ fontSize: '1.15rem', color: '#334155', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {post.content}
                
                <div style={{ marginTop: '3rem', padding: '2.5rem', backgroundColor: '#f8fafc', borderRadius: '20px', borderLeft: '5px solid #FFD700' }}>
                   <p style={{ fontStyle: 'italic', fontSize: '1.25rem', color: '#475569', marginBottom: 0 }}>
                      "A Amazônia não é apenas a maior floresta do mundo, é o pulmão da humanidade e um tesouro cultural que todos deveriam conhecer pelo menos uma vez na vida."
                   </p>
                </div>

                <p style={{ marginTop: '2rem' }}>
                   Prepare sua mala e venha conosco descobrir os segredos da selva. A Amazonia Travel garante que sua experiência será segura, confortável e inesquecível.
                </p>
              </div>

              <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <div style={{ display: 'flex', gap: '1rem' }}>
                    <span style={{ fontWeight: 800 }}>Compartilhar:</span>
                    <Share2 size={20} style={{ cursor: 'pointer', color: '#64748b' }} />
                 </div>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {["Viagem", "Amazônia", "Dicas"].map(tag => (
                      <span key={tag} style={{ backgroundColor: '#f1f5f9', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>#{tag}</span>
                    ))}
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
