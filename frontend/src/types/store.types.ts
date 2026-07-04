export interface UserProfile {
    id: string;
    username: string;
    email: string;
}

export interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
    registerUser: (username: string, email: string, password: string) => Promise<boolean>;
    logoutUser: () => void;
}

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface CartItem  extends Product {
    quantity: number;
}

//Helps type check global cart state functions
export interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

