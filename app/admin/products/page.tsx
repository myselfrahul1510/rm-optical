"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  mrp: number;
  selling_price: number;
  stock: number;
  image: string;
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
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    }

    if (data) {
      setProducts(data as Product[]);
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

    alert("Product deleted successfully.");

    fetchProducts();
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#0A2E73]" style={{marginBottom:"10PX"}}>
        Products
      </h1>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-lg">

        <table className="min-w-full">

          <thead className="bg-[#0A2E73] text-white">

            <tr>
              <th className="p-4 text-center">Frame</th>
              <th className="p-4 text-center">Brand</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">MRP</th>
              <th className="p-4 text-center">Selling</th>
              <th className="p-4 text-center">Stock</th>
              <th className="p-4 text-center">Featured</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>
                <td
                  colSpan={9}
                  className="p-10 text-center text-gray-500"
                >
                  No Products Found
                </td>
              </tr>

            ) : (

              products.map((item) => (

                <tr
                  key={item.id}
                  className="border-b transition hover:bg-gray-50 text-center" 
                >


                  <td className="p-4 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.brand}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{item.mrp}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹{item.selling_price}
                  </td>

                  <td className="p-4">
                    {item.stock}
                  </td>

                  <td className="p-4">
                    {item.featured ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        Yes
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                        No
                      </span>
                    )}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <Link
                        href={`/admin/edit-product/${item.id}`}
                        style={{
                          margin: "10px",
                          background: "#0A2E73",
                          color: "#fff",
                          padding: "8px 18px",

                          borderRadius: "8px",
                          fontWeight: "600",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(item.id)}
                        style={{
                          margin: "10px",
                          background: "#dc2626",
                          color: "#fff",
                          padding: "8px 18px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}