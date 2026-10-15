import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import { isPageType } from "../model/index.ts";
import { deliverySearch, useDeliveryParams } from "../utils/deliveryParams.ts";
import { fetchConferenceLandingPage } from "../utils/landingPage.ts";
import Container from "./Container.tsx";
import Logo from "./Logo.tsx";
import Navigation, { type NavLinkItem } from "./Navigation.tsx";
import { IconButton } from "./ui/Button.tsx";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { environmentId, apiKey } = useAppContext();
  const delivery = useDeliveryParams();
  const { data: landingPage } = useQuery({
    queryKey: ["landing-page", environmentId, "conference_agenda", delivery.preview, delivery.language],
    queryFn: () => fetchConferenceLandingPage(environmentId, apiKey, delivery),
  });

  const links: NavLinkItem[] = [
    { label: "Home", href: `/${deliverySearch(delivery)}` },
    ...(landingPage?.elements.untitled_subpages.linkedItems ?? []).flatMap((item) =>
      isPageType(item)
        ? [
            {
              label: item.elements.headline.value || item.system.name,
              href: `/${item.system.codename}${deliverySearch(delivery)}`,
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
