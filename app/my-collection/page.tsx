"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
};

export default function MyCollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="container py-14">

      <div className="mb-12 text-center">

        <h1 className="text-5xl font-bold text-[#0A2E73]">
          My Collection
        </h1>

        <p className="mt-3 text-gray-500">
          Premium Eyewear Collection
        </p>

      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-2"
          >

            <div className="relative h-72">

              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />

            </div>

            <div className="p-5">

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#0A2E73]">
                {product.brand}
              </span>

              <h2 className="mt-4 text-xl font-bold">
                {product.name}
              </h2>

              <p className="mt-2 text-gray-500">
                {product.category}
              </p>

              <div className="mt-5 flex items-center justify-between">

                <span className="text-2xl font-bold text-[#0A2E73]">
                  ₹{product.price}
                </span>

                <Link
                  href={`/my-collection/${product.id}`}
                  className="rounded-lg bg-[#0A2E73] px-4 py-2 text-white"
                >
                  View
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}


