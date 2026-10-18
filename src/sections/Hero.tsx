export default function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="top" className="relative z-10 w-full overflow-hidden h-screen" style={{ height: '100dvh' }}>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-48 z-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(7,5,4,0.7))' }}
      />

      <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
        <h1 className="text-white leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-[2.6rem] sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Silence the noise
          </span>
          <span
            className="block font-normal text-[2.6rem] sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            find your focus
          </span>
        </h1>
      </div>

      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm text-white/80 leading-relaxed">
          Focal is a pocket-sized AI companion that learns how you work, quiets every
          notification that doesn't matter, and protects your deepest hours of attention.
        </p>
      </div>

      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Place it on your desk and it senses when you drift, gently filtering distractions
          and guiding you back into flow, so you can finish what you started.
        </p>
        <button
          onClick={onExplore}
          className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
        >
          Get Focal
        </button>
      </div>

      <button
        onClick={onExplore}
        aria-label="Scroll to modes"
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex-col items-center gap-2 text-white/60 hover:text-white transition-colors hero-anim hero-fade"
        style={{ animationDelay: '1.1s' }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="scroll-cue-line block w-px h-8 bg-white/70" />
      </button>
    </section>
  );
}
