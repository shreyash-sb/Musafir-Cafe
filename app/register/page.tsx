"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Eye, EyeOff, Lock, Mail, User, Sparkles, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { useToast } from "@/context/ToastContext";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { notify } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    notify("Account created successfully! Welcome to the Musafir Wanderers Club.");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-cafe-bg px-6 py-32 dark:bg-[#150B07] transition-colors duration-300">
      <div className="w-full max-w-md rounded-[2.5rem] border border-primary/10 bg-white p-8 md:p-10 shadow-2xl shadow-primary/10 dark:border-white/10 dark:bg-[#1E110A]">
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent to-[#A86B20] text-primary shadow-lg shadow-accent/20">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-accent">
            Join the Journey
          </span>
          <h1 className="mt-1 font-heading text-3xl font-bold text-primary dark:text-white">
            Create Musafir Account
          </h1>
          <p className="mt-2 text-xs text-cafe-muted dark:text-white/70">
            Unlock 10% off your first order, table booking passes, and priority invites to acoustic nights.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cafe-muted" />
              <input
                required
                placeholder="e.g. Sameer Patil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-primary/10 bg-primary/5 pl-10 pr-4 py-3 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cafe-muted" />
              <input
                required
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-primary/10 bg-primary/5 pl-10 pr-4 py-3 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Phone (WhatsApp)</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cafe-muted" />
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-primary/10 bg-primary/5 pl-10 pr-4 py-3 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-primary dark:text-white block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cafe-muted" />
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-primary/10 bg-primary/5 pl-10 pr-10 py-3 text-xs text-primary outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cafe-muted hover:text-accent"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-cafe-muted" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full min-h-12 text-xs font-bold glow-gold-sm mt-2">
            Create Account & Join
          </Button>

          <div className="text-center pt-2">
            <Link href="/menu" className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-1">
              Continue as Guest <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-primary/10 dark:border-white/10 text-center text-xs text-cafe-muted dark:text-white/70">
          Already a member?{" "}
          <Link href="/login" className="font-bold text-accent hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
