"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { galleryItems } from "@/data/site";
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

const filters = ["All", "Coffee", "Interior", "Food", "Events"];

export default function GalleryPage() {
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
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      <section className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="border-b border-[#231711]/10 pb-6 dark:border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Visual Ambiance
          </span>
          <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white">
            Moments at Musafir
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
            Solitude with a good book, latte art rituals, acoustic nights, and culinary bakes in Baramati.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                active === filter
                  ? "bg-[#C47D3B] text-white shadow-sm"
                  : "bg-white text-[#231711] border border-[#231711]/10 hover:border-[#C47D3B] dark:bg-[#1E1410] dark:text-white dark:border-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              onClick={() => setSelectedIndex(index)}
              className="classic-card group relative h-64 w-full cursor-pointer overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2AC65] block">
                    {item.category}
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev Button */}
          <button
            onClick={() =>
              setSelectedIndex((prev) => (prev !== null ? (prev - 1 + visible.length) % visible.length : 0))
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-[#C47D3B] transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={() =>
              setSelectedIndex((prev) => (prev !== null ? (prev + 1) % visible.length : 0))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-[#C47D3B] transition"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="relative max-w-3xl w-full text-center">
            <div className="relative h-[65vh] w-full overflow-hidden rounded-2xl">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <div className="mt-3">
              <span className="rounded-full bg-[#C47D3B]/20 px-3 py-0.5 text-[11px] font-bold text-[#E2AC65]">
                {selectedItem.category}
              </span>
              <h3 className="font-heading text-lg font-bold text-white mt-1">
                {selectedItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
