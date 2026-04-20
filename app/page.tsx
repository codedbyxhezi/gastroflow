"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl mb-6">GastroFlow</h1>

        <button
          onClick={() => router.push("/kellner")}
          className="bg-blue-600 px-6 py-3 rounded-xl mr-4"
        >
          Kellner
        </button>

        <button
          onClick={() => router.push("/kueche")}
          className="bg-green-600 px-6 py-3 rounded-xl"
        >
          Küche
        </button>
      </div>
    </div>
  )
}