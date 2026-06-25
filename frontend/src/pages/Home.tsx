//import React from 'react'
import { useState, useEffect } from 'react';
import  ProductCard  from '../components/ProductCard';
import type { Product } from '../types/store.types';
import { apiService } from '../services/api';
import { TriangleAlert } from 'lucide-react';

// Mock data mirroring FakeStoreAPI response format
// const MOCK_PRODUCTS: Product[] = [
//   {
//     id: 1,
//     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     price: 109.95,
//     description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     rating: { rate: 3.9, count: 120 }
//   },
//   {
//     id: 2,
//     title: "Mens Casual Premium Slim Fit T-Shirts ",
//     price: 22.30,
//     description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     rating: { rate: 4.1, count: 259 }
//   },
//   {
//     id: 3,
//     title: "Mens Cotton Jacket",
//     price: 55.99,
//     description: "great outerwear jackets for Mens, suitable for many occasions, deep color matching makes you stylish.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71li-alvuCL._AC_UX679_.jpg",
//     rating: { rate: 4.7, count: 500 }
//   },
//   {
//     id: 4,
//     title: "Mens Casual Slim Fit",
//     price: 15.99,
//     description: "The Joes Jeans Mens Casual Slim Fit provides sleek, tailored styling with premium lightweight denim flexibility.",
//     category: "men's clothing",
//     image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
//     rating: { rate: 2.1, count: 430 }
//   }
// ];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await apiService.getAllProducts();
        setProducts(data);
      } catch (error) {
        setError('Failed to load products. Please try again later');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts()
  }, []);
  /**Loading state screen view */
  if (isLoading) {
    return(
      <div className='flex flex-col items-center justify-center min-h-[50vh] space-y-4'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
        <p className='text-primary-text text-sm font-medium'>Fetching the store catalog...</p>
      </div>
    );
  }

  /**Error state screen view */
  if(error) {
    return(
      <div className='max-w-7xl mx-auto px-4 py-12 text-center'>
        <div className='bg-rose-50 border border-rose-200 text-red-700 px-4 py-3 rounded-md inline-block'>
          <TriangleAlert /> {error}
        </div>
      </div>
    );
  }


  return (
    <main className='bg-secondary-background dark:bg-dark-secondary-background max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <div className='border-b border-primary-border dark:border-dark-primary-border pb-5 mb-8'>
        <h1 className='text-3xl lg:text-6xl font-bold tracking-tight text-primary-text dark:text-dark-primary-text'>Trending Products</h1>
        <p className='mt-2 text-sm text-primary-text dark:text-dark-primary-text'>Explore our collection of real fake items built completely with TypeScript</p>
      </div>
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}

export default Home
