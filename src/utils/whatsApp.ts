// src/utils/whatsapp.ts
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string;

// Shared by both builders so the URL logic lives in one place
const toWhatsAppUrl = (lines: string[]): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

/* ---------- Contact form ---------- */

interface InquiryData {
  name: string;
  email?: string;
  topic: string;
  message: string;
}

export function buildInquiryUrl({
  name,
  email,
  topic,
  message,
}: InquiryData): string {
  return toWhatsAppUrl([
    "New inquiry",
    "",
    `Name: ${name}`,
    ...(email ? [`Email: ${email}`] : []),
    `Topic: ${topic}`,
    "",
    "Message:",
    message,
  ]);
}

/* ---------- Booking modal ---------- */

interface BookingData {
  name: string;
  phone: string;
  roomTitle: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  addons: string[];
  total: string;
}

export function buildBookingUrl(b: BookingData): string {
  return toWhatsAppUrl([
    "New reservation request",
    "",
    `Guest: ${b.name}`,
    `Phone: ${b.phone}`,
    `Room: ${b.roomTitle}`,
    `Check-in: ${b.checkIn}`,
    `Check-out: ${b.checkOut} (${b.nights} night${b.nights > 1 ? "s" : ""})`,
    `Guests: ${b.guests}`,
    `Add-ons: ${b.addons.length ? b.addons.join(", ") : "None"}`,
    `Estimated total: ${b.total}`,
  ]);
}

//Meals
export function buildDiningUrl(meal: string): string {
  return toWhatsAppUrl([
    `Hello! I'd like to reserve a table for ${meal}.`,
    "Could you tell me what's available?",
  ]);
}
