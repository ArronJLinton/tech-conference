import { useSearchParams } from "react-router";
import {
  isLanguageCodename,
  type LanguageCodenames,
} from "../model/system/languages.generated.ts";

export type DeliveryParams = {
  preview: boolean;
  language: LanguageCodenames | null;
};

export const deliveryParamsFromSearch = (search: string): DeliveryParams => {
  const params = new URLSearchParams(search);
  const language = params.get("lang")?.trim() ?? "";

  return {
    preview: params.get("preview") === "true",
    language: isLanguageCodename(language) ? language : null,
  };
};

export const deliverySearch = (
  delivery: DeliveryParams,
  extra?: Record<string, string | null | undefined>,
) => {
  const params = new URLSearchParams();

  if (delivery.preview) {
    params.set("preview", "true");
  }

  if (delivery.language) {
    params.set("lang", delivery.language);
  }

  for (const [key, value] of Object.entries(extra ?? {})) {
    if (value) {
      params.set(key, value);
    }
  }

  const value = params.toString();
  return value ? `?${value}` : "";
};

export const useDeliveryParams = (): DeliveryParams => {
  const [searchParams] = useSearchParams();
  return deliveryParamsFromSearch(searchParams.toString());
};
