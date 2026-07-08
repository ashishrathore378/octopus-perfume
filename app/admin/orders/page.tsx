"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  user_id: string;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
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
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Customer Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-zinc-900 p-6 rounded-xl">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-zinc-900 rounded-xl overflow-hidden">
            <thead className="bg-yellow-400 text-black">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800"
                >
                  <td className="p-4">#{order.id}</td>

                  <td className="p-4">
                    {order.user_id.slice(0, 8)}...
                  </td>

                  <td className="p-4 text-yellow-400 font-bold">
                    ₹{order.total}
                  </td>

                  <td className="p-4">
                    {order.payment_method}
                  </td>

                  <td className="p-4">
                    <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <Link
  href={`/admin/orders/${order.id}`}
  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 inline-block"
>
  View
</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}