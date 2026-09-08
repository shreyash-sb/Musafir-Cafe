import { Coffee, Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-cafe-bg text-primary dark:bg-[#150B07] dark:text-white transition-colors">
      <div className="text-center space-y-4">
        <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent to-[#A86B20] text-primary shadow-xl shadow-accent/20 animate-pulse">
          <Compass className="h-8 w-8 text-primary animate-spin duration-[3000ms]" />
        </div>
        <div>
          <p className="font-heading text-xl font-bold text-primary dark:text-white">Musafir Cafe</p>
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.25em] mt-1">
            Preparing your brew...
          </p>
        </div>
      </div>
    </div>
  );
}
