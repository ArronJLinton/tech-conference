import { createDeliveryClient } from "@kontent-ai/delivery-sdk";
import type { CoreClientTypes } from "../model/index.ts";
import type { LanguageCodenames } from "../model/system/languages.generated.ts";

export const createClient = (environmentId: string, previewApiKey: string, preview = false) =>
  createDeliveryClient<CoreClientTypes>({
    environmentId,
    previewApiKey: previewApiKey,
    defaultQueryConfig: {
      usePreviewMode: preview,
    },
    proxy: {
      basePreviewUrl: import.meta.env.VITE_DELIVER_URL as string | undefined,
    },
  });

export const withLanguage = <T extends { languageParameter: (language: LanguageCodenames) => T }>(
  query: T,
  language: LanguageCodenames | null,
) => (language ? query.languageParameter(language) : query);
