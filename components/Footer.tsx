"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { brand } from "@/data/site";
import { useToast } from "@/context/ToastContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const { notify } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    notify("Thank you for joining the Wanderers Club! We'll keep you updated with secret roasts and events.");
    setEmail("");
  };

  return (
    <footer className="border-t border-[#231711]/10 bg-[#1F1511] px-6 py-14 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr_1.1fr_1.2fr]">
        {/* Col 1: Brand Info */}
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#C47D3B] text-white">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <strong className="font-heading text-xl font-bold">{brand.name}</strong>
              <p className="text-xs text-[#E2AC65]">{brand.tagline}</p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-white/70 max-w-sm">
            A sanctuary for the wandering soul. Handcrafted single-origin coffees, slow-steamed zafrani chais, artisan bakes, and peaceful conversations in Baramati.
          </p>

          <div className="mt-5 flex gap-2.5">
            {[
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Mail, href: `mailto:${brand.email}` }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-[#C47D3B] transition"
                  aria-label="Social Link"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#E2AC65]">Quick Explorer</h3>
          <div className="mt-4 grid gap-2 text-xs text-white/75">
            {[
              { label: "Home", href: "/" },
              { label: "Artisan Menu & Order", href: "/menu" },
              { label: "Our Story & Roastery", href: "/about" },
              { label: "Cafe Gallery", href: "/gallery" },
              { label: "Live Events & Workshops", href: "/events" },
              { label: "Musafir Journal", href: "/stories" },
              { label: "Contact & Location", href: "/contact" }
            ].map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-[#E2AC65] transition">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Hours & Address */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#E2AC65]">Timings & Address</h3>
          <div className="mt-4 space-y-1 text-xs text-white/75">
            {brand.hours.map((hour) => (
              <span key={hour} className="block">{hour}</span>
            ))}
          </div>

          <p className="mt-4 flex gap-2 text-xs text-white/75 leading-relaxed">
            <MapPin className="h-4 w-4 text-[#E2AC65] shrink-0 mt-0.5" />
            <span>{brand.address}</span>
          </p>

          <p className="mt-2.5 flex gap-2 text-xs text-white/75">
            <Phone className="h-4 w-4 text-[#E2AC65] shrink-0" />
            <a href={`tel:${brand.phone}`} className="hover:text-[#E2AC65] transition">
              {brand.phone}
            </a>
          </p>
        </div>

        {/* Col 4: Newsletter */}
        <form onSubmit={handleSubscribe} className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E2AC65]">
            Wanderers Club
          </span>
          <h3 className="font-heading text-base font-bold text-white mt-1">Musafir Gazette</h3>
          <p className="mt-1.5 text-xs text-white/70 leading-relaxed">
            Receive updates on seasonal single-origin roasts, weekend live music, and member treats.
          </p>
          <div className="mt-3.5 space-y-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-xs text-white outline-none focus:border-[#C47D3B]"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#C47D3B] py-2 text-xs font-semibold text-white shadow hover:bg-[#B36E2E] transition"
            >
              <Send className="h-3 w-3" />
              Subscribe
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
        <span>© {new Date().getFullYear()} Musafir Cafe & Roastery • Baramati</span>
        <span>A sweet and slow sanctuary for wanderers.</span>
      </div>
    </footer>
  );
}
