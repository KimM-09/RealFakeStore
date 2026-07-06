import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { TriangleAlert } from 'lucide-react';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { loginUser, error } = useAuth();
const navigate = useNavigate();
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const success = await loginUser(email, password);
    setSubmitting(false);

    if(success) {
        navigate('/');
    }
};

  return (
      <main className='flex min-h-[85vh] flex-col justify-center px-6 py-12 lg:px-8 bg-primary-background text-primary-text dark:bg-dark-primary-background dark:text-dark-primary-text'>
        <div className='md:w-96 mx-auto w-full max-w-full bg-secondary-background p-8 rounded-xl border border-primary-border shadow-sm'>
            <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-primary-text mb-6'>
                Sign In To Your Account
            </h2>

            {error && (
                <div className='mb-4 rounded-md bg-rose-50 border border-rose-200 p-3 text-sm text-error'>
                    <TriangleAlert /> {error}
                </div>
            )}

            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label className='block text-sm font-medium leading-6 text-primary-text'>Email</label>
                    <input
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='mt-1 block w-full rounded-md border border-primary-border px-3 py-2 text-primary-text shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium leading-6 text-primary-text'>Password</label>
                    <input
                        type='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mt-1 block w-full rounded-md border border-primary-border px-3 py-2 text-primary-text shadow-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm'
                    />
                </div>

                <button
                    type='submit'
                    disabled={submitting}
                    className='flex w-full justify-center rounded-md bg-accent px-3 py-2 text-sm font-semibold text-dark-primary-text shadow-sm hover:bg-accent-hover focus-visible:outline-2 transition-colors disabled:bg-gray-400'
                >
                    {submitting ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </div>
      </main>
  )
}

export default Login
