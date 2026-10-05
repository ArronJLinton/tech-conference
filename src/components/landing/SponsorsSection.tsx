import type { FC } from "react";
import type { SponsorsContent } from "../../content/landing.ts";
import Button, { TextLink } from "../ui/Button.tsx";
import { cardClassName } from "../ui/Card.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type SponsorsSectionProps = {
  content: SponsorsContent;
};

const wordmarks = [
  "font-family-display text-lg font-semibold tracking-[0.22em]",
  "text-xl font-medium italic tracking-tight",
  "font-family-display text-lg font-bold tracking-[0.08em]",
  "font-family-display text-sm font-semibold tracking-[0.28em]",
  "text-xl font-semibold tracking-tight",
  "font-family-display text-lg font-medium tracking-[0.16em]",
] as const;

const SponsorsSection: FC<SponsorsSectionProps> = ({ content }) => (
  <Section
    id={content.id}
    labelledBy="sponsors-heading"
    className="border-t border-line/80 py-16 md:py-24"
  >
    <SectionHeading
      id="sponsors-heading"
      title={content.title}
      description={content.description}
      action={
        <Button href={content.action.href} variant="secondary">
          {content.action.label}
        </Button>
      }
    />
    <div className={`${cardClassName} px-6 py-10 md:px-10`}>
      <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
        {content.names.map((name, index) => (
          <li
            key={name}
            className={`text-paper/80 uppercase ${wordmarks[index % wordmarks.length]}`}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-panel px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-mist">{content.note}</p>
      <TextLink href={content.noteCta.href}>{content.noteCta.label}</TextLink>
    </div>
  </Section>
);

export default SponsorsSection;
