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
                        "Visible signs of invisible grace, instituted by Christ for our sanctification."
                    </p>
                </div>
            </section>

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
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

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
        </>
    );
}
