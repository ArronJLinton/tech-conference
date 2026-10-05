import type { FC, ReactNode } from "react";

export type IconName =
  | "arrow"
  | "broadcast"
  | "calendar"
  | "close"
  | "cpu"
  | "linkedin"
  | "menu"
  | "pin"
  | "search"
  | "spark"
  | "user"
  | "x"
  | "youtube";

type IconProps = {
  name: IconName;
  className?: string;
};

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  broadcast: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M8.2 8.2a5.4 5.4 0 0 0 0 7.6M15.8 8.2a5.4 5.4 0 0 1 0 7.6M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M4 10h16" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3.5v3.5M12 3.5V7M15 3.5V7M9 17v3.5M12 17v3.5M15 17v3.5M3.5 9H7M3.5 12H7M3.5 15H7M17 9h3.5M17 12h3.5M17 15h3.5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 11v5M8 8h.01M12 16v-3a2 2 0 1 1 4 0v3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pin: (
    <>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10z" />
      <circle cx="12" cy="11" r="1.7" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </>
  ),
  spark: (
    <path d="M12 3v5M12 16v5M3 12h5M16 12h5M6.2 6.2l3.2 3.2M14.6 14.6l3.2 3.2M17.8 6.2l-3.2 3.2M9.4 14.6 6.2 17.8" />
  ),
  user: (
    <>
      <circle cx="12" cy="9" r="3" />
      <path d="M6.2 18.5c1.2-2.3 3.1-3.5 5.8-3.5s4.6 1.2 5.8 3.5" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  youtube: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="2.5" />
      <path d="m11 10 4 2-4 2z" fill="currentColor" stroke="none" />
    </>
  ),
};

const Icon: FC<IconProps> = ({ name, className = "size-4" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {iconPaths[name]}
  </svg>
);

export default Icon;
