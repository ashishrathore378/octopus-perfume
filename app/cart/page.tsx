
"use client";
import Link from "next/link";
import {
  useCart,
} from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-400 mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-xl">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 bg-zinc-900 rounded-xl p-5"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-yellow-400 text-lg mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-red-500 px-3 py-1 rounded-lg"
                      >
                        −
                      </button>

                      <span className="text-lg font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-green-500 px-3 py-1 rounded-lg"
                      >
                        +
                      </button>

                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}

            </div>

            <div className="mt-10 border-t border-gray-700 pt-8">

              <h2 className="text-3xl font-bold">
                Total: ₹{totalPrice}
              </h2>

              <Link href="/checkout">
  <button className="mt-6 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300">
    Proceed to Checkout
  </button>
</Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}