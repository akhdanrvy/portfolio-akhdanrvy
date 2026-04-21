"use client";

import { cn } from "@/lib/utils";

interface NeonBadgeProps {
  label: string;
  color?: "cyan" | "magenta" | "amber";
  size?: "sm" | "md";
}

const colorMap = {
  cyan: {
    border: "border-neon-cyan/40",
    text: "text-neon-cyan",
    bg: "bg-neon-cyan/5",
    glow: "shadow-[0_0_8px_rgba(0,245,255,0.2)]",
  },
  magenta: {
    border: "border-neon-magenta/40",
    text: "text-neon-magenta",
    bg: "bg-neon-magenta/5",
    glow: "shadow-[0_0_8px_rgba(255,0,144,0.2)]",
  },
  amber: {
    border: "border-neon-amber/40",
    text: "text-neon-amber",
    bg: "bg-neon-amber/5",
    glow: "shadow-[0_0_8px_rgba(255,183,0,0.2)]",
  },
};

const sizeMap = {
  sm: "px-2 py-0.5 text-[10px] tracking-wider",
  md: "px-3 py-1 text-xs tracking-wider",
};

export default function NeonBadge({
  label,
  color = "cyan",
  size = "md",
}: NeonBadgeProps) {
  const styles = colorMap[color];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border font-mono font-medium uppercase",
        "transition-all duration-300 hover:scale-105",
        styles.border,
        styles.text,
        styles.bg,
        styles.glow,
        sizeMap[size]
      )}
    >
      {label}
    </span>
  );
}
