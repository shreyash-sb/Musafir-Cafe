"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-[2.25rem] border border-accent/25 bg-[#FBF8F3] p-6 md:p-8 shadow-2xl dark:bg-[#1A0E08] text-primary dark:text-white"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/10 text-primary hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
