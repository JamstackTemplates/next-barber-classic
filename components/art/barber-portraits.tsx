import { useId } from 'react';

/**
 * Engraved round brass plate numbered 1–4 for each barber's chair.
 */
export function BrassMedallion({
  chair,
  size = 'md',
  className = '',
}: {
  chair: 1 | 2 | 3 | 4;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const gradId = `med-brass-${uid}`;
  const dim = size === 'sm' ? 56 : 74;

  return (
    <svg
      viewBox="0 0 80 80"
      width={dim}
      height={dim}
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold-bright)" />
          <stop offset="52%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="37" fill={`url(#${gradId})`} stroke="#23181A" strokeWidth="2.2" />
      <circle cx="40" cy="40" r="31" fill="none" stroke="#23181A" strokeWidth="1.2" strokeDasharray="3 2.5" />
      {/* Four tiny brass rivets */}
      <circle cx="40" cy="11" r="1.8" fill="#23181A" />
      <circle cx="40" cy="69" r="1.8" fill="#23181A" />
      <circle cx="11" cy="40" r="1.8" fill="#23181A" />
      <circle cx="69" cy="40" r="1.8" fill="#23181A" />
      <text x="40" y="29" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="9.5" fontWeight="700" letterSpacing="2" fill="#23181A">
        CHAIR
      </text>
      <text x="40" y="57" textAnchor="middle" fontFamily="var(--font-display)" fontSize="29" fill="#23181A">
        {chair}
      </text>
    </svg>
  );
}

/**
 * Engraved silhouette portrait bust inside an ornate oval barber mirror frame.
 * Each barber has a distinct hairstyle, moustache/beard, collar and profile silhouette.
 */
