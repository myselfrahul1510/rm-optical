"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase-browser";
// import { color } from "framer-motion";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  mrp: number;
  selling_price: number;
  stock: number;
  image: string;
  slug: string;
  featured: boolean;
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

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-gray-50 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* Header Skeleton */}
          <div className="mb-16 text-center sm:mb-20">
            <div className="mx-auto h-8 w-40 animate-pulse rounded-full bg-gray-200" />
            <div className="mx-auto mt-5 h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
            <div className="mx-auto mt-4 h-5 w-80 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Card Skeleton */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="h-72 animate-pulse bg-gray-200" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />
                  <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // EMPTY COLLECTION STATE
  // =====================================================

  if (products.length === 0) {
    return (
      <main className="min-h-screen w-full bg-gray-50 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="container mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl">
              👓
            </div>
            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              No Products Available
            </h1>
            <p className="mt-3 text-gray-500">
              Our collection is being updated. Please check again soon.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <main className="min-h-screen w-full bg-gray-50 pt-24 pb-16 sm:pt-28 sm:pb-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =================================================
            PAGE HEADER
        ================================================= */}
        <div className="mb-16 flex flex-col items-center justify-center text-center sm:mb-20">
          <span className="mt-4 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#0A2E73]"
          style={{marginTop:"8px"}}>
            R.M OPTICAL
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0A2E73] sm:text-5xl">
            My Collection
          </h1>
          <p className="mt-4 max-w-xl text-center text-base leading-7 text-gray-500 sm:text-lg"
          >
            Explore our premium collection of stylish and comfortable eyewear.
          </p>
          <div className="mt-8 h-1 w-16 rounded-full bg-[#0A2E73]" />
        </div>

        {/* =================================================
            PRODUCT GRID
        ================================================= */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-10">
          {products.map((product) => {
            const discount =
              product.mrp > 0
                ? Math.round(
                  ((product.mrp - product.selling_price) / product.mrp) * 100
                )
                : 0;

            return (
              <div
                key={product.id}
                className="group relative mt-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            
              >
                {/* =========================================
                    IMAGE SECTION
                ========================================= */}
                <Link
                  href={`/my-collection/${product.slug}`}
                  className="block"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-gray-100"
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* FEATURED BADGE (ইমেজের ওপরে ডানদিকে) */}
                    {product.featured && (
                      <span className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-bold text-black shadow-md">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </Link>

                {/* =========================================
                    CARD CONTENT
                ========================================= */}
                <div className="p-5 sm:p-6"
                >
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0A2E73]"
                  style={{marginLeft:"10px"}}>
                    {product.brand}
                  </span>

                  <h2 className="mt-3 line-clamp-1 text-xl font-bold text-gray-900"
                  style={{marginLeft:"10px"}}>
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500"
                  style={{marginLeft:"10px"}}>
                    {product.category}
                  </p>

                  {/* PRICE & DISCOUNT (একসাথে এক লাইনে) */}
                  <div className="mt-4 flex flex-wrap items-center gap-2"
                  style={{marginLeft:"10px"}}>
                    {/* Selling Price */}
                    <span className="text-2xl font-bold text-[#0A2E73]">
                      ₹{product.selling_price}
                    </span>

                    {/* MRP */}
                    {product.mrp > product.selling_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.mrp}
                      </span>
                    )}

                    {/* DISCOUNT BADGE */}
                    {discount > 0 && (
                      <span
                        className="ml-1 rounded-md px-2 py-1"
                        style={{
                          color: "red",
                          fontSize: "18px",
                          fontWeight: "800",
                        }}
                      >
                        {discount}% OFF
                      </span>
                    )}
                    
                  </div>

                  {/* STOCK STATUS */}
                  <div className="mt-4"
                  style={{marginLeft:"10px"}}>
                    {product.stock > 3 ? (
                      <span className="text-xs font-semibold text-green-600">
                        ✓ In Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="text-xs font-semibold text-orange-600">
                        🔥 Only {product.stock} left
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-red-600">
                        ✕ Out of Stock
                      </span>
                    )}
                  </div>

                  {/* VIEW PRODUCT BUTTON */}
                  <Link
                    href={`/my-collection/${product.slug}`}
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#54B0E6] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#3A94C8]"
                  style={{padding:"7px"}}>
                    View Product
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}