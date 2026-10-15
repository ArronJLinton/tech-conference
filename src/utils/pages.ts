import type { PageType } from "../model/index.ts";
import { createClient, withLanguage } from "./client.ts";
import type { DeliveryParams } from "./deliveryParams.ts";

const diacritics = "áčďéěíňóřšťúůýž";
const ascii = "acdeeinorstuuyz";

export const pageSlug = (headline: string) => {
  const folded = headline
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/./g, (character) => {
      const index = diacritics.indexOf(character.toLowerCase());
      return index === -1 ? character : ascii[index] ?? character;
    });

  return folded
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const pagePath = (page: PageType) =>
  pageSlug(page.elements.headline.value) || page.system.codename;

const pagesQuery = (environmentId: string, apiKey: string, delivery: DeliveryParams) =>
  withLanguage(
    createClient(environmentId, apiKey, delivery.preview).items<PageType>().type("page"),
    delivery.language,
  );

const fetchPageByCodename = async (
  environmentId: string,
  apiKey: string,
  codename: string,
  delivery: DeliveryParams,
) => {
  const response = await pagesQuery(environmentId, apiKey, delivery)
    .equalsFilter("system.codename", codename)
    .limitParameter(1)
    .depthParameter(4)
    .toPromise();

  return response.data.items[0] ?? null;
};

export const fetchPage = async (
  environmentId: string,
  apiKey: string,
  slug: string,
  delivery: DeliveryParams,
): Promise<PageType | null> => {
  const requested = decodeURIComponent(slug);
  const byCodename = await fetchPageByCodename(environmentId, apiKey, requested, delivery);
  if (byCodename) {
    return byCodename;
  }

  const listing = await pagesQuery(environmentId, apiKey, delivery).limitParameter(100).toPromise();
  const match = listing.data.items.find(
    (item) => pageSlug(item.elements.headline.value) === pageSlug(requested),
  );

  if (!match) {
    return null;
  }

  return fetchPageByCodename(environmentId, apiKey, match.system.codename, delivery);
};
