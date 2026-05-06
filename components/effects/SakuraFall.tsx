'use client';

import { useTheme } from '@/hooks/useTheme';

/* ------------------------------------------------------------------ */
/* SakuraFall — floating sakura petals background effect               */
/* ------------------------------------------------------------------ */

const PETALS = [
  { left: '8%',  delay: '0s',    dur: '7s',   size: 18, rot: 25  },
  { left: '18%', delay: '1.2s',  dur: '9s',   size: 14, rot: -15 },
  { left: '32%', delay: '0.5s',  dur: '8s',   size: 20, rot: 40  },
  { left: '47%', delay: '2.1s',  dur: '6.5s', size: 12, rot: -30 },
  { left: '60%', delay: '0.8s',  dur: '10s',  size: 16, rot: 10  },
  { left: '72%', delay: '1.8s',  dur: '7.5s', size: 22, rot: -45 },
  { left: '83%', delay: '3s',    dur: '8.5s', size: 15, rot: 20  },
  { left: '93%', delay: '1.5s',  dur: '9.5s', size: 13, rot: -20 },
];

function SakuraPetal({ size, isLight }: { size: number; isLight: boolean }) {
  const petalFill    = isLight ? '#8a3a42' : '#f4b8c1';
  const petalOpacity = isLight ? '0.35'    : '0.55';
  const veinStroke   = isLight ? '#8a6a2a' : '#c9a84c';
  const veinOpacity  = isLight ? '0.35'    : '0.40';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2 C8 2 4 6 4 10 C4 14 8 16 12 22 C16 16 20 14 20 10 C20 6 16 2 12 2Z"
        fill={petalFill}
        opacity={petalOpacity}
      />
      <path
        d="M12 4 C10 7 8 9 9 12"
        stroke={veinStroke}
        strokeWidth="0.5"
        opacity={veinOpacity}
      />
    </svg>
  );
}

export default function SakuraFall() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  return (
    <>
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-40px) rotate(0deg);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .sakura-petal {
          position: absolute;
          top: 0;
          animation: petalFall linear infinite;
          pointer-events: none;
        }
      `}</style>

      {PETALS.map((p, i) => (
        <span
          key={i}
          className="sakura-petal"
          style={{
            left: p.left,
            animationDuration: p.dur,
            animationDelay: p.delay,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <SakuraPetal size={p.size} isLight={isLight} />
        </span>
      ))}
    </>
  );
}
