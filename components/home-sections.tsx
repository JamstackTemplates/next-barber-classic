import type { CSSProperties, ReactNode } from 'react';
import type { Barber } from '../content/barbers';
import { WEEKDAY_SHORT } from '../content/barbers';
import type { Service } from '../content/services';
import type { OpeningHours } from '../lib/hours';
import { mapDirectionsUrl } from '../lib/maps';
import { asset } from '../lib/paths';
import { BarberPortrait, BrassMedallion } from './art/barber-portraits';
import { HexTileBand, StraightRazorDivider, VerticalPoleSpine } from './art/dividers';
import { BARBER_TOOL_LABEL, BarberToolIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { RitualVignette } from './art/ritual-vignettes';
import { TakeANumberDispenser } from './art/take-a-number';
import { WordmarkArch } from './art/wordmark';
import { FeltLetterBoard } from './felt-letter-board';
import { HoursLedger } from './hours-ledger';
import { PoleStatusBadge, TodayBrassPlate } from './open-badge';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

const shopWindowImages = {
  '--shop-window-light': `url("${asset('/barber-light.webp')}")`,
  '--shop-window-dark': `url("${asset('/barber-dark.webp')}")`,
} as CSSProperties;

/* ==========================================================================
   1. Shop-Window Hero
   ========================================================================== */
function HeroRoot({
  hours,
  lastWalkInMinutesBeforeClose,
  classicCutPrice,
  children,
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose: number;
  classicCutPrice: number;
  children: ReactNode;
}) {
  return (
    <section className="paper-grain relative overflow-x-clip bg-bg">
      <div className="mx-auto grid max-w-[92rem] items-center gap-6 px-4 pt-5 pb-8 sm:px-6 lg:grid-cols-12 lg:gap-0 lg:py-0 lg:pl-[max(1.5rem,calc((100vw-76rem)/2+1rem))] lg:pr-0">
        {/* Left column: arched gold-leaf wordmark, H1, subline, actions & desktop Today plate */}
        <div className="relative z-10 lg:col-span-5 lg:py-12 lg:pr-8">
          <div className="mb-3 max-w-[23rem] sm:mb-4">
            <WordmarkArch />
          </div>
          {children}
          {/* Desktop brass Today plate */}
          <div className="mt-7 hidden lg:block">
            <TodayBrassPlate
              hours={hours}
              lastWalkInMinutesBeforeClose={lastWalkInMinutesBeforeClose}
              classicCutPrice={classicCutPrice}
            />
          </div>
        </div>

        {/* Right column: Corner Shop Window bleeding to right edge on desktop; cropped with overlapping plate on mobile */}
        <div className="relative lg:col-span-7 lg:-mr-6 xl:-mr-10">
          <div
            role="img"
            aria-label="An oxblood leather barber chair seen through the arched shop window, with a striped barber pole beside it"
            className="shop-window-photo aspect-[2400/1792] max-h-[16.5rem] rounded-t-md border-x-2 border-t-2 border-gold/50 bg-cover bg-center sm:max-h-[24rem] lg:max-h-none lg:rounded-none lg:border-0"
            style={shopWindowImages}
          />
          {/* Mobile overlapping brass Today plate */}
          <div className="relative z-20 -mt-7 px-2 sm:px-4 lg:hidden">
            <TodayBrassPlate
              hours={hours}
              lastWalkInMinutesBeforeClose={lastWalkInMinutesBeforeClose}
              classicCutPrice={classicCutPrice}
            />
          </div>
        </div>
      </div>
      <HexTileBand height={26} />
    </section>
  );
}

function HeroHeading({ children }: ChildrenProps) {
  return (
    <h1 className="m-0 font-display text-[clamp(1.85rem,3.6vw,3rem)] leading-[1.12] tracking-tight text-ink">
      {children}
    </h1>
  );
}

function HeroSubline({ children }: ChildrenProps) {
  return (
    <p className="mt-3 max-w-[34rem] text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
      {children}
    </p>
  );
}

function HeroActions({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
      <SiteLink href={primaryHref} className="button">
        {primaryLabel}
      </SiteLink>
      <SiteLink href={secondaryHref} className="button button-quiet">
        {secondaryLabel}
      </SiteLink>
    </div>
  );
}

export const ShopHero = Object.assign(HeroRoot, {
  Heading: HeroHeading,
  Subline: HeroSubline,
  Actions: HeroActions,
});

/* ==========================================================================
   2. Walk-ins Note ("Take a number") — Full-bleed oxblood band
   ========================================================================== */
function WalkInsRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="walkins-heading" className="oxblood-band border-y-2 border-gold/60 py-12 sm:py-16">
      <div className="wrap grid items-center gap-8 md:grid-cols-12 md:gap-10">
        <div className="flex justify-center md:col-span-4 md:justify-start">
          <div className="-rotate-2 md:rotate-0">
            <TakeANumberDispenser number={27} />
          </div>
        </div>
        <div className="text-center md:col-span-8 md:text-left">{children}</div>
      </div>
    </section>
  );
}

