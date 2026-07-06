import React, { useState } from 'react';

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => { setSending(false); setSent(true); e.target.reset(); }, 1500);
    };

    return (
        <>
            {/* Hero */}
            <section className="text-center mb-20 max-w-[1200px] mx-auto px-5 md:px-16 pt-16">
                <h1 className="text-display-lg text-[#570013] mb-4">Reach Out to Our Parish</h1>
                <p className="text-body-lg text-[#584141] max-w-2xl mx-auto">
                    Whether you have questions about the Sacraments, want to join a ministry, or simply need spiritual guidance, our doors and hearts are always open.
                </p>
                <div className="w-12 h-1 bg-[#735c00] mx-auto mt-4 rounded-full" />
            </section>

            {/* Main Grid */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                {/* Contact Form */}
                <div className="lg:col-span-7 bg-[#fbf2ed] p-8 rounded-xl border border-[#e0bfbf] shadow-sm">
                    <h2 className="text-headline-lg text-[#570013] mb-8">Send a Message</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md text-[#584141]" htmlFor="name">Full Name</label>
                                <input
                                    id="name" name="name" type="text" placeholder="John Doe"
                                    className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md text-[#584141]" htmlFor="email">Email Address</label>
                                <input
                                    id="email" name="email" type="email" placeholder="john@example.com"
                                    className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-label-md text-[#584141]" htmlFor="subject">Subject</label>
                            <select
                                id="subject" name="subject"
                                className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                            >
                                <option>General Inquiry</option>
                                <option>Sacramental Preparation</option>
                                <option>Mass Intentions</option>
                                <option>Ministry Information</option>
                                <option>Financial Support</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-label-md text-[#584141]" htmlFor="message">Your Message</label>
                            <textarea
                                id="message" name="message" rows={6} placeholder="How can we help you today?"
                                className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={sending || sent}
                            className={`w-full py-4 rounded-lg text-label-md text-white flex items-center justify-center gap-2 group transition-all ${sent ? 'bg-green-600' : 'bg-[#800020] hover:bg-[#570013]'
                                }`}
                        >
                            {sent ? (
                                <><span className="material-symbols-outlined">check_circle</span> Sent Successfully</>
                            ) : sending ? (
                                <><span className="material-symbols-outlined animate-spin">sync</span> Sending...</>
                            ) : (
                                <><span>Send Message</span><span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">send</span></>
                            )}
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="lg:col-span-5 space-y-6">
                    {[
                        {
                            icon: 'location_on',
                            title: 'Our Location',
                            content: '123 Parish Way, Madende Village\nSt. Michael Heights, Region 404',
                        },
                        {
                            icon: 'contact_emergency',
                            title: 'Direct Contact',
                            content: 'Phone: +1 (555) 123-4567\nEmail: office@stmichaelmadende.org',
                        },
                        {
                            icon: 'schedule',
                            title: 'Office Hours',
                            content: null,
                            hours: [
                                { day: 'Mon – Fri:', time: '9:00 AM – 5:00 PM' },
                                { day: 'Saturday:', time: '10:00 AM – 2:00 PM' },
                                { day: 'Sunday:', time: 'Closed (Mass Only)', highlight: true },
                            ],
                        },
                    ].map(({ icon, title, content, hours }) => (
                        <div key={title} className="bg-white border border-[#e0bfbf] p-6 rounded-xl flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-[#fed65b] text-[#745c00] p-3 rounded-full shrink-0">
                                <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <div className="w-full">
                                <h4 className="font-serif text-2xl text-[#570013] mb-1">{title}</h4>
                                {content && content.split('\n').map((line, i) => (
                                    <p key={i} className="text-body-md text-[#584141]">{line}</p>
                                ))}
                                {hours && (
                                    <ul className="space-y-1 text-body-md text-[#584141]">
                                        {hours.map(({ day, time, highlight }) => (
                                            <li key={day} className={`flex justify-between ${highlight ? 'text-[#800020] font-semibold' : ''} border-t border-[#e0bfbf]/30 pt-1 first:border-0 first:pt-0`}>
                                                <span>{day}</span><span>{time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Social */}
                    <div className="bg-[#e9e2d3] p-6 rounded-xl">
                        <h4 className="text-label-md text-[#4b463c] uppercase tracking-widest mb-4">Join our Digital Community</h4>
                        <div className="flex gap-4">
                            {[{ icon: 'face_nod', label: 'Facebook' }, { icon: 'play_circle', label: 'YouTube' }, { icon: 'rss_feed', label: 'Blog' }].map(({ icon, label }) => (
                                <a key={icon} href="#" title={label} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#570013] border border-[#e0bfbf] hover:bg-[#570013] hover:text-white transition-all shadow-sm">
                                    <span className="material-symbols-outlined">{icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="bg-[#e9e1dc] rounded-2xl overflow-hidden shadow-inner h-96 relative border border-[#e0bfbf]">
                    <div className="absolute inset-0 opacity-40 bg-cover bg-center">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12413.613858528197!2d34.34668999538447!3d0.4787334552250803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177f830035fa558b%3A0xc93490a4bde2271c!2sSt%20Michael%20madende%20catholic%20church!5e0!3m2!1sen!2ske!4v1783343948700!5m2!1sen!2ske" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-[#e0bfbf] animate-bounce">
                            <span className="material-symbols-outlined text-[#570013] text-3xl">location_on</span>
                            <div>
                                <p className="font-bold text-[#570013]">St. Michael Madende</p>
                                <p className="text-caption text-[#584141]">View on Google Maps</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
