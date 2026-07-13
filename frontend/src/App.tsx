//import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
      <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-primary-background">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
            <Footer />
        </div>
      </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App
