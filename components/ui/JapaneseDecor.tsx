"use client";

import { cn } from "@/lib/utils";

interface JapaneseDecorProps {
  text: string;
  position?: "left" | "right";
  opacity?: number;
  className?: string;
}

export default function JapaneseDecor({
  text,
  position = "right",
  opacity = 0.06,
  className,
}: JapaneseDecorProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 -translate-y-1/2 z-0 select-none",
        position === "left" ? "left-4 md:left-8" : "right-4 md:right-8",
        className
      )}
      aria-hidden="true"
    >
      <div
        className="flex flex-col items-center gap-2"
        style={{ opacity }}
      >
        {/* Vertical line above */}
        <div className="w-px h-16 bg-neon-cyan" />

        {/* Characters — one per column block */}
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-neon-cyan leading-none"
            style={{ writingMode: "vertical-rl" }}
          >
            {char}
          </span>
        ))}

        {/* Vertical line below */}
        <div className="w-px h-16 bg-neon-cyan" />
      </div>
    </div>
  );
}
