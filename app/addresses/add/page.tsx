"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddAddressPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

   const { data, error } = await supabase
  .from("addresses")
  .insert({
    user_id: user.id,
    full_name: fullName,
    phone,
    house,
    street,
    landmark,
    city,
    state,
    pincode,
  })
  .select();

console.log("Inserted:", data);
console.log("Error:", error);

setLoading(false);

if (error) {
  alert(error.message);
  return;
}
    alert("Address Added Successfully!");

    router.push("/addresses");
  }

  return (
    <main className="min-h-screen bg-black text-white py-12 px-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Add New Address
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 rounded-2xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2">Full Name</label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Phone Number</label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2">House / Flat No.</label>

            <input
              type="text"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Street / Area</label>

            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Landmark</label>

            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2">City</label>

              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3"
                required
              />
            </div>

            <div>
              <label className="block mb-2">State</label>

              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-zinc-800 rounded-lg p-3"
                required
              />
            </div>

          </div>

          <div>
            <label className="block mb-2">Pincode</label>

            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full bg-zinc-800 rounded-lg p-3"
              required
            />
          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/addresses")}
              className="flex-1 bg-zinc-700 py-4 rounded-xl font-bold hover:bg-zinc-600"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}