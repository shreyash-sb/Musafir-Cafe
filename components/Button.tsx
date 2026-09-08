import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "accent";
};

const styles = {
  primary: "bg-accent text-primary shadow-xl shadow-accent/20 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]",
  secondary: "border border-accent/40 bg-white/80 text-primary hover:border-accent hover:bg-accent/15 dark:bg-[#1E110A] dark:text-white dark:hover:bg-white/10",
  ghost: "text-primary hover:bg-primary/5 dark:text-white dark:hover:bg-white/10",
  accent: "bg-primary text-white hover:bg-secondary dark:bg-white/15 dark:text-white dark:hover:bg-accent dark:hover:text-primary"
};

export function Button({ href, variant = "primary", className = "", children, ...props }: ButtonProps) {
  const shared = `inline-flex min-h-12 items-center justify-center rounded-full px-6 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={shared}>
        {children}
      </Link>
    );
  }

  return (
    <button className={shared} {...props}>
      {children}
    </button>
  );
}
