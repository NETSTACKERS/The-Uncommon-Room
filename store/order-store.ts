import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Order } from "@/types/order"

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  getOrders: () => Order[]
  clearOrders: () => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        set((state) => ({
          orders: [...state.orders, order],
        }))
      },

      getOrders: () => {
        return get().orders
      },

      clearOrders: () => {
        set({ orders: [] })
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)
