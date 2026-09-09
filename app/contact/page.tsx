"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Calendar, ChevronDown, Send } from "lucide-react";
import { TableBookingModal } from "@/components/TableBookingModal";
import { useToast } from "@/context/ToastContext";
import { brand, faqs } from "@/data/site";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { notify } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

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
    form.reset();
    notify("Thank you! Your message has reached the Musafir team.");
  }

  return (
    <>
      <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
        <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Left Column: Info & Details */}
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
                Connect With Us
              </span>
              <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white leading-tight">
                Visit & Reach Out
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0]">
                We are open daily for single-origin coffees, artisan bakes, celebrations, and quiet wanderer moments in Baramati.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid gap-3">
              <div className="classic-card flex items-start gap-3.5 rounded-2xl p-4">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#C47D3B]/10 text-[#C47D3B] shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#231711] dark:text-white block">Location</strong>
                  <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0] mt-0.5 leading-relaxed">{brand.address}</p>
                </div>
              </div>

              <div className="classic-card flex items-start gap-3.5 rounded-2xl p-4">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#C47D3B]/10 text-[#C47D3B] shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#231711] dark:text-white block">Phone & WhatsApp</strong>
                  <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0] mt-0.5">{brand.phone}</p>
                  <a
                    href={`https://wa.me/${brand.whatsapp.replace(/\+/g, "")}?text=Hello%20Musafir%20Cafe`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-[#C47D3B] hover:underline inline-block mt-1"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              <div className="classic-card flex items-start gap-3.5 rounded-2xl p-4">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#C47D3B]/10 text-[#C47D3B] shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#231711] dark:text-white block">Hours</strong>
                  <div className="text-xs text-[#6B5B52] dark:text-[#B8ABA0] mt-0.5 space-y-0.5">
                    {brand.hours.map((h) => (
                      <span key={h} className="block">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Table Booking Banner */}
            <div className="rounded-2xl bg-[#1F1511] p-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2AC65] block">
                Skip the Wait
              </span>
              <h3 className="font-heading text-lg font-bold mt-1">Reserve a Table in Seconds</h3>
              <p className="mt-1 text-xs text-white/75 leading-relaxed">
                Choose garden terrace or traveler library seating and get an instant digital pass.
              </p>
              <button
                onClick={() => setBookModalOpen(true)}
                className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-[#C47D3B] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition"
              >
                <Calendar className="h-3.5 w-3.5" />
                Book Table Online
              </button>
            </div>
          </div>

          {/* Right Column: Message Form & FAQs */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="classic-card rounded-2xl p-6 sm:p-7 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C47D3B] block">
                  Write to Us
                </span>
                <h2 className="font-heading text-xl font-bold text-[#231711] dark:text-white mt-0.5">
                  Send a Note
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Your Name</label>
                  <input
                    required
                    name="name"
                    placeholder="e.g. Rahul Patil"
                    className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Email / Phone</label>
                  <input
                    required
                    name="contact"
                    placeholder="email or phone number"
                    className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Subject</label>
                <select
                  name="subject"
                  className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  <option value="General Inquiry">General Cafe Inquiry</option>
                  <option value="Private Event">Private Gathering / Birthday</option>
                  <option value="Coffee Workshop">Masterclass & Workshop</option>
                  <option value="Feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Message</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="How can we help make your Musafir experience memorable?"
                  className="w-full rounded-xl border border-[#231711]/10 bg-white p-3 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#C47D3B] py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* FAQs Accordion */}
            <div className="space-y-3">
              <h3 className="font-heading text-lg font-bold text-[#231711] dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={faq.question}
                      className="classic-card rounded-xl p-3.5 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left text-xs font-bold text-[#231711] dark:text-white gap-2"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 transition text-[#C47D3B] ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0] border-t border-[#231711]/5 pt-2 dark:border-white/5">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <TableBookingModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </>
  );
}
