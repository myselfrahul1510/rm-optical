import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ShareButton from "@/components/ShareButton";
import ProductImageGallery from "@/components/ProductImageGallery";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    notFound();
  }

  // =====================================================
  // IMAGE DATA
  // =====================================================

  let images: string[] = [];

  if (product.image) {
    try {
      const parsed = JSON.parse(product.image);

      if (Array.isArray(parsed)) {
        images = parsed;
      } else {
        images = [product.image];
      }
    } catch {
      images = [product.image];
    }
  }

  // =====================================================
  // DISCOUNT
  // =====================================================

  const discount =
    product.mrp > 0
      ? Math.round(
        ((product.mrp - product.selling_price) / product.mrp) * 100
      )
      : 0;

  // =====================================================
  // PRODUCT URL
  // =====================================================

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const productUrl = `${siteUrl}/my-collection/${product.slug}`;

  // =====================================================
  // WHATSAPP MESSAGE
  // =====================================================

  const whatsappMessage = encodeURIComponent(
    `Hello,

I'm interested in this frame.

Frame: ${product.name}
Brand: ${product.brand}

Price: ₹${product.selling_price}

Product Link:
${productUrl}`
  );

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="min-h-screen overflow-x-hidden pt-6">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14" >

          {/* =====================================================
              LEFT SIDE - IMAGE GALLERY
          ===================================================== */}

          <div
            className="
              min-w-0
              mt-2
              ml-1
              sm:mt-4
              sm:ml-2
              lg:mt-4
              lg:ml-4
            "

          >
            <ProductImageGallery
              images={images}
              productName={product.name}
            />
          </div>

          {/* =====================================================
              RIGHT SIDE - PRODUCT DETAILS
          ===================================================== */}

          <div className="min-w-0 flex flex-col justify-start py-2 sm:py-4"
            style={{ margin: "3rem", marginTop: "5rem" }}>

            {/* =================================================
                BRAND
            ================================================= */}

            <div>
              <span
                className="
                  inline-flex
                  rounded-full
                  bg-blue-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-[#0A2E73]
                  mt-6
                  sm:mt-8
                  lg:mt-12
                "
              >
                {product.brand}
              </span>
            </div>

            {/* =================================================
                FEATURED
            ================================================= */}

            {product.featured && (
              <div className="mt-5">
                <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
                  ⭐ Featured Product
                </span>
              </div>
            )}

            {/* =================================================
                PRODUCT NAME
            ================================================= */}

            <h1
              className="
                mt-5
                break-words
                text-3xl
                font-bold
                text-gray-900
                sm:mt-6
                sm:text-4xl
                md:text-5xl
              "
            >
              {product.name}
            </h1>

            {/* =================================================
                CATEGORY
            ================================================= */}

            <p className="mt-3 text-base text-gray-500 sm:text-lg">
              {product.category}
            </p>

            {/* =================================================
                PRICE
            ================================================= */}

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">

              {/* SELLING PRICE */}

              <span className="text-3xl font-bold text-[#0A2E73] sm:text-4xl md:text-5xl">
                ₹{product.selling_price}
              </span>

              {/* MRP */}

              {product.mrp > product.selling_price && (
                <span className="text-xl text-gray-400 line-through sm:text-2xl">
                  ₹{product.mrp}
                </span>
              )}

              {/* DISCOUNT */}

              {discount > 0 && (
                <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white sm:px-4 sm:py-2 sm:text-sm"
                style={{padding: "2px 7px"}}>
                  {discount}% OFF
                </span>
              )}

            </div>

            {/* =================================================
                STOCK STATUS
            ================================================= */}

            <div className="mt-7 sm:mt-8">

              {product.stock > 0 ? (
                <span className="inline-flex rounded-full bg-green-100 px-4 py-2.5 text-sm font-semibold text-green-700 sm:px-5 sm:py-3">
                  ✅ In Stock ({product.stock} Available)
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-700 sm:px-5 sm:py-3">
                  ❌ Out of Stock
                </span>
              )}

            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="mt-8 sm:mt-10">

              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Product Description
              </h2>

              <p className="mt-3 break-words leading-7 text-gray-600 sm:mt-4 sm:leading-8">
                {product.description || "No description available."}
              </p>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div
              className="
                mt-8
                grid
                gap-3
                sm:mt-12
                sm:gap-4
                sm:grid-cols-2
                sm:mr-2
                lg:mr-4
              "
            >

              {/* CALL NOW */}

              <a
                href="tel:+916296457668"
                className="
                  flex
                  min-h-[54px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(12,164,240)]
                  px-5
                  py-3
                  text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[rgba(27,30,221,0.87)]
                  hover:color[rgb(247,242,240)]
                  sm:px-6
                  sm:py-4
                  sm:text-lg
                "
              >
                📞 Call Now
              </a>

              {/* WHATSAPP */}

              <a
                href={`https://wa.me/916296457668?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  min-h-[54px]
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(102,245,89)]
                  px-5
                  py-3
                  text-base
                  font-semibold
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:[rgb(223,24,24)]
                  sm:px-6
                  sm:py-4
                  sm:text-lg
                "
              >
                💬 Enquiry on WhatsApp
              </a>

            </div>

            {/* =================================================
                SHARE PRODUCT
            ================================================= */}

            <div className="mt-4 sm:mt-5">
              <ShareButton
                productName={product.name}
                productUrl={productUrl}
              />
            </div>
          </div>

        </div>

      </div>

    </main>
  );
}