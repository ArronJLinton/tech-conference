import type { SponsorsCollectionCodename } from "../model/collections/sponsors-collection.generated.ts";
import type { CompanyType } from "../model/index.ts";
import { createClient } from "./client.ts";

const sponsorsCollection = "sponsorship" satisfies SponsorsCollectionCodename;

export const fetchSponsors = async (
  environmentId: string,
  apiKey: string,
): Promise<CompanyType[]> => {
  const response = await createClient(environmentId, apiKey)
    .items<CompanyType>()
    .type("company")
    .equalsFilter("system.collection", sponsorsCollection)
    .orderByAscending("system.name")
    .limitParameter(100)
    .toPromise();

  return response.data.items;
};
