import type { PageType } from "../model/index.ts";
import { createClient, withLanguage } from "./client.ts";
import type { DeliveryParams } from "./deliveryParams.ts";

export const fetchPage = async (
  environmentId: string,
  apiKey: string,
  codename: string,
  delivery: DeliveryParams,
): Promise<PageType | null> => {
  const response = await withLanguage(
    createClient(environmentId, apiKey, delivery.preview)
      .items<PageType>()
      .type("page")
      .equalsFilter("system.codename", codename)
      .limitParameter(1)
      .depthParameter(4),
    delivery.language,
  ).toPromise();

  return response.data.items[0] ?? null;
};
