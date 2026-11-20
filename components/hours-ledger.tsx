'use client';

import {
  formatClock12,
  formatInterval,
  lastWalkInTime,
  type OpeningHours,
} from '../lib/hours';
import { TimeZoneNote } from './time-zone-note';
import { useShopStatus } from './use-shop-status';

/**
 * Weekly hours ledger in tabular figures.
 * Static/no-JS renders all seven days unmarked; in the browser, today's row is highlighted
 * using the configured America/Chicago time zone.
 */
export function HoursLedger({
  hours,
  lastWalkInMinutesBeforeClose = 30,
  variant = 'sheet',
  className = '',
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose?: number;
  /** `sheet` = Visit ledger book with last walk-in column; `dark` = Home felt-black visit band. */
  variant?: 'sheet' | 'dark';
  className?: string;
}) {
  const status = useShopStatus(hours, lastWalkInMinutesBeforeClose);

  if (variant === 'dark') {
    return (
      <div className={className}>
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Weekly barbershop opening hours</caption>
          <tbody className="divide-y divide-felt-ink/15">
            {hours.map(entry => {
              const isToday = status.today === entry.day;
              const isClosed = !entry.opens || !entry.closes;
              return (
                <tr
                  key={entry.day}
                  data-today={isToday ? 'true' : undefined}
                  className={isToday ? 'bg-accent/35' : undefined}
                >
                  <th
                    scope="row"
                    className={`small-caps py-2.5 pl-2.5 pr-4 text-sm font-semibold ${
                      isToday ? 'text-[#F8E2A1]' : 'text-felt-ink'
                    }`}
                  >
                    {entry.day}
                    {isToday ? (
                      <span className="ml-2 inline-block rounded-xs border border-gold/80 px-1.5 py-0.5 text-[0.65rem] text-[#F8E2A1]">
                        Today
                      </span>
                    ) : null}
                  </th>
                  <td
                    className={`tabular py-2.5 pr-2.5 text-right text-sm sm:text-base ${
                      isClosed ? 'italic text-felt-muted' : 'text-felt-ink'
                    }`}
                  >
                    {formatInterval(entry)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <TimeZoneNote className="text-felt-muted" />
      </div>
    );
  }

  return (
    <div className={`ledger-sheet rounded-ui p-5 sm:p-7 ${className}`}>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-accent/60 pb-3">
        <h2 className="m-0 font-display text-xl text-ink sm:text-2xl">Hours Ledger</h2>
        <span className="small-caps text-xs text-gold-text">Walk-ins only</span>
      </div>

      <div className="mt-2 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Weekly opening hours and last walk-in cut-off times</caption>
          <thead>
            <tr className="border-b border-line text-xs text-muted">
              <th scope="col" className="small-caps py-2.5 pr-3 font-semibold">Day</th>
              <th scope="col" className="small-caps py-2.5 px-3 font-semibold">Open</th>
              <th scope="col" className="small-caps py-2.5 pl-3 text-right font-semibold">Last walk-in</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/80">
            {hours.map(entry => {
              const isToday = status.today === entry.day;
              const cutoff = lastWalkInTime(entry, lastWalkInMinutesBeforeClose);
              return (
                <tr
                  key={entry.day}
                  data-today={isToday ? 'true' : undefined}
                  className={isToday ? 'bg-brass-bg/90' : undefined}
                >
                  <th
                    scope="row"
                    className="small-caps py-3 pl-2 pr-3 text-sm font-semibold text-ink sm:text-base"
                  >
                    {entry.day}
                    {isToday ? (
                      <span className="ml-2 inline-block rounded-xs bg-accent px-1.5 py-0.5 text-[0.65rem] text-on-accent">
                        Today
                      </span>
                    ) : null}
                  </th>
                  <td
                    className={`tabular py-3 px-3 text-sm sm:text-base ${
                      cutoff ? 'font-semibold text-ink' : 'italic text-muted'
                    }`}
                  >
                    {formatInterval(entry)}
                  </td>
                  <td className="tabular py-3 pl-3 pr-2 text-right text-sm text-muted">
                    {cutoff ? formatClock12(cutoff) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 mb-0 border-t border-line pt-3 text-xs text-muted sm:text-sm">
        Last walk-in is taken {lastWalkInMinutesBeforeClose} minutes before close so every chair gets an unhurried finish.
      </p>
      <TimeZoneNote />
    </div>
  );
}
