"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SectionTitle from "@/components/ui/SectionTitle";
import JapaneseDecor from "@/components/ui/JapaneseDecor";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  message: string;
}

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

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    await new Promise((res) => setTimeout(res, 1400));
    setFormState("success");
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setFormState("idle"), 5000);
  };

  const inputClass = cn(
    "w-full rounded-sm border border-white/[0.08] bg-dark-secondary px-4 py-3",
    "font-body text-sm text-text-primary placeholder:text-text-muted",
    "transition-all duration-300 outline-none",
    "focus:border-neon-cyan/60 focus:shadow-[0_0_0_1px_rgba(0,245,255,0.15),0_0_16px_rgba(0,245,255,0.08)]"
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "#050508" }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Glow blobs */}
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-neon-cyan/3 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-[300px] w-[300px] rounded-full bg-neon-magenta/3 blur-[100px] pointer-events-none" />

      <JapaneseDecor text="連絡" position="right" opacity={0.05} />

      <div className="section-container relative z-10">
        <SectionTitle
          prefix="// "
          title="CONTACT"
          kanji="連絡"
          subtitle="Have a project in mind? Let's connect."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Tagline + social */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-8"
          >
            <div>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight mb-4">
                Let&apos;s build something{" "}
                <span className="text-gradient-cyan">great.</span>
              </h3>
              <p className="font-body text-base text-text-secondary leading-8">
                I&apos;m currently open to new opportunities — whether it&apos;s a full-time role,
                freelance project, or just a cool idea you want to explore. My inbox is always open.
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-2">
                Email
              </p>
              <a
                href="mailto:akhdan@example.com"
                className="font-mono text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors duration-200 underline underline-offset-4 decoration-neon-cyan/30"
              >
                akhdan@example.com
              </a>
            </div>

            {/* Social */}
            <div>
              <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">
                Find Me Online
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "flex items-center gap-2 rounded-sm border border-white/8 px-4 py-2.5",
                      "font-body text-xs text-text-secondary",
                      "transition-all duration-300",
                      "hover:text-neon-cyan hover:border-neon-cyan/40 hover:shadow-[0_0_12px_rgba(0,245,255,0.12)]",
                      "hover:-translate-y-0.5"
                    )}
                  >
                    {icon}
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 rounded-xl border border-white/6 bg-dark-card p-8 md:p-10"
              noValidate
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="font-mono text-xs text-text-muted tracking-widest uppercase">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  disabled={formState === "loading" || formState === "success"}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="font-mono text-xs text-text-muted tracking-widest uppercase">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  disabled={formState === "loading" || formState === "success"}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-mono text-xs text-text-muted tracking-widest uppercase">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className={cn(inputClass, "resize-none")}
                  disabled={formState === "loading" || formState === "success"}
                />
              </div>

              {/* Submit */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className={cn(
                  "mt-2 w-full rounded-sm py-3.5 font-body text-sm font-semibold",
                  "transition-all duration-300",
                  formState === "success"
                    ? "bg-neon-amber/20 text-neon-amber border border-neon-amber/40 cursor-default"
                    : formState === "loading"
                    ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 cursor-wait"
                    : "bg-neon-cyan text-dark-primary hover:shadow-[0_0_24px_rgba(0,245,255,0.4)] hover:scale-[1.02] active:scale-100"
                )}
              >
                {formState === "loading" && "Sending…"}
                {formState === "success" && "✓ Message Sent!"}
                {formState === "error"   && "Failed — Try Again"}
                {formState === "idle"    && "Send Message"}
              </button>

              {/* Success message */}
              {formState === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center font-mono text-xs text-neon-amber"
                >
                  Thanks! I&apos;ll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
