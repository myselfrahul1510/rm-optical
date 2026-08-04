"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const categories = ["All", "Store", "Frames", "Eye Test"];

const images = [
  {
    src: "/images/gallery/gallery1.jpg",
    category: "Store",
  },
  {
    src: "/images/gallery/gallery2.jpg",
    category: "Frames",
  },
  {
    src: "/images/gallery/gallery3.jpg",
    category: "Eye Test",
  },
  {
    src: "/images/gallery/gallery4.jpg",
    category: "Frames",
  },
  {
    src: "/images/gallery/gallery5.jpg",
    category: "Store",
  },
  {
    src: "/images/gallery/gallery6.jpg",
    category: "Eye Test",
  },
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

        {/* Heading */}

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

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Have a look inside our premium optical store.
          </p>
        </motion.div>

        {/* Filter Buttons */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-6 py-3 font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-[#0A2E73] text-white shadow-lg"
                  : "bg-white text-gray-700 shadow hover:bg-[#0A2E73] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}

        <div className="mt-14 columns-1 gap-6 md:columns-2 xl:columns-3">
          {filtered.map((img, i) => (
            <motion.div
              key={img.src}
              layout
              whileHover={{
                scale: 1.02,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() => setIndex(i)}
              className="mb-6 cursor-pointer overflow-hidden rounded-3xl"
            >
              <Image
                src={img.src}
                alt={`Gallery ${i + 1}`}
                width={600}
                height={800}
                className="w-full rounded-3xl object-cover transition duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}

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