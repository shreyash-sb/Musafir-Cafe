"use client";

import Image from "next/image";
import { Heart, Plus, Star, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({
  product,
  onView
}: {
  product: Product;
  onView?: (product: Product) => void;
}) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isLiked = wishlist.includes(product.id);

  return (
    <article className="classic-card group relative flex flex-col justify-between overflow-hidden rounded-2xl">
      <div>
        {/* Card Image Area */}
        <div
          onClick={() => onView?.(product)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onView?.(product);
          }}
          role="button"
          tabIndex={0}
          className="relative block h-56 w-full overflow-hidden bg-[#EFE9E1] text-left cursor-pointer dark:bg-[#2A1D17]"
          aria-label={`View ${product.name} details`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Quick View Hover Hint */}
          <div className="absolute inset-0 bg-black/25 opacity-0 transition duration-200 group-hover:opacity-100 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-[#231711] shadow">
              <Eye className="h-3.5 w-3.5 text-[#C47D3B]" /> Quick View
            </span>
          </div>

          {/* Top Left Dietary Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 pointer-events-none">
            {product.dietary?.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#231711]/85 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-white tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Top Right Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#231711] shadow-sm hover:scale-110 active:scale-95 transition dark:bg-[#1E1410]/90 dark:text-white"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-4 w-4 transition ${
                isLiked ? "fill-[#C86041] text-[#C86041]" : "text-[#231711]/70 dark:text-white/70"
              }`}
            />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 text-xs text-[#C47D3B] font-semibold">
            <span className="uppercase tracking-wider text-[10px]">{product.category}</span>
            <span className="inline-flex items-center gap-1 font-bold">
              <Star className="h-3.5 w-3.5 fill-current" />
              {product.rating}
            </span>
          </div>

          <h3
            onClick={() => onView?.(product)}
            className="mt-1 font-heading text-lg font-bold text-[#231711] dark:text-[#F7F2EC] group-hover:text-[#C47D3B] transition cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
            {product.description}
          </p>

          {/* Flavor Notes */}
          {product.flavorNotes && product.flavorNotes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.flavorNotes.slice(0, 2).map((note) => (
                <span
                  key={note}
                  className="rounded-md bg-[#231711]/5 px-2 py-0.5 text-[10px] text-[#6B5B52] dark:bg-white/5 dark:text-[#B8ABA0]"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price & Add to Order */}
      <div className="flex items-center justify-between border-t border-[#231711]/5 px-4 sm:px-5 py-3.5 dark:border-white/5">
        <div>
          <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block leading-none">Price</span>
          <strong className="text-base sm:text-lg font-bold text-[#231711] dark:text-[#F7F2EC]">
            ₹{product.price}
          </strong>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#C47D3B] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#B36E2E] active:scale-95 transition"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </article>
  );
}
