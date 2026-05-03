"use client";

import { useEffect, useRef } from "react";

/**
 * SectionPulse — ambient orb pair (left + right) with slow pulse animation.
 * Rendered as position:absolute children inside a `relative overflow-hidden` section.
 *
 * variant:
 *  "pink-gold"  → left: pink,  right: gold   (default — odd sections)
 *  "gold-pink"  → left: gold,  right: pink   (even sections)
 *  "pink-pink"  → both pink
 *  "gold-gold"  → both gold
 */

type Variant = "pink-gold" | "gold-pink" | "pink-pink" | "gold-gold";

interface Props {
  variant?: Variant;
  /** vertical position of the orbs, default "50%" */
  topLeft?: string;
  topRight?: string;
  /** scale of the orb radii, default 1 */
  scale?: number;
}

const PINK = "rgba(244,184,193,";
const GOLD = "rgba(201,168,76,";

function orb(color: string) {
  return {
    inner: `${color}0.10)`,
    mid:   `${color}0.05)`,
    outer: `${color}0.00)`,
  };
}

export default function SectionPulse({
  variant = "pink-gold",
  topLeft  = "50%",
  topRight = "50%",
  scale    = 1,
}: Props) {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  /* stagger animation offset so left and right pulse at different phases */
  useEffect(() => {
    if (rightRef.current) {
      rightRef.current.style.animationDelay = "-1.8s";
    }
  }, []);

  const [lColor, rColor] = {
    "pink-gold": [PINK, GOLD],
    "gold-pink": [GOLD, PINK],
    "pink-pink": [PINK, PINK],
    "gold-gold": [GOLD, GOLD],
  }[variant];

  const lOrb = orb(lColor);
  const rOrb = orb(rColor);

  const w = Math.round(420 * scale);
  const h = Math.round(360 * scale);

  const baseStyle = (c: typeof lOrb): React.CSSProperties => ({
    position: "absolute",
    width: `${w}px`,
    height: `${h}px`,
    borderRadius: "50%",
    pointerEvents: "none",
    background: `radial-gradient(ellipse at center, ${c.inner} 0%, ${c.mid} 40%, ${c.outer} 70%)`,
    animation: "sectionPulse 5s ease-in-out infinite",
    willChange: "transform, opacity",
    zIndex: 0,
  });

  return (
    <>
      {/* Left orb */}
      <div
        ref={leftRef}
        aria-hidden="true"
        style={{
          ...baseStyle(lOrb),
          left:      `-${Math.round(w * 0.45)}px`,
          top:       topLeft,
          transform: "translateY(-50%)",
        }}
      />

      {/* Right orb */}
      <div
        ref={rightRef}
        aria-hidden="true"
        style={{
          ...baseStyle(rOrb),
          right:     `-${Math.round(w * 0.45)}px`,
          top:       topRight,
          transform: "translateY(-50%)",
        }}
      />

      {/* Keyframe injected once */}
      <style>{`
        @keyframes sectionPulse {
          0%, 100% { opacity: 0.55; transform: translateY(-50%) scale(1);    }
          50%       { opacity: 1.00; transform: translateY(-50%) scale(1.18); }
        }
      `}</style>
    </>
  );
}
