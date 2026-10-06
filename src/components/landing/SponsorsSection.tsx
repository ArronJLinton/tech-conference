import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import {
  PortableText,
  type PortableTextReactResolvers,
} from "@kontent-ai/rich-text-resolver-react";
import {
  createElementCodenameDataAttribute,
  createItemDataAttribute,
} from "@kontent-ai/smart-link";
import type { FC } from "react";
import type { CompanyType } from "../../model/index.ts";
import { TextLink } from "../ui/Button.tsx";
import { cardClassName } from "../ui/Card.tsx";
import Section from "../ui/Section.tsx";
import SectionHeading from "../ui/SectionHeading.tsx";

type SponsorsSectionProps = {
  sponsors: CompanyType[];
};

const bioResolvers: PortableTextReactResolvers = {
  block: {
    h1: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
    h2: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
    h3: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
    normal: ({ children }) => <p className="text-sm leading-relaxed text-mist">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-sm text-mist">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-mist">{children}</ol>
    ),
  },
};

const SponsorsSection: FC<SponsorsSectionProps> = ({ sponsors }) => {
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <Section
      id="sponsors"
      labelledBy="sponsors-heading"
      className="border-t border-line/80 py-16 md:py-24"
    >
      <SectionHeading id="sponsors-heading" title="Sponsors" />
      <ul className="grid gap-4 md:grid-cols-3">
        {sponsors.map((sponsor) => {
          const image = sponsor.elements.images.value[0];
          const bio = sponsor.elements.short_bio.value;
          const title = sponsor.elements.title.value;

          return (
            <li
              key={sponsor.system.id}
              className={`${cardClassName} flex h-full flex-col p-6`}
              {...createItemDataAttribute(sponsor.system.id)}
            >
              {image ? (
                <div
                  className="mb-5 flex h-16 items-center"
                  {...createElementCodenameDataAttribute("images")}
                >
                  <img
                    src={`${image.url}?auto=format&w=480`}
                    alt={image.description ?? image.name ?? title}
                    className="max-h-16 w-auto max-w-full object-contain"
                  />
                </div>
              ) : null}
              <h3
                className="font-family-display text-xl font-semibold text-paper"
                {...createElementCodenameDataAttribute("title")}
              >
                {title}
              </h3>
              {bio ? (
                <div
                  className="mt-3 flex flex-col gap-3"
                  {...createElementCodenameDataAttribute("short_bio")}
                >
                  <PortableText value={transformToPortableText(bio)} components={bioResolvers} />
                </div>
              ) : null}
              <div className="mt-6" {...createElementCodenameDataAttribute("company_url")}>
                <TextLink href={sponsor.elements.company_url.value} external={true}>
                  Visit {title}
                </TextLink>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default SponsorsSection;
