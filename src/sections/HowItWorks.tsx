import { useState } from 'react';
import type { ReactNode } from 'react';
import { Reveal, useInView } from '../hooks/useReveal';

const R = 52;
const C = 2 * Math.PI * R;

function SenseVisual() {
  const [active, setActive] = useState(false);
  const heights = [0.4, 0.75, 0.55, 1, 0.65, 0.9, 0.45, 0.8, 0.5];
  return (
    <div 
      onClick={() => setActive((v) => !v)}
      className="h-full flex flex-col items-center justify-center gap-4 cursor-pointer group"
      title="Tap to trigger pulse"
    >
      <div className="flex items-center gap-1.5 h-20">
        {heights.map((h, i) => (
          <span
            key={i}
            className={`wave-bar w-1.5 rounded-full transition-all duration-300 ${
              active 
                ? 'bg-emerald-400 shadow-[0_0_15px_#34d399] scale-y-110' 
                : 'bg-[#e8702a] shadow-[0_0_10px_rgba(232,112,42,0.6)] group-hover:bg-[#ff8f4d]'
            }`}
            style={{ 
              height: `${h * 100}%`, 
              animationDelay: `${i * 0.12}s`, 
              opacity: 0.5 + h * 0.5 
            }}
          />
        ))}
      </div>
      <p className={`text-xs transition-colors duration-300 font-medium ${active ? 'text-emerald-300' : 'text-white/60 group-hover:text-white'}`}>
        {active ? '● Flow state locked (Synced)' : 'Rhythm: steady · Tap to test pulse'}
      </p>
    </div>
  );
}

const STORAGE_KEY_FILTER_ITEMS = 'focal_demo_filter_items';
type FilterItem = { app: string; text: string; tag: string; tone: string };
const DEFAULT_FILTER_ITEMS: FilterItem[] = [
  { app: 'Slack', text: '#general: lunch?', tag: 'Hold', tone: 'text-amber-300 bg-amber-400/20 border-amber-300/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]' },
  { app: 'Mail', text: 'Weekly newsletter', tag: 'Block', tone: 'text-rose-300 bg-rose-400/20 border-rose-300/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]' },
  { app: 'Phone', text: 'Mum is calling', tag: 'Allow', tone: 'text-emerald-300 bg-emerald-400/20 border-emerald-300/40 shadow-[0_0_10px_rgba(52,211,153,0.3)]' },
];

