"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  async function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      full_name: fullName,
      phone,
      house,
      street,
      landmark,
      city,
      state,
      pincode,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Address saved successfully!");
    router.push("/order-summary");
  }

  return (
    <main className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Delivery Address
        </h1>

        <form onSubmit={handleAddressSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <input
            type="text"
            placeholder="House No. / Flat / Building"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <input
            type="text"
            placeholder="Street / Area"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <input
            type="text"
            placeholder="Landmark (Optional)"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
              required
            />

            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
              required
            />
          </div>

          <input
            type="text"
            placeholder="PIN Code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            Continue to Order Summary
          </button>
        </form>
      </div>
    </main>
  );
}