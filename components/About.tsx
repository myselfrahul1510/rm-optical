"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Phone,
  Award,
  Users,
  Star,
  Eye,
} from "lucide-react";

const features = [
  "Computerised Eye Testing",
  "Premium Optical Frames",
  "Branded Sunglasses",
  "Contact Lens Solutions",
  "Experienced Eye Specialists",
  "100% Genuine Products",
];

const stats = [
  {
    icon: Users,
    value: "250+",
    label: "Happy Customers",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Google Rating",
  },
  {
    icon: Award,
    value: "100%",
    label: "Genuine Products",
  },
  {
    icon: Eye,
    value: "4",
    label: "Expert Doctors",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-slate-50 py-24"
    >
      <div className="container">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
            className="relative"
          >

            <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-blue-200 blur-3xl"></div>

            <div className="absolute -bottom-6 -right-6 h-52 w-52 rounded-full bg-blue-100 blur-3xl"></div>

            <div className="relative w-full h-[460px] overflow-hidden rounded-[36px] shadow-2xl bg-gray-100">
              <Image
                src="/images/about/store.jpg"
                alt="R.M Optical"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >

            <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]"
            >
              ABOUT R.M OPTICAL
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight text-[#0A2E73]">
              Your Vision,
              <br />
              Our Commitment
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              R.M OPTICAL is committed to delivering premium eye care,
              computerised eye testing and branded eyewear with complete
              customer satisfaction. Our experienced professionals help you
              choose the perfect vision solution for everyday life.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {features.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
                >

                  <CheckCircle2
                    size={22}
                    className="text-green-600"
                  />

                  <span className="font-medium text-gray-700">
                    {item}
                  </span>

                </div>

              ))}

            </div>

            <div className="mt-12 grid grid-cols-2 gap-5">

              {stats.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    style={{ marginTop: "1rem" }}
                    key={item.label}
                    className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-2"
                  >

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-[#0A2E73]">

                      <Icon size={28} />

                    </div>

                    <h3 className="mt-4 text-3xl font-bold text-[#0A2E73]">
                      {item.value}
                    </h3>

                    <p className="mt-1 text-gray-500">
                      {item.label}
                    </p>

                  </div>
                );
              })}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}