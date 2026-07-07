import React from 'react';
import { Link } from 'react-router-dom';
import { MdAutoAwesome, MdAutoStories, MdFlare, MdChevronRight, MdMail, MdPerson, MdVolunteerActivism } from 'react-icons/md';


export default function Ministries() {
    return (
        <>
            {/* Hero Section */}
            <section className="py-20 text-center max-w-[1200px] mx-auto px-5 md:px-16">
                <h1 className="text-display-lg text-[#570013] mb-4">Parish Ministries</h1>
                <p className="text-body-lg text-[#584141] max-w-3xl mx-auto italic">
                    "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many." — Mark 10:45
                </p>
            </section>

            {/* Liturgical */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#e0bfbf]" />
                    <MdAutoStories className="text-[#735c00] text-2xl" />
                    <h2 className="text-headline-lg text-[#2b271e] uppercase tracking-widest">Liturgical</h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#e0bfbf]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Parish Choir',
                            desc: 'Our liturgical choir leads the congregation in worship through sacred music and traditional hymns.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtKqTqN-Amx0JWF-jMRVVOEy8tqNHqYIyW0td-miJBppz283Ft7-vh5kyLW-c8cepXHeD0j2KZRp83FbPgHBIlmpMDx3oj0__mwcLl-i85myZTSMfE8isJbsT2A7UxthUvjDKN8wwAjqchpDQlSwaIpXJAmGb960N9hT3V4hFpyqDjBxhGQ3aZVjQf7hucBRq4mgFIRsJxEUnOD1tMl5J0IuyhwX5ScBjgc9h4Ux5kJFln45yZyR6KBfXKMgoKxRvgHOH3kBc0xTqR',
                            leaderInitials: 'SM',
                            leaderName: 'Sr. Mary Margaret',
                            leaderRole: 'Music Director'
                        },
                        {
                            title: 'Altar Servers',
                            desc: 'Assisting the clergy during the celebration of the Eucharist, fostering a deep sense of reverence among our youth.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8O561wOSqag1JqEzjaHXraaRtIUSpmI_i-e3kVtmmilVKIm0_hR6n4MFXwNn4iUdMNZ2RyBlViskAVTY9tYsOefxKWnyrj4JFD-C3z_tRESojPzwR_EYijznaVa4vPPxM1YX71_ae2J5OVZRKs5xBojAUOH_BYnA90pnc5juc3Yol8a0AnjkWWCjrZX6VAs9-7zE8nxJY7ZyZ769ngtVm1hZJGNqpnlCYzk00Gcfh9rwS6qHhVL5WmHeWyGipsvX9xqewHRdecVEX',
                            leaderInitials: 'DM',
                            leaderName: 'Deacon Michael',
                            leaderRole: 'Coordinator'
                        },
                        {
                            title: 'Lectors',
                            desc: 'Proclaimers of the Word who bring the Holy Scriptures to life for the assembly during daily and Sunday liturgy.',
                            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYm4MiNrZhVF6CW2ubNkQi_4rVFh3VLOxLRmzBvv233LlWMVtQe9JUW1IL4LlNs-wDxLLFXzuXxvoO9OZZapBEIjRyf81qXnM6oW74KFG_IahhxmasM_mVbpmWV4usAUWi3nda-TIoxLW5dtaMGa3SP2LOctG8C4V89nMcaWZpe_FE8GN7Xb-DYsq-uQEwr-IX0iTGtIjDPmaKuLl1ZpWQ-52aYycrNb_FI5W--MHEOdTxpUcgqTCICI69HXMPbY-yMrWRh1fbg6AH',
                            leaderInitials: 'JA',
                            leaderName: 'John Anyona',
                            leaderRole: 'Head Lector'
                        }
                    ].map(m => (
                        <div key={m.title} className="bg-white border border-[#e0bfbf] p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(87,0,19,0.1)] group">
                            <div className="h-48 mb-6 overflow-hidden rounded-lg">
                                <img src={m.img} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <h3 className="text-headline-md text-[#570013] mb-2">{m.title}</h3>
                            <p className="text-[#584141] mb-6 text-body-md">{m.desc}</p>
                            <div className="flex items-center gap-3 pt-4 border-t border-[#e0bfbf]">
                                <div className="w-10 h-10 rounded-full bg-[#fed65b] flex items-center justify-center text-[#745c00] font-bold">
                                    {m.leaderInitials}
                                </div>
                                <div className="text-caption">
                                    <p className="font-bold">{m.leaderName}</p>
                                    <p className="opacity-70">{m.leaderRole}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Community Outreach */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#e0bfbf]" />
                    <MdVolunteerActivism className="text-[#735c00] text-2xl" />
                    <h2 className="text-headline-lg text-[#2b271e] uppercase tracking-widest">Community Outreach</h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#e0bfbf]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group flex flex-col md:flex-row bg-[#f5ece7] border border-[#e0bfbf] rounded-xl overflow-hidden hover:shadow-lg transition-all">
                        <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPOQA9hZlCt_S5jymr70xj9IWn2rf1xvfUbc7Hr2jsoKwcS-_28MIrDD9C7Gp9pJ9eDNKugn3wyvqFNiXilp8uPknbswP4H7GkOPOu6BQmfiiwylTGzSE91WAkJGl6uB5rH14Kfw4_F1LbntSjaey3FdYCEiizAM9ZcBjPxt9-5fRA5gShMqSgmFYk6HJXw-N5WSuxZ1vdRoSN-6k5QuKPPEsxrvafL0Izj8E-0SBHEuQOO2SKDVaK3g2yTjTQNXurtqxRZc2E5RuT"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-8 flex-1">
                            <h3 className="text-headline-md text-[#570013] mb-2">St. Vincent de Paul Society</h3>
                            <p className="text-[#584141] mb-6 text-body-md">Providing food, clothing, and essential support to families in need within the Madende community.</p>
                            <div className="flex items-center gap-3">
                                <MdPerson className="text-[#570013]" />
                                <span className="font-bold">Catherine Wekesa</span>
                            </div>
                        </div>
                    </div>
                    <div className="group flex flex-col md:flex-row bg-[#f5ece7] border border-[#e0bfbf] rounded-xl overflow-hidden hover:shadow-lg transition-all">
                        <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3n0NtaWA8-zYey8FlgH8p3JwxualtkL6Mk1ZStTmeY_08qK0inzgfxwKrbtq5c-z9Wx4TWQAgGhksjpWaosWnf9mqf6eU-sTSmjhMnpdhMZyhbeZeTm1JaMfYtuCbNuFnXD00JPCgJiJHyucGDQ2mPG7T7EZJEoWPyQxEKPPlMCjAi1CT19REmv6nDoOvGniy0bxzrn7lvrZyiKE1znrhwAq-o-ypXugIPNkPGpipFlRiXGQRhbYHW_2oEQ5Ey7N-0ckzfiuGn4ht"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-8 flex-1">
                            <h3 className="text-headline-md text-[#570013] mb-2">Hospital Visitation</h3>
                            <p className="text-[#584141] mb-6 text-body-md">Bringing the Eucharist and emotional support to the sick and homebound, ensuring no member is isolated.</p>
                            <div className="flex items-center gap-3">
                                <MdPerson className="text-[#570013]" />
                                <span className="font-bold">Fr. Dominic</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Youth & Prayer (Bento Grid) */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                    <div>
                        <h2 className="text-headline-lg text-[#2b271e]">Youth &amp; Prayer</h2>
                        <p className="text-[#584141] text-body-md">Building faith for the next generation and sustaining it through communal prayer.</p>
                    </div>
                    <div className="h-px flex-grow bg-[#e0bfbf] mx-8 hidden md:block mb-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* CYO */}
                    <div className="md:col-span-8 bg-[#efe6e2] p-8 rounded-xl border border-[#e0bfbf]">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/3">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6LDV45bKxqVEooFM249H8yaUI6qg15LQ2yp8XLa5DEjQ7gAUILarhLTdZ6OZBnJtNP65XMMq_wXTmk3DF-hVlS2KproQoxxkUR4Kua4K-yjiJ0excxvZvKYNY2nK0i8IPg-z_mQXrL-uGP5EEexAhjSq7u3fdfPTqsyfUlnOwaMHNHtt3iK-e-L5gGlnqFEuJByxFiD2WU9vHknAMbd07iGUqSUBpbQc9-fR7kNM1i2VXYygMFX88MtYnHQTGydCr9RZZ2RHZu713"
                                    className="rounded-lg shadow-sm" alt="CYO" />
                            </div>
                            <div className="flex-1">
                                <span className="bg-[#735c00] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full mb-3 inline-block">Youth Ministry</span>
                                <h3 className="text-headline-md text-[#570013] mb-2">Catholic Youth Organization (CYO)</h3>
                                <p className="text-[#584141] mb-4 text-body-md">Empowering young people to live as disciples of Jesus Christ through service, social events, and retreats.</p>
                                <div className="flex items-center gap-2 text-[#570013] cursor-pointer hover:underline">
                                    <MdMail className="text-sm" />
                                    <span className="text-label-md">Contact Peter Nabwera</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sacred Heart */}
                    <div className="md:col-span-4 bg-[#800020] text-white p-8 rounded-xl flex flex-col justify-between">
                        <div>
                            <MdFlare className="mb-4 text-3xl" />
                            <h3 className="text-headline-md mb-2">Sacred Heart</h3>
                            <p className="opacity-90 text-body-md">Weekly adoration and contemplative prayer focused on the compassion of Christ.</p>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-caption font-bold">Leader: Mrs. Simiyu</span>
                            <MdChevronRight />
                        </div>
                    </div>

                    {/* Rosary Circle */}
                    <div className="md:col-span-4 bg-[#413d33] text-[#e9e2d3] p-8 rounded-xl border border-[#8c7071] shadow-sm">
                        <h3 className="text-headline-md mb-2 text-[#ffdada]">Rosary Circle</h3>
                        <p className="opacity-80 text-body-md mb-6">Daily collective prayer sessions honoring the Blessed Mother and interceding for the parish.</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#8c7071] flex items-center justify-center text-xs text-white">BK</div>
                            <span className="text-caption">Benedict Kundu</span>
                        </div>
                    </div>

                    {/* Charismatic Renewal */}
                    <div className="md:col-span-8 bg-[#fbf2ed] border border-[#e0bfbf] p-8 rounded-xl">
                        <div className="flex justify-between items-start">
                            <div className="max-w-md">
                                <h3 className="text-headline-md text-[#570013] mb-2">Charismatic Renewal</h3>
                                <p className="text-[#584141] text-body-md">Experience the power of the Holy Spirit through vibrant praise, worship, and healing prayers every Thursday evening.</p>
                            </div>
                            <div className="w-12 h-12 bg-[#fed65b] rounded-full flex items-center justify-center text-[#745c00]">
                                <MdAutoAwesome />
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button className="text-[#570013] font-bold text-label-md uppercase tracking-wider hover:opacity-70 transition-opacity">Learn More</button>
                            <button className="text-[#584141] text-label-md uppercase tracking-wider hover:text-[#570013] transition-colors">Schedule</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#e9e1dc] py-20 px-5 text-center mt-20 max-w-[1200px] mx-auto md:rounded-3xl mb-10">
                <h2 className="text-display-lg text-[#570013] mb-4">Called to Serve?</h2>
                <p className="text-[#584141] max-w-2xl mx-auto mb-8 text-body-lg">
                    Every parishioner is invited to share their unique talents and time. Join a ministry today and help us grow our vibrant community of faith.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link to="/contact" className="bg-[#570013] text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-md">
                        Register to Volunteer
                    </Link>
                    <Link to="/contact" className="border border-[#570013] text-[#570013] px-10 py-4 rounded-full font-bold hover:bg-[#570013]/5 transition-colors">
                        Inquiry Form
                    </Link>
                </div>
            </section>
        </>
    );
}
