import type { ReactNode } from 'react';
import { ChairIcon, CombIcon, EnvelopeIcon, MapPinIcon } from './art/icons';

type TransomMotif = 'comb' | 'chairs' | 'pin' | 'envelope';

function MotifMark({ motif }: { motif?: TransomMotif }) {
  if (!motif) return null;
  const cls = 'h-7 w-7 text-[#E2BC72]';
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-[#231416]/80"
      aria-hidden="true"
    >
      {motif === 'comb' && <CombIcon className={cls} />}
      {motif === 'chairs' && <ChairIcon className={cls} />}
      {motif === 'pin' && <MapPinIcon className={cls} />}
      {motif === 'envelope' && <EnvelopeIcon className={cls} />}
    </div>
  );
}

/**
 * Gold-leaf painted transom over a shop door:
 * Dark glass interior inside an oxblood wooden surround with gold corner fillets,
 * a script kicker in Mr Dafoe, Ultra gold-leaf title, a small corner motif, and optional status slot.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  motif?: TransomMotif;
  /** Optional live status badge (e.g. PoleStatusBadge on Visit). */
  aside?: ReactNode;
}) {
  return (
    <header className="transom-frame">
      <div className="wrap">
        <div className="transom-glass px-5 py-7 sm:px-9 sm:py-10">
          {/* Decorative gold leaf corner brackets */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 left-2.5 h-5 w-5 border-t-2 border-l-2 border-gold/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2.5 right-2.5 h-5 w-5 border-t-2 border-r-2 border-gold/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2.5 left-2.5 h-5 w-5 border-b-2 border-l-2 border-gold/70"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 bottom-2.5 h-5 w-5 border-r-2 border-b-2 border-gold/70"
          />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <MotifMark motif={motif} />
                <p className="m-0 font-script text-2xl text-[#F8E2A1] sm:text-3xl">{eyebrow}</p>
              </div>
              <h1
                id={id}
                className="gold-leaf-text mt-2 font-display text-[clamp(2.2rem,5.4vw,3.75rem)] leading-[1.06] tracking-wide"
              >
                {title}
              </h1>
              {children ? (
                <div className="mt-3 max-w-[38rem] text-base leading-relaxed text-[#F3E9D3]/90 sm:text-lg">
                  {children}
                </div>
              ) : null}
            </div>

            {aside ? (
              <div className="shrink-0 border-t border-gold/30 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-7">
                {aside}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
