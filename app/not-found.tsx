import Link from "next/link";
import { Coffee, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cafe-bg px-6 py-32 text-center dark:bg-[#150B07] transition-colors">
      <div className="max-w-md mx-auto space-y-6">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-accent/20 text-accent shadow-xl">
          <Compass className="h-10 w-10 animate-spin duration-[6000ms]" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            404 • Path Not Found
          </span>
          <h1 className="mt-2 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
            Lost on the Journey?
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-cafe-muted dark:text-white/70 leading-relaxed">
            The page you are looking for has wandered off. Return to the main sanctuary and continue exploring our menu.
          </p>
        </div>
        <Button href="/" className="gap-2 glow-gold-sm">
          Return to Cafe Home <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </main>
  );
}
