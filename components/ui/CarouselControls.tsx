"use client";

import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { cn } from "@/lib/utils";

interface CarouselControlsProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  accent?: "gold" | "pink";
  className?: string;
}

export function CarouselControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  onSelect,
  accent = "gold",
  className,
}: CarouselControlsProps) {
  if (total <= 1) return null;

  const isGold = accent === "gold";

  return (
    <div
      className={cn(
        "flex md:hidden items-center justify-center gap-4 mt-6 select-none",
        className
      )}
    >
      {/* Prev Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={currentIndex === 0}
        aria-label="Previous card"
        className={cn(
          "w-9 h-9 rounded-full border border-(--glass-border) bg-(--color-glass) backdrop-blur-md flex items-center justify-center text-(--color-text)",
          "transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
          isGold
            ? "hover:border-accent-gold/60 hover:text-accent-gold active:scale-95"
            : "hover:border-accent-pink/60 hover:text-accent-pink active:scale-95"
        )}
      >
        <TbChevronLeft size={18} />
      </button>

      {/* Dots Indicator */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer",
              currentIndex === i
                ? isGold
                  ? "w-6 bg-accent-gold shadow-[0_0_8px_rgba(201,168,76,0.5)]"
                  : "w-6 bg-accent-pink shadow-[0_0_8px_rgba(244,184,193,0.5)]"
                : "w-2 bg-(--color-text-muted)/30 hover:bg-(--color-text-muted)/60"
            )}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={currentIndex === total - 1}
        aria-label="Next card"
        className={cn(
          "w-9 h-9 rounded-full border border-(--glass-border) bg-(--color-glass) backdrop-blur-md flex items-center justify-center text-(--color-text)",
          "transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed",
          isGold
            ? "hover:border-accent-gold/60 hover:text-accent-gold active:scale-95"
            : "hover:border-accent-pink/60 hover:text-accent-pink active:scale-95"
        )}
      >
        <TbChevronRight size={18} />
      </button>
    </div>
  );
}
