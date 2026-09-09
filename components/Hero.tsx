"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, ArrowRight, CheckCircle2, Compass } from "lucide-react";
import { TableBookingModal } from "@/components/TableBookingModal";
import { brand } from "@/data/site";

export function Hero() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1F1511] px-6 text-white pt-28 pb-20">
        {/* Background Atmosphere Image */}
        <Image
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80"
          alt="Musafir Cafe warm barista brewing coffee"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />

        {/* Soft Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1511]/90 via-[#1F1511]/70 to-[#FAF7F2] dark:to-[#160F0C]" />

        {/* Content Container */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Subtle Live Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C47D3B]/40 bg-[#C47D3B]/15 px-3.5 py-1 text-xs font-semibold text-[#E2AC65] backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>Open Daily • 8:30 AM – 11:30 PM • Baramati</span>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.12] tracking-tight">
            For the Wanderers,
            <span className="block text-[#E2AC65] italic font-normal mt-1">
              Every Sip is a Journey.
            </span>
          </h1>

          {/* Body Text */}
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/80 font-normal">
            Welcome to <strong>Musafir Cafe</strong> — an artisanal sanctuary where slow-roasted single-origin coffees, fragrant zafrani chais, fresh sourdoughs, and heartfelt stories meet.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <Link
              href="/menu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C47D3B] px-7 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-[#B36E2E] transition active:scale-95"
            >
              Explore Menu & Order <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setBookModalOpen(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-xs sm:text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20 transition active:scale-95"
            >
              <Calendar className="h-4 w-4 text-[#E2AC65]" />
              Reserve a Table
            </button>
          </div>

          {/* Key Trust Pillars */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-white/75 border-t border-white/10 pt-8">
            <div className="flex items-center gap-1.5">
              <span className="flex text-[#E2AC65]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <strong className="text-white">4.95 Rating</strong>
              <span className="text-white/50">(1,200+ Reviews)</span>
            </div>

            <div className="hidden sm:block h-3 w-px bg-white/20" />

            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#E2AC65]" />
              <span>100% Pure Vegetarian Kitchen</span>
            </div>

            <div className="hidden sm:block h-3 w-px bg-white/20" />

            <div className="flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[#E2AC65]" />
              <span>Garden Terrace & Library Seating</span>
            </div>
          </div>
        </div>
      </section>

      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </>
  );
}
