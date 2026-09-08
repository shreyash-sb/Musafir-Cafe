"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Compass, Menu, Search, ShoppingBag, Heart, User, X, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AmbientAudio } from "@/components/AmbientAudio";
import { TableBookingModal } from "@/components/TableBookingModal";
import { brand } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/#brew-lab", label: "Brew Lab" },
  { href: "/stories", label: "Diaries" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const { items, wishlist } = useCart();

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FBF8F3]/90 shadow-xl shadow-black/5 backdrop-blur-xl dark:bg-[#140B07]/90 dark:border-b dark:border-white/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 w-[min(1240px,calc(100%-32px))] items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Musafir Cafe home">
            <div className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-accent to-[#A86B20] text-primary shadow-lg shadow-accent/20 group-hover:rotate-6 transition duration-300">
              <Compass className="h-6 w-6 text-primary" />
            </div>
            <div>
              <strong className="block font-heading text-xl md:text-2xl font-bold leading-none text-primary dark:text-white group-hover:text-accent transition">
                Musafir
              </strong>
              <small className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent block mt-0.5">
                Cafe & Roastery
              </small>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-wider text-primary/80 transition hover:text-accent dark:text-white/80 dark:hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Bar */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Ambient Sound Widget */}
            <AmbientAudio />

            {/* Search Input */}
            <form action="/menu" className="relative">
              <label className="sr-only" htmlFor="nav-search">
                Search menu
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-cafe-muted" />
              <input
                id="nav-search"
                name="q"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                className="h-10 w-32 focus:w-48 transition-all duration-300 rounded-full border border-primary/10 bg-white/80 pl-9 pr-3 text-xs outline-none focus:border-accent dark:border-white/10 dark:bg-white/10 dark:text-white"
              />
            </form>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wishlist Link */}
            <Link
              href="/menu?filter=wishlist"
              aria-label="View Favorites"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-primary/10 bg-white/80 text-primary dark:border-white/10 dark:bg-white/10 dark:text-white hover:text-accent transition"
            >
              <Heart className={`h-4 w-4 ${wishlist.length > 0 ? "fill-accent text-accent" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-white hover:bg-secondary transition shadow-md shadow-primary/20"
            >
              <ShoppingBag className="h-4 w-4 text-accent" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-primary animate-bounce">
                  {count}
                </span>
              )}
            </Link>

            {/* Book Table Button */}
            <button
              onClick={() => setBookModalOpen(true)}
              className="hidden xl:inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-xs font-bold text-accent hover:bg-accent hover:text-primary transition duration-300"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book Table
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-white"
            >
              <ShoppingBag className="h-4 w-4 text-accent" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-primary">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white"
              onClick={() => setOpenMobile(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {openMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden"
            >
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                className="ml-auto flex h-full w-[min(380px,90vw)] flex-col justify-between bg-[#FBF8F3] p-6 dark:bg-[#1A0E08] overflow-y-auto"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-primary/10 dark:border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary">
                        <Compass className="h-5 w-5" />
                      </div>
                      <strong className="font-heading text-lg font-bold text-primary dark:text-white">
                        Musafir Cafe
                      </strong>
                    </div>
                    <button
                      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-primary dark:text-white"
                      onClick={() => setOpenMobile(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenMobile(false)}
                        className="rounded-2xl px-4 py-3 text-base font-bold text-primary dark:text-white hover:bg-accent/15 hover:text-accent transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-primary/10 dark:border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <AmbientAudio />
                    <ThemeToggle />
                  </div>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      setBookModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 text-xs font-bold text-primary shadow-lg"
                  >
                    <Calendar className="h-4 w-4" />
                    Reserve a Table
                  </button>
                  <Link
                    href="/cart"
                    onClick={() => setOpenMobile(false)}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-bold text-white dark:bg-white/15"
                  >
                    <ShoppingBag className="h-4 w-4 text-accent" />
                    View Cart ({count} Items)
                  </Link>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Table Booking Modal */}
      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </>
  );
}
