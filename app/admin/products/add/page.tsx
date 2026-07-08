"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, imageFile);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    const { error } = await supabase.from("products").insert({
      name,
      price: Number(price),
      stock: Number(stock),
      category,
      description,
      featured,
      image: publicUrl,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    alert("Product Added Successfully!");

    router.push("/admin/products");
  }

  return (
    <main className="text-white max-w-3xl mx-auto">

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 rounded-2xl p-8 space-y-6"
      >

        <div>

          <label className="block mb-2">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(e.target.files?.[0] || null)
            }
            className="w-full"
          />

        </div>

        <div>

          <label className="block mb-2">
            Product Name
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800"
            required
          />

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800"
              required
            />

          </div>

          <div>

            <label className="block mb-2">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800"
              required
            />

          </div>

        </div>        <div>
          <label className="block mb-2">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800"
            placeholder="Luxury, Fresh, Oud..."
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full p-3 rounded-lg bg-zinc-800"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5"
          />

          <label>
            Featured Product
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

      </form>

    </main>
  );
}