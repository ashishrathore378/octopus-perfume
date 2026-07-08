"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-zinc-900 p-10 rounded-2xl text-center max-w-lg w-full">
        <div className="text-7xl mb-5">🎉</div>

        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-300 mb-8">
          Thank you for shopping with OCTOPUS.
          <br />
          Your order has been received.
        </p>

        <Link
          href="/"
          className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-300"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}