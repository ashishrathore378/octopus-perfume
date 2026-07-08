"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setName(user.user_metadata?.full_name || "Customer");
    setEmail(user.email || "");
    setUserId(user.id);

    setLoading(false);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-16 px-6">

      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800 p-10">

        <h1 className="text-4xl font-bold text-yellow-400 mb-10">
          My Profile
        </h1>

        <div className="space-y-8">

          <div>
            <p className="text-gray-400 text-sm mb-1">
              Full Name
            </p>

            <p className="text-2xl font-semibold">
              {name}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">
              Email Address
            </p>

            <p className="text-xl">
              {email}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">
              User ID
            </p>

            <p className="text-sm break-all text-zinc-300">
              {userId}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-12">

          <button
            onClick={() => router.push("/orders")}
            className="bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 transition"
          >
            📦 My Orders
          </button>

          <button
            onClick={() => router.push("/addresses")}
            className="bg-zinc-800 py-4 rounded-xl font-bold hover:bg-zinc-700 transition"
          >
            📍 My Addresses
          </button>

          <button
            onClick={() => router.push("/wishlist")}
            className="bg-zinc-800 py-4 rounded-xl font-bold hover:bg-zinc-700 transition"
          >
            ❤️ Wishlist
          </button>

          <button
            onClick={() => router.push("/change-password")}
            className="bg-zinc-800 py-4 rounded-xl font-bold hover:bg-zinc-700 transition"
          >
            🔒 Change Password
          </button>

        </div>

        <button
          onClick={logout}
          className="w-full mt-8 bg-red-600 py-4 rounded-xl font-bold hover:bg-red-500 transition"
        >
          Logout
        </button>

      </div>

    </main>
  );
}