"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

import { SITE } from "@/constants/site";

export default function Appointment() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-[#0A2E73] via-[#123C8C] to-[#0A2E73] py-24 text-white"
    >
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
              BOOK YOUR APPOINTMENT
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Ready For Better Vision?
            </h2>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Get professional computerised eye testing, premium eyewear and
              expert consultation at {SITE.name}.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 p-3">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Call Us</p>
                  <p className="text-lg font-semibold">+91 62964 57668</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 p-3">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Visit Us</p>
                  <p className="font-semibold">Ukilnara, Choumatha, Jogpur Road ,Nadia, 741247</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 p-3">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Opening Hours</p>
                  <p className="font-semibold"> 8.30A.M - 1.30P.M & 5.30A.M - 9.30A.M </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            style={{padding:"1rem"}}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] bg-white p-10 text-gray-900 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-[#0A2E73]">
              Why Book With Us?
            </h3>

            {/* FIXED: The mapping is now properly nested inside the space-y-5 div container */}
            <div className="mt-8 space-y-5">
              {[
                "Computerised Eye Testing",
                "Premium Optical Frames",
                "Branded Sunglasses",
                "Contact Lens Solutions",
                "Experienced Doctors",
                "100% Genuine Products",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-600" size={22} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* FIXED: Removed the empty duplicate div block and merged the content correctly */}
            <div className="mt-10 rounded-2xl bg-blue-50 p-6">
              <h4 className="text-xl font-bold text-[#0A2E73]">
                ⭐ {SITE.totalCustomers} Happy Customers
              </h4>

              <p className="mt-2 text-gray-600">
                Trusted by families for quality eyewear and professional eye
                care services.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-[#0A2E73]">
                    {SITE.googleRating} ★
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Google Rating</p>
                </div>

                <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <p className="text-2xl font-bold text-[#0A2E73]">
                    {SITE.totalCustomers}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Happy Customers
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}