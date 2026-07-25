import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdBackHand, MdLocalFireDepartment, MdOpacity, MdSpa, MdStar, MdWaterDrop, MdFavorite, MdAutorenew } from 'react-icons/md';
import { useSacramentsData } from '../hooks/useSacramentsData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

// Sacrament categories for reference
const SACRAMENT_CATEGORIES = [
    { key: 'INITIATION', label: 'Sacraments of Initiation', color: '#570013' },
    { key: 'HEALING', label: 'Sacraments of Healing', color: '#735c00' },
    { key: 'SERVICE', label: 'Sacraments at the Service of Communion', color: '#413d33' },
];

export default function Sacraments() {
    const { sacraments, loading, error } = useSacramentsData();

    // Mapping icons to sacrament names for the dynamic grid
    const getIcon = (name) => {
        const lower = (name || '').toLowerCase();
        if (lower.includes('baptism')) return <MdWaterDrop className="text-[#735c00]" style={{ fontSize: 48 }} />;
        if (lower.includes('confirm')) return <MdLocalFireDepartment className="text-[#735c00]" style={{ fontSize: 48 }} />;
        if (lower.includes('eucharist') || lower.includes('communion')) return <MdFavorite className="text-[#735c00]" style={{ fontSize: 48 }} />;
        if (lower.includes('reconcil') || lower.includes('penance')) return <MdSpa className="text-[#735c00]" style={{ fontSize: 48 }} />;
        if (lower.includes('order')) return <MdBackHand className="text-[#735c00]" style={{ fontSize: 48 }} />;
        if (lower.includes('sick') || lower.includes('anoint')) return <MdOpacity className="text-[#735c00]" style={{ fontSize: 48 }} />;
        if (lower.includes('matrimon') || lower.includes('marriage')) return <MdAutorenew className="text-[#735c00]" style={{ fontSize: 48 }} />;
        return <MdStar className="text-[#735c00]" style={{ fontSize: 48 }} />;
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative flex items-center justify-center overflow-hidden mb-12 md:mb-20 max-w-[1200px] mx-auto px-4 md:px-5"
                style={{ height: 'clamp(300px, 45vw, 500px)', marginTop: '1rem' }}>
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR5pf7TReMMBZXHGe0GKHnogXAJd-R5U5okO05Y0m47zDfIQXAo2J_dA0HoxEz9t4xLCu1EucxwWwdvW9aSaRVYDwKDsMh304ZkTNwz7QP9L4A5vhikxjGu6o1DHdqL_Znda1Azr0ai9kbmae3t2L1IkvvC6-VQgJwX8bzESls5DsbevIscrMiL9iok8MNJzuzF4anEnPSafEwcVNZbjHpTOojWDAqH4Xgu1PvKU-URaIwge_JxXa84ixsVQmnkn_qeSOXnCRg0B85')`,
                            filter: 'brightness(0.5)',
                        }}
                    />
                    {/* Sacred gradient overlay */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(87,0,19,0.6), transparent 60%)' }} />
                </div>
                <div className="relative z-10 text-center px-4">
                    <span className="inline-block text-[#ffe088] text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3 md:mb-4">
                        Seven Sacred Rites
                    </span>
                    <h1 className="text-white mb-3 md:mb-4" style={{ fontFamily: 'EB Garamond, Georgia, serif', fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 600, lineHeight: 1.15 }}>
                        The Holy Sacraments
                    </h1>
                    <p className="text-white/90 max-w-xl mx-auto italic" style={{ fontFamily: 'Source Sans 3, system-ui, sans-serif', fontSize: 'clamp(15px, 2.5vw, 18px)', lineHeight: 1.6 }}>
                        "Visible signs of invisible grace, instituted by Christ for our sanctification."
                    </p>
                </div>
            </section>

            {/* Intro & Decorative Divider */}
            <div className="text-center mb-8 max-w-3xl mx-auto px-4 md:px-16">
                <h2 className="text-headline-lg text-[#570013] mb-4">Sacred Channels of Grace</h2>
                <p className="text-body-lg text-[#584141]">
                    The Catholic Church celebrates seven sacraments, which were instituted by Christ to share His divine life with us. Through these sacred rites, we are nourished, healed, and strengthened in our journey of faith.
                </p>
            </div>
            <div className="max-w-[1200px] mx-auto px-4 md:px-16 flex items-center justify-center mb-12 md:mb-20">
                <div className="flex-1 h-[1px] bg-[#e0bfbf]" />
                <MdStar className="px-4 text-4xl text-[#735c00]" />
                <div className="flex-1 h-[1px] bg-[#e0bfbf]" />
            </div>

            {/* Bento Grid */}
            <section className="max-w-[1200px] mx-auto px-4 md:px-16 mb-12 md:mb-20">
                {loading && <Spinner message="Loading the Holy Sacraments..." />}

                {!loading && error && (
                    <div className="text-center text-red-600 py-10">
                        <p className="text-body-lg">⚠ Could not load sacraments. Please try again later.</p>
                    </div>
                )}

                {!loading && !error && sacraments.length === 0 && (
                    <EmptyState
                        title="Sacraments Information Coming Soon"
                        message="We are updating our sacramental preparation guidelines."
                        icon={MdStar}
                    />
                )}

                {!loading && !error && sacraments.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                        {sacraments.map((sacrament, index) => {
                            const isLarge = sacrament.image && (index % 5 === 0 || index % 5 === 3);

                            if (isLarge) {
                                return (
                                    <div key={sacrament.id} className="md:col-span-8 group relative overflow-hidden border border-[#e0bfbf] bg-[#fbf2ed] transition-all hover:shadow-xl">
                                        <div className="grid md:grid-cols-2 h-full">
                                            <div className={`h-56 md:h-full relative overflow-hidden ${index % 2 !== 0 ? 'order-1 md:order-2' : ''}`}>
                                                <img
                                                    src={sacrament.image}
                                                    alt={sacrament.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                {/* Image overlay for brand consistency */}
                                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, rgba(87,0,19,0.08), transparent)' }} />
                                            </div>
                                            <div className={`p-6 md:p-8 flex flex-col justify-center ${index % 2 !== 0 ? 'order-2 md:order-1' : ''}`}>
                                                {sacrament.category && (
                                                    <span className="text-[#735c00] text-xs font-bold tracking-widest mb-2 uppercase">
                                                        {sacrament.category}
                                                    </span>
                                                )}
                                                <h3 className="text-headline-lg text-[#570013] mb-2">{sacrament.name}</h3>
                                                <p className="text-body-md text-[#584141] mb-4 line-clamp-4">{sacrament.description}</p>
                                                {sacrament.scheduleInfo && (
                                                    <div className="bg-[#efe6e2] p-3 mb-4" style={{ borderLeft: '3px solid #735c00' }}>
                                                        <p className="text-xs font-bold uppercase text-[#570013] mb-1">Schedule</p>
                                                        <p className="text-body-md text-[#584141] whitespace-pre-wrap text-sm">{sacrament.scheduleInfo}</p>
                                                    </div>
                                                )}
                                                <div className="flex flex-wrap gap-3">
                                                    <Link to="/contact" className="bg-[#800020] text-white px-6 py-2 text-sm font-bold hover:brightness-110 transition-all inline-flex items-center gap-2"
                                                        style={{ borderRadius: 0 }}>
                                                        Inquire / Register
                                                        <MdArrowForward />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Normal Card (no image or small)
                            return (
                                <div key={sacrament.id} className="md:col-span-4 group relative overflow-hidden border border-[#e0bfbf] bg-[#fbf2ed] p-6 md:p-8 flex flex-col hover:shadow-xl transition-all">
                                    {/* Image if exists but not in "large" slot */}
                                    {sacrament.image && (
                                        <div className="h-40 mb-4 overflow-hidden -mx-6 md:-mx-8 -mt-6 md:-mt-8">
                                            <img
                                                src={sacrament.image}
                                                alt={sacrament.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    {!sacrament.image && (
                                        <div className="mb-4">
                                            {getIcon(sacrament.name)}
                                        </div>
                                    )}
                                    {sacrament.category && (
                                        <span className="text-[#735c00] text-xs font-bold tracking-widest mb-1 uppercase">{sacrament.category}</span>
                                    )}
                                    <h3 className="text-headline-md text-[#570013] mb-2">{sacrament.name}</h3>
                                    <p className="text-body-md text-[#584141] flex-grow line-clamp-4">{sacrament.description}</p>
                                    {sacrament.scheduleInfo && (
                                        <div className="bg-[#efe6e2] p-4 mt-4 mb-4" style={{ borderLeft: '3px solid #735c00' }}>
                                            <p className="text-xs font-bold uppercase text-[#570013] mb-1">Schedule</p>
                                            <p className="text-body-md text-[#584141] whitespace-pre-wrap text-sm">{sacrament.scheduleInfo}</p>
                                        </div>
                                    )}
                                    <Link to="/contact" className="mt-auto pt-6 text-[#735c00] font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit text-sm">
                                        <span>Learn More</span>
                                        <MdArrowForward />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-[#413d33] text-white py-12 md:py-20">
                <div className="max-w-[1200px] mx-auto px-4 md:px-16 text-center">
                    <h2 className="text-headline-lg mb-4">Deepen Your Journey</h2>
                    <p className="text-body-lg text-[#e9e2d3] max-w-2xl mx-auto mb-8">
                        Whether you are seeking baptism for your child, preparing for marriage, or returning to the faith, our parish community is here to support you.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/contact"
                            className="bg-[#fed65b] text-[#745c00] px-8 py-3 font-bold hover:brightness-105 transition-all text-sm md:text-base"
                            style={{ borderRadius: 0 }}>
                            Contact Parish Office
                        </Link>
                        <Link to="/contact"
                            className="border border-[#8c7071] text-white px-8 py-3 font-bold hover:bg-white/5 transition-all text-sm md:text-base"
                            style={{ borderRadius: 0 }}>
                            Learn About Sacraments
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
