"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Sparkles, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/Button";
import { TableBookingModal } from "@/components/TableBookingModal";
import { brand } from "@/data/site";

export function ReservationBanner() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative mx-auto my-24 grid min-h-[460px] w-[min(1180px,calc(100%-32px))] place-items-center overflow-hidden rounded-[2.5rem] border border-accent/30 px-6 py-16 text-center text-white shadow-2xl">
        <Image
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=80"
          alt="Musafir Cafe candlelight reserved table"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#150B07] via-[#1A0E09]/80 to-[#150B07]/90" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Bespoke Hospitality
          </span>
          <h2 className="mt-4 font-heading text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
            Reserve Your Table at Musafir
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-white/80">
            Choose your preferred zone — from the breezy outdoor garden terrace to the vintage traveler’s reading library. Instant digital pass confirmation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Button onClick={() => setOpen(true)} className="min-h-14 px-8 text-base shadow-2xl glow-gold-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Book Table Online
            </Button>
            <a
              href={`https://wa.me/${brand.whatsapp.replace(/\+/g, "")}?text=Hi%20Musafir%20Cafe,%20I%20would%20like%20to%20enquire%20about%20a%20table%20reservation`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-md"
            >
              WhatsApp Concierge
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-accent" /> Instant Online Confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Bhigwan Road, Baramati
            </span>
          </div>
        </div>
      </section>

      <TableBookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
