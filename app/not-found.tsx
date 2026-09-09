import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#FAF7F2] px-6 py-32 text-center dark:bg-[#160F0C] transition-colors">
      <div className="max-w-md mx-auto space-y-5">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#C47D3B]/15 text-[#C47D3B]">
          <Compass className="h-8 w-8" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B]">
            404 • Lost Wanderer
          </span>
          <h1 className="mt-1 font-heading text-3xl sm:text-4xl font-bold text-[#231711] dark:text-white">
            Path Not Found
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#6B5B52] dark:text-[#B8ABA0] leading-relaxed">
            The page you are looking for has wandered off. Return to the main sanctuary and continue exploring our artisan menu.
          </p>
        </div>
        <div>
          <Button href="/" className="gap-2">
            Return to Cafe Home <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
