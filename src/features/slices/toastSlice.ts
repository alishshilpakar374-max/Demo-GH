// src/features/slices/toastSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store"; // ← change to YOUR store file path

interface ToastState {
  message: string;
  isVisible: boolean;
  id: number; // bumps on every toast so the timer restarts
}

const initialState: ToastState = {
  message: "",
  isVisible: false,
  id: 0,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.isVisible = true;
      state.id += 1;
    },
    hideToast(state) {
      state.isVisible = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export const selectToast = (state: RootState) => state.toast;

export default toastSlice.reducer;
