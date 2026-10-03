// src/store/slices/lightboxSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { GALLERY_IMAGES } from "../../data/gallery";

interface LightboxState {
  isOpen: boolean;
  index: number;
}

const initialState: LightboxState = {
  isOpen: false,
  index: 0,
};

const total = GALLERY_IMAGES.length;

const lightboxSlice = createSlice({
  name: "lightbox",
  initialState,
  reducers: {
    openLightbox(state, action: PayloadAction<number>) {
      state.index = action.payload;
      state.isOpen = true;
    },
    closeLightbox(state) {
      state.isOpen = false;
    },
    // The modulo wraps around: after the last image comes the first
    nextImage(state) {
      state.index = (state.index + 1) % total;
    },
    prevImage(state) {
      state.index = (state.index - 1 + total) % total;
    },
  },
});

export const { openLightbox, closeLightbox, nextImage, prevImage } =
  lightboxSlice.actions;

export const selectLightbox = (state: RootState) => state.lightbox;

export default lightboxSlice.reducer;
