// src/pages/Amenities.tsx

import { AMENITIES } from "../data/amenities";
import { Container } from "../components";

export default function Amenities() {
  return (
    <Container>
      <section
        id="amenities"
        className="scroll-mt-(--root-header-height) bg-bg py-20 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Elevated Living
              </span>

              <h2 className="font-heading text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl">
                Curated Guest
                <br className="hidden sm:block" />
                <span className="text-primary"> Amenities</span>
              </h2>

              {/* Heritage divider */}
              <div className="mt-5 flex items-center gap-2">
                <span className="h-px w-10 bg-gold/60 sm:w-14" />
                <span className="size-1.5 rotate-45 bg-gold" />
                <span className="h-px w-10 bg-gold/60 sm:w-14" />
              </div>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
              Immerse yourself in thoughtfully designed facilities crafted to
              rejuvenate your senses and enhance every moment of your stay.
            </p>
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AMENITIES.map(({ id, title, description, image, icon: Icon }) => (
              <article
                key={id}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-bg-dark/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Floating icon */}
                  <div className="absolute bottom-4 left-4 flex size-11 items-center justify-center rounded-xl border border-white/20 bg-bg-dark/60 text-gold shadow-lg backdrop-blur-md transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold group-hover:text-bg-dark">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-bold text-text sm:text-xl">
                    {title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                    {description}
                  </p>

                  {/* Decorative bottom line */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-px w-8 bg-gold/50 transition-all duration-300 group-hover:w-12 group-hover:bg-gold" />
                    <span className="size-1 rotate-45 bg-gold/70" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
