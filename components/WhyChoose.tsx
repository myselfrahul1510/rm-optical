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
    <section className="bg-white py-16 md:py-20">

      <div className="container">

        {/* Heading */}


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative left-1/2 mb-12 w-[95%] max-w-3xl -translate-x-1/2 text-center"
        >
          {/* Badge */}
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
            WHY CHOOSE US
          </span>

          {/* Heading */}
          <h2 className="mt-5 text-center text-4xl font-bold leading-tight text-[#0A2E73] md:text-5xl">
            Why Choose R.M OPTICAL?
          </h2>

          {/* Description */}
          <div className="flex w-full justify-center">
            <p className="mt-4 w-full max-w-2xl text-center text-base leading-7 text-gray-600 md:text-lg">
              Premium eye care, trusted professionals and high-quality eyewear —
              everything you need under one roof.
            </p>
          </div>
        </motion.div>




        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {items.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                style={{ padding: "10px" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-2xl"
              >

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0A2E73] to-blue-500 text-white transition group-hover:scale-110">

                  <Icon size={30} />

                </div>


                <h3 className="text-xl font-bold text-[#0A2E73] md:text-2xl">
                  {item.title}
                </h3>


                <p className="mt-3 leading-7 text-gray-600">
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
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-3xl bg-[#0A2E73] px-6 py-8 text-white md:px-10"
        >

          <div className="grid gap-8 text-center md:grid-cols-3"
            style={{ marginTop: "1rem" }}>


            <div>
              <h3 className="text-4xl font-bold">
                150+
              </h3>

              <p className="mt-2 text-blue-100">
                Happy Customers
              </p>
            </div>



            <div>
              <h3 className="text-4xl font-bold">
                4+
              </h3>

              <p className="mt-2 text-blue-100">
                Expert Doctors
              </p>
            </div>



            <div>
              <h3 className="text-4xl font-bold">
                100%
              </h3>

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