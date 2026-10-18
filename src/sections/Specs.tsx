import { Cpu, Brain, Radar, BatteryCharging, Wifi, CircleDot, Ruler, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../hooks/useReveal';
import { glowMove, GLASS } from '../components/glow';
import { BG_IMAGE_2 } from '../assets';

const STATS = [
  { value: '36 h', label: 'typical battery' },
  { value: '8 TOPS', label: 'on-device AI' },
  { value: '84 g', label: 'pocket weight' },
];

const HOTSPOTS = [
  { label: 'Focus ring · 24 LEDs', pos: 'top-[12%] left-[5%]' },
  { label: 'mmWave presence', pos: 'top-[42%] right-[4%]' },
  { label: 'Far-field mics', pos: 'bottom-[10%] left-[8%]' },
];

interface Spec {
  icon: LucideIcon;
  label: string;
  value: string;
  figure?: string;
  cap?: string;
}

const SPECS: Spec[] = [
  { icon: Brain, label: 'On-device model', value: 'A compact language model that runs fully offline, so your focus data stays yours.', figure: '3B', cap: 'parameters' },
  { icon: Cpu, label: 'Processor', value: 'Custom neural chip, 8 TOPS at under 1 W' },
  { icon: Radar, label: 'Sensors', value: 'Ambient light, mmWave presence, 2 far-field mics' },
  { icon: CircleDot, label: 'Focus ring', value: '24 edge-lit LEDs with soft diffusion' },
  { icon: BatteryCharging, label: 'Battery', value: '36 h typical, USB-C, full charge in 90 min' },
  { icon: Wifi, label: 'Connectivity', value: 'Bluetooth 5.4, Wi-Fi 6, Thread' },
  { icon: Ruler, label: 'Size and weight', value: '62 × 62 × 28 mm, 84 g' },
  { icon: Lock, label: 'Privacy', value: 'Audio and keystrokes are processed on the device and never uploaded.', figure: '0', cap: 'bytes of raw audio sent' },
];

export default function Specs() {
  return (
    <section id="specs" className="relative z-10 text-white px-5 sm:px-10 md:px-14 pt-32 sm:pt-44 pb-24 sm:pb-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e8702a]/40 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#e8702a] font-medium">Tech specs</p>
          <h2 className="mt-4 text-4xl sm:text-6xl leading-[0.98] max-w-3xl" style={{ letterSpacing: '-0.05em' }}>
            Small enough for a desk, <span className="font-playfair italic font-normal">smart enough</span> to stay private
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <Reveal className="lg:col-span-5 min-w-0 lg:sticky lg:top-28">
            <div
              onMouseMove={glowMove}
              className={`glow-card relative rounded-3xl ${GLASS} aspect-[4/3] bg-center bg-cover`}
              style={{ backgroundImage: `url("${BG_IMAGE_2}")` }}
              role="img"
              aria-label="Focal device on a desk with an orange focus lens"
            >
              {HOTSPOTS.map((h) => (
                <span
                  key={h.label}
                  className={`absolute ${h.pos} inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 backdrop-blur-md px-3 py-1.5 text-[11px] sm:text-xs text-white/90`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a]" />
                  {h.label}
                </span>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <div key={s.label} className={`rounded-2xl ${GLASS} px-3 py-4 text-center min-w-0`}>
                  <p className="font-playfair italic text-2xl sm:text-3xl leading-none tabular-nums">{s.value}</p>
                  <p className="mt-2 text-[11px] text-white/50 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="lg:col-span-7 min-w-0 grid sm:grid-cols-2 gap-4">
            {SPECS.map((s, i) => {
              const Icon = s.icon;
              const wide = Boolean(s.figure);
              return (
                <Reveal key={s.label} delay={(i % 2) * 100} className={`h-full ${wide ? 'sm:col-span-2' : ''}`}>
                  <div
                    onMouseMove={glowMove}
                    className={`glow-card h-full rounded-2xl ${GLASS} p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 ${
                      wide ? 'flex items-center gap-6 sm:gap-10' : ''
                    }`}
                  >
                    {wide && (
                      <div className="shrink-0 text-center">
                        <p className="font-playfair italic text-6xl sm:text-7xl leading-none text-[#e8702a]" style={{ letterSpacing: '-0.05em' }}>
                          {s.figure}
                        </p>
                        <p className="mt-2 text-[11px] uppercase tracking-wider text-white/45">{s.cap}</p>
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 text-white/50">
                        <Icon size={18} className="text-[#e8702a]" />
                        <p className="text-xs uppercase tracking-[0.16em]">{s.label}</p>
                      </div>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed">{s.value}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
