"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Facebook, Instagram, Mail, MapPin, Phone, Send, Sparkles, Twitter } from "lucide-react";
import { brand } from "@/data/site";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function Footer() {
  const [email, setEmail] = useState("");
  const { notify } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    notify("Welcome to the Musafir Club! You'll receive our monthly secret brews and event invitations.");
    setEmail("");
  };

  return (
    <footer className="relative border-t border-accent/20 bg-[#120804] px-6 py-16 text-white overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1.1fr_1.2fr]">
        {/* Col 1: Brand Info */}
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent to-[#A86B20] text-primary shadow-lg shadow-accent/20">
              <Compass className="h-6 w-6 text-primary" />
            </div>
            <div>
              <strong className="font-heading text-2xl font-bold">{brand.name}</strong>
              <p className="text-xs font-semibold text-accent">{brand.tagline}</p>
            </div>
          </div>

          <p className="mt-5 max-w-sm text-xs leading-relaxed text-white/70">
            A sanctuary for the wandering soul. Handcrafted single-origin coffees, whole-spice zafrani chais, fresh artisan bakery, and soulful acoustics in Baramati.
          </p>

          <div className="mt-6 flex gap-3">
            {[
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Mail, href: `mailto:${brand.email}` }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-accent hover:border-accent hover:bg-accent hover:text-primary transition duration-300"
                  aria-label="Social Link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Quick Explorer</h3>
          <div className="mt-5 grid gap-2.5 text-xs font-semibold text-white/70">
            {[
              { label: "Home", href: "/" },
              { label: "Menu & Order", href: "/menu" },
              { label: "Brew Lab Customizer", href: "/#brew-lab" },
              { label: "Musafir Diaries", href: "/stories" },
              { label: "Acoustic Events", href: "/events" },
              { label: "Our Story & Roastery", href: "/about" },
              { label: "Cafe Gallery", href: "/gallery" },
              { label: "Contact & Location", href: "/contact" }
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-accent transition">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Hours & Address */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Timings & Location</h3>
          <div className="mt-5 grid gap-2 text-xs text-white/70">
            {brand.hours.map((hour) => (
              <span key={hour} className="block">{hour}</span>
            ))}
          </div>

          <p className="mt-5 flex gap-2.5 text-xs text-white/70 leading-relaxed">
            <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <span>{brand.address}</span>
          </p>

          <p className="mt-3 flex gap-2.5 text-xs text-white/70">
            <Phone className="h-4 w-4 text-accent shrink-0" />
            <a href={`tel:${brand.phone}`} className="hover:text-accent transition">
              {brand.phone}
            </a>
          </p>
        </div>

        {/* Col 4: Newsletter */}
        <form onSubmit={handleSubscribe} className="rounded-3xl border border-accent/20 bg-[#1E110A]/90 p-6 shadow-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Wanderers Club
          </span>
          <h3 className="font-heading text-lg font-bold text-white mt-1">The Musafir Gazette</h3>
          <p className="mt-2 text-xs leading-relaxed text-white/70">
            Receive secret single-origin drops, masterclass passes, and exclusive discounts.
          </p>
          <div className="mt-4 space-y-3">
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <Button type="submit" className="w-full text-xs">
              <Send className="h-3.5 w-3.5 mr-2" />
              Join Club
            </Button>
          </div>
        </form>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
        <span>© 2026 Musafir Cafe & Roastery. All rights reserved.</span>
        <span>Crafted for dreamers, thinkers, and coffee connoisseurs.</span>
      </div>
    </footer>
  );
}
