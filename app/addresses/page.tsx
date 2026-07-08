"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Address = {
  id: number;
  full_name: string;
  phone: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
};

export default function AddressesPage() {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setAddresses(data || []);
    }

    setLoading(false);
  }

  async function deleteAddress(id: number) {
    if (!confirm("Delete this address?")) return;

    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchAddresses();
  }

  async function makeDefault(id: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);

    await supabase
      .from("addresses")
      .update({ is_default: true })
      .eq("id", id);

    fetchAddresses();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex justify-center items-center">
        Loading Addresses...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold text-yellow-400">
              My Addresses
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your saved delivery addresses
            </p>
          </div>

          <Link
            href="/addresses/add"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300"
          >
            + Add Address
          </Link>

        </div>

        {addresses.length === 0 ? (

          <div className="bg-zinc-900 rounded-2xl p-10 text-center">

            <h2 className="text-2xl font-bold mb-3">
              No Addresses Found
            </h2>

            <p className="text-gray-400 mb-6">
              Add your first delivery address.
            </p>

            <Link
              href="/addresses/add"
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300"
            >
              Add Address
            </Link>

          </div>

        ) : (

          <div className="grid gap-6">

            {addresses.map((address) => (

              <div
                key={address.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-3">

                      <h2 className="text-2xl font-bold">
                        {address.full_name}
                      </h2>

                      {address.is_default && (
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                          Default
                        </span>
                      )}

                    </div>

                    <p className="mt-3">
                      📞 {address.phone}
                    </p>

                    <p className="mt-3">
                      {address.house}
                    </p>

                    <p>
                      {address.street}
                    </p>

                    {address.landmark && (
                      <p>
                        Landmark: {address.landmark}
                      </p>
                    )}

                    <p>
                      {address.city}, {address.state}
                    </p>

                    <p>
                      {address.pincode}
                    </p>

                  </div>

                  <div className="flex flex-col gap-3">

                    {!address.is_default && (

                      <button
                        onClick={() => makeDefault(address.id)}
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                      >
                        Make Default
                      </button>

                    )}

                    <Link
                      href={`/addresses/edit/${address.id}`}
                      className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-center"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteAddress(address.id)}
                      className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}