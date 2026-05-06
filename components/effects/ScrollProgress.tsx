'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-200 h-0.75 pointer-events-none"
      style={{ background: 'var(--glass-border)' }}
    >
      <div
        className="h-full transition-[width] duration-75 ease-linear"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, #f4b8c1, #c9a84c)',
        }}
      />
    </div>
  );
}
