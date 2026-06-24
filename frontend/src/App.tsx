//import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <Footer />
        </div>
      </CartProvider>
    </div>
  )
}

export default App
