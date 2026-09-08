"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type AnimatedSectionProps = HTMLMotionProps<"section">;

export function AnimatedSection({ children, className = "", ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      {...props}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
