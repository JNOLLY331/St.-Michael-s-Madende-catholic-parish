import { MdChurch, MdKeyboardArrowDown, MdMenuBook } from 'react-icons/md';
/**
 * Full-height hero banner with the day's Gospel reading preview.
 *
 * `hero` is the normalized payload from useHeroData() (see hooks/useHeroData.js),
 * which calls GET /api/church/hero/ and maps the HeroSectionView response:
 *   { title, subtitle, background_image, primary_button_text, primary_button_link,
 *     secondary_button_text, secondary_button_link, is_active }
 * into { eyebrow, headingLine1, headingLine2, image, primaryButtonText,
 *        primaryButtonLink, secondaryButtonText, secondaryButtonLink }.
 * If the backend is unreachable, inactive, or missing a field, useHeroData()
 * already substitutes sensible fallback copy, so this component never
 * needs to know the difference.
 */
export default function HeroSection({ hero, gospel, onNavigate, onOpenGospelModal }) {
  // A button link of "#" (or empty) means "open the daily reading modal"
  // rather than navigate — that's how the backend currently models the
  // "Today's Readings" CTA. Any other link is treated as a route to visit.
  const handleButtonClick = (link) => {
    if (!link || link === '#') {
      onOpenGospelModal();
    } else {
      onNavigate(link);
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-[10s] hover:scale-105"
          style={{ backgroundImage: `url('${hero.image}')` }}
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 w-full px-5 md:px-16 max-w-[1400px] mx-auto flex items-center justify-between gap-10">
        <div className="max-w-3xl text-white">
          <p className="font-oswald tracking-[0.3em] text-[#ffe088] mb-4 uppercase text-sm animate-fade-in-up">
            ✦ {hero.eyebrow} ✦
          </p>
          <h1 className="text-display-lg mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {hero.headingLine1}
            {hero.headingLine2 && (
              <>
                <br />
                <span className="text-[#ffe088]">{hero.headingLine2}</span>
              </>
            )}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {hero.primaryButtonText && (
              <button
                onClick={() => handleButtonClick(hero.primaryButtonLink)}
                className="btn-primary bg-[#ffe088] text-[#40000b] px-8 py-4 rounded-full font-oswald font-bold text-base uppercase tracking-wide flex items-center justify-center gap-2 shadow-xl"
              >
                <MdMenuBook  />
                {hero.primaryButtonText}
              </button>
            )}
            {hero.secondaryButtonText && (
              <button
                onClick={() => handleButtonClick(hero.secondaryButtonLink)}
                className="border-2 border-white/60 text-white px-8 py-4 rounded-full font-oswald font-bold text-base uppercase tracking-wide transition-all hover:bg-white/10 hover:border-white backdrop-blur-sm"
              >
                {hero.secondaryButtonText}
              </button>
            )}
          </div>
        </div>

        {/* Daily Reading — sits on the same hero background, no separate bg color */}
        <div className="hidden lg:block w-full max-w-xl shrink-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative border border-white/25 rounded-3xl px-12 py-14 text-center text-white">
            <span className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-[1px] bg-[#ffe088]/50" />
            <p className="font-oswald tracking-[0.35em] text-[#ffe088] uppercase text-xs mb-4 mt-4">✦ Daily Reading ✦</p>
            <p className="text-white text-sm mb-10 tracking-wide">{gospel.date}</p>

            <p className="font-oswald font-bold text-white text-2xl mb-1 tracking-wide">{gospel.book}</p>
            <p className="text-[#ffe088] text-sm mb-10 tracking-widest uppercase">{gospel.citation}</p>

            <div className="relative px-2">
              <svg viewBox="0 0 50 40" className="w-14 h-auto absolute -top-11 left-0 fill-[#ffe088] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" aria-hidden="true">
                <path d="M0 24C0 12 8 3 19 0l2 6C13 8 9 13 9 19h10v14H0v-9zM27 24c0-12 8-21 19-24l2 6c-8 2-12 7-12 13h10v14H27v-9z" />
              </svg>

              <div className="gospel-preview-wrap">
                <p className="font-serif font-bold not-italic text-white text-[1.75rem] md:text-[2rem] leading-[1.45] tracking-[0.01em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {gospel.loading ? 'Loading today\u2019s Gospel reading\u2026' : gospel.text}
                </p>
                {!gospel.loading && <div className="gospel-fade-overlay" aria-hidden="true" />}
              </div>

              <svg viewBox="0 0 50 40" className="w-14 h-auto absolute -bottom-11 right-0 fill-[#ffe088] rotate-180 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]" aria-hidden="true">
                <path d="M0 24C0 12 8 3 19 0l2 6C13 8 9 13 9 19h10v14H0v-9zM27 24c0-12 8-21 19-24l2 6c-8 2-12 7-12 13h10v14H27v-9z" />
              </svg>
            </div>

            {!gospel.loading && (
              <button
                type="button"
                className="gospel-readmore-btn"
                onClick={onOpenGospelModal}
                aria-haspopup="dialog"
              >
                <span>Read More</span>
                <MdKeyboardArrowDown className="gospel-readmore-chevron" aria-hidden="true" />
              </button>
            )}

            <div className="flex items-center justify-center gap-3 mt-16">
              <span className="w-8 h-[1px] bg-[#ffe088]/40" />
              <MdChurch className="text-[#ffe088] text-base" />
              <span className="w-8 h-[1px] bg-[#ffe088]/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/60 animate-bounce">
        <MdKeyboardArrowDown className="text-3xl" />
      </div>
    </section>
  );
}
