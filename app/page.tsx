"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white flex items-center justify-center">
      
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl text-center w-[350px]">
        
        <h1 className="text-3xl font-bold mb-2 tracking-wide">
          GastroFlow
        </h1>
        
        <p className="text-gray-400 mb-6">
          Digitales Bestellsystem
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/kellner"
            className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl"
          >
            🍽️ Kellner
          </Link>

          <Link
            href="/kueche"
            className="bg-green-600 hover:bg-green-700 transition p-3 rounded-xl"
          >
            👨‍🍳 Küche
          </Link>
        </div>

      </div>
    </main>
  );
}