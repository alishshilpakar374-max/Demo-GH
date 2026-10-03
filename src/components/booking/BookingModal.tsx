// src/components/booking/BookingModal.tsx
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CheckCircle2, X } from "lucide-react";

import BookingSummary from "./BookingSummary";
import { ADDONS } from "../../data/addons";
import { ROOMS } from "../../data/rooms";
import { useToast } from "../../hooks/useToast";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  closeBookingModal,
  selectBooking,
  setCheckIn,
  setCheckOut,
  setGuests,
  toggleAddon,
} from "../../features/slices/bookingSlice";
import { calculateBooking } from "../../utils/calculateBooking";
import { nextDay, toISODate } from "../../utils/dateUtils";
import { buildBookingUrl } from "../../utils/whatsApp";
import { formatMoney } from "../../utils/calculateBooking";

const fieldClass =
  "w-full rounded-xl border border-border bg-bg px-3.5 py-2.5 text-sm text-text focus:border-primary focus:outline-none";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted";

export default function BookingModal() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { isModalOpen, selectedRoomId, checkIn, checkOut, guests, addons } =
    useAppSelector(selectBooking);

  // Guest details live locally: only the modal needs them
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const room = ROOMS.find((r) => r.id === selectedRoomId);

  const cost = useMemo(
    () =>
      calculateBooking({
        pricePerNight: room?.price ?? 0,
        checkIn,
        checkOut,
        addons,
      }),
    [room, checkIn, checkOut, addons],
  );

  const close = () => dispatch(closeBookingModal());

  // Esc closes + lock page scroll while open
  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeBookingModal());
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen, dispatch]);

  if (!isModalOpen || !room) return null;

  const handleCheckIn = (value: string) => {
    dispatch(setCheckIn(value));
    // If check-out is now on/before check-in, push it to the next day
    if (checkOut <= value) dispatch(setCheckOut(nextDay(value)));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cost.nights < 1) {
      showToast("Check-out must be after check-in.");
      return;
    }

    const url = buildBookingUrl({
      name: name.trim(),
      phone: phone.trim(),
      roomTitle: room.title,
      checkIn,
      checkOut,
      nights: cost.nights,
      guests,
      addons: ADDONS.filter((a) => addons[a.key]).map((a) => a.label),
      total: formatMoney(cost.total),
    });

    window.open(url, "_blank", "noopener,noreferrer");
    setName("");
    setPhone("");
    close();
    showToast("Opening WhatsApp. Press send to confirm your request!");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-dark/70 p-4 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-lg animate-scale-in sm:p-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close booking form"
          className="absolute right-6 top-6 rounded-full p-2 text-text-muted transition-colors hover:bg-bg-muted hover:text-text"
        >
          <X className="h-5 w-5" />
        </button>

        <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-primary">
          Reservation Details
        </span>
        <h3
          id="booking-title"
          className="mb-6 font-heading text-2xl font-bold text-text sm:text-3xl"
        >
          Reserve {room.title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest details */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-name" className={labelClass}>
                Full Name
              </label>
              <input
                id="bk-name"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="bk-phone" className={labelClass}>
                Phone / WhatsApp
              </label>
              <input
                id="bk-phone"
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="bk-checkin" className={labelClass}>
                Check-In Date
              </label>
              <input
                id="bk-checkin"
                type="date"
                required
                min={toISODate(new Date())}
                value={checkIn}
                onChange={(e) => handleCheckIn(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="bk-checkout" className={labelClass}>
                Check-Out Date
              </label>
              <input
                id="bk-checkout"
                type="date"
                required
                min={checkIn ? nextDay(checkIn) : undefined}
                value={checkOut}
                onChange={(e) => dispatch(setCheckOut(e.target.value))}
                className={fieldClass}
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label htmlFor="bk-guests" className={labelClass}>
              Number of Guests
            </label>
            <select
              id="bk-guests"
              value={guests}
              onChange={(e) => dispatch(setGuests(Number(e.target.value)))}
              className={fieldClass}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Guest{n > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          {/* Add-ons */}
          <fieldset>
            <legend className={labelClass}>Enhance Your Stay (Add-ons)</legend>
            <div className="space-y-2.5">
              {ADDONS.map((addon) => (
                <label
                  key={addon.key}
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-bg p-3 text-sm transition-colors hover:bg-bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addons[addon.key]}
                      onChange={() => dispatch(toggleAddon(addon.key))}
                      className="accent-primary"
                    />
                    {addon.label}
                  </span>
                  <span className="font-semibold text-text">
                    Rs {addon.price}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <BookingSummary cost={cost} />

          <button
            type="submit"
            disabled={cost.nights < 1}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-text-light shadow-lg transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>Send Request via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}
