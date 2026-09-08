import type { Metadata } from "next";
import Image from "next/image";
import { Award, Coffee, HeartHandshake, Leaf, Compass, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import { ReservationBanner } from "@/components/ReservationBanner";
import { Button } from "@/components/Button";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Story & Philosophy",
  description: "The story, single-origin sourcing ethics, and wanderer philosophy behind Musafir Cafe Baramati."
};

export default function AboutPage() {
  const values = [
    {
      icon: Coffee,
      title: "Third-Wave Coffee Craft",
      text: "Every shot is weighed, ground to micro-precision, and extracted through state-of-the-art Italian machines and manual pour-overs."
    },
    {
      icon: Leaf,
      title: "100% Pure Vegetarian Feasts",
      text: "From charcoal-smoked paneer panini to artisanal royal thalis, our gourmet kitchen is 100% pure vegetarian and freshly prepared."
    },
    {
      icon: HeartHandshake,
      title: "Soul-Soothing Hospitality",
      text: "Designed as a tranquil sanctuary for students, creators, families, and travelers seeking unhurried conversations and warm service."
    },
    {
      icon: Compass,
      title: "Direct-from-Estate Sourcing",
      text: "We partner directly with high-elevation, shade-grown Arabica farmers in Karnataka and Araku Valley, ensuring fair trade and peak flavor."
    }
  ];

  return (
    <main className="min-h-screen bg-cafe-bg px-6 pb-24 pt-32 dark:bg-[#150B07] transition-colors duration-300">
      {/* Hero Story Split */}
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <Compass className="h-3.5 w-3.5" />
            The Musafir Odyssey
          </span>
          <h1 className="mt-3 font-heading text-4xl sm:text-6xl font-bold text-primary dark:text-white leading-tight">
            For the Wanderers, Dreamers & Coffee Lovers.
          </h1>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-cafe-muted dark:text-white/75">
            <strong>Musafir Cafe</strong> was conceived on a quiet monsoon journey through the misty coffee hills of Chikmagalur. We realized that coffee isn&apos;t merely a stimulant; it is an invitation to pause, reflect, and share stories.
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed text-cafe-muted dark:text-white/75">
            Set in the vibrant heart of Baramati, Musafir blends international reserve cafe standards with warm Indian hospitality, offering single-origin brews, slow-steamed zafrani chais, fresh sourdough viennoiserie, and soothing acoustic culture.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/menu">Explore Our Menu</Button>
            <Button href="/contact" variant="secondary">Visit Cafe</Button>
          </div>
        </div>

        <div className="relative min-h-[500px] overflow-hidden rounded-[2.5rem] border border-accent/20 shadow-2xl shadow-primary/20">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
            alt="Musafir Cafe warm interior"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
            <span className="text-accent font-bold block mb-1">Sanctuary Atmosphere</span>
            <span>Where books, beans, and memories intertwine daily.</span>
          </div>
        </div>
      </section>

      {/* Sourcing & Ethics Feature */}
      <section className="mx-auto mt-28 max-w-6xl rounded-[2.5rem] border border-accent/20 bg-gradient-to-br from-[#24150D] via-[#1A0E08] to-[#120804] p-8 md:p-14 text-white shadow-2xl">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Bean to Cup Ethics</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 leading-tight">
              Honoring Every Harvest & Hands That Cultivate It
            </h2>
            <p className="mt-4 text-xs md:text-sm text-white/75 leading-relaxed">
              We roast in micro-batches to preserve the subtle terroir of each origin. Our seasonal blends showcase notes of roasted almond, cocoa, wild berry, and stone fruit without artificial flavoring.
            </p>
            <div className="mt-6 space-y-3 text-xs text-white/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>100% Shade-grown Indian Arabica beans</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Zero artificial preservatives or animal gelatin</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>Hand-steamed plant-based oat & almond milk choices</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"
              alt="Coffee beans harvest"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mx-auto mt-28 grid max-w-6xl gap-10 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Milestones</span>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
            The Journey of Musafir Cafe
          </h2>
          <p className="mt-4 text-sm md:text-base text-cafe-muted dark:text-white/70 max-w-md">
            From our humble beginnings as an espresso kiosk to Baramati&apos;s definitive specialty coffee and culture sanctuary.
          </p>
        </div>
        <Timeline />
      </section>

      {/* Core Values Grid */}
      <section className="mx-auto mt-28 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Our Foundations</span>
          <h2 className="mt-3 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
            What Shapes Every Order
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-xl shadow-primary/5 dark:border-white/10 dark:bg-[#1E110A]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent mb-5">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-primary dark:text-white">{title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-cafe-muted dark:text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Reservation Banner */}
      <ReservationBanner />
    </main>
  );
}
