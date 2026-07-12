import React, { useState } from 'react';
import { MdVolunteerActivism, MdSecurity, MdArrowForward, MdFavorite, MdWarning } from 'react-icons/md';
// ── Integration: hooks for campaigns and submitting donations ───────────────
import { useCampaignsData } from '../hooks/useCampaignsData';
import { donationsApi } from '../api';
import { useAuth } from '../context/AuthContext';


export default function Donate() {
    const { isAuthenticated } = useAuth();
    const { campaigns, loading } = useCampaignsData();

    // ── Form State ──────────────────────────────────────────────────────────
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [frequency, setFrequency] = useState('one-time');
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [message, setMessage] = useState('');

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const finalAmount = amount === 'custom' ? customAmount : amount;

    // ── Integration: Form Submission to real backend ────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setSuccessMessage('');

        if (!finalAmount || isNaN(finalAmount) || Number(finalAmount) <= 0) {
            setSubmitError('Please enter a valid donation amount.');
            return;
        }

        if (!isAuthenticated && !anonymous) {
            // Force anonymous if not logged in, or ask them to login. We'll set anonymous.
            // But the backend might require Auth unless anonymity is allowed. 
            // In many church setups, anyone can donate.
        }

        setSubmitting(true);
        try {
            const payload = {
                amount: parseFloat(finalAmount),
                payment_method: 'MPESA', // Default placeholder for now until payment gateway is added
                category: frequency === 'monthly' ? 'Tithe' : 'Offering', // Mapping frequency to category roughly
                anonymous: anonymous || !isAuthenticated, 
                message: message.trim(),
            };

            if (selectedCampaign) {
                payload.campaign = selectedCampaign;
            }

            // Submits to POST /api/donations/
            await donationsApi.submit(payload);

            setSuccessMessage(`Thank you for your generous gift of KES ${finalAmount}! Your donation helps us continue our mission.`);
            
            // Reset form
            setAmount('');
            setCustomAmount('');
            setSelectedCampaign('');
            setMessage('');
            setAnonymous(false);
            
            // Scroll to the top of the form
            window.scrollTo({ top: 300, behavior: 'smooth' });

        } catch (err) {
            setSubmitError(err.message || 'Failed to process your donation. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="py-20 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <div data-reveal>
                    <div className="w-16 h-16 bg-[#ffdada] text-[#570013] rounded-full flex items-center justify-center mx-auto mb-6">
                        <MdVolunteerActivism className="text-3xl" />
                    </div>
                    <h1 className="text-display-lg text-[#570013] mb-4">Support Our Mission</h1>
                    <p className="text-body-lg text-[#584141] max-w-2xl mx-auto italic">
                        "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
                    </p>
                </div>
            </section>

            <div className="max-w-[1200px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                {/* ── Left Column: Donation Form ────────────────────────────────────────── */}
                <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#e0bfbf] shadow-lg">

                    {/* Feedback Messages */}
                    {submitError && (
                        <div className="mb-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                            <MdWarning className="shrink-0 text-lg" />
                            <span>{submitError}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-6 flex items-start gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-4 text-sm font-medium shadow-sm">
                            <MdFavorite className="shrink-0 text-xl text-green-600 mt-0.5" />
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Giving Type */}
                        <div className="mb-8">
                            <h3 className="text-headline-md text-[#2b271e] mb-4">1. Choose Giving Type</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${frequency === 'one-time' ? 'border-[#570013] bg-[#fff8f5] shadow-sm' : 'border-[#e0bfbf] hover:bg-[#fbf2ed]'}`}>
                                    <input type="radio" name="frequency" value="one-time" className="hidden" checked={frequency === 'one-time'} onChange={(e) => setFrequency(e.target.value)} />
                                    <span className={`font-bold ${frequency === 'one-time' ? 'text-[#570013]' : 'text-[#413d33]'}`}>One-Time Gift</span>
                                </label>
                                <label className={`border rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${frequency === 'monthly' ? 'border-[#570013] bg-[#fff8f5] shadow-sm' : 'border-[#e0bfbf] hover:bg-[#fbf2ed]'}`}>
                                    <input type="radio" name="frequency" value="monthly" className="hidden" checked={frequency === 'monthly'} onChange={(e) => setFrequency(e.target.value)} />
                                    <span className={`font-bold ${frequency === 'monthly' ? 'text-[#570013]' : 'text-[#413d33]'}`}>Monthly Tithe</span>
                                </label>
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="mb-8 border-t border-[#e0bfbf] pt-8">
                            <h3 className="text-headline-md text-[#2b271e] mb-4">2. Select Amount</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                {['1000', '2500', '5000', '10000'].map(val => (
                                    <button
                                        key={val}
                                        type="button"
                                        onClick={() => setAmount(val)}
                                        className={`py-3 rounded-lg border font-bold transition-colors ${amount === val ? 'bg-[#570013] border-[#570013] text-white' : 'border-[#e0bfbf] text-[#413d33] hover:border-[#570013] hover:text-[#570013]'}`}
                                    >
                                        KES {Number(val).toLocaleString()}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#584141] font-bold">KES</span>
                                <input
                                    type="number"
                                    min="100"
                                    placeholder="Enter custom amount"
                                    value={amount === 'custom' ? customAmount : (['1000', '2500', '5000', '10000'].includes(amount) ? amount : customAmount)}
                                    onChange={(e) => {
                                        setAmount('custom');
                                        setCustomAmount(e.target.value);
                                    }}
                                    className={`w-full bg-[#fbf2ed] border p-4 pl-14 rounded-xl focus:outline-none focus:ring-1 transition-all ${amount === 'custom' || (!['1000', '2500', '5000', '10000'].includes(amount) && amount !== '') ? 'border-[#570013] ring-[#570013]' : 'border-[#e0bfbf]'}`}
                                />
                            </div>
                        </div>

                        {/* Designation (Campaigns) */}
                        <div className="mb-8 border-t border-[#e0bfbf] pt-8">
                            <h3 className="text-headline-md text-[#2b271e] mb-4">3. Designate Your Gift</h3>
                            {loading ? (
                                <div className="h-14 bg-gray-200 animate-pulse rounded-xl" />
                            ) : (
                                <select
                                    value={selectedCampaign}
                                    onChange={(e) => setSelectedCampaign(e.target.value)}
                                    className="w-full bg-white border border-[#e0bfbf] p-4 rounded-xl focus:outline-none focus:border-[#570013] text-body-md"
                                >
                                    <option value="">General Parish Needs</option>
                                    {campaigns.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                            )}

                            <div className="mt-4">
                                <textarea
                                    className="w-full bg-[#fbf2ed] border border-[#e0bfbf] p-4 rounded-xl focus:outline-none focus:border-[#570013] resize-none text-body-md"
                                    rows="2"
                                    placeholder="Add an optional prayer request or message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    id="anonymous"
                                    type="checkbox"
                                    checked={anonymous}
                                    onChange={(e) => setAnonymous(e.target.checked)}
                                    className="w-4 h-4 text-[#570013] bg-white border-[#e0bfbf] rounded focus:ring-0"
                                />
                                <label htmlFor="anonymous" className="text-body-md text-[#584141] cursor-pointer">
                                    Make this gift anonymously
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-[#800020] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#570013] transition-all duration-300 disabled:opacity-60 shadow-lg"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                <>
                                    Complete Donation <MdArrowForward className="text-xl" />
                                </>
                            )}
                        </button>

                        <div className="mt-4 flex items-center justify-center gap-2 text-caption text-[#584141]">
                            <MdSecurity className="text-[#413d33]" />
                            <span>Secure, encrypted transaction</span>
                        </div>
                    </form>
                </div>

                {/* ── Right Column: Info & Active Campaigns ────────────────────────AAAAAA */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#570013] text-white p-8 rounded-2xl shadow-md bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]">
                        <h3 className="font-serif text-2xl mb-4 text-[#ffdada]">Why Your Gift Matters</h3>
                        <p className="opacity-90 leading-relaxed mb-6">
                            Your generous contributions are the lifeblood of St. Michael Madende. They fund our community outreach, maintain our sanctuary, and support the clergy who serve us.
                        </p>
                        <ul className="space-y-3 opacity-90 mb-0">
                            <li className="flex items-center gap-2"><MdFavorite className="text-[#ffe088]" /> Supporting local poor & vulnerable</li>
                            <li className="flex items-center gap-2"><MdFavorite className="text-[#ffe088]" /> Youth programs and education</li>
                            <li className="flex items-center gap-2"><MdFavorite className="text-[#ffe088]" /> Church maintenance and utilities</li>
                        </ul>
                    </div>

                    {/* Active Campaigns List */}
                    <div className="bg-[#fbf2ed] p-8 rounded-2xl border border-[#e0bfbf]">
                        <h3 className="text-headline-md text-[#2b271e] mb-6">Active Appeals</h3>
                        
                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-20 bg-gray-200 animate-pulse rounded-lg" />
                                <div className="h-20 bg-gray-200 animate-pulse rounded-lg" />
                            </div>
                        ) : campaigns.length > 0 ? (
                            <div className="space-y-5">
                                {campaigns.map(c => (
                                    <div key={c.id} className="border-b border-[#e0bfbf] pb-5 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-end mb-2">
                                            <h4 className="font-bold text-[#570013]">{c.title}</h4>
                                            <span className="text-caption font-bold bg-[#fed65b] text-[#745c00] px-2 py-0.5 rounded">{c.progress}%</span>
                                        </div>
                                        <div className="w-full bg-[#e0bfbf] rounded-full h-1.5 mb-2 overflow-hidden">
                                            <div className="bg-[#570013] h-1.5 rounded-full" style={{ width: `${c.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#584141]">
                                            <span>Raised: KES {c.amountRaised?.toLocaleString()}</span>
                                            <span>Goal: KES {c.targetAmount?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-body-md text-[#584141]">No active appeals at this time. Standard offerings go to the general parish fund.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
