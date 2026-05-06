'use client';

import { TbBrandGithub, TbBrandLinkedin, TbMail } from 'react-icons/tb';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const rights = (t('footer.rights') as string).replace('{year}', String(year));
  const builtWith = t('footer.built_with') as string;

  return (
    <footer
      className="relative border-t border-(--glass-border)"
      style={{
        background: 'var(--color-bg-secondary)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* ── main bar ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* left — rights */}
        <p className="text-xs text-(--color-text-muted) order-2 sm:order-1">{rights}</p>

        {/* center — RVY logo */}
        <a
          href="#hero"
          className="font-heading text-base font-bold tracking-widest text-(--color-text-muted) hover:text-(--color-text) transition-colors order-1 sm:order-2"
          aria-label="Back to top"
        >
          RVY
          <span className="inline-block w-1 h-1 rounded-full bg-accent-gold ml-0.5 align-middle" />
        </a>

        {/* right — social icons */}
        <div className="flex items-center gap-3 order-3">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-(--glass-border) text-(--color-text-muted) hover:text-(--color-accent-gold) hover:border-(--glass-border) transition-colors"
          >
            <TbBrandGithub size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/akhdan-ravi-andaman/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-(--glass-border) text-(--color-text-muted) hover:text-(--color-accent-gold) hover:border-(--glass-border) transition-colors"
          >
            <TbBrandLinkedin size={15} />
          </a>
          <a
            href="mailto:akhdanravy@gmail.com"
            aria-label="Email"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-(--glass-border) text-(--color-text-muted) hover:text-(--color-accent-gold) hover:border-(--glass-border) transition-colors"
          >
            <TbMail size={15} />
          </a>
        </div>
      </div>

      {/* ── built-with line ────────────────────────────────────── */}
      <div className="border-t border-(--glass-border) py-3 text-center">
        <p className="text-xs text-(--color-text-muted)">{builtWith}</p>
      </div>
    </footer>
  );
}
