import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdChurch, MdDiamond, MdLock, MdLogin, MdMail } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';



export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <div className="bg-[#fff8f5] text-[#1e1b18] min-h-screen flex flex-col font-sans">
            {/* Simple brand header */}
            <header className="w-full sticky top-0 bg-[#fff8f5] z-50 border-b border-[#e0bfbf] shadow-sm px-16 py-4 flex justify-center items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <MdChurch className="text-[#570013] text-3xl" />
                    <h1 className="font-serif text-2xl font-medium text-[#570013] tracking-tight">St. Michael Madende</h1>
                </Link>
            </header>

            {/* Login canvas */}
            <main className="flex-grow flex items-center justify-center py-20 px-5">
                <div
                    className={`animate-fade-in-up w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-[#e0bfbf] relative overflow-hidden transition-shadow duration-300 ${focused ? 'shadow-[0_20px_40px_-15px_rgba(87,0,19,0.15)]' : ''
                        }`}
                >
                    {/* Burgundy top accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#570013]" />

                    <div className="text-center mb-8">
                        <h2 className="font-serif text-3xl text-[#570013] mb-2">Welcome Back</h2>
                        <p className="text-body-md text-[#584141] italic">
                            "I was glad when they said unto me, Let us go into the house of the Lord."
                        </p>
                        {/* Decorative divider */}
                        <div className="decorative-divider justify-center gap-4 my-6 max-w-[200px] mx-auto">
                            <MdDiamond className="text-[#735c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                        {/* Email */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="login-id">Email or Username</label>
                            <div className="relative">
                                <MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="login-id"
                                    type="text"
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-label-md text-[#584141]" htmlFor="password">Password</label>
                                <a href="#" className="text-caption text-[#570013] hover:underline">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
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

                        {/* Remember me */}
                        <div className="flex items-center gap-2 py-2">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 text-[#570013] bg-[#fbf2ed] border-[#e0bfbf] rounded focus:ring-[#570013]"
                            />
                            <label htmlFor="remember" className="text-caption text-[#584141] cursor-pointer">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <Link
                            to="/dashboard"
                            className="w-full mt-4 py-4 bg-[#800020] text-white text-label-md rounded-full shadow-lg hover:bg-[#570013] transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                        >
                            <span>Login to Portal</span>
                            <MdLogin className="text-lg" />
                        </Link>
                    </form>

                    {/* Registration link */}
                    <div className="mt-8 pt-8 border-t border-[#e0bfbf] text-center">
                        <p className="text-body-md text-[#584141] mb-2">New to our parish community?</p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 text-[#735c00] text-label-md hover:text-[#570013] transition-colors group"
                        >
                            Register as a Parishioner
                            <MdArrowForward className="text-lg group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Minimal footer */}
            <footer className="w-full py-6 bg-[#2b271e] text-white">
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <MdChurch className="text-[#ffe088] text-xl" />
                        <span className="text-caption opacity-80">© 2024 St. Michael Madende Catholic Parish</span>
                    </div>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(l => (
                            <a key={l} href="#" className="text-caption text-[#cdc6b8] hover:text-[#ffe088] transition-colors">{l}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
