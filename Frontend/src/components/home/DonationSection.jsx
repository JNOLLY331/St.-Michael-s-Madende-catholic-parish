/** "Support Our Mission" donation call-to-action section. */
export default function DonationSection({ onNavigate }) {
  return (
    <section className="w-full py-20" style={{ background: 'var(--section-alt)' }}>
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div data-reveal-zoom className="bg-gradient-to-br from-[#2b271e] to-[#413d33] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffe088]/5 rounded-full -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#570013]/10 rounded-full -ml-32 -mb-32" />

          <div className="md:w-2/3 relative z-10">
            <p className="font-oswald tracking-[0.3em] text-[#ffe088]/70 uppercase text-sm mb-3">Give Generously</p>
            <h2 className="font-oswald font-bold text-4xl text-white mb-4">Support Our Mission</h2>
            <p className="text-body-lg text-white/70 mb-8 max-w-lg">
              Your generosity allows us to maintain our sacred sanctuary, provide spiritual nourishment,
              and serve those in need in our community. Every gift makes a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/donate')}
                className="btn-primary bg-[#ffe088] text-[#40000b] px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide shadow-lg"
              >
                Give Online Now
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-oswald font-bold text-sm uppercase tracking-wide hover:bg-white/10 transition-all">
                Other Ways to Give
              </button>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center items-center relative z-10">
            <div className="w-36 h-36 rounded-full bg-[#ffe088]/10 border-2 border-[#ffe088]/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#ffe088] text-8xl">volunteer_activism</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
