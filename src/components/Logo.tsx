import type { FC } from "react";

const Logo: FC = () => (
  <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Converge home">
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-cyan" />
      <path d="M16 7v18M7 16h18" stroke="#071016" strokeWidth="1.7" />
      <circle cx="16" cy="16" r="3" fill="#071016" />
      <circle cx="16" cy="7.5" r="1.6" fill="#071016" />
      <circle cx="16" cy="24.5" r="1.6" fill="#071016" />
      <circle cx="7.5" cy="16" r="1.6" fill="#071016" />
      <circle cx="24.5" cy="16" r="1.6" fill="#071016" />
    </svg>
    <span className="font-family-display text-[13px] font-semibold tracking-[0.26em] text-paper">
      CONVERGE
    </span>
  </a>
);

export default Logo;
