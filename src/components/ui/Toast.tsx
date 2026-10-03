// src/components/ui/Toast.tsx
import { useEffect } from "react";
import { Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { hideToast, selectToast } from "../../features/slices/toastSlice";

export default function Toast() {
  const dispatch = useAppDispatch();
  const { message, isVisible, id } = useAppSelector(selectToast);

  // Auto-hide after 3.5s. Depending on `id` restarts the timer for a new toast,
  // and the cleanup cancels the old timer so it can't hide the new one early.
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => dispatch(hideToast()), 3500);
    return () => clearTimeout(timer);
  }, [id, isVisible, dispatch]);

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-gold/30 bg-bg-dark px-5 py-3.5 text-sm text-text-light shadow-lg animate-fade-up"
    >
      <Info className="h-5 w-5 text-gold" />
      <span>{message}</span>
    </div>
  );
}
