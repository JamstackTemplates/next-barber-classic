import { useId } from 'react';

/**
 * 404 illustration ("This chair's empty"):
 * Barber chair spun to face the wall, a wooden broom leaning on it,
 * a neat pile of swept clippings on hex tiles, and a hanging card on string
 * reading "Back in 5 minutes".
 */
export function EmptyChairArt({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const hexId = `ec-hex-${uid}`;
  const goldId = `ec-gold-${uid}`;

  return (
    <svg
      viewBox="0 0 420 320"
      className={`h-auto w-full max-w-[27rem] ${className}`}
      role="img"
      aria-label="An empty barber chair spun to face the wall with a leaning push broom, swept hair clippings and a hanging Back in 5 minutes sign"
    >
      <defs>
        <pattern id={hexId} width="26" height="22" patternUnits="userSpaceOnUse">
          <rect width="26" height="22" fill="var(--hex-grout)" />
          <polygon points="6.5,1 12,4 12,10 6.5,13 1,10 1,4" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="0.8" />
          <polygon points="19.5,1 25,4 25,10 19.5,13 14,10 14,4" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="0.8" />
          <polygon points="13,12 18.5,15 18.5,21 13,24 7.5,21 7.5,15" fill="var(--hex-dark)" stroke="var(--hex-grout)" strokeWidth="0.8" />
        </pattern>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--gold-deep)" />
          <stop offset="50%" stopColor="var(--gold-bright)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>

      {/* Subtle wall & wainscoting behind chair */}
      <rect x="20" y="18" width="380" height="220" rx="8" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
      <rect x="20" y="156" width="380" height="82" fill="var(--window-wall)" opacity="0.65" />
      <line x1="20" y1="156" x2="400" y2="156" stroke="var(--gold)" strokeWidth="1.6" />

      {/* Hex tile floor */}
      <rect x="20" y="236" width="380" height="66" rx="4" fill={`url(#${hexId})`} stroke="#23181A" strokeWidth="1.8" />
      <rect x="20" y="236" width="380" height="5" fill="var(--accent)" />

      {/* Floor shadow */}
      <ellipse cx="195" cy="276" rx="76" ry="11" fill="#181012" opacity="0.22" />

      {/* Barber chair seen from the back (spun to face the wall) */}
      <g stroke="#23181A" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* Porcelain pedestal base */}
        <path d="M144 274 C144 260 246 260 246 274 L250 280 L140 280 Z" fill="#FBF5E8" />
        <rect x="180" y="216" width="30" height="52" rx="4" fill="#FBF5E8" />
        <path d="M210 248 L246 256 L246 261 L210 255 Z" fill={`url(#${goldId})`} />

        {/* Rear porcelain backrest shell (facing viewer) */}
        <rect x="132" y="102" width="126" height="106" rx="18" fill="#FBF5E8" />
        <rect x="144" y="114" width="102" height="82" rx="12" fill="var(--accent)" opacity="0.92" />
        {/* Brass rear towel rail */}
        <line x1="150" y1="194" x2="240" y2="194" stroke={`url(#${goldId})`} strokeWidth="5" />
        {/* Rear armrests peeking out */}
        <rect x="116" y="160" width="18" height="44" rx="5" fill="#FBF5E8" />
        <rect x="256" y="160" width="18" height="44" rx="5" fill="#FBF5E8" />
        {/* Headrest post & cushion top */}
        <rect x="189" y="76" width="12" height="28" fill="#C9C3B8" />
        <rect x="166" y="54" width="58" height="26" rx="12" fill="var(--accent)" />

        {/* Hanging string + "Back in 5 minutes" card draped from headrest */}
        <path d="M195 82 L176 124 M195 82 L214 124" fill="none" stroke="var(--gold-bright)" strokeWidth="1.5" />
        <g transform="rotate(-4 195 148)">
          <rect x="150" y="122" width="90" height="52" rx="4" fill="#FBF5E8" stroke="#23181A" strokeWidth="1.8" />
          <rect x="155" y="127" width="80" height="42" rx="2" fill="none" stroke="var(--gold)" strokeWidth="1" />
          <circle cx="195" cy="128" r="2.2" fill="#23181A" stroke="none" />
          <text x="195" y="145" textAnchor="middle" fontFamily="var(--font-script)" fontSize="15" fill="var(--accent)" stroke="none">
            Back in
          </text>
          <text x="195" y="162" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="11.5" fontWeight="700" letterSpacing="1" fill="#23181A" stroke="none">
            5 MINUTES
          </text>
        </g>

        {/* Leaning wooden barbershop push broom on right side */}
        <g>
          <line x1="264" y1="92" x2="318" y2="254" stroke="#8C5930" strokeWidth="7" />
          <line x1="264" y1="92" x2="318" y2="254" stroke="#23181A" strokeWidth="1.6" />
          <rect x="284" y="248" width="76" height="13" rx="4" fill="#5A351C" transform="rotate(-14 322 254)" />
          <path d="M286 263 L358 245 L364 266 L290 284 Z" fill="#C9A86A" />
          <g stroke="#5A351C" strokeWidth="1.2">
            <line x1="298" y1="262" x2="302" y2="278" />
            <line x1="312" y1="258" x2="316" y2="274" />
            <line x1="326" y1="254" x2="330" y2="270" />
            <line x1="340" y1="250" x2="344" y2="266" />
          </g>
        </g>

        {/* Neat swept pile of hair clippings on hex floor */}
        <g stroke="none">
          <path d="M242 280 C252 268 274 266 286 278 C292 284 240 286 242 280 Z" fill="#3D2B24" />
          <path d="M254 277 C260 271 272 271 278 278" fill="none" stroke="#6B5349" strokeWidth="1.4" />
          <path d="M262 282 C266 276 276 277 282 282" fill="none" stroke="#23181A" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}
