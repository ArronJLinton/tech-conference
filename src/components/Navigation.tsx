import type { FC } from "react";
import { NavLink } from "react-router";

export type NavLinkItem = {
  label: string;
  href: string;
};

type NavigationProps = {
  links: readonly NavLinkItem[];
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
      ? "text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors hover:text-cyan"
      : "text-sm transition-colors hover:text-paper";

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
            {link.href.startsWith("/") ? (
              <NavLink
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? "text-paper" : "text-mist"}`
                }
                onClick={onNavigate}
              >
                {link.label}
              </NavLink>
            ) : (
              <a href={link.href} className={`${linkClass} text-mist`} onClick={onNavigate}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
