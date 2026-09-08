"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Flame, Droplets, Sparkles, Check, ShoppingBag, RotateCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

const ROASTS = [
  { id: "blonde", name: "Blonde Estate Roast", description: "Floral jasmine, bergamot & bright golden crema", price: 189, intensity: 2, tags: ["Floral", "Citrus", "Crisp"] },
  { id: "medium", name: "Musafir Reserve Roast", description: "Balanced milk chocolate, roasted hazelnut & toffee", price: 209, intensity: 3, tags: ["Caramel", "Hazelnut", "Smooth"] },
  { id: "dark", name: "French Velvet Dark Roast", description: "Bold woodsmoke, 80% cacao & dark molasses finish", price: 229, intensity: 5, tags: ["Dark Cacao", "Smoky", "Bold"] },
  { id: "turkish", name: "Spiced Turkish Grind", description: "Finely ground with crushed cardamom & velvet foam", price: 239, intensity: 4, tags: ["Cardamom", "Rich", "Aromatic"] }
];

const MILKS = [
  { id: "whole", name: "Creamy Whole Milk", extra: 0, tag: "Classic" },
  { id: "oat", name: "Oat Milk (Barista Edition)", extra: 40, tag: "Vegan Favorite" },
  { id: "almond", name: "Almond Milk", extra: 40, tag: "Nutty" },
  { id: "saffron", name: "Kashmiri Saffron Infused Milk", extra: 55, tag: "Signature" },
  { id: "none", name: "Pure Black (No Milk)", extra: 0, tag: "Zero Cal" }
];

const TEMPS = [
  { id: "hot", name: "Steamed Hot Microfoam", icon: Flame, desc: "65°C Silky Texture" },
  { id: "iced", name: "Over Crystal Hand-Cut Ice", icon: Droplets, desc: "Chilled & Refreshing" },
  { id: "nitro", name: "Nitro Cold Tap", icon: Sparkles, desc: "Cascading Creamy Head (+₹30)", extra: 30 }
];

const SWEETNESS = [
  { id: "zero", name: "Unsweetened (Pure)", extra: 0 },
  { id: "honey", name: "Wildflower Raw Honey", extra: 25 },
  { id: "vanilla", name: "Madagascar Vanilla Bean", extra: 30 },
  { id: "caramel", name: "House Salted Caramel", extra: 35 }
];

const ADDONS = [
  { id: "cardamom", name: "Crushed Green Cardamom", extra: 20 },
  { id: "cinnamon", name: "Ceylon Cinnamon Dust", extra: 15 },
  { id: "saffron-threads", name: "Kashmiri Saffron Garnish", extra: 45 },
  { id: "extra-shot", name: "Double Espresso Shot", extra: 50 }
];

