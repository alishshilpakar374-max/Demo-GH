// src/hooks/useToast.ts
import { useCallback } from "react";
import { useAppDispatch } from "./hooks";
import { showToast as showToastAction } from "../features/slices/toastSlice";

export function useToast() {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (message: string) => {
      dispatch(showToastAction(message));
    },
    [dispatch],
  );

  return { showToast };
}
