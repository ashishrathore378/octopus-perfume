"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      alert(error.message);
      router.push("/admin/products");
      return;
    }

    setName(data.name);
    setPrice(String(data.price));
    setStock(String(data.stock));
    setCategory(data.category);
    setDescription(data.description);
    setFeatured(data.featured);
    setImageUrl(data.image);

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    let finalImage = imageUrl;

    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert(uploadError.message);
        setSaving(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      finalImage = publicUrl;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price: Number(price),
        stock: Number(stock),
        category,
        description,
        featured,
        image: finalImage,
      })
      .eq("id", productId);

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    alert("Product Updated Successfully!");

    router.push("/admin/products");
  }

  if (loading) {
    return (
      <main className="text-white flex items-center justify-center h-screen">
        Loading Product...
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto text-white">

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 rounded-2xl p-8 space-y-6"
      >
              <div>
          <label className="block mb-2">Current Image</label>

          <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            className="rounded-xl object-cover mb-4"
          />

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

        </div>

        <div>
          <label className="block mb-2">
            Category
          </label>

          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-zinc-800"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="flex-1 bg-zinc-700 py-4 rounded-xl font-bold hover:bg-zinc-600"
          >
            Cancel
          </button>

        </div>

      </form>

    </main>
  );
}