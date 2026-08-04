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
                    className="text-center max-w-2xl mx-auto"
                >

                    <p className="text-[#0A2E73] font-semibold uppercase tracking-wide">
                        Testimonials
                    </p>


                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
                        What Our Customers Say
                    </h2>


                    <p className="mt-4 text-gray-600">
                        Trusted by our customers for quality eyewear and professional eye care services.
                    </p>

                </motion.div>



                {/* Cards */}

                <div className="mt-12 grid md:grid-cols-3 gap-8">


                    {testimonials.map((item, index) => (

                        <motion.div
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