import { useEffect, useRef, useState } from 'react';
import { MdChurch, MdKeyboardArrowDown, MdMenuBook, MdLocationOn, MdSchedule, MdPeople } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

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
      className="group relative overflow-hidden flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-none border border-white/15 whitespace-nowrap shrink-0 flex-1 sm:flex-none justify-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(255,224,136,0.25)] hover:border-[#ffe088]/50 cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        animation: `fadeSlideUp 0.7s ease both`,
        animationDelay: delay,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffe088]/0 via-[#ffe088]/5 to-[#ffe088]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />

      <div
        className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6"
        style={{
          background: 'linear-gradient(135deg, #570013 0%, #800020 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ffe088]/0 to-[#ffe088]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon className="relative z-10 text-[#ffe088] text-sm sm:text-base transition-colors duration-300 group-hover:text-white drop-shadow-md" />
      </div>

      <div className="text-left relative z-10 pointer-events-none">
        <p className="font-oswald font-bold text-white text-xs sm:text-sm leading-tight transition-colors duration-500 group-hover:text-[#ffe088] drop-shadow-sm">{value}</p>
        <p className="text-white/50 text-[9px] sm:text-[10px] tracking-widest uppercase leading-tight mt-0.5 transition-colors duration-500 group-hover:text-white/90">{label}</p>
      </div>
    </div>
  );
}

/* ─── Skeleton shimmer shown while hero data loads ─── */
function HeroSkeleton() {
  return (
    <section className="relative h-[100dvh] min-h-[520px] flex items-center overflow-hidden bg-[#120508]">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, #3a000d 0%, transparent 60%), radial-gradient(ellipse 70% 80% at 80% 80%, #1a1000 0%, transparent 55%), #120508',
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle 600px at 30% 50%, rgba(87,0,19,0.3) 0%, transparent 70%)',
          animation: 'heroPulse 3s ease-in-out infinite',
        }}
      />
      <div className="relative z-10 w-full px-6 md:px-16 max-w-[1400px] mx-auto flex items-center justify-between gap-10">
        <div className="max-w-xl space-y-6 animate-pulse">
          <div className="h-3 w-40 rounded-full bg-white/10" />
          <div className="space-y-3">
            <div className="h-10 w-96 max-w-full rounded-xl bg-white/10" />
            <div className="h-10 w-72 max-w-full rounded-xl bg-[#ffe088]/10" />
          </div>
          <div className="h-4 w-80 max-w-full rounded-lg bg-white/6" />
          <div className="flex gap-3">
            <div className="h-10 w-40 rounded-full bg-white/10" />
            <div className="h-10 w-32 rounded-full bg-white/6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection({ hero, loading, gospel, onNavigate, onOpenGospelModal }) {
  const sectionRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleButtonClick = (link) => {
    if (!link || link === '#') onOpenGospelModal();
    else onNavigate(link);
  };

  if (loading || !hero) return <HeroSkeleton />;

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
  
  // Format the heading so it's not gigantic or overly redundant
  let rawHeading = (hero.headingLine1 + ' ' + (hero.headingLine2 || '')).trim();
  // if backend sent identical lines or something redundant:
  if (rawHeading.toLowerCase().includes('catholic church') && rawHeading.length > 25) {
     rawHeading = rawHeading.replace(/Catholic Church/i, '').trim();
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] sm:h-[95vh] min-h-[500px] flex items-center overflow-hidden"
    >
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

      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {hero.image ? (
          <>
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
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 20% 50%, #4a0010 0%, transparent 60%), radial-gradient(ellipse 70% 80% at 80% 80%, #1a0c00 0%, transparent 55%), linear-gradient(160deg, #1a0508 0%, #2d0010 40%, #1a0a00 100%)',
            }}
          />
        )}
      </div>

      <div className="absolute inset-0 z-1 bg-black/40" style={{
        background: 'linear-gradient(105deg, rgba(10,2,5,0.7) 0%, rgba(15,4,8,0.45) 45%, rgba(5,2,2,0.60) 100%)',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-1" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-24 z-1" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 100%)',
      }} />

      <div
        className="absolute z-1 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          left: '-10%',
          top: '-20%',
          background: 'radial-gradient(circle, rgba(87,0,19,0.3) 0%, transparent 70%)',
          animation: 'heroPulse 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute z-1 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          right: '15%',
          bottom: '-10%',
          background: 'radial-gradient(circle, rgba(115,92,0,0.15) 0%, transparent 70%)',
          animation: 'heroPulse 7s ease-in-out 2s infinite',
        }}
      />

      {particles.map((p, i) => (
        <Particle key={i} style={p} />
      ))}

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

      <div className="relative z-10 w-full px-6 md:px-16 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10 mt-12 md:mt-16">
        <div className="max-w-2xl text-white flex flex-col items-center text-center lg:items-start lg:text-left">

          <div
            className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 justify-center lg:justify-start"
            style={{ animation: 'fadeSlideUp 0.6s ease both', animationDelay: '0.05s' }}
          >
            <div className="w-6 sm:w-8 h-[1px]" style={{ background: 'linear-gradient(to right, rgba(255,224,136,0.6), transparent)' }} />
            <p className="font-oswald tracking-[0.2em] sm:tracking-[0.3em] text-[#ffe088] uppercase text-[9px] sm:text-[10px] font-medium">
              {hero.eyebrow}
            </p>
            <div className="w-6 sm:w-8 h-[1px]" style={{ background: 'linear-gradient(to left, rgba(255,224,136,0.6), transparent)' }} />
          </div>

          <h1
            className="mb-2 sm:mb-3 leading-[1.1] tracking-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              animation: 'heroTitleIn 0.8s cubic-bezier(0.22,1,0.36,1) both',
              animationDelay: '0.15s',
              color: '#ffffff',
              textShadow: '0 1px 0px #e0e0e0, 0 2px 0px #cccccc, 0 3px 0px #b8b8b8, 0 4px 0px #a3a3a3, 0 8px 10px rgba(0,0,0, 0.4), 0 12px 20px rgba(255, 224, 136, 0.15)',
            }}
          >
            {rawHeading}
            
            <br />
            <span
              className="relative inline-block mt-1 sm:mt-2"
              style={{
                fontFamily: 'var(--font-serif)',
                color: '#ffe088',
                verticalAlign: 'bottom',
                fontSize: '1em',
                lineHeight: '1',
                paddingBottom: '0.2em',
                paddingRight: '6px'
              }}
            >
              <span className="opacity-0 tracking-wide select-none">Catholic Church</span>
              <motion.span
                className="absolute left-0 top-0 whitespace-nowrap overflow-hidden tracking-wide"
                style={{
                  paddingBottom: '0.2em',
                  paddingRight: '6px',
                  textShadow: '0 1px 0 #c5832b, 0 2px 0 #ab6e1b, 0 3px 0 #915a13, 0 6px 8px rgba(0,0,0,0.6), 0 0 15px rgba(255, 224, 136, 0.5)',
                  backgroundImage: 'linear-gradient(#ffe088, #ffe088)',
                  backgroundSize: '2.5px 0.85em',
                  backgroundPosition: 'right 0.05em',
                  backgroundRepeat: 'no-repeat',
                }}
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

          <p
            className="text-white/70 text-[12px] sm:text-[14px] md:text-base leading-relaxed mb-4 md:mb-6 max-w-md mx-auto lg:mx-0"
            style={{ animation: 'fadeSlideUp 0.7s ease both', animationDelay: '0.35s' }}
          >
            A community rooted in faith, nourished by the Eucharist, and called to serve.
            <span className="text-[#ffe088] font-medium"> All are welcome.</span>
          </p>

          <div
            className="flex flex-row gap-2 sm:gap-4 mb-5 md:mb-8 w-full sm:w-auto items-center justify-center lg:justify-start"
            style={{ animation: 'fadeSlideUp 0.7s ease both', animationDelay: '0.5s' }}
          >
            {hero.primaryButtonText && (
              <button
                onClick={() => handleButtonClick(hero.primaryButtonLink)}
                className="group relative overflow-hidden px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-none font-oswald font-bold text-[12px] sm:text-[14px] uppercase tracking-wider flex items-center justify-center gap-1.5 sm:gap-2 shadow-2xl transition-transform hover:scale-105 active:scale-100 flex-1 sm:flex-none"
                style={{
                  background: 'linear-gradient(135deg, #ffe088 0%, #f5c842 100%)',
                  color: '#40000b',
                  boxShadow: '0 8px 25px rgba(255,224,136,0.3)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #fff3b0 0%, #ffe088 100%)' }}
                />
                <MdMenuBook className="relative z-10 text-base sm:text-xl flex-shrink-0" />
                <span className="relative z-10">{hero.primaryButtonText}</span>
              </button>
            )}
            {hero.secondaryButtonText && (
              <button
                onClick={() => handleButtonClick(hero.secondaryButtonLink)}
                className="px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-none font-oswald font-bold text-[12px] sm:text-[14px] uppercase tracking-wider transition-all hover:scale-105 active:scale-100 flex-1 sm:flex-none"
                style={{
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              >
                {hero.secondaryButtonText}
              </button>
            )}
          </div>

          <div
            className="flex flex-wrap gap-2 w-full justify-center lg:justify-start"
            style={{ animation: 'fadeSlideUp 0.7s ease both', animationDelay: '0.65s' }}
          >
            {stats.map((s, i) => (
              <StatPill key={i} {...s} delay={`${0.7 + i * 0.1}s`} />
            ))}
          </div>
        </div>

        {/* Right side reading card... */}
        <div className="hidden lg:block w-full max-w-[420px] shrink-0" style={{ animation: 'readingCardIn 0.9s cubic-bezier(0.22,1,0.36,1) both', animationDelay: '0.3s' }}>
          <div
            className="relative rounded-[2rem] text-center text-white overflow-hidden"
            style={{
              background: 'rgba(8, 2, 5, 0.65)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.13)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,224,136,0.6), transparent)' }} />
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,224,136,0.14) 0%, transparent 70%)' }} />

            <div className="px-10 py-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-6 h-[1px] bg-[#ffe088]/40" />
                <p className="font-oswald tracking-[0.3em] text-[#ffe088] uppercase text-[10px] font-semibold">Daily Reading</p>
                <div className="w-6 h-[1px] bg-[#ffe088]/40" />
              </div>

              <p className="text-white/55 text-xs mb-5 tracking-widest uppercase font-oswald">{gospel.date}</p>

              <div className="mb-6">
                <p className="font-oswald font-bold text-white text-2xl mb-2 tracking-wide leading-tight">{gospel.book}</p>
                <span
                  className="inline-block text-xs font-oswald tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,224,136,0.15)', color: '#ffe088', border: '1px solid rgba(255,224,136,0.25)' }}
                >
                  {gospel.citation}
                </span>
              </div>

              <div className="w-16 h-[1px] mx-auto mb-6 bg-white/10" />

              <div className="relative mb-5">
                <svg viewBox="0 0 50 40" className="w-10 h-auto absolute -top-2 -left-1 opacity-25 fill-[#ffe088]" aria-hidden="true">
                  <path d="M0 24C0 12 8 3 19 0l2 6C13 8 9 13 9 19h10v14H0v-9zM27 24c0-12 8-21 19-24l2 6c-8 2-12 7-12 13h10v14H27v-9z" />
                </svg>

                <div className="relative overflow-hidden" style={{ maxHeight: '8rem' }}>
                  <p
                    className="text-white/90 leading-[1.6] text-left pl-6"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1rem',
                      textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                    }}
                  >
                    {gospel.loading ? "Loading today's Gospel…" : gospel.text}
                  </p>
                  {!gospel.loading && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-12"
                      style={{ background: 'linear-gradient(to top, rgba(8,2,5,0.95), transparent)' }}
                    />
                  )}
                </div>
              </div>

              {!gospel.loading && (
                <button
                  onClick={onOpenGospelModal}
                  className="mt-1 group flex items-center gap-1.5 mx-auto font-oswald font-bold text-[11px] tracking-widest uppercase transition-all"
                  style={{ color: '#ffe088' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.7'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                >
                  Read Full Gospel
                  <MdKeyboardArrowDown className="text-base group-hover:translate-y-0.5 transition-transform" />
                </button>
              )}

              <div className="flex items-center justify-center gap-3 mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-6 h-[1px] bg-white/12" />
                <MdChurch className="text-[#ffe088]/50 text-lg" />
                <div className="w-6 h-[1px] bg-white/12" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none"
        style={{ animation: 'scrollBounce 2.2s ease-in-out infinite', transform: 'translateX(-50%)' }}
      >
        <span className="text-white/30 text-[8px] font-oswald tracking-[0.35em] uppercase">Scroll</span>
        <MdKeyboardArrowDown className="text-white/40 text-xl" />
      </div>
    </section>
  );
}

