import type { FC } from "react";

type HeroVisualProps = {
  caption: string;
  status: string;
};

const fibers = [
  "M-20 70 C 120 40, 260 140, 470 250",
  "M-10 150 C 140 120, 280 180, 470 252",
  "M0 230 C 150 210, 300 220, 470 256",
  "M-10 320 C 160 300, 300 270, 470 260",
  "M20 410 C 170 360, 310 300, 472 266",
  "M40 500 C 200 420, 330 330, 476 274",
  "M180 20 C 220 120, 320 190, 468 246",
  "M300 -10 C 340 110, 400 190, 478 244",
  "M820 20 C 700 80, 580 160, 500 240",
  "M840 110 C 700 140, 580 190, 498 248",
  "M830 210 C 690 210, 580 230, 498 254",
  "M850 310 C 700 280, 580 270, 500 260",
  "M820 420 C 680 360, 580 310, 502 268",
  "M760 520 C 650 420, 560 340, 504 276",
  "M520 -20 C 540 80, 520 160, 496 236",
  "M640 540 C 600 430, 540 340, 500 272",
] as const;

const nodes = [
  [90, 150],
  [70, 320],
  [160, 430],
  [240, 80],
  [700, 70],
  [740, 180],
  [690, 340],
  [620, 450],
  [360, 200],
  [400, 300],
] as const;

const HeroVisual: FC<HeroVisualProps> = ({ caption, status }) => (
  <figure className="relative overflow-hidden rounded-2xl border border-line bg-[#0b1018] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
    <svg
      viewBox="0 0 800 520"
      className="aspect-[16/10] w-full"
      role="img"
      aria-label="Signals from three cities converging"
    >
      <defs>
        <radialGradient id="hero-glow" cx="62%" cy="48%" r="48%">
          <stop offset="0%" stopColor="#2ee6ff" stopOpacity="0.45" />
          <stop offset="42%" stopColor="#6d7cff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#0b1018" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-fiber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2ee6ff" />
          <stop offset="55%" stopColor="#7aa2ff" />
          <stop offset="100%" stopColor="#d16bff" />
        </linearGradient>
        <filter id="hero-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#9fb4c8" fillOpacity="0.28" />
        </pattern>
      </defs>
      <rect width="800" height="520" fill="#0b1018" />
      <rect width="800" height="520" fill="url(#hero-dots)" />
      <rect width="800" height="520" fill="url(#hero-glow)" />
      <g filter="url(#hero-blur)" opacity="0.7">
        {fibers.map((d) => (
          <path key={`glow-${d}`} d={d} fill="none" stroke="#2ee6ff" strokeWidth="6" />
        ))}
      </g>
      <g fill="none" stroke="url(#hero-fiber)" strokeLinecap="round">
        {fibers.map((d, index) => (
          <path
            key={d}
            d={d}
            strokeWidth={index % 4 === 0 ? 1.8 : 1.05}
            opacity={0.7 + (index % 3) * 0.1}
          />
        ))}
      </g>
      <g>
        {nodes.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="#b7f6ff" />
        ))}
        <circle cx="488" cy="256" r="28" fill="#2ee6ff" fillOpacity="0.16" />
        <circle cx="488" cy="256" r="12" fill="#7af4ff" fillOpacity="0.85" />
        <circle cx="488" cy="256" r="4.5" fill="#f4fbff" />
      </g>
      <text
        x="36"
        y="78"
        fill="#f4f7fb"
        fillOpacity="0.92"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="34"
        fontWeight="600"
        letterSpacing="8"
      >
        CONVERGE
      </text>
      <text
        x="40"
        y="104"
        fill="#2ee6ff"
        fontFamily="Inter, sans-serif"
        fontSize="11"
        letterSpacing="4"
      >
        GLOBAL SUMMIT
      </text>
    </svg>
    <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[#07080c] via-[#07080c]/80 to-transparent px-5 pt-12 pb-4">
      <p className="min-w-0 text-[11px] tracking-[0.14em] text-mist uppercase">{caption}</p>
      <p className="shrink-0 text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase">
        {status}
      </p>
    </figcaption>
  </figure>
);

export default HeroVisual;
