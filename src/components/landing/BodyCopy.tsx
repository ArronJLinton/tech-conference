import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import {
  PortableText,
  type PortableTextReactResolvers,
} from "@kontent-ai/rich-text-resolver-react";
import type { FC } from "react";
import type { LandingPageType } from "../../model/index.ts";
import Section from "../ui/Section.tsx";

type BodyCopyProps = {
  body: LandingPageType["elements"]["body_copy"];
};

const resolvers: PortableTextReactResolvers = {
  block: {
    h1: ({ children }) => (
      <h2 className="font-family-display mt-8 text-3xl font-semibold text-paper">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="font-family-display mt-8 text-2xl font-semibold text-paper">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-family-display mt-6 text-xl font-semibold text-paper">{children}</h3>
    ),
    normal: ({ children }) => <p className="text-base leading-relaxed text-mist">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5 text-mist">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-5 text-mist">{children}</ol>,
  },
};

const BodyCopy: FC<BodyCopyProps> = ({ body }) => {
  if (!body.value) {
    return null;
  }

  return (
    <Section className="border-t border-line/80 py-16 md:py-24">
      <div className="flex max-w-3xl flex-col gap-4">
        <PortableText value={transformToPortableText(body.value)} components={resolvers} />
      </div>
    </Section>
  );
};

export default BodyCopy;
