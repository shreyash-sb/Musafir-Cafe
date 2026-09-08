import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="min-h-12 w-full rounded-2xl border border-primary/10 bg-white px-4 text-sm font-medium text-cafe-text outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20 dark:border-white/10 dark:bg-white/10 dark:text-white"
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="min-h-32 w-full rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm font-medium text-cafe-text outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20 dark:border-white/10 dark:bg-white/10 dark:text-white"
    />
  );
}
