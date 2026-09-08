import { timeline } from "@/data/site";
import { Compass } from "lucide-react";

export function Timeline() {
  return (
    <div className="relative space-y-6 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-accent/30">
      {timeline.map((item) => (
        <article
          key={item.year}
          className="relative flex items-start gap-5 rounded-[2rem] border border-primary/10 bg-white p-6 shadow-xl shadow-primary/5 dark:border-white/10 dark:bg-[#1E110A] ml-2"
        >
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-accent text-primary shrink-0 shadow-md">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl font-bold text-accent">{item.year}</span>
              <h3 className="text-lg font-bold text-primary dark:text-white">{item.title}</h3>
            </div>
            <p className="mt-2 text-xs md:text-sm leading-relaxed text-cafe-muted dark:text-white/70">
              {item.text}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
