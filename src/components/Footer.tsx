import type { FC } from "react";
import { landingContent } from "../content/landing.ts";
import Container from "./Container.tsx";
import Logo from "./Logo.tsx";
import Navigation from "./Navigation.tsx";
import Icon from "./ui/Icon.tsx";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

const Footer: FC = () => {
  const { footer } = landingContent;

  return (
    <footer className="border-t border-line/80">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
          <div>
            <Logo />
            {footer.blurb ? (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">{footer.blurb}</p>
            ) : null}
            {footer.socials.length > 0 ? (
              <ul className="mt-6 flex gap-3">
                {footer.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className={`flex size-9 items-center justify-center rounded-md border border-line text-mist transition-colors hover:border-cyan hover:text-cyan ${focusRing}`}
                    >
                      <Icon name={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {footer.columns.map((column) => (
            <Navigation
              key={column.title}
              links={column.links}
              label={column.title}
              title={column.title}
              orientation="vertical"
            />
          ))}
        </div>
      </Container>
      <div className="border-t border-line/80">
        <Container>
          <div className="flex flex-col gap-3 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
            <p>{footer.copyright}</p>
            {footer.legal.length > 0 ? (
              <ul className="flex gap-5">
                {footer.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`transition-colors hover:text-paper ${focusRing}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
