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
        <div className="min-h-screen flex flex-col bg-primary-background">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </div>
            <Footer />
        </div>
      </CartProvider>
    </div>
  )
}

export default App
