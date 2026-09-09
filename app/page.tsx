"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Compass,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Star,
  Music,
  MapPin,
  Clock,
  Send,
  X
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Modal } from "@/components/Modal";
import { TableBookingModal } from "@/components/TableBookingModal";
import { categoriesData, brand, seatingZones, upcomingEvents, testimonials } from "@/data/site";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [rsvpEvent, setRsvpEvent] = useState<(typeof upcomingEvents)[number] | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState(2);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { notify } = useToast();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  const pillars = [
    {
      title: "Single-Origin Estates",
      desc: "Directly sourced from shade-grown, high-elevation plantations in Karnataka and Araku Valley."
    },
    {
      title: "100% Pure Vegetarian",
      desc: "Gourmet sourdough sandwiches, handcrafted pastries, and traditional chais made fresh daily."
    },
    {
      title: "Slow-Steamed Aromatics",
      desc: "Real Kashmiri saffron, whole green cardamom, and Madagascar vanilla infused with care."
    },
    {
      title: "Soulful Cultural Ambiance",
      desc: "Open garden terrace, traveler's reading library, and intimate weekly acoustic music nights."
    }
  ];

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpPhone) {
      notify("Please provide your name and WhatsApp number");
      return;
    }
    setRsvpSubmitted(true);
    notify(`RSVP confirmed for ${rsvpEvent?.title}! See you there.`);
  };

  const closeRsvp = () => {
    setRsvpEvent(null);
    setRsvpSubmitted(false);
    setRsvpName("");
    setRsvpPhone("");
  };

  return (
    <main className="bg-[#FAF7F2] dark:bg-[#160F0C] transition-colors duration-200">
      {/* 1. Atmospheric Hero Section */}
      <Hero />

      {/* 2. Curated Menu Categories */}
      <section className="mx-auto w-[min(1200px,calc(100%-32px))] py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
              Crafted With Passion
            </span>
            <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
              Flavors of the Journey
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
              Explore our handcrafted culinary landscape — from single-origin manual pour-overs to warm artisan viennoiserie.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C47D3B] hover:text-[#B36E2E] transition self-start sm:self-auto"
          >
            Full Menu <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoriesData.map((category) => (
            <Link
              key={category.title}
              href={`/menu?category=${encodeURIComponent(category.title)}`}
              className="classic-card group relative overflow-hidden rounded-2xl block"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2AC65] block">
                    {category.itemCount}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#E2AC65] transition">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/75 line-clamp-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Signature Creations & Guest Favorites */}
      <section className="mx-auto w-[min(1200px,calc(100%-32px))] pb-20 sm:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
              Curated Masterpieces
            </span>
            <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
              Signature Brews & Bakes
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
              Our most celebrated creations, freshly hand-pulled and baked to order.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C47D3B] hover:text-[#B36E2E] transition self-start sm:self-auto"
          >
            Explore All 45+ Items <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onView={setSelectedProduct} />
          ))}
        </div>
      </section>

      {/* 4. The Musafir Philosophy & Sourcing Story */}
      <section className="mx-auto grid w-[min(1200px,calc(100%-32px))] gap-10 pb-20 sm:pb-24 lg:grid-cols-2 lg:items-center">
        <div className="relative min-h-[420px] sm:min-h-[500px] overflow-hidden rounded-3xl border border-[#231711]/10 shadow-sm dark:border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
            alt="Musafir Cafe warm sanctuary lounge"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="rounded-full bg-[#C47D3B] px-3 py-0.5 text-[11px] font-bold text-white">
              The Musafir Essence
            </span>
            <p className="font-heading text-xl sm:text-2xl font-bold mt-2 leading-snug">
              &ldquo;A cafe should be a pause in the traveler&apos;s story — warm, unhurried, and aromatic.&rdquo;
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Our Heritage & Values
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white leading-tight">
            Where Craftsmanship Meets Warm Hospitality
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
            Rooted in Baramati, <strong>Musafir Cafe</strong> was born out of a desire to create a world-class specialty coffee sanctuary wrapped in soulful Indian warmth. Every bean has a journey, and every guest has a story.
          </p>

          <div className="grid gap-3 pt-1">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="classic-card flex items-start gap-3 rounded-2xl p-3.5"
              >
                <div className="grid h-5 w-5 place-items-center rounded-full bg-[#C47D3B]/15 text-[#C47D3B] shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#231711] dark:text-white block">{item.title}</strong>
                  <p className="text-[11px] text-[#6B5B52] dark:text-[#B8ABA0] mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#231711] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#3A251C] transition dark:bg-white dark:text-[#231711]"
            >
              Read Our Full Story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Seating Ambiance & Spaces */}
      <section className="mx-auto w-[min(1200px,calc(100%-32px))] pb-20 sm:pb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Atmospheric Corners
          </span>
          <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
            Find Your Favorite Space
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0]">
            From open-sky terrace garden seating to cozy book reading nooks.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {seatingZones.slice(0, 3).map((zone) => (
            <div key={zone.id} className="classic-card overflow-hidden rounded-2xl flex flex-col justify-between">
              <div className="relative h-48 w-full overflow-hidden">
                <Image src={zone.image} alt={zone.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-semibold text-[#E2AC65]">
                  {zone.capacity}
                </span>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#231711] dark:text-white">
                    {zone.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#6B5B52] dark:text-[#B8ABA0] leading-relaxed">
                    {zone.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#231711]/5 dark:border-white/5">
                  <button
                    onClick={() => setBookModalOpen(true)}
                    className="text-xs font-bold text-[#C47D3B] hover:text-[#B36E2E] transition flex items-center gap-1"
                  >
                    Reserve Table Here <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Live Acoustic Events */}
      <section className="mx-auto w-[min(1200px,calc(100%-32px))] pb-20 sm:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
              Music & Culture
            </span>
            <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
              Live Evenings & Gatherings
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
              Unwind under the terrace lights with acoustic strings, poetry sessions, and coffee workshops.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C47D3B] hover:text-[#B36E2E] transition self-start sm:self-auto"
          >
            All Events <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="classic-card overflow-hidden rounded-2xl flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full overflow-hidden">
                  <Image src={evt.image} alt={evt.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="rounded-full bg-[#C47D3B] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {evt.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90">
                    {evt.date} • {evt.time}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-heading text-base font-bold text-[#231711] dark:text-white">
                    {evt.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
                    {evt.description}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-[#C47D3B]">
                    {evt.entry}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => setRsvpEvent(evt)}
                  className="w-full rounded-xl bg-[#231711] py-2 text-xs font-semibold text-white hover:bg-[#3A251C] transition dark:bg-white dark:text-[#231711]"
                >
                  RSVP Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Guest Testimonials */}
      <section className="mx-auto w-[min(1200px,calc(100%-32px))] pb-20 sm:pb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Voices of the Wanderers
          </span>
          <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
            Loved by Regular Musafirs
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <div key={t.id} className="classic-card rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex text-[#C47D3B] mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0] italic">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#231711]/5 dark:border-white/5 flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-full overflow-hidden bg-[#C47D3B]/20 shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#231711] dark:text-white block leading-tight">{t.name}</strong>
                  <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Table Reservation Banner */}
      <section className="mx-auto mb-20 w-[min(1200px,calc(100%-32px))] rounded-3xl bg-[#1F1511] p-8 sm:p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E2AC65] block">
            Hospitality Awaits
          </span>
          <h2 className="mt-1 font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Reserve Your Table at Musafir
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white/75 leading-relaxed">
            Planning a coffee date, work afternoon, or celebration? Book your table in seconds and receive an instant digital pass.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setBookModalOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C47D3B] px-6 text-xs sm:text-sm font-bold text-white shadow hover:bg-[#B36E2E] transition"
            >
              <Calendar className="h-4 w-4" />
              Book Table Online
            </button>

            <a
              href={`https://wa.me/${brand.whatsapp.replace(/\+/g, "")}?text=Hello%20Musafir%20Cafe,%20I%20would%20like%20to%20reserve%20a%20table`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              WhatsApp Concierge
            </a>
          </div>
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

      {/* RSVP Modal */}
      <Modal open={Boolean(rsvpEvent)} onClose={closeRsvp} maxWidth="max-w-md">
        {rsvpEvent && (
          <div>
            {rsvpSubmitted ? (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#284435]/15 text-[#284435] dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold">RSVP Confirmed!</h3>
                <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
                  Spots saved for <strong>{rsvpGuests} guests</strong> at <strong>{rsvpEvent.title}</strong> on {rsvpEvent.date}.
                </p>
                <button
                  onClick={closeRsvp}
                  className="rounded-full bg-[#C47D3B] px-6 py-2 text-xs font-bold text-white shadow mt-2"
                >
                  Great, Thanks!
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C47D3B]">
                    Event RSVP
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#231711] dark:text-white mt-0.5">
                    {rsvpEvent.title}
                  </h3>
                  <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
                    {rsvpEvent.date} • {rsvpEvent.time}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Your Name</label>
                  <input
                    required
                    placeholder="e.g. Maya Iyer"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">WhatsApp Number</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={rsvpPhone}
                    onChange={(e) => setRsvpPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Number of Seats</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(parseInt(e.target.value) || 1)}
                    className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#C47D3B] py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition"
                  >
                    Confirm RSVP
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>

      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </main>
  );
}
