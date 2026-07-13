import type { Product } from '../types/store.types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({product}: ProductCardProps) => {
    const { cart, addToCart, updateQuantity } = useCart();
    const currentQuantity = cart.find((item) => item.id === product.id)?.quantity ?? 0;

  return (
    <div className='group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md'>
      
      <Link to={`/product/${product.id}`} className='flex flex-col flex-1'>
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
        </div>
        </div>
      </Link>

      <div className='px-4 pb-4'>
        <p className='text-xl font-bold text-gray-900 mb-3'>
          ${product.price.toFixed(2)}
        </p>

        {currentQuantity > 0 ? (
          <div className='flex items-center overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm'>
            <button
              onClick={() => updateQuantity(product.id, currentQuantity - 1)}
              className='flex h-10 w-10 items-center justify-center text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer'
              aria-label={`Decrease quantity of ${product.title}`}
            >
              −
            </button>
            <span className='flex-1 min-w-0 px-3 text-center text-sm font-semibold text-gray-900'>
              {currentQuantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, currentQuantity + 1)}
              disabled={currentQuantity >= 15}
              className='flex h-10 w-10 items-center justify-center text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
              aria-label={`Increase quantity of ${product.title}`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className='w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors cursor-pointer'>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard
