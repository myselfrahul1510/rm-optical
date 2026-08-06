"use client";

import CountUp from "react-countup";
import { Users, Glasses, Award, Eye } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    number: 150,
    suffix: "+",
    title: "Happy Customers",
  },
  {
    icon: Glasses,
    number: 100,
    suffix: "+",
    title: "Frames Sold",
  },
  {
    icon: Eye,
    number: 150,
    suffix: "+",
    title: "Eye Tests",
  },
  {
    icon: Award,
    number: 1,
    suffix: "+",
    title: "Years Experience",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#0A2E73] py-20 text-white">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .5,
                  delay: index * .15,
                }}
                className="rounded-3xl bg-white/10 p-8 text-center backdrop-blur"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <Icon size={30} />
                </div>

                <h3 className="text-5xl font-bold">
                  <CountUp
                    end={item.number}
                    duration={2}
                  />
                  {item.suffix}
                </h3>

                <p className="mt-3 text-blue-100">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}