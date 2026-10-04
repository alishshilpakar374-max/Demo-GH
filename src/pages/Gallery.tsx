// src/pages/Gallery.tsx
import { Maximize2 } from "lucide-react";

import { GALLERY_IMAGES } from "../data/gallery";
import { useAppDispatch } from "../hooks/hooks";
import { openLightbox } from "../features/slices/lightBoxSlice";
import { Container } from "../components";

export default function Gallery() {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <section
        id="gallery"
        className="scroll-mt-(--root-header-height) bg-bg-muted py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-primary">
              Visual Journeys
            </span>
            <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl md:text-5xl">
              Property &amp; Attractions Gallery
            </h2>
          </div>

          {/* Grid: first image is big (2x2), the rest are squares */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY_IMAGES.map((image, index) => {
              const isFeatured = index === 0;

              return (
                // <button>, not <div onClick>: keyboard users can Tab to it and press Enter
                <button
                  key={image.id}
                  type="button"
                  onClick={() => dispatch(openLightbox(index))}
                  aria-label={`Open image: ${image.alt}`}
                  className={`group relative block cursor-pointer overflow-hidden rounded-xl shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isFeatured ? "col-span-2 row-span-2" : "aspect-square"
                  }`}
                >
                  <img
                    src={image.thumb}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-bg-dark/25 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="h-8 w-8 text-text-light" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </Container>
  );
}
