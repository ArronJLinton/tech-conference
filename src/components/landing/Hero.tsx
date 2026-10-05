import type { FC } from "react";
import type { HeroContent } from "../../content/landing.ts";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";
import Section from "../ui/Section.tsx";
import HeroVisual from "./HeroVisual.tsx";

type HeroProps = {
  content: HeroContent;
};

const Hero: FC<HeroProps> = ({ content }) => (
  <Section className="pt-12 pb-16 md:pt-16 md:pb-24">
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.26em] text-cyan uppercase">
          {content.eyebrow}
        </p>
        <h1 className="font-family-display mt-4 text-[2.5rem] font-semibold uppercase leading-[0.96] tracking-[-0.03em] text-paper sm:text-5xl lg:text-[3.15rem]">
          {content.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block bg-gradient-to-r from-cyan via-[#8ea2ff] to-magenta bg-clip-text text-transparent">
            {content.titleAccent}
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist md:text-base">
          {content.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={content.primaryCta.href}>{content.primaryCta.label}</Button>
          <Button href={content.secondaryCta.href} variant="secondary">
            {content.secondaryCta.label}
          </Button>
        </div>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {content.meta.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-mist uppercase"
            >
              <Icon name={item.icon} className="size-3.5 text-cyan" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <HeroVisual caption={content.visualCaption} status={content.visualStatus} />
    </div>
  </Section>
);

export default Hero;
