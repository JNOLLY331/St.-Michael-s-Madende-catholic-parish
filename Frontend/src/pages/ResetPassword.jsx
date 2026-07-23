import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdChurch, MdDiamond, MdLock, MdWarning, MdArrowForward } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';
import toast from 'react-hot-toast';
import { accountsApi } from '../api/endpoints/accounts';

export default function ResetPassword() {
    const { uidb64, token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!password || !confirm) return setError('Both fields are required.');
        if (password !== confirm) return setError('Passwords do not match.');
        if (password.length < 8) return setError('Password must be at least 8 characters long.');

        setLoading(true);
        const toastId = toast.loading('Resetting password...');

        try {
            await accountsApi.resetPassword(uidb64, token, { password, confirm_password: confirm });
            toast.success('Password has been reset successfully.', { id: toastId, duration: 4000 });
            navigate('/login', { replace: true });
        } catch (err) {
            console.error('Reset password error:', err);
            const msg = err.response?.data?.message || 'Invalid or expired token.';
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
                        <h2 className="font-serif text-3xl text-[#570013] mb-2">Reset Password</h2>
                        <p className="text-body-md text-[#584141] italic">
                            Create a new password for your account.
                        </p>
                        <div className="decorative-divider justify-center gap-4 my-6 max-w-[200px] mx-auto">
                            <MdDiamond className="text-[#735c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-none px-4 py-3 text-sm">
                            <MdWarning className="shrink-0 text-lg" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1">New Password</label>
                            <div className="relative">
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => { setError(''); setPassword(e.target.value); }}
                                    className="w-full pl-10 pr-10 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-none focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#584141] hover:text-[#570013] transition-colors"
                                >
                                    <DynamicIcon name={showPassword ? 'visibility_off' : 'visibility'} className="text-xl" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-label-md text-[#584141] mb-1">Confirm New Password</label>
                            <div className="relative">
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={confirm}
                                    onChange={(e) => { setError(''); setConfirm(e.target.value); }}
                                    className="w-full pl-10 pr-10 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-none focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password || !confirm}
                            className="w-full mt-4 py-4 bg-[#800020] text-white text-label-md rounded-none shadow-lg hover:bg-[#570013] transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
