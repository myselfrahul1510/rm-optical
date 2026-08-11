"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const brands = [
  {
    name: "Tom-Star",
    image: "/images/brands/Tomstar.jpeg",
  },
  {
    name: "LivelPool",
    image: "/images/brands/Livelpool.jpeg",
  },
  {
    name: "Willam-Lady",
    image: "/images/brands/Willam-Lady.jpeg",
  },
  {
    name: "Ferar",
    image: "/images/brands/Ferar.jpeg",
  },
  {
    name: "Lifeline",
    image: "/images/brands/Lifeline.jpeg",
  },
  {
    name: "Fanta",
    image: "/images/brands/fanta.jpeg",
  },
  {
    name: "Texxas",
    image: "/images/brands/Texxas.jpeg",
  },
  {
    name: "Spain",
    image: "/images/brands/Spain.jpeg",
  },
];

export default function BrandSlider() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
            PREMIUM BRANDS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#0A2E73] md:text-5xl">
            Brands We Trust
          </h2>

          <div className="flex w-full justify-center">
            <p className="mt-4 w-full max-w-2xl text-center text-base leading-7 text-gray-600 md:text-lg">
              We offer genuine eyewear and lenses from India's and the world's
              most trusted brands.
            </p>
          </div>
        </motion.div>

        {/* Brand Slider */}
        <div className="overflow-hidden">
          <Marquee
            speed={40}
            pauseOnHover
            gradient={false}
            autoFill
          >
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="
          mx-4
          h-36
          w-64
          shrink-0
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          bg-white
          shadow-md
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
        "
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    sizes="256px"
                    className="
              object-cover
              object-center
              transition-transform
              duration-500
              hover:scale-110
            "
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}