export function CoffeeCustomizer() {
  const [roast, setRoast] = useState(ROASTS[1]);
  const [milk, setMilk] = useState(MILKS[1]);
  const [temp, setTemp] = useState(TEMPS[0]);
  const [sweet, setSweet] = useState(SWEETNESS[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["cardamom"]);

  const { addToCart } = useCart();

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const totalPrice = useMemo(() => {
    let price = roast.price + milk.extra + (temp.extra || 0) + sweet.extra;
    selectedAddons.forEach((addonId) => {
      const found = ADDONS.find((a) => a.id === addonId);
      if (found) price += found.extra;
    });
    return price;
  }, [roast, milk, temp, sweet, selectedAddons]);

  const flavorProfile = useMemo(() => {
    const list = [...roast.tags];
    if (milk.id === "saffron") list.push("Kashmiri Saffron");
    if (milk.id === "oat") list.push("Silky Oat");
    if (sweet.id === "vanilla") list.push("Vanilla Bean");
    if (sweet.id === "caramel") list.push("Salted Caramel");
    if (selectedAddons.includes("cardamom")) list.push("Warm Cardamom");
    if (selectedAddons.includes("cinnamon")) list.push("Spiced Cinnamon");
    return Array.from(new Set(list));
  }, [roast, milk, sweet, selectedAddons]);

  const handleAddCustomToCart = () => {
    const addonNames = selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean);
    const customDesc = `${roast.name} • ${milk.name} • ${temp.name} • ${sweet.name}${addonNames.length ? ` • Add-ons: ${addonNames.join(", ")}` : ""}`;

    const customProduct: Product = {
      id: `custom-brew-${Date.now()}`,
      name: `Custom ${roast.name}`,
      category: "Signature Blends",
      description: customDesc,
      price: totalPrice,
      rating: 5.0,
      image: roast.id === "dark" 
        ? "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80"
        : "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80",
      featured: false,
      dietary: milk.id === "oat" || milk.id === "almond" || milk.id === "none" ? ["Vegan", "Organic"] : ["Veg"],
      flavorNotes: flavorProfile,
      prepTime: "5-7 mins",
      calories: milk.id === "none" ? "10 kcal" : "180 kcal",
      origin: "Crafted at Musafir Brew Lab"
    };

    addToCart(customProduct, 1, customDesc);
  };

  const handleReset = () => {
    setRoast(ROASTS[1]);
    setMilk(MILKS[1]);
    setTemp(TEMPS[0]);
    setSweet(SWEETNESS[0]);
    setSelectedAddons(["cardamom"]);
  };

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-[#24150D] via-[#1A0E08] to-[#120804] p-8 md:p-12 text-white shadow-2xl shadow-black/50">
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Musafir Brew Lab
          </span>
          <h2 className="mt-4 font-heading text-4xl md:text-5xl font-bold tracking-tight text-white">
            Craft Your Custom Journey
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70 max-w-xl">
            Select your roast intensity, artisan milk, temperature, and spice infusions to design your ultimate signature cup.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-accent transition self-start md:self-auto"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Recipe
        </button>
      </div>

      <div className="relative z-10 mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Left Column: Step Controls */}
        <div className="space-y-8">
          {/* 1. Roast Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.25em] text-accent block mb-3">
              Step 1: Choose Your Bean Roast
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              {ROASTS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoast(r)}
                  className={`rounded-2xl p-4 text-left transition-all duration-300 border ${
                    roast.id === r.id
                      ? "border-accent bg-accent/15 shadow-lg shadow-accent/10 glow-gold-sm"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-sm font-bold text-white">{r.name}</strong>
                    <span className="text-xs font-bold text-accent">₹{r.price}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-white/70 line-clamp-2 leading-relaxed">{r.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-white/50 font-medium">
                    <span>Intensity:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <span
                          key={level}
                          className={`h-1.5 w-3 rounded-full ${
                            level <= r.intensity ? "bg-accent" : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Milk Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.25em] text-accent block mb-3">
              Step 2: Artisan Milk Infusion
            </label>
            <div className="flex flex-wrap gap-2.5">
              {MILKS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMilk(m)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition duration-300 border ${
                    milk.id === m.id
                      ? "border-accent bg-accent text-primary shadow-lg shadow-accent/20"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {milk.id === m.id && <Check className="h-3.5 w-3.5" />}
                  <span>{m.name}</span>
                  {m.extra > 0 && (
                    <span className={milk.id === m.id ? "text-primary/75" : "text-accent"}>
                      (+₹{m.extra})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Temperature & Sweetness */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-[0.25em] text-accent block mb-3">
                Step 3: Temperature
              </label>
              <div className="grid gap-2">
                {TEMPS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTemp(t)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition border ${
                        temp.id === t.id
                          ? "border-accent bg-accent/20 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-accent" />
                        {t.name}
                      </span>
                      {t.extra && <span className="text-accent">+₹{t.extra}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-[0.25em] text-accent block mb-3">
                Step 4: Sweetness Essence
              </label>
              <div className="grid gap-2">
                {SWEETNESS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSweet(s)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition border ${
                      sweet.id === s.id
                        ? "border-accent bg-accent/20 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span>{s.name}</span>
                    {s.extra > 0 ? <span className="text-accent">+₹{s.extra}</span> : <span className="text-white/40">Free</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Spices & Add-ons */}
          <div>
            <label className="text-xs font-bold uppercase tracking-[0.25em] text-accent block mb-3">
              Step 5: Handcrafted Spices & Additions (Optional)
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {ADDONS.map((addon) => {
                const active = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between rounded-xl p-3 text-xs font-semibold transition border ${
                      active
                        ? "border-accent/80 bg-accent/15 text-white"
                        : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`grid h-4 w-4 place-items-center rounded ${active ? "bg-accent text-primary" : "border border-white/30"}`}>
                        {active && <Check className="h-3 w-3 stroke-[3]" />}
                      </span>
                      {addon.name}
                    </span>
                    <span className="text-accent font-bold">+₹{addon.extra}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Brew Card & Recipe Summary */}
        <div className="flex flex-col justify-between rounded-3xl border border-accent/30 bg-[#29170E]/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Your Live Creation</span>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
                {temp.id === "hot" ? "Warm Brew" : "Chilled Brew"}
              </span>
            </div>

            {/* Visual Cup Preview Animation */}
            <div className="relative mx-auto my-2 grid h-44 w-36 place-items-center">
              <div className="absolute inset-0 rounded-b-[2.5rem] rounded-t-xl border-4 border-accent/40 bg-gradient-to-b from-[#4A2E1E] to-[#1F120A] overflow-hidden shadow-inner flex flex-col justify-end p-2">
                <motion.div
                  key={milk.id}
                  initial={{ height: "0%" }}
                  animate={{ height: milk.id === "none" ? "10%" : "45%" }}
                  transition={{ duration: 0.5 }}
                  className={`w-full rounded-t-lg ${
                    milk.id === "saffron"
                      ? "bg-gradient-to-t from-[#E5B558] to-[#FFF1C5]"
                      : milk.id === "oat"
                      ? "bg-gradient-to-t from-[#EFE5D5] to-[#FAF6EE]"
                      : milk.id === "none"
                      ? "bg-transparent"
                      : "bg-gradient-to-t from-[#E8DEC8] to-[#FFFFFF]"
                  }`}
                />
                <motion.div
                  key={roast.id}
                  initial={{ height: "30%" }}
                  animate={{ height: "55%" }}
                  className={`w-full rounded-b-2xl ${
                    roast.id === "blonde"
                      ? "bg-[#663C1E]"
                      : roast.id === "medium"
                      ? "bg-[#452410]"
                      : "bg-[#251206]"
                  }`}
                />
              </div>
              <Coffee className="relative z-10 h-10 w-10 text-accent/80 drop-shadow" />
            </div>

            <div>
              <h3 className="font-heading text-2xl font-bold text-white">Custom {roast.name}</h3>
              <p className="mt-1 text-xs text-white/60 leading-relaxed">
                {roast.name} with {milk.name}, {temp.name.toLowerCase()}, sweetened with {sweet.name.toLowerCase()}.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-accent/90 block mb-2">
                Calculated Flavor Notes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {flavorProfile.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-xs font-semibold text-white/70">Calculated Price</span>
              <span className="font-heading text-3xl font-bold text-accent">₹{totalPrice}</span>
            </div>

            <button
              onClick={handleAddCustomToCart}
              className="w-full flex items-center justify-center gap-3 rounded-full bg-accent py-4 text-sm font-bold text-primary shadow-xl shadow-accent/25 hover:bg-accent-hover transition duration-300 glow-gold-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              Add Custom Brew to Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
