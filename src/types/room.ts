export type RoomCategory = "all" | "deluxe" | "executive" | "villa";

export interface Room {
  id: string;
  title: string;
  category: Exclude<RoomCategory, "all">; // a real room is never "all"
  price: number; // per night, USD
  rating: number;
  image: string;
  description: string;
}
