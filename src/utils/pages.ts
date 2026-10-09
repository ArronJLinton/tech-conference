import type { PageType } from "../model/index.ts";
import { createClient } from "./client.ts";

export const fetchPage = async (
  environmentId: string,
  apiKey: string,
  codename: string,
): Promise<PageType | null> => {
  const response = await createClient(environmentId, apiKey)
    .items<PageType>()
    .type("page")
    .equalsFilter("system.codename", codename)
    .limitParameter(1)
    .depthParameter(4)
    .toPromise();

  return response.data.items[0] ?? null;
};
