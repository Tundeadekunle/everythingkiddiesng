"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useCartStore } from "@/lib/cart-store";

export function OrderSuccessClient() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, [clearCart]);

  return null;
}
