/** "Word of the Day" closing section with a scripture quote and CTAs. */
export default function GospelOfDaySection({ onNavigate }) {
  return (
    <section className="bg-[#2b271e] text-white py-24">
      <div data-reveal-spin className="max-w-[1400px] mx-auto px-5 md:px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#ffe088]/10 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-[#ffe088] text-3xl">menu_book</span>
        </div>
        <p className="font-oswald tracking-[0.3em] text-[#ffe088] uppercase text-sm mb-6">Word of the Day</p>
        <blockquote className="font-serif text-3xl md:text-4xl text-[#ffdada] italic max-w-3xl mx-auto leading-relaxed mb-6">
          "I am the way, the truth, and the life. No one comes to the Father except through me."
        </blockquote>
        <cite className="text-body-md text-[#cdc6b8] opacity-80">— John 14:6</cite>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('/mass-schedule')}
            className="btn-primary bg-[#ffe088] text-[#40000b] px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide"
          >
            Mass Times
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
