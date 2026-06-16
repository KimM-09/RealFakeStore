import type { Product } from '../types/store.types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    const { addToCart } = useCart();
  return (
    <div className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md'>
      
      <div className='aspect-square bg-gray-100 p-6 flex items-center justify-center group-hover:opacity-90 transition-opacity'>
        <img
            src={product.image}
            alt={product.title}
            className='h-full w-full object-contain max-h-48'
        />
      </div>

      <div className='flex flex-1 flex-col p-4 space-y-2'>
        <span className='text-xs font-semibold tracking-wider text-indigo-600 uppercase'>
            {product.category}
        </span>
        <h3 className='text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px'>
            {product.title}
        </h3>

        <div className='flex items-center space-x-1'>
            <div className='flex items-center text-amber-400 text-sm'>
                ⭐ <span className='text-gray-600 text-sx ml-1'>{product.rating.rate}</span>
            </div>

            <div className='flex flex-col justify-end pt-4 mt-auto'>
                <p className='text-xl font-bold text-gray-900 mb-3'>
                    ${product.price.toFixed(2)}
                </p>

                <button 
                    onClick={() => addToCart(product)}
                    className='w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors'>
                        Add to Cart
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard
