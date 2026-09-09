"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { seatingZones, brand } from "@/data/site";
import { useToast } from "@/context/ToastContext";
import { Calendar, Clock, Users, CheckCircle2, Ticket, Sparkles, MapPin } from "lucide-react";

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
  "Casual Coffee & Work",
  "Romantic Date",
  "Birthday / Anniversary",
  "Family Gathering",
  "Book Reading / Solitude"
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
      notify("Please provide your name and WhatsApp number");
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
      // offline fallback
    }

    setLoading(false);
    setConfirmedPass(passData);
    notify("Table reserved! Your digital reservation pass is ready.");
  };

  const handleClose = () => {
    setConfirmedPass(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-xl">
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

          {/* Clean Classic Pass Ticket */}
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

          <button
            onClick={handleClose}
            className="w-full rounded-full bg-[#C47D3B] py-3 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition"
          >
            Done & Save Pass
          </button>
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

          {/* Zone Selection */}
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
                  className={`p-2.5 rounded-xl text-left border transition text-xs ${
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

          {/* Date, Time, Guests */}
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

          {/* Occasion, Name, Phone */}
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

          <div>
            <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Occasion / Note (Optional)</label>
            <input
              placeholder="e.g. Window side preferred / Anniversary celebration"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#C47D3B] py-3 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition disabled:opacity-50"
            >
              {loading ? "Confirming..." : "Confirm Free Reservation"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
