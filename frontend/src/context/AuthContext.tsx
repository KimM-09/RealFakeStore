import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, AuthContextType } from '../types/store.types';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('fake_store_token');
        const storedUser = localStorage.getItem('fake_store_user');

        if(storedToken && storedUser){
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const loginUser = async (email: string, password: string): Promise<boolean> => {
        setError(null);
        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Invalid email or password AuthContext.ts');
            }

            localStorage.setItem('fake_store_token', data.token);
            localStorage.setItem('fake_store_user', JSON.stringify(data.user));
            setToken(data.token);
            setUser(data.user);
            return true;
        } catch (error) {
            setError((error as Error).message);
            return false;
        }
    };

    const registerUser = async (username: string, email: string, password: string): Promise<boolean> => {
        setError(null);
        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || 'Registration Failed. AuthContext.ts');
            }

            localStorage.setItem('fake_store_token', data.token);
            localStorage.setItem('fake_store_user', JSON.stringify(data.user));
            setToken(data.token);
            setUser(data.user);
            return true;
        } catch (error) {
            setError((error as Error).message);
            return false;
        }
    };

    const logoutUser = () => {
        localStorage.removeItem('fake_store_token');
        localStorage.removeItem('fake_store_user');
        setToken(null);
        setUser(null);
    }

    return (
       <AuthContext.Provider value={{ user, token, isLoading, error, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);;
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}