function FilterVisual() {
  const [items, setItems] = useState<FilterItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_FILTER_ITEMS);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_FILTER_ITEMS;
  });

  const cycle = (idx: number) => {
    setItems((prev: FilterItem[]) => {
      const next = prev.map((it, i) => {
        if (i !== idx) return it;
        if (it.tag === 'Hold') return { ...it, tag: 'Block', tone: 'text-rose-300 bg-rose-400/20 border-rose-300/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]' };
        if (it.tag === 'Block') return { ...it, tag: 'Allow', tone: 'text-emerald-300 bg-emerald-400/20 border-emerald-300/40 shadow-[0_0_10px_rgba(52,211,153,0.3)]' };
        return { ...it, tag: 'Hold', tone: 'text-amber-300 bg-amber-400/20 border-amber-300/40 shadow-[0_0_10px_rgba(251,191,36,0.3)]' };
      });
      try {
        localStorage.setItem(STORAGE_KEY_FILTER_ITEMS, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col justify-center gap-2.5">
      {items.map((it, i) => (
        <button
          key={it.app}
          onClick={() => cycle(i)}
          className="floaty flex items-center justify-between text-left gap-3 rounded-xl border border-white/15 bg-white/[0.08] backdrop-blur-md px-3.5 py-2.5 transition-all duration-200 hover:scale-[1.03] hover:border-white/30 active:scale-95"
          style={{ animationDelay: `${i * 0.6}s` }}
          title="Click to toggle filter mode"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase tracking-wider text-white/50">{it.app}</span>
            <span className="block text-sm truncate text-white">{it.text}</span>
          </span>
          <span className={`text-[11px] font-semibold rounded-full border px-2.5 py-1 transition-all duration-300 ${it.tone}`}>{it.tag}</span>
        </button>
      ))}
    </div>
  );
}

function GuideVisual({ active }: { active: boolean }) {
  const [minutes, setMinutes] = useState(47);
  const [pulse, setPulse] = useState(false);

  const add = () => {
    setMinutes((m) => m + 15);
    setPulse(true);
    setTimeout(() => setPulse(false), 500);
  };

  return (
    <div onClick={add} className="h-full grid place-items-center cursor-pointer group" title="Click to add focus session (+15m)">
      <div className={`relative w-36 h-36 transition-transform duration-300 ${pulse ? 'scale-110' : 'group-hover:scale-105'}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
          <circle
            cx="60" cy="60" r={R} fill="none" stroke="#e8702a" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={active ? C * 0.28 : C}
            className="filter drop-shadow-[0_0_8px_rgba(232,112,42,0.8)]"
            style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1) 0.3s' }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-playfair italic text-3xl leading-none text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">{minutes} min</p>
            <p className="mt-1 text-[11px] text-[#e8702a] uppercase tracking-wider font-semibold">in flow (+15m)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StepProps {
  n: number;
  title: string;
  text: string;
  offset: string;
  delay: number;
  visual: (active: boolean) => ReactNode;
}

function Step({ n, title, text, offset, delay, visual }: StepProps) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const [cardSelected, setCardSelected] = useState(false);

  return (
    <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${offset}`} style={{ transitionDelay: `${delay}ms` }}>
      <div 
        onClick={() => setCardSelected((s) => !s)}
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col transition-all duration-500 cursor-pointer border ${
          cardSelected
            ? 'border-[#e8702a] bg-[#e8702a]/15 shadow-[0_0_40px_rgba(232,112,42,0.35)] scale-[1.02]'
            : 'border-white/15 bg-black/40 backdrop-blur-2xl hover:border-[#e8702a]/50 hover:shadow-[0_0_30px_rgba(232,112,42,0.2)] hover:-translate-y-1'
        }`}
      >
        <div className="h-52 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-5 transition-colors group-hover:border-white/20">
          {visual(seen)}
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-[#e8702a] font-semibold">Step {n}</p>
        <h3 className="mt-2 text-2xl font-medium" style={{ letterSpacing: '-0.04em' }}>{title}</h3>
        <p className="mt-3 text-sm text-white/70 leading-relaxed">{text}</p>
        <span
          aria-hidden
          className="pointer-events-none select-none absolute bottom-3 right-6 font-playfair italic text-8xl leading-none text-white/[0.08]"
        >
          {n}
        </span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 text-white px-5 sm:px-10 md:px-14 pt-32 sm:pt-44 pb-24 sm:pb-32 overflow-x-clip">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e8702a]/40 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <Reveal className="md:text-center md:mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#e8702a] font-medium">How it works</p>
          <h2 className="mt-4 text-4xl sm:text-6xl leading-[0.98] max-w-3xl md:mx-auto" style={{ letterSpacing: '-0.05em' }}>
            From <span className="font-playfair italic font-normal">scattered</span> to settled in three steps
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 md:items-start gap-6 lg:gap-10">
          <Step
            n={1} delay={0} offset="" title="Sense"
            text="Focal learns your rhythm over the first week: when you type fast, when you pause, and when you tend to drift."
            visual={() => <SenseVisual />}
          />
          <Step
            n={2} delay={120} offset="md:mt-14" title="Filter"
            text="Each notification is allowed, held for later, or blocked, based on the current mode and who it is from."
            visual={() => <FilterVisual />}
          />
          <Step
            n={3} delay={240} offset="md:mt-28" title="Guide"
            text="A soft pulse brings you back when you wander, and a timeline shows how long you stayed in flow."
            visual={(active) => <GuideVisual active={active} />}
          />
        </div>
      </div>
    </section>
  );
}
