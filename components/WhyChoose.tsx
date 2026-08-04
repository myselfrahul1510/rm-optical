"use client";

import {
  CheckCircle2,
  Eye,
  Glasses,
  ShieldCheck,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: Eye,
    title: "Computerised Eye Testing",
    desc: "Advanced eye examination using modern digital equipment.",
  },
  {
    icon: Glasses,
    title: "Premium Frames",
    desc: "Large collection of stylish and branded optical frames.",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine Products",
    desc: "Original lenses, frames and trusted optical brands.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Service",
    desc: "Thousands of happy customers trust R.M OPTICAL.",
  },
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    desc: "Experienced ophthalmologists and optometrists.",
  },
  {
    icon: CheckCircle2,
    title: "Affordable Pricing",
    desc: "Premium quality products at competitive prices.",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-24">

      <div className="container">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
            WHY CHOOSE US
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#0A2E73]">
            Why Choose R.M OPTICAL?
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Premium eye care, trusted professionals and high-quality eyewear —
            everything you need under one roof.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {items.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .5,
                  delay: index * .12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-2xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A2E73] to-blue-500 text-white transition group-hover:scale-110">

                  <Icon size={30} />

                </div>

                <h3 className="text-2xl font-bold text-[#0A2E73]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.desc}
                </p>

              </motion.div>

            );
          })}

        </div>

        {/* Bottom Stats */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .3 }}
          className="mt-20 rounded-3xl bg-[#0A2E73] px-10 py-10 text-white"
        >

          <div className="grid gap-8 text-center md:grid-cols-3">

            <div>
              <h3 className="text-4xl font-bold">5000+</h3>
              <p className="mt-2 text-blue-100">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">4+</h3>
              <p className="mt-2 text-blue-100">
                Expert Doctors
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="mt-2 text-blue-100">
                Genuine Products
              </p>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}