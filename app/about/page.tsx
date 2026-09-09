import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Leaf, HeartHandshake, Compass, CheckCircle2, ArrowRight } from "lucide-react";
import { brand, timeline } from "@/data/site";

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
      text: "From grilled sourdough paninis to artisanal thali platters, our entire kitchen is 100% pure vegetarian and freshly prepared."
    },
    {
      icon: HeartHandshake,
      title: "Soulful Hospitality",
      text: "Designed as a tranquil sanctuary for readers, creators, families, and travelers seeking unhurried conversations and warm service."
    },
    {
      icon: Compass,
      title: "Direct-from-Estate Sourcing",
      text: "We partner directly with high-elevation, shade-grown Arabica farmers in Karnataka, ensuring fair trade and peak terroir."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      {/* Hero Story Split */}
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            The Musafir Odyssey
          </span>
          <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white leading-tight">
            For the Wanderers, Dreamers & Coffee Lovers
          </h1>
          <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
            <strong>Musafir Cafe</strong> was conceived on a quiet monsoon journey through the misty coffee hills of Chikmagalur. We realized that coffee isn&apos;t merely a stimulant; it is an invitation to pause, reflect, and share stories.
          </p>
          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
            Set in the vibrant heart of Baramati, Musafir blends international reserve coffee standards with warm Indian hospitality, offering single-origin brews, slow-steamed zafrani chais, fresh sourdough viennoiserie, and soothing acoustic culture.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#C47D3B] px-6 text-xs sm:text-sm font-bold text-white shadow hover:bg-[#B36E2E] transition"
            >
              Explore Our Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#231711]/15 bg-white px-5 text-xs sm:text-sm font-semibold text-[#231711] hover:bg-[#231711]/5 transition dark:bg-white/5 dark:text-white dark:border-white/10"
            >
              Visit Cafe
            </Link>
          </div>
        </div>

        <div className="relative min-h-[380px] sm:min-h-[460px] overflow-hidden rounded-3xl border border-[#231711]/10 shadow-sm dark:border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
            alt="Musafir Cafe warm interior"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white text-xs">
            <span className="text-[#E2AC65] font-bold block">Sanctuary Atmosphere</span>
            <span className="text-white/80">Where books, beans, and memories intertwine daily.</span>
          </div>
        </div>
      </section>

      {/* Sourcing Ethics Feature */}
      <section className="mx-auto mt-20 max-w-6xl rounded-3xl bg-[#1F1511] p-8 sm:p-12 text-white">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E2AC65] block">
              Ethical Sourcing
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold mt-1 leading-tight">
              Honoring Every Harvest & the Hands Behind It
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-white/75 leading-relaxed">
              We roast in micro-batches to preserve the subtle terroir of each origin. Our seasonal single-origin beans showcase naturally developed notes of roasted almond, cocoa, wild berry, and stone fruit without artificial additives.
            </p>
            <div className="mt-5 space-y-2.5 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2AC65]" />
                <span>100% Shade-grown Indian Arabica beans from Chikmagalur</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2AC65]" />
                <span>Zero artificial preservatives or animal gelatin</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E2AC65]" />
                <span>Plant-based oat & almond milk pairings available</span>
              </div>
            </div>
          </div>
          <div className="relative min-h-64 sm:min-h-72 overflow-hidden rounded-2xl">
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
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Milestones
          </span>
          <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
            The Journey of Musafir Cafe
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timeline.map((item) => (
            <div key={item.year} className="classic-card rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="font-heading text-2xl font-bold text-[#C47D3B] block">{item.year}</span>
                <h3 className="font-heading text-base font-bold text-[#231711] dark:text-white mt-1">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#6B5B52] dark:text-[#B8ABA0] leading-relaxed">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto mt-20 max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Foundations
          </span>
          <h2 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
            What Shapes Every Cup
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <article key={title} className="classic-card rounded-2xl p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C47D3B]/10 text-[#C47D3B] mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#231711] dark:text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
