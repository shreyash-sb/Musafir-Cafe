"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MapPin, X, Ticket, Share2, Download } from "lucide-react";
import { seatingZones, brand } from "@/data/site";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/Button";

type TableBookingModalProps = {
  open: boolean;
  onClose: () => void;
  defaultZoneId?: string;
};

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
  "Casual Wanderer Coffee",
  "Romantic Date",
  "Birthday / Anniversary",
  "Remote Work / Reading",
  "Family Celebration",
  "Business Discussion"
];

export function TableBookingModal({ open, onClose, defaultZoneId }: TableBookingModalProps) {
  const [zone, setZone] = useState(defaultZoneId || seatingZones[0].id);
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

  const { notify } = useToast();

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      notify("Please provide your name and contact number");
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
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...passData, phone, specialRequest })
      });
    } catch {
      // ignore offline
    }

    setLoading(false);
    setConfirmedPass(passData);
    notify("Table reserved successfully! Your pass is ready.");
  };

  const handleClose = () => {
    setConfirmedPass(null);
    onClose();
  };

  const selectedZone = seatingZones.find((z) => z.id === zone) || seatingZones[0];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] grid place-items-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative w-full max-w-4xl my-8 overflow-hidden rounded-[2.5rem] border border-accent/30 bg-[#1A0E08] text-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-6 md:px-8 bg-[#25150D]/80">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-primary font-bold">
                  <Ticket className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-white">
                    {confirmedPass ? "Your Musafir Reservation Pass" : "Reserve Your Table"}
                  </h2>
                  <p className="text-xs text-accent">
                    {confirmedPass ? "Show this pass at the host counter" : brand.name + " • Baramati"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            {confirmedPass ? (
              <div className="p-6 md:p-10 space-y-8">
                {/* Digital Ticket Pass */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-accent/40 bg-gradient-to-br from-[#2E1A10] via-[#1E110A] to-[#140A05] p-6 md:p-8 shadow-2xl glow-gold-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
                        Confirmed Table Booking
                      </span>
                      <h3 className="font-heading text-3xl font-bold text-white mt-1">
                        {confirmedPass.zoneName}
                      </h3>
                      <p className="text-xs text-white/70 flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {brand.address}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-accent/30 bg-accent/15 px-4 py-2 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent/80 block">Pass Code</span>
                      <strong className="text-lg font-mono font-bold text-accent">{confirmedPass.id}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-white/10 text-xs">
                    <div>
                      <span className="text-white/50 block">Guest Name</span>
                      <strong className="text-white text-sm mt-0.5 block">{confirmedPass.name}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Date</span>
                      <strong className="text-white text-sm mt-0.5 block">{confirmedPass.date}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Time Slot</span>
                      <strong className="text-white text-sm mt-0.5 block">{confirmedPass.time}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block">Party Size</span>
                      <strong className="text-white text-sm mt-0.5 block">{confirmedPass.guests} Guests</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-white/70">
                    <span className="flex items-center gap-2 text-accent">
                      <Sparkles className="h-4 w-4" />
                      Occasion: {confirmedPass.occasion}
                    </span>
                    <span className="text-white/50">Table held for 20 mins post slot time</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-3">
                  <Button variant="secondary" onClick={() => window.print()} className="gap-2">
                    <Download className="h-4 w-4" />
                    Print / Save Pass
                  </Button>
                  <Button onClick={handleClose}>Done</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBook} className="p-6 md:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
                {/* 1. Zone Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-[0.25em] text-accent block mb-3">
                    1. Select Seating Zone
                  </label>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {seatingZones.map((z) => (
                      <button
                        type="button"
                        key={z.id}
                        onClick={() => setZone(z.id)}
                        className={`group relative overflow-hidden rounded-2xl p-4 text-left transition duration-300 border ${
                          zone === z.id
                            ? "border-accent bg-accent/20 shadow-lg glow-gold-sm"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <strong className="text-sm font-bold text-white block">{z.name}</strong>
                        <span className="text-[11px] text-accent block mt-0.5">{z.capacity}</span>
                        <p className="mt-2 text-xs text-white/60 line-clamp-2 leading-relaxed">
                          {z.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Date, Time, Guests */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                      2. Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-xs text-white outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                      3. Preferred Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#25150D] px-4 py-3.5 text-xs text-white outline-none focus:border-accent"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#1A0E08] text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                      4. Number of Guests
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
                      <Users className="h-4 w-4 text-accent" />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                        className="w-full bg-transparent text-sm font-bold text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Occasion */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                    5. Occasion / Vibe
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {OCCASIONS.map((occ) => (
                      <button
                        type="button"
                        key={occ}
                        onClick={() => setOccasion(occ)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition border ${
                          occasion === occ
                            ? "border-accent bg-accent text-primary font-bold shadow-md"
                            : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Guest Details */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-accent block mb-2">
                    Special Requests / Dietary Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Quiet corner, birthday candle on dessert, high chair needed"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white outline-none focus:border-accent"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-6">
                  <Button type="button" variant="ghost" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="min-w-44">
                    {loading ? "Confirming..." : "Confirm Reservation"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
