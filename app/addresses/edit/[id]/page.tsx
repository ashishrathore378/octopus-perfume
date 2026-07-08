"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();

  const addressId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    fetchAddress();
  }, []);

  async function fetchAddress() {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("id", addressId)
      .single();

    if (error) {
      alert(error.message);
      router.push("/addresses");
      return;
    }

    setFullName(data.full_name || "");
    setPhone(data.phone || "");
    setHouse(data.house || "");
    setStreet(data.street || "");
    setLandmark(data.landmark || "");
    setCity(data.city || "");
    setState(data.state || "");
    setPincode(data.pincode || "");

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("addresses")
      .update({
        full_name: fullName,
        phone,
        house,
        street,
        landmark,
        city,
        state,
        pincode,
      })
      .eq("id", addressId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Address updated successfully!");

    router.push("/addresses");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Address...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-2xl mx-auto bg-zinc-900 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Edit Address
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="text"
            placeholder="House / Flat No."
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="text"
            placeholder="Street / Area"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full bg-zinc-800 rounded-lg p-3"
            required
          />

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Address"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/addresses")}
              className="flex-1 bg-zinc-700 py-3 rounded-xl font-bold hover:bg-zinc-600"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}