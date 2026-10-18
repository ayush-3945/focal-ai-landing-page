import { useEffect, useRef } from 'react';

interface Orb {
  top: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
}

const ORBS: Orb[] = [
  { top: '3%', left: '-14%', size: '48rem', color: 'rgba(232,112,42,0.20)' },
  { top: '17%', right: '-16%', size: '44rem', color: 'rgba(255,176,98,0.11)' },
  { top: '34%', left: '-12%', size: '46rem', color: 'rgba(232,112,42,0.15)' },
  { top: '52%', right: '-14%', size: '48rem', color: 'rgba(196,84,58,0.16)' },
  { top: '70%', left: '6%', size: '42rem', color: 'rgba(232,112,42,0.15)' },
  { top: '88%', right: '-4%', size: '40rem', color: 'rgba(122,77,255,0.14)' },
];

export function AmbientOrbs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {ORBS.map((o, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: o.top,
            left: o.left,
            right: o.right,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 68%)`,
          }}
        />
      ))}
    </div>
  );
}

export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...target };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);
    const tick = () => {
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      const el = ref.current;
      if (el) {
        el.style.background = `radial-gradient(540px circle at ${eased.x}px ${eased.y}px, rgba(232,112,42,0.14), rgba(232,112,42,0.05) 45%, transparent 70%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1]" />;
}
