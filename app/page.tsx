"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles, Compass, Coffee, Heart, ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { CoffeeCustomizer } from "@/components/CoffeeCustomizer";
import { MusafirDiaries } from "@/components/MusafirDiaries";
import { EventsSection } from "@/components/EventsSection";
import { Counter } from "@/components/Counter";
import { Timeline } from "@/components/Timeline";
import { Testimonials } from "@/components/Testimonials";
import { ReservationBanner } from "@/components/ReservationBanner";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { categoriesData, brand } from "@/data/site";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const featured = products.filter((product) => product.featured).slice(0, 6);

  const pillars = [
    { title: "Single-Origin Sourcing", text: "Directly sourced from shade-grown estates in Karnataka and Araku Valley." },
    { title: "100% Pure Vegetarian", text: "A gourmet menu of fresh sourdoughs, thali feasts, and bakes with zero gelatin or animal rennet." },
    { title: "Slow-Steamed Aromatics", text: "Kashmiri saffron, whole green cardamom, and Madagascar vanilla infused daily." },
    { title: "Soulful Cultural Spaces", text: "Open terrace greenery, reading nooks, and live acoustic music sessions." }
  ];

  return (
    <main className="bg-cafe-bg dark:bg-[#150B07] transition-colors duration-300">
      {/* 1. Atmospheric Hero Section */}
      <Hero />

      {/* 2. Featured Categories Section */}
      <AnimatedSection className="mx-auto w-[min(1240px,calc(100%-32px))] py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              <Compass className="h-3.5 w-3.5" />
              Flavors of the Journey
            </span>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
              Crafted for Every Mood
            </h2>
            <p className="mt-2 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-lg">
              Explore our curated culinary landscapes — from high-elevation single origin pour-overs to warm artisan viennoiserie.
            </p>
          </div>
          <Button href="/menu" variant="secondary" className="gap-2">
            View All Categories <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesData.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </AnimatedSection>

      {/* 3. Interactive "Musafir Brew Lab" Coffee Customizer Section */}
      <AnimatedSection id="brew-lab" className="mx-auto w-[min(1240px,calc(100%-32px))] pb-24 scroll-mt-24">
        <CoffeeCustomizer />
      </AnimatedSection>

      {/* 4. Guest Favorites / Signature Creations */}
      <AnimatedSection className="mx-auto w-[min(1240px,calc(100%-32px))] pb-24">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Curated Masterpieces
            </span>
            <h2 className="mt-3 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
              Guest Favorites & Signature Brews
            </h2>
            <p className="mt-2 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-lg">
              Our most celebrated creations, hand-pulled and freshly baked to order.
            </p>
          </div>
          <Button href="/menu" className="gap-2">
            Explore Full Menu <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
          ))}
        </div>
      </AnimatedSection>

      {/* 5. The Musafir Philosophy & Heritage Split */}
      <AnimatedSection className="mx-auto grid w-[min(1240px,calc(100%-32px))] gap-12 pb-24 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-accent/20 shadow-2xl shadow-primary/20">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
            alt="Musafir Cafe warm sanctuary lounge"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="rounded-full bg-accent/90 backdrop-blur px-3 py-1 text-xs font-bold text-primary">
              Our Essence
            </span>
            <p className="font-heading text-2xl md:text-3xl font-bold mt-2">
              &ldquo;A cafe should be a pause in the traveler&apos;s story — warm, unhurried, and aromatic.&rdquo;
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <Heart className="h-3.5 w-3.5" />
            The Musafir Standard
          </span>

          <h2 className="font-heading text-4xl sm:text-5xl font-bold leading-tight text-primary dark:text-white">
            Where Craftsmanship Meets Warm Hospitality.
          </h2>

          <p className="text-sm md:text-base leading-relaxed text-cafe-muted dark:text-white/75">
            Rooted in Baramati, <strong>Musafir Cafe</strong> was born out of a desire to create a world-class third-wave coffee experience wrapped in soulful warmth. Every bean has a journey, and every guest has a story.
          </p>

          <div className="grid gap-3 pt-2">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-2xl border border-primary/5 bg-white p-4 shadow-md shadow-primary/5 dark:border-white/10 dark:bg-[#1E110A]"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-accent/20 text-accent shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-sm font-bold text-primary dark:text-white block">{item.title}</strong>
                  <p className="text-xs text-cafe-muted dark:text-white/70 mt-0.5 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <Counter value={8} label="Years of Craft" suffix="+" />
            <Counter value={45} label="Signature Brews" suffix="+" />
            <Counter value={35} label="Happy Musafirs" suffix="K+" />
          </div>
        </div>
      </AnimatedSection>

      {/* 6. Musafir Diaries Section */}
      <MusafirDiaries />

      {/* 7. Live Events & Acoustic Sessions */}
      <EventsSection />

      {/* 8. Testimonials & Community Reviews */}
      <AnimatedSection id="testimonials" className="mx-auto w-[min(1240px,calc(100%-32px))] pb-20">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Voices of the Wanderers
          </span>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
            Loved by Regular Musafirs
          </h2>
          <p className="mt-2 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-lg mx-auto">
            Read stories from the creators, families, and travelers who make Musafir Cafe their second home.
          </p>
        </div>
        <Testimonials />
      </AnimatedSection>

      {/* 9. High Impact Table Booking Banner */}
      <ReservationBanner />

      {/* Quick View Product Modal */}
      <Modal open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative min-h-80 md:min-h-96 overflow-hidden rounded-[1.75rem]">
              <Image src={selectedProduct.image} alt={selectedProduct.name} fill sizes="50vw" className="object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                {selectedProduct.dietary?.map((d) => (
                  <span key={d} className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary shadow">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between p-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  {selectedProduct.category}
                </span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-primary dark:text-white">
                  {selectedProduct.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cafe-muted dark:text-white/70">
                  {selectedProduct.description}
                </p>

                {selectedProduct.flavorNotes && (
                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase text-accent tracking-widest block mb-1.5">
                      Flavor Profile
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.flavorNotes.map((n) => (
                        <span key={n} className="rounded-lg border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs text-accent">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-cafe-muted dark:text-white/70 border-y border-primary/10 dark:border-white/10 py-3">
                  <div>
                    <span className="block text-white/50">Origin</span>
                    <strong className="text-primary dark:text-white">{selectedProduct.origin}</strong>
                  </div>
                  <div>
                    <span className="block text-white/50">Prep Time</span>
                    <strong className="text-primary dark:text-white">{selectedProduct.prepTime}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-cafe-muted dark:text-white/50 block">Price</span>
                  <strong className="font-heading text-3xl font-bold text-primary dark:text-accent">
                    ₹{selectedProduct.price}
                  </strong>
                </div>
                <Button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
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
