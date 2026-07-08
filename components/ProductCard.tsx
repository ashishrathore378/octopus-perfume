"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition duration-300">
      <Image
        src={image}
        alt={name}
        width={400}
        height={400}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">
        <h3 className="text-2xl font-semibold text-white">{name}</h3>

        <p className="text-yellow-400 text-xl mt-2">₹{price}</p>

        <button
          onClick={() =>
            addToCart({
              id,
              name,
              price,
              image,
              quantity: 1,
            })
          }
          className="mt-5 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}