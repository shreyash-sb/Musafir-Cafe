"use client";

import Image from "next/image";
import { Heart, ShoppingBag, Star, Sparkles, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/Button";

export function ProductCard({ product, onView }: { product: Product; onView?: (product: Product) => void }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isLiked = wishlist.includes(product.id);

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white shadow-xl shadow-primary/5 dark:border-white/10 dark:bg-[#1E110A] transition-all duration-300"
    >
      <div>
        {/* Card Image Area */}
        <div
          onClick={() => onView?.(product)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") onView?.(product);
          }}
          role="button"
          tabIndex={0}
          className="relative block h-64 w-full overflow-hidden text-left cursor-pointer"
          aria-label={`View ${product.name} details`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center pb-4">
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-bold text-primary shadow-lg">
              <Eye className="h-3.5 w-3.5 text-accent" />
              Quick View
            </span>
          </div>

          {/* Top Left Dietary Badges */}
          <div className="absolute left-3.5 top-3.5 flex flex-col gap-1.5">
            {product.dietary?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-[10px] font-bold shadow-md backdrop-blur-md ${
                  tag === "Chef's Special"
                    ? "bg-accent text-primary"
                    : tag === "Bestseller"
                    ? "bg-terracotta text-white"
                    : "bg-black/60 text-white"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Top Right Wishlist Button */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary shadow-md hover:scale-110 active:scale-95 transition dark:bg-black/70 dark:text-white"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-4 w-4 transition ${isLiked ? "fill-terracotta text-terracotta" : "text-primary dark:text-white"}`} />
          </button>
        </div>

        {/* Card Content Area */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent block">
                {product.category}
              </span>
              <h3
                onClick={() => onView?.(product)}
                className="font-heading text-xl font-bold text-primary dark:text-white mt-1 group-hover:text-accent transition cursor-pointer leading-snug"
              >
                {product.name}
              </h3>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded-lg">
              <Star className="h-3.5 w-3.5 fill-current" />
              {product.rating}
            </span>
          </div>

          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-cafe-muted dark:text-white/70">
            {product.description}
          </p>

          {/* Flavor Notes Pill Tags */}
          {product.flavorNotes && product.flavorNotes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.flavorNotes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="rounded-md border border-primary/5 bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-cafe-muted dark:border-white/10 dark:bg-white/5 dark:text-white/60"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Price & Add Button */}
      <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-primary/5 dark:border-white/5 mt-2">
        <div>
          <span className="text-[10px] text-cafe-muted dark:text-white/50 block">Price</span>
          <strong className="text-xl font-bold text-primary dark:text-accent">
            ₹{product.price}
          </strong>
        </div>
        <Button
          onClick={() => addToCart(product)}
          className="min-h-10 px-4 text-xs gap-1.5 shadow-md"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Order
        </Button>
      </div>
    </motion.article>
  );
}
