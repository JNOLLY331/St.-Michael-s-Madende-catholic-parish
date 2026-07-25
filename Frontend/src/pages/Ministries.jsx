import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MdAutoStories, MdMail, MdPerson, MdVolunteerActivism, MdMusicNote,
    MdChildCare, MdPeople, MdFamilyRestroom, MdFavorite, MdSchool,
    MdEmojiPeople, MdHandshake, MdLocalHospital, MdPublic, MdGroups,
    MdArrowForward, MdSchedule, MdChurch, MdFilterList,
} from 'react-icons/md';
import { useMinistriesData } from '../hooks/useMinistriesData';

// ── Category registry ────────────────────────────────────────────────────────
const CATEGORIES = [
    { key: 'LITURGICAL', label: 'Liturgical', Icon: MdAutoStories, color: '#ffe088', bg: '#fff0f0' },
    { key: 'CHOIR', label: 'Choir & Music', Icon: MdMusicNote, color: '#ffe088', bg: '#fff0f0' },
    { key: 'YOUTH', label: 'Youth', Icon: MdEmojiPeople, color: '#ffe088', bg: '#fff0f0' },
    { key: 'CHILDREN', label: 'Children', Icon: MdChildCare, color: '#ffe088', bg: '#fff0f0' },
    { key: 'MEN', label: 'Men', Icon: MdPeople, color: '#ffe088', bg: '#fff0f0' },
    { key: 'WOMEN', label: 'Women', Icon: MdFavorite, color: '#ffe088', bg: '#fff0f0' },
    { key: 'FAMILY', label: 'Family', Icon: MdFamilyRestroom, color: '#ffe088', bg: '#fff0f0' },
    { key: 'CHARITY', label: 'Charity', Icon: MdHandshake, color: '#ffe088', bg: '#fff0f0' },
    { key: 'SMALL_COMMUNITIES', label: 'Small Christian Communities', Icon: MdGroups, color: '#ffe088', bg: '#fff0f0' },
    { key: 'EVANGELIZATION', label: 'Evangelization', Icon: MdPublic, color: '#ffe088', bg: '#fff0f0' },
    { key: 'JUSTICE_AND_PEACE', label: 'Justice & Peace', Icon: MdVolunteerActivism, color: '#ffe088', bg: '#fff0f0' },
    { key: 'HEALTH', label: 'Health', Icon: MdLocalHospital, color: '#ffe088', bg: '#fff0f0' },
    { key: 'EDUCATION', label: 'Education', Icon: MdSchool, color: '#ffe088', bg: '#fff0f0' },
    { key: 'GENERAL', label: 'General', Icon: MdPeople, color: '#ffe088', bg: '#fff0f0' },
    { key: 'OTHER', label: 'Other Ministries', Icon: MdPeople, color: '#ffe088', bg: '#fff0f0' },
];

const FALLBACK_IMG = "data:image/svg+xml;charset=UTF-8,%3Csvg width='400' height='260' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23f5ece7' width='400' height='260'/%3E%3Ctext fill='%23e0bfbf' font-family='Georgia,serif' font-size='18' font-weight='bold' x='50%25' y='50%25' text-anchor='middle' dy='0.35em'%3ESt. Michael%3C/text%3E%3C/svg%3E";

