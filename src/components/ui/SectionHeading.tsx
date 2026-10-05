import type { FC, ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

const SectionHeading: FC<SectionHeadingProps> = ({ id, title, description, action }) => (
  <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      <h2
        id={id}
        className="font-family-display text-2xl font-semibold uppercase leading-tight tracking-[0.04em] text-paper md:text-[1.65rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-mist md:text-[15px]">{description}</p>
      ) : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);

export default SectionHeading;
