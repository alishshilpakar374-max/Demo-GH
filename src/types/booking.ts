export interface SearchParams {
  checkIn: string; // "YYYY-MM-DD"
  checkOut: string; // "YYYY-MM-DD"
  guests: number;
}

export type AddonKey = "shuttle" | "spa" | "dinner";
export type AddonsState = Record<AddonKey, boolean>;

export interface BookingState extends SearchParams {
  isModalOpen: boolean;
  selectedRoomId: string | null;
  addons: AddonsState;
}
