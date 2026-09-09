import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-[#C47D3B] text-white hover:bg-[#B36E2E] shadow-md shadow-[#C47D3B]/20 active:scale-[0.98]",
  secondary: "bg-[#231711] text-white hover:bg-[#3A251C] shadow-sm active:scale-[0.98] dark:bg-[#FAF7F2] dark:text-[#231711] dark:hover:bg-white",
  outline: "border border-[#C47D3B]/40 bg-transparent text-[#C47D3B] hover:bg-[#C47D3B]/10 dark:text-[#E2AC65] dark:border-[#C47D3B]/50",
  ghost: "text-[#231711] hover:bg-[#231711]/5 dark:text-white dark:hover:bg-white/10"
};

const sizes = {
  sm: "min-h-9 px-3.5 text-xs font-semibold rounded-full",
  md: "min-h-11 px-5 text-xs sm:text-sm font-semibold rounded-full",
  lg: "min-h-13 px-7 text-sm sm:text-base font-semibold rounded-full"
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseStyles} {...props}>
      {children}
    </button>
  );
}
