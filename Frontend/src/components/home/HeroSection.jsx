import { useEffect, useRef, useState } from 'react';
import { MdChurch, MdKeyboardArrowDown, MdMenuBook, MdLocationOn, MdSchedule, MdPeople } from 'react-icons/md';
import { motion } from 'framer-motion';

/* ─── Animated floating particle ─── */
function Particle({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: style.size,
        height: style.size,
        left: style.x,
        top: style.y,
        background: style.color,
        opacity: 0,
        animation: `heroFloat ${style.duration}s ease-in-out ${style.delay}s infinite alternate`,
        filter: 'blur(1px)',
      }}
    />
  );
}

/* ─── Hero stat pill ─── */
function StatPill({ icon: Icon, value, label, delay }) {
  return (
    <div
      className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl border border-white/15 whitespace-nowrap shrink-0"
      style={{
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        animation: `fadeSlideUp 0.7s ease both`,
        animationDelay: delay,
      }}
    >
      <div
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #570013, #800020)' }}
      >
        <Icon className="text-[#ffe088] text-xs sm:text-base" />
      </div>
      <div>
        <p className="font-oswald font-bold text-white text-[11px] sm:text-sm leading-tight">{value}</p>
        <p className="text-white/50 text-[8px] sm:text-[10px] tracking-wider uppercase leading-tight">{label}</p>
      </div>
    </div>
  );
}

