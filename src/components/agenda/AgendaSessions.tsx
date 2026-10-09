import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import {
  PortableText,
  type PortableTextReactResolvers,
} from "@kontent-ai/rich-text-resolver-react";
import {
  createElementCodenameDataAttribute,
  createItemDataAttribute,
} from "@kontent-ai/smart-link";
import type { FC } from "react";
import {
  type AgendaSessionSlotType,
  isCompanyType,
  isPresentationType,
  isSpeakerType,
  type SpeakerType,
} from "../../model/index.ts";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type AgendaSessionsProps = {
  sessions: AgendaSessionSlotType[];
  heading?: string;
  locale?: string;
};

const summaryResolvers: PortableTextReactResolvers = {
  block: {
    h1: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
    h2: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
    h3: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
    normal: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-sm text-mist">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-mist">{children}</ol>
    ),
  },
};

const formatTimestamp = (value: string | null, timeZone: string | null, locale = "en") => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: timeZone ?? "UTC",
  };

  try {
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch {
    return new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(date);
  }
};

const SpeakerLine: FC<{ speaker: SpeakerType }> = ({ speaker }) => {
  const photo = speaker.elements.photo.value[0];
  const company = speaker.elements.company.linkedItems.find(isCompanyType);

  return (
    <div className="flex items-center gap-3" {...createItemDataAttribute(speaker.system.id)}>
      {photo ? (
        <img
          src={`${photo.url}?auto=format&w=96`}
          alt={photo.description ?? speaker.elements.name.value}
          className="size-10 rounded-full object-cover"
          {...createElementCodenameDataAttribute("photo")}
        />
      ) : null}
      <div>
        <p className="text-sm text-paper" {...createElementCodenameDataAttribute("name")}>
          {speaker.elements.name.value}
        </p>
        <p className="text-xs text-mist" {...createElementCodenameDataAttribute("title")}>
          {speaker.elements.title.value}
          {company ? ` · ${company.elements.title.value}` : ""}
        </p>
      </div>
    </div>
  );
};

const AgendaSessions: FC<AgendaSessionsProps> = ({ sessions, heading, locale = "en" }) => {
  if (sessions.length === 0) {
    return null;
  }

  const ordered = [...sessions].sort((left, right) =>
    (left.elements.start_time.value ?? "").localeCompare(right.elements.start_time.value ?? ""),
  );

  return (
    <Section
      labelledBy={heading ? "presentations-heading" : undefined}
      className="border-t border-line/80 py-12 md:py-16"
    >
      {heading ? <SectionHeading id="presentations-heading" title={heading} /> : null}
      <ol className="flex flex-col">
        {ordered.map((session) => {
          const start = formatTimestamp(
            session.elements.start_time.value,
            session.elements.start_time.displayTimeZone,
            locale,
          );
          const end = formatTimestamp(
            session.elements.end_time.value,
            session.elements.end_time.displayTimeZone,
            locale,
          );
          const regions = session.elements.region.value.map((term) => term.name).filter(Boolean);
          const presentations =
            session.elements.presentation.linkedItems.filter(isPresentationType);
          const speakers = session.elements.assigned_speakers.linkedItems.filter(isSpeakerType);

          return (
            <li
              key={session.system.id}
              className="grid gap-6 border-b border-line/80 py-8 md:grid-cols-[220px_minmax(0,1fr)]"
              {...createItemDataAttribute(session.system.id)}
            >
              <div>
                {start ? (
                  <p
                    className="text-sm leading-relaxed text-paper"
                    {...createElementCodenameDataAttribute("start_time")}
                  >
                    {start}
                  </p>
                ) : null}
                {end ? (
                  <p
                    className="mt-1 text-sm leading-relaxed text-mist"
                    {...createElementCodenameDataAttribute("end_time")}
                  >
                    {end}
                  </p>
                ) : null}
                {regions.length > 0 ? (
                  <p
                    className="mt-4 text-[11px] font-semibold tracking-[0.16em] text-cyan uppercase"
                    {...createElementCodenameDataAttribute("region")}
                  >
                    {regions.join(", ")}
                  </p>
                ) : null}
                {session.elements.room.value ? (
                  <p
                    className="mt-2 text-sm text-mist"
                    {...createElementCodenameDataAttribute("room")}
                  >
                    Room {session.elements.room.value}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                {presentations.map((presentation) => {
                  const topics = presentation.elements.topic.value
                    .map((term) => term.name)
                    .filter(Boolean);

                  return (
                    <div
                      key={presentation.system.id}
                      {...createItemDataAttribute(presentation.system.id)}
                    >
                      {topics.length > 0 ? (
                        <p
                          className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase"
                          {...createElementCodenameDataAttribute("topic")}
                        >
                          {topics.join(" · ")}
                        </p>
                      ) : null}
                      <h2
                        className="font-family-display mt-2 text-2xl font-semibold text-paper"
                        {...createElementCodenameDataAttribute("title")}
                      >
                        {presentation.elements.title.value}
                      </h2>
                      {presentation.elements.summary.value ? (
                        <div className="mt-3" {...createElementCodenameDataAttribute("summary")}>
                          <PortableText
                            value={transformToPortableText(presentation.elements.summary.value)}
                            components={summaryResolvers}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {speakers.length > 0 ? (
                  <ul
                    className="flex flex-col gap-3"
                    {...createElementCodenameDataAttribute("assigned_speakers")}
                  >
                    {speakers.map((speaker) => (
                      <li key={speaker.system.id}>
                        <SpeakerLine speaker={speaker} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};

export default AgendaSessions;
