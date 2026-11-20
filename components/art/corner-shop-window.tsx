import { useId } from 'react';

/**
 * Hero centerpiece — "Corner Shop Window":
 * Tall arched shop window in an oxblood-painted wood frame with gold-leaf arched lettering.
 * Through the glass: porcelain-based oxblood leather barber chair with hanging leather strop,
 * arched wall mirror, back-bar shelf with tonic bottles and shaving mug, hex tile floor,
 * diagonal glass reflections, and the signature barber pole bracketed to the right frame.
 */
export function CornerShopWindow({
  open = false,
  className = '',
}: {
  open?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const glassClip = `csw-glass-${uid}`;
  const archPath = `csw-arch-${uid}`;
  const hexPat = `csw-hex-${uid}`;
  const poleClip = `csw-pole-${uid}`;
  const polePat = `csw-pole-pat-${uid}`;
  const goldGrad = `csw-gold-${uid}`;
  const glowGrad = `csw-glow-${uid}`;
  const mirrorGrad = `csw-mirror-${uid}`;

  return (
    <svg
      viewBox="0 0 680 560"
      className={`barber-pole block h-auto w-full select-none ${className}`}
      data-open={open ? 'true' : 'false'}
      role="img"
      aria-label="Corner barbershop window looking onto a classic oxblood leather barber chair, wall mirror, tonic shelf, hexagonal tile floor and wall-mounted barber pole"
    >
      <defs>
        <clipPath id={glassClip}>
          <path d="M44 176 A244 146 0 0 1 532 176 L532 496 L44 496 Z" />
        </clipPath>
        <path id={archPath} d="M 88 164 Q 288 76 488 164" fill="none" />
        <linearGradient id={goldGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold-bright)" />
          <stop offset="50%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
        <linearGradient id={glowGrad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--window-glow-top)" />
          <stop offset="100%" stopColor="var(--window-glow-bottom)" />
        </linearGradient>
        <linearGradient id={mirrorGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--surface)" stopOpacity="0.92" />
          <stop offset="45%" stopColor="var(--line)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="var(--window-wall)" stopOpacity="0.95" />
        </linearGradient>
        <pattern id={hexPat} width="26" height="22" patternUnits="userSpaceOnUse">
          <rect width="26" height="22" fill="var(--hex-grout)" />
          <polygon points="6.5,1 12,4 12,10 6.5,13 1,10 1,4" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="0.8" />
          <polygon points="19.5,1 25,4 25,10 19.5,13 14,10 14,4" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="0.8" />
          <polygon points="13,12 18.5,15 18.5,21 13,24 7.5,21 7.5,15" fill="var(--hex-dark)" stroke="var(--hex-grout)" strokeWidth="0.8" />
          <polygon points="0,12 5.5,15 5.5,21 0,24 -5.5,21 -5.5,15" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="0.8" />
          <polygon points="26,12 31.5,15 31.5,21 26,24 20.5,21 20.5,15" fill="var(--hex-light)" stroke="var(--hex-grout)" strokeWidth="0.8" />
        </pattern>
        <clipPath id={poleClip}>
          <rect x="594" y="182" width="38" height="196" rx="2" />
        </clipPath>
        <pattern id={polePat} width="64" height="48" patternUnits="userSpaceOnUse">
          <rect width="64" height="48" fill="#FBF5E8" />
          <path d="M-16,12 L80,-12 L80,0 L-16,24 Z" fill="var(--accent)" />
          <path d="M-16,36 L80,12 L80,24 L-16,48 Z" fill="var(--navy)" />
          <path d="M-16,60 L80,36 L80,48 L-16,72 Z" fill="var(--accent)" />
        </pattern>
      </defs>

      {/* Outer brick/storefront pillar behind window and pole */}
      <rect x="0" y="0" width="680" height="560" fill="var(--bg)" />
      {/* Oxblood painted timber storefront surround */}
      <path
        d="M14 556 L14 166 C14 56 122 10 288 10 C454 10 562 56 562 166 L562 556 Z"
        fill="var(--accent)"
        stroke="#23181A"
        strokeWidth="2.4"
      />
      {/* Recessed gold wood moulding bead */}
      <path
        d="M28 544 L28 170 C28 70 130 24 288 24 C446 24 548 70 548 170 L548 544 Z"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
        opacity="0.82"
      />
      {/* Lower panelled wood bulkhead beneath window sill */}
      <rect x="30" y="502" width="516" height="44" fill="#460D16" stroke="#23181A" strokeWidth="1.8" />
      <rect x="48" y="512" width="224" height="24" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.65" />
      <rect x="304" y="512" width="224" height="24" fill="none" stroke="var(--gold)" strokeWidth="1.2" opacity="0.65" />

      {/* ============================================================
          INTERIOR SCENE THROUGH THE ARCHED SHOP WINDOW
         ============================================================ */}
      <g clipPath={`url(#${glassClip})`}>
        {/* Warm shop interior backdrop (lit amber in dark mode, daylight cream in light mode) */}
        <rect x="40" y="24" width="496" height="476" fill={`url(#${glowGrad})`} />

        {/* Subtle vertical tongue-and-groove wainscoting on lower interior wall */}
        <rect x="44" y="348" width="488" height="84" fill="var(--window-wall)" stroke="#23181A" strokeWidth="1.4" />
        <g stroke="var(--line)" strokeWidth="1.1" opacity="0.65">
          {[80, 116, 152, 188, 224, 260, 296, 332, 368, 404, 440, 476, 512].map(x => (
            <line key={x} x1={x} y1="348" x2={x} y2="432" />
          ))}
        </g>

        {/* Warm overhead milk-glass globe pendant lamp */}
        <line x1="288" y1="24" x2="288" y2="96" stroke="#23181A" strokeWidth="2.5" />
        <path d="M276 96 L300 96 L296 108 L280 108 Z" fill={`url(#${goldGrad})`} stroke="#23181A" strokeWidth="1.5" />
        <circle cx="288" cy="126" r="22" fill="#FFF7DF" stroke="#23181A" strokeWidth="1.6" />
        <circle cx="288" cy="126" r="56" fill="#F8DE94" opacity="0.16" />

        {/* Large oak-framed arched back-bar mirror */}
        <g>
          <path
            d="M112 316 L112 198 C112 154 190 144 288 144 C386 144 464 154 464 198 L464 316 Z"
            fill="var(--wood)"
            stroke="#23181A"
            strokeWidth="2"
          />
          <path
            d="M126 306 L126 202 C126 168 196 158 288 158 C380 158 450 168 450 202 L450 306 Z"
            fill={`url(#${mirrorGrad})`}
            stroke="var(--gold)"
            strokeWidth="1.4"
          />
          {/* Mirror bevel diagonal reflection lines */}
          <path d="M158 298 L224 170" stroke="#FFFFFF" strokeWidth="6" opacity="0.22" />
          <path d="M178 298 L240 176" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.18" />
          <path d="M352 298 L412 182" stroke="#FFFFFF" strokeWidth="4" opacity="0.14" />
        </g>

        {/* Back-bar marble counter & apothecary shelf */}
        <rect x="86" y="314" width="404" height="14" rx="2" fill="#FBF5E8" stroke="#23181A" strokeWidth="1.8" />
        <rect x="96" y="328" width="384" height="24" fill="var(--wood)" stroke="#23181A" strokeWidth="1.6" />
        <line x1="96" y1="340" x2="480" y2="340" stroke="var(--gold)" strokeWidth="1.1" opacity="0.6" />

        {/* Tonic bottles on left of back-bar shelf */}
        <g stroke="#23181A" strokeWidth="1.5" strokeLinejoin="round">
          {/* Tall amber tonic bottle */}
          <rect x="116" y="268" width="22" height="46" rx="4" fill="#B8762E" />
          <rect x="123" y="254" width="8" height="14" fill="#D9AE5F" />
          <rect x="121" y="250" width="12" height="5" rx="1.5" fill="#23181A" />
          <rect x="119" y="280" width="16" height="16" fill="#FBF5E8" strokeWidth="1" />
          {/* Tall emerald bay-rum bottle */}
          <rect x="145" y="276" width="18" height="38" rx="3" fill="#2E5A47" />
          <rect x="151" y="265" width="6" height="11" fill="#2E5A47" />
          <rect x="149" y="262" width="10" height="4" rx="1" fill="#D9AE5F" />
          <rect x="148" y="287" width="12" height="14" fill="#FBF5E8" strokeWidth="1" />
          {/* Navy witch-hazel bottle */}
          <rect x="170" y="282" width="16" height="32" rx="3" fill="var(--navy)" />
          <rect x="175" y="272" width="6" height="10" fill="var(--navy)" />
          <rect x="173" y="269" width="10" height="4" rx="1" fill="#FBF5E8" />
        </g>

        {/* Shaving mug with brush & stacked hot towels on right of back-bar shelf */}
        <g stroke="#23181A" strokeWidth="1.5" strokeLinejoin="round">
          {/* Badger brush sticking out of mug */}
          <path d="M402 288 C399 272 406 262 414 264 C422 266 424 278 418 288 Z" fill="#D8C2A2" />
          <path d="M405 288 L417 288 L415 296 L407 296 Z" fill="#23181A" />
          {/* Striped apothecary shaving mug */}
          <rect x="394" y="290" width="28" height="24" rx="3" fill="#FBF5E8" />
          <path d="M422 295 C430 295 430 309 422 309" fill="none" strokeWidth="2.2" />
          <line x1="395" y1="298" x2="421" y2="298" stroke="var(--accent)" strokeWidth="2.2" />
          <line x1="395" y1="306" x2="421" y2="306" stroke="var(--gold)" strokeWidth="1.6" />
          {/* Rolled hot towels stack */}
          <rect x="436" y="299" width="32" height="15" rx="7" fill="#FBF5E8" />
          <rect x="440" y="286" width="28" height="14" rx="7" fill="#F3E9D3" />
        </g>

        {/* Hexagonal tile floor strip inside shop */}
        <rect x="44" y="428" width="488" height="72" fill={`url(#${hexPat})`} />
        <rect x="44" y="428" width="488" height="5" fill="var(--accent)" />

        {/* ============================================================
            PORCELAIN-BASED OXBLOOD LEATHER BARBER CHAIR (centerpiece)
           ============================================================ */}
        <g stroke="#23181A" strokeWidth="1.9" strokeLinejoin="round" strokeLinecap="round">
          {/* Floor shadow under hydraulic base */}
          <ellipse cx="288" cy="472" rx="74" ry="12" fill="#181012" opacity="0.24" stroke="none" />

          {/* Heavy round cast-iron & porcelain pedestal base */}
          <path d="M236 470 C236 456 340 456 340 470 L344 476 L232 476 Z" fill="#FBF5E8" />
          <ellipse cx="288" cy="462" rx="44" ry="8" fill="#E9DEC8" />
          {/* Hydraulic pump column & foot pump lever */}
          <rect x="273" y="408" width="30" height="54" rx="4" fill="#FBF5E8" />
          <rect x="279" y="410" width="6" height="50" fill="#FFFFFF" opacity="0.65" stroke="none" />
          <path d="M303 444 L344 452 L344 457 L303 451 Z" fill={`url(#${goldGrad})`} />

          {/* Chrome & iron footrest assembly */}
          <path d="M242 406 L224 446 L234 450 L254 410 Z" fill={`url(#${goldGrad})`} />
          <path d="M334 406 L352 446 L342 450 L322 410 Z" fill={`url(#${goldGrad})`} />
          <rect x="218" y="446" width="140" height="10" rx="4" fill="#C9C3B8" />
          <rect x="234" y="438" width="108" height="8" rx="3" fill="#FBF5E8" />

          {/* Hanging leather razor strop draped over the left chair arm */}
          <g>
            <path d="M206 342 C196 348 194 374 192 418 L208 418 C210 378 212 354 218 344 Z" fill="#7D4927" />
            <line x1="200" y1="352" x2="198" y2="412" stroke="#D9AE5F" strokeWidth="1" opacity="0.55" />
            {/* Brass swivel hook & handle */}
            <circle cx="209" cy="341" r="4" fill={`url(#${goldGrad})`} />
            <rect x="191" y="416" width="18" height="9" rx="2" fill={`url(#${goldGrad})`} />
          </g>

          {/* Padded headrest */}
          <rect x="282" y="256" width="12" height="22" fill="#C9C3B8" />
          <rect x="260" y="232" width="56" height="28" rx="12" fill="var(--accent)" />
          <path d="M268 240 H308" stroke="#F6DA92" strokeWidth="1.2" opacity="0.45" />

          {/* Tufted oxblood leather backrest inside porcelain shell */}
          <rect x="224" y="274" width="128" height="94" rx="16" fill="#FBF5E8" />
          <rect x="234" y="282" width="108" height="82" rx="12" fill="var(--accent)" />
          {/* Diamond button tufting lines */}
          <g stroke="#3F0A12" strokeWidth="1.2" opacity="0.65">
            <line x1="258" y1="296" x2="288" y2="322" />
            <line x1="318" y1="296" x2="288" y2="322" />
            <line x1="258" y1="348" x2="288" y2="322" />
            <line x1="318" y1="348" x2="288" y2="322" />
          </g>
          <g fill="#D9AE5F" stroke="#23181A" strokeWidth="0.9">
            <circle cx="264" cy="304" r="2.6" />
            <circle cx="312" cy="304" r="2.6" />
            <circle cx="288" cy="322" r="2.8" />
            <circle cx="264" cy="340" r="2.6" />
            <circle cx="312" cy="340" r="2.6" />
          </g>

          {/* Porcelain seat apron & thick oxblood seat cushion */}
          <rect x="218" y="364" width="140" height="32" rx="10" fill="var(--accent)" />
          <path d="M226 372 H350" stroke="#F6DA92" strokeWidth="1.2" opacity="0.4" />
          <rect x="224" y="392" width="128" height="18" rx="5" fill="#FBF5E8" />

          {/* Swept chrome & leather armrests */}
          <path d="M224 334 L204 334 C196 334 196 346 204 346 L216 346 L216 394 L228 394 L228 346 Z" fill="#FBF5E8" />
          <rect x="198" y="332" width="34" height="11" rx="5" fill="var(--accent)" />
          <path d="M352 334 L372 334 C380 334 380 346 372 346 L360 346 L360 394 L348 394 L348 346 Z" fill="#FBF5E8" />
          <rect x="344" y="332" width="34" height="11" rx="5" fill="var(--accent)" />
        </g>

        {/* ============================================================
            GOLD-LEAF WINDOW LETTERING ARCHED ACROSS THE GLASS
           ============================================================ */}
        <g>
          {/* Dark shadow under gold leaf */}
          <text
            fontFamily="var(--font-display)"
            fontSize="26"
            letterSpacing="2"
            fill="#1B1012"
            transform="translate(2 2.5)"
            opacity="0.82"
          >
            <textPath href={`#${archPath}`} startOffset="50%" textAnchor="middle">
              STRAIGHT RAZOR &amp; CO.
            </textPath>
          </text>
          {/* Gold leaf window paint */}
          <text
            fontFamily="var(--font-display)"
            fontSize="26"
            letterSpacing="2"
            fill={`url(#${goldGrad})`}
            stroke="#23181A"
            strokeWidth="1.4"
            paintOrder="stroke fill"
          >
            <textPath href={`#${archPath}`} startOffset="50%" textAnchor="middle">
              STRAIGHT RAZOR &amp; CO.
            </textPath>
          </text>
          {/* Corner pinstripe gold-leaf glass border */}
          <path
            d="M58 482 L58 180 A230 132 0 0 1 518 180 L518 482 Z"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="1.6"
            opacity="0.72"
          />
          {/* Small painted corner ribbon at base of glass */}
          <rect x="148" y="468" width="280" height="22" rx="2" fill="#1B1012" opacity="0.86" stroke="var(--gold)" strokeWidth="1.2" />
          <text x="288" y="483" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="10.5" fontWeight="700" letterSpacing="2" fill="#F8E2A1">
            WALK-INS WELCOME · EST. 1958
          </text>
        </g>

        {/* Diagonal glass reflection streaks layered on top */}
        <g className="pointer-events-none">
          <polygon points="78,496 254,48 292,48 116,496" fill="var(--window-sheen)" />
          <polygon points="134,496 308,48 322,48 148,496" fill="var(--window-sheen)" opacity="0.6" />
          <polygon points="392,496 520,164 536,164 408,496" fill="var(--window-sheen)" opacity="0.55" />
        </g>
      </g>

      {/* Crisp dark outline of arched window frame */}
      <path d="M44 176 A244 146 0 0 1 532 176 L532 496 L44 496 Z" fill="none" stroke="#23181A" strokeWidth="2.4" />
      <rect x="36" y="494" width="504" height="10" rx="2" fill="var(--wood)" stroke="#23181A" strokeWidth="1.8" />

      {/* ============================================================
          SIGNATURE BARBER POLE BRACKETED TO RIGHT STOREFRONT FRAME
         ============================================================ */}
      <g>
        {/* Wall brackets anchored to oxblood storefront post */}
        <g stroke="#23181A" strokeWidth="1.8">
          <rect x="556" y="164" width="12" height="32" rx="2" fill={`url(#${goldGrad})`} />
          <rect x="568" y="175" width="26" height="10" fill={`url(#${goldGrad})`} />
          <rect x="556" y="366" width="12" height="32" rx="2" fill={`url(#${goldGrad})`} />
          <rect x="568" y="377" width="26" height="10" fill={`url(#${goldGrad})`} />
        </g>

        {/* Top brass ball & cap */}
        <g stroke="#23181A" strokeWidth="1.8" strokeLinejoin="round">
          <circle cx="613" cy="140" r="11" fill={`url(#${goldGrad})`} />
          <rect x="607" y="150" width="12" height="6" fill={`url(#${goldGrad})`} />
          <path d="M591 172 C591 159 635 159 635 172 Z" fill={`url(#${goldGrad})`} />
          <rect x="588" y="172" width="50" height="10" rx="2" fill={`url(#${goldGrad})`} />
        </g>

        {/* Spinning spiral stripes glass cylinder */}
        <g clipPath={`url(#${poleClip})`}>
          <rect x="594" y="182" width="38" height="196" fill="#FBF5E8" />
          <g className="barber-pole-stripes">
            <rect x="590" y="170" width="46" height="270" fill={`url(#${polePat})`} />
          </g>
          <rect x="600" y="188" width="5" height="184" rx="2" fill="#FFFFFF" opacity="0.48" />
          <rect x="626" y="182" width="6" height="196" fill="#000000" opacity="0.22" />
        </g>
        <rect x="594" y="182" width="38" height="196" rx="2" fill="none" stroke="#23181A" strokeWidth="2" />

        {/* Bottom brass cap & ball */}
        <g stroke="#23181A" strokeWidth="1.8" strokeLinejoin="round">
          <rect x="588" y="378" width="50" height="10" rx="2" fill={`url(#${goldGrad})`} />
          <path d="M591 388 C591 401 635 401 635 388 Z" fill={`url(#${goldGrad})`} />
          <rect x="607" y="401" width="12" height="6" fill={`url(#${goldGrad})`} />
          <circle cx="613" cy="417" r="10.5" fill={`url(#${goldGrad})`} />
        </g>
      </g>
    </svg>
  );
}
