"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Heart, Filter, Sparkles } from "lucide-react";
import { ProductCard, ProductQuickViewModal, Modal } from "@/components/ui";
import { categories, DietaryTag, Product, products } from "@/lib/site";
import { useCart, useToast } from "@/context/AppContext";

const DIETARY_FILTERS: { label: string; value: DietaryTag | "All" }[] = [
  { label: "All Items", value: "All" },
  { label: "Bestseller", value: "Bestseller" },
  { label: "Chef's Special", value: "Chef's Special" },
  { label: "Vegan", value: "Vegan" },
  { label: "Organic", value: "Organic" }
];

/* ==========================================================================
   Musafir Brew Lab Presets
   ========================================================================== */
const BREW_BASES = [
  { id: "v60", name: "Chikmagalur V60 Pour-Over", basePrice: 189, notes: "Fruity, bright, floral acidity", icon: "☕" },
  { id: "espresso", name: "Karwa Double Espresso", basePrice: 159, notes: "Dark chocolate, roasted hazelnut", icon: "🍫" },
  { id: "coldbrew", name: "Himalayan Oak Cold Drip", basePrice: 229, notes: "20-hour steep, velvety, low-acid", icon: "🧊" },
  { id: "zafranichai", name: "Royal Zafrani Chai Base", basePrice: 149, notes: "Slow-simmered whole spices & saffron", icon: "🫖" }
];

const MILK_OPTIONS = [
  { id: "oat", name: "Micro-Foam Oat Milk", price: 35 },
  { id: "almond", name: "Roasted Almond Milk", price: 40 },
  { id: "dairy", name: "Organic Farm Full Cream", price: 0 },
  { id: "saffron_cream", name: "Golden Saffron Velvet Cream", price: 50 },
  { id: "black", name: "Black / No Milk (Pure Terroir)", price: 0 }
];

const SPICE_OPTIONS = [
  { id: "none", name: "Pure Unadulterated Roast", price: 0 },
  { id: "saffron", name: "Pampore Saffron Strands", price: 45 },
  { id: "cardamom_cinnamon", name: "Crushed Green Cardamom & Cinnamon", price: 25 },
  { id: "vanilla_honey", name: "Madagascar Vanilla & Raw Forest Honey", price: 35 }
];

