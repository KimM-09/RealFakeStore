//import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Home />
        </div>
      </CartProvider>
    </div>
  )
}

export default App
