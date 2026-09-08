"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type CategoryCardProps = {
  title: string;
  tagline?: string;
  description: string;
  image: string;
  itemCount?: string;
};

export function CategoryCard({ title, tagline, description, image, itemCount }: CategoryCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[2rem] border border-primary/10 bg-[#1E110A] shadow-xl shadow-primary/5 dark:border-white/10"
    >
      <Link href={`/menu?category=${encodeURIComponent(title)}`} className="block">
        <div className="relative min-h-[340px] w-full overflow-hidden p-6 flex flex-col justify-between">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20 group-hover:via-black/55 transition duration-300" />

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            {itemCount ? (
              <span className="rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-accent border border-accent/20">
                {itemCount}
              </span>
            ) : (
              <span />
            )}
            <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md text-white group-hover:bg-accent group-hover:text-primary transition duration-300">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>

          {/* Bottom Details */}
          <div className="relative z-10">
            {tagline && (
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-1">
                {tagline}
              </span>
            )}
            <h3 className="font-heading text-2xl font-bold text-white group-hover:text-accent transition duration-300">
              {title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/70 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
