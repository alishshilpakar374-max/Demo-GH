// src/components/booking/BookingSummary.tsx
import { formatMoney, type BookingCost } from "../../utils/calculateBooking";

export default function BookingSummary({ cost }: { cost: BookingCost }) {
  const { nights, roomTotal, addonsTotal, tax, total } = cost;

  return (
    <div className="space-y-2 rounded-xl border border-border bg-bg-muted p-4 text-sm">
      <div className="flex justify-between text-text-muted">
        <span>
          Room Rate ({nights} Night{nights !== 1 && "s"})
        </span>
        <span>{formatMoney(roomTotal)}</span>
      </div>
      <div className="flex justify-between text-text-muted">
        <span>Selected Add-ons</span>
        <span>{formatMoney(addonsTotal)}</span>
      </div>
      <div className="flex justify-between text-text-muted">
        <span>Taxes &amp; Cleaning Fee (13%)</span>
        <span>{formatMoney(tax ?? 0)}</span>
      </div>
      <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-text">
        <span>Estimated Total Cost</span>
        <span className="text-primary">{formatMoney(total)}</span>
      </div>
    </div>
  );
}
