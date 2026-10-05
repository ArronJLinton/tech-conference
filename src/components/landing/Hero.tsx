import type { FC } from "react";
import Section from "../ui/Section.tsx";
import HeroVisual from "./HeroVisual.tsx";

type HeroProps = {
  headline: string;
  subheadline: string;
  imageUrl?: string;
  imageAlt?: string;
};

const Hero: FC<HeroProps> = ({ headline, subheadline, imageUrl, imageAlt }) => (
  <Section className="pt-12 pb-16 md:pt-16 md:pb-24">
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
      <div>
        <h1 className="font-family-display text-[2.5rem] font-semibold leading-[0.98] tracking-tight text-paper sm:text-5xl lg:text-[3.15rem]">
          {headline}
        </h1>
        {subheadline ? (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist md:text-base">
            {subheadline}
          </p>
        ) : null}
      </div>
      {imageUrl ? (
        <figure className="overflow-hidden rounded-2xl border border-line bg-[#0b1018] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <img
            src={`${imageUrl}?auto=format&w=1400`}
            alt={imageAlt ?? ""}
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>
      ) : (
        <HeroVisual caption={headline} status="" />
      )}
    </div>
  </Section>
);

export default Hero;
