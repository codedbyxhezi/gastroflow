"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type OrderItem = {
  name: string
  price: number
  quantity: number
}

type Order = {
  tableId: string
  items: OrderItem[]
  createdAt: number
  status: "open" | "ready"
}

type Store = {
  orders: Record<string, Order>

  addItem: (tableId: string, item: OrderItem) => void
  removeItem: (tableId: string, name: string) => void
  setReady: (tableId: string) => void
  markOpen: (tableId: string) => void
  clearOrder: (tableId: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({

      orders: {},

      addItem: (tableId, item) =>
        set((state) => {
          const order = state.orders[tableId] || {
            tableId,
            items: [],
            createdAt: Date.now(),
            status: "open",
          }

          const existing = order.items.find(i => i.name === item.name)

          if (existing) {
            existing.quantity += 1
          } else {
            order.items.push({ ...item, quantity: 1 })
          }

          return {
            orders: {
              ...state.orders,
              [tableId]: { ...order },
            },
          }
        }),

      removeItem: (tableId, name) =>
        set((state) => {
          const order = state.orders[tableId]
          if (!order) return state

          const updatedItems = order.items
            .map(item =>
              item.name === name
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)

          return {
            orders: {
              ...state.orders,
              [tableId]: {
                ...order,
                items: updatedItems,
              },
            },
          }
        }),

      setReady: (tableId) =>
        set((state) => {
          const order = state.orders[tableId]
          if (!order) return state

          return {
            orders: {
              ...state.orders,
              [tableId]: {
                ...order,
                status: "ready",
              },
            },
          }
        }),

      markOpen: (tableId) =>
        set((state) => {
          const order = state.orders[tableId]
          if (!order) return state

          return {
            orders: {
              ...state.orders,
              [tableId]: {
                ...order,
                status: "open",
              },
            },
          }
        }),

      clearOrder: (tableId) =>
        set((state) => {
          const newOrders = { ...state.orders }
          delete newOrders[tableId]
          return { orders: newOrders }
        }),

    }),
    {
      name: "gastroflow-storage",
    }
  )
)