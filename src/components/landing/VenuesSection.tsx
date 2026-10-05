import type { FC } from "react";
import type { VenuesContent } from "../../content/landing.ts";
import { cardClassName } from "../ui/Card.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";
import CityMap from "./CityMap.tsx";

type VenuesSectionProps = {
  content: VenuesContent;
};

const VenuesSection: FC<VenuesSectionProps> = ({ content }) => (
  <Section
    id={content.id}
    labelledBy="venues-heading"
    className="border-t border-line/80 py-16 md:py-24"
  >
    <SectionHeading id="venues-heading" title={content.title} description={content.description} />
    <div className="grid gap-4 md:grid-cols-2">
      {content.items.map((venue) => (
        <article key={venue.name} className={`${cardClassName} overflow-hidden`}>
          <div className="relative aspect-[16/9] border-b border-line">
            <CityMap variant={venue.map} />
            <p className="absolute top-4 left-4 rounded-sm border border-cyan/30 bg-ink/70 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-cyan uppercase">
              {venue.city}
            </p>
          </div>
          <div className="p-5">
            <h3 className="font-family-display text-lg font-semibold tracking-tight text-paper">
              {venue.name}
            </h3>
            <p className="mt-2 text-sm text-mist">{venue.detail}</p>
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default VenuesSection;
