"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
};

export default function OrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("id,total,payment_method,status,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Orders...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-zinc-900 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              No Orders Yet
            </h2>

            <p className="text-gray-400 mb-6">
              Looks like you haven't placed any orders.
            </p>

            <Link
              href="/"
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  <div>

                    <h2 className="text-2xl font-bold text-yellow-400">
                      Order #{order.id}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {new Date(order.created_at).toLocaleString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-3xl font-bold">
                      ₹{order.total}
                    </p>

                    <p className="text-gray-400">
                      {order.payment_method}
                    </p>

                  </div>

                </div>

                <div className="flex justify-between items-center mt-6">

                  <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                    {order.status}
                  </span>

                  <Link
                    href={`/orders/${order.id}`}
                    className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl font-semibold"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </main>
  );
}