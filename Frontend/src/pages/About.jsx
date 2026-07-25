import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useParishData } from '../hooks/useParishData';
import { useClergyData } from '../hooks/useClergyData';
import { MdArrowForward, MdAutoStories, MdMail, MdVolunteerActivism, MdWorkspacePremium, MdDiamond } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
};

export default function About() {
  const { parish } = useParishData();
  const { clergy } = useClergyData();

  return (
    <div className="overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative h-[530px] flex items-center justify-center pt-20">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuABesmCtEms9BzZA3vR5rsg0YXeSdKNTn6FozThm9ZaYobBYzJB_lOp0viVAFMCzjQVNQnL006bXVVw3sHxSXgzlIjsTHmszed1vQvcLOdU5AGZE-4OM5SQ8F1Ovsi7_NyrBIpVXZbofYy1SEdVbls3VQMHXInxHu3wpdi7LtdTI_YgjTgEdQBUdZav-zVZh0NbT44K7I_j0h__EZreGIw0MVzkvijlt0s1CedWX0sNcQ5egyVm1CQATytaVE4fIdPQI-zCTgZm7iwJ')`,
            }}
          />
          <div className="absolute inset-0 bg-[#570013]/30 backdrop-blur-[1px]" />
          <div className="sacred-gradient absolute inset-0 opacity-80" />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-3xl px-5 mt-10"
        >
          <motion.span variants={fadeUp} className="text-label-md text-[#570013] font-bold uppercase tracking-[0.2em] mb-4 block">
            Tradition &amp; Community
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-display-lg text-black font-black leading-tight mb-6 drop-shadow-md">
            A Sanctuary of Faith in Madende
          </motion.h1>
          <motion.p variants={fadeUp} className="text-body-lg text-[#1e1b18] font-medium max-w-xl mx-auto italic drop-shadow-md">
            Founded on the pillars of prayer and service, our parish has been the spiritual heart of the community for over a century.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="md:col-span-7 space-y-8"
          >
            {/* Mission Block */}
            <motion.div variants={fadeUp} className="bg-[#fff8f5] p-8 border-l-4 border-[#570013] shadow-sm">
              <div className="inline-flex items-center gap-2 text-[#735c00] mb-4">
                <MdAutoStories className="text-xl" />
                <span className="text-label-md uppercase tracking-wider font-bold">Our Parish Mission</span>
              </div>
              <h3 className="text-2xl font-serif text-[#570013] mb-4 leading-tight">To know, love, and serve God in our neighbors.</h3>
              <p className="text-body-md text-[#584141] leading-relaxed">
                {parish.mission || "At St. Michael Madende, we strive to create a vibrant liturgical community where every individual feels the warmth of Christ's love. Our mission is to nourish the spiritual lives of our parishioners through the Sacraments, education, and acts of charity that extend beyond our church walls."}
              </p>
            </motion.div>

            {/* Vision Block */}
            <motion.div variants={fadeUp} className="bg-[#f0e6e6] p-8 border-l-4 border-[#735c00] shadow-sm">
              <div className="inline-flex items-center gap-2 text-[#570013] mb-4">
                <MdDiamond className="text-xl" />
                <span className="text-label-md uppercase tracking-wider font-bold">Our Parish Vision</span>
              </div>
              <h3 className="text-2xl font-serif text-[#735c00] mb-4 leading-tight">A Beacon of Christ's Light in the Valley.</h3>
              <p className="text-body-md text-[#584141] leading-relaxed">
                We envision a parish fully alive in the Holy Spirit, united in the Eucharist, and dedicated to transforming our society through authentic Christian witness, holistic family life, and unyielding service to the vulnerable.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-2">
              <button className="border border-[#570013] text-[#570013] px-8 py-3 font-bold text-sm hover:bg-[#570013] hover:text-[#ffe088] transition-colors"
                style={{ borderRadius: 0 }}>
                Download Pastoral Plan
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageReveal}
            className="md:col-span-5 relative"
          >
            <div className="aspect-[3/4] overflow-hidden shadow-2xl border border-[#e0bfbf]">
              <img loading="lazy" decoding="async"
                className="w-full h-full object-cover"
                alt="Parish community gathering"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYm5Urp1fukVfl-u-D8canOcBRVcAlSeb7oraAW8r5BClZ5VPjdsA1VAJlJfbpDomXbbgz8N3kEFx6oPLnsBmncGG-VCwiUm2FTQQBYiHNPQoObCPsTSUBPDN6zeH_SEURa0AgremE_nlpV_5yaNKiVk5fCABQZyF1Q1VFjK2przqEC2B1LGZ4EWboXOBA0dARClO6eJAwXJNu5_rYOpvNubv11o8GrMqtCd5Vo0ouBcshQbiBcFcGjYeJBqKaxvNPTcPyRZ3mmWEE"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-12 bg-[#fed65b] p-6 shadow-xl max-w-[240px] hidden lg:block border border-[#745c00]/20"
              style={{ borderRadius: 0 }}
            >
              <MdVolunteerActivism className="text-[#745c00] text-4xl mb-2" />
              <p className="text-body-md text-[#745c00] font-bold">120+ Years of Continuous Prayer and Community Service.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Parish History ── */}
      <section className="bg-[#f5ece7] py-20 border-y border-[#e0bfbf]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-display-lg text-[#570013] mb-4">Our Sacred History</h2>
            <div className="decorative-divider max-w-md mx-auto opacity-70">
              <MdWorkspacePremium className="text-[#735c00] text-xl" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <motion.div variants={fadeUp} className="bg-[#fff8f5] p-8 border border-[#e0bfbf] shadow-sm hover:shadow-lg transition-shadow group">
              <span className="font-serif text-3xl text-[#735c00] block mb-3 opacity-90 group-hover:scale-105 origin-left transition-transform">1902</span>
              <h3 className="text-headline-md text-[#570013] mb-4">The Foundation</h3>
              <p className="text-body-md text-[#584141]">
                The first stones were laid by the pioneer families of Madende, who sought a permanent place for the Holy Sacrifice of the Mass in our valley.
              </p>
            </motion.div>

            {/* Card 2 – Tall */}
            <motion.div variants={fadeUp} className="md:row-span-2 bg-[#800020] p-8 flex flex-col justify-end text-white shadow-xl overflow-hidden relative group border border-[#570013]">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <img loading="lazy" decoding="async"
                  className="w-full h-full object-cover grayscale mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
                  alt="Archival church history"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgT_hg800pBQY1Wa1JmYdY_rC4nav0fj2sAMadsEoaz35wr6L9DmPoADB0ZomxPHIQGoq6CN7yJk8Mtvwt7qVi9wsd-7qBCbspEP-djYMZSSEoWYTF-x2yIHfFlg-NHF7TPmLnbfyEEMwWXDVJ5QJprlVk2nCb0lr7TlVCxw6e3ZKk8leD7_HwHr3bG2M3i6odbXn0f1Wy1SsXrS-zACfLyt3-9dLxlHxUdVo4t-GfYCAOa0moBxlkfFWufsrvYTSvqdD8SgRTYGFs"
                />
              </div>
              <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="font-serif text-3xl text-[#ffe088] block mb-3">1954</span>
                <h3 className="text-headline-md mb-4 text-white">The Great Expansion</h3>
                <p className="text-body-md text-white/90">
                  As the parish grew, the sanctuary was expanded to its current cruciform design, adding the magnificent stained glass windows that define our space today.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUp} className="bg-[#fff8f5] p-8 border border-[#e0bfbf] shadow-sm hover:shadow-lg transition-shadow group">
              <span className="font-serif text-3xl text-[#735c00] block mb-3 opacity-90 group-hover:scale-105 origin-left transition-transform">1988</span>
              <h3 className="text-headline-md text-[#570013] mb-4">Centennial Renovation</h3>
              <p className="text-body-md text-[#584141]">
                A community-led effort restored the original woodwork and updated the parish hall to serve the modern needs of our growing families.
              </p>
            </motion.div>

            {/* Card 4 – Wide */}
            <motion.div variants={fadeUp} className="md:col-span-2 bg-[#fff8f5] p-0 md:pl-0 border border-[#e0bfbf] flex flex-col md:flex-row items-stretch shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="w-full md:w-5/12 overflow-hidden bg-black">
                <img loading="lazy" decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 opacity-90"
                  alt="Architectural detail"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqwoNCZ5B9gnFNMxeJ61wBSO3gAJf1zYeAHckAx7XAC05N7VyIVaJt4D_p5wVUcTLDtxRdpQMlQ2MqHoZ3KqKfL28FQmlGa7feOLIYgvfsiu8hMPEkoieNpJEyBaHCBBZWRnxJ7levB5Nr6LJ-uuO21wyTMXBxa1skep9rPCcl6-uiSqjFQlQ28bdAUkJYXrhdMsnKHWIvO3tKdsaEe41CRMPmLzz40JsMRmw55BjluxTqHxXuhC_n5tZ6nJgcPkszScOYcS29n8F-"
                />
              </div>
              <div className="w-full md:w-7/12 p-8 flex flex-col justify-center">
                <span className="font-serif text-3xl text-[#735c00] block mb-3">Today</span>
                <h3 className="text-headline-md text-[#570013] mb-4">A Living Legacy</h3>
                <p className="text-body-md text-[#584141]">
                  We continue to build on this foundation, welcoming third and fourth-generation parishioners alongside newcomers finding their home in Madende.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Clergy ── */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-16 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-xl">
            <h2 className="text-display-lg text-[#570013] mb-4">Our Clergy</h2>
            <p className="text-body-lg text-[#584141]">
              Guided by faith and dedicated to the spiritual well-being of every parishioner, our priests are here to walk with you on your journey.
            </p>
          </div>
          <Link
            to="/sacraments"
            className="bg-[#570013] text-[#ffe088] font-bold px-8 py-3 text-sm flex items-center gap-2 group transition-all hover:bg-[#800020] whitespace-nowrap"
            style={{ borderRadius: 0 }}
          >
            Sacramental Care
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {clergy.map(({ role, name, bio, img, action, email }) => (
            <motion.div
              variants={fadeUp}
              key={name}
              className="bg-white border border-[#e0bfbf] overflow-hidden shadow-sm hover:shadow-[0_15px_30px_-5px_rgba(87,0,19,0.15)] transition-all duration-500 group flex flex-col"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-[#222]">
                <img loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700" alt={name} src={img} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#570013]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-[#735c00] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">{role}</span>
                <h3 className="font-serif text-3xl text-[#570013] mb-4">{name}</h3>
                <p className="text-body-md text-[#584141] mb-6 flex-1">{bio}</p>
                <div className="flex gap-3 pt-4 border-t border-[#e0bfbf]">
                  <a href={`mailto:${email}`} className="p-2 border border-[#e0bfbf] text-[#570013] hover:bg-[#570013] hover:text-[#ffe088] hover:border-[#570013] transition-colors" title="Email">
                    <MdMail className="text-xl" />
                  </a>
                  <button className="p-2 border border-[#e0bfbf] text-[#570013] hover:bg-[#570013] hover:text-[#ffe088] hover:border-[#570013] transition-colors" title="Contact">
                    <DynamicIcon name={action} className="text-xl" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1200px] mx-auto px-5 mb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageReveal}
          className="relative overflow-hidden shadow-2xl border border-[#570013]"
          style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-none blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ffe088] rounded-none blur-[120px]" />
          </div>
          <div className="relative z-10 text-center max-w-2xl mx-auto py-16 md:py-24 px-6 md:px-0">
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-[#ffe088] mb-6">
              Join Our Parish Family
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body-lg text-white/90 mb-10">
              Whether you are returning to the faith, new to the area, or just seeking a place of peace,
              our doors and hearts are open to you.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-[#ffe088] text-[#570013] px-10 py-3.5 font-bold hover:bg-white transition-colors uppercase tracking-widest text-xs"
                style={{ borderRadius: 0 }}
              >
                Register as a Parishioner
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border border-[#ffe088] text-[#ffe088] px-10 py-3.5 font-bold hover:bg-[#ffe088]/10 transition-colors uppercase tracking-widest text-xs"
                style={{ borderRadius: 0 }}
              >
                Contact Office
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}