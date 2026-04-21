"use client";

import { cn } from "@/lib/utils";

interface SectionTitleProps {
  prefix?: string;
  title: string;
  kanji?: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  prefix = "// ",
  title,
  kanji,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("relative mb-12 md:mb-16 flex flex-col items-center text-center", className)}>
      {/* Prefix + Title */}
      <div className="flex items-baseline justify-center gap-2">
        {prefix && (
          <span className="font-mono text-neon-cyan text-sm md:text-base font-medium select-none">
            {prefix}
          </span>
        )}
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight">
          {title}
        </h2>

        {/* Kanji decoration inline */}
        {kanji && (
          <span className="ml-3 font-display text-2xl md:text-3xl text-neon-cyan/20 select-none hidden sm:inline">
            {kanji}
          </span>
        )}
      </div>

      {/* Decorative line */}
      <div className="mt-4 flex items-center justify-center gap-3 w-full max-w-sm">
        <div className="h-px flex-1 bg-white/4" />
        <div className="h-px w-4 bg-neon-cyan/30" />
        <div className="h-px w-12 bg-neon-cyan/60" />
        <div className="h-px w-4 bg-neon-cyan/30" />
        <div className="h-px flex-1 bg-white/4" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 max-w-xl font-body text-sm md:text-base text-text-secondary leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
