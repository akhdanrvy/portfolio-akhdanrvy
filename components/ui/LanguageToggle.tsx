'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="relative flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 backdrop-blur-md">
      {(['en', 'id'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className="relative z-10 px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-colors duration-200"
          style={{
            color: language === lang ? '#0a0a1a' : 'rgba(255,255,255,0.45)',
          }}
        >
          {language === lang && (
            <motion.span
              layoutId="lang-toggle-pill"
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, #f4b8c1 0%, #c9a84c 100%)' }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{lang.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
