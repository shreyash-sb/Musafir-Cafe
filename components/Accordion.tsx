"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item.question} className="rounded-3xl border border-primary/10 bg-white p-5 dark:border-white/10 dark:bg-white/10">
          <button className="flex w-full items-center justify-between gap-4 text-left font-bold text-primary dark:text-white" onClick={() => setOpen(open === index ? -1 : index)}>
            {item.question}
            <ChevronDown className={`h-5 w-5 transition ${open === index ? "rotate-180" : ""}`} />
          </button>
          {open === index && <p className="mt-4 text-sm leading-7 text-cafe-muted dark:text-white/70">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
}
