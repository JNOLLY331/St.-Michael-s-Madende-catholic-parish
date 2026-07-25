import React from 'react';
import { Link } from 'react-router-dom';
import {
    MdArrowForward, MdBackHand, MdLocalFireDepartment,
    MdOpacity, MdSpa, MdStar, MdWaterDrop,
    MdFavorite, MdAutorenew, MdChurch
} from 'react-icons/md';
import { useSacramentsData } from '../hooks/useSacramentsData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

export default function Sacraments() {
    const { sacraments, loading, error } = useSacramentsData();

    // Mapping icons to sacrament names + giving them subtle gradients
    const getIcon = (name) => {
        const lower = (name || '').toLowerCase();
        let IconElement = MdStar;
        if (lower.includes('baptism')) IconElement = MdWaterDrop;
        if (lower.includes('confirm')) IconElement = MdLocalFireDepartment;
        if (lower.includes('eucharist') || lower.includes('communion')) IconElement = MdFavorite;
        if (lower.includes('reconcil') || lower.includes('penance')) IconElement = MdSpa;
        if (lower.includes('order')) IconElement = MdBackHand;
        if (lower.includes('sick') || lower.includes('anoint')) IconElement = MdOpacity;
        if (lower.includes('matrimon') || lower.includes('marriage')) IconElement = MdAutorenew;

        return (
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border border-[#ffe088]/30 mb-5"
                style={{ background: 'linear-gradient(135deg, #735c00, #b48e00)' }}>
                <IconElement className="text-white text-3xl" />
            </div>
        );
    };

    return (
        <div className="bg-[#fff8f5] mix-blend-multiply">
            {/* ── Hero Section ── */}
            <section className="relative flex items-center justify-center overflow-hidden mb-12 md:mb-20 max-w-[1200px] mx-auto px-4 md:px-5"
                style={{ height: 'clamp(300px, 45vw, 550px)', marginTop: '1rem' }}>
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR5pf7TReMMBZXHGe0GKHnogXAJd-R5U5okO05Y0m47zDfIQXAo2J_dA0HoxEz9t4xLCu1EucxwWwdvW9aSaRVYDwKDsMh304ZkTNwz7QP9L4A5vhikxjGu6o1DHdqL_Znda1Azr0ai9kbmae3t2L1IkvvC6-VQgJwX8bzESls5DsbevIscrMiL9iok8MNJzuzF4anEnPSafEwcVNZbjHpTOojWDAqH4Xgu1PvKU-URaIwge_JxXa84ixsVQmnkn_qeSOXnCRg0B85')`,
                            filter: 'brightness(0.6)',
                        }}
                    />
                    {/* Deep crimson / maroon gradient overlay */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(87,0,19,0.8), rgba(87,0,19,0.3) 70%)' }} />
                </div>

                <div className="relative z-10 text-center px-4 max-w-3xl" data-reveal-zoom>
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-[#ffe088]/40" />
                        <div className="w-10 h-10 rounded-full border border-[#ffe088]/30 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                            <MdChurch className="text-[#ffe088] text-xl" />
                        </div>
                        <div className="w-8 h-px bg-[#ffe088]/40" />
                    </div>

                    <span className="block text-[#ffe088] text-xs md:text-sm font-bold tracking-[0.35em] uppercase mb-4">
                        Seven Sacred Rites
                    </span>
                    <h1 className="text-white mb-6" style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1 }}>
                        The Holy Sacraments
                    </h1>
                    <p className="text-[#ffe088]/90 max-w-xl mx-auto italic font-light text-lg md:text-xl border-l-2 border-[#ffe088]/50 pl-5 text-left">
                        "Visible signs of invisible grace, instituted by Christ for our sanctification."
                    </p>
                </div>
            </section>

            {/* ── Intro ── */}
            <div className="text-center mb-12 lg:mb-20 max-w-3xl mx-auto px-4 md:px-16" data-reveal>
                <h2 className="text-[#570013] mb-6 font-bold" style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: 'clamp(28px, 4vw, 42px)' }}>
                    Sacred Channels of Grace
                </h2>
                <p className="text-[#584141] md:text-lg leading-relaxed font-light">
                    The Catholic Church celebrates seven sacraments, which were instituted by Christ to share His divine life with us. Through these sacred rites, we are nourished, healed, and strengthened in our journey of faith.
                </p>

                {/* Decorative Accent */}
                <div className="mt-10 flex items-center justify-center gap-3">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#735c00]" />
                    <div className="w-2 h-2 rotate-45 bg-[#ffe088]" />
                    <div className="w-2 h-2 rotate-45 bg-[#570013]" />
                    <div className="w-2 h-2 rotate-45 bg-[#ffe088]" />
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#735c00]" />
                </div>
            </div>

            {/* ── Grid ── */}
            <section className="max-w-[1200px] mx-auto px-4 md:px-12 lg:px-16 mb-20">
                {loading && <Spinner message="Loading the Holy Sacraments..." />}

                {!loading && error && (
                    <div className="text-center bg-red-50 text-red-700 py-10 px-4 border border-red-200">
                        <p className="font-bold">⚠ Could not load sacraments. Please try again later.</p>
                    </div>
                )}

                {!loading && !error && sacraments.length === 0 && (
                    <EmptyState
                        title="Sacraments Coming Soon"
                        message="We are updating our sacramental preparation guidelines."
                        icon={MdStar}
                    />
                )}

                {!loading && !error && sacraments.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
                        {sacraments.map((sacrament, index) => {
                            const isLarge = sacrament.image && (index % 5 === 0 || index % 5 === 3);

                            if (isLarge) {
                                return (
                                    <div key={sacrament.id}
                                        className="lg:col-span-12 group relative overflow-hidden bg-white border border-[#e0bfbf] transition-all hover:shadow-[0_20px_50px_-12px_rgba(87,0,19,0.15)] hover:-translate-y-1"
                                        data-reveal-zoom data-delay={(index % 4) * 100}>
                                        <div className="grid lg:grid-cols-2 h-full">
                                            <div className={`h-64 lg:h-auto relative overflow-hidden ${index % 2 !== 0 ? 'order-1 lg:order-2' : ''}`}>
                                                <img
                                                    src={sacrament.image}
                                                    alt={sacrament.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#570013]/60 to-transparent lg:hidden" />
                                            </div>
                                            <div className={`p-8 lg:p-14 flex flex-col justify-center ${index % 2 !== 0 ? 'order-2 lg:order-1' : ''}`}>
                                                {sacrament.category && (
                                                    <span className="inline-block px-3 py-1 bg-[#fff0f0] text-[#570013] text-[10px] font-black tracking-[0.2em] uppercase w-fit mb-4 border border-[#e0bfbf]">
                                                        {sacrament.category}
                                                    </span>
                                                )}
                                                <h3 className="text-[#570013] mb-4 font-bold" style={{ fontFamily: 'EB Garamond, serif', fontSize: 'clamp(24px, 3vw, 36px)' }}>
                                                    {sacrament.name}
                                                </h3>
                                                <p className="text-[#584141] mb-6 leading-relaxed flex-1 text-base md:text-lg opacity-90">{sacrament.description}</p>

                                                {sacrament.scheduleInfo && (
                                                    <div className="bg-[#fff8f5] p-5 mb-8 border-l-4 border-[#ffe088]">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#570013] mb-1.5 opacity-70">Schedule</p>
                                                        <p className="text-[#584141] font-medium whitespace-pre-wrap text-sm leading-relaxed">{sacrament.scheduleInfo}</p>
                                                    </div>
                                                )}

                                                <div className="mt-auto">
                                                    <Link to="/contact"
                                                        className="inline-flex items-center gap-3 bg-[#570013] text-[#ffe088] px-8 py-3.5 text-sm font-bold uppercase tracking-widest hover:bg-[#ffe088] hover:text-[#570013] transition-colors">
                                                        Inquire / Register
                                                        <MdArrowForward className="text-lg" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Normal Card
                            return (
                                <div key={sacrament.id}
                                    className="lg:col-span-4 group relative overflow-hidden bg-white border border-[#e0bfbf] p-8 flex flex-col hover:shadow-[0_20px_50px_-12px_rgba(87,0,19,0.15)] hoverborder-[#570013] transition-all hover:-translate-y-1"
                                    data-reveal-zoom data-delay={(index % 4) * 100}>

                                    {!sacrament.image && getIcon(sacrament.name)}

                                    {sacrament.image && (
                                        <div className="h-48 mb-6 overflow-hidden -mx-8 -mt-8 relative">
                                            <img
                                                src={sacrament.image}
                                                alt={sacrament.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        </div>
                                    )}

                                    {sacrament.category && (
                                        <span className="text-[#735c00] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase block">
                                            {sacrament.category}
                                        </span>
                                    )}

                                    <h3 className="text-[#570013] mb-3 font-bold line-clamp-1" style={{ fontFamily: 'EB Garamond, serif', fontSize: '24px' }}>
                                        {sacrament.name}
                                    </h3>

                                    <p className="text-[#584141] mb-5 font-light leading-relaxed flex-grow line-clamp-4">
                                        {sacrament.description}
                                    </p>

                                    {sacrament.scheduleInfo && (
                                        <div className="bg-[#fff8f5] p-4 mt-auto mb-5 border-l-2 border-[#ffe088]">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#570013] mb-1 opacity-70">Schedule</p>
                                            <p className="text-[#584141] font-medium whitespace-pre-wrap text-xs leading-relaxed">{sacrament.scheduleInfo}</p>
                                        </div>
                                    )}

                                    <div className="mt-auto pt-4 border-t border-[#e0bfbf]/50">
                                        <Link to="/contact" className="text-[#570013] font-bold inline-flex items-center gap-2 hover:text-[#735c00] transition-colors text-xs uppercase tracking-widest group-hover:gap-4">
                                            Learn More
                                            <MdArrowForward />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* ── CTA ── */}
            <section className="relative bg-[#570013] text-white py-20 px-5 text-center overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,224,136,0.3) 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }}
                />

                <div className="relative z-10 max-w-3xl mx-auto" data-reveal-zoom>
                    <div className="w-16 h-16 rounded-full bg-[#ffe088]/10 border border-[#ffe088]/30 flex items-center justify-center mx-auto mb-6">
                        <MdStar className="text-[#ffe088] text-2xl" />
                    </div>
                    <h2 className="text-[#ffe088] mb-5 font-bold" style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: 'clamp(32px, 5vw, 48px)' }}>
                        Deepen Your Journey
                    </h2>
                    <p className="text-white/80 md:text-lg font-light leading-relaxed mb-10">
                        Whether you are seeking baptism for your child, preparing for marriage, or returning to the faith, our parish community is here to support you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-5">
                        <Link to="/contact" className="bg-[#ffe088] text-[#570013] px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors shadow-xl">
                            Contact Parish Office
                        </Link>
                        <Link to="/contact" className="border-2 border-[#ffe088]/50 text-[#ffe088] px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#ffe088]/10 transition-colors">
                            Learn About Sacraments
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
