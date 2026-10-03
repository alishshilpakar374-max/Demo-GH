import { useState, type FormEvent } from "react";

import { Calendar, CalendarCheck, Users, Bed } from "lucide-react";

import { useAppDispatch } from "../../hooks/hooks";

import { setSearch } from "../../features/slices/bookingSlice";
import { setCategory } from "../../features/slices/roomsSlice";

import { useToast } from "../../hooks/useToast";

import { getDefaultDates, nextDay, toISODate } from "../../utils/dateUtils";

import type { RoomCategory } from "../../types/room";

const inputClass =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text transition-all duration-200 placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10";

const labelClass =
  "mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted";

export default function BookingBar() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const defaults = getDefaultDates();

  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(2);
  const [category, setLocalCategory] = useState<RoomCategory>("all");

  const today = toISODate(new Date());

  const handleCheckIn = (value: string) => {
    setCheckIn(value);

    // If check-out is on or before check-in, move it to the next day
    if (checkOut <= value) {
      setCheckOut(nextDay(value));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkOut <= checkIn) {
      showToast("Check-out must be after check-in.");
      return;
    }

    dispatch(
      setSearch({
        checkIn,
        checkOut,
        guests,
      }),
    );

    dispatch(setCategory(category));

    document.getElementById("rooms")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

    if (!whatsappNumber) {
      showToast("WhatsApp number is not configured.");
      return;
    }

    const roomType =
      category === "all"
        ? "Any Room"
        : category === "deluxe"
          ? "Deluxe Room"
          : category === "executive"
            ? "Executive Suite"
            : "Garden Villa";

    const message = `Hello, I would like to enquire about a room.
                  Check-In: ${checkIn}
                  Check-Out: ${checkOut}
                  Guests: ${guests}
                  Room Type: ${roomType}

                  Please let me know the availability and details.`.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-2xl border border-border bg-surface/95 p-3 shadow-lg backdrop-blur-md sm:p-4 lg:p-5">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.15fr_1.15fr_0.8fr_1.1fr_0.85fr] lg:items-end"
      >
        {/* Check-In */}
        <div>
          <label htmlFor="quick-checkin" className={labelClass}>
            <Calendar className="size-3.5 text-gold" />
            Check-In
          </label>

          <input
            id="quick-checkin"
            type="date"
            required
            min={today}
            value={checkIn}
            onChange={(e) => handleCheckIn(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Check-Out */}
        <div>
          <label htmlFor="quick-checkout" className={labelClass}>
            <CalendarCheck className="size-3.5 text-gold" />
            Check-Out
          </label>

          <input
            id="quick-checkout"
            type="date"
            required
            min={checkIn ? nextDay(checkIn) : today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="quick-guests" className={labelClass}>
            <Users className="size-3.5 text-gold" />
            Guests
          </label>

          <select
            id="quick-guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className={inputClass}
          >
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
            <option value={3}>3 Guests</option>
            <option value={4}>4+ Guests</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="quick-category" className={labelClass}>
            <Bed className="size-3.5 text-gold" />
            Room Type
          </label>

          <select
            id="quick-category"
            value={category}
            onChange={(e) => setLocalCategory(e.target.value as RoomCategory)}
            className={inputClass}
          >
            <option value="all">All Rooms</option>
            <option value="deluxe">Deluxe Room</option>
            <option value="executive">Executive Suite</option>
            <option value="villa">Garden Villa</option>
          </select>
        </div>

        {/* Submit */}
        <div className="sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.98] lg:py-1 lg:text-[11px]"
          >
            <span>Enquire via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
