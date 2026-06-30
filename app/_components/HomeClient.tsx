'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbArrowUp } from 'react-icons/tb';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import type { ProjectView } from '@/components/ProjectsSection';
import InnovationSection from '@/components/InnovationSection';
import CertificationSection from '@/components/CertificationSection';
import type { CertificationView } from '@/components/CertificationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/effects/ScrollProgress';
import LoadingScreen from '@/components/effects/LoadingScreen';

interface Props {
  projects: ProjectView[];
  certifications: CertificationView[];
}

export default function HomeClient({ projects, certifications }: Props) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLoadComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('introPlayed', '1');
    }
    setLoading(false);
  };

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onComplete={handleLoadComplete} />}</AnimatePresence>
      <ScrollProgress />
      <motion.main
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ position: 'relative' }}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection projects={projects} />
        <InnovationSection />
        <CertificationSection certifications={certifications} />
        <ContactSection />
      </motion.main>
      <Footer />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-8 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full border backdrop-blur-md transition-all shadow-lg"
            style={{
              background: 'var(--color-glass)',
              borderColor: 'var(--glass-border)',
              color: 'var(--color-text-muted)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-surface)';
              e.currentTarget.style.borderColor = 'var(--color-accent-gold)';
              e.currentTarget.style.color = 'var(--color-accent-gold)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--color-glass)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            <TbArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
