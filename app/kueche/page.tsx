"use client"

import { useStore } from "@/lib/store"

export default function KuechePage() {
  const { orders, setReady } = useStore()

  const orderList = Object.values(orders).filter(
    (o) => o.status === "open"
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#0f172a] text-white p-8">

      <h1 className="text-4xl mb-8 font-bold">Küche</h1>

      <div className="grid grid-cols-3 gap-6">
        {orderList.map((order) => (
          <div
            key={order.tableId}
            className="
              backdrop-blur-xl bg-white/10 border border-white/20
              rounded-2xl p-6 shadow-xl
            "
          >
            <h2 className="text-2xl mb-4 font-semibold">
              Tisch {order.tableId}
            </h2>

            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div key={item.name}>
                  {item.name} x {item.quantity}
                </div>
              ))}
            </div>

            <button
              onClick={() => setReady(order.tableId)}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl font-semibold transition"
            >
              ✅ Fertig
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}