export function BarberPortrait({
  id,
  name,
  className = '',
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const clipId = `bp-clip-${uid}`;
  const goldId = `bp-gold-${uid}`;

  return (
    <svg
      viewBox="0 0 220 264"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label={`Engraved portrait silhouette of ${name}`}
    >
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="110" cy="136" rx="84" ry="104" />
        </clipPath>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gold-bright)" />
          <stop offset="50%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>

      {/* Ornate crest finial atop mirror */}
      <path
        d="M84 24 C92 8 128 8 136 24 C124 20 96 20 84 24 Z"
        fill={`url(#${goldId})`}
        stroke="#23181A"
        strokeWidth="1.75"
      />
      <circle cx="110" cy="14" r="4.5" fill="var(--accent)" stroke="#23181A" strokeWidth="1.5" />

      {/* Outer oak & brass mirror frame */}
      <ellipse cx="110" cy="136" rx="98" ry="118" fill="var(--wood)" stroke="#23181A" strokeWidth="2.2" />
      <ellipse cx="110" cy="136" rx="90" ry="110" fill="none" stroke={`url(#${goldId})`} strokeWidth="4" />

      {/* Mirror glass interior & barber silhouette — warm lit silver/amber mirror in both modes */}
      <g clipPath={`url(#${clipId})`}>
        <rect x="18" y="24" width="184" height="224" fill="var(--mirror-bg)" />
        {/* Engraved cross-hatch vignette aura */}
        <ellipse cx="110" cy="126" rx="68" ry="78" fill="#FBF5E8" opacity="0.48" />

        {id === 'augie-ferraro' && (
          <g fill="#23181A" stroke="#23181A" strokeWidth="1.5" strokeLinejoin="round">
            {/* Shoulders & barber smock with bow tie */}
            <path d="M36 244 C40 198 66 184 110 184 C154 184 180 198 184 244 Z" fill="var(--navy)" />
            <path d="M88 184 L110 212 L132 184 Z" fill="#FBF5E8" />
            <path d="M98 194 L110 200 L122 194 L122 204 L110 200 L98 204 Z" fill="var(--accent)" />
            {/* Neck & classic square-jawed head facing right */}
            <rect x="97" y="156" width="26" height="32" rx="6" fill="#23181A" />
            <path d="M80 112 C80 80 136 80 142 114 C146 122 150 128 144 134 C146 142 142 158 128 164 C112 170 86 164 82 142 Z" />
            {/* Classic slicked-back silver-streaked wave hair */}
            <path d="M74 116 C68 82 94 64 132 70 C150 73 156 88 144 96 C132 88 106 88 94 102 C88 110 86 124 80 128 Z" />
            <path d="M84 94 C102 80 126 78 142 86" fill="none" stroke="var(--gold-bright)" strokeWidth="2.2" />
            <path d="M80 104 C98 92 118 90 134 94" fill="none" stroke="var(--gold-bright)" strokeWidth="1.6" />
            {/* Signature handlebar moustache */}
            <path d="M124 140 C134 136 148 138 156 144 C150 148 140 146 130 145 Z" fill="#FBF5E8" stroke="#23181A" strokeWidth="1.6" />
          </g>
        )}

        {id === 'dee-kowalski' && (
          <g fill="#23181A" stroke="#23181A" strokeWidth="1.5" strokeLinejoin="round">
            {/* Crisp collared barber shirt & apron straps */}
            <path d="M38 244 C44 200 68 186 110 186 C152 186 176 200 182 244 Z" fill="var(--accent)" />
            <path d="M88 186 L110 214 L132 186 Z" fill="#FBF5E8" />
            <line x1="76" y1="194" x2="76" y2="244" stroke="var(--gold)" strokeWidth="3.5" />
            <line x1="144" y1="194" x2="144" y2="244" stroke="var(--gold)" strokeWidth="3.5" />
            {/* Neck & graceful profile facing left */}
            <rect x="98" y="156" width="24" height="32" rx="6" />
            <path d="M138 112 C138 82 84 82 78 114 C74 122 70 128 76 134 C76 144 82 158 96 164 C112 170 134 162 138 140 Z" />
            {/* Structured 1950s sculpted bob & rolled chignon with brass hair comb */}
            <path d="M144 122 C154 92 136 66 102 68 C78 70 68 88 78 100 C92 88 116 90 124 106 C128 116 128 134 140 144 C154 144 162 128 156 112 Z" />
            <circle cx="152" cy="126" r="14" />
            <path d="M136 110 L150 102" stroke="var(--gold-bright)" strokeWidth="2.6" />
            <circle cx="152" cy="101" r="2.6" fill="var(--gold-bright)" stroke="none" />
          </g>
        )}

        {id === 'marcus-bell' && (
          <g fill="#23181A" stroke="#23181A" strokeWidth="1.5" strokeLinejoin="round">
            {/* Barber vest over crisp shirt */}
            <path d="M36 244 C42 198 66 184 110 184 C154 184 178 198 184 244 Z" fill="#23181A" />
            <path d="M88 184 L110 218 L132 184 Z" fill="#FBF5E8" />
            <line x1="110" y1="216" x2="110" y2="244" stroke="var(--gold)" strokeWidth="2" />
            {/* Neck & profile facing right with sharp skin fade + crisp lined-up beard */}
            <rect x="96" y="156" width="28" height="32" rx="6" />
            <path d="M80 112 C80 82 136 82 142 114 C146 122 150 128 144 134 C146 144 142 162 126 168 C110 172 86 164 80 140 Z" />
            {/* Crisp high-top fade silhouette */}
            <path d="M78 102 L82 68 L138 66 L142 92 L126 92 C110 92 94 100 84 112 Z" />
            {/* Subtle fade gradient line on temple */}
            <path d="M82 104 Q102 96 124 94" fill="none" stroke="var(--gold-bright)" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Sharp lined-up jawline beard */}
            <path d="M108 142 C118 144 134 144 144 138 C146 154 138 168 122 170 C108 170 100 160 102 148 Z" fill="#140D0E" />
          </g>
        )}

        {id === 'tomas-ruiz' && (
          <g fill="#23181A" stroke="#23181A" strokeWidth="1.5" strokeLinejoin="round">
            {/* Classic white barber coat with brass buttons */}
            <path d="M36 244 C42 198 66 184 110 184 C154 184 178 198 184 244 Z" fill="#FBF5E8" />
            <path d="M90 184 L110 208 L130 184 Z" fill="var(--accent)" />
            <circle cx="110" cy="222" r="3" fill="var(--gold)" />
            <circle cx="110" cy="236" r="3" fill="var(--gold)" />
            {/* Neck & profile facing left with textured wavy hair & full groomed beard */}
            <rect x="97" y="156" width="26" height="32" rx="6" />
            <path d="M138 112 C138 82 84 82 78 114 C74 122 70 128 76 134 C74 146 80 162 96 168 C114 174 134 162 138 140 Z" />
            {/* Textured wavy side-part crown */}
            <path d="M142 122 C148 92 138 68 106 66 C82 64 68 78 72 94 C86 84 106 86 118 98 C124 106 126 118 132 128 Z" />
            <path d="M84 78 Q106 70 128 82" fill="none" stroke="var(--gold-bright)" strokeWidth="1.6" />
            {/* Full sculpted beard */}
            <path d="M112 138 C100 140 86 142 76 136 C70 156 82 174 100 174 C114 174 120 158 118 144 Z" fill="#140D0E" />
          </g>
        )}

        {/* Diagonal glass sheen over mirror */}
        <polygon points="36,238 124,26 142,26 54,238" fill="#FFFFFF" opacity="0.16" />
      </g>

      {/* Inner gold hairline mirror rim */}
      <ellipse cx="110" cy="136" rx="84" ry="104" fill="none" stroke="#23181A" strokeWidth="1.6" />
    </svg>
  );
}
