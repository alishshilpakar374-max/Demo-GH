const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string;

// Shared by all WhatsApp builders
const toWhatsAppUrl = (lines: string[]): string => {
  const message = lines.join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

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
    "Hello! I would like to make an enquiry.",
    "",
    "*Guest Details*",
    "",
    `Name: ${name}`,
    ...(email ? [`Email: ${email}`] : []),
    `Topic: ${topic}`,
    "",
    "*Message*",
    "",
    message,
    "",
    "Thank you! I look forward to hearing from you.",
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
    "Hello! I would like to make a reservation enquiry.",
    "",
    "*Booking Details*",
    "",
    `Guest: ${b.name}`,
    `Phone: ${b.phone}`,
    `Room: ${b.roomTitle}`,
    `Check-In: ${b.checkIn}`,
    `Check-Out: ${b.checkOut}`,
    `Nights: ${b.nights}`,
    `Guests: ${b.guests}`,
    `Add-ons: ${b.addons.length ? b.addons.join(", ") : "None"}`,
    `Estimated Total: ${b.total}`,
    "",
    "Please let me know the availability and confirm the details.",
    "",
    "Thank you!",
  ]);
}

/* ---------- Meals ---------- */

export function buildDiningUrl(meal: string): string {
  return toWhatsAppUrl([
    "Hello! I would like to reserve a table.",
    "",
    "*Dining Enquiry*",
    "",
    `Meal: ${meal}`,
    "",
    "Could you please tell me what's available?",
    "",
    "Thank you!",
  ]);
}
