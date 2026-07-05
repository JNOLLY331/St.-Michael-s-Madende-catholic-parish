import React from 'react';
import { Link } from 'react-router-dom';

export default function Sacraments() {
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
                <span className="material-symbols-outlined px-4 text-[#735c00]">chess</span>
                <div className="flex-1 h-[1px] bg-[#e0bfbf]" />
            </div>

            {/* Bento Grid */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20 grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Baptism */}
                <div className="md:col-span-8 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] transition-all hover:shadow-xl">
                    <div className="grid md:grid-cols-2 h-full">
                        <div className="h-64 md:h-full relative overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwhO09i81tMyCYNiZXqEHEs9ka7ihgQ4vYetISlLF2JjKhNDszS6QWlBiBKCOwDZgqJkCDlVEObljJVJrOR7gq81-9E80pADUK_zfJlIwTr1uVf3-j6O4CsQZG6L4inO-0-v-Zl60Mj8jqUf0yWTulFH-YWWa9qO0XRcHkQqTmJr-VMWv3eLIGQsDtgLO_Hwk7oFmwl3y2lFt4ol_k_KoSnt8TEST1ZX2S3IddKSHBDzH1Vs3MbmY3-K8_ZKz7KZKwO14-8nzTXZPI')` }}
                            />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                            <span className="text-[#735c00] text-label-md tracking-widest mb-2">SACRAMENT OF INITIATION</span>
                            <h3 className="text-headline-lg text-[#570013] mb-2">Baptism</h3>
                            <p className="text-body-md text-[#584141] mb-4">
                                The first of the seven sacraments, and the "door" which gives access to the other sacraments. Through water and the Word, we are freed from sin and reborn as children of God.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/contact" className="bg-[#800020] text-white px-6 py-2 rounded-full text-label-md hover:brightness-110 transition-all">Request Baptism</Link>
                                <button className="border border-[#735c00] text-[#735c00] px-6 py-2 rounded-full text-label-md hover:bg-[#735c00]/10 transition-all">Learn More</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation */}
                <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] p-8 flex flex-col hover:shadow-xl transition-all">
                    <div className="mb-4">
                        <span className="material-symbols-outlined text-[#735c00] text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                    </div>
                    <h3 className="text-headline-md text-[#570013] mb-2">Confirmation</h3>
                    <p className="text-body-md text-[#584141] flex-grow">
                        The completion of baptismal grace, confirming the gift of the Holy Spirit to strengthen us for the Christian life.
                    </p>
                    <button className="mt-8 text-[#735c00] font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                        <span>Preparation Schedule</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                {/* Eucharist */}
                <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] p-8 flex flex-col hover:shadow-xl transition-all">
                    <div className="mb-4">
                        <span className="material-symbols-outlined text-[#735c00] text-[48px]">wine_bar</span>
                    </div>
                    <h3 className="text-headline-md text-[#570013] mb-2">The Eucharist</h3>
                    <p className="text-body-md text-[#584141] flex-grow">
                        The "source and summit" of the Christian life. We believe in the real presence of Jesus Christ in the Bread and Wine.
                    </p>
                    <button className="mt-8 text-[#735c00] font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                        <span>First Communion Info</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                {/* Marriage */}
                <div className="md:col-span-8 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] transition-all hover:shadow-xl">
                    <div className="grid md:grid-cols-2 h-full">
                        <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                            <span className="text-[#735c00] text-label-md tracking-widest mb-2">SACRAMENT OF SERVICE</span>
                            <h3 className="text-headline-lg text-[#570013] mb-2">Matrimony</h3>
                            <p className="text-body-md text-[#584141] mb-4">
                                A covenant by which a man and a woman establish between themselves a partnership of the whole of life.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/contact" className="bg-[#800020] text-white px-6 py-2 rounded-full text-label-md hover:brightness-110 transition-all">Inquire Wedding</Link>
                            </div>
                        </div>
                        <div className="h-64 md:h-full relative overflow-hidden order-1 md:order-2">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAR9GTYHL0XoBpCnByjLrtcWQDK7X-gUyS9FVvy9jYLiOoD4ymdT7GSzRwdcMhLh4-HA0OFJH1G9ayeIjLHT9oXYAt_5hicIs7PVBlhtwwLnrs46sgBpjN8Z6b2HUNvILywdIQhRXpcWY_nh5ae39DISdsvbfdqwVGtcAzLtOJpG_ulyB7p1ftNFvhHHOgOILP8sX90HVz3oHIQp2TUs_EDH89rmq7hWJnubrqQy7loU9xCrqv-3nWfrrKJ58EPaE3kcM-XNjxUbAy')` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Reconciliation */}
                <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] p-8 flex flex-col hover:shadow-xl transition-all">
                    <div className="mb-4">
                        <span className="material-symbols-outlined text-[#735c00] text-[48px]">settings_accessibility</span>
                    </div>
                    <h3 className="text-headline-md text-[#570013] mb-2">Reconciliation</h3>
                    <p className="text-body-md text-[#584141] flex-grow">
                        God's unconditional forgiveness through the ministry of the priest. Return to spiritual health and peace.
                    </p>
                    <div className="bg-[#efe6e2] p-4 rounded-lg mt-4">
                        <p className="text-caption font-label-md uppercase text-[#570013] mb-1">Confession Times</p>
                        <p className="text-body-md text-[#584141]">Sat: 3:30 PM - 4:30 PM</p>
                    </div>
                </div>

                {/* Holy Orders */}
                <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] p-8 flex flex-col hover:shadow-xl transition-all">
                    <div className="mb-4">
                        <span className="material-symbols-outlined text-[#735c00] text-[48px]">back_hand</span>
                    </div>
                    <h3 className="text-headline-md text-[#570013] mb-2">Holy Orders</h3>
                    <p className="text-body-md text-[#584141] flex-grow">
                        The sacrament through which the mission entrusted by Christ to his apostles continues to be exercised in the Church.
                    </p>
                    <button className="mt-8 text-[#735c00] font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                        <span>Vocation Resources</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>

                {/* Anointing of the Sick */}
                <div className="md:col-span-4 group relative overflow-hidden rounded-xl border border-[#e0bfbf] bg-[#fbf2ed] p-8 flex flex-col hover:shadow-xl transition-all">
                    <div className="mb-4">
                        <span className="material-symbols-outlined text-[#735c00] text-[48px]">opacity</span>
                    </div>
                    <h3 className="text-headline-md text-[#570013] mb-2">Anointing of the Sick</h3>
                    <p className="text-body-md text-[#584141] flex-grow">
                        Providing comfort, peace, and spiritual healing for those facing serious illness or the frailty of old age.
                    </p>
                    <button className="mt-8 bg-[#ba1a1a]/10 text-[#ba1a1a] px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#ba1a1a]/20 transition-all w-fit">
                        <span className="material-symbols-outlined text-sm">emergency_home</span>
                        <span>Emergency Contact</span>
                    </button>
                </div>
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
            </section>
        </>
    );
}
