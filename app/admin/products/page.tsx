"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  category: string;
  featured: boolean;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  }

  async function deleteProduct(product: Product) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmDelete) return;

    try {
      // Delete image from Supabase Storage
      if (product.image) {
        const fileName = product.image.split("/").pop();

        if (fileName) {
          const { error: storageError } = await supabase.storage
            .from("products")
            .remove([fileName]);

          if (storageError) {
            console.log(storageError.message);
          }
        }
      }

      // Delete product from database
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        alert(error.message);
        return;
      }

      // Refresh list without reloading page
      setProducts((prev) =>
        prev.filter((item) => item.id !== product.id)
      );

      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <main className="text-white">
        Loading products...
      </main>
    );
  }

  return (
    <main className="text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-yellow-400">
            Products
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your perfume collection
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300"
        >
          + Add Product
        </Link>

      </div>

      <div className="bg-zinc-900 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-b border-zinc-800"
              >

                <td className="p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="p-4">
                  ₹{product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  {product.category || "-"}
                </td>

                <td className="p-4">
                  {product.featured ? (
                    <span className="text-green-400 font-bold">
                      Yes
                    </span>
                  ) : (
                    <span className="text-red-400">
                      No
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-2">

                  <Link
  href={`/admin/products/edit/${product.id}`}
  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
>
  Edit
</Link>

                  <button
                    onClick={() => deleteProduct(product)}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}