"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Star, Sparkles, Heart, Filter, Coffee, Clock, ShieldCheck, Flame } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { categories, DietaryTag, Product, products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const DIETARY_FILTERS: { label: string; value: DietaryTag | "All" }[] = [
  { label: "All Items", value: "All" },
  { label: "Bestseller", value: "Bestseller" },
  { label: "Chef's Special", value: "Chef's Special" },
  { label: "Vegan Friendly", value: "Vegan" },
  { label: "100% Organic", value: "Organic" }
];

export function MenuClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeDietary, setActiveDietary] = useState<DietaryTag | "All">("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [query, setQuery] = useState(initialQuery);
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(initialFilter === "wishlist");
  const [selected, setSelected] = useState<Product | null>(null);

  const { addToCart, wishlist } = useCart();

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
        // Category filter
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;

        // Dietary filter
        const matchesDietary =
          activeDietary === "All" || (product.dietary && product.dietary.includes(activeDietary));

        // Wishlist filter
        const matchesWishlist = !showOnlyWishlist || wishlist.includes(product.id);

        // Search Query filter
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
    <main className="min-h-screen bg-cafe-bg px-6 pb-24 pt-32 dark:bg-[#150B07] transition-colors duration-300">
      <section className="mx-auto max-w-7xl">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/10 dark:border-white/10 pb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Artisan Menu
            </span>
            <h1 className="mt-2 font-heading text-4xl sm:text-6xl font-bold text-primary dark:text-white">
              The Musafir Catalog
            </h1>
            <p className="mt-2 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-xl">
              100% vegetarian single-origin brews, slow-steamed zafrani chais, fresh sourdoughs, and artisan bakery.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cafe-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, flavor, or spice..."
              className="h-12 w-full rounded-full border border-primary/15 bg-white/90 pl-11 pr-5 text-xs sm:text-sm outline-none focus:border-accent shadow-sm dark:border-white/10 dark:bg-[#1E110A] dark:text-white"
            />
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition duration-300 ${
                activeCategory === category
                  ? "bg-accent text-primary shadow-lg shadow-accent/20 glow-gold-sm"
                  : "bg-white text-primary border border-primary/10 hover:border-accent hover:bg-accent/10 dark:bg-[#1E110A] dark:text-white dark:border-white/10 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sub-Filters: Dietary, Wishlist, and Sorting */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/5 bg-white/70 p-4 backdrop-blur dark:border-white/10 dark:bg-[#1E110A]/60">
          {/* Dietary Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-cafe-muted dark:text-white/50 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Dietary:
            </span>
            {DIETARY_FILTERS.map((d) => (
              <button
                key={d.value}
                onClick={() => setActiveDietary(d.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeDietary === d.value
                    ? "bg-primary text-white dark:bg-white dark:text-primary"
                    : "bg-primary/5 text-primary/70 hover:bg-primary/10 dark:bg-white/5 dark:text-white/70"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Right Side: Wishlist Toggle & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowOnlyWishlist((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition border ${
                showOnlyWishlist
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-primary/10 bg-white text-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${showOnlyWishlist ? "fill-white" : ""}`} />
              Favorites ({wishlist.length})
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-primary/10 bg-white px-4 py-1.5 text-xs font-bold text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-[#25150D] dark:text-white"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-8 flex items-center justify-between text-xs font-bold text-cafe-muted dark:text-white/60">
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-accent" />
            Showing {filtered.length} {filtered.length === 1 ? "creation" : "creations"}
          </span>
          {(activeCategory !== "All" || activeDietary !== "All" || query || showOnlyWishlist) && (
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveDietary("All");
                setQuery("");
                setShowOnlyWishlist(false);
              }}
              className="text-accent hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-primary/10 bg-white p-16 text-center shadow-lg dark:border-white/10 dark:bg-[#1E110A]">
            <Coffee className="h-12 w-12 text-accent mx-auto mb-3 opacity-60" />
            <h3 className="font-heading text-2xl font-bold text-primary dark:text-white">
              No matching creations found
            </h3>
            <p className="mt-2 text-xs text-cafe-muted dark:text-white/70 max-w-sm mx-auto">
              Try adjusting your search terms or dietary filters to explore our other roasts and delicacies.
            </p>
            <Button
              onClick={() => {
                setActiveCategory("All");
                setActiveDietary("All");
                setQuery("");
                setShowOnlyWishlist(false);
              }}
              className="mt-6"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onView={setSelected} />
            ))}
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)}>
        {selected && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative min-h-80 md:min-h-96 overflow-hidden rounded-[1.75rem]">
              <Image src={selected.image} alt={selected.name} fill sizes="50vw" className="object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                {selected.dietary?.map((d) => (
                  <span key={d} className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary shadow">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between p-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  {selected.category}
                </span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-primary dark:text-white">
                  {selected.name}
                </h2>
                <div className="mt-2 flex items-center gap-2 font-bold text-accent">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{selected.rating} Rating</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cafe-muted dark:text-white/70">
                  {selected.description}
                </p>

                {selected.flavorNotes && (
                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase text-accent tracking-widest block mb-1.5">
                      Flavor Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.flavorNotes.map((n) => (
                        <span key={n} className="rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs text-accent">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-cafe-muted dark:text-white/70 border-y border-primary/10 dark:border-white/10 py-3">
                  <div>
                    <span className="block text-white/50 text-[10px]">Origin</span>
                    <strong className="text-primary dark:text-white line-clamp-1">{selected.origin}</strong>
                  </div>
                  <div>
                    <span className="block text-white/50 text-[10px]">Prep Time</span>
                    <strong className="text-primary dark:text-white">{selected.prepTime}</strong>
                  </div>
                  <div>
                    <span className="block text-white/50 text-[10px]">Energy</span>
                    <strong className="text-primary dark:text-white">{selected.calories}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-cafe-muted dark:text-white/50 block">Price</span>
                  <strong className="font-heading text-3xl font-bold text-primary dark:text-accent">
                    ₹{selected.price}
                  </strong>
                </div>
                <Button
                  onClick={() => {
                    addToCart(selected);
                    setSelected(null);
                  }}
                  className="min-h-12 px-8"
                >
                  Add to Order
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
