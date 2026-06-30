//import React from 'react'
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"
import { Link } from 'react-router';

const Navbar = () => {
    const { cart } = useCart();
    //Calculate the total number of items
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="sticky top-0 z-50 bg-secondary-background dark:bg-dark-secondary-background border-b border-primary-border dark:border-dark-primary-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                {/*Logo & brand name */}
                <div className="shrink-0 flex items-center">
                    <span className="text-2xl font-family-primary tracking-widest text-primary-text dark:text-dark-primary-text cursor-pointer">
                        <Link to="/"><span className="text-5xl">R</span>eal <span className="text-5xl">F</span>ake <span className="text-5xl">S</span>tore</Link>
                    </span>
                </div>
                {/*Nav links and cart icon*/}
                <div className="flex items-center space-x-8">
                    {/* <span className="text-primary-text dark:text-dark-primary-text hover:text-accent-hover font-medium transition-colors cursor-pointer">
                        <Link to="/">Products</Link>
                    </span> */}
                    {/*cart button */}
                    <Link to="/cart"><button className="relative p-2 text-primary-text dark:text-dark-primary-text transition-colors focus:outline-none cursor-pointer">
                        {/*Replace with lucide icon*/}
                        <ShoppingCart className="w-6 h-6" />
                          {totalItems > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-error rounded-full animate-fade-in">
                                {totalItems}
                            </span>
                          )}
                    </button></Link>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar
