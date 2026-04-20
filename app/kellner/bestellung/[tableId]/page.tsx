"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useStore } from "../../../../lib/store"
import { products } from "@/lib/products"

const categories = [
  { id: "getraenke", label: "🥤 Getränke" },
  { id: "beef", label: "🍔 Beef" },
  { id: "salate", label: "🥗 Salate" },
  { id: "pizza", label: "🍕 Pizza" },
  { id: "dessert", label: "🍰 Dessert" },
]

export default function Page() {
  const params = useParams()
  const router = useRouter()
  const tableId = params.tableId as string

  const { orders, addItem, removeItem, markOpen, clearOrder } = useStore()

  const [category, setCategory] = useState("getraenke")

  const filtered = products.filter(p => p.category === category)

  const order = orders[tableId]

  const total =
    order?.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0

  return (
    <div className="flex h-screen bg-[#0A0F1C] text-white">

      {/* LINKS */}
      <div className="w-2/3 p-4 flex flex-col">

        {/* Kategorien */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap ${
                category === cat.id
                  ? "bg-teal-600"
                  : "bg-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Produkte */}
        <div className="grid grid-cols-4 gap-3">
          {filtered.map((p) => (
            <button
              key={p.name}
              onClick={() =>
                addItem(tableId, {
                  name: p.name,
                  price: p.price,
                  quantity: 1,
                })
              }
              className="bg-white/5 hover:bg-white/10 p-3 rounded-xl text-left transition"
            >
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-400">
                {p.price} €
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RECHTS */}
      <div className="w-1/3 p-4 border-l border-white/10 flex flex-col">

        <h1 className="text-xl mb-4 font-semibold">
          Tisch {tableId}
        </h1>

        {/* Items */}
        <div className="flex-1 space-y-2">
          {order?.items.map((item) => (
            <div key={item.name} className="flex justify-between items-center">

              <span>
                {item.name} x {item.quantity}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => removeItem(tableId, item.name)}
                  className="bg-red-600 px-2 rounded"
                >
                  −
                </button>

                <button
                  onClick={() => addItem(tableId, item)}
                  className="bg-green-600 px-2 rounded"
                >
                  +
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 font-bold text-lg">
          {total.toFixed(2)} €
        </div>

        {/* 🟡 ÜBERNOMMEN */}
        {order?.status === "ready" && (
          <button
            onClick={() => markOpen(tableId)}
            className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-xl font-semibold"
          >
            🍽️ Übernommen
          </button>
        )}

        {/* 💰 KASSIEREN (MIT REDIRECT) */}
        {order && (
          <button
            onClick={() => {
              clearOrder(tableId)
              router.replace("/kellner")
            }}
            className="mt-2 w-full bg-green-600 py-2 rounded-xl font-semibold"
          >
            💰 Kassieren
          </button>
        )}

      </div>
    </div>
  )
}