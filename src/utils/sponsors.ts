import type { SponsorsCollectionCodename } from "../model/collections/sponsors-collection.generated.ts";
import type { CompanyType } from "../model/index.ts";
import { createClient, withLanguage } from "./client.ts";
import type { DeliveryParams } from "./deliveryParams.ts";

const sponsorsCollection = "sponsorship" satisfies SponsorsCollectionCodename;

export const fetchSponsors = async (
  environmentId: string,
  apiKey: string,
  delivery: DeliveryParams,
): Promise<CompanyType[]> => {
  const response = await withLanguage(
    createClient(environmentId, apiKey, delivery.preview)
      .items<CompanyType>()
      .type("company")
      .equalsFilter("system.collection", sponsorsCollection)
      .orderByAscending("system.name")
      .limitParameter(100),
    delivery.language,
  ).toPromise();

  return response.data.items;
};
