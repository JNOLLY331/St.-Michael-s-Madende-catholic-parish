import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
        <div className="bg-[#fff8f5] text-[#1e1b18] min-h-screen flex flex-col font-sans">
            {/* Simple brand header */}
            <header className="w-full sticky top-0 bg-[#fff8f5] z-50 border-b border-[#e0bfbf] shadow-sm px-5 md:px-16 py-4 flex justify-between md:justify-center items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-[#570013] text-3xl">church</span>
                    <h1 className="font-serif text-2xl font-medium text-[#570013] tracking-tight">St. Michael Madende</h1>
                </Link>
                <Link to="/login" className="md:hidden text-caption text-[#570013] border border-[#570013] px-3 py-1 rounded-full">Login</Link>
            </header>

            {/* Register canvas */}
            <main className="flex-grow flex items-center justify-center py-10 md:py-20 px-5">
                <div
                    className={`animate-fade-in-up w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-xl border border-[#e0bfbf] relative overflow-hidden transition-shadow duration-300 ${focused ? 'shadow-[0_20px_40px_-15px_rgba(87,0,19,0.15)]' : ''
                        }`}
                >
                    {/* Burgundy top accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#570013]" />

                    <div className="text-center mb-8">
                        <h2 className="font-serif text-3xl text-[#570013] mb-2">Join Our Parish</h2>
                        <p className="text-body-md text-[#584141] italic">
                            "For where two or three are gathered in my name, I am there among them."
                        </p>
                        {/* Decorative divider */}
                        <div className="flex items-center justify-center gap-4 my-6 max-w-[200px] mx-auto">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#e0bfbf]" />
                            <span className="material-symbols-outlined text-[#735c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#e0bfbf]" />
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label className="block text-label-md text-[#584141] mb-1" htmlFor="first-name">First Name</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#584141] opacity-60">person</span>
                                    <input
                                        id="first-name"
                                        type="text"
                                        placeholder="John"
                                        className="w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-label-md text-[#584141] mb-1" htmlFor="last-name">Last Name</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#584141] opacity-60">person</span>
                                    <input
                                        id="last-name"
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-email">Email Address</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#584141] opacity-60">mail</span>
                                <input
                                    id="reg-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-phone">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#584141] opacity-60">phone</span>
                                <input
                                    id="reg-phone"
                                    type="tel"
                                    placeholder="+1 (234) 567-8901"
                                    className="w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-password">Password</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#584141] opacity-60">lock</span>
                                <input
                                    id="reg-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    className="w-full pl-10 pr-10 py-3 bg-[#fbf2ed] border border-[#e0bfbf] rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md"
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#584141] hover:text-[#570013] transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Agree to terms */}
                        <div className="flex items-start gap-2 py-2">
                            <input
                                id="terms"
                                type="checkbox"
                                className="w-4 h-4 mt-1 text-[#570013] bg-[#fbf2ed] border-[#e0bfbf] rounded focus:ring-[#570013]"
                            />
                            <label htmlFor="terms" className="text-caption text-[#584141] cursor-pointer leading-tight">
                                I agree to the <a href="#" className="text-[#570013] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#570013] hover:underline">Terms of Service</a>, and consent to receiving parish communications.
                            </label>
                        </div>

                        {/* Submit */}
                        <Link
                            to="/dashboard"
                            className="w-full mt-4 py-4 bg-[#800020] text-white text-label-md rounded-full shadow-lg hover:bg-[#570013] transition-all active:scale-[0.98] flex justify-center items-center gap-2"
                        >
                            <span>Create Account</span>
                            <span className="material-symbols-outlined text-lg">person_add</span>
                        </Link>
                    </form>

                    {/* Login link */}
                    <div className="mt-8 pt-8 border-t border-[#e0bfbf] text-center">
                        <p className="text-body-md text-[#584141] mb-2">Already have an account?</p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-[#735c00] text-label-md hover:text-[#570013] transition-colors group"
                        >
                            Sign in to Portal
                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Minimal footer */}
            <footer className="w-full py-6 bg-[#2b271e] text-white mt-auto">
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ffe088] text-xl">church</span>
                        <span className="text-caption opacity-80">© 2024 St. Michael Madende Catholic Parish</span>
                    </div>
                    <div className="flex gap-6 md:gap-8 flex-wrap justify-center">
                        {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(l => (
                            <a key={l} href="#" className="text-caption text-[#cdc6b8] hover:text-[#ffe088] transition-colors">{l}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
