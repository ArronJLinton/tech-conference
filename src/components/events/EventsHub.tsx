import {
  createElementCodenameDataAttribute,
  createItemDataAttribute,
  createLanguageDataAttribute,
} from "@kontent-ai/smart-link";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useSearchParams } from "react-router";
import { useAppContext } from "../../context/AppContext.tsx";
import {
  type AgendaSessionSlotType,
  type EventType,
  isAgendaSessionSlotType,
  isCompanyType,
  isSpeakerType,
  isVenueType,
  type PageType,
  type SpeakerType,
} from "../../model/index.ts";
import {
  czechLanguage,
  eventLocationLabel,
  fetchEventByCodename,
  selectedEvent,
  usesCzechContent,
} from "../../utils/events.ts";
import AgendaSessions from "../agenda/AgendaSessions.tsx";
import Loader from "../Loader.tsx";
import BodyCopy from "../landing/BodyCopy.tsx";
import SponsorsSection from "../landing/SponsorsSection.tsx";
import { TextLink } from "../ui/Button.tsx";
import { cardClassName } from "../ui/Card.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type EventsHubProps = {
  page: PageType;
  events: EventType[];
};

const locationButtonClass =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2.5 text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

const hasRichText = (value: string) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim().length > 0;

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

const speakersFor = (sessions: readonly AgendaSessionSlotType[]) => {
  const speakers = sessions.flatMap((session) =>
    session.elements.assigned_speakers.linkedItems.filter(isSpeakerType),
  );
  return [...new Map(speakers.map((speaker) => [speaker.system.id, speaker])).values()];
};

const SpeakerCard: FC<{ speaker: SpeakerType }> = ({ speaker }) => {
  const photo = speaker.elements.photo.value[0];
  const company = speaker.elements.company.linkedItems.find(isCompanyType);

  return (
    <li
      className={`${cardClassName} flex items-center gap-4 p-5`}
      {...createItemDataAttribute(speaker.system.id)}
    >
      {photo ? (
        <img
          src={`${photo.url}?auto=format&w=160`}
          alt={photo.description ?? speaker.elements.name.value}
          className="size-14 rounded-full object-cover"
          {...createElementCodenameDataAttribute("photo")}
        />
      ) : null}
      <div>
        <p className="text-sm text-paper" {...createElementCodenameDataAttribute("name")}>
          {speaker.elements.name.value}
        </p>
        <p className="mt-1 text-xs text-mist" {...createElementCodenameDataAttribute("title")}>
          {speaker.elements.title.value}
          {company ? ` · ${company.elements.title.value}` : ""}
        </p>
      </div>
    </li>
  );
};

