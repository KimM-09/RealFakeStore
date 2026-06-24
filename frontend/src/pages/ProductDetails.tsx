import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import type { Product } from '../types/store.types';
import { apiService } from '../services/api';
import { useCart } from '../context/CartContext';
import { Star, TriangleAlert } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct ] = useState<Product | null>(null);
    const [isLoading, setIsLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const loadSingleProduct = async () => {
            /**Route safety check - verify the 'id' exists in the URL path */
            if(!id) {
                setError('No product ID provided');
                setIsLoading(false);
                return;
            }

            /**Convert string parameter to number for API */
            const productId = parseInt(id, 10);
            if(isNaN(productId)) {
                setError('Invalid product ID format');
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                const data = await apiService.getProductById(productId);

                if(!data) {
                    setError('Product not found');
                } else {
                    setProduct(data);
                }
            } catch (error) {
                setError('Failed to fetch product details');
            } finally {
                setIsLoading(false);
            }
        };

        loadSingleProduct();
    }, [id]);

    if(isLoading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[50vh] space-y-4'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
                <p className='text-gray-500 text-sm'>Loading details...</p>
            </div>
        );
    }

    if(error || !product) {
        return (
            <div className='max-w-3xl mx-auto px-4 py-12 text-center'>
                <div className='bg-rose-50 border border-rose-200 text-red-700 px-4 py-3 rounded-md mb-4'>
                    <TriangleAlert /> {error || 'An unexpected error occured.'}
                </div>
                <button onClick={() => navigate('/')} className='text-sm font-semibold text-indigo-600 hover:text-indigo-500'>
                    &larr; Back to shopping catalog
                </button>
            </div>
        );
    }

  return (
    <div>
      <main className='max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 py-12'>
        <button onClick={() => navigate('/')} className='mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer'>
            &larr; Back to Products
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 items-start'>

                    <div className='bg-white border border-gray-200 rounded-lg p-8 flex items-center justify-center min-h-100 shadow-sm'>
                        <img src={product.image} alt={product.title} className='max-h-96 object-contain w-full' />
                    </div>
                    
                    <div className='flex flex-col space-y-6'>
                        <div>
                            <span className='text-sm font-semibold uppercase tracking-wider text-indigo-600'>
                                {product.category}
                            </span>
                            <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                {product.title}
                            </h1>
                        </div>

                        <div className='flex items-center space-x-4 border-b border-gray-200 pb-4'>
                            <div className='flex items-center text-amber-500 font-bold'>
                                <Star /> <span className='ml-1 text-gray-900 font-medium'>{product.rating.rate}</span>
                            </div>
                            <span className='text-gray-300'>|</span>
                            <span className='text-sm text-gray-500 font-medium'>
                                {product?.rating.count} Customer Reviews
                            </span>
                        </div>

                        <div>
                            <h2 className='sr-only'>Description</h2>
                            <p className='text-base text-gray-700 leading-relaxed'>
                                {product.description}
                            </p>
                        </div>

                        <div className='bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center justify-between'>
                            <div>
                                <p className='text-sm text-gray-400 font-semibold uppercase tracking-wide'>Price</p>
                                <p className='text-3xl font-bold text-gray-900'>{product?.price.toFixed(2)}</p>
                            </div>

                            <button onClick={() => addToCart(product)} className='rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors focus:outline-none'>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
      </main>
    </div>
  )
}

export default ProductDetails
