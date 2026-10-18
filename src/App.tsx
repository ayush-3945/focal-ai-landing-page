import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToId } from './components/glow';
import { AmbientOrbs, CursorSpotlight } from './components/Ambient';
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Specs from './sections/Specs';
import Footer from './sections/Footer';

const NAV_ITEMS: { label: string; target: string }[] = [
  { label: 'Device', target: 'top' },
  { label: 'Modes', target: 'features' },
  { label: 'How it works', target: 'how' },
  { label: 'Specs', target: 'specs' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('top');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.4);

      // Scroll spy to highlight active section
      const sections = ['top', 'features', 'how', 'specs'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveNav(id);
            break;
          }
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <div className="min-h-screen tracking-[-0.02em] relative text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Fixed Full-Page Cinematic Video Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
          src="/hero-video.mp4"
        />
        {/* Dynamic ambient dark overlay that adapts smoothly on scroll */}
        <div
          className="absolute inset-0 transition-all duration-700 pointer-events-none"
          style={{
            background: scrolled
              ? 'linear-gradient(180deg, rgba(7,5,4,0.3) 0%, rgba(7,5,4,0.7) 20%, rgba(7,5,4,0.88) 100%)'
              : 'radial-gradient(circle at center, rgba(7,5,4,0.1) 0%, rgba(7,5,4,0.5) 65%, rgba(7,5,4,0.85) 100%)',
          }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-6 pb-4 sm:pb-5 border-b transition-all duration-500 ${
          scrolled ? 'bg-black/55 backdrop-blur-xl border-white/10' : 'border-transparent'
        }`}
        style={{ paddingTop: 'calc(1.2rem + env(safe-area-inset-top, 0px))' }}
      >
        <button onClick={() => go('top')} className="flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95" aria-label="Focal home">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic">Focal</span>
        </button>

        {/* Dynamic Glowing Pill Navbar */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-xl border border-white/15 rounded-full p-1.5 items-center gap-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.target;
            return (
              <button
                key={item.label}
                onClick={() => go(item.target)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#e8702a] text-white shadow-[0_0_22px_rgba(232,112,42,0.6)] scale-[1.04]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => go('specs')}
          className="hidden md:block bg-gradient-to-r from-white to-gray-200 text-gray-950 text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Pre-order
        </button>
        <button
          className="md:hidden text-white p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {menuOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full mt-1 rounded-2xl border border-white/15 bg-black/80 backdrop-blur-2xl p-2 flex flex-col gap-1 shadow-2xl">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.target;
              return (
                <button
                  key={item.label}
                  onClick={() => go(item.target)}
                  className={`text-left text-base px-4 py-3 rounded-xl transition-all ${
                    isActive ? 'bg-[#e8702a] text-white font-medium shadow-[0_0_15px_rgba(232,112,42,0.4)]' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      <Hero onExplore={() => go('features')} />

      <div className="relative z-10 backdrop-blur-[1px]">
        <AmbientOrbs />
        <CursorSpotlight />
        <Features />
        <HowItWorks />
        <Specs />
        <Footer />
      </div>
    </div>
  );
}
