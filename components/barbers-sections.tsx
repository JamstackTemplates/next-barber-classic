import type { ReactNode } from 'react';
import {
  DAY_TO_WEEKDAY_KEY,
  WEEKDAY_KEYS,
  WEEKDAY_SHORT,
  type Barber,
  type WeekdayKey,
} from '../content/barbers';
import type { Service } from '../content/services';
import type { OpeningHours } from '../lib/hours';
import { BarberPortrait, BrassMedallion } from './art/barber-portraits';
import { PoleStripeRule } from './art/dividers';
import { BARBER_TOOL_LABEL, BarberToolIcon } from './art/icons';
import { BarberInTodayTag } from './open-badge';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/**
 * The four chairs on /barbers/ as alternating left/right rows.
 */
export function ChairsSequence({
  barbers,
  services,
  hours,
  lastWalkInMinutesBeforeClose,
}: {
  barbers: readonly Barber[];
  services: readonly Service[];
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose: number;
}) {
  const serviceMap = new Map(services.map(s => [s.id, s]));
  const openShopDays = new Set<WeekdayKey>(
    hours.filter(h => Boolean(h.opens && h.closes)).map(h => DAY_TO_WEEKDAY_KEY[h.day]),
  );

  return (
    <section aria-label="The four chairs" className="paper-grain bg-bg py-12 sm:py-16">
      <div className="wrap space-y-14 sm:space-y-20">
        {barbers.map((barber, index) => {
          const reversed = index % 2 === 1;
          return (
            <article
              key={barber.id}
              id={barber.id}
              className="grid scroll-mt-28 items-center gap-8 border-b border-line pb-14 last:border-b-0 last:pb-0 md:grid-cols-12 md:gap-12"
            >
              {/* Mirror-framed portrait + overlapping brass chair medallion */}
              <div
                className={`flex justify-center md:col-span-5 ${
                  reversed ? 'md:order-2' : ''
                }`}
              >
                <div className="relative w-56 sm:w-64">
                  <BarberPortrait id={barber.id} name={barber.name} />
                  <div
                    className={`absolute -bottom-5 ${
                      reversed ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6'
                    }`}
                  >
                    <BrassMedallion chair={barber.chair} size="md" />
                  </div>
                </div>
              </div>

              {/* Bio, schedule week strip & known-for chips */}
              <div className={`md:col-span-7 ${reversed ? 'md:order-1' : ''}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="small-caps text-xs text-gold-text">
                    Chair {barber.chair} · At the shop since {barber.since}
                  </span>
                  <BarberInTodayTag
                    days={barber.days}
                    hours={hours}
                    lastWalkInMinutesBeforeClose={lastWalkInMinutesBeforeClose}
                  />
                </div>

                <h2 className="mt-2 mb-0 font-display text-3xl text-ink sm:text-4xl">
                  {barber.name}
                </h2>

                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink">
                  <BarberToolIcon tool={barber.tool} className="h-4 w-4" />
                  <span>Reaches first for: {BARBER_TOOL_LABEL[barber.tool]}</span>
                </p>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/90 sm:text-lg">
                  {barber.bio}
                </p>

                {/* Seven-day week strip: barber's days oxblood, closed shop days hatched */}
                <div className="mt-6">
                  <p className="small-caps m-0 text-xs text-muted">At their chair</p>
                  <ul
                    className="m-0 mt-2 grid max-w-md grid-cols-7 gap-1.5 p-0"
                    style={{ listStyle: 'none' }}
                    aria-label={`${barber.name}'s weekly schedule`}
                  >
                    {WEEKDAY_KEYS.map(dayKey => {
                      const works = barber.days.includes(dayKey);
                      const shopOpen = openShopDays.has(dayKey);
                      return (
                        <li
                          key={dayKey}
                          className={`flex flex-col items-center rounded-ui border py-2 text-center ${
                            works
                              ? 'border-accent bg-accent text-on-accent font-bold'
                              : shopOpen
                                ? 'border-line bg-surface text-muted'
                                : 'day-tile-closed border-line/70 text-muted/70'
                          }`}
                          title={
                            works
                              ? `${WEEKDAY_SHORT[dayKey]}: at Chair ${barber.chair}`
                              : shopOpen
                                ? `${WEEKDAY_SHORT[dayKey]}: off`
                                : `${WEEKDAY_SHORT[dayKey]}: shop closed`
                          }
                        >
                          <span className="small-caps text-[0.72rem] leading-none">
                            {WEEKDAY_SHORT[dayKey]}
                          </span>
                          <span className="mt-1 text-[0.65rem] leading-none">
                            {works ? 'In' : shopOpen ? 'Off' : '×'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Known for chips linking to price-list anchors */}
                <div className="mt-6">
                  <p className="small-caps m-0 text-xs text-muted">Known for</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {barber.knownFor.map(serviceId => {
                      const service = serviceMap.get(serviceId);
                      if (!service) return null;
                      return (
                        <SiteLink
                          key={service.id}
                          href={`/prices/#${service.sectionId}`}
                          className="rounded-ui border border-gold/75 bg-surface px-3 py-1 text-sm font-semibold text-ink no-underline transition-colors hover:border-accent hover:bg-brass-bg hover:text-accent-ink hover:no-underline"
                        >
                          {service.name}
                        </SiteLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Narrow centred quote block on pinstripe background: asking for a barber by name.
 */
function AskByNameRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="ask-by-name-heading" className="pinstripe-bg border-y border-line py-14 sm:py-16">
      <div className="wrap">
        <div className="mx-auto max-w-2xl rounded-ui border-2 border-gold/75 bg-surface px-6 py-8 text-center shadow-sm sm:px-10 sm:py-10">
          {children}
        </div>
      </div>
    </section>
  );
}

function AskByNameScript({ children }: ChildrenProps) {
  return (
    <p id="ask-by-name-heading" className="m-0 font-script text-4xl text-accent-ink sm:text-5xl">
      {children}
    </p>
  );
}

function AskByNameBody({ children }: ChildrenProps) {
  return (
    <p className="mt-4 mb-0 text-base leading-relaxed text-ink sm:text-lg">{children}</p>
  );
}

export const AskByNameQuote = Object.assign(AskByNameRoot, {
  Script: AskByNameScript,
  Body: AskByNameBody,
});

/**
 * Horizontal four-milestone shop-history ribbon anchored along a pole stripe rule.
 */
function HistoryRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="history-heading" className="bg-bg pt-14 pb-16 sm:pt-16 sm:pb-20">
      <div className="wrap">{children}</div>
    </section>
  );
}

function HistoryHeading({ children }: ChildrenProps) {
  return (
    <h2 id="history-heading" className="m-0 text-center font-display text-2xl text-ink sm:text-3xl">
      {children}
    </h2>
  );
}

function HistoryRibbon({ children }: ChildrenProps) {
  return (
    <div className="relative mt-8">
      <div className="hidden md:block">
        <PoleStripeRule />
      </div>
      <ol
        className="m-0 mt-0 grid gap-6 pt-5 pl-0 sm:grid-cols-2 md:grid-cols-4"
        style={{ listStyle: 'none' }}
      >
        {children}
      </ol>
    </div>
  );
}

function HistoryMilestone({ year, children }: { year: string; children: ReactNode }) {
  return (
    <li className="relative border-t-4 border-accent pt-3 md:border-t-0 md:pt-2">
      <span
        aria-hidden="true"
        className="hidden h-4 w-4 rounded-full border-2 border-[#23181A] bg-gold md:absolute md:-top-7 md:left-0 md:block"
      />
      <p className="m-0 font-display text-2xl text-accent-ink">{year}</p>
      <p className="mt-1.5 mb-0 text-sm leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const ShopHistoryRibbon = Object.assign(HistoryRoot, {
  Heading: HistoryHeading,
  Ribbon: HistoryRibbon,
  Milestone: HistoryMilestone,
});
