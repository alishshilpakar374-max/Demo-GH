// src/data/gallery.ts
export interface GalleryImage {
  id: string;
  thumb: string; // small version for the grid
  full: string; // large version for the lightbox
  alt: string;
}

const unsplash = (photoId: string, width: number) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "resort-aerial",
    thumb: unsplash("photo-1566073771259-6a8506099945", 1000),
    full: unsplash("photo-1566073771259-6a8506099945", 1600),
    alt: "Aerial view of the resort",
  },
  {
    id: "suite-bed",
    thumb: unsplash("photo-1590490360182-c33d57733427", 600),
    full: unsplash("photo-1590490360182-c33d57733427", 1600),
    alt: "Suite bedroom",
  },
  {
    id: "spa-lounge",
    thumb: unsplash("photo-1540555700478-4be289fbecef", 600),
    full: unsplash("photo-1540555700478-4be289fbecef", 1600),
    alt: "Spa lounge",
  },
  {
    id: "nearby-coast",
    thumb: unsplash("photo-1507525428034-b723cf961d3e", 600),
    full: unsplash("photo-1507525428034-b723cf961d3e", 1600),
    alt: "Nearby coastline",
  },
  {
    id: "garden-pathway",
    thumb: unsplash("photo-1544161515-4ab6ce6db874", 600),
    full: unsplash("photo-1544161515-4ab6ce6db874", 1600),
    alt: "Garden pathway",
  },
];
