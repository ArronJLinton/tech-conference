import type { FC } from "react";
import { useState } from "react";
import { landingContent } from "../content/landing.ts";
import Container from "./Container.tsx";
import Logo from "./Logo.tsx";
import Navigation from "./Navigation.tsx";
import { IconButton } from "./ui/Button.tsx";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-line/80 bg-ink">
      <Container>
        <div className="flex min-h-16 items-center gap-6">
          <Logo />
          {landingContent.navigation.length > 0 ? (
            <Navigation
              links={landingContent.navigation}
              label="Primary"
              className="hidden lg:block"
            />
          ) : null}
          <div className="ml-auto flex items-center gap-1">
            <IconButton label="Search" icon="search" className="hidden sm:flex" />
            {landingContent.navigation.length > 0 ? (
              <IconButton
                label={menuOpen ? "Close menu" : "Open menu"}
                icon={menuOpen ? "close" : "menu"}
                expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="lg:hidden"
              />
            ) : null}
          </div>
        </div>
        {menuOpen && landingContent.navigation.length > 0 ? (
          <div className="border-t border-line bg-ink py-4 lg:hidden">
            <Navigation
              links={landingContent.navigation}
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
