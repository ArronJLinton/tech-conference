import {
  createElementCodenameDataAttribute,
  createItemDataAttribute,
} from "@kontent-ai/smart-link";
import type { FC } from "react";
import { type EventType, isVenueType } from "../../model/index.ts";
import { TextLink } from "../ui/Button.tsx";
import { cardClassName } from "../ui/Card.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type EventsSectionProps = {
  events: EventType[];
};

const formatTimestamp = (value: string | null, timeZone: string | null) => {
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
    return new Intl.DateTimeFormat("en", options).format(date);
  } catch {
    return new Intl.DateTimeFormat("en", { ...options, timeZone: "UTC" }).format(date);
  }
};

const EventsSection: FC<EventsSectionProps> = ({ events }) => {
  if (events.length === 0) {
    return null;
  }

  const ordered = [...events].sort((left, right) =>
    (left.elements.start_and_end_date_time.value ?? "").localeCompare(
      right.elements.start_and_end_date_time.value ?? "",
    ),
  );

  return (
    <Section
      id="events"
      labelledBy="events-heading"
      className="border-t border-line/80 py-16 md:py-24"
    >
      <SectionHeading id="events-heading" title="Events" />
      <ul className="grid gap-4 md:grid-cols-2">
        {ordered.map((event) => {
          const image = event.elements.images.value[0];
          const title = event.elements.title.value;
          const start = formatTimestamp(
            event.elements.start_and_end_date_time.value,
            event.elements.start_and_end_date_time.displayTimeZone,
          );
          const end = formatTimestamp(
            event.elements.end_date_time.value,
            event.elements.end_date_time.displayTimeZone,
          );
          const venues = event.elements.venue.linkedItems.filter(isVenueType);

          return (
            <li
              key={event.system.id}
              className={`${cardClassName} flex h-full flex-col overflow-hidden`}
              {...createItemDataAttribute(event.system.id)}
            >
              {image ? (
                <div {...createElementCodenameDataAttribute("images")}>
                  <img
                    src={`${image.url}?auto=format&w=1200`}
                    alt={image.description ?? image.name ?? title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                <h3
                  className="font-family-display text-xl font-semibold text-paper"
                  {...createElementCodenameDataAttribute("title")}
                >
                  {title}
                </h3>
                {start ? (
                  <p
                    className="mt-3 text-sm text-paper"
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
                  <ul
                    className="mt-5 flex flex-col gap-4"
                    {...createElementCodenameDataAttribute("venue")}
                  >
                    {venues.map((venue) => {
                      const website = venue.elements.website.value;

                      return (
                        <li key={venue.system.id} {...createItemDataAttribute(venue.system.id)}>
                          <p
                            className="text-sm text-paper"
                            {...createElementCodenameDataAttribute("name")}
                          >
                            {venue.elements.name.value}
                          </p>
                          {venue.elements.location.value ? (
                            <p
                              className="mt-1 text-sm text-mist"
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
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default EventsSection;
