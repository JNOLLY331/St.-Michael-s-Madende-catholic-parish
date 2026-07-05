import React, { useState } from 'react';

export default function Donate() {
    const [freq, setFreq] = useState('once');
    const [amount, setAmount] = useState('');

    return (
        <>
            {/* Hero */}
            <section className="py-20 text-center max-w-[1200px] mx-auto px-5 md:px-16 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-left space-y-6">
                    <h1 className="text-display-lg text-[#570013] leading-tight">Support Our Parish Mission</h1>
                    <p className="text-body-lg text-[#584141] max-w-xl">
                        "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                        <span className="block mt-4 italic font-semibold text-[#735c00]">— 2 Corinthians 9:7</span>
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="flex items-center gap-2 text-[#570013]">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                            <span className="text-label-md uppercase tracking-wider">Secure Giving</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#570013]">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                            <span className="text-label-md uppercase tracking-wider">Spiritual Legacy</span>
                        </div>
                    </div>
                </div>
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl border border-[#e0bfbf]">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGy4YWJ_7pE4d-9TgXz9AGX5Do8t89PWWPHEf18ZujMAbyMKr4oWYQnI8H_Q8gzUI6XYuvK8jDxb4JZ5CZVXPB0HAbdPSqnlfyCV6GVzT4XVHjhKfNLAcaJbdrXEaIzHsLh3XZ_qFT4xIGoTPY7pDqgTBnvMJ5XVkK7JUFkhMK-RVbJF9Hgwo2CX9i2MG3yDWpHftbZiD_9-c1WNdsZi3dH0RAh2cf4pQF-KsnyAlSxwFnUGuuoU--gLorhRpNkYMlP9hSzw9Wedo9')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#570013]/40 to-transparent" />
                </div>
            </section>

            {/* Bento Layout */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Form */}
                    <div className="lg:col-span-7 bg-[#fbf2ed] rounded-xl p-8 border border-[#e0bfbf] shadow-sm">
                        <h2 className="text-headline-lg text-[#570013] mb-6">Make a Gift</h2>
                        <div className="flex gap-4 mb-8">
                            {['once', 'monthly'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFreq(f)}
                                    className={`flex-1 py-3 px-6 rounded-full text-label-md transition-all border-2 ${freq === f
                                            ? 'bg-[#800020] text-white border-[#800020]'
                                            : 'border-[#8c7071] text-[#584141] hover:border-[#800020]'
                                        }`}
                                >
                                    {f === 'once' ? 'One-time' : 'Monthly'}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {['25', '50', '100'].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setAmount(val)}
                                    className={`py-4 rounded-xl border transition-all font-bold text-lg ${amount === val
                                            ? 'bg-[#800020] text-white border-[#800020]'
                                            : 'border-[#e0bfbf] hover:bg-[#800020] hover:text-white'
                                        }`}
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4 mb-8">
                            <label className="block">
                                <span className="text-label-md font-bold text-[#584141] uppercase">Custom Amount</span>
                                <div className="relative mt-2">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[#570013]">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full pl-10 pr-4 py-4 bg-white border border-[#e0bfbf] rounded-xl focus:ring-2 focus:ring-[#800020] focus:border-transparent outline-none text-xl"
                                    />
                                </div>
                            </label>

                            <label className="block">
                                <span className="text-label-md font-bold text-[#584141] uppercase">Designation</span>
                                <select className="w-full mt-2 px-4 py-4 bg-white border border-[#e0bfbf] rounded-xl focus:ring-2 focus:ring-[#800020] outline-none">
                                    <option>General Fund</option>
                                    <option>Parish Restoration Project</option>
                                    <option>St. Michael's Charity &amp; Outreach</option>
                                    <option>Education &amp; Youth Ministry</option>
                                </select>
                            </label>
                        </div>

                        <button className="w-full py-5 bg-[#800020] text-white rounded-full text-headline-md flex items-center justify-center gap-3 shadow-lg hover:brightness-110 active:scale-95 transition-all">
                            <span className="material-symbols-outlined">lock</span> Complete Secure Donation
                        </button>
                        <p className="text-center text-caption mt-4 text-[#584141]">
                            Secure 256-bit SSL encrypted payment processing.
                        </p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="bg-[#fff8f5]/80 backdrop-blur-sm border border-[#e0bfbf]/30 p-8 rounded-xl flex-1 shadow-sm">
                            <span className="material-symbols-outlined text-[#735c00] text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
                            <h3 className="text-headline-md text-[#570013] mb-2">Why Your Gift Matters</h3>
                            <p className="text-[#584141] text-body-md mb-4">
                                Your contributions sustain our daily liturgy, maintain our historic sacred spaces, and fuel our outreach to those in need within Madende.
                            </p>
                            <ul className="space-y-2">
                                {['Maintaining our parish grounds', 'Funding local soup kitchens', 'Supporting religious education'].map(li => (
                                    <li key={li} className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[#735c00] text-sm">check_circle</span>
                                        <span className="text-body-md text-[#584141]">{li}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#413d33] text-[#e9e2d3] p-8 rounded-xl shadow-sm">
                            <h3 className="text-headline-md text-[#ffe088] mb-4">Other Ways to Give</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-[#ffe088]">mail</span>
                                    <div>
                                        <h4 className="font-bold text-body-md">By Mail</h4>
                                        <p className="text-sm opacity-80">PO Box 123, Madende, St. Michael’s Parish</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <span className="material-symbols-outlined text-[#ffe088]">diversity_3</span>
                                    <div>
                                        <h4 className="font-bold text-body-md">Planned Giving</h4>
                                        <p className="text-sm opacity-80">Include the parish in your estate planning.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Decorative */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20 text-[#735c00] flex justify-center items-center gap-4">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8c7071] to-transparent" />
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>church</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#8c7071] to-transparent" />
            </div>

            {/* Categories */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="text-center mb-8">
                    <h2 className="text-display-lg text-[#570013] mb-2">Giving Categories</h2>
                    <p className="text-[#584141] max-w-2xl mx-auto">Choose a specific fund that resonates with your heart's calling.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'General Fund',
                            desc: 'Supports the daily operating costs of the parish, including utilities, clergy support, and liturgical supplies.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiFp6Nv9HQK8JMgy_cvZMl2YmkcrusObqEl0T-0Utz_8oSVTZgma-xfB9PGr1FWpfaTejdgrUWgC6QW705s7_ae16dBqGOeyXxxudijlIxfTgKKEdjMN7n1q7wXcwYhE3GBLfbao78by3SA2E7qK8l0Os4bRnLhApjJs3zsFfCvdWQFPvhWFevFJk71K9Av7e2wUoCBNvzHP7OijaaGAayhXwJ5S_WmSZrm2-RtCSB8snf17X2ut1Ikphu8MN0dauMOrFWJdCDiWTb'
                        },
                        {
                            title: 'Parish Projects',
                            desc: 'Dedicated to the restoration of our historic bell tower and the installation of new accessible entryways.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2D3w_xOidZKuAoN5y3W-r1HTSj1gkw9wdEdtNlh2A6ShBL0JZHobhu6q_4NSUJ1z0wpOVQmd1xGNsZFEKlXW-TRlLNE9XI01mlSUJ9fzrCFzam0JpbUtKdpIuTS5xzZA9tAMj_YEpA_AV5Vs5NdsDufqKjapbsaI_-V8qOxjdfJllGy0sBOLBA-1LIYUR0FXlMb5b6tCXRmXBLKm_sfWGUcmU5OIx4-lvWk_lGYnBMSW7Q8Z0_kfOL-btlOBuLcwOU-RTIZOFylC9'
                        },
                        {
                            title: 'Charity & Outreach',
                            desc: 'Directly funds our local food pantry, emergency financial assistance, and international mission trips.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJxvd7xNU8CrciYbPGkGOc2lwBs1t5QHREL1khOtIh2pq5wqdis7UoIAH3JKpCTCiXy9iSJIQ5A31AUNkY_FTofCZkH8CrBUmGfJDX2D6zRIFiZWEh49zKFP7kK6P7YcaIvu6KmJs9BQhror7LHPSj5HcpvO6rHc5xGkksiM-_fIKPnXMaRUZ8CRJmjpOBvKOm7iGI73INBZqAK_htuob2-FjEpKAqEZVSh70MIR6qpHvVRxD4G5AO3Kme0g0GF_XwMZhJkUnx2n6P'
                        },
                    ].map(({ title, desc, img }) => (
                        <div key={title} className="group cursor-pointer">
                            <div className="aspect-video mb-4 rounded-xl overflow-hidden border border-[#e0bfbf] shadow-sm group-hover:shadow-md transition-shadow">
                                <div
                                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                    style={{ backgroundImage: `url('${img}')` }}
                                />
                            </div>
                            <h3 className="text-headline-md text-[#570013]">{title}</h3>
                            <p className="text-[#584141] mt-2 text-body-md">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
