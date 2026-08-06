"use client";

import { useState } from "react";
import Image from "next/image";
import { v4 as uuid } from "uuid";
import { supabase } from "@/lib/supabase";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "0",
  });

  async function uploadImage() {
    if (!selectedImage) return null;

    setUploading(true);

    const extension =
      selectedImage.name.split(".").pop();

    const fileName =
      `${uuid()}.${extension}`;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(fileName, selectedImage);

    if (error) {
      setUploading(false);
      alert(error.message);
      return null;
    }

    const { data } =
      supabase.storage
        .from("products")
        .getPublicUrl(fileName);

    setUploading(false);

    return data.publicUrl;
  }

    async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select a product image.");
      return;
    }

    setLoading(true);

    const imageUrl = await uploadImage();

    if (!imageUrl) {
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: form.name,
          brand: form.brand,
          category: form.category,
          price: Number(form.price),
          description: form.description,
          image: imageUrl,
          stock: Number(form.stock),
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Product Added Successfully!");

    setForm({
      name: "",
      brand: "",
      category: "",
      price: "",
      description: "",
      image: "",
      stock: "0",
    });

    setSelectedImage(null);
    setPreview("");
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-8 text-4xl font-bold text-[#0A2E73]">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-8 shadow-xl"
      >
        <input
          placeholder="Frame Name"
          className="w-full rounded-lg border p-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Brand"
          className="w-full rounded-lg border p-3"
          value={form.brand}
          onChange={(e) =>
            setForm({
              ...form,
              brand: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          className="w-full rounded-lg border p-3"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full rounded-lg border p-3"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

                <div className="space-y-4">

          <label className="block text-sm font-semibold text-gray-700">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-dashed border-gray-300 p-3"
            onChange={(e) => {
              if (!e.target.files?.length) return;

              const file = e.target.files[0];

              setSelectedImage(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <div className="overflow-hidden rounded-xl border">

              <Image
                src={preview}
                alt="Preview"
                width={600}
                height={400}
                className="h-72 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => {
                  setPreview("");
                  setSelectedImage(null);
                }}
                className="mt-3 w-full rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
              >
                Remove Image
              </button>

            </div>
          )}

        </div>

        <textarea
          rows={4}
          placeholder="Description"
          className="w-full rounded-lg border p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          className="w-full rounded-lg border p-3"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={loading || uploading}
          className="w-full rounded-lg bg-[#0A2E73] py-3 font-semibold text-white transition hover:bg-[#08245A] disabled:opacity-50"
        >
          {uploading
            ? "Uploading Image..."
            : loading
            ? "Saving..."
            : "Add Product"}
        </button>

      </form>
    </div>
  );
}