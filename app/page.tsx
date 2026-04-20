"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [role, setRole] = useState<"kellner" | "kueche">("kellner")
  const [pin, setPin] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (pin !== "1234") {
      alert("Falscher PIN")
      return
    }

    if (role === "kellner") router.push("/kellner")
    if (role === "kueche") router.push("/kueche")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220] text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-teal-500 opacity-20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* CARD */}
      <div className="
        relative z-10
        w-[380px] p-8 rounded-3xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-2xl
      ">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6 justify-center">

  {/* LOGO CIRCLE */}
  <div className="
    w-12 h-12 rounded-full
    bg-gradient-to-br from-teal-400 to-blue-500
    flex items-center justify-center
    font-bold text-lg
    shadow-lg
  ">
    GF
  </div>

  {/* TEXT */}
  <h1 className="text-2xl font-bold">
    Gastro<span className="text-teal-400">Flow</span>
  </h1>

</div>

        {/* PIN */}
        <input
          type="password"
          placeholder="PIN eingeben"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="
            w-full mb-4 p-3 rounded-xl
            bg-white/10 border border-white/20
            focus:outline-none focus:ring-2 focus:ring-teal-500
          "
        />

        {/* ROLE */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setRole("kellner")}
            className={`flex-1 py-3 rounded-xl ${
              role === "kellner"
                ? "bg-teal-600"
                : "bg-white/10"
            }`}
          >
            Kellner
          </button>

          <button
            onClick={() => setRole("kueche")}
            className={`flex-1 py-3 rounded-xl ${
              role === "kueche"
                ? "bg-orange-500"
                : "bg-white/10"
            }`}
          >
            Küche
          </button>
        </div>

        {/* LOGIN */}
        <button
          onClick={handleLogin}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-teal-500 to-blue-500
            hover:scale-105 transition
          "
        >
          Einloggen
        </button>

      </div>
    </div>
  )
}