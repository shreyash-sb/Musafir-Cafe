import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#FAF7F2] text-[#231711] dark:bg-[#160F0C] dark:text-white transition-colors">
      <div className="text-center space-y-3">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#C47D3B] text-white shadow-md">
          <Compass className="h-6 w-6 animate-spin duration-[3000ms]" />
        </div>
        <div>
          <p className="font-heading text-lg font-bold text-[#231711] dark:text-white">Musafir Cafe</p>
          <p className="text-[11px] font-semibold text-[#C47D3B] uppercase tracking-[0.2em] mt-0.5">
            Preparing your brew...
          </p>
        </div>
      </div>
    </div>
  );
}
