import { useId } from 'react';

/**
 * Arched gold-leaf window-lettering wordmark for the Home hero.
 * "Straight Razor" in Ultra on a gentle arch with 3-stop gold gradient, ink keyline,
 * bright highlight, and "& Co." in Mr Dafoe script nestled beneath.
 */
export function WordmarkArch({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const archId = `wm-arch-${uid}`;
  const goldId = `wm-gold-${uid}`;
  const shimmerClip = `wm-shimmer-${uid}`;

  return (
    <svg
      viewBox="0 -10 440 138"
      className={`h-auto w-full max-w-[27rem] overflow-visible ${className}`}
      role="img"
      aria-label="Straight Razor & Co. Barbers, Est. 1958"
    >
      <defs>
        <path id={archId} d="M 18 78 Q 220 14 422 78" fill="none" />
        <linearGradient id={goldId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold-bright)" />
          <stop offset="48%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
        <linearGradient id={`${goldId}-beam`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFF7DA" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={shimmerClip}>
          <rect x="8" y="-4" width="424" height="128" />
        </clipPath>
      </defs>

      {/* Ornamental top filigree floating cleanly above arch */}
      <g fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="0.9">
        <path d="M182 4 Q201 -3 220 1 Q239 -3 258 4" fill="none" stroke="var(--gold)" strokeWidth="1.5" />
        <circle cx="220" cy="0" r="2.6" />
      </g>

      {/* Dark ink drop-shadow layer for gold leaf depth */}
      <text
        fontFamily="var(--font-display)"
        fontSize="37"
        letterSpacing="1.6"
        fill="#1B1012"
        transform="translate(2.5 3.5)"
        opacity="0.72"
      >
        <textPath href={`#${archId}`} startOffset="50%" textAnchor="middle">
          STRAIGHT RAZOR
        </textPath>
      </text>

      {/* Gold-leaf filled arched lettering with dark keyline */}
      <text
        fontFamily="var(--font-display)"
        fontSize="37"
        letterSpacing="1.6"
        fill={`url(#${goldId})`}
        stroke="#23181A"
        strokeWidth="1.8"
        paintOrder="stroke fill"
      >
        <textPath href={`#${archId}`} startOffset="50%" textAnchor="middle">
          STRAIGHT RAZOR
        </textPath>
      </text>

      {/* Thin top specular gold highlight */}
      <text
        fontFamily="var(--font-display)"
        fontSize="37"
        letterSpacing="1.6"
        fill="none"
        stroke="var(--gold-bright)"
        strokeWidth="0.6"
        opacity="0.7"
        transform="translate(0 -0.6)"
      >
        <textPath href={`#${archId}`} startOffset="50%" textAnchor="middle">
          STRAIGHT RAZOR
        </textPath>
      </text>

      {/* Script "& Co." nestled beneath arch */}
      <text
        x="220"
        y="94"
        textAnchor="middle"
        fontFamily="var(--font-script)"
        fontSize="34"
        fill="var(--accent-ink)"
      >
        &amp; Co.
      </text>

      {/* Hairline rules + small-caps Est. 1958 */}
      <g stroke="var(--gold)" strokeWidth="1.4">
        <line x1="20" y1="112" x2="108" y2="112" />
        <line x1="332" y1="112" x2="420" y2="112" />
        <polygon points="114,112 118,108 122,112 118,116" fill="var(--gold)" stroke="none" />
        <polygon points="318,112 322,108 326,112 322,116" fill="var(--gold)" stroke="none" />
      </g>
      <text
        x="220"
        y="116"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="12"
        fontWeight="700"
        letterSpacing="2.2"
        fill="var(--gold-text)"
      >
        BARBERS · EST. 1958
      </text>

      {/* Subtle one-shot gold shimmer sweep on load (no-preference only) */}
      <g clipPath={`url(#${shimmerClip})`} className="pointer-events-none">
        <rect
          className="gold-shimmer-beam"
          x="0"
          y="10"
          width="96"
          height="108"
          transform="skewX(-22)"
          fill={`url(#${goldId}-beam)`}
          opacity="0"
        />
      </g>
    </svg>
  );
}

/**
 * Flat single-line wordmark for the header and oxblood footer.
 */
export function WordmarkInline({
  tone = 'header',
  className = '',
}: {
  tone?: 'header' | 'footer';
  className?: string;
}) {
  const isFooter = tone === 'footer';
  return (
    <span className={`inline-flex items-baseline gap-1 leading-none sm:gap-1.5 ${className}`}>
      <span
        className={`font-display tracking-wide ${
          isFooter
            ? 'gold-leaf-text text-xl sm:text-2xl'
            : 'text-[0.95rem] text-ink sm:text-[1.28rem]'
        }`}
      >
        Straight Razor
      </span>
      <span
        className={`font-script leading-none ${
          isFooter
            ? 'text-2xl text-[#F8E2A1] sm:text-3xl'
            : 'text-[1.25rem] text-accent-ink sm:text-[1.75rem]'
        }`}
      >
        &amp; Co.
      </span>
    </span>
  );
}
