"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Search, Heart, User } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-[0.35em] text-yellow-400 cursor-pointer">
          OCTOPUS
        </h1>

        {/* Menu */}
        <div className="hidden md:flex gap-8 text-white font-medium">
          <a href="#" className="hover:text-yellow-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Collection
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Best Sellers
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            About
          </a>
          <a href="#" className="hover:text-yellow-400 transition">
            Contact
          </a>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 text-white">
          <Search className="cursor-pointer hover:text-yellow-400" />

          <Heart className="cursor-pointer hover:text-yellow-400" />

          <Link href="/cart" className="relative cursor-pointer">
            <ShoppingCart className="hover:text-yellow-400" />

            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full text-xs px-2">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </Link>

          <Link href="/profile">
  <User className="cursor-pointer hover:text-yellow-400" />
</Link>
        </div>

      </div>
    </nav>
  );
}