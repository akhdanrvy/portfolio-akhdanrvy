"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark-primary/80 backdrop-blur-md border-b border-white/6 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      )}
    >
      <nav className="section-container flex items-center justify-between py-4">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          onClick={() => setActiveLink("")}
        >
          <span className="font-mono text-xs text-neon-cyan/60 select-none">&lt;</span>
          <span className="font-display text-lg font-semibold text-text-primary tracking-wide group-hover:text-neon-cyan transition-colors duration-300">
            ARA
          </span>
          <span className="font-mono text-xs text-neon-cyan/60 select-none">/&gt;</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNavClick(href)}
                className={cn(
                  "relative font-body text-sm font-medium transition-colors duration-300",
                  "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-neon-cyan",
                  "after:transition-all after:duration-300 hover:after:w-full",
                  activeLink === href
                    ? "text-neon-cyan"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={() => handleNavClick("#contact")}
          className={cn(
            "hidden md:inline-flex items-center gap-2 rounded-sm border border-neon-cyan/40 px-4 py-2",
            "font-mono text-xs text-neon-cyan tracking-widest uppercase",
            "transition-all duration-300",
            "hover:bg-neon-cyan/10 hover:border-neon-cyan/70 hover:shadow-[0_0_16px_rgba(0,245,255,0.15)]"
          )}
        >
          Hire Me
        </a>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          aria-label="Toggle mobile menu"
          aria-expanded={menuOpen}
          className="flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className={cn(
              "block h-px w-6 bg-text-primary transition-all duration-300",
              menuOpen && "translate-y-2.5 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-text-primary transition-all duration-300",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-text-primary transition-all duration-300",
              menuOpen && "-translate-y-2.5 -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-white/6",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="flex flex-col gap-1 bg-dark-secondary/95 backdrop-blur-md px-4 py-4">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => handleNavClick(href)}
                className={cn(
                  "block rounded-sm px-4 py-3 font-body text-sm font-medium transition-colors duration-200",
                  activeLink === href
                    ? "text-neon-cyan bg-neon-cyan/5"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/3"
                )}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="mt-2 pt-2 border-t border-white/6">
            <a
              href="#contact"
              onClick={() => handleNavClick("#contact")}
              className="block text-center rounded-sm border border-neon-cyan/40 px-4 py-2.5 font-mono text-xs text-neon-cyan tracking-widest uppercase hover:bg-neon-cyan/10 transition-colors duration-200"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
