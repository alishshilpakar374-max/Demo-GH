// src/pages/Dining.tsx
import { useState } from "react";
import { Coffee, Moon, Sun, Utensils, type LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { MEALS, type MealKey } from "../data/dining";
import { buildDiningUrl } from "../utils/whatsApp";
import { Container } from "../components";

const MEAL_ICONS: Record<MealKey, LucideIcon> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
};

const DINING_IMAGE =
  "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80";

export default function Dining() {
  // Local state: only this section cares which tab is open, so no Redux needed
  const [activeKey, setActiveKey] = useState<MealKey>("breakfast");

  const meal = MEALS.find((m) => m.key === activeKey) ?? MEALS[0];

  const handleReserve = () => {
    window.open(buildDiningUrl(meal.label), "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <section
        id="dining"
        className="scroll-mt-(--root-header-height) bg-bg py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-primary">
              Farm To Table
            </span>
            <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl md:text-5xl">
              Organic Dining
            </h2>
            <p className="mt-3 text-sm text-text-muted sm:text-base">
              Chef-curated meals crafted from organic herbs and local market
              harvests.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-4/5 overflow-hidden rounded-xl shadow-lg">
              <img
                src={DINING_IMAGE}
                alt="Chef-curated organic dishes"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-bg-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-text-light">
                <Utensils className="h-6 w-6 text-gold" />
                <span className="font-heading text-lg">
                  Open daily for guests
                </span>
              </div>
            </div>

            {/* Menu */}
            <div>
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Meal times"
                className="mb-8 flex flex-wrap gap-2"
              >
                {MEALS.map(({ key, label }) => {
                  const Icon = MEAL_ICONS[key];
                  const isActive = key === activeKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="dining-panel"
                      onClick={() => setActiveKey(key)}
                      className={`flex items-center gap-2 rounded-full border px-3.5 md:px-6 py-2.5 text-sm font-medium shadow-sm transition-all ${
                        isActive
                          ? "border-primary bg-primary text-text-light"
                          : "border-border bg-surface text-text hover:border-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  );
                })}
              </div>

              {/* Panel. `key` replays the fade when the tab changes */}
              <div
                key={meal.key}
                id="dining-panel"
                role="tabpanel"
                className="animate-fade-up"
              >
                <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-text-muted">
                  Served {meal.hours}
                </p>

                <ul className="divide-y divide-border">
                  {meal.items.map((item) => (
                    <li key={item.name} className="py-5 first:pt-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-heading text-lg font-semibold text-text">
                          {item.name}
                          {item.tag && (
                            <span className="ml-3 rounded-full bg-bg-muted px-2.5 py-0.5 align-middle font-body text-[10px] font-semibold uppercase tracking-wider text-primary">
                              {item.tag}
                            </span>
                          )}
                        </h3>
                        <span className="shrink-0 font-semibold text-text">
                          Rs {item.price}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={handleReserve}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-bg-dark px-6 py-3.5 text-sm font-semibold text-text-light shadow-md transition-colors hover:bg-primary sm:w-auto"
                >
                  <FaWhatsapp className="h-5 w-5" />
                  <span>Reserve a Table for {meal.label}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
