"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Star, Sparkles, Calendar, Coffee, Compass, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { TableBookingModal } from "@/components/TableBookingModal";
import { brand } from "@/data/site";

export function Hero() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  return (
    <>
      <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#150B07] px-6 text-white pt-24 pb-16">
        {/* Background Atmosphere Image */}
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=85"
          alt="Musafir Cafe warm barista brewing ritual"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
        />

        {/* Ambient Gradient Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#150B07]/80 via-[#1A0E09]/70 to-[#150B07]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />

        {/* Floating Badges */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="hidden md:flex absolute left-[6%] top-36 items-center gap-2 rounded-full border border-accent/30 bg-[#25150D]/80 px-4 py-2 text-xs font-bold text-accent backdrop-blur-md shadow-xl glow-gold-sm"
        >
          <Compass className="h-4 w-4 text-accent" />
          <span>Single-Origin Karnataka Roast</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="hidden md:flex absolute bottom-36 right-[8%] items-center gap-2 rounded-full border border-accent/30 bg-[#25150D]/80 px-4 py-2 text-xs font-bold text-accent backdrop-blur-md shadow-xl glow-gold-sm"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          <span>100% Pure Vegetarian Kitchen</span>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Live Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-accent backdrop-blur-md glow-gold-sm mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Open Now • 8:30 AM - 11:30 PM • Baramati</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight"
          >
            For the Wanderers,
            <span className="block text-gradient-gold italic mt-2">
              Every Sip is a Journey.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-white/75"
          >
            Welcome to <strong>Musafir Cafe</strong> — an artisanal sanctuary where slow-roasted single-origin coffees, whole-spice zafrani chais, stone-baked sourdoughs, and heartfelt stories meet.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-9 flex flex-wrap justify-center items-center gap-4"
          >
            <Button href="/menu" className="min-h-14 px-8 text-base glow-gold-sm">
              Explore Menu & Order
            </Button>
            <button
              onClick={() => setBookModalOpen(true)}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-accent/50 bg-[#2B1910]/80 px-8 text-base font-bold text-accent hover:bg-accent hover:text-primary transition duration-300 backdrop-blur-md shadow-xl"
            >
              <Calendar className="h-4 w-4" />
              Reserve a Table
            </button>
            <a
              href="#brew-lab"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-sm font-bold text-white/80 hover:bg-white/15 hover:text-white transition duration-300 backdrop-blur"
            >
              <Coffee className="h-4 w-4 text-accent" />
              Custom Brew Lab
            </a>
          </motion.div>

          {/* Highlights & Ratings */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm font-semibold text-white/80 border-t border-white/10 pt-8"
          >
            <div className="flex items-center gap-2">
              <span className="flex text-accent">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <strong className="text-white">4.95 Rating</strong>
              <span className="text-white/50">(1,200+ Reviews)</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>45+ Signature Brews & Delicacies</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Terrace Garden & Library Seating</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 z-10 grid place-items-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="h-4 w-4 text-accent" />
        </motion.div>
      </section>

      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </>
  );
}
