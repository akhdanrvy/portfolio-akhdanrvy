"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface Props {
  id: string;
  label: string;
  deleteAction: (
    id: string
  ) => Promise<{ success: boolean; error?: string; [key: string]: unknown }>;
}

export function DeleteButton({ id, label, deleteAction }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  async function handleConfirm(): Promise<string | null> {
    const result = await deleteAction(id);
    if (result.success) {
      router.refresh();
      setIsOpen(false);
      return null;
    }
    return (result.error as string | undefined) ?? "Gagal menghapus data";
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm text-(--color-text-muted) hover:text-red-400 transition-colors duration-150"
      >
        Hapus
      </button>

      <AnimatePresence>
        {isOpen && (
          <DeleteConfirmModal
            itemName={label}
            onClose={() => setIsOpen(false)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>
    </>
  );
}
