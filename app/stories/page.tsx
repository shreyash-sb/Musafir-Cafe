"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { Modal } from "@/components/Modal";
import { musafirStories } from "@/data/site";

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<(typeof musafirStories)[number] | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      <section className="mx-auto max-w-6xl">
        <div className="border-b border-[#231711]/10 pb-6 dark:border-white/10">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            The Traveler&apos;s Chronicle
          </span>
          <h1 className="mt-1 font-heading text-3xl sm:text-5xl font-bold text-[#231711] dark:text-white">
            The Musafir Journal
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] max-w-lg">
            Essays on single-origin roasts, spice alchemy, wanderer philosophies, and stories from the cafe.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {musafirStories.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="classic-card group cursor-pointer overflow-hidden rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    {story.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-3 text-[11px] text-[#6B5B52] dark:text-[#B8ABA0] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {story.date}
                    </span>
                    <span>•</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#231711] dark:text-white group-hover:text-[#C47D3B] transition leading-snug">
                    {story.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0] line-clamp-2">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-[#231711]/5 dark:border-white/5 mt-2">
                <span className="text-[11px] font-medium text-[#6B5B52] dark:text-[#B8ABA0]">
                  {story.author}
                </span>
                <span className="text-xs font-bold text-[#C47D3B] flex items-center gap-1">
                  Read Essay <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Story Reading Modal */}
      <Modal open={Boolean(selectedStory)} onClose={() => setSelectedStory(null)}>
        {selectedStory && (
          <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-2xl">
              <Image src={selectedStory.image} alt={selectedStory.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="rounded-full bg-[#C47D3B] px-2.5 py-0.5 text-[10px] font-bold text-white">
                  {selectedStory.category}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold mt-1.5 leading-snug">
                  {selectedStory.title}
                </h2>
                <p className="text-xs text-white/80 mt-1">
                  By {selectedStory.author} • {selectedStory.date} • {selectedStory.readTime}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#6B5B52] dark:text-[#B8ABA0]">
              <p className="text-sm font-semibold text-[#231711] dark:text-white italic">
                &ldquo;{selectedStory.summary}&rdquo;
              </p>
              <p>
                At Musafir Cafe, every cup represents miles traveled, patience refined, and human hands that nurtured the harvest. We believe in the sacred pause that coffee creates in our otherwise breathless lives.
              </p>
              <p>
                Whether you sit under the morning sun on our open garden terrace, lose yourself inside the Traveler&apos;s Library, or chat with our master baristas as they pull a siphon extraction, you are not just a visitor — you are a wanderer in a warm home.
              </p>
              <p>
                Our single-origin Arabica is shade-grown in Chikmagalur and roasted in small batches to preserve its natural chocolate and berry notes. Paired with slow-simmered Kashmiri zafrani chai and fresh artisan sourdough bakes, every order is a homage to slow craftsmanship.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedStory(null)}
                className="rounded-full bg-[#231711] px-5 py-2 text-xs font-bold text-white hover:bg-[#3A251C] transition dark:bg-white dark:text-[#231711]"
              >
                Close Journal
              </button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
