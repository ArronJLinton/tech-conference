import type { ConferenceInfoCollectionCodename } from "../model/collections/conference-info-collection.generated.ts";
import type { CzechLanguageCodename, EventType } from "../model/index.ts";
import { createClient } from "./client.ts";

const defaultLocation = "denver";
const brnoLocation = "brno";

export const czechLanguage = "cs" satisfies CzechLanguageCodename;

export const eventLocationLabel = (event: EventType) => {
  const [location] = event.elements.title.value.trim().split(/\s+/);
  return location || event.system.name;
};

export const usesCzechContent = (event: EventType) =>
  eventLocationLabel(event).toLowerCase() === brnoLocation;

export const selectedEvent = (events: readonly EventType[], codename: string | null) => {
  const requested = events.find((event) => event.system.codename === codename);
  if (requested) {
    return requested;
  }

  return (
    events.find((event) => eventLocationLabel(event).toLowerCase() === defaultLocation) ??
    events[0] ??
    null
  );
};

export const fetchEventByCodename = async (
  environmentId: string,
  apiKey: string,
  codename: string,
  language: CzechLanguageCodename,
): Promise<EventType | null> => {
  const response = await createClient(environmentId, apiKey)
    .items<EventType>()
    .equalsFilter("system.codename", codename)
    .languageParameter(language)
    .depthParameter(3)
    .limitParameter(1)
    .toPromise();

  return response.data.items[0] ?? null;
};

const conferenceInfoCollection = "conference_agenda" satisfies ConferenceInfoCollectionCodename;

export const fetchEvents = async (environmentId: string, apiKey: string): Promise<EventType[]> => {
  const response = await createClient(environmentId, apiKey)
    .items<EventType>()
    .type("event")
    .equalsFilter("system.collection", conferenceInfoCollection)
    .orderByAscending("elements.start_and_end_date_time")
    .depthParameter(1)
    .limitParameter(100)
    .toPromise();

  return response.data.items;
};
