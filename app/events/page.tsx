import type { Metadata } from "next";
import { EventsSection } from "@/components/EventsSection";
import { ReservationBanner } from "@/components/ReservationBanner";

export const metadata: Metadata = {
  title: "Live Acoustics & Community Events",
  description: "Join our Friday acoustic nights, latte art masterclasses, and poetry sessions at Musafir Cafe Baramati."
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-cafe-bg px-6 pb-24 pt-32 dark:bg-[#150B07] transition-colors duration-300">
      <div className="mx-auto max-w-6xl text-center mb-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Gatherings & Acoustics</span>
        <h1 className="mt-2 font-heading text-4xl sm:text-6xl font-bold text-primary dark:text-white">
          Events at Musafir
        </h1>
        <p className="mt-3 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-xl mx-auto">
          Experience soulful unplugged music under the terrace fairy lights, brewing workshops, and traveler poetry sessions.
        </p>
      </div>

      <EventsSection />

      <ReservationBanner />
    </main>
  );
}
