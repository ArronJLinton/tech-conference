import {
  createDisableFeaturesDataAttribute,
  createEnvironmentDataAttribute,
  createItemDataAttribute,
  createLanguageDataAttribute,
} from "@kontent-ai/smart-link";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect } from "react";
import Layout from "../components/Layout.tsx";
import BodyCopy from "../components/landing/BodyCopy.tsx";
import Hero from "../components/landing/Hero.tsx";
import SmartLink from "../components/SmartLink.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import "../index.css";
import { fetchConferenceLandingPage } from "../utils/landingPage.ts";

const LandingPage: FC = () => {
  const { environmentId, apiKey } = useAppContext();
  const { data: landingPage } = useSuspenseQuery({
    queryKey: ["landing-page", environmentId, "conference_agenda"],
    queryFn: () => fetchConferenceLandingPage(environmentId, apiKey),
  });

  useEffect(() => {
    const headline = landingPage?.elements.headline.value;
    if (headline) {
      document.title = headline;
    }
  }, [landingPage]);

  if (!landingPage) {
    return (
      <Layout>
        <p className="container px-6 py-24 text-mist">
          No published landing page was found in the conference info collection.
        </p>
      </Layout>
    );
  }

  const heroImage = landingPage.elements.hero_image.value[0];

  return (
    <SmartLink>
      <Layout>
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
        </div>
      </Layout>
    </SmartLink>
  );
};

export default LandingPage;
