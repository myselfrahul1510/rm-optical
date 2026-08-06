"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
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
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

    setLoading(false);
  }

  async function deleteProduct(id: string) {
    const ok = confirm("Delete this product?");

    if (!ok) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchProducts();
  }

  if (loading) {
    return <h2 className="text-xl">Loading...</h2>;
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#0A2E73]">
        Products
      </h1>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-[#0A2E73] text-white">

            <tr>
              <th className="p-4 text-left">Frame</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {products.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.brand}
                </td>

                <td className="p-4">
                  {item.category}
                </td>

                <td className="p-4">
                  ₹{item.price}
                </td>

                <td className="p-4">
                  {item.stock}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteProduct(item.id)}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}