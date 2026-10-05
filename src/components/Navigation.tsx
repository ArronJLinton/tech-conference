import type { FC } from "react";
import type { LinkItem } from "../content/landing.ts";

type NavigationProps = {
  links: readonly LinkItem[];
  label: string;
  title?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onNavigate?: () => void;
};

const Navigation: FC<NavigationProps> = ({
  links,
  label,
  title,
  orientation = "horizontal",
  className = "",
  onNavigate,
}) => {
  const listClass =
    orientation === "horizontal"
      ? "flex flex-wrap items-center gap-x-6 gap-y-2"
      : "flex flex-col gap-3";
  const linkClass =
    orientation === "horizontal"
      ? "text-[11px] font-semibold tracking-[0.16em] text-mist uppercase transition-colors hover:text-cyan"
      : "text-sm text-mist transition-colors hover:text-paper";

  return (
    <nav className={className} aria-label={label}>
      {title ? (
        <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase">
          {title}
        </p>
      ) : null}
      <ul className={`${listClass} list-none`}>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className={linkClass} onClick={onNavigate}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
