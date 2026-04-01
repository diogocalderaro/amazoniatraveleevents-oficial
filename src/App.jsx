import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import BookingFlow from './pages/BookingFlow';
import Packages from './pages/Packages';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import HowToBuy from './pages/HowToBuy';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Painel Pages
import PainelLogin from './pages/painel/PainelLogin';
import PainelDashboard from './pages/painel/PainelDashboard';
import PainelDestinos from './pages/painel/PainelDestinos';
import PainelPaginas from './pages/painel/PainelPaginas';
import PainelReservas from './pages/painel/PainelReservas';
import PainelBlog from './pages/painel/PainelBlog';
import PainelFAQ from './pages/painel/PainelFAQ';
import PainelGaleria from './pages/painel/PainelGaleria';
import PainelComentarios from './pages/painel/PainelComentarios';
import PainelRelatorios from './pages/painel/PainelRelatorios';
import PainelBlogCategorias from './pages/painel/PainelBlogCategorias';
import PainelDestinoEditor from './pages/painel/PainelDestinoEditor';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router basename="/">
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/passeio/:id" element={<TourDetails />} />
              <Route path="/reservar" element={<BookingFlow />} />
              <Route path="/pagamento" element={<BookingFlow />} />
              <Route path="/destinos" element={<Packages />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/buscar" element={<SearchResults />} />
              <Route path="/reservar/:id" element={<BookingFlow />} />
              <Route path="/como-comprar" element={<HowToBuy />} />
              
              {/* Redirects for old English paths */}
              <Route path="/tour/:id" element={<Navigate to="/passeio/:id" replace />} />
              <Route path="/checkout" element={<Navigate to="/reservar" replace />} />
              <Route path="/destinations" element={<Navigate to="/destinos" replace />} />
              <Route path="/pacotes" element={<Navigate to="/destinos" replace />} />
              <Route path="/about" element={<Navigate to="/sobre" replace />} />
              <Route path="/contact" element={<Navigate to="/contato" replace />} />
              <Route path="/search" element={<Navigate to="/buscar" replace />} />
              <Route path="/book/:id" element={<Navigate to="/reservar/:id" replace />} />
              <Route path="/how-to-buy" element={<Navigate to="/como-comprar" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
 
            {/* Painel Login (outside layout) */}
            <Route path="/painel/login" element={<PainelLogin />} />
 
            {/* Painel Routes (protected by AdminLayout) */}
            <Route path="/painel" element={<AdminLayout />}>
              <Route index element={<PainelDashboard />} />
              <Route path="destinos" element={<PainelDestinos />} />
              <Route path="destinos/novo" element={<PainelDestinoEditor />} />
              <Route path="destinos/:id" element={<PainelDestinoEditor />} />
              <Route path="paginas" element={<PainelPaginas />} />
              <Route path="reservas" element={<PainelReservas />} />
              <Route path="blog" element={<PainelBlog />} />
              <Route path="blog/categorias" element={<PainelBlogCategorias />} />
              <Route path="faq" element={<PainelFAQ />} />
              <Route path="galeria" element={<PainelGaleria />} />
              <Route path="comentarios" element={<PainelComentarios />} />
              <Route path="relatorios" element={<PainelRelatorios />} />
            </Route>

            {/* Redirect old /admin to /painel */}
            <Route path="/admin/*" element={<Navigate to="/painel" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
