import { useId } from 'react';

/**
 * Full-width 10px diagonal oxblood, cream and navy barber-pole stripe rule.
 */
export function PoleStripeRule({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const patId = `pole-rule-${uid}`;
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg className="block h-[10px] w-full" preserveAspectRatio="none">
        <defs>
          <pattern id={patId} width="36" height="10" patternUnits="userSpaceOnUse">
            <rect width="36" height="10" fill="#FBF5E8" />
            <polygon points="-4,10 6,0 16,0 6,10" fill="var(--accent)" />
            <polygon points="14,10 24,0 34,0 24,10" fill="var(--navy)" />
            <polygon points="32,10 42,0 52,0 42,10" fill="var(--accent)" />
          </pattern>
        </defs>
        <rect width="100%" height="10" fill={`url(#${patId})`} />
        <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="var(--gold)" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="9.5" x2="100%" y2="9.5" stroke="#23181A" strokeWidth="1" opacity="0.45" />
      </svg>
    </div>
  );
}

/**
 * Vertical pole stripe rule used as the spine of "The ritual" hot-towel timeline.
 */
export function VerticalPoleSpine({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const patId = `vpole-${uid}`;
  return (
    <svg className={`h-full w-[10px] ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={patId} width="10" height="36" patternUnits="userSpaceOnUse">
          <rect width="10" height="36" fill="#FBF5E8" />
          <polygon points="0,-4 10,6 10,16 0,6" fill="var(--accent)" />
          <polygon points="0,14 10,24 10,34 0,24" fill="var(--navy)" />
          <polygon points="0,32 10,42 10,52 0,42" fill="var(--accent)" />
        </pattern>
      </defs>
      <rect width="10" height="100%" fill={`url(#${patId})`} />
      <rect x="0.5" y="0" width="9" height="100%" fill="none" stroke="var(--gold)" strokeWidth="1" />
    </svg>
  );
}

/**
 * Engraved open straight razor lying along a hairline rule with gold scroll flourishes.
 */
export function StraightRazorDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 420 44" className="h-9 w-full max-w-[26rem] overflow-visible">
        {/* Left hairline & gold scroll flourish */}
        <line x1="6" y1="22" x2="128" y2="22" stroke="var(--gold)" strokeWidth="1.4" />
        <path
          d="M128 22 C116 22 114 11 103 11 C94 11 94 20 101 20 C105 20 106 16 103 15"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M128 22 C116 22 114 33 103 33 C94 33 94 24 101 24 C105 24 106 28 103 29"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="88" cy="22" r="2.2" fill="var(--gold)" />

        {/* Right hairline & gold scroll flourish */}
        <line x1="292" y1="22" x2="414" y2="22" stroke="var(--gold)" strokeWidth="1.4" />
        <path
          d="M292 22 C304 22 306 11 317 11 C326 11 326 20 319 20 C315 20 314 16 317 15"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M292 22 C304 22 306 33 317 33 C326 33 326 24 319 24 C315 24 314 28 317 29"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="332" cy="22" r="2.2" fill="var(--gold)" />

        {/* Open straight razor */}
        <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          {/* Steel blade (left side) */}
          <path
            d="M142 20 C142 14 148 12 155 12 L206 16 L206 23 L145 25 C143 25 142 23 142 20 Z"
            fill="var(--surface)"
          />
          <line x1="150" y1="15.5" x2="202" y2="18.5" stroke="var(--gold)" strokeWidth="1" />
          {/* Pivot & monkey tail */}
          <path d="M206 19.5 L215 19.5 C219 19.5 222 15 225 14" fill="none" />
          {/* Scales / oxblood handle (right side) */}
          <path
            d="M214 20 C226 17 254 15 276 19 C280 20 280 26 275 27 C252 29 228 26 214 23 Z"
            fill="var(--accent)"
          />
          <circle cx="215" cy="21" r="2.4" fill="var(--gold)" />
          <circle cx="269" cy="22.5" r="1.6" fill="var(--gold)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Strip of classic black-and-white hexagonal floor tile framed by an oxblood border tile line.
 */
export function HexTileBand({
  height = 28,
  className = '',
}: {
  height?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const hexId = `hex-tile-${uid}`;
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg className="block w-full" style={{ height }} preserveAspectRatio="none">
        <defs>
          <pattern id={hexId} width="32" height="28" patternUnits="userSpaceOnUse">
            <rect width="32" height="28" fill="var(--hex-grout)" />
            {/* Row 1 hexagons */}
            <polygon points="8,1 15,5 15,13 8,17 1,13 1,5" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="1" />
            <polygon points="24,1 31,5 31,13 24,17 17,13 17,5" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="1" />
            {/* Row 2 offset hexagons with classic black accent flower dot */}
            <polygon points="0,15 7,19 7,27 0,31 -7,27 -7,19" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="1" />
            <polygon points="16,15 23,19 23,27 16,31 9,27 9,19" fill="var(--hex-dark)" stroke="var(--hex-grout)" strokeWidth="1" />
            <polygon points="32,15 39,19 39,27 32,31 25,27 25,19" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${hexId})`} />
        {/* Oxblood border tile line top & bottom */}
        <rect x="0" y="0" width="100%" height="3.5" fill="var(--accent)" />
        <rect x="0" y={height - 3.5} width="100%" height="3.5" fill="var(--accent)" />
      </svg>
    </div>
  );
}
