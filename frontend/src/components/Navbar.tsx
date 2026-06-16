//import React from 'react'
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"

const Navbar = () => {
    const { cart } = useCart();
    //Calculate the total number of items
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                {/*Logo & brand name */}
                <div className="shrink-0 flex items-center">
                    <span className="text-xl font-bold tracking-tight text-indigo-600 cursor-pointer">
                        Real Fake Store
                    </span>
                </div>
                {/*Nav links and cart icon*/}
                <div className="flex items-center space-x-8">
                    <span className="text-gray-600 hover:text-indigo-600 font-meduim transition-colors cursor-pointer">
                        Products
                    </span>
                    {/*cart button */}
                    <button className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none">
                        {/*Replace with lucide icon*/}
                        <ShoppingCart className="w-6 h-6" />
{/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg> */}
                          {totalItems > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-rose-500 rounded-full animate-fade-in">
                                {totalItems}
                            </span>
                          )}
                    </button>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar
