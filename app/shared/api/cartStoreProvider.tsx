"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand";

import { createCartStore, type CartStore } from "@/app/lib/stores/useCartStore";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

export const CartStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<CartStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return <CartStoreContext.Provider value={storeRef.current}>{children}</CartStoreContext.Provider>;
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const store = useContext(CartStoreContext);
  if (!store) {
    throw new Error("useCartStore must be used within a CartStoreProvider");
  }

  return useStore(store, selector);
};
