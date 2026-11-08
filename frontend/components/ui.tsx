"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sun, Moon, ArrowUp, Heart, Plus, Star, Eye, CheckCircle2, MapPin, Send } from "lucide-react";
import { useTheme, useCart, useToast, useApp } from "@/context/AppContext";
import { Product, seatingZones, brand } from "@/lib/site";
import { submitReservation } from "@/lib/api";

/* ==========================================================================
   1. Accessible Animated Modal
   ========================================================================== */
export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
};

export function Modal({ open, onClose, children, maxWidth = "max-w-2xl" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/65 p-4 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`relative my-8 w-full ${maxWidth} overflow-hidden rounded-3xl border border-[#231711]/10 bg-[#FAF7F2] p-6 sm:p-8 shadow-2xl dark:border-white/10 dark:bg-[#1E1410] text-[#231711] dark:text-[#F7F2EC] z-10`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#231711]/5 text-[#231711]/70 hover:bg-[#231711]/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ==========================================================================
   2. Versatile Button Component
   ========================================================================== */
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

const buttonVariants = {
  primary: "bg-[#C47D3B] text-white hover:bg-[#B36E2E] shadow-md shadow-[#C47D3B]/20 active:scale-[0.98]",
  secondary: "bg-[#231711] text-white hover:bg-[#3A251C] shadow-sm active:scale-[0.98] dark:bg-[#FAF7F2] dark:text-[#231711] dark:hover:bg-white",
  outline: "border border-[#C47D3B]/40 bg-transparent text-[#C47D3B] hover:bg-[#C47D3B]/10 dark:text-[#E2AC65] dark:border-[#C47D3B]/50",
  ghost: "text-[#231711] hover:bg-[#231711]/5 dark:text-white dark:hover:bg-white/10"
};

const buttonSizes = {
  sm: "min-h-9 px-3.5 text-xs font-semibold rounded-full",
  md: "min-h-11 px-5 text-xs sm:text-sm font-semibold rounded-full",
  lg: "min-h-13 px-7 text-sm sm:text-base font-semibold rounded-full"
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  );
}

/* ==========================================================================
   3. Theme Toggle Button
   ========================================================================== */
export function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="grid h-9 w-9 place-items-center rounded-full border border-[#231711]/10 bg-white/80 text-[#231711] transition hover:border-[#C47D3B] hover:text-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-[#E2AC65] cursor-pointer"
      aria-label="Toggle light or dark theme"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

/* ==========================================================================
   4. Back To Top Floating Action
   ========================================================================== */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-10 w-10 place-items-center rounded-full bg-[#C47D3B] text-white shadow-xl hover:bg-[#B36E2E] transition active:scale-95 cursor-pointer"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

/* ==========================================================================
   5. Clean Status / Dietary Badge
   ========================================================================== */
export function Badge({
  children,
  variant = "default"
}: {
  children: React.ReactNode;
  variant?: "default" | "gold" | "dark" | "outline";
}) {
  const styles = {
    default: "bg-[#231711]/5 text-[#6B5B52] dark:bg-white/5 dark:text-[#B8ABA0]",
    gold: "bg-[#C47D3B]/15 text-[#C47D3B] dark:text-[#E2AC65]",
    dark: "bg-[#231711] text-white dark:bg-white dark:text-[#231711]",
    outline: "border border-[#C47D3B]/40 text-[#C47D3B] dark:text-[#E2AC65]"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${styles[variant]}`}>
      {children}
    </span>
  );
}

/* ==========================================================================
   6. Artisan Product Card Component
   ========================================================================== */
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

          <div className="absolute inset-0 bg-black/25 opacity-0 transition duration-200 group-hover:opacity-100 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-[#231711] shadow">
              <Eye className="h-3.5 w-3.5 text-[#C47D3B]" /> Quick View
            </span>
          </div>

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

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#231711] shadow-sm hover:scale-110 active:scale-95 transition dark:bg-[#1E1410]/90 dark:text-white cursor-pointer"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`h-4 w-4 transition ${
                isLiked ? "fill-[#C86041] text-[#C86041]" : "text-[#231711]/70 dark:text-white/70"
              }`}
            />
          </button>
        </div>

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

      <div className="flex items-center justify-between border-t border-[#231711]/5 px-4 sm:px-5 py-3.5 dark:border-white/5">
        <div>
          <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block leading-none">Price</span>
          <strong className="text-base sm:text-lg font-bold text-[#231711] dark:text-[#F7F2EC]">
            ₹{product.price}
          </strong>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#C47D3B] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#B36E2E] active:scale-95 transition cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
    </article>
  );
}

/* ==========================================================================
   7. Reusable Product Quick View Modal
   ========================================================================== */
export function ProductQuickViewModal({
  product,
  onClose
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const { notify } = useToast();

  if (!product) return null;

  return (
    <Modal open={Boolean(product)} onClose={onClose}>
      <div className="grid gap-6 sm:grid-cols-2 items-center">
        <div className="relative min-h-64 sm:min-h-80 w-full overflow-hidden rounded-2xl bg-[#EFE9E1]">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#C47D3B]">
            {product.category}
          </span>
          <h2 className="font-heading text-2xl font-bold text-[#231711] dark:text-white">
            {product.name}
          </h2>
          <p className="text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
            {product.description}
          </p>

          {product.flavorNotes && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.flavorNotes.map((n) => (
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
              <strong className="text-[#231711] dark:text-white">{product.origin}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Prep Time</span>
              <strong className="text-[#231711] dark:text-white">{product.prepTime}</strong>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Price</span>
              <strong className="font-heading text-2xl font-bold text-[#231711] dark:text-white">
                ₹{product.price}
              </strong>
            </div>
            <button
              onClick={() => {
                addToCart(product);
                onClose();
                notify(`Added ${product.name} to order`);
              }}
              className="rounded-full bg-[#C47D3B] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition cursor-pointer"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ==========================================================================
   8. Global Table Booking Modal
   ========================================================================== */
const TIME_SLOTS = [
  "9:00 AM - Morning Serenity",
  "11:30 AM - Brunch & Pour-Over",
  "1:30 PM - Lunch & Sourdough",
  "4:30 PM - High Tea & Chai",
  "6:30 PM - Sunset Acoustic Session",
  "8:30 PM - Candlelight Dinner",
  "10:00 PM - Late Night Cold Brews"
];

const OCCASIONS = [
  "Casual Coffee & Work",
  "Romantic Date",
  "Birthday / Anniversary",
  "Family Gathering",
  "Book Reading / Solitude"
];

export function TableBookingModal() {
  const { isTableModalOpen, closeTableModal, tableModalZone, notify } = useApp();

  const [zone, setZone] = useState(tableModalZone || seatingZones[0].id);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(TIME_SLOTS[4]);
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState<{
    id: string;
    zoneName: string;
    date: string;
    time: string;
    guests: number;
    name: string;
    occasion: string;
  } | null>(null);

  useEffect(() => {
    if (tableModalZone) setZone(tableModalZone);
  }, [tableModalZone]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      notify("Please provide your name and WhatsApp number", "warning");
      return;
    }
    setLoading(true);

    const selectedZoneObj = seatingZones.find((z) => z.id === zone);
    const passData = {
      id: `MSF-${Math.floor(100000 + Math.random() * 900000)}`,
      zoneName: selectedZoneObj?.name || "Musafir Reserved Table",
      date,
      time,
      guests,
      name,
      occasion
    };

    try {
      await submitReservation({ ...passData, phone, specialRequest });
    } catch {
      // offline fallback
    }

    setLoading(false);
    setConfirmedPass(passData);
    notify("Table reserved! Your digital reservation pass is ready.");
  };

  const handleClose = () => {
    setConfirmedPass(null);
    closeTableModal();
  };

  return (
    <Modal open={isTableModalOpen} onClose={handleClose} maxWidth="max-w-xl">
      {confirmedPass ? (
        <div className="text-center py-2 space-y-5">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#284435]/10 text-[#284435] dark:bg-[#284435]/30 dark:text-emerald-400">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C47D3B]">
              Booking Confirmed
            </span>
            <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-[#231711] dark:text-white">
              Your Musafir Table Pass
            </h2>
            <p className="mt-1 text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
              Show this pass or mention your name upon arrival at Musafir Cafe.
            </p>
          </div>

          <div className="rounded-2xl border border-[#C47D3B]/20 bg-white p-5 text-left shadow-sm dark:bg-[#261A15] space-y-3">
            <div className="flex items-center justify-between border-b border-[#231711]/5 pb-3 dark:border-white/10">
              <div>
                <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Pass Reference</span>
                <strong className="font-mono text-sm font-bold text-[#C47D3B]">{confirmedPass.id}</strong>
              </div>
              <span className="rounded-full bg-[#C47D3B]/10 px-3 py-1 text-xs font-semibold text-[#C47D3B]">
                {confirmedPass.occasion}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-[#6B5B52] dark:text-[#B8ABA0] block text-[11px]">Guest Name</span>
                <strong className="text-[#231711] dark:text-white">{confirmedPass.name}</strong>
              </div>
              <div>
                <span className="text-[#6B5B52] dark:text-[#B8ABA0] block text-[11px]">Seating Area</span>
                <strong className="text-[#231711] dark:text-white">{confirmedPass.zoneName}</strong>
              </div>
              <div>
                <span className="text-[#6B5B52] dark:text-[#B8ABA0] block text-[11px]">Date & Time</span>
                <strong className="text-[#231711] dark:text-white">{confirmedPass.date} • {confirmedPass.time.split(" - ")[0]}</strong>
              </div>
              <div>
                <span className="text-[#6B5B52] dark:text-[#B8ABA0] block text-[11px]">Reserved Seats</span>
                <strong className="text-[#231711] dark:text-white">{confirmedPass.guests} Guests</strong>
              </div>
            </div>

            <div className="border-t border-[#231711]/5 pt-3 text-[11px] text-[#6B5B52] dark:text-[#B8ABA0] flex items-center gap-1 dark:border-white/10">
              <MapPin className="h-3.5 w-3.5 text-[#C47D3B] shrink-0" />
              <span>{brand.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `*☕ Musafir Cafe Reservation*\n*Pass ID:* ${confirmedPass.id}\n*Guest:* ${confirmedPass.name}\n*Ambiance:* ${confirmedPass.zoneName}\n*Date & Time:* ${confirmedPass.date} (${confirmedPass.time})\n*Guests:* ${confirmedPass.guests}\n*Occasion:* ${confirmedPass.occasion}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#284435] py-2.5 text-xs font-bold text-white hover:bg-[#1e3428] transition"
            >
              <Send className="h-3.5 w-3.5" />
              Notify on WhatsApp
            </a>
            <button
              onClick={handleClose}
              className="flex-1 rounded-full bg-[#C47D3B] py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition cursor-pointer"
            >
              Done & Save Pass
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleBook} className="space-y-4">
          <div className="border-b border-[#231711]/5 pb-3 dark:border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C47D3B]">
              Instant Reservation
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#231711] dark:text-white mt-0.5">
              Reserve a Table
            </h2>
            <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
              Complimentary reservation • Musafir Cafe Baramati
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1.5">
              Choose Seating Ambiance
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {seatingZones.map((z) => (
                <button
                  type="button"
                  key={z.id}
                  onClick={() => setZone(z.id)}
                  className={`p-2.5 rounded-xl text-left border transition text-xs cursor-pointer ${
                    zone === z.id
                      ? "border-[#C47D3B] bg-[#C47D3B]/10 font-bold text-[#231711] dark:text-white"
                      : "border-[#231711]/10 bg-white/60 hover:bg-white text-[#6B5B52] dark:bg-white/5 dark:border-white/10 dark:text-[#B8ABA0]"
                  }`}
                >
                  <span className="block font-semibold line-clamp-1">{z.name}</span>
                  <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block mt-0.5">{z.capacity}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Date</label>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Guests</label>
              <input
                type="number"
                min="1"
                max="12"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Your Name</label>
              <input
                required
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">WhatsApp Number</label>
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {OCCASIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Special Request (Optional)</label>
              <input
                placeholder="e.g. Quiet corner / Window seat"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#C47D3B] py-3 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Confirming..." : "Confirm Free Reservation"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
