import type { ConferenceInfoCollectionCodename } from "../model/collections/conference-info-collection.generated.ts";
import type { LandingPageType } from "../model/index.ts";
import { createClient } from "./client.ts";

const conferenceInfoCollection = "conference_agenda" satisfies ConferenceInfoCollectionCodename;

export const fetchConferenceLandingPage = async (
  environmentId: string,
  apiKey: string,
): Promise<LandingPageType | null> => {
  const response = await createClient(environmentId, apiKey)
    .items<LandingPageType>()
    .type("landing_page")
    .equalsFilter("system.collection", conferenceInfoCollection)
    .limitParameter(1)
    .depthParameter(2)
    .toPromise();

  return response.data.items[0] ?? null;
};
