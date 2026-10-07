import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import { isPageType } from "../model/index.ts";
import { fetchConferenceLandingPage } from "../utils/landingPage.ts";
import Container from "./Container.tsx";
import Logo from "./Logo.tsx";
import Navigation, { type NavLinkItem } from "./Navigation.tsx";
import { IconButton } from "./ui/Button.tsx";

const homeLink: NavLinkItem = { label: "Home", href: "/" };

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { environmentId, apiKey } = useAppContext();
  const { data: landingPage } = useQuery({
    queryKey: ["landing-page", environmentId, "conference_agenda"],
    queryFn: () => fetchConferenceLandingPage(environmentId, apiKey),
  });

  const links = [
    homeLink,
    ...(landingPage?.elements.untitled_subpages.linkedItems ?? []).flatMap((item) =>
      isPageType(item)
        ? [
            {
              label: item.elements.headline.value || item.system.name,
              href: `/${item.system.codename}`,
            },
          ]
        : [],
    ),
  ];

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-line/80 bg-ink">
      <Container>
        <div className="flex min-h-16 items-center gap-6">
          <Logo />
          <Navigation links={links} label="Primary" className="hidden lg:block" />
          <div className="ml-auto flex items-center gap-1">
            <IconButton label="Search" icon="search" className="hidden sm:flex" />
            <IconButton
              label={menuOpen ? "Close menu" : "Open menu"}
              icon={menuOpen ? "close" : "menu"}
              expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="lg:hidden"
            />
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-line bg-ink py-4 lg:hidden">
            <Navigation
              links={links}
              label="Mobile"
              orientation="vertical"
              onNavigate={closeMenu}
            />
          </div>
        ) : null}
      </Container>
    </header>
  );
};

export default Header;
