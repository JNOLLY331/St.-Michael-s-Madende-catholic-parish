import React from 'react';
import { Link } from 'react-router-dom';
import { useParishData } from '../hooks/useParishData';
import { useClergyData } from '../hooks/useClergyData';
import { MdArrowForward, MdAutoStories, MdMail, MdVolunteerActivism, MdWorkspacePremium } from 'react-icons/md';
import DynamicIcon from '../components/DynamicIcon';



export default function About() {
  const { parish } = useParishData();
  const { clergy } = useClergyData();
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[530px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuABesmCtEms9BzZA3vR5rsg0YXeSdKNTn6FozThm9ZaYobBYzJB_lOp0viVAFMCzjQVNQnL006bXVVw3sHxSXgzlIjsTHmszed1vQvcLOdU5AGZE-4OM5SQ8F1Ovsi7_NyrBIpVXZbofYy1SEdVbls3VQMHXInxHu3wpdi7LtdTI_YgjTgEdQBUdZav-zVZh0NbT44K7I_j0h__EZreGIw0MVzkvijlt0s1CedWX0sNcQ5egyVm1CQATytaVE4fIdPQI-zCTgZm7iwJ')`,
            }}
          />
          <div className="absolute inset-0 bg-[#570013]/20 backdrop-blur-[2px]" />
          <div className="sacred-gradient absolute inset-0" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-5">
          <span className="text-label-md text-[#570013] uppercase tracking-[0.2em] mb-4 block">Tradition &amp; Community</span>
          <h1 className="text-display-lg text-[#1e1b18] leading-tight mb-6">A Sanctuary of Faith in Madende</h1>
          <p className="text-body-lg text-[#584141] max-w-xl mx-auto">
            Founded on the pillars of prayer and service, our parish has been the spiritual heart of the community for over a century.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className=" max-w-[1200px] mx-auto px-5 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#735c00]">
              <MdAutoStories  />
              <span className="text-label-md uppercase tracking-wider">Our Mission</span>
            </div>
            <h2 className="text-headline-lg text-[#570013]">To know, love, and serve God in our neighbors.</h2>
            <p className="text-body-lg text-[#584141] leading-relaxed">
              {parish.mission || "At St. Michael Madende, we strive to create a vibrant liturgical community where every individual feels the warmth of Christ's love. Our mission is to nourish the spiritual lives of our parishioners through the Sacraments, education, and acts of charity that extend beyond our church walls."}
            </p>
            <div className="pt-4">
              <button className="border border-[#8c7071] text-[#570013] px-8 py-3 rounded-full text-label-md hover:bg-[#e9e1dc] transition-colors">
                Read our Pastoral Plan
              </button>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
              <img
                className="w-full h-full object-cover"
                alt="Parish community gathering"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYm5Urp1fukVfl-u-D8canOcBRVcAlSeb7oraAW8r5BClZ5VPjdsA1VAJlJfbpDomXbbgz8N3kEFx6oPLnsBmncGG-VCwiUm2FTQQBYiHNPQoObCPsTSUBPDN6zeH_SEURa0AgremE_nlpV_5yaNKiVk5fCABQZyF1Q1VFjK2przqEC2B1LGZ4EWboXOBA0dARClO6eJAwXJNu5_rYOpvNubv11o8GrMqtCd5Vo0ouBcshQbiBcFcGjYeJBqKaxvNPTcPyRZ3mmWEE"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[#fed65b] p-6 rounded-xl shadow-lg max-w-[240px] hidden lg:block">
              <MdVolunteerActivism className="text-[#745c00] text-4xl mb-2" />
              <p className="text-body-md text-[#745c00] font-semibold">120+ Years of Continuous Prayer and Community Service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parish History ── */}
      <section className=" bg-[#f5ece7] py-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-16">
          <div className="text-center mb-20">
            <h2 className="text-headline-lg text-[#570013] mb-4">Our Sacred History</h2>
            <div className="decorative-divider max-w-md mx-auto opacity-50">
              <MdWorkspacePremium className="text-[#735c00]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#fff8f5] p-6 rounded-xl border border-[#e0bfbf] shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-2xl text-[#570013] block mb-2">1902</span>
              <h3 className="text-headline-md text-[#1e1b18] mb-4">The Foundation</h3>
              <p className="text-body-md text-[#584141]">
                The first stones were laid by the pioneer families of Madende, who sought a permanent place for the Holy Sacrifice of the Mass in our valley.
              </p>
            </div>
            {/* Card 2 – Tall */}
            <div className="md:row-span-2 bg-[#800020] p-6 rounded-xl flex flex-col justify-end text-white shadow-lg overflow-hidden relative group">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img
                  className="w-full h-full object-cover grayscale"
                  alt="Archival church history"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgT_hg800pBQY1Wa1JmYdY_rC4nav0fj2sAMadsEoaz35wr6L9DmPoADB0ZomxPHIQGoq6CN7yJk8Mtvwt7qVi9wsd-7qBCbspEP-djYMZSSEoWYTF-x2yIHfFlg-NHF7TPmLnbfyEEMwWXDVJ5QJprlVk2nCb0lr7TlVCxw6e3ZKk8leD7_HwHr3bG2M3i6odbXn0f1Wy1SsXrS-zACfLyt3-9dLxlHxUdVo4t-GfYCAOa0moBxlkfFWufsrvYTSvqdD8SgRTYGFs"
                />
              </div>
              <div className="relative z-10">
                <span className="font-serif text-2xl text-[#ffe088] block mb-2">1954</span>
                <h3 className="text-headline-md mb-4">The Great Expansion</h3>
                <p className="text-body-md opacity-90">
                  As the parish grew, the sanctuary was expanded to its current cruciform design, adding the magnificent stained glass windows that define our space today.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-[#fff8f5] p-6 rounded-xl border border-[#e0bfbf] shadow-sm hover:shadow-md transition-shadow">
              <span className="font-serif text-2xl text-[#570013] block mb-2">1988</span>
              <h3 className="text-headline-md text-[#1e1b18] mb-4">Centennial Renovation</h3>
              <p className="text-body-md text-[#584141]">
                A community-led effort restored the original woodwork and updated the parish hall to serve the modern needs of our growing families.
              </p>
            </div>
            {/* Card 4 – Wide */}
            <div className="md:col-span-2 bg-[#fff8f5] p-6 rounded-xl border border-[#e0bfbf] flex flex-col md:flex-row gap-6 items-center shadow-sm">
              <div className="w-full md:w-1/3 aspect-video rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Architectural detail"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqwoNCZ5B9gnFNMxeJ61wBSO3gAJf1zYeAHckAx7XAC05N7VyIVaJt4D_p5wVUcTLDtxRdpQMlQ2MqHoZ3KqKfL28FQmlGa7feOLIYgvfsiu8hMPEkoieNpJEyBaHCBBZWRnxJ7levB5Nr6LJ-uuO21wyTMXBxa1skep9rPCcl6-uiSqjFQlQ28bdAUkJYXrhdMsnKHWIvO3tKdsaEe41CRMPmLzz40JsMRmw55BjluxTqHxXuhC_n5tZ6nJgcPkszScOYcS29n8F-"
                />
              </div>
              <div className="w-full md:w-2/3">
                <span className="font-serif text-2xl text-[#570013] block mb-2">Today</span>
                <h3 className="text-headline-md text-[#1e1b18] mb-4">A Living Legacy</h3>
                <p className="text-body-md text-[#584141]">
                  We continue to build on this foundation, welcoming third and fourth-generation parishioners alongside newcomers finding their home in Madende.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Clergy ── */}
      <section className=" max-w-[1200px] mx-auto px-5 md:px-16 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-4">
          <div className="max-w-xl">
            <h2 className="text-headline-lg text-[#570013] mb-4">Our Clergy</h2>
            <p className="text-body-lg text-[#584141]">
              Guided by faith and dedicated to the spiritual well-being of every parishioner, our priests are here to walk with you on your journey.
            </p>
          </div>
          <Link
            to="/sacraments"
            className="bg-[#570013] text-white px-8 py-3 rounded-full text-label-md flex items-center gap-2 group transition-all hover:pr-10 whitespace-nowrap"
          >
            Sacramental Care
            <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clergy.map(({ role, name, bio, img, action, email }) => (
            <div
              key={name}
              className="bg-[#fff8f5] border border-[#e0bfbf] rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={name} src={img} />
              </div>
              <div className="p-6">
                <span className="text-[#735c00] text-label-md uppercase mb-1 block">{role}</span>
                <h3 className="font-serif text-2xl text-[#570013] mb-2">{name}</h3>
                <p className="text-body-md text-[#584141] mb-4">{bio}</p>
                <div className="flex gap-2">
                  <a href={`mailto:${email}`} className="p-2 rounded-full border border-[#e0bfbf] text-[#570013] hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-colors">
                    <MdMail className="text-xl" />
                  </a>
                  <button className="p-2 rounded-full border border-[#e0bfbf] text-[#570013] hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-colors">
                    <DynamicIcon name={action} className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className=" max-w-[1200px] mx-auto px-5 mb-20">
        <div className="bg-[#413d33] text-white rounded-xl p-6 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#570013] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#735c00] rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl text-[#ffdada] mb-4">Join Our Parish Family</h2>
            <p className="text-body-lg opacity-90 mb-8">
              Whether you are returning to the faith, new to the area, or just seeking a place of peace,
              our doors and hearts are open to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-[#fed65b] text-[#241a00] px-10 py-4 rounded-full text-label-md font-bold hover:scale-105 transition-transform"
              >
                Register as a Parishioner
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border border-[#e0bfbf] text-white px-10 py-4 rounded-full text-label-md hover:bg-white/10 transition-colors"
              >
                Contact Office
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}