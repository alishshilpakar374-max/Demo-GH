import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { GALLERY_IMAGES } from "../../data/gallery";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import {
  closeLightbox,
  nextImage,
  prevImage,
  selectLightbox,
} from "../../features/slices/lightBoxSlice";

export default function Lightbox() {
  const dispatch = useAppDispatch();

  const { isOpen, index } = useAppSelector(selectLightbox);

  const image = GALLERY_IMAGES[index];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeLightbox());
      }

      if (event.key === "ArrowRight") {
        dispatch(nextImage());
      }

      if (event.key === "ArrowLeft") {
        dispatch(prevImage());
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, dispatch]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-999 flex items-center justify-center bg-bg-dark/90 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={() => dispatch(closeLightbox())}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={() => dispatch(closeLightbox())}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-text-light backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6 sm:top-6"
      >
        <X className="size-5" />
      </button>

      {/* Previous */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(prevImage());
        }}
        aria-label="Previous image"
        className="absolute left-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-text-light backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:left-6 sm:size-12"
      >
        <ChevronLeft className="size-6" />
      </button>

      {/* Image */}
      <div
        className="relative max-h-[90vh] max-w-6xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={image.full}
          alt={image.alt}
          className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-lg"
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-linear-to-t from-bg-dark/90 to-transparent px-5 pb-4 pt-12">
          <p className="text-center text-sm font-medium text-text-light sm:text-base">
            {image.alt}
          </p>

          <p className="mt-1 text-center text-xs text-white/60">
            {index + 1} / {GALLERY_IMAGES.length}
          </p>
        </div>
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(nextImage());
        }}
        aria-label="Next image"
        className="absolute right-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-text-light backdrop-blur-md transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-6 sm:size-12"
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}
