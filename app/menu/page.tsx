"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Search, Heart, Filter, Star, Sparkles, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Modal } from "@/components/Modal";
import { categories, DietaryTag, Product, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

const DIETARY_FILTERS: { label: string; value: DietaryTag | "All" }[] = [
  { label: "All Items", value: "All" },
  { label: "Bestseller", value: "Bestseller" },
  { label: "Chef's Special", value: "Chef's Special" },
  { label: "Vegan", value: "Vegan" },
  { label: "Organic", value: "Organic" }
];

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeDietary, setActiveDietary] = useState<DietaryTag | "All">("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [query, setQuery] = useState(initialQuery);
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(initialFilter === "wishlist");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addToCart, wishlist } = useCart();
  const { notify } = useToast();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
    const q = searchParams.get("q");
    if (q) setQuery(q);
    if (searchParams.get("filter") === "wishlist") setShowOnlyWishlist(true);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesDietary =
          activeDietary === "All" || (product.dietary && product.dietary.includes(activeDietary));
        const matchesWishlist = !showOnlyWishlist || wishlist.includes(product.id);
        const term = query.toLowerCase().trim();
        const matchesQuery =
          !term ||
          `${product.name} ${product.description} ${product.category} ${product.flavorNotes.join(" ")} ${product.origin}`
            .toLowerCase()
            .includes(term);

        return matchesCategory && matchesDietary && matchesWishlist && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      });
  }, [activeCategory, activeDietary, showOnlyWishlist, query, sortBy, wishlist]);

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      <section className="mx-auto max-w-6xl">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#231711]/10 pb-8 dark:border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
              100% Pure Vegetarian
            </span>
            <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white">
              The Artisan Menu
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
              Single-origin coffees, slow-steamed zafrani chais, fresh sourdoughs, and handcrafted bakery creations.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B5B52]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coffee, tea, sourdough..."
              className="h-11 w-full rounded-full border border-[#231711]/10 bg-white pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-[#C47D3B] shadow-sm dark:border-white/10 dark:bg-[#1E1410] dark:text-white"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                activeCategory === category
                  ? "bg-[#C47D3B] text-white shadow-sm"
                  : "bg-white text-[#231711] border border-[#231711]/10 hover:border-[#C47D3B] dark:bg-[#1E1410] dark:text-white dark:border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Dietary, Favorites & Sorting */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#231711]/5 bg-white/70 p-3.5 dark:border-white/10 dark:bg-[#1E1410]/70">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#6B5B52] dark:text-[#B8ABA0] mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3 text-[#C47D3B]" /> Tag:
            </span>
            {DIETARY_FILTERS.map((d) => (
              <button
                key={d.value}
                onClick={() => setActiveDietary(d.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  activeDietary === d.value
                    ? "bg-[#231711] text-white dark:bg-white dark:text-[#231711]"
                    : "bg-[#231711]/5 text-[#6B5B52] hover:bg-[#231711]/10 dark:bg-white/5 dark:text-[#B8ABA0]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowOnlyWishlist((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold transition border ${
                showOnlyWishlist
                  ? "border-[#C86041] bg-[#C86041] text-white"
                  : "border-[#231711]/10 bg-white text-[#6B5B52] hover:border-[#C86041] dark:bg-white/5 dark:text-[#B8ABA0]"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${showOnlyWishlist ? "fill-white" : ""}`} />
              Favorites ({wishlist.length})
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-[#231711]/10 bg-white px-3 py-1 text-xs text-[#231711] outline-none dark:border-white/10 dark:bg-[#1E1410] dark:text-white"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-sm font-semibold text-[#6B5B52] dark:text-[#B8ABA0]">
                No items match your search or filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveDietary("All");
                  setQuery("");
                  setShowOnlyWishlist(false);
                }}
                className="rounded-full bg-[#C47D3B] px-5 py-2 text-xs font-bold text-white shadow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick View Product Modal */}
      <Modal open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div className="grid gap-6 sm:grid-cols-2 items-center">
            <div className="relative min-h-64 sm:min-h-80 w-full overflow-hidden rounded-2xl bg-[#EFE9E1]">
              <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C47D3B]">
                {selectedProduct.category}
              </span>
              <h2 className="font-heading text-2xl font-bold text-[#231711] dark:text-white">
                {selectedProduct.name}
              </h2>
              <p className="text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
                {selectedProduct.description}
              </p>

              {selectedProduct.flavorNotes && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedProduct.flavorNotes.map((n) => (
                    <span
                      key={n}
                      className="rounded-md bg-[#231711]/5 px-2 py-0.5 text-[10px] font-medium text-[#6B5B52] dark:bg-white/5 dark:text-[#B8ABA0]"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#231711]/10 dark:border-white/10">
                <div>
                  <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Origin</span>
                  <strong className="text-[#231711] dark:text-white">{selectedProduct.origin}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Prep Time</span>
                  <strong className="text-[#231711] dark:text-white">{selectedProduct.prepTime}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Price</span>
                  <strong className="font-heading text-2xl font-bold text-[#231711] dark:text-white">
                    ₹{selectedProduct.price}
                  </strong>
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    notify(`Added ${selectedProduct.name} to your order!`);
                  }}
                  className="rounded-full bg-[#C47D3B] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] pt-32 text-center text-xs">Loading Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
