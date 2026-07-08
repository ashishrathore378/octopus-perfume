"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  user_id: string;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
};

type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
};

export default function CustomerOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const orderId = Number(id);

    const { data: orderData, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("user_id", user.id)
      .single();

    if (error || !orderData) {
      setLoading(false);
      return;
    }

    setOrder(orderData);

    const { data: itemData } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    setItems(itemData || []);

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Order...
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Order not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-5xl mx-auto">

        <Link
          href="/orders"
          className="text-yellow-400 hover:underline"
        >
          ← Back to My Orders
        </Link>

        <h1 className="text-4xl font-bold text-yellow-400 mt-6 mb-8">
          Order #{order.id}
        </h1>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-8">

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <p className="text-gray-400 mb-2">
                Order Date
              </p>

              <p className="text-xl">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400 mb-2">
                Payment Method
              </p>

              <p className="text-xl">
                {order.payment_method}
              </p>
            </div>

            <div>
              <p className="text-gray-400 mb-2">
                Total Amount
              </p>

              <p className="text-3xl font-bold text-yellow-400">
                ₹{order.total}
              </p>
            </div>

            <div>
              <p className="text-gray-400 mb-2">
                Order Status
              </p>

              <span className="inline-block bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">
                {order.status}
              </span>
            </div>

          </div>

        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">

          <div className="p-6 border-b border-zinc-800">

            <h2 className="text-2xl font-bold">
              Ordered Products
            </h2>

          </div>

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>

                <th className="text-left p-4">
                  Product
                </th>

                <th className="text-left p-4">
                  Quantity
                </th>

                <th className="text-left p-4">
                  Price
                </th>

                <th className="text-left p-4">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {items.map((item) => (

                <tr
                  key={item.id}
                  className="border-b border-zinc-800"
                >

                  <td className="p-4">
                    {item.product_name}
                  </td>

                  <td className="p-4">
                    {item.quantity}
                  </td>

                  <td className="p-4">
                    ₹{item.price}
                  </td>

                  <td className="p-4 font-bold text-yellow-400">
                    ₹{item.price * item.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}