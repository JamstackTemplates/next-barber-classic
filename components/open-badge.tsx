'use client';

import { DAY_TO_WEEKDAY_KEY, type WeekdayKey } from '../content/barbers';
import type { OpeningHours } from '../lib/hours';
import { BarberPole } from './art/barber-pole';
import { useShopStatus } from './use-shop-status';

/**
 * Live status text line in the business time zone.
 * Static/no-JS output stays neutral ("See today's hours below").
 */
export function OpenBadge({
  hours,
  lastWalkInMinutesBeforeClose = 30,
  className = '',
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose?: number;
  className?: string;
}) {
  const status = useShopStatus(hours, lastWalkInMinutesBeforeClose);
  return (
    <span data-shop-state={status.state} className={className}>
      {status.label}
    </span>
  );
}

/**
 * Live barber pole that spins only when the browser computes the shop as open
 * and prefers-reduced-motion is no-preference.
 */
export function LiveBarberPole({
  hours,
  lastWalkInMinutesBeforeClose = 30,
  size = 'md',
  mountSide = 'left',
  className = '',
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose?: number;
  size?: 'sm' | 'md' | 'lg';
  mountSide?: 'left' | 'right' | 'none';
  className?: string;
}) {
  const status = useShopStatus(hours, lastWalkInMinutesBeforeClose);
  return (
    <BarberPole
      open={status.poleSpinning}
      size={size}
      mountSide={mountSide}
      className={className}
    />
  );
}

/**
 * Brass "Today" plate for the Home hero and Visit page: shows today's hours,
 * live open/last-call/closed status, and a spinning pole when open.
 */
export function TodayBrassPlate({
  hours,
  lastWalkInMinutesBeforeClose = 30,
  classicCutPrice,
  variant = 'hero',
  className = '',
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose?: number;
  classicCutPrice?: number;
  variant?: 'hero' | 'visit';
  className?: string;
}) {
  const status = useShopStatus(hours, lastWalkInMinutesBeforeClose);

  const dotClass =
    status.state === 'open'
      ? 'bg-accent ring-2 ring-gold'
      : status.state === 'last-call'
        ? 'bg-gold ring-2 ring-accent'
        : 'bg-muted/60';

  return (
    <div
      className={`brass-plate flex items-center gap-4 px-4 py-3 text-ink ${className}`}
      data-shop-state={status.state}
    >
      <BarberPole
        open={status.poleSpinning}
        size={variant === 'visit' ? 'md' : 'sm'}
        mountSide="none"
        className={variant === 'visit' ? 'h-24 w-auto' : 'h-16 w-auto'}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
          <p className="small-caps m-0 text-xs text-gold-text">
            {status.today ? `Today · ${status.today}` : 'Walk-in hours'}
          </p>
        </div>
        <p className="mt-0.5 text-sm font-semibold leading-snug text-ink sm:text-base" role="status" aria-live="polite">
          {status.label}
        </p>
        <p className="tabular mt-0.5 text-xs text-muted sm:text-sm">
          {status.todayHours
            ? status.todayHours === 'Closed'
              ? 'Closed today · Tue–Sat walk-ins'
              : `Hours today: ${status.todayHours}`
            : 'Tue–Wed 9 am–6 pm · Thu–Fri 9 am–8 pm · Sat 8 am–4 pm'}
        </p>
        {typeof classicCutPrice === 'number' && (
          <p className="mt-1.5 border-t border-gold/40 pt-1.5 text-xs font-semibold text-ink sm:text-sm">
            The Classic Cut <span className="font-display text-accent-ink">${classicCutPrice}</span>{' '}
            <span className="font-normal text-muted">· No appointments</span>
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Compact live pole + status pill for the Visit page head transom and Home visit band.
 */
export function PoleStatusBadge({
  hours,
  lastWalkInMinutesBeforeClose = 30,
  size = 'sm',
  tone = 'dark',
  className = '',
}: {
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose?: number;
  size?: 'sm' | 'lg';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const status = useShopStatus(hours, lastWalkInMinutesBeforeClose);
  const textTone = tone === 'dark' ? 'text-[#FBF5E8]' : 'text-ink';
  const mutedTone = tone === 'dark' ? 'text-[#E2BC72]' : 'text-gold-text';

  return (
    <div
      className={`inline-flex items-center gap-3.5 ${className}`}
      data-shop-state={status.state}
    >
      <BarberPole
        open={status.poleSpinning}
        size={size === 'lg' ? 'lg' : 'sm'}
        mountSide={size === 'lg' ? 'left' : 'none'}
        className={size === 'lg' ? 'h-44 w-auto sm:h-52' : 'h-14 w-auto'}
      />
      <div className="text-left">
        <p className={`small-caps m-0 text-xs ${mutedTone}`}>
          {status.state === 'open'
            ? 'Pole spinning · Chairs open'
            : status.state === 'last-call'
              ? 'Finishing last chairs'
              : status.state === 'closed'
                ? 'Pole still · Closed now'
                : 'Walk-in status'}
        </p>
        <p className={`mt-0.5 text-sm font-semibold sm:text-base ${textTone}`} role="status" aria-live="polite">
          {status.label}
        </p>
      </div>
    </div>
  );
}

/**
 * Browser-only "In today" brass tag for barbers on /barbers/.
 * Renders nothing during SSR or without JS.
 */
export function BarberInTodayTag({
  days,
  hours,
  lastWalkInMinutesBeforeClose = 30,
}: {
  days: readonly WeekdayKey[];
  hours: readonly OpeningHours[];
  lastWalkInMinutesBeforeClose?: number;
}) {
  const status = useShopStatus(hours, lastWalkInMinutesBeforeClose);
  if (!status.today) return null;
  const todayKey = DAY_TO_WEEKDAY_KEY[status.today];
  if (!days.includes(todayKey)) return null;

  return (
    <span className="small-caps inline-flex items-center gap-1.5 rounded-sm border border-gold bg-brass-bg px-2.5 py-0.5 text-xs text-ink">
      <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
      In today
    </span>
  );
}
