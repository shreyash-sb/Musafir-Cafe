"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Compass, Menu, Search, ShoppingBag, Heart, X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TableBookingModal } from "@/components/TableBookingModal";
import { brand } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/events", label: "Events" },
  { href: "/stories", label: "Journal" },
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
          scrolled ? "glass-nav shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 w-[min(1200px,calc(100%-32px))] items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Musafir Cafe home">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#231711] text-[#C47D3B] transition group-hover:bg-[#C47D3B] group-hover:text-white dark:bg-white dark:text-[#231711]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <strong className="block font-heading text-xl font-bold leading-none text-[#231711] dark:text-white">
                Musafir
              </strong>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C47D3B] block mt-0.5">
                Cafe & Roastery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-[#231711]/75 hover:text-[#C47D3B] dark:text-white/80 dark:hover:text-[#E2AC65] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Action Items */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Search Input */}
            <form action="/menu" className="relative">
              <label className="sr-only" htmlFor="nav-search">
                Search menu
              </label>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B5B52]" />
              <input
                id="nav-search"
                name="q"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="h-9 w-28 focus:w-44 transition-all duration-300 rounded-full border border-[#231711]/10 bg-white/70 pl-8 pr-3 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </form>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wishlist Link */}
            <Link
              href="/menu?filter=wishlist"
              aria-label="View Favorites"
              className="relative grid h-9 w-9 place-items-center rounded-full border border-[#231711]/10 bg-white/80 text-[#231711] dark:border-white/10 dark:bg-white/5 dark:text-white hover:text-[#C47D3B] transition"
            >
              <Heart className={`h-4 w-4 ${wishlist.length > 0 ? "fill-[#C86041] text-[#C86041]" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#C86041] px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative grid h-9 w-9 place-items-center rounded-full bg-[#231711] text-white hover:bg-[#3A251C] transition dark:bg-white dark:text-[#231711]"
            >
              <ShoppingBag className="h-4 w-4 text-[#C47D3B]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#C47D3B] px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            {/* Book Table Button */}
            <button
              onClick={() => setBookModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#C47D3B] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#B36E2E] transition"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book Table
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/cart"
              aria-label="Open cart"
              className="relative grid h-9 w-9 place-items-center rounded-full bg-[#231711] text-white dark:bg-white dark:text-[#231711]"
            >
              <ShoppingBag className="h-4 w-4 text-[#C47D3B]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#C47D3B] px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-[#231711]/10 bg-white/80 text-[#231711] dark:border-white/10 dark:bg-white/5 dark:text-white"
              onClick={() => setOpenMobile(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {openMobile && (
            <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm lg:hidden">
              <div className="fixed inset-0" onClick={() => setOpenMobile(false)} />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative ml-auto flex h-full w-[min(320px,85vw)] flex-col justify-between bg-[#FAF7F2] p-6 dark:bg-[#1E1410] z-10"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#231711]/10 pb-4 mb-6 dark:border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#C47D3B] text-white">
                        <Compass className="h-4 w-4" />
                      </div>
                      <strong className="font-heading text-lg font-bold text-[#231711] dark:text-white">
                        Musafir Cafe
                      </strong>
                    </div>
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full bg-[#231711]/5 text-[#231711] dark:bg-white/10 dark:text-white"
                      onClick={() => setOpenMobile(false)}
                      aria-label="Close menu"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    {links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpenMobile(false)}
                        className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#231711] hover:bg-[#C47D3B]/10 hover:text-[#C47D3B] dark:text-white dark:hover:bg-white/5 transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-[#231711]/10 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">Theme</span>
                    <ThemeToggle />
                  </div>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      setBookModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C47D3B] py-3 text-xs font-bold text-white shadow"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Reserve a Table
                  </button>
                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>
      </header>

      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </>
  );
}
