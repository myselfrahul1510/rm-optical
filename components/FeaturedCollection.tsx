"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "Ray-Ban Classic",
        brand: "Ray-Ban",
        price: "₹3,999",
        image: "/images/products/frame1.jpg",
    },
    {
        id: 2,
        name: "Titan Premium",
        brand: "Titan Eye+",
        price: "₹2,799",
        image: "/images/products/frame2.jpg",
    },
    {
        id: 3,
        name: "Vincent Chase",
        brand: "Lenskart",
        price: "₹2,499",
        image: "/images/products/frame3.jpg",
    },
    {
        id: 4,
        name: "Oakley Vision",
        brand: "Oakley",
        price: "₹5,499",
        image: "/images/products/frame4.jpg",
    },
];
export default function FeaturedCollection() {
    return (
        <section
            id="collection"
            className="bg-white py-24"
        >
            <div className="container">
                {/* Heading */}

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
                        FEATURED COLLECTION
                    </span>


                    <h2 className="mt-6 text-5xl font-bold text-[#0A2E73]">
                        Premium Eyewear Collection
                    </h2>


                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
                        Discover our handpicked collection of premium frames and sunglasses.
                    </p>
                </motion.div>
                {/* Product Cards */}
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                    {products.map((item, index) => (
                        <motion.div
                            key={item.id}
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
                            className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
                        >

                            <div className="relative overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={500}
                                    height={500}
                                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <motion.button
                                    whileHover={{
                                        scale: 1.15,
                                    }}
                                    className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-md"
                                >
                                    <Heart size={18} />
                                </motion.button>
                                <span className="absolute left-4 top-4 rounded-full bg-[#0A2E73] px-3 py-1 text-xs font-semibold text-white">
                                    NEW
                                </span>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-500">
                                    {item.brand}
                                </p>
                                <h3 className="mt-2 text-xl font-bold text-[#0A2E73]">
                                    {item.name}
                                </h3>
                                <div className="mt-3 flex items-center gap-1 text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={18}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-[#0A2E73]">
                                        {item.price}
                                    </span>
                                    <Link
                                        href="/collection"
                                        className="rounded-full bg-[#0A2E73] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#08245A]"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}