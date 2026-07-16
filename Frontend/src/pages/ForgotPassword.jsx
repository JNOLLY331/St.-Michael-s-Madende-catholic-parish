import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdChurch, MdDiamond, MdMail, MdWarning, MdArrowBack, MdSend } from 'react-icons/md';
import toast from 'react-hot-toast';
import { accountsApi } from '../api/endpoints/accounts';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return setError('Email is required.');

        setError('');
        setLoading(true);
        const toastId = toast.loading('Sending reset link...');

        try {
            await accountsApi.forgotPassword(email.trim().toLowerCase());
            toast.success('If an account matches that email, a password reset link has been sent.', { id: toastId, duration: 4000 });
            setSuccess(true);
        } catch (err) {
            console.error('Forgot password error:', err);
            const msg = err.response?.data?.message || 'Wait a moment before trying again.';
            setError(msg);
            toast.error(msg, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#fff8f5] text-[#1e1b18] min-h-screen flex flex-col font-sans">
            <header className="w-full sticky top-0 bg-[#fff8f5] z-50 border-b border-[#e0bfbf] shadow-sm px-16 py-4 flex justify-center items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <MdChurch className="text-[#570013] text-3xl" />
                    <h1 className="font-serif text-2xl font-medium text-[#570013] tracking-tight">St. Michael Madende</h1>
                </Link>
            </header>

            <main className="flex-grow flex items-center justify-center py-20 px-5">
                <div className="animate-fade-in-up w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-[#e0bfbf] relative overflow-hidden transition-shadow duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#570013]" />

                    <div className="text-center mb-8">
                        <h2 className="font-serif text-3xl text-[#570013] mb-2">Forgot Password</h2>
                        <p className="text-body-md text-[#584141] italic">
                            Enter your email to receive a password reset link.
                        </p>
                        <div className="decorative-divider justify-center gap-4 my-6 max-w-[200px] mx-auto">
                            <MdDiamond className="text-[#735c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                            <MdWarning className="shrink-0 text-lg" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success ? (
                        <div className="text-center">
                            <p className="text-[#15803d] mb-6 font-medium">Reset link sent! Please check your email.</p>
                            <Link to="/login" className="inline-flex items-center gap-2 text-[#735c00] hover:text-[#570013] transition-colors font-medium">
                                <MdArrowBack /> Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-label-md text-[#584141] mb-1">Email Address</label>
                                <div className="relative">
                                    <MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => { setError(''); setEmail(e.target.value); }}
                                        autoComplete="email"
                                        className="w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-4 py-4 bg-[#800020] text-white text-label-md rounded-full shadow-lg hover:bg-[#570013] transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : <><MdSend /> Send Reset Link</>}
                            </button>
                            
                            <div className="mt-8 pt-8 border-t border-[#e0bfbf] text-center">
                                <Link to="/login" className="inline-flex items-center gap-2 text-[#735c00] hover:text-[#570013] transition-colors font-medium">
                                    <MdArrowBack /> Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
