"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "@/lib/supabase-browser";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",

    // MRP
    price: "",

    // Default Discount
    discount: "20",

    // Auto Calculated
    sellingPrice: "",

    description: "",

    stock: "0",
  });

  function calculateSellingPrice(
    mrp: string,
    discount: string
  ) {
    const mrpValue = Number(mrp);
    const discountValue = Number(discount);

    if (!mrpValue) return "";

    const selling =
      mrpValue -
      (mrpValue * discountValue) / 100;

    return Math.round(selling).toString();
  }

  function calculateSavings(
    mrp: string,
    selling: string
  ) {
    const mrpValue = Number(mrp);
    const sellingValue = Number(selling);

    if (!mrpValue || !sellingValue) return 0;

    return mrpValue - sellingValue;
  }

  function handleFiles(files: FileList | File[]) {
    const newFiles = Array.from(files);

    if (selectedImages.length + newFiles.length > 6) {
      alert("Maximum 6 images allowed.");
      return;
    }

    setSelectedImages((prev) => [...prev, ...newFiles]);

    const urls = newFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...urls]);
  }

  function removeImage(index: number) {
    setSelectedImages((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  }

  async function uploadImages() {
    if (selectedImages.length === 0) return [];

    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of selectedImages) {
      const ext = file.name.split(".").pop();

      const fileName = `${uuid()}.${ext}`;

      const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      uploadedUrls.push(data.publicUrl);
    }

    setUploading(false);

    return uploadedUrls;
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (selectedImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setLoading(true);

    const imageUrls = await uploadImages();

    if (imageUrls.length === 0) {
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name: form.name,

          slug: form.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),

          brand: form.brand,

          category: form.category,

          mrp: Number(form.price),

          selling_price: Number(
            form.sellingPrice
          ),

          description: form.description,

          stock: Number(form.stock),

          image: imageUrls[0],

          featured: false,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Product Added Successfully");

    setForm({
      name: "",
      brand: "",
      category: "",
      price: "",
      discount: "20",
      sellingPrice: "",
      description: "",
      stock: "0",
    });

    setSelectedImages([]);
    setPreviews([]);
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 py-8 flex justify-center"

    >

      <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-[#0A2E73]">
            Add New Product
          </h1>

          <p className="mt-2 text-gray-500">
            Add Frames & Optical Products
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Product Information */}

          <div
            style={{ margin: "10px" }}>

            <h2 className="mb-5 text-xl font-bold text-[#0A2E73]">
              Product Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}

              <div>

                <label className="mb-2 block font-semibold">
                  Product Name
                </label>

                <input
                  required
                  type="text"
                  value={form.name}
                  style={{ padding: "5px" }}
                  placeholder="RayBan Frame"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value
                    })
                  }
                />

              </div>

              {/* Brand */}

              <div>

                <label className="mb-2 block font-semibold">
                  Brand
                </label>

                <input
                  required
                  type="text"
                  value={form.brand}
                  style={{ padding: "5px" }}
                  placeholder="RayBan"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      brand: e.target.value
                    })
                  }
                />

              </div>

              {/* Category */}

              <div className="md:col-span-2">

                <label className="mb-2 block font-semibold">
                  Category
                </label>

                <select
                  required
                  value={form.category}
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Men">
                    Men
                  </option>

                  <option value="Women">
                    Women
                  </option>

                  <option value="Kids">
                    Kids
                  </option>

                  <option value="Men / Women / Kids">
                    Men / Women / Kids
                  </option>

                </select>

              </div>

              {/* MRP */}

              <div>

                <label className="mb-2 block font-semibold">
                  MRP (₹)
                </label>

                <input
                  required
                  type="number"
                  value={form.price}
                  style={{ padding: "5px" }}
                  placeholder="2500"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
                  onChange={(e) => {

                    const value = e.target.value;

                    setForm({
                      ...form,
                      price: value,
                      sellingPrice: calculateSellingPrice(
                        value,
                        form.discount
                      )
                    });

                  }}
                />

              </div>

              {/* Discount */}

              <div>

                <label className="mb-2 block font-semibold">
                  Discount (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  style={{ padding: "5px" }}
                  value={form.discount}
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
                  onChange={(e) => {

                    const value = e.target.value;

                    setForm({
                      ...form,
                      discount: value,
                      sellingPrice: calculateSellingPrice(
                        form.price,
                        value
                      )
                    });

                  }}
                />

              </div>

              {/* Selling Price */}

              <div>

                <label className="mb-2 block font-semibold">
                  Selling Price
                </label>

                <input
                  readOnly
                  style={{ padding: "5px" }}
                  value={form.sellingPrice}
                  className="w-full rounded-lg border-2 border-green-500 bg-green-50 px-5 py-3 font-bold text-green-700"
                />

              </div>

              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-5"
                style={{ padding: "10px", }}>

                <div className="flex justify-between">

                  <span className="font-medium text-gray-700">
                    Customer Pays
                  </span>

                  <span className="font-bold text-green-700">
                    ₹{form.sellingPrice || 0}
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="font-medium text-gray-700">
                    Customer Saves
                  </span>

                  <span className="font-bold text-red-600">
                    ₹{
                      calculateSavings(
                        form.price,
                        form.sellingPrice
                      )
                    }
                  </span>

                </div>

                <div className="mt-3 flex justify-between">

                  <span className="font-medium text-gray-700">
                    Discount Applied
                  </span>

                  <span className="font-bold text-blue-700">
                    {form.discount || 0}%
                  </span>

                </div>

              </div>

              {/* Stock */}

              <div>

                <label className="mb-2 block font-semibold">
                  Stock
                </label>

                <input
                  required
                  type="number"
                  value={form.stock}
                  style={{ padding: "5px" }}
                  placeholder="00"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      stock: e.target.value
                    })
                  }
                />

              </div>

            </div>

          </div>

          {/* Description */}

          <div
            style={{ margin: "10px" }}>

            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              required
              value={form.description}
              style={{ padding: "5px" }}
              placeholder="Write Product Description..."
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value
                })
              }
            />

          </div>

          {/* Product Images */}

          <div style={{ padding: "5px" }}>

            <h2 className="mb-5 text-xl font-bold text-[#0A2E73]"
            style={{ padding: "5px" }}
            >
              Product Images
            </h2>

            <div className="mb-5 rounded-xl bg-gradient-to-r from-blue-100 via-cyan-100 to-indigo-100 p-5 text-center">

              <p className="text-lg font-semibold text-[#0A2E73]">
                Upload Product Images
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2"
              style={{ marginTop: "10px" }}
            >

              <label
                htmlFor="gallery"
                className="cursor-pointer rounded-xl border border-gray-300 bg-white p-6 text-center transition hover:border-[#0A2E73] hover:shadow-lg"
              >

                <div className="text-5xl">
                  📁
                </div>

                <p className="mt-3 font-semibold">
                  Choose From Gallery
                </p>

              </label>

              <input
                id="gallery"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFiles(e.target.files);
                  }
                }}
              />

              <label
                htmlFor="camera"
                className="cursor-pointer rounded-xl border border-gray-300 bg-white p-6 text-center transition hover:border-[#0A2E73] hover:shadow-lg"
              >

                <div className="text-5xl">
                  📷
                </div>

                <p className="mt-3 font-semibold">
                  Take Photo
                </p>

              </label>

              <input
                id="camera"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFiles(e.target.files);
                  }
                }}
              />

            </div>

          </div>

          {/* Preview */}

          {
            previews.length > 0 && (

              <div>

                <h2 className="mb-4 text-xl font-bold text-[#0A2E73]">
                  Image Preview
                </h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

                  {
                    previews.map((image, index) => (

                      <div
                        key={index}
                        className="relative"
                      >

                        <img
                          src={image}
                          alt=""
                          className="h-36 w-full rounded-xl border object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            background: "#dc2626",
                            color: "#fff",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                        >
                          ✕
                        </button>

                      </div>

                    ))
                  }

                </div>

              </div>

            )
          }


          {/* Submit */}

          <button
            type="submit"
            disabled={loading || uploading}
            style={{
              marginTop: "5px",
              width: "100%",
              background: "#0A2E73",
              color: "#fff",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              opacity: loading || uploading ? 0.6 : 1
            }}
          >

            {
              uploading
                ? "Uploading Images..."
                : loading
                  ? "Saving Product..."
                  : "Add Product"
            }

          </button>

        </form>

      </div>

    </div>

  );
}