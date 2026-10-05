import type { FC } from "react";
import type { SessionsContent } from "../../content/landing.ts";
import Badge from "../ui/Badge.tsx";
import { TextLink } from "../ui/Button.tsx";
import { cardClassName } from "../ui/Card.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type SessionsSectionProps = {
  content: SessionsContent;
};

const initialsFor = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

const SessionsSection: FC<SessionsSectionProps> = ({ content }) => (
  <Section
    id={content.id}
    labelledBy="sessions-heading"
    className="border-t border-line/80 py-16 md:py-24"
  >
    <SectionHeading
      id="sessions-heading"
      title={content.title}
      description={content.description}
      action={<TextLink href={content.action.href}>{content.action.label}</TextLink>}
    />
    <div className="grid gap-4 lg:grid-cols-3">
      {content.items.map((session) => (
        <article key={session.title} className={`${cardClassName} flex h-full flex-col p-6`}>
          <div className="flex flex-wrap gap-2">
            {session.tags.map((tag) => (
              <Badge key={tag.label} tone={tag.tone}>
                {tag.label}
              </Badge>
            ))}
          </div>
          <h3 className="font-family-display mt-5 text-lg font-semibold leading-snug tracking-tight text-paper">
            {session.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mist">{session.summary}</p>
          <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-[11px] font-semibold text-ink"
            >
              {initialsFor(session.speaker)}
            </span>
            <div>
              <p className="text-sm font-medium text-paper">{session.speaker}</p>
              <p className="text-xs text-mist">{session.role}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default SessionsSection;
