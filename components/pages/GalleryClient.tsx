"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { GalleryCard } from "@/components/GalleryCard";
import { Modal } from "@/components/Modal";
import { galleryItems } from "@/data/site";
import { Sparkles, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const filters = ["All", "Coffee", "Interior", "Food", "Events"];

export function GalleryClient() {
  const [active, setActive] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => galleryItems.filter((item) => active === "All" || item.category === active),
    [active]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % visible.length : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + visible.length) % visible.length : 0));
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, visible.length]);

  const selectedItem = selectedIndex !== null ? visible[selectedIndex] : null;

  return (
    <main className="min-h-screen bg-cafe-bg px-6 pb-24 pt-32 dark:bg-[#150B07] transition-colors duration-300">
      <section className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/10 dark:border-white/10 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Visual Moodboard
            </span>
            <h1 className="mt-2 font-heading text-4xl sm:text-6xl font-bold text-primary dark:text-white">
              The Musafir Gallery
            </h1>
            <p className="mt-2 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-xl">
              Moments of solitude, acoustic nights, latte art rituals, and culinary creations captured in Baramati.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 ${
                active === filter
                  ? "bg-accent text-primary shadow-lg shadow-accent/20 glow-gold-sm"
                  : "bg-white text-primary border border-primary/10 hover:border-accent hover:bg-accent/10 dark:bg-[#1E110A] dark:text-white dark:border-white/10 dark:hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry Columns */}
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {visible.map((item, index) => (
            <div key={`${item.title}-${index}`} className="mb-6 break-inside-avoid">
              <GalleryCard item={item} onOpen={() => setSelectedIndex(index)} />
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Lightbox Modal with Next / Prev */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/90 backdrop-blur-xl">
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Button */}
            <button
              onClick={() => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + visible.length) % visible.length : 0))}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-primary transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % visible.length : 0))}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-primary transition"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={selectedItem.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full text-center"
            >
              <div className="relative h-[65vh] w-full overflow-hidden rounded-3xl border border-white/15">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                  {selectedItem.category}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mt-2">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
