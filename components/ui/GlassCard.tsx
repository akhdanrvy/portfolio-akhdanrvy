import React, { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Extra Tailwind / custom classes */
  className?: string;
  /** Elevate the glow on hover (adds pink glow shadow) */
  glow?: boolean;
  /** Remove the default padding so you can control it yourself */
  noPadding?: boolean;
  /** Render as a <section> instead of <div> */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer";
  /** Disable the sweeping animated border */
  noAnimatedBorder?: boolean;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      children,
      glow = false,
      noPadding = false,
      noAnimatedBorder = false,
      as: Tag = "div",
      ...props
    },
    ref,
  ) => {
    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          /* ─── Identity class (used for CSS-theme overrides) ── */
          "glass-card",

          /* ─── Glass base ─────────────────────────────── */
          "relative overflow-hidden",
          "rounded-(--radius-glass)",
          "border border-(--glass-border)",
          "bg-(--color-glass)",
          "backdrop-blur-(--glass-blur)",
          "[box-shadow:var(--shadow-glass)]",

          /* ─── Washi paper pseudo-texture ─────────────── */
          "before:pointer-events-none before:absolute before:inset-0",
          "before:rounded-[inherit]",
          "before:bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='washi'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23washi)' opacity='0.04'/%3E%3C/svg%3E\")]",
          "before:z-0",

          /* ─── Top highlight edge ──────────────────────── */
          "after:pointer-events-none after:absolute after:inset-x-0 after:top-0",
          "after:h-px after:rounded-t-[inherit]",
          "after:bg-linear-to-r after:from-transparent after:via-white/20 after:to-transparent",
          "after:z-1",

          /* ─── Theme-aware transitions ────────────────── */
          "[transition:background_0.4s_ease,border-color_0.4s_ease,box-shadow_0.4s_ease]",
          "hover:bg-(--color-glass-hover)",
          "hover:border-(--glass-border)",
          "hover:[box-shadow:var(--shadow-glass),var(--shadow-glow-pink)]",

          /* ─── Optional glow (stronger) ──────────────────── */
          glow && "hover:[box-shadow:var(--shadow-glass),0_0_32px_rgba(244,184,193,0.30)]",

          /* ─── Padding ────────────────────────────────── */
          !noPadding && "p-6 md:p-8",

          className,
        )}
        {...props}
      >
        {/* Animated sweeping border */}
        {!noAnimatedBorder && <span aria-hidden className="glass-animated-border" />}
        {/* Ensure children sit above pseudo-element layers */}
        <div className="relative z-2">{children}</div>
      </Tag>
    );
  },
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps };
