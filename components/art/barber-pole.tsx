import { useId } from 'react';

type PoleSize = 'sm' | 'md' | 'lg';

const DIMENSIONS: Record<PoleSize, { width: number; height: number }> = {
  sm: { width: 24, height: 72 },
  md: { width: 48, height: 148 },
  lg: { width: 80, height: 256 },
};

/**
 * Signature Barber Pole — glass cylinder with oxblood, cream and navy spiral stripes,
 * brass ball caps and a wrought wall bracket. Spins only when `open` is true and
 * prefers-reduced-motion is no-preference.
 */
export function BarberPole({
  open = false,
  size = 'md',
  mountSide = 'left',
  className = '',
}: {
  open?: boolean;
  size?: PoleSize;
  mountSide?: 'left' | 'right' | 'none';
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const { width, height } = DIMENSIONS[size];
  const clipId = `pole-clip-${uid}`;
  const brassId = `pole-brass-${uid}`;
  const glassId = `pole-glass-${uid}`;
  const stripeId = `pole-stripes-${uid}`;

  return (
    <svg
      viewBox="0 0 80 256"
      width={width}
      height={height}
      aria-hidden="true"
      data-open={open ? 'true' : 'false'}
      className={`barber-pole shrink-0 overflow-visible ${className}`}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="24" y="48" width="32" height="160" rx="2" />
        </clipPath>
        <linearGradient id={brassId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--gold-deep)" />
          <stop offset="32%" stopColor="var(--gold-bright)" />
          <stop offset="58%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
        <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="34%" stopColor="#FFFFFF" stopOpacity="0.06" />
          <stop offset="76%" stopColor="#000000" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.34" />
        </linearGradient>
        {/* Seamless vertical repeat: height=48px matches @keyframes barber-pole-scroll */}
        <pattern id={stripeId} width="64" height="48" patternUnits="userSpaceOnUse">
          <rect width="64" height="48" fill="#FBF5E8" />
          <path d="M-16,12 L80,-12 L80,0 L-16,24 Z" fill="var(--accent)" />
          <path d="M-16,36 L80,12 L80,24 L-16,48 Z" fill="var(--navy)" />
          <path d="M-16,60 L80,36 L80,48 L-16,72 Z" fill="var(--accent)" />
        </pattern>
      </defs>

      {/* Wall mounting bracket */}
      {mountSide !== 'none' && (
        <g
          transform={mountSide === 'right' ? 'translate(80 0) scale(-1 1)' : undefined}
          stroke="#23181A"
          strokeWidth="1.75"
        >
          <rect x="2" y="34" width="7" height="26" rx="2" fill={`url(#${brassId})`} />
          <path d="M9 43 H24 V51 H9 Z" fill={`url(#${brassId})`} />
          <rect x="2" y="196" width="7" height="26" rx="2" fill={`url(#${brassId})`} />
          <path d="M9 205 H24 V213 H9 Z" fill={`url(#${brassId})`} />
          <circle cx="5.5" cy="39" r="1.4" fill="#23181A" stroke="none" />
          <circle cx="5.5" cy="55" r="1.4" fill="#23181A" stroke="none" />
          <circle cx="5.5" cy="201" r="1.4" fill="#23181A" stroke="none" />
          <circle cx="5.5" cy="217" r="1.4" fill="#23181A" stroke="none" />
        </g>
      )}

      {/* Top brass ball finial and stepped cap */}
      <g stroke="#23181A" strokeWidth="1.75" strokeLinejoin="round">
        <circle cx="40" cy="14" r="9" fill={`url(#${brassId})`} />
        <rect x="35" y="22" width="10" height="5" fill={`url(#${brassId})`} />
        <path d="M22 40 C22 30 58 30 58 40 Z" fill={`url(#${brassId})`} />
        <rect x="19" y="40" width="42" height="8" rx="2" fill={`url(#${brassId})`} />
      </g>

      {/* Glass cylinder */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="24" y="48" width="32" height="160" fill="#FBF5E8" />
        <g className="barber-pole-stripes">
          <rect x="20" y="36" width="40" height="230" fill={`url(#${stripeId})`} />
        </g>
        {/* Cylindrical glass sheen & shading */}
        <rect x="24" y="48" width="32" height="160" fill={`url(#${glassId})`} />
        <rect x="29" y="54" width="3.5" height="148" rx="1.5" fill="#FFFFFF" opacity="0.52" />
      </g>
      <rect x="24" y="48" width="32" height="160" rx="2" fill="none" stroke="#23181A" strokeWidth="1.8" />

      {/* Bottom brass stepped cap and finial */}
      <g stroke="#23181A" strokeWidth="1.75" strokeLinejoin="round">
        <rect x="19" y="208" width="42" height="8" rx="2" fill={`url(#${brassId})`} />
        <path d="M22 216 C22 226 58 226 58 216 Z" fill={`url(#${brassId})`} />
        <rect x="35" y="227" width="10" height="5" fill={`url(#${brassId})`} />
        <circle cx="40" cy="240" r="8.5" fill={`url(#${brassId})`} />
      </g>
    </svg>
  );
}
