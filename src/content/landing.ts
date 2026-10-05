import type { IconName } from "../components/ui/Icon.tsx";

export type LinkItem = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  titleLines: readonly string[];
  titleAccent: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  meta: readonly { icon: IconName; label: string }[];
  visualCaption: string;
  visualStatus: string;
};

export type Pillar = {
  index: string;
  kicker: string;
  title: string;
  body: string;
};

export type PillarsContent = {
  id: string;
  title: string;
  description: string;
  items: readonly Pillar[];
  notes: readonly { icon: IconName; label: string }[];
};

export type SessionTag = {
  label: string;
  tone: "cyan" | "violet" | "mist";
};

export type SessionItem = {
  tags: readonly SessionTag[];
  title: string;
  summary: string;
  speaker: string;
  role: string;
};

export type SessionsContent = {
  id: string;
  title: string;
  description: string;
  action: LinkItem;
  items: readonly SessionItem[];
};

export type VenueItem = {
  city: string;
  name: string;
  detail: string;
  map: "grid" | "coast";
};

export type VenuesContent = {
  id: string;
  title: string;
  description: string;
  items: readonly VenueItem[];
};

export type SponsorsContent = {
  id: string;
  title: string;
  description: string;
  action: LinkItem;
  names: readonly string[];
  note: string;
  noteCta: LinkItem;
};

export type FooterContent = {
  blurb: string;
  socials: readonly { label: string; href: string; icon: IconName }[];
  columns: readonly { title: string; links: readonly LinkItem[] }[];
  copyright: string;
  legal: readonly LinkItem[];
};

export type LandingContent = {
  navigation: readonly LinkItem[];
  footer: FooterContent;
};

export const landingContent: LandingContent = {
  navigation: [],
  footer: {
    blurb: "",
    socials: [],
    columns: [],
    copyright: "© 2026",
    legal: [],
  },
};
