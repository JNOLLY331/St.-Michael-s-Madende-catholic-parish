import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdChurch, MdCheckCircle, MdError, MdArrowForward } from 'react-icons/md';
import { accountsApi } from '../api/endpoints/accounts';

export default function VerifyEmail() {
    const { uidb64, token } = useParams();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verify = async () => {
            try {
                await accountsApi.verifyEmail(uidb64, token);
                setStatus('success');
                setMessage('Your email has been verified successfully.');
            } catch (err) {
                setStatus('error');
                setMessage(err.response?.data?.message || 'Invalid or expired verification link.');
            }
        };
        verify();
    }, [uidb64, token]);

    return (
        <div className="bg-[#fff8f5] text-[#1e1b18] min-h-screen flex flex-col font-sans">
            <header className="w-full sticky top-0 bg-[#fff8f5] z-50 border-b border-[#e0bfbf] shadow-sm px-16 py-4 flex justify-center items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <MdChurch className="text-[#570013] text-3xl" />
                    <h1 className="font-serif text-2xl font-medium text-[#570013] tracking-tight">St. Michael Madende</h1>
                </Link>
            </header>

            <main className="flex-grow flex items-center justify-center py-20 px-5">
                <div className="animate-fade-in-up w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-[#e0bfbf] relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#570013]" />

                    {status === 'loading' && (
                        <div className="py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#570013] mx-auto mb-4"></div>
                            <h2 className="text-xl font-serif text-[#570013]">{message}</h2>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="py-8">
                            <MdCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-serif text-[#570013] mb-2">Verified!</h2>
                            <p className="text-[#584141] mb-6">{message}</p>
                            <Link to="/login" className="inline-flex items-center gap-2 text-[#735c00] hover:text-[#570013] font-medium transition-colors">
                                Proceed to Login <MdArrowForward />
                            </Link>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="py-8">
                            <MdError className="text-6xl text-red-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-serif text-[#570013] mb-2">Verification Failed</h2>
                            <p className="text-[#584141] mb-6">{message}</p>
                            <Link to="/login" className="inline-flex items-center gap-2 text-[#735c00] hover:text-[#570013] font-medium transition-colors">
                                Go to Login <MdArrowForward />
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
