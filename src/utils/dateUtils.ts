// src/utils/dateUtils.ts
// Local-time formatting (NOT toISOString, which converts to UTC and can shift the date)
export const toISODate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const addDays = (date: Date, days: number): Date => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

// Default stay: tomorrow → 3 days from today (same as your original HTML)
export const getDefaultDates = () => {
  const today = new Date();
  return {
    checkIn: toISODate(addDays(today, 1)),
    checkOut: toISODate(addDays(today, 3)),
  };
};

// added utils
export const nightsBetween = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0;
  const [y1, m1, d1] = checkIn.split("-").map(Number);
  const [y2, m2, d2] = checkOut.split("-").map(Number);
  // Date.UTC avoids daylight-saving shifts breaking the day count
  const diff = Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1);
  return Math.max(0, Math.round(diff / 86_400_000));
};

export const nextDay = (iso: string): string => {
  const [y, m, d] = iso.split("-").map(Number);
  return toISODate(addDays(new Date(y, m - 1, d), 1));
};
