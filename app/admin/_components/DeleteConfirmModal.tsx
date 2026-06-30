"use client";

import { useEffect, useTransition, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface DeleteConfirmModalProps {
  itemName: string;
  onClose: () => void;
  /** Return null on success, error message string on failure */
  onConfirm: () => Promise<string | null>;
}

export function DeleteConfirmModal({
  itemName,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  /* Escape key closes modal */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isPending) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, isPending]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      const errMsg = await onConfirm();
      if (errMsg !== null) {
        setError(errMsg);
      }
      // on success, parent closes the modal via AnimatePresence
    });
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "rgba(10, 10, 26, 0.65)",
      }}
      onClick={() => { if (!isPending) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard noAnimatedBorder>
          {/* Header row */}
          <div className="flex items-start gap-3 mb-4">
            {/* Warning icon */}
            <div className="mt-0.5 w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border border-red-500/40 bg-red-500/10">
              <span className="text-red-400 font-bold text-sm leading-none">!</span>
            </div>
            <div>
              <h2 className="font-heading text-base font-bold text-(--color-text) leading-snug">
                Hapus item ini?
              </h2>
              <p className="text-xs text-(--color-text-muted) mt-0.5">
                Tindakan ini tidak bisa dibatalkan.
              </p>
            </div>
          </div>

          {/* Item name highlight */}
          <div className="rounded-lg border border-(--glass-border) bg-(--color-surface) px-4 py-3 mb-5">
            <p className="text-sm font-semibold text-(--color-text) break-words">
              {itemName}
            </p>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="rounded-lg border border-accent-pink/30 bg-accent-pink/10 px-3 py-2 text-xs text-accent-pink">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className={cn(
                "flex-1 rounded-lg px-4 py-2.5 text-sm",
                "border border-(--glass-border)",
                "text-(--color-text-muted) hover:text-(--color-text)",
                "hover:border-accent-gold/40 transition-colors duration-150",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={handleConfirm}
              className={cn(
                "flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold",
                "bg-red-600/80 hover:bg-red-600 text-white",
                "transition-colors duration-150",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {isPending ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>,
    document.body
  );
}
