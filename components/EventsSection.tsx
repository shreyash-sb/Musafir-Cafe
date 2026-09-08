"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, Music, Sparkles, CheckCircle2, X, Send } from "lucide-react";
import { upcomingEvents } from "@/data/site";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/Button";

export function EventsSection() {
  const [rsvpEvent, setRsvpEvent] = useState<(typeof upcomingEvents)[number] | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);
  const { notify } = useToast();

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      notify("Please fill in your name and phone number");
      return;
    }
    setSubmitted(true);
    notify(`RSVP confirmed for ${rsvpEvent?.title}! We look forward to seeing you.`);
  };

  const handleClose = () => {
    setRsvpEvent(null);
    setSubmitted(false);
    setName("");
    setPhone("");
  };

  return (
    <section className="relative mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <Music className="h-3.5 w-3.5" />
            Live Culture & Gatherings
          </span>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-primary dark:text-white">
            Acoustics & Community Events
          </h2>
          <p className="mt-2 text-cafe-muted dark:text-white/70 max-w-xl text-sm md:text-base">
            From soulful Sufi strings and latte art masterclasses to poetry open mics, discover what’s happening at Musafir Cafe.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((evt) => (
          <motion.article
            key={evt.id}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-xl shadow-primary/5 dark:border-white/10 dark:bg-[#1E120A] transition-all duration-500"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-primary shadow-md">
                    {evt.badge}
                  </span>
                  <span className="rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] font-bold text-white">
                    {evt.genre}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white/90">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    {evt.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {evt.time}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-primary dark:text-white group-hover:text-accent transition">
                  {evt.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-cafe-muted dark:text-white/70">
                  {evt.description}
                </p>
                <div className="mt-4 rounded-xl bg-accent/10 p-3 text-xs font-semibold text-accent flex items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  {evt.entry}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setRsvpEvent(evt)}
                className="w-full rounded-full bg-primary py-3.5 text-xs font-bold text-white transition hover:bg-secondary dark:bg-white/15 dark:hover:bg-accent dark:hover:text-primary"
              >
                RSVP for Event
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {rsvpEvent && (
          <div className="fixed inset-0 z-[95] grid place-items-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-accent/30 bg-[#1E110A] text-white p-6 md:p-8 shadow-2xl"
            >
              <button
                onClick={handleClose}
                className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold">You are on the Guestlist!</h3>
                  <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                    We have saved spots for <strong>{guests} guests</strong> at <strong>{rsvpEvent.title}</strong> on {rsvpEvent.date}.
                  </p>
                  <Button onClick={handleClose} className="mt-4">
                    Got it, thanks!
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Event RSVP</span>
                    <h3 className="font-heading text-2xl font-bold text-white mt-1">{rsvpEvent.title}</h3>
                    <p className="text-xs text-white/60 mt-1">{rsvpEvent.date} • {rsvpEvent.time}</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-accent block mb-1">Your Full Name</label>
                    <input
                      required
                      placeholder="e.g. Maya Iyer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-accent block mb-1">WhatsApp Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-accent block mb-1">Number of Seats (Max 5)</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white outline-none focus:border-accent"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Confirm Guestlist RSVP
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
