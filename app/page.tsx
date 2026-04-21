"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function Home() {
  const { orders } = useStore();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100">
      <h1 className="text-4xl font-bold">🍽️ Gastroflow</h1>

      <p className="text-gray-601">
        Aktive Bestellungen: {Object.keys(orders).length}
      </p>

      <div className="flex flex-col gap-3">
        <Link
          href="/kellner"
          className="bg-blue-600 text-white px-6 py-3 rounded text-center"
        >
          Kellner Dashboard
        </Link>

        <Link
          href="/kueche"
          className="bg-green-600 text-white px-6 py-3 rounded text-center"
        >
          Küche
        </Link>
      </div>
    </main>
  );
}