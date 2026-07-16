import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdChurch } from 'react-icons/md';
import DynamicIcon from './DynamicIcon';



const socialLinks = [
    { icon: 'fa-facebook-f', href: '#', label: 'Facebook', hoverBg: '#1877F2', emoji: '👍' },
    { icon: 'fa-youtube', href: '#', label: 'YouTube', hoverBg: '#FF0000', emoji: '▶️' },
    { icon: 'fa-whatsapp', href: '#', label: 'WhatsApp', hoverBg: '#25D366', emoji: '💬' },
    { icon: 'fa-instagram', href: '#', label: 'Instagram', hoverBg: '#C13584', emoji: '📸' },
    { icon: 'fa-x-twitter', href: '#', label: 'X/Twitter', hoverBg: '#000000', emoji: '🐦' },
    { icon: 'fa-telegram', href: '#', label: 'Telegram', hoverBg: '#229ED9', emoji: '✈️' },
];

const quickLinks = [
    { label: 'Mass Times', to: '/mass-schedule' },
    { label: 'Sacraments', to: '/sacraments' },
    { label: 'Ministries', to: '/ministries' },
    { label: 'Events', to: '/events' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Donate', to: '/donate' },
    { label: 'Member Portal', to: '/login' },
];

const massTimes = [
    { day: 'Monday – Friday', time: '6:30 AM' },
    { day: 'Saturday', time: '7:00 AM' },
    { day: 'Sunday (1st)', time: '7:30 AM' },
    { day: 'Sunday (2nd)', time: '9:30 AM' },
    { day: 'Sunday (3rd)', time: '11:30 AM' },
    { day: 'Confession', time: 'Sat 4:00 PM' },
    { day: 'Adoration', time: 'Fri 5:00 PM' },
];

export default function Footer() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [subStatus, setSubStatus] = useState('');
    const [hoveredSocial, setHoveredSocial] = useState(null);

    const handleNav = (to) => {
        navigate(to);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubStatus('✅ Thank you! You have been subscribed.');
        setEmail('');
        setTimeout(() => setSubStatus(''), 4000);
    };

    return (
        <footer style={{ background: 'var(--footer-bg)', color: 'white' }} className="w-full">

            {/* Animated glow top border */}
            <div className="footer-glow-bar" />

            {/* Main Footer */}
            <div className="w-full px-5 md:px-12 py-16">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* ── Brand Column ── */}
                    <div className="lg:col-span-1 space-y-5" data-reveal-left>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-14 h-14 rounded-full bg-[#ffe088] flex items-center justify-center shadow-xl hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-pointer footer-float-icon">
                                <MdChurch className="text-[#570013] text-2xl" />
                            </div>
                            <div>
                                <h2 className="footer-heading font-oswald font-bold text-xl text-[#ffe088] leading-tight cursor-default">
                                    ST. MICHAEL MADENDE
                                </h2>
                                <span className="text-[10px] font-oswald tracking-[0.2em] uppercase" style={{ color: 'var(--footer-text)' }}>
                                    Catholic Parish
                                </span>
                            </div>
                        </div>

                        <p className="text-sm leading-relaxed" style={{ color: 'var(--footer-text)' }}>
                            A Roman Catholic Parish dedicated to the spiritual growth of all through
                            liturgy, service, and community. Rooted in faith since 1960.
                        </p>

                        <div className="space-y-2 text-sm">
                            {[
                                { icon: 'location_on', text: '123 Parish Road, Madende\nP.O. Box 456' },
                                { icon: 'phone', text: '(123) 456-7890' },
                                { icon: 'mail', text: 'info@stmichaelmadende.org' },
                                { icon: 'schedule', text: 'Office: Mon–Fri, 9AM–4PM' },
                            ].map(({ icon, text }) => (
                                <div key={icon} className="footer-card flex items-start gap-2 cursor-default">
                                    <DynamicIcon name={icon} className="text-[#ffe088] text-base mt-0.5 footer-float-icon" />
                                    <span style={{ color: 'var(--footer-text)' }} className="whitespace-pre-line">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div className="space-y-4" data-reveal data-delay="150">
                        <h3 className="footer-heading font-oswald font-bold text-base uppercase tracking-[0.25em] text-[#ffe088] pb-2 border-b cursor-default"
                            style={{ borderColor: 'var(--footer-border)' }}>
                            Quick Links
                        </h3>
                        <nav className="grid grid-cols-2 gap-x-4 gap-y-1">
                            {quickLinks.map(({ label, to }, i) => (
                                <button
                                    key={label}
                                    onClick={() => handleNav(to)}
                                    className="footer-link text-left text-sm font-oswald tracking-wide"
                                    style={{ transitionDelay: `${i * 30}ms` }}
                                >
                                    <span className="text-[#ffe088] opacity-60 transition-opacity group-hover:opacity-100">›</span>
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* ── Mass Times ── */}
                    <div className="space-y-4" data-reveal data-delay="250">
                        <h3 className="footer-heading font-oswald font-bold text-base uppercase tracking-[0.25em] text-[#ffe088] pb-2 border-b cursor-default"
                            style={{ borderColor: 'var(--footer-border)' }}>
                            Mass Times
                        </h3>
                        <div className="space-y-1 text-sm">
                            {massTimes.map(({ day, time }) => (
                                <div key={day} className="mass-time-row flex justify-between items-center cursor-default">
                                    <span className="font-oswald" style={{ color: 'var(--footer-text)' }}>{day}</span>
                                    <span className="text-[#ffe088] font-oswald font-bold bg-[#ffe088]/10 px-2 py-0.5 rounded-full text-xs whitespace-nowrap ml-2">
                                        {time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Newsletter + Social ── */}
                    <div className="space-y-7" data-reveal-right data-delay="100">
                        <div>
                            <h3 className="footer-heading font-oswald font-bold text-base uppercase tracking-[0.25em] text-[#ffe088] pb-2 border-b mb-4 cursor-default"
                                style={{ borderColor: 'var(--footer-border)' }}>
                                Newsletter
                            </h3>
                            <p className="text-sm mb-3" style={{ color: 'var(--footer-text)' }}>
                                Subscribe to receive weekly updates and reflections from our Parish Priest.
                            </p>
                            <form onSubmit={handleSubscribe} className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="newsletter-input px-4 py-2 flex-1 text-sm"
                                />
                                <button
                                    type="submit"
                                    className="btn-primary bg-[#ffe088] text-[#40000b] px-4 py-2 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-[#feed9a] whitespace-nowrap"
                                >
                                    Join
                                </button>
                            </form>
                            {subStatus && (
                                <p className="text-green-400 text-xs mt-2 font-oswald animate-fade-in-up">{subStatus}</p>
                            )}
                        </div>

                        {/* Social Icons */}
                        <div>
                            <h3 className="footer-heading font-oswald font-bold text-base uppercase tracking-[0.25em] text-[#ffe088] pb-2 border-b mb-4 cursor-default"
                                style={{ borderColor: 'var(--footer-border)' }}>
                                Follow Us
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map(({ icon, href, label, hoverBg, emoji }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        title={label}
                                        onMouseEnter={() => setHoveredSocial(label)}
                                        onMouseLeave={() => setHoveredSocial(null)}
                                        className="social-icon w-11 h-11 rounded-full border flex items-center justify-center text-white/70 hover:text-white"
                                        style={{
                                            background: hoveredSocial === label ? hoverBg : 'rgba(255,255,255,0.08)',
                                            borderColor: hoveredSocial === label ? hoverBg : 'rgba(255,255,255,0.2)',
                                            boxShadow: hoveredSocial === label ? `0 8px 25px ${hoverBg}55` : 'none',
                                        }}
                                    >
                                        <i className={`fa-brands ${icon} text-sm`} />
                                    </a>
                                ))}
                            </div>
                            {/* Hovered social label */}
                            <p className="text-xs font-oswald tracking-widest mt-2 h-4 transition-all"
                                style={{ color: 'var(--accent-gold)', opacity: hoveredSocial ? 1 : 0 }}>
                                {hoveredSocial ? `Follow us on ${hoveredSocial}` : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="footer-glow-bar" style={{ opacity: 0.3 }} />

            {/* Bottom Bar */}
            <div className="px-5 md:px-12 py-5">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-oswald tracking-wide text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        Designed and developed by:<span className='text-red-800 text-lg tracking-wide'><a href="">Jnolly IT solutions</a> </span>
                        </p>
                    <p className="font-oswald tracking-wide text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        © {new Date().getFullYear()} St. Michael Madende Catholic Parish. All Rights Reserved.
                    </p>
                    <div className="flex gap-5 text-sm">
                        {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
                            <a key={item} href="#" className="bottom-link">
                                {item}
                            </a>
                        ))}
                    </div>
                    <p className="font-oswald text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Made with <span className="text-red-400">❤️</span> for the Glory of God
                    </p>
                </div>
            </div>
        </footer>
    );
}
