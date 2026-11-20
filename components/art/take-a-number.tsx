/**
 * Red enamel wall-mounted Take-a-Number dispenser with a torn cream paper ticket
 * printed "NOW SERVING" and an oversized "No. 27" in Ultra.
 */
export function TakeANumberDispenser({
  number = 27,
  compact = false,
  className = '',
}: {
  number?: number;
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <svg
        viewBox="0 0 156 96"
        className={`h-auto w-36 shrink-0 overflow-visible ${className}`}
        aria-hidden="true"
      >
        {/* Compact torn paper ticket stub */}
        <g transform="rotate(-3 78 48)">
          <path
            d="M12 12 L22 16 L32 12 L42 16 L52 12 L62 16 L72 12 L82 16 L92 12 L102 16 L112 12 L122 16 L132 12 L144 16 L144 82 L132 86 L122 82 L112 86 L102 82 L92 86 L82 82 L72 86 L62 82 L52 86 L42 82 L32 86 L22 82 L12 86 Z"
            fill="#FBF5E8"
            stroke="#23181A"
            strokeWidth="1.8"
          />
          <rect x="20" y="22" width="116" height="54" fill="none" stroke="#B8893B" strokeWidth="1.2" strokeDasharray="3 2" />
          <text x="78" y="37" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="10" fontWeight="700" letterSpacing="2" fill="#6B1624">
            NOW SERVING
          </text>
          <text x="78" y="67" textAnchor="middle" fontFamily="var(--font-display)" fontSize="29" fill="#23181A">
            No. {number}
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 250 245"
      className={`ticket-dispenser h-auto w-full max-w-[15rem] overflow-visible ${className}`}
      role="img"
      aria-label={`Wall-mounted take-a-number dispenser showing ticket number ${number}`}
    >
      {/* Shadow behind dispenser */}
      <ellipse cx="126" cy="236" rx="74" ry="7" fill="#10080A" opacity="0.28" />

      {/* Wall mounting plate */}
      <rect x="74" y="6" width="102" height="24" rx="5" fill="#470D16" stroke="#1B1012" strokeWidth="1.75" />
      <circle cx="88" cy="18" r="3.2" fill="#D9AE5F" stroke="#1B1012" strokeWidth="1.2" />
      <circle cx="162" cy="18" r="3.2" fill="#D9AE5F" stroke="#1B1012" strokeWidth="1.2" />

      {/* Red / oxblood rounded dispenser housing */}
      <path
        d="M42 54 C42 26 68 18 125 18 C182 18 208 26 208 54 L198 118 C196 128 188 134 178 134 L72 134 C62 134 54 128 52 118 Z"
        fill="#A41E2E"
        stroke="#1B1012"
        strokeWidth="2"
      />
      {/* Enamel highlight & bevel */}
      <path
        d="M54 54 C54 34 74 28 125 28 C176 28 196 34 196 54"
        fill="none"
        stroke="#F6DA92"
        strokeWidth="1.5"
        opacity="0.55"
      />
      {/* Embossed brass plaque on dispenser face */}
      <rect x="66" y="42" width="118" height="58" rx="6" fill="#23181A" stroke="#D9AE5F" strokeWidth="1.8" />
      <rect x="71" y="47" width="108" height="48" rx="3" fill="none" stroke="#D9AE5F" strokeWidth="0.9" opacity="0.65" />
      <text x="125" y="67" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="12" fontWeight="700" letterSpacing="2" fill="#F8E2A1">
        PLEASE TAKE
      </text>
      <text x="125" y="86" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" letterSpacing="1" fill="#FBF5E8">
        A NUMBER
      </text>

      {/* Metal slot mouth */}
      <rect x="74" y="114" width="102" height="12" rx="4" fill="#1B1012" stroke="#D9AE5F" strokeWidth="1.4" />

      {/* Torn paper ticket protruding from slot */}
      <g className="ticket-dispenser-ticket">
        <path
          d="M78 120 L172 120 L180 222 L170 217 L160 223 L150 217 L140 223 L130 217 L125 223 L115 217 L105 223 L95 217 L85 223 L70 222 Z"
          fill="#FBF5E8"
          stroke="#23181A"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Ticket perforation & hairline box */}
        <line x1="84" y1="132" x2="166" y2="132" stroke="#B8893B" strokeWidth="1.1" strokeDasharray="4 3" />
        <text x="125" y="150" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="10.5" fontWeight="700" letterSpacing="2.2" fill="#6B1624">
          NOW SERVING
        </text>
        <text x="125" y="187" textAnchor="middle" fontFamily="var(--font-display)" fontSize="27" fill="#23181A">
          No. {number}
        </text>
        <text x="125" y="207" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="9" fontWeight="600" letterSpacing="1.6" fill="#5E4E48">
          WALK-INS ONLY
        </text>
      </g>
    </svg>
  );
}
