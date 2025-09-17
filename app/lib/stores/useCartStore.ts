import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

import type { OfferSchema } from "@/app/lib/schemas/offerSchema";

export type CartItem = OfferSchema & { quantity: number };

export type CartState = {
  items: CartItem[];
};

export type CartActions = {
  add: (item: OfferSchema) => void;
  remove: (id: string) => void;
  clear: () => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
};

export type CartStore = CartState & CartActions;

export const createCartStore = () =>
  createStore<CartStore>()(
    persist(
      set => ({
        items: [],
        add: item =>
          set(state => {
            const exists = state.items.find(i => i.id === item.id);
            if (exists) {
              return {
                items: state.items.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
              };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }),
        remove: id =>
          set(state => ({
            items: state.items.filter(i => i.id !== id),
          })),
        clear: () => set({ items: [] }),
        increment: id =>
          set(state => ({
            items: state.items.map(i => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
          })),
        decrement: id =>
          set(state => ({
            items: state.items
              .map(i => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
              .filter(i => i.quantity > 0),
          })),
      }),
      {
        name: "cart-store", // ключ в localStorage
      },
    ),
  );
