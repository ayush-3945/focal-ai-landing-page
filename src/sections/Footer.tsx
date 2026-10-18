import { useState, type FormEvent } from 'react';
import { Twitter, Instagram, Youtube, Github, Linkedin, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../hooks/useReveal';
import { scrollToId } from '../components/glow';

const SOCIALS: { icon: LucideIcon; label: string; href: string }[] = [
  { icon: Twitter, label: 'X', href: 'https://x.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
];

const COLUMNS: { title: string; links: { label: string; target?: string }[] }[] = [
  { title: 'Product', links: [{ label: 'Modes', target: 'features' }, { label: 'How it works', target: 'how' }, { label: 'Tech specs', target: 'specs' }, { label: 'Pricing' }] },
  { title: 'Company', links: [{ label: 'About' }, { label: 'Journal' }, { label: 'Careers' }, { label: 'Press' }] },
  { title: 'Support', links: [{ label: 'Help centre' }, { label: 'Privacy' }, { label: 'Terms' }, { label: 'Contact' }] },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <footer className="relative z-10 text-white px-5 sm:px-10 md:px-14 pt-32 sm:pt-44 pb-10 overflow-x-clip">
      <div className="pointer-events-none absolute -left-32 top-10 w-[28rem] h-[28rem] rounded-full bg-[#e8702a]/25 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 w-[26rem] h-[26rem] rounded-full bg-[#7a4dff]/20 blur-[120px]" />

      <Reveal className="relative max-w-7xl mx-auto">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] backdrop-blur-2xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] p-6 sm:p-10 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 pb-10 border-b border-white/10">
            <div className="min-w-0">
              <h2 className="text-4xl sm:text-5xl leading-[0.98]" style={{ letterSpacing: '-0.05em' }}>
                Ready to <span className="font-playfair italic font-normal">focus?</span>
              </h2>
              <p className="mt-4 text-white/60 max-w-md leading-relaxed">
                Join the waitlist for the first batch of Focal. We will email you once, when pre-orders open.
              </p>
            </div>
            <div className="min-w-0 self-end">
              {done ? (
                <p className="rounded-full border border-emerald-300/30 bg-emerald-400/10 text-emerald-300 px-6 py-3.5 text-sm">
                  You are on the list. Watch your inbox.
                </p>
              ) : (
                <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="min-w-0 flex-1 rounded-full bg-black/30 border border-white/15 px-6 py-3.5 text-sm placeholder:text-white/35 focus:outline-none focus:border-[#e8702a]"
                  />
                  <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95">
                    Join waitlist <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-10">
            <div className="col-span-2 min-w-0">
              <div className="flex items-center gap-2">
                <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
                </svg>
                <span className="text-2xl font-playfair italic">Focal</span>
              </div>
              <p className="mt-4 text-sm text-white/55 max-w-xs leading-relaxed">
                The AI device that guards your attention, so the work you care about gets done.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid place-items-center w-11 h-11 rounded-full border border-white/15 bg-white/[0.06] text-white/75 hover:text-white hover:bg-[#e8702a] hover:border-[#e8702a] hover:-translate-y-0.5 transition-all"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title} className="min-w-0">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (l.target) scrollToId(l.target);
                        }}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/40">
            <p>© 2026 Focal Labs. All rights reserved.</p>
            <p>Designed for quiet desks everywhere.</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
