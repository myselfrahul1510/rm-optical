"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const categories = ["All", "Store", "Frames", "Eye Test"];

const images = [
  {
    src: "/images/gallery/Gallery.jpg",
    category: "Store",
  },
  {
    src: "/images/gallery/Gallery2.jpg",
    category: "Eye Test",
    
  },
  {
    src: "/images/gallery/Gallery3.jpg",
    category: "Eye Test",
  },
  {
    src: "/images/gallery/Gallery4.jpg",
    category: "Frames",
  },
  {
    src: "/images/gallery/Gallery5.jpg",
    category: "Frames",
  },
  // {
  //   src: "/images/gallery/Gallery6.jpg",
  //   category: "Eye Test",
  // },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(-1);

  const filtered =
    filter === "All"
      ? images
      : images.filter((item) => item.category === filter);

  return (
    <section
      id="gallery"
      className="bg-gradient-to-b from-white to-slate-50 py-24"
    >
      <div className="container">

        {/* =====================================================
            HEADING
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
            GALLERY
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#0A2E73]">
            Explore R.M OPTICAL
          </h2>

          <div className="flex w-full justify-center">
            <p className="mt-4 w-full max-w-2xl text-center text-base leading-7 text-gray-600 md:text-lg">
              Have a look inside our premium optical store.
            </p>
          </div>
        </motion.div>

        {/* =====================================================
            CATEGORY FILTER
        ===================================================== */}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const active = filter === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setFilter(category);
                  setIndex(-1);
                }}
                style={{padding:"3px 10px", marginBottom:"1rem"}}
                className={`
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  
                  ${
                    active
                      ? "bg-[#0A2E73] text-black shadow-lg shadow-blue-900/20"
                      : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-blue-50 hover:text-[#0A2E73]"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* =====================================================
            GALLERY GRID
        ===================================================== */}

        <div className="mt-14 columns-1 gap-6 md:columns-2 xl:columns-3">

          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              layout
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => setIndex(i)}
              className="
                group
                relative
                mb-6
                cursor-pointer
                overflow-hidden
                rounded-3xl
                bg-gray-100
                shadow-sm
                ring-1
                ring-gray-100
                break-inside-avoid
              "
            >

              {/* =================================================
                  FIXED IMAGE SIZE
              ================================================= */}

              <div className="relative aspect-[4/5] w-full overflow-hidden">

                <Image
                  src={img.src}
                  alt={`R.M OPTICAL Gallery ${i + 1}`}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1280px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-110
                  "
                />

                {/* =================================================
                    HOVER OVERLAY
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0A2E73]/60
                    via-transparent
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* =================================================
                    VIEW ICON
                ================================================= */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:opacity-100
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      text-[#0A2E73]
                      shadow-xl
                      backdrop-blur-sm
                      transition-transform
                      duration-500
                      group-hover:scale-100
                      scale-75
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12z"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="2.75"
                      />
                    </svg>
                  </div>
                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* =====================================================
            LIGHTBOX
        ===================================================== */}

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={index}
          slides={filtered.map((item) => ({
            src: item.src,
          }))}
        />

      </div>
    </section>
  );
}
