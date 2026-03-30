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
              <Route path="/tour/:id" element={<TourDetails />} />
              <Route path="/checkout" element={<BookingFlow />} />
              <Route path="/destinations" element={<Packages />} />
              <Route path="/pacotes" element={<Navigate to="/destinations" replace />} />
              <Route path="/destinos" element={<Navigate to="/destinations" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/book/:id" element={<BookingFlow />} />
              <Route path="/how-to-buy" element={<HowToBuy />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Painel Login (outside layout) */}
            <Route path="/painel/login" element={<PainelLogin />} />

            {/* Painel Routes (protected by AdminLayout) */}
            <Route path="/painel" element={<AdminLayout />}>
              <Route index element={<PainelDashboard />} />
              <Route path="destinos" element={<PainelDestinos />} />
              <Route path="paginas" element={<PainelPaginas />} />
              <Route path="reservas" element={<PainelReservas />} />
              <Route path="blog" element={<PainelBlog />} />
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
