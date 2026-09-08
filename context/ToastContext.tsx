"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Toast = { id: number; message: string; type?: "success" | "info" };
type ToastContextValue = { notify: (message: string, type?: "success" | "info") => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: "success" | "info" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3500);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex min-w-72 items-center gap-3 rounded-2xl border border-accent/20 bg-white/95 px-5 py-4 text-sm font-semibold text-primary shadow-2xl shadow-primary/10 backdrop-blur-xl dark:border-accent/30 dark:bg-[#1A0F0A]/95 dark:text-white glow-gold-sm"
              role="status"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="flex-1">{toast.message}</span>
              <button
                aria-label="Dismiss notification"
                className="text-cafe-muted hover:text-accent transition p-1"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