/* ─── Skeleton shimmer shown while hero data loads ─── */
function HeroSkeleton() {
  return (
    <section className="relative h-[92vh] min-h-[640px] flex items-center overflow-hidden bg-[#120508]">
      {/* Animated gradient backdrop */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, #3a000d 0%, transparent 60%), radial-gradient(ellipse 70% 80% at 80% 80%, #1a1000 0%, transparent 55%), #120508',
        }}
      />
      {/* Animated shimmer spotlight */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle 600px at 30% 50%, rgba(87,0,19,0.3) 0%, transparent 70%)',
          animation: 'heroPulse 3s ease-in-out infinite',
        }}
      />
      <div className="relative z-10 w-full px-6 md:px-16 max-w-[1400px] mx-auto flex items-center justify-between gap-10">
        <div className="max-w-2xl space-y-6 animate-pulse">
          <div className="h-3 w-40 rounded-full bg-white/10" />
          <div className="space-y-3">
            <div className="h-12 w-96 max-w-full rounded-xl bg-white/10" />
            <div className="h-12 w-72 max-w-full rounded-xl bg-[#ffe088]/10" />
          </div>
          <div className="h-5 w-80 max-w-full rounded-lg bg-white/6" />
          <div className="flex gap-3">
            <div className="h-12 w-40 rounded-full bg-white/10" />
            <div className="h-12 w-32 rounded-full bg-white/6" />
          </div>
        </div>
        {/* Reading card skeleton */}
        <div className="hidden lg:block w-full max-w-sm animate-pulse">
          <div className="rounded-3xl border border-white/10 p-10 space-y-4" style={{ background: 'rgba(15,5,10,0.5)', backdropFilter: 'blur(20px)' }}>
            <div className="h-2 w-24 mx-auto rounded-full bg-white/10" />
            <div className="h-8 w-32 mx-auto rounded-xl bg-white/10" />
            <div className="space-y-2 pt-4">
              <div className="h-3 w-full rounded bg-white/8" />
              <div className="h-3 w-full rounded bg-white/8" />
              <div className="h-3 w-3/4 rounded bg-white/8" />
            </div>
          </div>
        </div>
      </div>
      {/* Loading indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          {[0, 0.15, 0.3].map((d, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#ffe088]/50 animate-bounce" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Full-height hero banner with the day's Gospel reading preview.
 *
 * Props:
 *   hero    – normalized payload from useHeroData() (or null while loading)
 *   loading – true while the backend fetch is in-flight
 *   gospel  – today's reading data from useDailyGospel()
 */
export default function HeroSection({ hero, loading, gospel, onNavigate, onOpenGospelModal }) {
  const sectionRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleButtonClick = (link) => {
    if (!link || link === '#') onOpenGospelModal();
    else onNavigate(link);
  };

  // ── Show skeleton while loading ──────────────────────────────────────────
  if (loading || !hero) return <HeroSkeleton />;

  // ── Decorative particles ─────────────────────────────────────────────────
  const particles = [
    { size: '6px', x: '15%', y: '20%', color: 'rgba(255,224,136,0.6)', duration: 5, delay: 0 },
    { size: '4px', x: '80%', y: '15%', color: 'rgba(255,224,136,0.4)', duration: 7, delay: 1 },
    { size: '8px', x: '70%', y: '70%', color: 'rgba(255,130,138,0.3)', duration: 6, delay: 0.5 },
    { size: '5px', x: '25%', y: '75%', color: 'rgba(255,224,136,0.5)', duration: 8, delay: 2 },
    { size: '4px', x: '90%', y: '45%', color: 'rgba(255,224,136,0.3)', duration: 9, delay: 1.5 },
    { size: '6px', x: '5%', y: '55%', color: 'rgba(255,224,136,0.4)', duration: 6, delay: 3 },
    { size: '3px', x: '50%', y: '10%', color: 'rgba(255,255,255,0.3)', duration: 7, delay: 0.8 },
    { size: '5px', x: '35%', y: '85%', color: 'rgba(255,224,136,0.3)', duration: 5, delay: 2.5 },
  ];

  const stats = [
    { icon: MdSchedule, value: 'Sun 9:00 AM', label: 'Main Mass' },
    { icon: MdPeople, value: '3,200+', label: 'Parishioners' },
    { icon: MdLocationOn, value: 'Madende', label: 'Location' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-[92vh] min-h-[640px] flex items-center overflow-hidden"
    >
      {/* ── CSS keyframes injected once ── */}
      <style>{`
        @keyframes heroFloat {
          from { opacity: 0; transform: translateY(0px) scale(1); }
          to   { opacity: 1; transform: translateY(-18px) scale(1.15); }
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroTitleIn {
          from { opacity: 0; transform: translateY(30px) skewY(1deg); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
        @keyframes readingCardIn {
          from { opacity: 0; transform: translateX(40px) rotateY(-8deg); }
          to   { opacity: 1; transform: translateX(0) rotateY(0deg); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* ── Background image layer with parallax ── */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {hero.image ? (
          <>
            {/* Preload the image invisibly so it fades in smoothly */}
            <img
              src={hero.image}
              alt=""
              className="sr-only"
              onLoad={() => setImgLoaded(true)}
            />
            <div
              className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url('${hero.image}')`,
                opacity: imgLoaded ? 1 : 0,
                scale: '1.05',
              }}
            />
          </>
        ) : (
          /* Rich gradient fallback */
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 20% 50%, #4a0010 0%, transparent 60%), radial-gradient(ellipse 70% 80% at 80% 80%, #1a0c00 0%, transparent 55%), linear-gradient(160deg, #1a0508 0%, #2d0010 40%, #1a0a00 100%)',
            }}
          />
        )}
      </div>

      {/* ── Multi-layer overlay for depth ── */}
      <div className="absolute inset-0 z-1" style={{
        background: 'linear-gradient(105deg, rgba(10,2,5,0.82) 0%, rgba(15,4,8,0.55) 45%, rgba(5,2,2,0.70) 100%)',
      }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-1" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }} />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 z-1" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
      }} />

      {/* ── Ambient glow spots ── */}
      <div
        className="absolute z-1 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          left: '-10%',
          top: '-20%',
          background: 'radial-gradient(circle, rgba(87,0,19,0.35) 0%, transparent 70%)',
          animation: 'heroPulse 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute z-1 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          right: '15%',
          bottom: '-10%',
          background: 'radial-gradient(circle, rgba(115,92,0,0.2) 0%, transparent 70%)',
          animation: 'heroPulse 7s ease-in-out 2s infinite',
        }}
      />

      {/* ── Floating golden particles ── */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

      {/* ── Decorative geometric lines ── */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[40%]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,224,136,0.15), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-[30%] w-[25%] h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,224,136,0.1), transparent)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full px-6 md:px-16 max-w-[1400px] mx-auto flex items-center justify-between gap-10">

        {/* ── Left: Text content ── */}
        <div className="max-w-2xl text-white">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            style={{ animation: 'fadeSlideUp 0.6s ease both', animationDelay: '0.05s' }}
          >
            <div className="w-6 sm:w-8 h-[1px]" style={{ background: 'linear-gradient(to right, rgba(255,224,136,0.6), transparent)' }} />
            <p className="font-oswald tracking-[0.2em] sm:tracking-[0.35em] text-[#ffe088] uppercase text-[10px] sm:text-xs font-medium">
              {hero.eyebrow}
            </p>
            <div className="w-6 sm:w-8 h-[1px]" style={{ background: 'linear-gradient(to left, rgba(255,224,136,0.6), transparent)' }} />
          </div>

          {/* Headline — cinematic entrance */}
          <h1
            className="mb-3 sm:mb-5 leading-[1.1] tracking-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 5.5vw, 4.8rem)',
              fontWeight: 700,
              animation: 'heroTitleIn 0.8s cubic-bezier(0.22,1,0.36,1) both',
              animationDelay: '0.15s',
              color: '#ffffff',
              textShadow: '0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbbbbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaaaaa, 0 6px 1px rgba(0,0,0,0.1), 0 0 5px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.3), 0 3px 5px rgba(0,0,0,0.2), 0 5px 10px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.2), 0 20px 20px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.4), 0 0 45px rgba(255,224,136,0.3)',
            }}
          >
            {hero.headingLine1}
            {hero.headingLine2 && (
              <>
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #ffe088 0%, #f5c842 50%, #ffe88a 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'shimmer 4s linear infinite',
                  }}
                >
                  {hero.headingLine2}
                </span>
              </>
            )}
            <br />
            <span
              className="relative inline-block mt-3"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#ffe088',
                textShadow: '0 1px 0 #c5832b, 0 2px 0 #a3691f, 0 3px 0 #855314, 0 4px 0 #6b400d, 0 5px 10px rgba(0,0,0,0.5), 0 0 20px rgba(255, 224, 136, 0.7), 0 0 40px rgba(197, 131, 43, 0.5)',
                verticalAlign: 'bottom'
              }}
            >
              {/* Invisible placeholder to establish the bounds correctly */}
              <span className="opacity-0 tracking-wide">Catholic Church</span>

              {/* Animated layer using Framer Motion */}
              <motion.span
                className="absolute left-0 top-0 bottom-0 whitespace-nowrap overflow-hidden border-r-[4px] border-[#ffe088] tracking-wide"
                style={{ filter: 'drop-shadow(4px 0 8px rgba(255,224,136,0.6))' }}
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "100%", "100%", "0%"] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1]
                }}
              >
                Catholic Church
              </motion.span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-white/65 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg"
            style={{ animation: 'fadeSlideUp 0.7s ease both', animationDelay: '0.35s' }}
          >
            A community rooted in faith, nourished by the Eucharist, and called to serve.
            <span className="text-[#ffe088]/80"> All are welcome.</span>
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-10"
            style={{ animation: 'fadeSlideUp 0.7s ease both', animationDelay: '0.5s' }}
          >
            {hero.primaryButtonText && (
              <button
                onClick={() => handleButtonClick(hero.primaryButtonLink)}
                className="group relative overflow-hidden px-8 py-4 rounded-full font-oswald font-bold text-base uppercase tracking-wide flex items-center justify-center gap-2 shadow-2xl transition-transform hover:scale-105 active:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #ffe088 0%, #f5c842 100%)',
                  color: '#40000b',
                  boxShadow: '0 10px 40px rgba(255,224,136,0.3)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #fff3b0 0%, #ffe088 100%)' }}
                />
                <MdMenuBook className="relative z-10 text-xl flex-shrink-0" />
                <span className="relative z-10">{hero.primaryButtonText}</span>
              </button>
            )}
            {hero.secondaryButtonText && (
              <button
                onClick={() => handleButtonClick(hero.secondaryButtonLink)}
                className="px-8 py-4 rounded-full font-oswald font-bold text-base uppercase tracking-wide transition-all hover:scale-105 active:scale-100"
                style={{
                  border: '2px solid rgba(255,255,255,0.25)',
                  color: 'white',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
              >
                {hero.secondaryButtonText}
              </button>
            )}
          </div>

          {/* Stat pills */}
          <div
            className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 overflow-x-auto pb-2 -mb-2 sm:pb-0 sm:mb-0 hide-scrollbar"
            style={{ animation: 'fadeSlideUp 0.7s ease both', animationDelay: '0.65s' }}
          >
            {stats.map((s, i) => (
              <StatPill key={i} {...s} delay={`${0.7 + i * 0.1}s`} />
            ))}
          </div>
        </div>

        {/* ── Right: Gospel reading card ── */}
        <div
          className="hidden lg:block w-full max-w-[500px] shrink-0"
          style={{ animation: 'readingCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.3s' }}
        >
          <div
            className="relative rounded-3xl text-center text-white overflow-hidden"
            style={{
              background: 'rgba(8, 2, 5, 0.65)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.13)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Card shimmer border top */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,224,136,0.6), transparent)' }}
            />

            {/* Card glow */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,224,136,0.14) 0%, transparent 70%)' }}
            />

            <div className="px-12 py-12">
              {/* Label */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-[#ffe088]/40" />
                <p className="font-oswald tracking-[0.4em] text-[#ffe088] uppercase text-xs font-semibold">Daily Reading</p>
                <div className="w-8 h-[1px] bg-[#ffe088]/40" />
              </div>

              <p className="text-white/55 text-sm mb-6 tracking-widest uppercase font-oswald">{gospel.date}</p>

              {/* Book & citation */}
              <div className="mb-7">
                <p className="font-oswald font-bold text-white text-3xl mb-3 tracking-wide leading-tight">{gospel.book}</p>
                <span
                  className="inline-block text-sm font-oswald tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(255,224,136,0.15)', color: '#ffe088', border: '1px solid rgba(255,224,136,0.25)' }}
                >
                  {gospel.citation}
                </span>
              </div>

              {/* Divider */}
              <div className="w-16 h-[1px] mx-auto mb-7 bg-white/10" />

              {/* Opening quote mark + text */}
              <div className="relative mb-6">
                <svg viewBox="0 0 50 40" className="w-14 h-auto absolute -top-3 -left-1 opacity-35 fill-[#ffe088]" aria-hidden="true">
                  <path d="M0 24C0 12 8 3 19 0l2 6C13 8 9 13 9 19h10v14H0v-9zM27 24c0-12 8-21 19-24l2 6c-8 2-12 7-12 13h10v14H27v-9z" />
                </svg>

                {/* Text with fade-out — taller to show more text */}
                <div className="relative overflow-hidden" style={{ maxHeight: '10rem' }}>
                  <p
                    className="text-white/90 leading-[1.75] text-left pl-8"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1.15rem',
                      textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                    }}
                  >
                    {gospel.loading ? "Loading today's Gospel…" : gospel.text}
                  </p>
                  {!gospel.loading && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-16"
                      style={{ background: 'linear-gradient(to top, rgba(8,2,5,0.95), transparent)' }}
                    />
                  )}
                </div>
              </div>

              {/* Read More button */}
              {!gospel.loading && (
                <button
                  onClick={onOpenGospelModal}
                  className="mt-2 group flex items-center gap-2 mx-auto font-oswald font-bold text-sm tracking-widest uppercase transition-all"
                  style={{ color: '#ffe088' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  Read Full Gospel
                  <MdKeyboardArrowDown className="text-lg group-hover:translate-y-0.5 transition-transform" />
                </button>
              )}

              {/* Bottom divider with cross */}
              <div className="flex items-center justify-center gap-3 mt-8 pt-7" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-8 h-[1px] bg-white/12" />
                <MdChurch className="text-[#ffe088]/50 text-xl" />
                <div className="w-8 h-[1px] bg-white/12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ animation: 'scrollBounce 2.2s ease-in-out infinite', transform: 'translateX(-50%)' }}
      >
        <span className="text-white/30 text-[9px] font-oswald tracking-[0.35em] uppercase">Scroll</span>
        <MdKeyboardArrowDown className="text-white/40 text-2xl" />
      </div>
    </section>
  );
}
