import { useState } from 'react';
import {
  Brain, Users, Moon, Coffee, MessageSquare, Mail, Share2, Newspaper, Phone,
  CalendarDays, Activity, Layers, Timer, ShieldCheck, Sparkles, BellOff, RotateCcw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../hooks/useReveal';
import { glowMove, GLASS } from '../components/glow';

type Rule = 'allow' | 'hold' | 'block';
type CatId = 'messages' | 'email' | 'social' | 'news' | 'calls' | 'calendar';
type Rules = Record<CatId, Rule>;

const CATEGORIES: { id: CatId; label: string; icon: LucideIcon; perDay: number }[] = [
  { id: 'messages', label: 'Messages', icon: MessageSquare, perDay: 64 },
  { id: 'email', label: 'Email', icon: Mail, perDay: 38 },
  { id: 'social', label: 'Social', icon: Share2, perDay: 52 },
  { id: 'news', label: 'News', icon: Newspaper, perDay: 21 },
  { id: 'calls', label: 'Calls', icon: Phone, perDay: 9 },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, perDay: 12 },
];

const RULE_META: Record<Rule, { label: string; hint: string; cls: string }> = {
  allow: { label: 'Allow', hint: 'Reaches you right away', cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-300/30' },
  hold: { label: 'Hold', hint: 'Batched into a calm digest', cls: 'bg-amber-400/15 text-amber-300 border-amber-300/30' },
  block: { label: 'Block', hint: 'Silent until the mode ends', cls: 'bg-rose-400/15 text-rose-300 border-rose-300/30' },
};
const NEXT: Record<Rule, Rule> = { allow: 'hold', hold: 'block', block: 'allow' };

const MODES: { id: string; name: string; icon: LucideIcon; blurb: string; detail: string; rules: Rules }[] = [
  {
    id: 'deep', name: 'Deep Work', icon: Brain, blurb: 'Long, uninterrupted stretches.',
    detail: 'Focal dims its ring, holds almost everything, and only lets calls through. Built for the two or three hours that decide your day.',
    rules: { messages: 'hold', email: 'hold', social: 'block', news: 'block', calls: 'allow', calendar: 'hold' },
  },
  {
    id: 'meet', name: 'Meetings', icon: Users, blurb: 'Present, with context on hand.',
    detail: 'Calendar nudges stay on so you arrive on time, while chat and feeds wait in the digest until the meeting ends.',
    rules: { messages: 'hold', email: 'hold', social: 'block', news: 'block', calls: 'hold', calendar: 'allow' },
  },
  {
    id: 'wind', name: 'Wind Down', icon: Moon, blurb: 'Evenings that actually end.',
    detail: 'Work email and calendar go quiet. Messages from the people you pick still arrive, with a warmer, lower light on the ring.',
    rules: { messages: 'allow', email: 'block', social: 'hold', news: 'block', calls: 'allow', calendar: 'block' },
  },
  {
    id: 'recharge', name: 'Recharge', icon: Coffee, blurb: 'Breaks without the scroll.',
    detail: 'A ten-minute reset between sessions. Everything is silenced except calls, and Focal counts the break so it does not run long.',
    rules: { messages: 'block', email: 'block', social: 'block', news: 'block', calls: 'allow', calendar: 'block' },
  },
];

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Activity, title: 'Flow detection', text: 'Typing rhythm, posture and desk presence tell Focal when you are in the zone, with no camera involved.' },
  { icon: Layers, title: 'Smart batching', text: 'Held notifications arrive together at natural breaks, grouped by person and urgency.' },
  { icon: Sparkles, title: 'Gentle nudges', text: 'When you drift, the focus ring pulses softly. No buzz, no sound, no guilt.' },
  { icon: ShieldCheck, title: 'Private by design', text: 'Everything is processed on the device. Raw audio and keystrokes are never stored or sent.' },
  { icon: Timer, title: 'Focus timeline', text: 'See when your best hours happen and schedule hard work into them.' },
  { icon: BellOff, title: 'VIP bypass', text: 'Name the few people and alerts that always get through, even in the deepest mode.' },
];

const SPANS = [
  'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  '',
  '',
  'sm:col-span-2 lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
];

