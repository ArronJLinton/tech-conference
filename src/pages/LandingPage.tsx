import type { FC } from "react";
import Layout from "../components/Layout.tsx";
import Hero from "../components/landing/Hero.tsx";
import PillarsSection from "../components/landing/PillarsSection.tsx";
import SessionsSection from "../components/landing/SessionsSection.tsx";
import SponsorsSection from "../components/landing/SponsorsSection.tsx";
import VenuesSection from "../components/landing/VenuesSection.tsx";
import { landingContent } from "../content/landing.ts";
import "../index.css";

const LandingPage: FC = () => {
  const { hero, pillars, sessions, venues, sponsors } = landingContent;

  return (
    <Layout>
      <Hero content={hero} />
      <PillarsSection content={pillars} />
      <SessionsSection content={sessions} />
      <VenuesSection content={venues} />
      <SponsorsSection content={sponsors} />
    </Layout>
  );
};

export default LandingPage;
