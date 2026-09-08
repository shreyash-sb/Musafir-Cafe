"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, Plus, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials as initialTestimonials } from "@/data/site";
import { useToast } from "@/context/ToastContext";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

export function Testimonials() {
  const [items, setItems] = useState(initialTestimonials);
  const [current, setCurrent] = useState(0);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const { notify } = useToast();

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText) {
      notify("Please provide your name and your review message");
      return;
    }

    const newReview = {
      id: `custom-rev-${Date.now()}`,
      name,
      role: "Verified Musafir Traveler",
      location: city || "Baramati",
      rating,
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      review: reviewText
    };

    setItems([newReview, ...items]);
    setCurrent(0);
    setReviewModalOpen(false);
    setName("");
    setCity("");
    setReviewText("");
    notify("Thank you! Your Musafir story has been published.");
  };

  const active = items[current];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-[#24150D] via-[#1A0E08] to-[#140A05] p-8 md:p-14 text-white shadow-2xl">
        <div className="absolute top-8 right-8 text-accent/15">
          <Quote className="h-28 w-28 rotate-180" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1.5 text-accent mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < active.rating ? "fill-accent text-accent" : "text-white/20"}`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed text-white">
                &ldquo;{active.review}&rdquo;
              </blockquote>

              <div className="mt-8 flex flex-col items-center justify-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-accent shadow-lg glow-gold-sm">
                  <Image src={active.image} alt={active.name} fill className="object-cover" />
                </div>
                <div>
                  <strong className="block text-base md:text-lg font-bold text-white">{active.name}</strong>
                  <span className="text-xs text-accent">{active.role} • {active.location}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots and Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-accent hover:text-primary transition"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === idx ? "w-8 bg-accent" : "w-2.5 bg-white/20"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-accent hover:text-primary transition"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setReviewModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/80 px-6 py-3 text-xs font-bold text-primary shadow-lg hover:border-accent hover:bg-accent/15 transition dark:bg-white/10 dark:text-white"
        >
          <Plus className="h-4 w-4 text-accent" />
          Share Your Musafir Experience
        </button>
      </div>

      <Modal open={reviewModalOpen} onClose={() => setReviewModalOpen(false)}>
        <form onSubmit={handleAddReview} className="space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Guest Feedback</span>
            <h2 className="font-heading text-3xl font-bold text-primary dark:text-white mt-1">
              Share Your Story
            </h2>
            <p className="text-xs text-cafe-muted dark:text-white/70 mt-1">
              Tell us about your favorite brew, ambience moment, or dining experience.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-accent transition hover:scale-110"
                >
                  <Star className={`h-6 w-6 ${star <= rating ? "fill-accent" : "text-white/20"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Your Name *</label>
            <input
              required
              placeholder="e.g. Aditi Kulkarni"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">City / Location</label>
            <input
              placeholder="e.g. Baramati / Pune"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-primary/10 bg-white px-4 py-3 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Your Review *</label>
            <textarea
              required
              rows={3}
              placeholder="What made your visit memorable?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full rounded-xl border border-primary/10 bg-white p-4 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Publish Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
