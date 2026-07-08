"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OrderSummaryPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    // Create Order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: total,
        payment_method: "Cash on Delivery",
        status: "Pending",
      })
      .select()
      .single();

    if (orderError) {
      alert(orderError.message);
      setLoading(false);
      return;
    }

    // Prepare Order Items
    const items = cart.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Insert Order Items
    const { error: itemError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemError) {
      alert(itemError.message);
      setLoading(false);
      return;
    }

    clearCart();

    router.push("/order-success");
  }

  return (
    <main className="min-h-screen bg-black text-white py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Order Summary
        </h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-zinc-900 rounded-xl p-5"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={90}
                height={90}
                className="rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-gray-400">
                  Quantity: {item.quantity}
                </p>

                <p className="text-yellow-400 font-bold">
                  ₹{item.price}
                </p>
              </div>

              <div className="text-xl font-bold">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Payment Method
          </h2>

          <p className="text-green-400 mb-6">
            Cash on Delivery
          </p>

          <div className="border-t border-zinc-700 pt-6 flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span className="text-yellow-400">
              ₹{total}
            </span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="mt-8 w-full bg-yellow-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </main>
  );
}