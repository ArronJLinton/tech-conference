import {
  createDisableFeaturesDataAttribute,
  createElementCodenameDataAttribute,
  createEnvironmentDataAttribute,
  createItemDataAttribute,
  createLanguageDataAttribute,
} from "@kontent-ai/smart-link";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import AgendaSessions from "../components/agenda/AgendaSessions.tsx";
import BodyCopy from "../components/landing/BodyCopy.tsx";
import SponsorsSection from "../components/landing/SponsorsSection.tsx";
import SmartLink from "../components/SmartLink.tsx";
import Section from "../components/ui/Section.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import { isAgendaSessionSlotType, isCompanyType } from "../model/index.ts";
import { fetchPage } from "../utils/pages.ts";

const ContentPage: FC = () => {
  const { pageCodename } = useParams();
  const { environmentId, apiKey } = useAppContext();
  const { data: page } = useSuspenseQuery({
    queryKey: ["page", environmentId, pageCodename],
    queryFn: () => fetchPage(environmentId, apiKey, pageCodename ?? ""),
  });

  useEffect(() => {
    const headline = page?.elements.headline.value;
    if (headline) {
      document.title = headline;
    }
  }, [page]);

  if (!page) {
    return (
      <p className="container px-6 py-24 text-mist">This page is not in the published content.</p>
    );
  }

  const sessions = page.elements.featured_content.linkedItems.filter(isAgendaSessionSlotType);
  const sponsors = page.elements.sponsors.linkedItems.filter(isCompanyType);

  return (
    <SmartLink>
      <div
        {...createEnvironmentDataAttribute(environmentId)}
        {...createLanguageDataAttribute(page.system.language)}
        {...createItemDataAttribute(page.system.id)}
        {...createDisableFeaturesDataAttribute()}
      >
        <Section className="pt-12 pb-4 md:pt-16">
          <h1
            className="font-family-display max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-paper md:text-5xl"
            {...createElementCodenameDataAttribute("headline")}
          >
            {page.elements.headline.value}
          </h1>
          {page.elements.subheadline.value ? (
            <p
              className="mt-4 max-w-2xl text-base leading-relaxed text-mist"
              {...createElementCodenameDataAttribute("subheadline")}
            >
              {page.elements.subheadline.value}
            </p>
          ) : null}
        </Section>
        <BodyCopy
          body={page.elements.body_copy}
          className="border-t border-line/80 py-10 md:py-12"
        />
        <AgendaSessions sessions={sessions} />
        <SponsorsSection sponsors={sponsors} showHeading={false} />
      </div>
    </SmartLink>
  );
};

export default ContentPage;
