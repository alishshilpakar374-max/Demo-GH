// src/store/slices/bookingSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type {
  AddonKey,
  AddonsState,
  BookingState,
  SearchParams,
} from "../../types/booking";
import { getDefaultDates } from "../../utils/dateUtils";

const emptyAddons: AddonsState = {
  shuttle: false,
  spa: false,
  dinner: false,
};

const initialState: BookingState = {
  ...getDefaultDates(), // checkIn, checkOut
  guests: 2,
  isModalOpen: false,
  selectedRoomId: null,
  addons: emptyAddons,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // BookingBar submit: dates + guests together
    setSearch(state, action: PayloadAction<SearchParams>) {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
      state.guests = action.payload.guests;
    },

    // BookingModal inputs: one field at a time
    setCheckIn(state, action: PayloadAction<string>) {
      state.checkIn = action.payload;
    },
    setCheckOut(state, action: PayloadAction<string>) {
      state.checkOut = action.payload;
    },
    setGuests(state, action: PayloadAction<number>) {
      state.guests = action.payload;
    },

    toggleAddon(state, action: PayloadAction<AddonKey>) {
      state.addons[action.payload] = !state.addons[action.payload];
    },

    // "Reserve Suite" button on a room card
    openBookingModal(state, action: PayloadAction<string>) {
      state.selectedRoomId = action.payload;
      state.addons = emptyAddons; // fresh add-ons for each new booking
      state.isModalOpen = true;
    },

    closeBookingModal(state) {
      state.isModalOpen = false;
      state.selectedRoomId = null;
    },
  },
});

export const {
  setSearch,
  setCheckIn,
  setCheckOut,
  setGuests,
  toggleAddon,
  openBookingModal,
  closeBookingModal,
} = bookingSlice.actions;

// Selectors: components read state through these
export const selectBooking = (state: RootState) => state.booking;
export const selectIsModalOpen = (state: RootState) =>
  state.booking.isModalOpen;
export const selectSelectedRoomId = (state: RootState) =>
  state.booking.selectedRoomId;

export default bookingSlice.reducer;
