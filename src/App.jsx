import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import TourDetails from './pages/TourDetails';
import BookingFlow from './pages/BookingFlow';
import Packages from './pages/Packages';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="page-wrapper">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/book/:id" element={<BookingFlow />} />
            <Route path="/destinations" element={<Packages />} />
            {/* Fallback routes for unbuilt pages */}
            <Route path="/trip" element={<div className="container" style={{padding: '5rem 0'}}><h1>Trips (Coming Soon)</h1></div>} />
            <Route path="/plans" element={<div className="container" style={{padding: '5rem 0'}}><h1>Plans (Coming Soon)</h1></div>} />
            <Route path="/about" element={<div className="container" style={{padding: '5rem 0'}}><h1>About (Coming Soon)</h1></div>} />
            <Route path="/blog" element={<div className="container" style={{padding: '5rem 0'}}><h1>Blog (Coming Soon)</h1></div>} />
            <Route path="/contact" element={<div className="container" style={{padding: '5rem 0'}}><h1>Contact (Coming Soon)</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
