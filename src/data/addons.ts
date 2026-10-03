// src/data/addons.ts
import type { AddonKey } from "../types/booking";

export interface Addon {
  key: AddonKey;
  label: string;
  price: number;
}

export const ADDONS: Addon[] = [
  { key: "spa", label: "60-Min Spa Massage Voucher", price: 120 },
];
