<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MdArrowForward, MdBackHand, MdLocalFireDepartment,
    MdOpacity, MdSpa, MdStar, MdWaterDrop, MdFavorite,
    MdCheckCircle, MdSchedule, MdDescription,
} from 'react-icons/md';
import { useSacramentsData } from '../hooks/useSacramentsData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

// Icon mapping keyed by the exact SacramentType choice value from the backend
const SACRAMENT_ICONS = {
    BAPTISM: <MdWaterDrop />,
    CONFIRMATION: <MdLocalFireDepartment />,
    EUCHARIST: <MdFavorite />,
    RECONCILIATION: <MdSpa />,
    ANOINTING_OF_SICK: <MdOpacity />,
    HOLY_ORDERS: <MdBackHand />,
    MATRIMONY: <MdFavorite />,
};

function getIcon(sacramentType, name, size = 48) {
    const style = { color: '#735c00', fontSize: `${size}px` };
    const Icon = SACRAMENT_ICONS[sacramentType];
    if (Icon) return React.cloneElement(Icon, { style });
    // Fallback: fuzzy match on name
    const lower = (name || '').toLowerCase();
    if (lower.includes('baptism')) return <MdWaterDrop style={style} />;
    if (lower.includes('confirm')) return <MdLocalFireDepartment style={style} />;
    if (lower.includes('eucharist') || lower.includes('communion')) return <MdFavorite style={style} />;
    if (lower.includes('reconcil') || lower.includes('penance')) return <MdSpa style={style} />;
    if (lower.includes('order')) return <MdBackHand style={style} />;
    if (lower.includes('sick') || lower.includes('anoint')) return <MdOpacity style={style} />;
    if (lower.includes('marriag') || lower.includes('matrimon')) return <MdFavorite style={style} />;
    return <MdStar style={style} />;
}

export default function Sacraments() {
    const { sacraments, loading, error } = useSacramentsData();
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <>
            {/* ── Hero ──────────────────────────────────────────────────────────── */}
            <section style={{
                position: 'relative',
                height: '420px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                margin: '16px auto 64px',
                maxWidth: '1200px',
                borderRadius: '24px',
                padding: '0 20px',
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR5pf7TReMMBZXHGe0GKHnogXAJd-R5U5okO05Y0m47zDfIQXAo2J_dA0HoxEz9t4xLCu1EucxwWwdvW9aSaRVYDwKDsMh304ZkTNwz7QP9L4A5vhikxjGu6o1DHdqL_Znda1Azr0ai9kbmae3t2L1IkvvC6-VQgJwX8bzESls5DsbevIscrMiL9iok8MNJzuzF4anEnPSafEwcVNZbjHpTOojWDAqH4Xgu1PvKU-URaIwge_JxXa84ixsVQmnkn_qeSOXnCRg0B85')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.45)',
                    zIndex: 0,
                }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 20px' }}>
                    <h1 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        color: '#fff',
                        marginBottom: '16px',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                    }}>
                        The Holy Sacraments
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'rgba(255,255,255,0.9)',
                        maxWidth: '600px',
                        margin: '0 auto',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                    }}>
=======
import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowForward, MdBackHand, MdLocalPharmacy, MdLocalFireDepartment, MdOpacity, MdSpa, MdLiquor, MdStar, MdWaterDrop } from 'react-icons/md';
import { useSacramentsData } from '../hooks/useSacramentsData';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';
import { toast } from 'react-hot-toast';

