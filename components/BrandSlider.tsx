"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const brands = [
  {
    name: "Ray-Ban",
    image: "/images/brands/rayban.png",
  },
  {
    name: "Titan Eye+",
    image: "/images/brands/titan.png",
  },
  {
    name: "Vogue",
    image: "/images/brands/vogue.png",
  },
  {
    name: "Oakley",
    image: "/images/brands/oakley.png",
  },
  {
    name: "IDEE",
    image: "/images/brands/idee.png",
  },
  {
    name: "Fastrack",
    image: "/images/brands/fastrack.png",
  },
  {
    name: "Vincent Chase",
    image: "/images/brands/vincent-chase.png",
  },
  {
    name: "Police",
    image: "/images/brands/police.png",
  },
];

export default function BrandSlider() {
  return (
    <section className="bg-slate-50 py-20">

      <div className="container">

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

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            We offer genuine eyewear and lenses from India's and the world's
            most trusted brands.
          </p>
        </motion.div>

        <Marquee
          speed={40}
          pauseOnHover
          gradient={false}
        >
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="mx-5 flex h-32 w-56 items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={140}
                height={70}
                className="object-contain grayscale transition duration-300 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>

      </div>

    </section>
  );
}