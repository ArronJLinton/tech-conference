import {
  createDisableFeaturesDataAttribute,
  createEnvironmentDataAttribute,
  createItemDataAttribute,
  createLanguageDataAttribute,
} from "@kontent-ai/smart-link";
import type { IContentItem } from "@kontent-ai/delivery-sdk";
import { useSuspenseQueries } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect } from "react";
import BodyCopy from "../components/landing/BodyCopy.tsx";
import EventsSection from "../components/landing/EventsSection.tsx";
import FeaturedContent from "../components/landing/FeaturedContent.tsx";
import Hero from "../components/landing/Hero.tsx";
import SmartLink from "../components/SmartLink.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import "../index.css";
import { isPageType, type PageType } from "../model/index.ts";
import { fetchEvents } from "../utils/events.ts";
import { fetchConferenceLandingPage } from "../utils/landingPage.ts";

const featuredItems = (
  featuredContent: readonly IContentItem[],
  carouselItems: readonly IContentItem[],
) => {
  const seen = new Set<string>();

  return [...featuredContent, ...carouselItems].filter((item) => {
    if (seen.has(item.system.id)) {
      return false;
    }

    seen.add(item.system.id);
    return true;
  });
};

const LandingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const [{ data: landingPage }, { data: events }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["landing-page", environmentId, "conference_agenda"],
        queryFn: () => fetchConferenceLandingPage(environmentId, apiKey),
      },
      {
        queryKey: ["events", environmentId, "conference_agenda"],
        queryFn: () => fetchEvents(environmentId, apiKey),
      },
    ],
  });

  useEffect(() => {
    const headline = landingPage?.elements.headline.value;
    if (headline) {
      document.title = headline;
    }
  }, [landingPage]);

  if (!landingPage) {
    return (
      <p className="container px-6 py-24 text-mist">
        No published landing page was found in the conference info collection.
      </p>
    );
  }

  const heroImage = landingPage.elements.hero_image.value[0];
  const eventCodenames = new Set(events.map((event) => event.system.codename));
  const eventsPage = landingPage.elements.untitled_subpages.linkedItems.find(
    (item): item is PageType =>
      isPageType(item) &&
      item.elements.featured_content.value.some((codename) => eventCodenames.has(codename)),
  );

  return (
    <SmartLink>
      <div
        {...createEnvironmentDataAttribute(environmentId)}
        {...createLanguageDataAttribute(landingPage.system.language)}
        {...createItemDataAttribute(landingPage.system.id)}
        {...createDisableFeaturesDataAttribute()}
      >
        <Hero
          headline={landingPage.elements.headline.value}
          subheadline={landingPage.elements.subheadline.value}
          imageUrl={heroImage?.url}
          imageAlt={heroImage?.description ?? heroImage?.name}
        />
        <BodyCopy body={landingPage.elements.body_copy} />
        <EventsSection
          events={events}
          eventsPagePath={`/${eventsPage?.system.codename ?? "events_page"}`}
        />
        <FeaturedContent
          items={featuredItems(
            landingPage.elements.featured_content.linkedItems,
            landingPage.elements.featured_content_a57b567.linkedItems,
          )}
          autoplay={
            landingPage.elements.carousel.value.length === 0 ||
            landingPage.elements.carousel.value.some((option) => option.codename === "automatic")
          }
        />
      </div>
    </SmartLink>
  );
};

export default LandingPage;
