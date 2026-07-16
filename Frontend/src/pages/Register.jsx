import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowForward, MdCheckCircle, MdChurch, MdDiamond, MdLock, MdMail, MdPerson, MdPersonAdd, MdPhone, MdWarning } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';
import toast from 'react-hot-toast';
// ── Integration: useAuth provides the register() helper ──────────────────────
import { useAuth } from '../context/AuthContext';


export default function Register() {
    const navigate = useNavigate();

    // ── Integration: destructure register helper and shared auth state ────────
    const { register, authLoading, authError, clearAuthError } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState(false);
    // Local success state — shown after successful registration
    const [successMessage, setSuccessMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    // ── Controlled form state matching the Django RegisterSerializer fields ────
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        password: '',
        password2: '',
    });

    const handleChange = (e) => {
        clearAuthError();
        setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ── Client-side validation ────────────────────────────────────────────────
    const validate = () => {
        const errors = {};
        if (!formData.first_name.trim()) errors.first_name = 'First name is required.';
        if (!formData.last_name.trim()) errors.last_name = 'Last name is required.';
        if (!formData.username.trim()) errors.username = 'Username is required.';
        if (!formData.email.trim()) errors.email = 'Email is required.';
        if (!formData.password) errors.password = 'Password is required.';
        if (formData.password !== formData.password2) errors.password2 = 'Passwords do not match.';
        return errors;
    };

    // ── Integration: handleSubmit calls the real Django register endpoint ──────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        const errors = validate();
        if (Object.keys(errors).length) {
            setFieldErrors(errors);
            toast.error('❌ Please fix the highlighted fields before continuing.', { duration: 4000 });
            return;
        }

        const payload = {
            first_name: formData.first_name.trim(),
            last_name: formData.last_name.trim(),
            username: formData.username.trim(),
            email: formData.email.trim().toLowerCase(),
            phone_number: formData.phone_number.trim(),
            password: formData.password,
            password2: formData.password2,
        };

        const toastId = toast.loading('✍️ Creating your account…');

        const result = await register(payload);

        if (result.success) {
            const msg = result.message || 'Registration successful! You can now log in.';
            setSuccessMessage(msg);
            toast.success(`🎉 Account created! Redirecting to login…`, { id: toastId, duration: 3000 });
            // Redirect to login after a short delay
            setTimeout(() => navigate('/login'), 2500);
        } else {
            // Map DRF field-level errors back to the form inputs
            if (result.fieldErrors && typeof result.fieldErrors === 'object') {
                const serverFieldErrors = {};
                Object.entries(result.fieldErrors).forEach(([field, msgs]) => {
                    if (Array.isArray(msgs) && msgs.length > 0) {
                        serverFieldErrors[field] = msgs[0];
                    }
                });
                if (Object.keys(serverFieldErrors).length > 0) {
                    setFieldErrors(serverFieldErrors);
                }
            }
            toast.error(`🚫 ${result.message || 'Registration failed. Please try again.'}`, { id: toastId, duration: 5000 });
        }
        // If registration failed, authError will be populated by AuthContext
    };

    return (
        <div className="bg-[#fff8f5] text-[#1e1b18] min-h-screen flex flex-col font-sans">
            {/* Simple brand header */}
            <header className="w-full sticky top-0 bg-[#fff8f5] z-50 border-b border-[#e0bfbf] shadow-sm px-5 md:px-16 py-4 flex justify-between md:justify-center items-center">
                <Link to="/" className="flex items-center gap-2 cursor-pointer">
                    <MdChurch className="text-[#570013] text-3xl" />
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
                            <MdDiamond className="text-[#735c00] text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#e0bfbf]" />
                        </div>
                    </div>

                    {/* ── Integration: success banner shown after successful registration ── */}
                    {successMessage && (
                        <div className="mb-4 flex items-start gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm">
                            <MdCheckCircle className="shrink-0 text-xl text-green-600 mt-0.5" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    {/* ── Integration: server error banner ─────────────────────────────── */}
                    {authError && !successMessage && (
                        <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                            <MdWarning className="shrink-0 text-lg" />
                            <span>{authError}</span>
                        </div>
                    )}

                    {/* ── Integration: controlled form hitting the real API on submit ────── */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label className="block text-label-md text-[#584141] mb-1" htmlFor="first-name">First Name</label>
                                <div className="relative">
                                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                    <input
                                        id="first-name"
                                        name="first_name"
                                        type="text"
                                        placeholder="John"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md ${fieldErrors.first_name ? 'border-red-400' : 'border-[#e0bfbf]'}`}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                    />
                                </div>
                                {fieldErrors.first_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.first_name}</p>}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-label-md text-[#584141] mb-1" htmlFor="last-name">Last Name</label>
                                <div className="relative">
                                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                    <input
                                        id="last-name"
                                        name="last_name"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md ${fieldErrors.last_name ? 'border-red-400' : 'border-[#e0bfbf]'}`}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                    />
                                </div>
                                {fieldErrors.last_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.last_name}</p>}
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-username">Username</label>
                            <div className="relative">
                                <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="reg-username"
                                    name="username"
                                    type="text"
                                    placeholder="john.doe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md ${fieldErrors.username ? 'border-red-400' : 'border-[#e0bfbf]'}`}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </div>
                            {fieldErrors.username && <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-email">Email Address</label>
                            <div className="relative">
                                <MdMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="reg-email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    className={`w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md ${fieldErrors.email ? 'border-red-400' : 'border-[#e0bfbf]'}`}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </div>
                            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-phone">Phone Number <span className="opacity-60">(optional)</span></label>
                            <div className="relative">
                                <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="reg-phone"
                                    name="phone_number"
                                    type="tel"
                                    placeholder="+254 700 000 000"
                                    value={formData.phone_number}
                                    onChange={handleChange}
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
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="reg-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    className={`w-full pl-10 pr-10 py-3 bg-[#fbf2ed] border rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md ${fieldErrors.password ? 'border-red-400' : 'border-[#e0bfbf]'}`}
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
                            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-label-md text-[#584141] mb-1" htmlFor="reg-password2">Confirm Password</label>
                            <div className="relative">
                                <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#584141] opacity-60" />
                                <input
                                    id="reg-password2"
                                    name="password2"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Repeat your password"
                                    value={formData.password2}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    className={`w-full pl-10 pr-4 py-3 bg-[#fbf2ed] border rounded-lg focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all text-body-md ${fieldErrors.password2 ? 'border-red-400' : 'border-[#e0bfbf]'}`}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                />
                            </div>
                            {fieldErrors.password2 && <p className="text-red-500 text-xs mt-1">{fieldErrors.password2}</p>}
                        </div>

                        {/* Agree to terms */}
                        <div className="flex items-start gap-2 py-2">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="w-4 h-4 mt-1 text-[#570013] bg-[#fbf2ed] border-[#e0bfbf] rounded focus:ring-[#570013]"
                            />
                            <label htmlFor="terms" className="text-caption text-[#584141] cursor-pointer leading-tight">
                                I agree to the <a href="#" className="text-[#570013] hover:underline">Privacy Policy</a> and <a href="#" className="text-[#570013] hover:underline">Terms of Service</a>, and consent to receiving parish communications.
                            </label>
                        </div>

                        {/* ── Integration: real submit button ──────────────────────────────── */}
                        <button
                            type="submit"
                            disabled={authLoading || !!successMessage}
                            className="w-full mt-4 py-4 bg-[#800020] text-white text-label-md rounded-full shadow-lg hover:bg-[#570013] transition-all active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {authLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Creating account…
                                </span>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <MdPersonAdd className="text-lg" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login link */}
                    <div className="mt-8 pt-8 border-t border-[#e0bfbf] text-center">
                        <p className="text-body-md text-[#584141] mb-2">Already have an account?</p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-[#735c00] text-label-md hover:text-[#570013] transition-colors group"
                        >
                            Sign in to Portal
                            <MdArrowForward className="text-lg group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </main>

            {/* Minimal footer */}
            <footer className="w-full py-6 bg-[#2b271e] text-white mt-auto">
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <MdChurch className="text-[#ffe088] text-xl" />
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
