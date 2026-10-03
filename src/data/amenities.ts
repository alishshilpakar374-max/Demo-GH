// src/data/amenities.ts
import { Flower, Utensils, Waves, Wine, type LucideIcon } from "lucide-react";

export interface Amenity {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon; // the component itself, rendered later as <amenity.icon />
}

export const AMENITIES: Amenity[] = [
  {
    id: "infinity-pool",
    title: "Heated Infinity Pool",
    description:
      "Relax in our temperature-controlled infinity pool overlooking panoramic mountain vistas.",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
    icon: Waves,
  },
  {
    id: "organic-dining",
    title: "Organic Dining",
    description:
      "Savor chef-curated meals crafted from organic herbs and local market harvests.",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
    icon: Utensils,
  },
  {
    id: "spa-wellness",
    title: "Spa & Holistic Wellness",
    description:
      "Indulge in tailored aromatherapy massages, steam sauna, and restorative yoga sessions.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
    icon: Flower,
  },
  {
    id: "wine-lounge",
    title: "Sunset Wine Lounge",
    description:
      "Unwind by the fire pit with boutique artisanal wines and hand-crafted evening cocktails.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    icon: Wine,
  },
];
