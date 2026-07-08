"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductGrid() {
  const [perfumes, setPerfumes] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setPerfumes(data);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section className="bg-black py-20 px-8">
      <h2 className="text-5xl font-bold text-center text-white mb-14">
        Featured Collection
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {perfumes.map((perfume) => (
          <ProductCard
            key={perfume.id}
            id={perfume.id}
            name={perfume.name}
            price={perfume.price}
            image={perfume.image}
          />
        ))}
      </div>
    </section>
  );
}