const EventsHub: FC<EventsHubProps> = ({ page, events }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { environmentId, apiKey } = useAppContext();
  const ordered = [...events].sort((left, right) =>
    (left.elements.start_and_end_date_time.value ?? "").localeCompare(
      right.elements.start_and_end_date_time.value ?? "",
    ),
  );
  const selection = selectedEvent(ordered, searchParams.get("event"));
  const useCzech = selection ? usesCzechContent(selection) : false;
  const { data: czechEvent, isPending } = useQuery({
    queryKey: ["event", environmentId, selection?.system.codename ?? "", czechLanguage],
    queryFn: () =>
      fetchEventByCodename(environmentId, apiKey, selection?.system.codename ?? "", czechLanguage),
    enabled: useCzech,
  });

  if (!selection) {
    return null;
  }

  const event = useCzech ? (czechEvent ?? (isPending ? null : selection)) : selection;
  const locale = event?.system.language === czechLanguage ? czechLanguage : "en";
  const start = event
    ? formatTimestamp(
        event.elements.start_and_end_date_time.value,
        event.elements.start_and_end_date_time.displayTimeZone,
        locale,
      )
    : null;
  const end = event
    ? formatTimestamp(
        event.elements.end_date_time.value,
        event.elements.end_date_time.displayTimeZone,
        locale,
      )
    : null;
  const venues = event?.elements.venue.linkedItems.filter(isVenueType) ?? [];
  const sessions = event?.elements.agenda.linkedItems.filter(isAgendaSessionSlotType) ?? [];
  const speakers = speakersFor(sessions);
  const sponsors = event?.elements.sponsors.linkedItems.filter(isCompanyType) ?? [];
  const eventImage = event?.elements.images.value[0];
  const venueHasImage = venues.some((venue) => venue.elements.images.value.length > 0);
  const body = page.elements.body_copy.value;

  return (
    <>
      <Section className="pt-12 pb-4 md:pt-16">
        <h1
          className="font-family-display max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-paper md:text-5xl"
          {...createElementCodenameDataAttribute("headline")}
        >
          {page.elements.headline.value}
        </h1>
        {page.elements.subheadline.value ? (
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed text-mist"
            {...createElementCodenameDataAttribute("subheadline")}
          >
            {page.elements.subheadline.value}
          </p>
        ) : null}
        <fieldset className="mt-8 border-0 p-0">
          <legend className="sr-only">Event locations</legend>
          <div className="flex flex-wrap gap-3">
            {ordered.map((item) => {
              const isSelected = item.system.codename === selection.system.codename;
              return (
                <button
                  key={item.system.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSearchParams({ event: item.system.codename })}
                  className={`${locationButtonClass} ${
                    isSelected
                      ? "border border-cyan bg-cyan text-ink"
                      : "border border-line bg-transparent text-paper hover:border-cyan hover:text-cyan"
                  }`}
                >
                  {eventLocationLabel(item)}
                </button>
              );
            })}
          </div>
        </fieldset>
      </Section>
      {hasRichText(body) ? (
        <BodyCopy
          body={page.elements.body_copy}
          className="border-t border-line/80 py-10 md:py-12"
        />
      ) : null}
      {event ? (
        <div
          {...createItemDataAttribute(event.system.id)}
          {...createLanguageDataAttribute(event.system.language)}
        >
          <Section className="border-t border-line/80 py-12 md:py-16">
            {eventImage && !venueHasImage ? (
              <img
                src={`${eventImage.url}?auto=format&w=1400`}
                alt={eventImage.description ?? eventImage.name ?? event.elements.title.value}
                className="mb-8 aspect-[16/7] w-full rounded-xl object-cover"
                {...createElementCodenameDataAttribute("images")}
              />
            ) : null}
            <h2
              className="font-family-display mb-8 text-2xl font-semibold uppercase leading-tight tracking-[0.04em] text-paper md:text-[1.65rem]"
              {...createElementCodenameDataAttribute("title")}
            >
              {event.elements.title.value}
            </h2>
            {start ? (
              <p
                className="text-sm text-paper"
                {...createElementCodenameDataAttribute("start_and_end_date_time")}
              >
                {start}
              </p>
            ) : null}
            {end ? (
              <p
                className="mt-1 text-sm text-mist"
                {...createElementCodenameDataAttribute("end_date_time")}
              >
                {end}
              </p>
            ) : null}
            {venues.length > 0 ? (
              <div className="mt-8">
                <h3 className="font-family-display text-lg font-semibold tracking-[0.04em] text-paper uppercase">
                  Venue
                </h3>
                <ul className="mt-4 grid gap-4" {...createElementCodenameDataAttribute("venue")}>
                  {venues.map((venue) => {
                    const image = venue.elements.images.value[0];
                    const website = venue.elements.website.value;

                    return (
                      <li
                        key={venue.system.id}
                        className={`${cardClassName} overflow-hidden`}
                        {...createItemDataAttribute(venue.system.id)}
                      >
                        {image ? (
                          <img
                            src={`${image.url}?auto=format&w=1400`}
                            alt={image.description ?? image.name ?? venue.elements.name.value}
                            className="aspect-[16/7] w-full object-cover"
                            {...createElementCodenameDataAttribute("images")}
                          />
                        ) : null}
                        <div className="p-6">
                          <p
                            className="font-family-display text-xl font-semibold text-paper"
                            {...createElementCodenameDataAttribute("name")}
                          >
                            {venue.elements.name.value}
                          </p>
                          {venue.elements.location.value ? (
                            <p
                              className="mt-2 text-sm text-mist"
                              {...createElementCodenameDataAttribute("location")}
                            >
                              {venue.elements.location.value}
                            </p>
                          ) : null}
                          {website ? (
                            <div
                              className="mt-4"
                              {...createElementCodenameDataAttribute("website")}
                            >
                              <TextLink href={website} external={true}>
                                Visit {venue.elements.name.value}
                              </TextLink>
                            </div>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </Section>
          <AgendaSessions sessions={sessions} heading="Presentations" locale={locale} />
          {speakers.length > 0 ? (
            <Section
              labelledBy="speakers-heading"
              className="border-t border-line/80 py-12 md:py-16"
            >
              <SectionHeading id="speakers-heading" title="Speakers" />
              <ul className="grid gap-4 md:grid-cols-2">
                {speakers.map((speaker) => (
                  <SpeakerCard key={speaker.system.id} speaker={speaker} />
                ))}
              </ul>
            </Section>
          ) : null}
          <SponsorsSection sponsors={sponsors} />
        </div>
      ) : (
        <div className="flex justify-center py-24">
          <Loader />
        </div>
      )}
    </>
  );
};

export default EventsHub;
