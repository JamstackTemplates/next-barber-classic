/**
 * Five engraved vignettes for "The ritual" — the hot towel straight razor shave in five steps.
 */
function VignetteFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
      role="img"
      aria-label={label}
    >
      <circle cx="60" cy="60" r="56" fill="var(--surface)" stroke="var(--gold)" strokeWidth="2.2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="var(--line)" strokeWidth="1.1" strokeDasharray="3 3" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function RitualVignette({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  switch (step) {
    case 1:
      return (
        <VignetteFrame label="Steaming rolled hot towel">
          {/* Curling steam wisps */}
          <path d="M42 46 C38 36 48 32 44 22" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <path d="M60 42 C56 32 66 28 62 18" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <path d="M78 46 C74 36 84 32 80 22" fill="none" stroke="var(--gold)" strokeWidth="2" />
          {/* Rolled hot towel */}
          <rect x="26" y="56" width="68" height="32" rx="14" fill="var(--bg)" />
          <ellipse cx="80" cy="72" rx="10" ry="16" fill="var(--brass-bg)" />
          <path d="M80 62 C85 62 86 72 80 76 C75 78 74 71 78 68" fill="none" strokeWidth="1.6" />
          {/* Towel stripe */}
          <line x1="38" y1="56" x2="38" y2="88" stroke="var(--accent)" strokeWidth="3.2" />
          <line x1="44" y1="56" x2="44" y2="88" stroke="var(--navy)" strokeWidth="1.8" />
        </VignetteFrame>
      );
    case 2:
      return (
        <VignetteFrame label="Shaving brush whipping lather in a mug">
          {/* Badger brush tilted in mug */}
          <g transform="rotate(-16 64 50)">
            <path d="M52 24 C48 36 52 48 56 54 L72 54 C76 48 80 36 76 24 Z" fill="var(--brass-bg)" />
            <rect x="55" y="54" width="18" height="10" rx="2" fill="var(--accent)" />
          </g>
          {/* Rich lather foam crest */}
          <path
            d="M36 62 C34 52 46 48 52 54 C58 46 72 48 74 56 C82 54 86 60 84 66 Z"
            fill="#FBF5E8"
          />
          {/* Apothecary shaving mug */}
          <rect x="34" y="64" width="50" height="34" rx="5" fill="var(--bg)" />
          <path d="M84 71 C96 71 96 90 84 90" fill="none" strokeWidth="2.8" />
          <line x1="35" y1="74" x2="83" y2="74" stroke="var(--accent)" strokeWidth="3" />
          <line x1="35" y1="84" x2="83" y2="84" stroke="var(--gold)" strokeWidth="2" />
        </VignetteFrame>
      );
    case 3:
      return (
        <VignetteFrame label="Warm lather brushed across the jaw">
          {/* Profile silhouette of face & jaw */}
          <path
            d="M44 26 C58 26 70 36 72 50 L78 58 L72 64 L74 74 C72 86 62 94 48 94 L42 94"
            fill="var(--brass-bg)"
          />
          {/* Whipped lather foam cloud across cheek and jawline */}
          <path
            d="M44 62 C52 56 64 58 72 64 C78 70 76 82 66 88 C58 94 44 92 40 84 C36 76 38 66 44 62 Z"
            fill="#FBF5E8"
          />
          {/* Brush sweep */}
          <path d="M74 74 L94 86" stroke="var(--accent)" strokeWidth="5" />
          <path d="M68 68 C74 64 80 68 78 76" fill="none" stroke="var(--gold)" strokeWidth="2" />
        </VignetteFrame>
      );
    case 4:
      return (
        <VignetteFrame label="Straight razor honed on a leather strop">
          {/* Hanging leather strop diagonal */}
          <path d="M24 88 L88 24 L98 34 L34 98 Z" fill="#8A522B" />
          <circle cx="92" cy="28" r="5" fill="var(--gold)" />
          {/* Open straight razor gliding across strop */}
          <g transform="translate(8 6)">
            <path d="M34 48 L66 36 L68 46 L38 56 C34 57 32 52 34 48 Z" fill="#FBF5E8" />
            <path d="M66 41 L88 64 C91 67 86 72 82 69 L60 47" fill="var(--accent)" />
            <circle cx="64" cy="43" r="2.2" fill="var(--gold)" />
          </g>
        </VignetteFrame>
      );
    case 5:
      return (
        <VignetteFrame label="Cold towel and eucalyptus splash finish">
          {/* Crisp folded cold towel */}
          <rect x="28" y="60" width="64" height="30" rx="10" fill="var(--navy)" />
          <line x1="36" y1="75" x2="84" y2="75" stroke="#FBF5E8" strokeWidth="2" opacity="0.8" />
          {/* Sparkling water droplets & chill stars */}
          <path d="M60 22 C60 22 50 36 50 43 A10 10 0 0 0 70 43 C70 36 60 22 60 22 Z" fill="var(--brass-bg)" />
          <path d="M38 36 C38 36 33 44 33 48 A5 5 0 0 0 43 48 C43 44 38 36 38 36 Z" fill="var(--bg)" />
          <path d="M84 34 C84 34 79 42 79 46 A5 5 0 0 0 89 46 C89 42 84 34 84 34 Z" fill="var(--bg)" />
          <path d="M36 24 L36 30 M33 27 L39 27" stroke="var(--gold)" strokeWidth="1.8" />
          <path d="M84 22 L84 28 M81 25 L87 25" stroke="var(--gold)" strokeWidth="1.8" />
        </VignetteFrame>
      );
  }
}
