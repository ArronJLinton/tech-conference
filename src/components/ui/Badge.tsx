import type { FC, ReactNode } from "react";

const tones = {
  cyan: "border-cyan/40 bg-cyan/10 text-cyan",
  violet: "border-violet/40 bg-violet/10 text-violet",
  mist: "border-line bg-white/5 text-mist",
} as const;

type BadgeProps = {
  children: ReactNode;
  tone?: keyof typeof tones;
};

const Badge: FC<BadgeProps> = ({ children, tone = "mist" }) => (
  <span
    className={`inline-flex rounded-sm border px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase ${tones[tone]}`}
  >
    {children}
  </span>
);

export default Badge;
