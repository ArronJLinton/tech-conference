import type { Elements, IContentItem } from "@kontent-ai/delivery-sdk";
import { createElementCodenameDataAttribute } from "@kontent-ai/smart-link";
import type { FC } from "react";
import {
  isCompanyType,
  isConferenceType,
  isEventType,
  isPresentationType,
  isVenueType,
} from "../../model/index.ts";
import Container from "../Container.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";
import ImageCarousel, { type CarouselImage } from "./ImageCarousel.tsx";

type FeaturedContentProps = {
  items: readonly IContentItem[];
  autoplay?: boolean;
};

const plainText = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const assetSlides = (
  itemId: string,
  label: string,
  images: Elements.AssetsElement["value"],
  elementCodename: string,
): CarouselImage[] => {
  if (images.length === 0) {
    return [{ key: itemId, itemId, alt: label, title: label, elementCodename }];
  }

  return images.map((image) => ({
    key: `${itemId}-${image.url}`,
    itemId,
    url: image.url,
    alt: image.description ?? image.name ?? label,
    elementCodename,
  }));
};

export const slidesFromContentItems = (items: readonly IContentItem[]): CarouselImage[] =>
  items.flatMap((item) => {
    if (isCompanyType(item)) {
      return assetSlides(item.system.id, item.elements.title.value, item.elements.images.value, "images");
    }

    if (isEventType(item) || isConferenceType(item)) {
      return assetSlides(item.system.id, item.elements.title.value, item.elements.images.value, "images");
    }

    if (isVenueType(item)) {
      return assetSlides(item.system.id, item.elements.name.value, item.elements.images.value, "images");
    }

    if (isPresentationType(item)) {
      return [
        {
          key: item.system.id,
          itemId: item.system.id,
          alt: item.elements.title.value,
          title: item.elements.title.value,
          summary: plainText(item.elements.summary.value),
          elementCodename: "summary",
        },
      ];
    }

    return [];
  });

const FeaturedContent: FC<FeaturedContentProps> = ({ items, autoplay = true }) => {
  const slides = slidesFromContentItems(items);

  if (slides.length === 0) {
    return null;
  }

  return (
    <Section
      id="featured"
      labelledBy="featured-heading"
      contained={false}
      className="border-t border-line/80 py-16 md:py-24"
    >
      <Container>
        <SectionHeading id="featured-heading" title="Featured" />
      </Container>
      <div {...createElementCodenameDataAttribute("featured_content")}>
        <ImageCarousel images={slides} label="Featured content" autoplay={autoplay} visibleCount={3} />
      </div>
    </Section>
  );
};

export default FeaturedContent;
