import type { FC, PropsWithChildren } from "react";
import Container from "../Container.tsx";

type SectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  labelledBy?: string;
}>;

const Section: FC<SectionProps> = ({ id, className = "", labelledBy, children }) => (
  <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-20 ${className}`}>
    <Container>{children}</Container>
  </section>
);

export default Section;
