import type { FC, ReactNode } from "react";
import Icon from "./Icon.tsx";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

const variants = {
  primary: "border border-cyan bg-cyan text-ink hover:bg-paper",
  secondary: "border border-line bg-transparent text-paper hover:border-cyan hover:text-cyan",
} as const;

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

const Button: FC<ButtonProps> = ({ href, children, variant = "primary", className = "" }) => (
  <a
    href={href}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors ${variants[variant]} ${focusRing} ${className}`}
  >
    {children}
  </a>
);

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

export const TextLink: FC<TextLinkProps> = ({
  href,
  children,
  className = "",
  external = false,
}) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase transition-colors hover:text-paper ${focusRing} ${className}`}
  >
    {children}
    <Icon name="arrow" />
  </a>
);

type IconButtonProps = {
  label: string;
  icon: "search" | "user" | "menu" | "close";
  onClick?: () => void;
  expanded?: boolean;
  className?: string;
};

export const IconButton: FC<IconButtonProps> = ({
  label,
  icon,
  onClick,
  expanded,
  className = "",
}) => (
  <button
    type="button"
    aria-label={label}
    aria-expanded={expanded}
    onClick={onClick}
    className={`flex size-9 items-center justify-center rounded-md text-mist transition-colors hover:bg-white/5 hover:text-paper ${focusRing} ${className}`}
  >
    <Icon name={icon} />
  </button>
);

export default Button;
