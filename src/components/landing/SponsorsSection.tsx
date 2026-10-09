import type { FC } from "react";
import type { CompanyType } from "../../model/index.ts";
import Container from "../Container.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";
import ImageCarousel from "./ImageCarousel.tsx";

type SponsorsSectionProps = {
  sponsors: CompanyType[];
  showHeading?: boolean;
  autoplay?: boolean;
};

const SponsorsSection: FC<SponsorsSectionProps> = ({
  sponsors,
  showHeading = true,
  autoplay = true,
}) => {
  const images = sponsors.flatMap((sponsor) =>
    sponsor.elements.images.value.map((image) => ({
      key: `${sponsor.system.id}-${image.url}`,
      url: image.url,
      alt: image.description ?? image.name ?? sponsor.elements.title.value,
      itemId: sponsor.system.id,
    })),
  );

  if (images.length === 0) {
    return null;
  }

  return (
    <Section
      id="sponsors"
      labelledBy={showHeading ? "sponsors-heading" : undefined}
      contained={false}
      className="border-t border-line/80 py-16 md:py-24"
    >
      {showHeading ? (
        <Container>
          <SectionHeading id="sponsors-heading" title="Sponsors" />
        </Container>
      ) : null}
      <ImageCarousel images={images} label="Sponsors" autoplay={autoplay} visibleCount={3} />
    </Section>
  );
};

export default SponsorsSection;
