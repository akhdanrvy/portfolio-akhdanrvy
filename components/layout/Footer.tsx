"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/akhdanrvy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akhdan-ravi-andaman/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const footerLinks = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-dark-primary">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="section-container py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-mono text-xs text-neon-cyan/60 select-none">&lt;</span>
              <span className="font-display text-lg font-semibold text-text-primary group-hover:text-neon-cyan transition-colors duration-300">
                ARA
              </span>
              <span className="font-mono text-xs text-neon-cyan/60 select-none">/&gt;</span>
            </Link>
            <p className="font-mono text-xs text-text-muted text-center md:text-left">
              Building experiences across every screen.
            </p>
          </div>

          {/* Nav Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-body text-sm text-text-secondary hover:text-neon-cyan transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-sm border border-white/8",
                  "text-text-secondary transition-all duration-300",
                  "hover:text-neon-cyan hover:border-neon-cyan/40 hover:shadow-[0_0_12px_rgba(0,245,255,0.15)]",
                  "hover:-translate-y-0.5"
                )}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-8 flex flex-col items-center gap-2 border-t border-white/4 pt-8 md:flex-row md:justify-between">
          <p className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} Akhdan Ravi Andaman. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-muted">
            Built with{" "}
            <span className="text-neon-cyan/60">Next.js</span>
            {" · "}
            <span className="text-neon-cyan/60">TypeScript</span>
            {" · "}
            <span className="text-neon-cyan/60">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