export default function Sacraments() {
    const { sacraments, loading, error } = useSacramentsData();

    // Mapping icons to sacrament names for the dynamic grid
    const getIcon = (name) => {
        const lower = (name || '').toLowerCase();
        if (lower.includes('baptism')) return <MdWaterDrop className="text-[#735c00] text-[48px]" />;
        if (lower.includes('confirm')) return <MdLocalFireDepartment className="text-[#735c00] text-[48px]" />;
        if (lower.includes('eucharist') || lower.includes('communion')) return <MdLiquor className="text-[#735c00] text-[48px]" />;
        if (lower.includes('reconcil') || lower.includes('penance')) return <MdSpa className="text-[#735c00] text-[48px]" />;
        if (lower.includes('order')) return <MdBackHand className="text-[#735c00] text-[48px]" />;
        if (lower.includes('sick') || lower.includes('anoint')) return <MdOpacity className="text-[#735c00] text-[48px]" />;
        return <MdStar className="text-[#735c00] text-[48px]" />; // generic fallback
    };
    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden mb-20 max-w-[1200px] mx-auto rounded-b-3xl md:rounded-3xl mt-4 px-5">
                <div className="absolute inset-0 z-0">
                    <div
                        className="w-full h-full bg-cover bg-center brightness-50"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR5pf7TReMMBZXHGe0GKHnogXAJd-R5U5okO05Y0m47zDfIQXAo2J_dA0HoxEz9t4xLCu1EucxwWwdvW9aSaRVYDwKDsMh304ZkTNwz7QP9L4A5vhikxjGu6o1DHdqL_Znda1Azr0ai9kbmae3t2L1IkvvC6-VQgJwX8bzESls5DsbevIscrMiL9iok8MNJzuzF4anEnPSafEwcVNZbjHpTOojWDAqH4Xgu1PvKU-URaIwge_JxXa84ixsVQmnkn_qeSOXnCRg0B85')` }}
                    />
                </div>
                <div className="relative z-10 text-center px-5">
                    <h1 className="text-display-lg text-white mb-4">The Holy Sacraments</h1>
                    <p className="text-body-lg text-white/90 max-w-2xl mx-auto italic">
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                        "Visible signs of invisible grace, instituted by Christ for our sanctification."
                    </p>
                </div>
            </section>

<<<<<<< HEAD
            {/* ── Intro ─────────────────────────────────────────────────────────── */}
            <div style={{ textAlign: 'center', marginBottom: '32px', maxWidth: '760px', margin: '0 auto 48px', padding: '0 20px' }}>
                <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#570013',
                    marginBottom: '16px',
                }}>
                    Sacred Channels of Grace
                </h2>
                <p style={{ fontSize: '1.05rem', color: '#584141', lineHeight: 1.7 }}>
                    The Catholic Church celebrates seven sacraments, instituted by Christ to share His divine life with us.
                    Through these sacred rites, we are nourished, healed, and strengthened in our journey of faith.
                </p>
            </div>

            {/* Decorative divider */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto 64px',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
            }}>
                <div style={{ flex: 1, height: '1px', background: '#e0bfbf' }} />
                <MdStar style={{ fontSize: '28px', color: '#735c00' }} />
                <div style={{ flex: 1, height: '1px', background: '#e0bfbf' }} />
            </div>

            {/* ── Sacraments Grid ───────────────────────────────────────────────── */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px 80px',
            }}>
                {loading && <Spinner message="Loading the Holy Sacraments..." />}

                {!loading && error && (
                    <div style={{ textAlign: 'center', color: '#c0392b', padding: '40px 0' }}>
                        <p style={{ fontSize: '1.05rem' }}>⚠ Could not load sacraments. Please try again later.</p>
=======
            {/* Intro & Decorative Divider */}
            <div className="text-center mb-8 max-w-3xl mx-auto px-5 md:px-16">
                <h2 className="text-headline-lg text-[#570013] mb-4">Sacred Channels of Grace</h2>
                <p className="text-body-lg text-[#584141]">
                    The Catholic Church celebrates seven sacraments, which were instituted by Christ to share His divine life with us. Through these sacred rites, we are nourished, healed, and strengthened in our journey of faith.
                </p>
            </div>
            <div className="max-w-[1200px] mx-auto px-5 md:px-16 flex items-center justify-center mb-20">
                <div className="flex-1 h-[1px] bg-[#e0bfbf]" />
                <MdStar className="px-4 text-4xl text-[#735c00]" />
                <div className="flex-1 h-[1px] bg-[#e0bfbf]" />
            </div>

            {/* Bento Grid */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                {loading && <Spinner message="Loading the Holy Sacraments..." />}

                {!loading && error && (
                    <div className="text-center text-red-600 py-10">
                        <p className="text-body-lg">⚠ Could not load sacraments. Please try again later.</p>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                    </div>
                )}

                {!loading && !error && sacraments.length === 0 && (
                    <EmptyState
                        title="Sacraments Information Coming Soon"
<<<<<<< HEAD
                        message="We are updating our sacramental preparation guidelines. Please check back shortly."
=======
                        message="We are updating our sacramental preparation guidelines."
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                        icon={MdStar}
                    />
                )}

                {!loading && !error && sacraments.length > 0 && (
<<<<<<< HEAD
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px',
                    }}>
                        {sacraments.map((sacrament) => {
                            const isHovered = hoveredId === sacrament.id;
                            return (
                                <div
                                    key={sacrament.id}
                                    style={{
                                        borderRadius: '16px',
                                        border: '1px solid #e0bfbf',
                                        background: '#fbf2ed',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                                        boxShadow: isHovered
                                            ? '0 16px 40px -10px rgba(87,0,19,0.22)'
                                            : '0 2px 8px rgba(0,0,0,0.06)',
                                        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                                    }}
                                    onMouseEnter={() => setHoveredId(sacrament.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Banner image (if available) */}
                                    {sacrament.image && (
                                        <div style={{
                                            height: '180px',
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}>
                                            <img
                                                src={sacrament.image}
                                                alt={sacrament.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease',
                                                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                                                }}
                                                onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                                            />
                                        </div>
                                    )}

                                    {/* Card body */}
                                    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        {/* Icon (shown when no image) */}
                                        {!sacrament.image && (
                                            <div style={{ marginBottom: '16px' }}>
                                                {getIcon(sacrament.name)}
                                            </div>
                                        )}

                                        <h3 style={{
                                            fontFamily: 'var(--font-serif)',
                                            fontSize: '1.35rem',
                                            color: '#570013',
                                            marginBottom: '10px',
                                            fontWeight: 600,
                                        }}>
                                            {sacrament.name}
                                        </h3>

                                        <p style={{
                                            fontSize: '0.95rem',
                                            color: '#584141',
                                            lineHeight: 1.65,
                                            flex: 1,
                                            marginBottom: '16px',
                                        }}>
                                            {sacrament.shortDescription || sacrament.description || 'A sacred sacrament of the Church.'}
                                        </p>

                                        {/* Meta badges */}
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                                            {sacrament.preparationDuration && (
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: '#efe6e2',
                                                    color: '#570013',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                }}>
                                                    <MdSchedule style={{ fontSize: '14px' }} />
                                                    {sacrament.preparationDuration}
                                                </span>
                                            )}
                                            {sacrament.requiresDocuments && (
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: '#efe6e2',
                                                    color: '#570013',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                }}>
                                                    <MdDescription style={{ fontSize: '14px' }} />
                                                    Docs required
                                                </span>
                                            )}
                                            {sacrament.requiresBooking && (
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: '#efe6e2',
                                                    color: '#570013',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 600,
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                }}>
                                                    <MdCheckCircle style={{ fontSize: '14px' }} />
                                                    Booking needed
                                                </span>
                                            )}
                                        </div>

                                        {/* Requirements preview */}
                                        {sacrament.requirements.length > 0 && (
                                            <div style={{
                                                background: '#f5ece7',
                                                borderRadius: '10px',
                                                padding: '12px 16px',
                                                marginBottom: '20px',
                                            }}>
                                                <p style={{
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.1em',
                                                    textTransform: 'uppercase',
                                                    color: '#570013',
                                                    marginBottom: '8px',
                                                }}>
                                                    Requirements
                                                </p>
                                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                    {sacrament.requirements.slice(0, 3).map((r) => (
                                                        <li key={r.id} style={{
                                                            fontSize: '0.85rem',
                                                            color: '#584141',
                                                            paddingBottom: '4px',
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: '6px',
                                                        }}>
                                                            <span style={{ color: '#735c00', marginTop: '2px', flexShrink: 0 }}>✓</span>
                                                            {r.title}
                                                        </li>
                                                    ))}
                                                    {sacrament.requirements.length > 3 && (
                                                        <li style={{ fontSize: '0.8rem', color: '#735c00', fontStyle: 'italic' }}>
                                                            +{sacrament.requirements.length - 3} more…
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        <Link
                                            to="/contact"
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                color: '#735c00',
                                                fontWeight: 700,
                                                fontSize: '0.9rem',
                                                textDecoration: 'none',
                                                marginTop: 'auto',
                                                transition: 'gap 0.2s',
                                            }}
                                        >
                                            <span>Inquire / Register</span>
                                            <MdArrowForward />
                                        </Link>
                                    </div>
=======
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {sacraments.map((sacrament, index) => {
                            // Logic to make it a bento grid: every 1st and 4th item (like Baptism, Marriage) gets 8 cols if it has an image
                            const isLarge = sacrament.image && (index % 5 === 0 || index % 5 === 3);

                            if (isLarge) {
                                return (
                                    <div key={sacrament.id} className="md:col-span-8 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] transition-all hover:shadow-xl">
                                        <div className="grid md:grid-cols-2 h-full">
                                            <div className={`h-64 md:h-full relative overflow-hidden ${index % 2 !== 0 ? 'order-1 md:order-2' : ''}`}>
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                                    style={{ backgroundImage: `url('${sacrament.image}')` }}
                                                />
                                            </div>
                                            <div className={`p-8 flex flex-col justify-center ${index % 2 !== 0 ? 'order-2 md:order-1' : ''}`}>
                                                {sacrament.category && (
                                                    <span className="text-[#735c00] text-label-md tracking-widest mb-2 uppercase">
                                                        {sacrament.category}
                                                    </span>
                                                )}
                                                <h3 className="text-headline-lg text-[#570013] mb-2">{sacrament.name}</h3>
                                                <p className="text-body-md text-[#584141] mb-4">
                                                    {sacrament.description}
                                                </p>
                                                <div className="flex flex-wrap gap-4">
                                                    <Link to="/contact" className="bg-[#800020] text-white px-6 py-2 rounded-full text-label-md hover:brightness-110 transition-all">
                                                        Inquire / Register
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            // Normal Card
                            return (
                                <div key={sacrament.id} className="md:col-span-4 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] p-8 flex flex-col hover:shadow-xl transition-all">
                                    <div className="mb-4">
                                        {getIcon(sacrament.name)}
                                    </div>
                                    <h3 className="text-headline-md text-[#570013] mb-2">{sacrament.name}</h3>
                                    <p className="text-body-md text-[#584141] flex-grow">
                                        {sacrament.description}
                                    </p>
                                    {sacrament.scheduleInfo && (
                                        <div className="bg-[#efe6e2] p-4 rounded-lg mt-4 mb-4">
                                            <p className="text-caption font-label-md uppercase text-[#570013] mb-1">Schedule</p>
                                            <p className="text-body-md text-[#584141] whitespace-pre-wrap">{sacrament.scheduleInfo}</p>
                                        </div>
                                    )}
                                    <Link to="/contact" className="mt-auto pt-6 text-[#735c00] font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                                        <span>Learn More</span>
                                        <MdArrowForward />
                                    </Link>
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

<<<<<<< HEAD
            {/* ── CTA Section ───────────────────────────────────────────────────── */}
            <section style={{ background: '#413d33', color: '#fff', padding: '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        marginBottom: '16px',
                    }}>
                        Deepen Your Journey
                    </h2>
                    <p style={{
                        fontSize: '1.05rem',
                        color: '#e9e2d3',
                        maxWidth: '620px',
                        margin: '0 auto 36px',
                        lineHeight: 1.7,
                    }}>
                        Whether you are seeking baptism for your child, preparing for marriage, or returning to the faith,
                        our parish community is here to support you.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <Link
                            to="/contact"
                            style={{
                                background: '#fed65b',
                                color: '#745c00',
                                padding: '12px 32px',
                                borderRadius: '50px',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                textDecoration: 'none',
                                transition: 'transform 0.2s',
                            }}
                        >
                            Contact Parish Office
                        </Link>
                    </div>
                </div>
            </section>
=======
            {/* CTA */}
            <section className="bg-[#413d33] text-white py-20">
                <div className="max-w-[1200px] mx-auto px-5 md:px-16 text-center">
                    <h2 className="text-headline-lg mb-4">Deepen Your Journey</h2>
                    <p className="text-body-lg text-[#e9e2d3] max-w-2xl mx-auto mb-8">
                        Whether you are seeking baptism for your child, preparing for marriage, or returning to the faith, our parish community is here to support you.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/contact" className="bg-[#fed65b] text-[#745c00] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                            Contact Parish Office
                        </Link>
                        <button className="border border-[#8c7071] text-white px-8 py-3 rounded-full font-bold hover:bg-white/5 transition-all">
                            Download Prep Guides
                        </button>
                    </div>
                </div>
            </section >
>>>>>>> b13032bcd3b4ed5f3e132a749c751798f9267ac1
        </>
    );
}
