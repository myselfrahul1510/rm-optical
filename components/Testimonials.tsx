"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Amit Das",
        review:
            "Excellent service and very professional eye testing. The staff helped me choose the perfect frame.",
    },
    {
        name: "Priya Sharma",
        review:
            "Great collection of spectacles with premium quality lenses. Highly recommended.",
    },
    {
        name: "Sourav Roy",
        review:
            "The computerized eye testing experience was amazing. Very satisfied with my new glasses.",
    },
];

export default function Testimonials() {
    return (
        <section
            id="testimonials"
            className="bg-gray-50 py-20"
        >

            <div className="container mx-auto px-6">


                {/* Heading Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative left-1/2 mb-12 w-[95%] max-w-3xl -translate-x-1/2 text-center"
                >
                    {/* Badge */}
                    <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-[#0A2E73]">
                        Testimonials
                    </span>

                    {/* Heading */}
                    <h2 className="mt-5 text-center text-4xl font-bold leading-tight text-[#0A2E73] md:text-5xl">
                        What Our Customers Say
                    </h2>

                    {/* Description */}
                    <div className="flex w-full justify-center">
                        <p className="mt-4 w-full max-w-2xl text-center text-base leading-7 text-gray-600 md:text-lg">
                            Trusted by our customers for quality eyewear and professional eye care services.
                        </p>
                    </div>
                </motion.div>




                {/* Cards */}

                <div className="mt-12 grid md:grid-cols-3 gap-8"
               >


                    {testimonials.map((item, index) => (

                        <motion.div
                         style={{padding:"10px"}}
                            key={index}
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2,
                            }}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
                        >


                            {/* Stars */}

                            <div className="flex gap-1 mb-5">

                                {[1, 2, 3, 4, 5].map((star) => (

                                    <Star
                                        key={star}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                ))}

                            </div>



                            <p className="text-gray-600 leading-relaxed">
                                "{item.review}"
                            </p>



                            <div className="mt-6">

                                <h3 className="font-bold text-gray-900">
                                    {item.name}
                                </h3>


                                <p className="text-sm text-[#0A2E73]">
                                    Customer
                                </p>

                            </div>


                        </motion.div>

                    ))}


                </div>


            </div>


        </section>
    );
}