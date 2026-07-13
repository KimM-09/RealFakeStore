import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, CartContextType } from '../types/store.types';

//1. initialize the context with undefined instead of a fake object. This allows us to enforce safe hook usage later.
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);

    //2. Automatically recalculate totals whenever the cart changes
    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setCartTotal(total);
    }, [cart]);

    //3. Add to cart / increment qty.
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                return prevCart.map((item) => 
                    item.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, 15) } : item );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    //4. Remove from cart
    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    //5. Adjust quantities
    const updateQuantity = (productId: number, quantity: number) => {
        if(quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) => prevCart.map((item) => item.id === productId ? { ...item, quantity: Math.min(quantity, 15) } : item ));
    };

    //6. Reset cart state
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

//7. custom hook for consuming the context safely without null-checks everywhere
export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}