import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import BookingFlow from './pages/BookingFlow';
import Packages from './pages/Packages';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import HowToBuy from './pages/HowToBuy';
import SearchResults from './pages/SearchResults';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="page-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/checkout" element={<BookingFlow />} />
            <Route path="/destinations" element={<Packages />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/book/:id" element={<BookingFlow />} />
            <Route path="/how-to-buy" element={<HowToBuy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </CartProvider>
  );
}

export default App;