const TEMP_OPTIONS = [
  { id: "hot", name: "Piping Hot (65°C)", icon: "🔥" },
  { id: "iced", name: "Over Crystal Ice", icon: "❄️" },
  { id: "nitro", name: "Nitrogen Draft Foam", icon: "✨" }
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

  // Brew Lab Modal State
  const [brewLabOpen, setBrewLabOpen] = useState(false);
  const [selectedBase, setSelectedBase] = useState(BREW_BASES[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILK_OPTIONS[0]);
  const [selectedSpice, setSelectedSpice] = useState(SPICE_OPTIONS[1]);
  const [selectedTemp, setSelectedTemp] = useState(TEMP_OPTIONS[0]);

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

  const labCustomPrice = useMemo(() => {
    return selectedBase.basePrice + selectedMilk.price + selectedSpice.price;
  }, [selectedBase, selectedMilk, selectedSpice]);

  const handleAddCustomBrew = () => {
    const customProduct: Product = {
      id: `custom-brew-${Date.now()}`,
      name: `Musafir Custom: ${selectedBase.name}`,
      category: "Signature Blends",
      description: `${selectedTemp.name} with ${selectedMilk.name} and ${selectedSpice.name}.`,
      price: labCustomPrice,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
      featured: false,
      dietary: ["Chef's Special", "Veg"],
      flavorNotes: [selectedBase.notes, selectedSpice.name],
      prepTime: "5-8 mins",
      calories: "95-140 kcal",
      origin: "Musafir Brew Lab, Baramati"
    };

    addToCart(
      customProduct,
      1,
      `${selectedTemp.name} | ${selectedMilk.name} | ${selectedSpice.name}`
    );
    setBrewLabOpen(false);
    notify(`Crafted and added your bespoke ${selectedBase.name} to order!`);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      <section className="mx-auto max-w-6xl">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#231711]/10 pb-8 dark:border-white/10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
              100% Pure Vegetarian Kitchen
            </span>
            <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white">
              The Artisan Menu
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
              Single-origin coffees, slow-steamed zafrani chais, fresh sourdoughs, and handcrafted bakery creations in Baramati.
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

        {/* Interactive Musafir Brew Lab Banner */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#231711] via-[#2F1D16] to-[#3A251C] p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#C47D3B] text-white shrink-0 mt-0.5">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="rounded-full bg-[#C47D3B]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#E2AC65] uppercase tracking-wider">
                Bespoke Beverage Craft
              </span>
              <h2 className="font-heading text-lg sm:text-xl font-bold mt-1">
                The Musafir Brew Lab
              </h2>
              <p className="text-xs text-white/75 mt-0.5 max-w-xl">
                Personalize roast origin, plant-based or farm milk, crushed spice aromatics, and temperature to your exact palate.
              </p>
            </div>
          </div>

          <button
            onClick={() => setBrewLabOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C47D3B] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition self-start sm:self-auto cursor-pointer"
          >
            Launch Brew Lab →
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowOnlyWishlist(false);
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                activeCategory === category && !showOnlyWishlist
                  ? "bg-[#231711] text-white dark:bg-white dark:text-[#231711] shadow-sm"
                  : "bg-white text-[#231711] border border-[#231711]/10 hover:border-[#C47D3B] dark:bg-[#1E1410] dark:text-white dark:border-white/10"
              }`}
            >
              {category}
            </button>
          ))}

          <button
            onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer ${
              showOnlyWishlist
                ? "bg-[#C86041] text-white shadow-sm"
                : "bg-white text-[#231711] border border-[#231711]/10 hover:border-[#C86041] dark:bg-[#1E1410] dark:text-white dark:border-white/10"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${showOnlyWishlist ? "fill-white" : "text-[#C86041]"}`} />
            Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Dietary Sub-Filters & Sort */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#231711]/5 pt-4 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[#6B5B52] dark:text-[#B8ABA0] mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter:
            </span>
            {DIETARY_FILTERS.map((d) => (
              <button
                key={d.value}
                onClick={() => setActiveDietary(d.value)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition cursor-pointer ${
                  activeDietary === d.value
                    ? "bg-[#C47D3B] text-white"
                    : "bg-[#231711]/5 text-[#6B5B52] hover:bg-[#231711]/10 dark:bg-white/5 dark:text-[#B8ABA0]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#6B5B52] dark:text-[#B8ABA0]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "rating")}
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
                No items match your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setActiveDietary("All");
                  setQuery("");
                  setShowOnlyWishlist(false);
                }}
                className="rounded-full bg-[#C47D3B] px-5 py-2 text-xs font-bold text-white shadow cursor-pointer"
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
      <ProductQuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Interactive Brew Lab Modal */}
      <Modal open={brewLabOpen} onClose={() => setBrewLabOpen(false)} maxWidth="max-w-xl">
        <div className="space-y-4">
          <div className="border-b border-[#231711]/10 pb-3 dark:border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C47D3B]">
              Artisan Laboratory
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#231711] dark:text-white mt-0.5">
              The Musafir Brew Lab
            </h2>
            <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
              Craft your bespoke cup — tailored to your roast, milk, and spice philosophy.
            </p>
          </div>

          {/* 1. Base Roast */}
          <div>
            <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1.5">
              1. Choose Base Extraction
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BREW_BASES.map((base) => (
                <button
                  key={base.id}
                  type="button"
                  onClick={() => setSelectedBase(base)}
                  className={`p-2.5 rounded-xl border text-left transition text-xs cursor-pointer ${
                    selectedBase.id === base.id
                      ? "border-[#C47D3B] bg-[#C47D3B]/10 font-bold text-[#231711] dark:text-white"
                      : "border-[#231711]/10 bg-white/60 hover:bg-white text-[#6B5B52] dark:bg-white/5 dark:border-white/10 dark:text-[#B8ABA0]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{base.icon} {base.name}</span>
                    <span className="font-mono text-[11px] text-[#C47D3B]">₹{base.basePrice}</span>
                  </div>
                  <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block mt-0.5">{base.notes}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Milk Choice */}
          <div>
            <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1.5">
              2. Milk & Foam Profile
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {MILK_OPTIONS.map((milk) => (
                <button
                  key={milk.id}
                  type="button"
                  onClick={() => setSelectedMilk(milk)}
                  className={`p-2 rounded-xl border text-left transition text-xs cursor-pointer ${
                    selectedMilk.id === milk.id
                      ? "border-[#C47D3B] bg-[#C47D3B]/10 font-bold text-[#231711] dark:text-white"
                      : "border-[#231711]/10 bg-white/60 hover:bg-white text-[#6B5B52] dark:bg-white/5 dark:border-white/10 dark:text-[#B8ABA0]"
                  }`}
                >
                  <span className="block line-clamp-1">{milk.name}</span>
                  <span className="text-[10px] text-[#C47D3B] block mt-0.5">
                    {milk.price === 0 ? "Included" : `+₹${milk.price}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Spices & Aromatics */}
          <div>
            <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1.5">
              3. Spice Infusion & Aromatics
            </label>
            <div className="grid grid-cols-2 gap-2">
              {SPICE_OPTIONS.map((spice) => (
                <button
                  key={spice.id}
                  type="button"
                  onClick={() => setSelectedSpice(spice)}
                  className={`p-2 rounded-xl border text-left transition text-xs cursor-pointer ${
                    selectedSpice.id === spice.id
                      ? "border-[#C47D3B] bg-[#C47D3B]/10 font-bold text-[#231711] dark:text-white"
                      : "border-[#231711]/10 bg-white/60 hover:bg-white text-[#6B5B52] dark:bg-white/5 dark:border-white/10 dark:text-[#B8ABA0]"
                  }`}
                >
                  <span className="block line-clamp-1">{spice.name}</span>
                  <span className="text-[10px] text-[#C47D3B] block mt-0.5">
                    {spice.price === 0 ? "No Add-on" : `+₹${spice.price}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Temperature */}
          <div>
            <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1.5">
              4. Serving Style & Temperature
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEMP_OPTIONS.map((temp) => (
                <button
                  key={temp.id}
                  type="button"
                  onClick={() => setSelectedTemp(temp)}
                  className={`p-2 rounded-xl border text-center transition text-xs cursor-pointer ${
                    selectedTemp.id === temp.id
                      ? "border-[#C47D3B] bg-[#C47D3B]/10 font-bold text-[#231711] dark:text-white"
                      : "border-[#231711]/10 bg-white/60 hover:bg-white text-[#6B5B52] dark:bg-white/5 dark:border-white/10 dark:text-[#B8ABA0]"
                  }`}
                >
                  <span>{temp.icon} {temp.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Summary & Add to Cart */}
          <div className="rounded-2xl border border-[#C47D3B]/20 bg-white/80 p-4 dark:bg-[#251A15] flex items-center justify-between gap-4 mt-2">
            <div>
              <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block leading-none">Bespoke Brew Price</span>
              <strong className="font-heading text-2xl font-bold text-[#C47D3B]">
                ₹{labCustomPrice}
              </strong>
            </div>

            <button
              onClick={handleAddCustomBrew}
              className="rounded-full bg-[#C47D3B] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition cursor-pointer"
            >
              Add Custom Brew to Order
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] pt-32 text-center text-xs dark:bg-[#160F0C]">Loading Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
