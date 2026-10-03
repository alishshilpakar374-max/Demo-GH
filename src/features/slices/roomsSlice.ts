// src/store/slices/roomsSlice.ts
import {
  createSlice,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { RoomCategory } from "../../types/room";
import { ROOMS } from "../../data/rooms";

interface RoomsState {
  category: RoomCategory;
}

const initialState: RoomsState = {
  category: "all",
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<RoomCategory>) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = roomsSlice.actions;

// Selectors
export const selectCategory = (state: RootState) => state.rooms.category;

// Derived data: the filtered list is computed, never stored.
// createSelector memoizes, so the same category returns the SAME array
// reference and components don't re-render for nothing.
export const selectFilteredRooms = createSelector(
  [selectCategory],
  (category) =>
    category === "all"
      ? ROOMS
      : ROOMS.filter((room) => room.category === category),
);

export default roomsSlice.reducer;
