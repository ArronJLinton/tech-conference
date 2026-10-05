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
  hero: HeroContent;
  pillars: PillarsContent;
  sessions: SessionsContent;
  venues: VenuesContent;
  sponsors: SponsorsContent;
  footer: FooterContent;
};

/** Static scaffold. Swap this object for Kontent.ai delivery content later. */
export const landingContent: LandingContent = {
  navigation: [
    { label: "Agenda", href: "#sessions" },
    { label: "Speakers", href: "#sessions" },
    { label: "Sessions", href: "#sessions" },
    { label: "Venues", href: "#venues" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "About", href: "#program" },
  ],
  hero: {
    eyebrow: "Converge  //  2026 Global Summit",
    titleLines: ["Where distributed", "architecture"],
    titleAccent: "Converges.",
    description:
      "A four-day gathering for the people building the systems under finance, climate, cities, and the public internet. One program, hosted in parallel across Denver, Singapore, and London.",
    primaryCta: { label: "Explore agenda", href: "#sessions" },
    secondaryCta: { label: "View venues", href: "#venues" },
    meta: [
      { icon: "calendar", label: "Oct 12–15, 2026" },
      { icon: "pin", label: "Denver · Singapore · London" },
      { icon: "broadcast", label: "Hybrid · 3 cities · 1 program" },
    ],
    visualCaption: "Three host cities. One shared clock.",
    visualStatus: "Live program",
  },
  pillars: {
    id: "program",
    title: "Engineered for the zero-latency future",
    description:
      "Converge is built for practitioners who ship the hard parts: routing, shared state, and the contracts between them. Three tracks. One floor.",
    items: [
      {
        index: "01",
        kicker: "The fabric",
        title: "Fast-capital engineering exchange",
        body: "Move value and state across regions without waiting on a central clock. Routing, exchange fabrics, and failure domains that stay boring under load.",
      },
      {
        index: "02",
        kicker: "The ledger",
        title: "Joint knowledge, shared accumulation",
        body: "Keep one source of truth when the writers sit on three continents. Consensus, replay, and the human layer wrapped around the log.",
      },
      {
        index: "03",
        kicker: "The surface",
        title: "Headless infrastructure architecture",
        body: "APIs, edge runtimes, and the interfaces operators actually live in. Fewer dashboards. Clearer contracts between the rooms.",
      },
    ],
    notes: [
      { icon: "cpu", label: "Autonomous agent test nets" },
      { icon: "spark", label: "Deterministic inference lanes" },
      { icon: "broadcast", label: "One channel, many rooms" },
    ],
  },
  sessions: {
    id: "sessions",
    title: "Flagship sessions & research keynotes",
    description:
      "The rooms the rest of the program is scheduled around. Research, field reports, and one live systems critique.",
    action: { label: "View the full agenda", href: "#sessions" },
    items: [
      {
        tags: [
          { label: "Keynote", tone: "cyan" },
          { label: "Research", tone: "violet" },
        ],
        title: "Deterministic agent runtimes on high-uptime fabrics",
        summary:
          "What it takes to run autonomous workers beside production traffic without giving up a replayable trail.",
        speaker: "Amira Shah",
        role: "Protocol, Northgrid",
      },
      {
        tags: [
          { label: "Systems", tone: "cyan" },
          { label: "Live", tone: "mist" },
        ],
        title: "Heat-resistant meshes and memory-constrained pipelines",
        summary:
          "A field report from teams pushing inference to the edge when the budget is watts, not GPUs.",
        speaker: "Leo Okonkwo",
        role: "Runtime, Daybreak",
      },
      {
        tags: [
          { label: "Architecture", tone: "violet" },
          { label: "Graph", tone: "mist" },
        ],
        title: "Convergent architecture and the content graph",
        summary:
          "Trust, provenance, and how a shared graph stays coherent when every city writes at once.",
        speaker: "Hana Ito",
        role: "Graph, Emberleaf",
      },
    ],
  },
  venues: {
    id: "venues",
    title: "Host cities & venues",
    description:
      "Two flagship rooms this year, linked to a broadcast hall in London. Every session is free, in the room or on the broadcast.",
    items: [
      {
        city: "Denver",
        name: "The Joule Center at University of Denver",
        detail: "Denver, USA · In person and broadcast · Doors 08:00 local",
        map: "grid",
      },
      {
        city: "Singapore",
        name: "Servo Centre, one-north",
        detail: "Singapore · In person and broadcast · Linked to the Denver clock",
        map: "coast",
      },
    ],
  },
  sponsors: {
    id: "sponsors",
    title: "Infrastructure patrons & ecosystem",
    description: "The companies underwriting the rooms, the broadcast, and the open program notes.",
    action: { label: "Become a patron", href: "#sponsors" },
    names: ["Emberleaf", "CloudRoute", "Northgrid", "A. Neural", "Daybreak", "Redline"],
    note: "Patron briefings run all four days, in every host city.",
    noteCta: { label: "Patron prospectus", href: "#sponsors" },
  },
  footer: {
    blurb:
      "The global summit for people who build distributed systems and stay in the room while they fail over.",
    socials: [
      { label: "Converge on X", href: "#sponsors", icon: "x" },
      { label: "Converge on LinkedIn", href: "#sponsors", icon: "linkedin" },
      { label: "Converge on YouTube", href: "#sessions", icon: "youtube" },
    ],
    columns: [
      {
        title: "Program",
        links: [
          { label: "Agenda", href: "#sessions" },
          { label: "Speakers", href: "#sessions" },
          { label: "Sessions", href: "#sessions" },
          { label: "Research notes", href: "#program" },
        ],
      },
      {
        title: "Attend",
        links: [
          { label: "Sessions", href: "#sessions" },
          { label: "Speakers", href: "#sessions" },
          { label: "Venues", href: "#venues" },
          { label: "Broadcast", href: "#sessions" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Sponsors", href: "#sponsors" },
          { label: "Press", href: "#sponsors" },
          { label: "Contact", href: "#sponsors" },
          { label: "Code of conduct", href: "#program" },
        ],
      },
    ],
    copyright: "© 2026 Converge. All rights reserved.",
    legal: [
      { label: "Privacy", href: "#program" },
      { label: "Terms", href: "#program" },
    ],
  },
};
