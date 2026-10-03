// src/pages/Rooms.tsx
import { BedDouble, Calendar, Coffee, Star, Wifi, Wind } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  selectCategory,
  selectFilteredRooms,
  setCategory,
} from "../features/slices/roomsSlice";
import { openBookingModal } from "../features/slices/bookingSlice";
import type { Room, RoomCategory } from "../types/room";

const FILTERS: { value: RoomCategory; label: string }[] = [
  { value: "all", label: "All Rooms" },
  { value: "deluxe", label: "Deluxe Rooms" },
  { value: "executive", label: "Executive Suites" },
  { value: "villa", label: "Family Villas" },
];

// Every room shows the same 4 features (same as the original HTML)
const ROOM_FEATURES = [
  { icon: Wifi, label: "Free High-Speed WiFi" },
  { icon: BedDouble, label: "King Size Bed" },
  { icon: Wind, label: "Climate Control" },
  { icon: Coffee, label: "Organic Breakfast Included" },
];

interface RoomCardProps {
  room: Room;
  onReserve: (roomId: string) => void;
}

function RoomCard({ room, onReserve }: RoomCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:shadow-lg animate-fade-up">
      {/* Image + price + rating */}
      <div className="relative aspect-16/10 overflow-hidden">
        <img
          src={room.image}
          alt={room.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Price */}
        <div className="absolute right-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-bold text-text shadow-sm backdrop-blur-md">
          ${room.price}
          <span className="text-[10px] font-normal text-text-muted">
            / night
          </span>
        </div>

        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-bg-dark/80 px-2.5 py-1 text-xs text-text-light backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span>{room.rating}</span>
        </div>
      </div>

      {/* Room Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-heading text-xl font-semibold text-text">
          {room.title}
        </h3>

        <p className="mb-4 flex-1 text-xs leading-relaxed text-text-muted">
          {room.description}
        </p>

        {/* Feature Icons */}
        <ul className="flex items-center gap-3 border-t border-border pt-3">
          {ROOM_FEATURES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              title={label}
              className="rounded-lg bg-bg-muted p-2"
            >
              <Icon className="h-4 w-4 text-primary" aria-label={label} />
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={() => onReserve(room.id)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-bg-muted py-3 text-xs font-semibold text-text transition-colors hover:bg-primary hover:text-text-light"
        >
          <Calendar className="h-4 w-4" />
          <span>Reserve Suite</span>
        </button>
      </div>
    </article>
  );
}

export default function Rooms() {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const rooms = useAppSelector(selectFilteredRooms);

  return (
    <section
      id="rooms"
      className="relative scroll-mt-(--root-header-height) bg-bg-muted py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-primary">
            Refined Living
          </span>
          <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl md:text-5xl">
            Suites &amp; Accommodations
          </h2>
          <p className="mt-3 text-sm text-text-muted sm:text-base">
            Designed with organic textures, ambient lighting, and high-end
            amenities for your maximum comfort.
          </p>
        </div>

        {/* Filter buttons */}
        <div
          role="group"
          aria-label="Filter rooms by category"
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {FILTERS.map(({ value, label }) => {
            const isActive = category === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={isActive}
                onClick={() => dispatch(setCategory(value))}
                className={`rounded-full border px-6 py-2.5 text-sm font-medium shadow-sm transition-all ${
                  isActive
                    ? "border-primary bg-primary text-text-light"
                    : "border-border bg-surface text-text hover:border-primary"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Cards. `key` includes the category so the fade-up replays on filter change */}
        <div
          key={category}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onReserve={(id) => dispatch(openBookingModal(id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