// ── Skeleton card ─────────────────────────────────────────────────────────────
function MinistryCardSkeleton() {
    return (
        <div className="bg-white border border-[#e0bfbf] overflow-hidden flex flex-col">
            <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            <div className="p-5 space-y-3 flex-1">
                <div className="h-5 bg-gray-100 animate-pulse w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse w-full" />
                <div className="h-4 bg-gray-100 animate-pulse w-2/3" />
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                        <div className="h-3 bg-gray-100 animate-pulse w-24" />
                        <div className="h-3 bg-gray-100 animate-pulse w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Ministry Card ─────────────────────────────────────────────────────────────
function MinistryCard({ m, catColor, delay = 0 }) {
    const [imgErr, setImgErr] = useState(false);
    const initials = m.leaderName
        ? m.leaderName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
        : '—';

    return (
        <article
            data-reveal-zoom
            data-delay={delay}
            className="group bg-white border border-[#e0bfbf] hover:border-current/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-12px_rgba(87,0,19,0.14)] flex flex-col overflow-hidden"
        >
            {/* Image */}
            <div className="h-44 overflow-hidden relative bg-[#f5ece7] flex-shrink-0">
                <img
                    src={(m.image && !imgErr) ? m.image : FALLBACK_IMG}
                    alt={m.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={() => setImgErr(true)}
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                {/* Category dot indicator */}
                <div
                    className="absolute top-3 right-3 w-3 h-3 rounded-full shadow-md ring-2 ring-white"
                    style={{ background: catColor }}
                />
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-1">
                <h3
                    className="font-serif font-bold text-lg leading-snug mb-2 transition-colors duration-200 group-hover:text-[#570013]"
                    style={{ color: '#2b271e' }}
                >
                    {m.title}
                </h3>
                <p className="text-[#584141] text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                    {m.description}
                </p>

                {/* Meeting schedule */}
                {m.meetingSchedule && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#735c00] mb-4 bg-[#ffe088]/30 px-2.5 py-1.5 border-l-2 border-[#735c00]">
                        <MdSchedule className="text-sm flex-shrink-0" />
                        {m.meetingSchedule}
                    </div>
                )}

                {/* Leader footer */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#e0bfbf] mt-auto">
                    {/* Circular avatar */}
                    <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 text-[#570013] shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${catColor}, ${catColor}cc)` }}
                    >
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#2b271e] text-[13px] truncate">{m.leaderName || 'To Be Announced'}</p>
                        <p className="text-[#8c7071] text-[11px] uppercase tracking-wider font-semibold">Coordinator</p>
                    </div>
                    {m.leaderEmail && (
                        <a
                            href={`mailto:${m.leaderEmail}`}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[#570013] transition-all hover:scale-110 flex-shrink-0 shadow-sm"
                            style={{ background: catColor }}
                            title={`Email ${m.leaderName || 'coordinator'}`}
                        >
                            <MdMail className="text-sm" />
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

// ── Category Section ──────────────────────────────────────────────────────────
function CategorySection({ category, ministries, index }) {
    if (ministries.length === 0) return null;
    const { Icon, color, bg, label } = category;
    const isAlt = index % 2 === 1;

    return (
        <section
            className="py-12 md:py-16 border-b border-[#e0bfbf] last:border-b-0"
            style={{ background: isAlt ? '#f5ece7' : '#ffffff' }}
        >
            <div className="max-w-[1200px] mx-auto px-4 md:px-12 lg:px-16">
                {/* Section header */}
                <div
                    className="flex items-center gap-4 mb-10"
                    data-reveal
                >
                    {/* Circular icon chip */}
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                        style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                    >
                        <Icon className="text-[#570013] text-xl" />
                    </div>

                    <div>
                        <h2
                            className="font-serif font-bold text-xl md:text-2xl uppercase tracking-widest"
                            style={{ color: '#2b271e' }}
                        >
                            {label}
                        </h2>
                        <p className="text-[#8c7071] text-xs font-semibold tracking-wider uppercase mt-0.5">
                            {ministries.length} ministr{ministries.length === 1 ? 'y' : 'ies'}
                        </p>
                    </div>

                    <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
                </div>

                {/* Cards grid */}
                <div className={`grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 ${ministries.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
                    {ministries.map((m, i) => (
                        <MinistryCard
                            key={m.id}
                            m={m}
                            catColor={color}
                            delay={i * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Ministries() {
    const { ministries, loading, error } = useMinistriesData();
    const [activeFilter, setActiveFilter] = useState('ALL');

    // Identify which categories have data
    const catsWithData = CATEGORIES.filter(cat =>
        ministries.some(m => m.category === cat.key)
    );

    // Group
    const grouped = CATEGORIES.reduce((acc, cat) => {
        acc[cat.key] = ministries.filter(m => m.category === cat.key);
        return acc;
    }, {});

    const hasData = ministries.length > 0;

    // For filter bar: ALL + cats that have data
    const filterOptions = ['ALL', ...catsWithData.map(c => c.key)];

    const visibleCats = activeFilter === 'ALL'
        ? catsWithData
        : catsWithData.filter(c => c.key === activeFilter);

    return (
        <>
            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="relative bg-gradient-to-b from-[#570013] to-[#3a000d] text-white overflow-hidden">
                {/* Dot pattern */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,224,136,0.4) 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />
                {/* Glow orb */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#ffe088]/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-16 py-20 md:py-28 text-center">
                    {/* Icon chip */}
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-px h-8 bg-[#ffe088]/40" />
                        <div className="w-12 h-12 rounded-full bg-[#ffe088]/15 border border-[#ffe088]/30 flex items-center justify-center shadow-lg">
                            <MdChurch className="text-[#ffe088] text-2xl" />
                        </div>
                        <div className="w-px h-8 bg-[#ffe088]/40" />
                    </div>

                    <span className="block text-[#ffe088] text-xs font-bold tracking-[0.35em] uppercase mb-4">
                        Called to Serve
                    </span>

                    <h1
                        className="mb-6 text-white"
                        style={{
                            fontFamily: 'EB Garamond, Georgia, serif',
                            fontWeight: 700,
                            fontSize: 'clamp(36px, 6vw, 72px)',
                            lineHeight: 1.1,
                        }}
                    >
                        Parish Ministries
                    </h1>

                    <blockquote className="max-w-2xl mx-auto text-white/75 text-base md:text-lg font-light leading-relaxed italic border-l-2 border-[#ffe088] pl-5 text-left">
                        "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many."
                        <cite className="block text-[#ffe088]/70 text-xs mt-2 not-italic font-bold tracking-wider">— Mark 10:45</cite>
                    </blockquote>

                    {/* Stats strip */}
                    {hasData && !loading && (
                        <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#ffe088]">{ministries.length}</p>
                                <p className="text-white/60 text-xs font-bold tracking-wider uppercase mt-0.5">Active Ministries</p>
                            </div>
                            <div className="w-px h-10 bg-white/20 self-center hidden md:block" />
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#ffe088]">{catsWithData.length}</p>
                                <p className="text-white/60 text-xs font-bold tracking-wider uppercase mt-0.5">Categories</p>
                            </div>
                            <div className="w-px h-10 bg-white/20 self-center hidden md:block" />
                            <div className="text-center">
                                <p className="text-3xl font-black text-[#ffe088]">∞</p>
                                <p className="text-white/60 text-xs font-bold tracking-wider uppercase mt-0.5">Ways to Serve</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom wave shape */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-white"
                    style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
            </section>

            {/* ── Filter Bar ─────────────────────────────────────────────── */}
            {hasData && !loading && (
                <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e0bfbf] shadow-sm">
                    <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-3 flex items-center gap-2 overflow-x-auto">
                        <MdFilterList className="text-[#570013] text-lg flex-shrink-0" />
                        {filterOptions.map(key => {
                            const cat = CATEGORIES.find(c => c.key === key);
                            const isAll = key === 'ALL';
                            const isActive = activeFilter === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveFilter(key)}
                                    className={`px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap flex-shrink-0 transition-all duration-200 rounded-full ${isActive
                                        ? 'text-white shadow-sm'
                                        : 'bg-gray-100 text-[#584141] hover:bg-gray-200'
                                        }`}
                                    style={isActive
                                        ? { background: isAll ? '#570013' : cat?.color || '#570013' }
                                        : {}
                                    }
                                >
                                    {isAll ? 'All' : cat?.label || key}
                                </button>
                            );
                        })}
                        <span className="ml-auto text-[#8c7071] text-xs font-medium whitespace-nowrap flex-shrink-0 pl-2">
                            {visibleCats.reduce((acc, c) => acc + grouped[c.key].length, 0)} ministries
                        </span>
                    </div>
                </div>
            )}

            {/* ── Loading skeleton ────────────────────────────────────────── */}
            {loading && (
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-16">
                    {/* Fake section header */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse flex-shrink-0" />
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-100 animate-pulse" />
                            <div className="h-3 w-20 bg-gray-100 animate-pulse" />
                        </div>
                        <div className="flex-1 h-px bg-gray-100 animate-pulse ml-2" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(n => <MinistryCardSkeleton key={n} />)}
                    </div>
                </div>
            )}

            {/* ── Error ────────────────────────────────────────────────────── */}
            {!loading && error && (
                <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠</span>
                    </div>
                    <p className="text-[#584141] font-semibold">Failed to load ministries. Please try again later.</p>
                </div>
            )}

            {/* ── Empty State ───────────────────────────────────────────────── */}
            {!loading && !error && !hasData && (
                <div className="max-w-[1200px] mx-auto px-4 py-24 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#fff8f5] border-2 border-[#e0bfbf] flex items-center justify-center mx-auto mb-6">
                        <MdVolunteerActivism className="text-3xl text-[#570013]/40" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[#570013] mb-2">Coming Soon</h3>
                    <p className="text-[#584141] max-w-sm mx-auto">
                        Our parish ministries information is being compiled. Please check back soon.
                    </p>
                </div>
            )}

            {/* ── Ministry sections ─────────────────────────────────────────── */}
            {!loading && !error && hasData && visibleCats.map((cat, idx) => (
                <CategorySection
                    key={cat.key}
                    category={cat}
                    ministries={grouped[cat.key]}
                    index={idx}
                />
            ))}

            {/* Filter no-results */}
            {!loading && !error && hasData && visibleCats.length === 0 && (
                <div className="py-20 text-center">
                    <p className="text-[#584141] font-semibold">No ministries found for that category.</p>
                    <button onClick={() => setActiveFilter('ALL')} className="mt-3 text-[#570013] text-sm font-bold hover:underline">Show all</button>
                </div>
            )}

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="relative bg-[#570013] text-white py-16 md:py-24 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,224,136,0.4) 1px, transparent 0)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#ffe088]/8 pointer-events-none blur-3xl" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-16 text-center" data-reveal-zoom>
                    {/* Circular icon */}
                    <div className="w-16 h-16 rounded-full bg-[#ffe088]/15 border border-[#ffe088]/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <MdVolunteerActivism className="text-[#ffe088] text-2xl" />
                    </div>

                    <h2
                        className="text-[#ffe088] mb-4"
                        style={{
                            fontFamily: 'EB Garamond, Georgia, serif',
                            fontWeight: 700,
                            fontSize: 'clamp(26px, 4vw, 48px)',
                        }}
                    >
                        Called to Serve?
                    </h2>
                    <p className="text-white/75 max-w-2xl mx-auto mb-10 text-base md:text-lg leading-relaxed font-light">
                        Every parishioner is invited to share their unique talents and time.
                        Join a ministry today and help us grow our vibrant community of faith.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-[#ffe088] text-[#570013] px-8 md:px-10 py-3.5 md:py-4 font-bold text-sm md:text-base hover:bg-[#ffd060] transition-colors shadow-lg"
                        >
                            Register to Volunteer
                            <MdArrowForward />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 border-2 border-[#ffe088]/60 text-[#ffe088] px-8 md:px-10 py-3.5 md:py-4 font-bold text-sm md:text-base hover:bg-[#ffe088]/10 transition-colors"
                        >
                            Inquiry Form
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
