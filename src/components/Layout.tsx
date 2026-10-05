import type { FC, PropsWithChildren } from "react";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="relative flex min-h-screen flex-col text-paper antialiased">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-ink" />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[780px] bg-[radial-gradient(900px_480px_at_78%_-8%,rgba(46,230,255,0.16),transparent_58%),radial-gradient(640px_380px_at_8%_-10%,rgba(167,139,250,0.16),transparent_55%)]"
    />
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-cyan focus:px-4 focus:py-2 focus:text-ink"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" className="grow">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
