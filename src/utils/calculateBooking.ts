// src/utils/calculateBooking.ts
import { ADDONS } from "../data/addons";
import type { AddonsState } from "../types/booking";
import { nightsBetween } from "./dateUtils";

const TAX_RATE = 0.13; // taxes & cleaning fee

interface CalculateInput {
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
  addons: AddonsState;
}

export interface BookingCost {
  nights: number;
  roomTotal: number;
  addonsTotal: number;
  tax?: number;
  total: number;
}

// Pure function: same input → same output, no Redux or React in here
export function calculateBooking({
  pricePerNight,
  checkIn,
  checkOut,
  addons,
}: CalculateInput): BookingCost {
  const nights = nightsBetween(checkIn, checkOut);
  const roomTotal = pricePerNight * nights;
  const addonsTotal = ADDONS.reduce(
    (sum, addon) => (addons[addon.key] ? sum + addon.price : sum),
    0,
  );
  const subtotal = roomTotal + addonsTotal;
  const tax = subtotal * TAX_RATE;

  return { nights, roomTotal, addonsTotal, tax, total: subtotal + tax };
}

export const formatMoney = (amount: number) => `Rs ${amount.toFixed(2)}`;
