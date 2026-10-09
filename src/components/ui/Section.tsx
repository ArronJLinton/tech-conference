import type { FC, PropsWithChildren } from "react";
import Container from "../Container.tsx";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  labelledBy?: string;
  contained?: boolean;
}>;

const Section: FC<SectionProps> = ({
  id,
  className = "",
  labelledBy,
  contained = true,
  children,
}) => (
  <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-20 ${className}`}>
    {contained ? <Container>{children}</Container> : children}
  </section>
);

export default Section;
