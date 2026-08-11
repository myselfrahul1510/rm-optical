"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // যুক্ত করা হয়েছে
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/constants/site";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const pathname = usePathname(); // বর্তমান পেজের URL পাওয়ার জন্য

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // যদি URL '/admin' দিয়ে শুরু হয়, তাহলে বাটনগুলো হাইড করে দেবে
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Call */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        href={`tel:${SITE.phone}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl"
      >
        <Phone size={24} />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        href={`https://wa.me/${SITE.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl"
      >
        <MessageCircle size={24} />
      </motion.a>

      {/* Scroll To Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0A2E73] text-white shadow-xl"
            style={{backgroundColor:"rgb(35, 245, 217)"}}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}