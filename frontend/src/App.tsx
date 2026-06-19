//import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import Cart from './pages/Cart';

const App = () => {
  return (
    <div>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
      </CartProvider>
    </div>
  )
}

export default App
