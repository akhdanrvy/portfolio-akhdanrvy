'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TbMail,
  TbBrandLinkedin,
  TbCopy,
  TbCheck,
  TbExternalLink,
  TbSend,
  TbX,
} from 'react-icons/tb';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTranslation } from '@/hooks/useTranslation';
import SectionPulse from '@/components/effects/SectionPulse';
import SakuraFall from '@/components/effects/SakuraFall';

/* ------------------------------------------------------------------ */
/* Toast                                                                */
/* ------------------------------------------------------------------ */
function Toast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent-gold/40 bg-accent-gold/15 text-accent-gold text-sm font-medium backdrop-blur-md shadow-lg"
        >
          <TbCheck size={16} /> Copied! ✓
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Form Modal                                                           */
/* ------------------------------------------------------------------ */
function FormModal({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(10,10,26,0.7)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: 'easeOut' as const }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <GlassCard glow>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
          >
            <TbX size={14} />
          </button>
          <div className="text-center pt-2 pr-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent-gold/10 border border-accent-gold/30 mx-auto mb-4">
              <TbSend size={20} className="text-accent-gold" />
            </div>
            <h3 className="font-heading text-lg font-bold text-white mb-3">Message Sent!</h3>
            <p className="text-sm text-white/65 leading-relaxed">{message}</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 rounded-full border border-accent-gold/40 bg-accent-gold/10 text-accent-gold text-sm hover:bg-accent-gold/20 transition-colors"
            >
              Got it
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                         */
/* ------------------------------------------------------------------ */
export default function ContactSection() {
  const { t } = useTranslation();
  const [toastVisible, setToastVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('akhdanravy@gmail.com');
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalVisible(true);
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
      <SectionPulse variant="pink-pink" topLeft="45%" topRight="55%" scale={0.9} />

      <SakuraFall />

      {/* ── background kanji watermark ────────────────────────── */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-heading text-[20vw] font-bold text-accent-gold opacity-[0.04] leading-none"
        style={{ writingMode: 'horizontal-tb', zIndex: 0 }}
      >
        連絡
      </span>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* ── section label ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-accent-pink font-medium">
            06 / CONTACT
          </span>
          <span className="h-px w-10 bg-accent-pink/40" />
        </motion.div>

        {/* ── heading ───────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl font-bold text-white mb-3"
        >
          {t('contact.title') as string}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white/55 mb-12 max-w-xl"
        >
          {t('contact.subtitle') as string}
        </motion.p>

        {/* ── contact cards ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {/* Email card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard glow className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-accent-pink/10 border border-accent-pink/20 shrink-0">
                  <TbMail size={20} className="text-accent-pink" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                    {t('contact.email_label') as string}
                  </p>
                  <p className="text-sm text-white font-medium truncate mb-3">
                    akhdanravy@gmail.com
                  </p>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <TbCopy size={13} /> Copy address
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* LinkedIn card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard glow className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-400/10 border border-blue-400/20 shrink-0">
                  <TbBrandLinkedin size={20} className="text-blue-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
                    {t('contact.linkedin_label') as string}
                  </p>
                  <p className="text-sm text-white font-medium mb-3">Akhdan Ravi Andaman</p>
                  <a
                    href="https://www.linkedin.com/in/akhdan-ravi-andaman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors w-fit"
                  >
                    <TbExternalLink size={13} /> Open profile
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ── contact form ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <GlassCard>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50 uppercase tracking-widest">
                    {t('contact.form.name') as string}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent-gold/60 focus:bg-white/8 transition-colors"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50 uppercase tracking-widest">
                    {t('contact.form.email') as string}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent-gold/60 focus:bg-white/8 transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 uppercase tracking-widest">
                  {t('contact.form.message') as string}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-accent-gold/60 focus:bg-white/8 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-gold text-bg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all"
                >
                  <TbSend size={16} />
                  {t('contact.form.submit') as string}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>

      {/* ── toast ─────────────────────────────────────────────── */}
      <Toast visible={toastVisible} />

      {/* ── form modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {modalVisible && (
          <FormModal
            message={t('contact.modal_message') as string}
            onClose={() => setModalVisible(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
