import { nanoid } from "@reduxjs/toolkit";
import type { Room } from "../types/room";

export const ROOMS: Room[] = [
  {
    id: nanoid(),
    title: "Deluxe Garden Suite",
    category: "deluxe",
    price: 180,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    description:
      "Bright and spacious suite opening directly into our tranquil botanical gardens with a private sun terrace.",
  },
  {
    id: nanoid(),
    title: "Executive Mountain View",
    category: "executive",
    price: 260,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    description:
      "Elevated luxury boasting floor-to-ceiling windows, panoramic mountain views, and a deep soaking bathtub.",
  },
  {
    id: nanoid(),
    title: "Royal Garden Villa",
    category: "villa",
    price: 420,
    rating: 4.95,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    description:
      "A secluded multi-room villa complete with private plunge pool, outdoor dining lounge, and dedicated butler.",
  },
  {
    id: nanoid(),
    title: "Sunset Balcony Suite",
    category: "deluxe",
    price: 210,
    rating: 4.85,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    description:
      "Crafted for romantic getaways featuring west-facing balcony, king canopy bed, and sunset cocktail service.",
  },
  {
    id: nanoid(),
    title: "Penthouse Haven Suite",
    category: "executive",
    price: 340,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    description:
      "Top-tier luxury occupying the top floor, with private fireplace, spacious wrap-around balcony, and sauna access.",
  },
  {
    id: nanoid(),
    title: "Highland Family Cottage",
    category: "villa",
    price: 390,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80",
    description:
      "Cozy two-bedroom residence surrounded by pine trees, featuring a fireplace, kitchen, and kids reading.",
  },
];
