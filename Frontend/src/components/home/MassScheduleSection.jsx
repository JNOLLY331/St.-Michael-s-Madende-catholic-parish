import { useRef, useEffect, useState } from 'react';
import { MdChurch, MdWatchLater, MdMenuBook, MdFavorite, MdStars, MdAccessTime } from 'react-icons/md';

const SUNDAY_MASSES = [
  { name: 'Morning Mass', time: '07:30 AM' },
  { name: 'Parish Mass', time: '09:30 AM' },
  { name: 'Youth Mass', time: '11:30 AM' },
];

const DAILY_DEVOTIONS = [
  { label: 'Mon – Fri', time: '6:30 AM', icon: MdWatchLater, detail: 'Daily Mass' },
  { label: 'Saturday', time: '7:00 AM', icon: MdMenuBook, detail: 'Morning Prayer' },
  { label: 'Confession', time: 'Sat 4 PM', icon: MdFavorite, detail: 'Reconciliation' },
  { label: 'Adoration', time: 'Fri 5 PM', icon: MdStars, detail: 'Eucharistic' },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/** Quick-access cards for Sunday Mass times and daily devotions. */
export default function MassScheduleSection() {
  const [sectionRef, visible] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative border-y border-[#e0bfbf] overflow-hidden"
    >
      {/* Pure CSS decorative background — no external textures */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(87,0,19,0.04) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#570013]/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#ffe088]/10 translate-x-1/3 translate-y-1/3 pointer-events-none blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-[#735c00] uppercase mb-4">
            <span className="w-6 h-px bg-[#735c00]/50" />
            Join Our Community
            <span className="w-6 h-px bg-[#735c00]/50" />
          </span>
          <h2
            className="text-4xl md:text-6xl text-[#570013] mb-4 leading-tight"
            style={{ fontFamily: 'EB Garamond, Georgia, serif', fontWeight: 700 }}
          >
            Mass Times &amp; Devotions
          </h2>
          <p className="text-[#584141] text-base md:text-lg max-w-xl mx-auto font-light">
            Come worship with us. All are welcome at the table of the Lord.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-8 h-px bg-[#e0bfbf]" />
            <div className="w-2 h-2 rotate-45 bg-[#570013]" />
            <div className="w-8 h-px bg-[#e0bfbf]" />
          </div>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 shadow-2xl border border-[#e0bfbf]">

          {/* ── Sunday Mass Card ── */}
          <div
            className="lg:col-span-5 bg-[#fff8f5] p-8 md:p-12 lg:border-r border-b lg:border-b-0 border-[#e0bfbf] relative overflow-hidden group transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-50px)',
              transitionDelay: '150ms'
            }}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#570013] via-[#800020] to-[#570013]" />

            {/* Decorative watermark icon */}
            <MdChurch className="absolute -bottom-6 -right-6 text-[200px] text-[#570013] opacity-[0.035] group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-1000 pointer-events-none" />

            <div className="relative z-10">
              {/* Card header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-[#570013] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MdChurch className="text-[#ffe088] text-2xl" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#570013]">Sunday Mass</h3>
                  <p className="text-[#735c00] text-xs font-bold tracking-widest uppercase mt-0.5">Eucharistic Celebration</p>
                </div>
              </div>

              {/* Mass rows */}
              <div className="space-y-0 border border-[#e0bfbf]">
                {SUNDAY_MASSES.map(({ name, time }, idx) => (
                  <div
                    key={name}
                    className="flex justify-between items-center p-4 md:p-5 border-b border-[#e0bfbf] last:border-b-0 hover:bg-[#570013]/5 transition-colors duration-200 group/row"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                      transitionDelay: `${300 + idx * 100}ms`,
                      transition: 'opacity 0.5s ease, transform 0.5s ease, background-color 0.2s ease'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#570013] rotate-45 group-hover/row:rotate-90 transition-transform duration-300 flex-shrink-0" />
                      <span className="text-[#584141] font-semibold text-sm md:text-base">{name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#ffe088] px-3 py-1.5 border border-[#735c00]/20">
                      <MdAccessTime className="text-[#570013] text-sm" />
                      <span className="font-bold text-[#570013] text-sm md:text-base tracking-widest">{time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[#8c7071] text-xs font-medium italic">
                * Schedule may change on public holidays. Check the notice board.
              </p>
            </div>
          </div>

          {/* ── Daily Devotion Card ── */}
          <div
            className="lg:col-span-7 relative overflow-hidden group transition-all duration-700"
            style={{
              background: 'linear-gradient(135deg, #570013 0%, #3a000d 50%, #2b0009 100%)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(50px)',
              transitionDelay: '200ms'
            }}
          >
            {/* Animated gold top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 z-10"
              style={{
                background: 'linear-gradient(90deg, transparent, #ffe088, #ffb347, #ffe088, transparent)',
                backgroundSize: '300% 100%',
                animation: 'glowBarSweep 3.5s linear infinite'
              }}
            />

            {/* Decorative rings */}
            <div className="devotion-card__ring devotion-card__ring--1" />
            <div className="devotion-card__ring devotion-card__ring--2" />

            {/* Watermark */}
            <MdChurch className="absolute -bottom-10 -right-10 text-[220px] text-white opacity-[0.04] group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />

            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
              {/* Header */}
              <div className="mb-8">
                <h3
                  className="font-serif font-bold text-2xl md:text-4xl text-[#ffe088] mb-4"
                  style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease', transitionDelay: '350ms' }}
                >
                  Daily Devotion
                </h3>
                <blockquote
                  className="text-base text-white/75 italic font-light leading-relaxed border-l-2 border-[#ffe088] pl-4"
                  style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease', transitionDelay: '450ms' }}
                >
                  "For where two or three are gathered in my name, there am I among them."
                  <cite className="block text-[#ffe088]/70 text-xs mt-1 not-italic font-semibold tracking-wider">— Matthew 18:20</cite>
                </blockquote>
              </div>

              {/* Devotion tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 mt-auto">
                {DAILY_DEVOTIONS.map(({ label, time, icon: Icon, detail }, idx) => (
                  <div
                    key={label}
                    className="devotion-time-tile bg-white/8 border border-[#ffe088]/20 p-4 cursor-default group/tile"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                      transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                      transitionDelay: `${500 + idx * 100}ms`
                    }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#ffe088]/15 flex items-center justify-center mb-3 group-hover/tile:bg-[#ffe088]/30 transition-colors duration-300">
                      <Icon className="text-[#ffe088] text-lg" />
                    </div>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-0.5">{label}</p>
                    <p className="text-[10px] text-[#ffe088]/60 font-medium mb-1">{detail}</p>
                    <p className="font-serif font-bold text-lg md:text-xl text-white tracking-wide">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
