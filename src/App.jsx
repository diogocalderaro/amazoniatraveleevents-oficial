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
import ScrollToTop from './components/ScrollToTop';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPacotes from './pages/admin/AdminPacotes';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminVendas from './pages/admin/AdminVendas';
import AdminPerguntas from './pages/admin/AdminPerguntas';
import AdminGaleria from './pages/admin/AdminGaleria';
import AdminComentarios from './pages/admin/AdminComentarios';

function App() {
  return (
    <CartProvider>
      <Router>
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

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pacotes" element={<AdminPacotes />} />
            <Route path="categorias" element={<AdminCategorias />} />
            <Route path="vendas" element={<AdminVendas />} />
            <Route path="perguntas" element={<AdminPerguntas />} />
            <Route path="galeria" element={<AdminGaleria />} />
            <Route path="comentarios" element={<AdminComentarios />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
