"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
};

export function Modal({ open, onClose, children, maxWidth = "max-w-2xl" }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Click */}
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative my-8 w-full ${maxWidth} overflow-hidden rounded-3xl border border-[#231711]/10 bg-[#FAF7F2] p-6 sm:p-8 shadow-2xl dark:border-white/10 dark:bg-[#1E1410] text-[#231711] dark:text-[#F7F2EC] z-10`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#231711]/5 text-[#231711]/70 hover:bg-[#231711]/10 dark:bg-white/10 dark:text-white/70 dark:hover:bg-white/20 transition"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
