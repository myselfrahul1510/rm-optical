"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {

  console.log("PRODUCT IMAGES:", images);

  const [selectedImage, setSelectedImage] = useState(
    images.length > 0 ? images[0] : ""
  );

  if (!images.length) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-3xl border border-gray-200 bg-gray-50 text-gray-400 shadow-lg md:h-[700px]">
        No Image
      </div>
    );
  }

  return (
    <div
      className="w-full"
      style={{ marginTop: "1rem", marginLeft: "1rem" }}
    >

      {/* =====================================================
          MAIN / COVER IMAGE
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">

        <div className="relative flex h-[500px] w-full items-center justify-center bg-gray-50 md:h-[700px]">

          <Image
            src={selectedImage}
            alt={productName}
            fill
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />

        </div>

      </div>


      {/* =====================================================
          THUMBNAILS
      ===================================================== */}

      {images.length > 1 && (
        <div className="mt-5 w-full overflow-x-auto pb-2">

          <div className="flex min-w-max gap-3">

            {images.map((image, index) => {

              const isSelected = selectedImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition-all duration-200 ${
                    isSelected
                      ? "border-[#0A2E73] shadow-md ring-2 ring-[#0A2E73]/20"
                      : "border-gray-200 hover:border-[#0A2E73]"
                  }`}
                >

                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    unoptimized
                    sizes="100px"
                    className="object-contain p-2"
                  />

                </button>
              );
            })}

          </div>

        </div>
      )}

    </div>
  );
}