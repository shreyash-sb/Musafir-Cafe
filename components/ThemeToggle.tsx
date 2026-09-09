"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="grid h-9 w-9 place-items-center rounded-full border border-[#231711]/10 bg-white/80 text-[#231711] transition hover:border-[#C47D3B] hover:text-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-[#E2AC65]"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
