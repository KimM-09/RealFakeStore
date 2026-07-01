import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router';


const Cart = () => {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    if(cart.length === 0) {
        return (
            <main className='max-w-3xl mx-auto px-4 py-16 text-center'>
                <div className='text-6xl mb-4'>
                    <h2 className='text-2xl font-bold text-gray-900'>Your cart is empty</h2>
                    <p className='text-gray-500 mt-2'>Looks like you haven't added anything to your cart yet</p>
                    <Link to="/" ><button className='mt-6 inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover transition-colors'>
                        Continue Shopping
                    </button>
                    </Link>
                </div>
            </main>
        );
    }

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 mb-8'>Shopping Cart</h1>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10'>

        {/*Left side: lidt of items*/}
        <section className='lg:col-span-8'>
            <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {cart.map(item => (
                <div key={item.id} className='flex py-6 sm:py-6 items-center'>

                    {/* item thumbnail img */}
                    <div className='h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 p-2 bg-white flex items-center justify-center'>
                        <img src={item.image} alt={item.title} className='h-full w-full object-contain' />
                    </div>

                    {/* info & controls */}
                    <div className='ml-4 flex flex-1 flex-col sm:ml-6'>
                        <div className='flex justify-between items-start'>
                            <h3 className='text-sm font-medium text-gray-900 line-clamp-2 max-w[70%]'>
                                {item.title}
                            </h3>
                            <p className='ml-4 text-sm font-semibold text-gray-900'>
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>

                        <p className='mt-1 text-xs text-gray-500 capitalize'>{item.category}</p>
                        <p className='mt-1 text-xs text-gray-400'>${item.price.toFixed(2)} each</p>

                        {/* quantity actions */}
                        <div className='flex items-center justify-between pt-4 mt-auto'>
                            <div className='flex items-center border border-gray-300 rounded-md bg-white shadow-sm'>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className='px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-lg'
                                >
                                    -
                                </button>
                                <span className='px-3 text-sm font-medium text-gray-900 min-w-6 text-center'>
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className='px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-lg'
                                >
                                    +
                                </button>
                            </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className='text-sm font-medium text-error hover:text-error-hover transition-colors cursor-pointer'
                                >
                                    <Trash2 />
                                </button>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
            <button
                onClick={clearCart}
                className='mt-6 inline-flex items-center justify-center rounded-md bg-error px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-error-hover transition-colors cursor-pointer'>
                    Clear entire cart
            </button>
            <Link to="/"><button className='mt-6 inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover transition-colors cursor-pointer'>
                        Continue Shopping
                          </button>
            </Link>
            </div>
        </section>

        {/* right side: summary breakdown */}
        <section className='lg:col-span-4 bg-gray-50 rounded-lg p-6 border border-gray-200 self-start'>
            <h2 className='text-lg font-medium text-gray-900 border-b border-gray-200 pb-4'>
                Order Summary
            </h2>

            <div className='flow-root mt-6'>
                <dl className='my-4 divide-y divide-gray-200 text-sm'>
                    <div className='flex items-center justify-between py-4'>
                        <dt className='text-gray-600'>Subtotal</dt>
                        <dd className='font-medium text-gray-900'>${cartTotal.toFixed(2)}</dd>
                    </div>
                    <div className='flex items-center justify-between py-4'>
                        <dt className='text-gray-600'>Shipping</dt>
                        <dd className='text-emerald-600 font-semibold'>FREE</dd>
                    </div>
                    <div className='flex items-center justify-between py-4 text-base font-bold'>
                        <dt className='text-gray-900'>Order Total</dt>
                        <dd className='text-gray-900'>${cartTotal.toFixed(2)}</dd>
                    </div>
                </dl>
            </div>
            <button className='mt-6 w-full rounded-md bg-success px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-success-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 cursor-pointer'>
                Proceed to Checkout
            </button>
        </section>
      </div>
    </main>
  )
}

export default Cart
