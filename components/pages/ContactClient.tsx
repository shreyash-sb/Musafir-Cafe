"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, MessageSquare, Send, Clock, Calendar, Sparkles } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import { TableBookingModal } from "@/components/TableBookingModal";
import { useToast } from "@/context/ToastContext";
import { brand, faqs } from "@/data/site";

export function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const { notify } = useToast();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch {
      // offline fallback
    }
    setLoading(false);
    event.currentTarget.reset();
    notify("Thank you! Your message has reached the Musafir concierge team.");
  }

  return (
    <>
      <main className="min-h-screen bg-cafe-bg px-6 pb-24 pt-32 dark:bg-[#150B07] transition-colors duration-300">
        <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left Column: Info Hub & Map */}
          <div className="space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Connect With Us
              </span>
              <h1 className="mt-2 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white leading-tight">
                Visit, Reserve & Reach Out
              </h1>
              <p className="mt-2 text-sm text-cafe-muted dark:text-white/70">
                We are open daily for specialty coffee, artisan bakery, celebrations, and wanderer conversations in Baramati.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="grid gap-3.5">
              <div className="flex items-start gap-3.5 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1E110A]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-xs font-bold uppercase tracking-wider text-accent block">Address</strong>
                  <p className="text-xs text-primary dark:text-white/90 mt-0.5 leading-relaxed">{brand.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1E110A]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-xs font-bold uppercase tracking-wider text-accent block">Direct Phone & WhatsApp</strong>
                  <p className="text-xs text-primary dark:text-white/90 mt-0.5">{brand.phone}</p>
                  <a
                    href={`https://wa.me/${brand.whatsapp.replace(/\+/g, "")}?text=Hello%20Musafir%20Cafe`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-accent hover:underline inline-block mt-1"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1E110A]">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent shrink-0 mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <strong className="text-xs font-bold uppercase tracking-wider text-accent block">Cafe Timings</strong>
                  <div className="text-xs text-primary dark:text-white/90 mt-0.5 space-y-0.5">
                    {brand.hours.map((h) => (
                      <span key={h} className="block">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Table Booking Trigger Card */}
            <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-[#2E1A10] to-[#1A0E08] p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="font-heading text-xl font-bold block">Planning a Visit?</strong>
                  <p className="text-xs text-white/70 mt-1">Reserve a garden terrace table or private pod in 30 seconds.</p>
                </div>
                <button
                  onClick={() => setBookModalOpen(true)}
                  className="rounded-full bg-accent px-5 py-2.5 text-xs font-bold text-primary shadow-lg hover:bg-accent-hover transition flex items-center gap-1.5 shrink-0"
                >
                  <Calendar className="h-3.5 w-3.5" /> Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <form
            onSubmit={submit}
            className="flex flex-col justify-between rounded-[2.25rem] border border-primary/10 bg-white p-6 md:p-8 shadow-2xl shadow-primary/5 dark:border-white/10 dark:bg-[#1E110A]"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Write To Us</span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary dark:text-white mt-1">
                Send a Note or Enquiry
              </h2>
              <p className="text-xs text-cafe-muted dark:text-white/70 mt-1 mb-6">
                Have questions regarding private celebrations, bulk catering, or coffee beans? We respond within a few hours.
              </p>

              <div className="space-y-4">
                <Input required name="name" placeholder="Your Full Name *" aria-label="Full Name" />
                <Input required type="email" name="email" placeholder="Email Address *" aria-label="Email" />
                <Input required type="tel" name="phone" placeholder="Phone Number *" aria-label="Phone" />
                <Textarea
                  required
                  rows={4}
                  name="message"
                  placeholder="Your message, event requirements, or feedback *"
                  aria-label="Message"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full min-h-12 text-xs mt-6 glow-gold-sm">
              <Send className="h-3.5 w-3.5 mr-2" />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto mt-28 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Common Queries</span>
              <h2 className="mt-2 font-heading text-4xl font-bold text-primary dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-xs md:text-sm text-cafe-muted dark:text-white/70">
                Everything you need to know about our seating, pure vegetarian menu, digital delivery, and table reservation policy.
              </p>
            </div>
            <Accordion items={faqs} />
          </div>
        </section>
      </main>

      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </>
  );
}
