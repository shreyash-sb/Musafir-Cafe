"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Music, CheckCircle2, Sparkles, Send } from "lucide-react";
import { Modal } from "@/components/Modal";
import { upcomingEvents } from "@/data/site";
import { useToast } from "@/context/ToastContext";

export default function EventsPage() {
  const [rsvpEvent, setRsvpEvent] = useState<(typeof upcomingEvents)[number] | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const { notify } = useToast();

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      notify("Please fill in your name and WhatsApp number");
      return;
    }
    setSubmitted(true);
    notify(`RSVP confirmed for ${rsvpEvent?.title}!`);
  };

  const handleClose = () => {
    setRsvpEvent(null);
    setSubmitted(false);
    setName("");
    setPhone("");
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      <section className="mx-auto max-w-6xl">
        <div className="border-b border-[#231711]/10 pb-6 dark:border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Community & Culture
          </span>
          <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white">
            Live Events & Gatherings
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
            Acoustic Sufi nights, latte art masterclasses, and wanderers poetry open mics at Musafir Cafe Baramati.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((evt) => (
            <div key={evt.id} className="classic-card overflow-hidden rounded-2xl flex flex-col justify-between">
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image src={evt.image} alt={evt.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="rounded-full bg-[#C47D3B] px-2.5 py-0.5 text-[10px] font-bold text-white">
                      {evt.badge}
                    </span>
                    <span className="rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-medium text-white">
                      {evt.genre}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#E2AC65]" /> {evt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#E2AC65]" /> {evt.time}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-heading text-lg font-bold text-[#231711] dark:text-white">
                    {evt.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
                    {evt.description}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold text-[#C47D3B]">
                    {evt.entry}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => setRsvpEvent(evt)}
                  className="w-full rounded-xl bg-[#231711] py-2.5 text-xs font-semibold text-white hover:bg-[#3A251C] transition dark:bg-white dark:text-[#231711]"
                >
                  Reserve Guestlist Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP Modal */}
      <Modal open={Boolean(rsvpEvent)} onClose={handleClose} maxWidth="max-w-md">
        {rsvpEvent && (
          <div>
            {submitted ? (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#284435]/15 text-[#284435] dark:text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold">You are on the Guestlist!</h3>
                <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
                  Spots saved for <strong>{guests} guests</strong> at <strong>{rsvpEvent.title}</strong> on {rsvpEvent.date}.
                </p>
                <button
                  onClick={handleClose}
                  className="rounded-full bg-[#C47D3B] px-6 py-2 text-xs font-bold text-white shadow mt-2"
                >
                  Got it, thanks!
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

                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Number of Seats</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
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
    </main>
  );
}
