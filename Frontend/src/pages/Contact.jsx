import React, { useEffect, useState } from 'react';
import { useParishData } from '../hooks/useParishData';
import { FaCheckCircle, FaSync, FaPaperPlane, FaMapMarkerAlt, FaAddressCard, FaClock, FaFacebookF, FaYoutube, FaRss } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
// ── Integration: contactApi sends the form to POST /api/contact/messages/ ────
import { contactApi } from '../api';
import { toast } from 'react-hot-toast';


export default function Contact() {
    // ── Integration: load parish info (address, phone, email, social links) ───
    const { parish } = useParishData();

    // ── Form submission state ──────────────────────────────────────────────────
    const [sending, setSending] = useState(false);

    // ── Integration: load departments from GET /api/contact/departments/ ───────
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        contactApi.listDepartments()
            .then((data) => {
                const items = Array.isArray(data) ? data : (data?.results ?? []);
                setDepartments(items);
            })
            .catch(() => {
                // Departments are non-critical — the form still works without them
            });
    }, []);

    // ── Controlled form state matching ContactMessage fields ──────────────────
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        department: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ── Integration: submit to POST /api/contact/messages/ ───────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        const payload = {
            full_name: formData.full_name.trim(),
            email: formData.email.trim().toLowerCase(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            // Optional fields — only include if provided
            ...(formData.phone.trim() && { phone: formData.phone.trim() }),
            ...(formData.department && { department: formData.department }),
        };

        const promise = contactApi.sendMessage(payload);
        toast.promise(promise, {
            loading: 'Sending message...',
            success: 'Your message has been sent! We\'ll be in touch shortly.',
            error: (err) => err.message || 'Failed to send message. Please try again.'
        });

        try {
            await promise;
            // Reset the form
            setFormData({ full_name: '', email: '', phone: '', department: '', subject: '', message: '' });
        } catch (err) {
            // Error managed by toast.promise
        } finally {
            setSending(false);
        }
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

                    {/* ── Integration: all inputs are controlled; form submits to the API ─ */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md text-[#584141]" htmlFor="full-name">Full Name</label>
                                <input
                                    id="full-name"
                                    name="full_name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md text-[#584141]" htmlFor="contact-email">Email Address</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-label-md text-[#584141]" htmlFor="contact-phone">Phone <span className="opacity-60">(optional)</span></label>
                            <input
                                id="contact-phone"
                                name="phone"
                                type="tel"
                                placeholder="+254 700 000 000"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                            />
                        </div>

                        {/* ── Integration: department select populated from the API ─────── */}
                        {departments.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <label className="text-label-md text-[#584141]" htmlFor="contact-dept">Department</label>
                                <select
                                    id="contact-dept"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                                >
                                    <option value="">— Select a department (optional) —</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-label-md text-[#584141]" htmlFor="contact-subject">Subject</label>
                            <input
                                id="contact-subject"
                                name="subject"
                                type="text"
                                placeholder="How can we help you?"
                                required
                                minLength={5}
                                value={formData.subject}
                                onChange={handleChange}
                                className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-label-md text-[#584141]" htmlFor="contact-message">Your Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={6}
                                placeholder="Share your thoughts, questions or intentions…"
                                required
                                minLength={10}
                                maxLength={5000}
                                value={formData.message}
                                onChange={handleChange}
                                className="bg-white border border-[#e0bfbf] rounded-lg p-3 text-body-md focus:outline-none focus:border-[#570013] focus:ring-1 focus:ring-[#570013] transition-all resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className={`w-full py-4 rounded-lg text-label-md text-white flex items-center justify-center gap-2 group transition-all bg-[#800020] hover:bg-[#570013] disabled:opacity-60`}
                        >
                            {sending ? (
                                <><FaSync size={20} className="animate-spin" /> Sending…</>
                            ) : (
                                <><span>Send Message</span><FaPaperPlane size={18} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </div>

                {/* Contact Info (unchanged, still uses parish data from the hook) */}
                <div className="lg:col-span-5 space-y-6">
                    {[
                        {
                            icon: <FaMapMarkerAlt size={24} />,
                            title: 'Our Location',
                            content: parish.address,
                        },
                        {
                            icon: <FaAddressCard size={24} />,
                            title: 'Direct Contact',
                            content: `Phone: ${parish.phone}\nEmail: ${parish.email}`,
                        },
                        {
                            icon: <FaClock size={24} />,
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
                            <div className="bg-[#fed65b] text-[#745c00] p-3 rounded-full shrink-0 flex items-center justify-center">
                                {icon}
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
                            {parish.facebook && (
                                <a href={parish.facebook} title="Facebook" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#570013] border border-[#e0bfbf] hover:bg-[#570013] hover:text-white transition-all shadow-sm">
                                    <FaFacebookF size={20} />
                                </a>
                            )}
                            {parish.youtube && (
                                <a href={parish.youtube} title="YouTube" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#570013] border border-[#e0bfbf] hover:bg-[#570013] hover:text-white transition-all shadow-sm">
                                    <FaYoutube size={20} />
                                </a>
                            )}
                            <a href={parish.website ? parish.website : '#'} title="Website" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#570013] border border-[#e0bfbf] hover:bg-[#570013] hover:text-white transition-all shadow-sm">
                                <FaRss size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map */}
            <section className="max-w-[1200px] mx-auto px-5 md:px-16 mb-20">
                <div className="bg-[#e9e1dc] rounded-2xl overflow-hidden shadow-inner h-96 relative border border-[#e0bfbf]">
                    <div className="absolute inset-0 bg-cover bg-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12413.613858528197!2d34.34668999538447!3d0.4787334552250803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177f830035fa558b%3A0xc93490a4bde2271c!2sSt%20Michael%20madende%20catholic%20church!5e0!3m2!1sen!2ske!4v1783343948700!5m2!1sen!2ske"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="St. Michael Madende Catholic Church Location"
                        />
                    </div>
                    <div className="absolute inset- flex items-center justify-right p-35">
                        <div className="bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-[#e0bfbf]">
                            <FaMapMarkerAlt size={28} className="text-[#570013]" />
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
