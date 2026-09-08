"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function GalleryCard({ item, onOpen }: { item: { title: string; image: string; category: string }; onOpen: () => void }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -6 }}
      onClick={onOpen}
      className="group relative min-h-72 overflow-hidden rounded-[1.25rem] text-left shadow-xl shadow-primary/10"
    >
      <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-80" />
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{item.category}</span>
          <h3 className="mt-1 font-heading text-2xl font-bold">{item.title}</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur">
          <Search className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
}