function WalkInsKicker({ children }: ChildrenProps) {
  return (
    <p id="walkins-heading" className="m-0 font-script text-3xl text-[#F8E2A1] sm:text-4xl">
      {children}
    </p>
  );
}

function WalkInsLines({ children }: ChildrenProps) {
  return (
    <div className="mt-3 space-y-1.5 font-display text-2xl leading-snug text-[#FBF5E8] sm:text-3xl lg:text-[2.15rem]">
      {children}
    </div>
  );
}

function WalkInsNote({ children }: ChildrenProps) {
  return (
    <p className="mt-5 inline-block border-t border-gold/50 pt-3 text-sm tracking-wide text-[#F3E9D3]/90 sm:text-base">
      {children}
    </p>
  );
}

export const WalkInsBand = Object.assign(WalkInsRoot, {
  Kicker: WalkInsKicker,
  Lines: WalkInsLines,
  Note: WalkInsNote,
});

/* ==========================================================================
   3. Price Board Teaser — Five house favourites on felt board
   ========================================================================== */
function PriceTeaserRoot({
  items,
  boardTitle,
  children,
}: {
  items: readonly Service[];
  boardTitle: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="teaser-heading" className="paper-grain bg-bg py-14 sm:py-20">
      <div className="wrap">
        <StraightRazorDivider className="mb-6 text-ink" />
        <div className="mx-auto max-w-3xl text-center">{children}</div>
        <div className="mx-auto mt-8 max-w-3xl">
          <FeltLetterBoard title={boardTitle} items={items} showDetails={false} />
        </div>
        <div className="mt-7 text-center">
          <SiteLink href="/prices/" className="button button-quiet">
            Full price list →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

function PriceTeaserHeading({ children }: ChildrenProps) {
  return (
    <h2 id="teaser-heading" className="m-0 font-display text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function PriceTeaserLede({ children }: ChildrenProps) {
  return <p className="mt-2.5 text-base text-muted sm:text-lg">{children}</p>;
}

export const PriceTeaser = Object.assign(PriceTeaserRoot, {
  Heading: PriceTeaserHeading,
  Lede: PriceTeaserLede,
});

/* ==========================================================================
   4. The Chairs — Four barbers teaser over a hex tile floor strip
   ========================================================================== */
function ChairsShowcaseRoot({
  barbers,
  children,
}: {
  barbers: readonly Barber[];
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="chairs-heading" className="pinstripe-bg border-t border-line pt-14 sm:pt-20">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>{children}</div>
          <SiteLink href="/barbers/" className="small-caps text-link text-sm">
            Meet all four chairs →
          </SiteLink>
        </div>

        {/* Horizontal row of chairs: snap-scrolls on mobile, four-up row on desktop */}
        <ol
          className="m-0 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pl-0 lg:grid lg:grid-cols-4 lg:overflow-visible"
          style={{ listStyle: 'none' }}
        >
          {barbers.map(barber => (
            <li
              key={barber.id}
              className="group relative flex w-[16.5rem] shrink-0 snap-center flex-col items-center text-center lg:w-auto"
            >
              <SiteLink
                href={`/barbers/#${barber.id}`}
                className="flex flex-col items-center no-underline hover:no-underline"
              >
                <div className="relative w-44 sm:w-48">
                  <BarberPortrait id={barber.id} name={barber.name} />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <BrassMedallion chair={barber.chair} size="sm" />
                  </div>
                </div>

                <p className="small-caps mt-7 mb-0 text-xs text-gold-text">
                  Chair {barber.chair} · Since {barber.since}
                </p>
                <h3 className="mt-1 mb-0 font-display text-xl text-ink group-hover:text-accent-ink">
                  {barber.name}
                </h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted">
                  <BarberToolIcon tool={barber.tool} className="h-4 w-4 text-accent-ink" />
                  <span>{BARBER_TOOL_LABEL[barber.tool]}</span>
                </p>
                <p className="small-caps mt-1 mb-0 text-xs text-muted">
                  {barber.days.map(d => WEEKDAY_SHORT[d]).join(' · ')}
                </p>
              </SiteLink>
            </li>
          ))}
        </ol>
      </div>
      <HexTileBand height={26} />
    </section>
  );
}

function ChairsKicker({ children }: ChildrenProps) {
  return <p className="m-0 font-script text-3xl text-accent-ink">{children}</p>;
}

function ChairsHeading({ children }: ChildrenProps) {
  return (
    <h2 id="chairs-heading" className="mt-1 mb-0 font-display text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

export const ChairsShowcase = Object.assign(ChairsShowcaseRoot, {
  Kicker: ChairsKicker,
  Heading: ChairsHeading,
});

/* ==========================================================================
   5. The Ritual — Hot towel shave in five steps down a pole stripe spine
   ========================================================================== */
function RitualRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="ritual-heading" className="bg-surface py-14 sm:py-20">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">{children}</div>
      </div>
    </section>
  );
}

function RitualKicker({ children }: ChildrenProps) {
  return <p className="m-0 font-script text-3xl text-accent-ink">{children}</p>;
}

function RitualHeading({ children }: ChildrenProps) {
  return (
    <h2 id="ritual-heading" className="mt-1 mb-0 font-display text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function RitualLede({ children }: ChildrenProps) {
  return <p className="mt-3 text-base text-muted sm:text-lg">{children}</p>;
}

function RitualSteps({ children }: ChildrenProps) {
  return (
    <div className="mx-auto mt-12 max-w-4xl text-left">
      <div className="relative">
        {/* Vertical pole stripe spine: stops cleanly at step 5 */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-3.5 md:left-1/2 md:-translate-x-1/2">
          <VerticalPoleSpine />
        </div>
        <ol className="m-0 space-y-10 p-0" style={{ listStyle: 'none' }}>
          {children}
        </ol>
      </div>
      <div className="mt-12 text-center">
        <SiteLink href="/prices/#shaves" className="button">
          See shave prices →
        </SiteLink>
      </div>
    </div>
  );
}

function RitualStep({
  step,
  title,
  children,
}: {
  step: 1 | 2 | 3 | 4 | 5;
  title: string;
  children: ReactNode;
}) {
  const isOdd = step % 2 === 1;
  return (
    <li className="relative grid items-center gap-4 pl-11 md:grid-cols-2 md:gap-12 md:pl-0">
      {/* Brass node pin along the pole spine */}
      <span
        aria-hidden="true"
        className="absolute top-6 left-[0.45rem] flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#23181A] bg-gold md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
      />

      <div
        className={`flex items-center gap-4 ${
          isOdd ? 'md:justify-end md:text-right' : 'md:order-2 md:justify-start md:text-left'
        }`}
      >
        <div className={isOdd ? 'md:order-2' : ''}>
          <RitualVignette step={step} />
        </div>
        <div className={isOdd ? 'md:order-1' : ''}>
          <p className="m-0 font-script text-3xl leading-none text-gold-text">Step {step}</p>
          <h3 className="mt-1 mb-0 font-display text-xl text-ink">{title}</h3>
          <p className="mt-1.5 mb-0 max-w-xs text-sm leading-relaxed text-muted sm:text-base">
            {children}
          </p>
        </div>
      </div>

      {/* Empty opposite spacer on desktop so vignettes alternate left/right cleanly */}
      <div className={`hidden md:block ${isOdd ? '' : 'md:order-1'}`} aria-hidden="true" />
    </li>
  );
}

export const RitualTimeline = Object.assign(RitualRoot, {
  Kicker: RitualKicker,
  Heading: RitualHeading,
  Lede: RitualLede,
  Steps: RitualSteps,
  Step: RitualStep,
});

/* ==========================================================================
   6. Visit Band — Felt-black dark band with hours ledger, address & large pole
   ========================================================================== */
function HomeVisitRoot({
  hours,
  lastWalkInMinutesBeforeClose,
  address,
  landmark,
  phone,
  mapQuery,
  children,
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose: number;
  address: string;
  landmark: string;
  phone: string;
  mapQuery: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby="home-visit-heading"
      className="border-t-2 border-gold/60 bg-felt py-14 text-felt-ink sm:py-20"
    >
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        {/* Left: hours ledger */}
        <div className="lg:col-span-6">
          {children}
          <HoursLedger
            hours={hours}
            lastWalkInMinutesBeforeClose={lastWalkInMinutesBeforeClose}
            variant="dark"
            className="mt-6"
          />
        </div>

        {/* Right: address, directions & large barber pole with live status */}
        <div className="flex flex-col items-start justify-between gap-8 border-t border-gold/30 pt-8 sm:flex-row sm:items-center lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <div className="space-y-4">
            <div>
              <p className="small-caps m-0 text-xs text-[#E2BC72]">Find the corner</p>
              <p className="mt-1.5 flex items-start gap-2 font-display text-xl text-[#FBF5E8]">
                <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-[#E2BC72]" />
                <span>{address}</span>
              </p>
              <p className="mt-1 text-sm text-felt-muted">{landmark}</p>
            </div>

            <p className="flex items-center gap-2 text-base text-[#FBF5E8]">
              <PhoneIcon className="h-4 w-4 shrink-0 text-[#E2BC72]" />
              <a
                className="text-[#F8E2A1] underline hover:text-[#FBF5E8]"
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              >
                {phone}
              </a>
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={mapDirectionsUrl(mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-on-dark"
              >
                Get directions
              </a>
              <SiteLink
                href="/visit/"
                className="button border-gold/70 bg-transparent text-[#F8E2A1] hover:bg-accent hover:text-[#FBF5E8]"
              >
                Visit &amp; parking
              </SiteLink>
            </div>
          </div>

          <PoleStatusBadge
            hours={hours}
            lastWalkInMinutesBeforeClose={lastWalkInMinutesBeforeClose}
            size="lg"
            tone="dark"
          />
        </div>
      </div>
    </section>
  );
}

function HomeVisitHeading({ children }: ChildrenProps) {
  return (
    <h2 id="home-visit-heading" className="gold-leaf-text m-0 font-display text-3xl sm:text-4xl">
      {children}
    </h2>
  );
}

function HomeVisitLede({ children }: ChildrenProps) {
  return <p className="mt-2 mb-0 text-sm text-felt-muted sm:text-base">{children}</p>;
}

export const HomeVisitBand = Object.assign(HomeVisitRoot, {
  Heading: HomeVisitHeading,
  Lede: HomeVisitLede,
});
