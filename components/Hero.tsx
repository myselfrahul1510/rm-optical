"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100"
    >
      <div className="container py-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="inline-flex items-center rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]"
            >
              👁 Premium Eye Care Centre
            </motion.span>

            {/* Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="mt-6 text-5xl font-extrabold leading-tight text-[#0A2E73] lg:text-7xl"
            >
              See Better.
              <br />
              Live Better.
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.7,
              }}
              className="mt-8 max-w-xl text-lg leading-8 text-gray-600"
            >
              Discover premium eyewear, branded sunglasses,
              computerised eye testing and expert consultation —
              all under one roof.
            </motion.p>

            {/* Tags */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.6,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <span className="rounded-full bg-white px-4 py-2 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                👓 Premium Frames
              </span>

              <span className="rounded-full bg-white px-4 py-2 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                🕶 Sunglasses
              </span>

              <span className="rounded-full bg-white px-4 py-2 shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                🧿 Contact Lens
              </span>
            </motion.div>

            {/* Buttons */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.6,
              }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/collection"
                className="rounded-full bg-[#0A2E73] px-8 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#08245A] hover:shadow-xl"
              >
                Explore Collection
              </Link>

              <Link
                href="/appointment"
                className="rounded-full border-2 border-[#0A2E73] px-8 py-4 font-semibold text-[#0A2E73] transition duration-300 hover:-translate-y-1 hover:bg-[#0A2E73] hover:text-white hover:shadow-xl"
              >
                Book Eye Test
              </Link>
            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.1,
                duration: 0.6,
              }}
              className="mt-12 flex flex-wrap gap-12"
            >
              <div>
                <h2 className="text-4xl font-bold text-[#0A2E73]">
                  <AnimatedCounter
                    end={150}
                    suffix="+"
                  />
                </h2>

                <p className="mt-1 text-gray-600">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-[#0A2E73]">
                  <AnimatedCounter
                    end={4}
                    suffix="+"
                  />
                </h2>

                <p className="mt-1 text-gray-600">
                  Expert Doctors
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            className="relative"
            initial={{
              opacity: 0,
              x: 60,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.3,
            }}
          >
            {/* Animated Blur */}

            <motion.div
              animate={{
                y: [-20, 20, -20],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
              }}
              className="absolute -left-8 top-10 h-48 w-48 rounded-full bg-blue-200 blur-3xl"
            />

            <motion.div
              animate={{
                y: [20, -20, 20],
              }}
              transition={{
                repeat: Infinity,
                duration: 9,
              }}
              className="absolute -right-8 bottom-10 h-64 w-64 rounded-full bg-blue-100 blur-3xl"
            />

            {/* Floating Image */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-[40px] bg-white p-4 shadow-2xl"
            >
              <Image
                src="/images/hero/hero.jpg"
                alt="R.M Optical"
                width={700}
                height={700}
                priority
                className="rounded-[28px] object-cover transition duration-700 hover:scale-105"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}