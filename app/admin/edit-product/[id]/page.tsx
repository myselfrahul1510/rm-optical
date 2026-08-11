"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

// UI Form State Type
type ProductFormState = {
  id: string;
  name: string;
  brand: string;
  category: string;
  mrp: number;
  selling_price: number;
  stock: number;
  description: string;
  images: string[]; // Internally handling multiple images as an array
  featured: boolean;
  discount: number;
};

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // States for handling multiple new images
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [form, setForm] = useState<ProductFormState>({
    id: "",
    name: "",
    brand: "",
    category: "",
    mrp: 0,
    selling_price: 0,
    discount: 20,
    stock: 0,
    description: "",
    images: [], // array format for UI
    featured: false,
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  // Cleanup preview URLs to avoid memory leaks
  useEffect(() => {
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImages]);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // Safely parse the 'image' column which might be a JSON string or a plain URL
    let fetchedImages: string[] = [];
    if (data.image) {
      try {
        const parsed = JSON.parse(data.image);
        if (Array.isArray(parsed)) {
          fetchedImages = parsed;
        } else {
          fetchedImages = [data.image];
        }
      } catch (e) {
        fetchedImages = [data.image];
      }
    }

    setForm({
      ...data,
      images: fetchedImages,
      discount:
        data.mrp > 0
          ? Math.round(((data.mrp - data.selling_price) / data.mrp) * 100)
          : 20,
    });
    setLoading(false);
  }

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    const totalCurrentImages = form.images.length + newImages.length;
    
    if (totalCurrentImages + files.length > 6) {
      alert(`You can only upload a maximum of 6 images in total. You can add ${6 - totalCurrentImages} more.`);
      const allowedFiles = files.slice(0, 6 - totalCurrentImages);
      setNewImages([...newImages, ...allowedFiles]);
    } else {
      setNewImages([...newImages, ...files]);
    }
    
    e.target.value = "";
  };

  const removeExistingImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const removeNewImage = (indexToRemove: number) => {
    setNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  async function updateProduct() {
    setUploading(true);
    let finalImages = [...form.images];

    if (newImages.length > 0) {
      for (const file of newImages) {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file, { upsert: true });

        if (uploadError) {
          alert(`Failed to upload ${file.name}: ${uploadError.message}`);
          continue; 
        }
        const { data } = supabase.storage.from("products").getPublicUrl(fileName);
        finalImages.push(data.publicUrl);
      }
    }

    const imageStringPayload = finalImages.length > 0 ? JSON.stringify(finalImages) : "";

    const { error } = await supabase
      .from("products")
      .update({
        name: form.name,
        brand: form.brand,
        category: form.category,
        mrp: form.mrp,
        selling_price: form.selling_price,
        stock: form.stock,
        description: form.description,
        featured: form.featured,
        image: imageStringPayload, 
      })
      .eq("id", id);

    setUploading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Product Updated Successfully");
    router.push("/admin/products");
  }

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">Loading Product...</div>
    );
  }

  const totalSelectedImages = form.images.length + newImages.length;

  // Fixed Savings calculation using numbers
  function calculateSavings(mrp: number, selling: number) {
    if (!mrp || !selling) return 0;
    return mrp - selling;
  }

  return (
    <div style={{ margin: "10px" }}>
      <div className="rounded-2xl bg-white p-8 shadow-xl">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Product Name */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Product Name</label>
            <input
              type="text"
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Brand</label>
            <input
              type="text"
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Category</label>
            <select
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Men / Women / Kids">Men / Women / Kids</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Stock</label>
            <input
              type="number"
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
            />
          </div>

          {/* MRP */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>MRP</label>
            <input
              type="number"
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.mrp}
              onChange={(e) => {
                const mrp = Number(e.target.value);
                const sellingPrice = Math.round(mrp - (mrp * form.discount) / 100);
                setForm({ ...form, mrp, selling_price: sellingPrice });
              }}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Discount (%)</label>
            <input
              type="number"
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.discount}
              onChange={(e) => {
                const discount = Number(e.target.value);
                const sellingPrice = Math.round(form.mrp - (form.mrp * discount) / 100);
                setForm({ ...form, discount, selling_price: sellingPrice });
              }}
              className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Selling Price</label>
            <input
              type="number"
              style={{ margin: "0px 10px", padding: "5px 10px" }}
              value={form.selling_price}
              readOnly
              className="w-full rounded-lg border border-gray-300 bg-gray-100 px-5 py-3 outline-none"
            />
          </div>

          {/* Summary Box - Placed inside grid so it aligns next to Selling Price */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 self-end" style={{ margin: "0px 10px" }}>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Customer Pays</span>
              <span className="font-bold text-green-700">₹{form.selling_price || 0}</span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="font-medium text-gray-700">Customer Saves</span>
              <span className="font-bold text-red-600">
                ₹{calculateSavings(form.mrp, form.selling_price)}
              </span>
            </div>
            <div className="mt-3 flex justify-between">
              <span className="font-medium text-gray-700">Discount Applied</span>
              <span className="font-bold text-blue-700">{form.discount || 0}%</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="mb-2 block font-semibold" style={{ padding: "5px 10px" }}>Description</label>
          <textarea
            style={{ margin: "0px 10px", padding: "5px 10px" }}
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-5 py-3 outline-none focus:border-[#0A2E73]"
          />
        </div>

        {/* Images Section */}
        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0A2E73]" style={{ padding: "5px 10px" }}>
              Product Images ({totalSelectedImages}/6)
            </h2>
          </div>

          <div className="mb-5 flex flex-wrap gap-4">
            {form.images.map((imgUrl, index) => (
              <div key={`existing-${index}`} className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
                <img
                  style={{ margin: "0px 10px" }}
                  src={imgUrl}
                  alt={`Current Product ${index + 1}`}
                  className="h-full w-full rounded-xl border object-cover shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white transition hover:bg-red-700"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}

            {previewUrls.map((url, index) => (
              <div key={`new-${index}`} className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
                <img
                  src={url}
                  alt={`New Upload Preview ${index + 1}`}
                  className="h-full w-full rounded-xl border-2 border-dashed border-blue-400 object-cover opacity-90 shadow-sm"
                />
                <span className="absolute bottom-2 left-2 rounded-md bg-blue-600 px-2 py-1 text-[10px] font-bold text-white sm:text-xs">
                  New
                </span>
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white transition hover:bg-red-700"
                  title="Cancel new image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {totalSelectedImages < 6 ? (
            <div>
              <label className="mb-2 block font-semibold text-black-600" style={{ padding: "5px 10px" }}>
                Add More Images
              </label>
              <input
                style={{ margin: "0px 10px" }}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="w-full max-w-sm cursor-pointer rounded-lg border border-gray-300 p-2 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#0A2E73] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
              />
              <p className="mt-2 text-sm text-gray-500" style={{ margin: "0px 10px" }}>
                You can upload {6 - totalSelectedImages} more image(s).
              </p>
            </div>
          ) : (
            <p className="text-sm font-semibold text-red-600" style={{ margin: "0px 10px" }}>
              Maximum limit of 6 images reached. Remove an image to add a new one.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={updateProduct}
            disabled={uploading}
            style={{
              margin: "5px 8px",
              background: uploading ? "#6b7280" : "#0A2E73",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: uploading ? "not-allowed" : "pointer",
              border: "none",
            }}
          >
            {uploading ? "Updating Product..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}