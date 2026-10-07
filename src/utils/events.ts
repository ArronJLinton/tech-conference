import type { ConferenceInfoCollectionCodename } from "../model/collections/conference-info-collection.generated.ts";
import type { EventType } from "../model/index.ts";
import { createClient } from "./client.ts";

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
