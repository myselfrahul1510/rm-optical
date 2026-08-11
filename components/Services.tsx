"use client";

import {
  Eye,
  Glasses,
  ShieldCheck,
  Sun,
  ScanEye,
  Stethoscope,
} from "lucide-react";

import { motion } from "framer-motion";

const services = [
  {
    icon: Eye,
    title: "Computerised Eye Testing",
    description:
      "Accurate digital eye examination using modern technology.",
  },
  {
    icon: Glasses,
    title: "Premium Optical Frames",
    description:
      "Stylish frames from premium brands for every age.",
  },
  {
    icon: Sun,
    title: "Branded Sunglasses",
    description:
      "UV protected fashionable sunglasses from trusted brands.",
  },
  {
    icon: ScanEye,
    title: "Contact Lens",
    description:
      "Soft, disposable & premium contact lenses available.",
  },
  {
    icon: ShieldCheck,
    title: "Lens Fitting",
    description:
      "High quality single vision, bifocal & progressive lenses.",
  },
  {
    icon: Stethoscope,
    title: "Doctor Consultation",
    description:
      "Consult experienced ophthalmologists & optometrists.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-slate-50 py-20"
    >

      <div className="container">


        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative left-1/2 mb-12 w-[95%] max-w-3xl -translate-x-1/2 text-center"
        >
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
            OUR SERVICES
          </span>


          <h2 className="mt-6 text-5xl font-bold text-[#0A2E73]">
            Everything Your Eyes Need
          </h2>

          <div className="flex w-full justify-center">
            <p className="mt-4 w-full max-w-2xl text-center text-base leading-7 text-gray-600 md:text-lg">
              From eye testing to premium eyewear, we provide
            complete eye care under one roof.
            </p>
          </div>
        </motion.div>



        {/* Service Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >


          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <motion.div
              style={{padding:"1rem"}}
                key={service.title}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl"
              >

                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-[#0A2E73] transition group-hover:bg-[#0A2E73] group-hover:text-white"
                >

                  <Icon size={32} />

                </motion.div>


                <h3 className="mb-4 text-2xl font-bold text-[#0A2E73]">
                  {service.title}
                </h3>


                <p className="leading-7 text-gray-600">
                  {service.description}
                </p>


              </motion.div>

            );

          })}


        </div>


      </div>

    </section>
  );
}