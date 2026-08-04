"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  loading: boolean;
}

export default function LoadingScreen({
  loading,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center">

            {/* Logo */}
            <h1 className="text-5xl font-extrabold tracking-tight text-[#0A2E73]">
              R.M OPTICAL
            </h1>

            <p className="mt-2 text-gray-500">
              Premium Eye Care
            </p>

            {/* Loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="mt-10 h-14 w-14 rounded-full border-4 border-blue-100 border-t-[#0A2E73]"
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}