export default function Features() {
  const [active, setActive] = useState(MODES[0].id);
  const [rules, setRules] = useState<Record<string, Rules>>(() =>
    Object.fromEntries(MODES.map((m) => [m.id, { ...m.rules }]))
  );

  const mode = MODES.find((m) => m.id === active) ?? MODES[0];
  const current = rules[mode.id];
  const total = CATEGORIES.reduce((s, c) => s + c.perDay, 0);
  const kept = CATEGORIES.reduce((s, c) => s + (current[c.id] !== 'allow' ? c.perDay : 0), 0);
  const pct = Math.round((kept / total) * 100);
  const ModeIcon = mode.icon;

  const cycle = (id: CatId) =>
    setRules((r) => ({ ...r, [mode.id]: { ...r[mode.id], [id]: NEXT[r[mode.id][id]] } }));
  const reset = () => setRules((r) => ({ ...r, [mode.id]: { ...mode.rules } }));

  return (
    <section id="features" className="relative z-10 text-white px-5 sm:px-10 md:px-14 pt-32 sm:pt-44 pb-24 sm:pb-32">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#e8702a]/40 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#e8702a] font-medium">Modes and distraction filter</p>
          <h2 className="mt-4 text-4xl sm:text-6xl leading-[0.98] max-w-3xl" style={{ letterSpacing: '-0.05em' }}>
            Every mode is a <span className="font-playfair italic font-normal">different kind of quiet</span>
          </h2>
          <p className="mt-5 text-white/60 max-w-xl leading-relaxed">
            Pick a mode, then tap any category to decide what gets through, waits, or stays silent. Focal remembers your changes.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {MODES.map((m) => {
            const Icon = m.icon;
            const on = m.id === active;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                onMouseMove={glowMove}
                aria-pressed={on}
                className={`glow-card text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 ${
                  on 
                    ? 'border-[#e8702a] bg-[#e8702a]/20 shadow-[0_0_35px_rgba(232,112,42,0.4)] scale-[1.02]' 
                    : 'border-white/10 bg-black/40 backdrop-blur-xl hover:border-[#e8702a]/40 hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(232,112,42,0.15)]'
                }`}
              >
                <Icon size={22} className={on ? 'text-[#e8702a] filter drop-shadow-[0_0_8px_#e8702a]' : 'text-white/70'} />
                <p className={`mt-4 text-base sm:text-lg font-medium transition-colors ${on ? 'text-white' : 'text-white/80'}`}>{m.name}</p>
                <p className="mt-1 text-xs sm:text-sm text-white/55 leading-snug">{m.blurb}</p>
              </button>
            );
          })}
        </Reveal>

        <Reveal delay={150} className="mt-4 grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 min-w-0 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl p-6 sm:p-8 flex flex-col shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-full bg-[#e8702a]/20 text-[#e8702a] shadow-[0_0_15px_rgba(232,112,42,0.3)]">
                <ModeIcon size={20} />
              </span>
              <h3 className="text-xl font-medium">{mode.name}</h3>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">{mode.detail}</p>
            <div className="mt-auto pt-8">
              <p className="font-playfair italic text-6xl sm:text-7xl leading-none tabular-nums text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ letterSpacing: '-0.05em' }}>
                {kept}
              </p>
              <p className="mt-2 text-sm text-white/60">interruptions kept out of your way each day, of about {total}</p>
              <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#e8702a] to-amber-300 shadow-[0_0_10px_#e8702a] transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
              </div>
              <button onClick={reset} className="mt-5 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors">
                <RotateCcw size={14} /> Reset this mode
              </button>
            </div>
          </div>

          <ul className={`lg:col-span-3 min-w-0 rounded-3xl ${GLASS} p-2 sm:p-3 flex flex-col gap-1`}>
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const rule = current[c.id];
              const meta = RULE_META[rule];
              return (
                <li key={c.id}>
                  <button
                    onClick={() => cycle(c.id)}
                    aria-label={`${c.label}: ${meta.label}. Tap to change.`}
                    className="w-full flex items-center gap-4 rounded-2xl px-4 py-3.5 text-left hover:bg-white/[0.06] transition-colors"
                  >
                    <Icon size={20} className="text-white/70 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm sm:text-base font-medium">{c.label}</span>
                      <span className="block text-xs text-white/50 truncate">{meta.hint} · about {c.perDay} a day</span>
                    </span>
                    <span className={`shrink-0 w-[4.5rem] text-center text-xs font-medium rounded-full border py-1.5 transition-colors ${meta.cls}`}>
                      {meta.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={(i % 3) * 90} className={`${SPANS[i]} h-full`}>
                <div onMouseMove={glowMove} className={`glow-card h-full rounded-2xl ${GLASS} p-6 ${i === 0 ? 'sm:p-9 min-h-[18rem]' : ''} transition-all duration-300 hover:-translate-y-1 hover:border-white/25`}>
                  {i === 0 && (
                    <>
                      <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-[#e8702a]/30" />
                      <span aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 w-56 h-56 rounded-full border border-[#e8702a]/40" />
                      <span aria-hidden className="pointer-events-none absolute bottom-6 right-6 w-24 h-24 rounded-full bg-[#e8702a]/25 blur-2xl" />
                    </>
                  )}
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/[0.06] text-[#e8702a]">
                    <Icon size={22} />
                  </span>
                  <h3 className={`mt-5 font-medium ${i === 0 ? 'text-2xl sm:text-3xl' : 'text-lg'}`} style={i === 0 ? { letterSpacing: '-0.04em' } : undefined}>{f.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
