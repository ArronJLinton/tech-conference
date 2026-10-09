import {
  createElementCodenameDataAttribute,
  createItemDataAttribute,
} from "@kontent-ai/smart-link";
import type { FC, FocusEvent } from "react";
import { useEffect, useState } from "react";
import Icon from "../ui/Icon.tsx";

export type CarouselImage = {
  key: string;
  url: string;
  alt: string;
  itemId?: string;
};

type ImageCarouselProps = {
  images: readonly CarouselImage[];
  label?: string;
  autoplay?: boolean;
  visibleCount?: number;
};

const controlClassName =
  "inline-flex size-10 items-center justify-center rounded-full border border-line bg-ink/80 text-paper transition-colors hover:border-cyan hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan";

const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  label = "Images",
  autoplay = false,
  visibleCount = 1,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;
  const shown = Math.min(visibleCount, count);

  useEffect(() => {
    if (!autoplay || paused || count <= shown) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [autoplay, paused, count, shown]);

  if (count === 0 || shown === 0) {
    return null;
  }

  const show = (next: number) => {
    setIndex((next + count) % count);
  };

  const visible = Array.from({ length: shown }, (_, offset) => images[(index + offset) % count]);
  const resume = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setPaused(false);
    }
  };

  return (
    <section
      className="relative w-full px-4 md:px-8"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={resume}
    >
      <div className="relative">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${shown}, minmax(0, 1fr))` }}
        >
          {visible.map((image) => (
            <div
              key={image.key}
              className="flex aspect-[16/9] items-center justify-center rounded-2xl border border-line bg-panel p-6 md:p-10"
              {...(image.itemId ? createItemDataAttribute(image.itemId) : {})}
              {...(image.itemId ? createElementCodenameDataAttribute("images") : {})}
            >
              <img
                src={`${image.url}?auto=format&w=1200`}
                alt={image.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
        {count > shown ? (
          <div className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 items-center justify-between">
            <button
              type="button"
              className={`pointer-events-auto ${controlClassName}`}
              aria-label="Previous image"
              onClick={() => show(index - 1)}
            >
              <Icon name="arrow" className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              className={`pointer-events-auto ${controlClassName}`}
              aria-label="Next image"
              onClick={() => show(index + 1)}
            >
              <Icon name="arrow" className="size-4" />
            </button>
          </div>
        ) : null}
      </div>
      <p className="sr-only">
        {visible.map((image) => image.alt).join(", ")}, {shown} of {count}
      </p>
      {count > shown ? (
        <div className="mt-4 flex justify-center gap-2">
            {images.map((image, imageIndex) => {
              const selected = imageIndex === index;
              return (
                <button
                  key={image.key}
                  type="button"
                  aria-label={`Show image ${imageIndex + 1} of ${count}`}
                  aria-current={selected ? "true" : undefined}
                  className={`size-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${
                    selected ? "bg-cyan" : "bg-paper/50 hover:bg-paper"
                  }`}
                  onClick={() => setIndex(imageIndex)}
                />
              );
            })}
        </div>
      ) : null}
    </section>
  );
};

export default ImageCarousel;
