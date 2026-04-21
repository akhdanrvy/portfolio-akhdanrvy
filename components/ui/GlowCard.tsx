"use client";

import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  accentColor?: string;
  className?: string;
  hoverable?: boolean;
}

export default function GlowCard({
  children,
  accentColor = "#00f5ff",
  className,
  hoverable = true,
}: GlowCardProps) {
  const glowRgb = hexToRgb(accentColor);
  const glowStyle = glowRgb
    ? {
        "--glow-color": `${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}`,
        "--accent-color": accentColor,
      } as React.CSSProperties
    : undefined;

  return (
    <div
      style={glowStyle}
      className={cn(
        "relative rounded-lg border border-white/6 bg-dark-card p-6",
        "transition-all duration-500",
        hoverable && [
          "group cursor-pointer",
          "hover:border-(--accent-color)/30",
          "hover:shadow-[0_0_24px_rgba(var(--glow-color),0.15),0_0_48px_rgba(var(--glow-color),0.05)]",
          "hover:-translate-y-1",
        ],
        className
      )}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-t-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
      />
      {children}
    </div>
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
