"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"

export default function KellnerPage() {
  const { orders } = useStore()
  const tables = ["1","2","3","4","5","6","7","8"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white p-6">

      <h1 className="text-3xl font-bold mb-8">Kellner Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tables.map((tableId) => {
          const order = orders[tableId]

          const isFree = !order
          const isOpen = order?.status === "open"
          const isReady = order?.status === "ready"

          return (
            <Link
              key={tableId}
              href={`/kellner/bestellung/${tableId}`}
              className={`
                backdrop-blur-xl bg-white/10 border border-white/20
                rounded-2xl p-6 text-center shadow-lg
                hover:scale-105 transition

                ${isOpen ? "border-red-500" : ""}
                ${isReady ? "border-yellow-400" : ""}
                ${isFree ? "border-green-400" : ""}
              `}
            >
              <div className="text-xl font-bold">
                Tisch {tableId}
              </div>

              <div className="mt-2 text-sm">
                {isFree && "🟢 Frei"}
                {isOpen && "🔴 In Arbeit"}
                {isReady && "🟡 Fertig"}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}