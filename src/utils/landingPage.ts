import type { ConferenceInfoCollectionCodename } from "../model/collections/conference-info-collection.generated.ts";
import type { LandingPageType } from "../model/index.ts";
import { createClient, withLanguage } from "./client.ts";
import type { DeliveryParams } from "./deliveryParams.ts";

const conferenceInfoCollection = "conference_agenda" satisfies ConferenceInfoCollectionCodename;

export const fetchConferenceLandingPage = async (
  environmentId: string,
  apiKey: string,
  delivery: DeliveryParams,
): Promise<LandingPageType | null> => {
  const response = await withLanguage(
    createClient(environmentId, apiKey, delivery.preview)
      .items<LandingPageType>()
      .type("landing_page")
      .equalsFilter("system.collection", conferenceInfoCollection)
      .limitParameter(1)
      .depthParameter(2),
    delivery.language,
  ).toPromise();

  return response.data.items[0] ?? null;
};
