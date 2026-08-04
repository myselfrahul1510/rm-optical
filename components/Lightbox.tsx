"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  images: string[];
  index: number | null;
  setIndex: (value: number | null) => void;
}

export default function Lightbox({
  images,
  index,
  setIndex,
}: Props) {
  if (index === null) return null;

  const previous = () =>
    setIndex(index === 0 ? images.length - 1 : index - 1);

  const next = () =>
    setIndex(index === images.length - 1 ? 0 : index + 1);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          onClick={() => setIndex(null)}
          className="absolute right-6 top-6 rounded-full bg-white p-3"
        >
          <X />
        </button>

        <button
          onClick={previous}
          className="absolute left-6 rounded-full bg-white p-3"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={next}
          className="absolute right-6 rounded-full bg-white p-3"
        >
          <ChevronRight />
        </button>

        <motion.div
          key={index}
          initial={{ scale: .9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: .9, opacity: 0 }}
        >
          <Image
            src={images[index]}
            alt=""
            width={1200}
            height={900}
            className="max-h-[85vh] w-auto rounded-3xl object-contain"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}