"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowRight, Calendar, User, X } from "lucide-react";
import { musafirStories } from "@/data/site";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

export function MusafirDiaries() {
  const [selectedStory, setSelectedStory] = useState<(typeof musafirStories)[number] | null>(null);

  return (
    <section className="relative mx-auto w-[min(1180px,calc(100%-32px))] py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-accent glow-gold-sm">
            <BookOpen className="h-3.5 w-3.5" />
            The Traveler's Journal
          </span>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl font-bold text-primary dark:text-white">
            Musafir Diaries & Brew Stories
          </h2>
          <p className="mt-2 text-cafe-muted dark:text-white/70 max-w-xl text-sm md:text-base">
            Essays on single-origin roasts, spice alchemy, wandering philosophies, and the people behind every brew.
          </p>
        </div>
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition self-start md:self-auto"
        >
          View All Stories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {musafirStories.map((story) => (
          <motion.article
            key={story.id}
            whileHover={{ y: -8 }}
            onClick={() => setSelectedStory(story)}
            className="group cursor-pointer overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-xl shadow-primary/5 dark:border-white/10 dark:bg-[#1E120A] flex flex-col justify-between"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[11px] font-bold text-accent">
                  {story.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-[11px] text-cafe-muted dark:text-white/60 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {story.date}
                  </span>
                  <span>•</span>
                  <span>{story.readTime}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary dark:text-white group-hover:text-accent transition leading-snug">
                  {story.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-cafe-muted dark:text-white/70 line-clamp-2">
                  {story.summary}
                </p>
              </div>
            </div>
            <div className="p-6 pt-0 flex items-center justify-between border-t border-primary/5 dark:border-white/5 mt-4">
              <span className="text-xs font-semibold text-primary/70 dark:text-white/60 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-accent" /> {story.author}
              </span>
              <span className="text-xs font-bold text-accent group-hover:translate-x-1 transition flex items-center gap-1">
                Read <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <Modal open={Boolean(selectedStory)} onClose={() => setSelectedStory(null)}>
        {selectedStory && (
          <div className="max-h-[80vh] overflow-y-auto pr-1">
            <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-[1.75rem] mb-6">
              <Image src={selectedStory.image} alt={selectedStory.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                  {selectedStory.category}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 leading-tight">
                  {selectedStory.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-white/80 mt-2">
                  <span>By {selectedStory.author}</span>
                  <span>•</span>
                  <span>{selectedStory.date}</span>
                  <span>•</span>
                  <span>{selectedStory.readTime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm md:text-base leading-relaxed text-cafe-muted dark:text-white/80">
              <p className="text-lg font-medium text-primary dark:text-white italic">
                &ldquo;{selectedStory.summary}&rdquo;
              </p>
              <p>
                At Musafir Cafe, every cup represents miles traveled, patience refined, and human hands that nurtured the harvest. We believe in the sacred pause that coffee creates in our otherwise breathless lives.
              </p>
              <p>
                Whether you sit under the morning sun on our open terrace garden, lose yourself inside the Traveler&apos;s Library, or chat with our master baristas as they pull a siphon extraction, you are not just a customer — you are a wanderer passing through a safe harbor.
              </p>
              <p>
                Our ingredients are ethically procured from Karnataka estate farms, Kashmiri saffron valleys, and European heritage ovens, brought together with heartfelt Maharashtrian hospitality right here in Baramati.
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setSelectedStory(null)}>Close Journal</Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
