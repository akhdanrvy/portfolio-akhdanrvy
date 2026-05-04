'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbArrowUp } from 'react-icons/tb';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import InnovationSection from '@/components/InnovationSection';
import CertificationSection from '@/components/CertificationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/effects/ScrollProgress';
import LoadingScreen from '@/components/effects/LoadingScreen';

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handler = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLoadComplete = () => {
    // Mark intro as played so HeroSection shows immediately, no KanjiRain overlap
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
        <ProjectsSection />
        <InnovationSection />
        <CertificationSection />
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
            className="fixed bottom-8 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/15 hover:border-accent-gold/50 transition-colors shadow-lg"
          >
            <TbArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
