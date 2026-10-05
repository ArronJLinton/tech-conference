import type { FC } from "react";
import type { PillarsContent } from "../../content/landing.ts";
import { cardClassName } from "../ui/Card.tsx";
import Icon from "../ui/Icon.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type PillarsSectionProps = {
  content: PillarsContent;
};

const PillarsSection: FC<PillarsSectionProps> = ({ content }) => (
  <Section
    id={content.id}
    labelledBy="program-heading"
    className="border-t border-line/80 py-16 md:py-24"
  >
    <SectionHeading id="program-heading" title={content.title} description={content.description} />
    <div className="grid gap-4 md:grid-cols-3">
      {content.items.map((pillar) => (
        <article key={pillar.index} className={`${cardClassName} flex h-full flex-col p-6`}>
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan uppercase">
              {pillar.kicker}
            </p>
            <p className="font-family-display text-sm text-mist">{pillar.index}</p>
          </div>
          <h3 className="font-family-display text-lg font-semibold uppercase leading-snug tracking-[0.03em] text-paper">
            {pillar.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">{pillar.body}</p>
        </article>
      ))}
    </div>
    <div className="mt-4 grid overflow-hidden rounded-xl border border-line md:grid-cols-3">
      {content.notes.map((note, index) => (
        <div
          key={note.label}
          className={`flex items-center gap-3 bg-panel px-5 py-4 ${index > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
        >
          <Icon name={note.icon} className="size-4 shrink-0 text-cyan" />
          <p className="text-[11px] font-semibold tracking-[0.14em] text-mist uppercase">
            {note.label}
          </p>
        </div>
      ))}
    </div>
  </Section>
);

export default PillarsSection;
