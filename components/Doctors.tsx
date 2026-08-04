"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Susmita Mukhopadhyay",
    degree: "M.B.B.S (Kol.), DOMS (Kol.)",
    speciality: "Eye Surgeon | Phaco & Micro Surgery Specialist",
    image: "/images/doctors/doctor1.jpg",
  },
  {
    name: "Sneha Debnath",
    degree: "B.OPTM (KOL), FCLI (KOL)",
    speciality: "Consultant Optometrist",
    image: "/images/doctors/doctor2.jpg",
  },
  {
    name: "Abhijit Pramanick",
    degree: "D. OPT (K.U), I.C.L.E.P.",
    speciality: "Optometrist & Contact Lens Specialist",
    image: "/images/doctors/doctor3.jpg",
  },
  {
    name: "Sujan Biswas",
    degree: "D.OPT (Govt. WB SMF, Kol), BIAMS (Kol)",
    speciality: "Eye Consultant (Optometrist)",
    image: "/images/doctors/doctor4.jpg",
  },
];

export default function Doctors() {
  return (
    <section
      id="doctors"
      className="bg-slate-50 py-24"
    >

      <div className="container">


        {/* Heading Animation */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-16 text-center"
        >

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
            CONSULTING DOCTORS
          </span>


          <h2 className="mt-6 text-5xl font-bold text-[#0A2E73]">
            Meet Our Experts
          </h2>


          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Experienced eye specialists committed to providing quality eye care.
          </p>

        </motion.div>



        {/* Doctor Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {doctors.map((doctor, index) => (

            <motion.div
              key={doctor.name}
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
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
              }}
              className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:shadow-xl"
            >

              <Image
                src={doctor.image}
                alt={doctor.name}
                width={400}
                height={450}
                className="h-80 w-full object-cover"
              />


              <div className="p-6">

                <h3 className="text-xl font-bold text-[#0A2E73]">
                  {doctor.name}
                </h3>


                <p className="mt-2 text-sm font-medium text-gray-500">
                  {doctor.degree}
                </p>


                <p className="mt-4 text-gray-600">
                  {doctor.speciality}
                </p>


                <div className="mt-6 rounded-xl bg-blue-50 p-3 text-center text-sm font-semibold text-[#0A2E73]">
                  Available at R.M OPTICAL
                </div>


              </div>

            </motion.div>

          ))}

        </div>


      </div>

    </section>
  );
}