/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const toMinutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

export function fromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Format HH:MM as readable 12-hour clock time (e.g. "09:00" -> "9 am", "19:30" -> "7:30 pm"). */
export function formatClock12(value: string): string {
  const total = toMinutes(value);
  const h24 = Math.floor(total / 60);
  const mins = total % 60;
  const suffix = h24 >= 12 ? 'pm' : 'am';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return mins === 0 ? `${h12} ${suffix}` : `${h12}:${String(mins).padStart(2, '0')} ${suffix}`;
}

/** Compute the local HH:MM last walk-in cutoff for an open interval, or null if closed. */
export function lastWalkInTime(
  entry: OpeningHours,
  lastWalkInMinutesBeforeClose: number,
): string | null {
  if (!entry.opens || !entry.closes) return null;
  const cutoff = toMinutes(entry.closes) - lastWalkInMinutesBeforeClose;
  if (cutoff <= toMinutes(entry.opens)) return entry.opens;
  return fromMinutes(cutoff);
}

/** Format an open/close range for the hours ledger (e.g. "9:00 am – 6:00 pm" or "Closed"). */
export function formatInterval(entry: OpeningHours): string {
  if (!entry.opens || !entry.closes) return 'Closed';
  return `${formatClock12(entry.opens)} – ${formatClock12(entry.closes)}`;
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || toMinutes(opens) >= toMinutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

export type ShopState = 'neutral' | 'open' | 'last-call' | 'closed';

export interface ShopStatus {
  state: ShopState;
  /** True while the shop is open (including last-call window finishing current chairs). */
  isOpen: boolean;
  /** Drives the animated barber pole: spins only when browser computes the shop as open. */
  poleSpinning: boolean;
  /** Today's weekday in the business time zone, or null when neutral. */
  today: Day | null;
  /** Human-readable status line. */
  label: string;
  /** Today's hours range (e.g. "9 am – 6 pm") or "Closed", or null when neutral. */
  todayHours: string | null;
  /** Today's last walk-in clock time (e.g. "5:30 pm"), or null when closed/neutral. */
  lastWalkIn: string | null;
}

/** Resolve current weekday and minute-of-day in the business IANA time zone. */
export function localClock(timeZone: string, now = new Date()): { day: Day; minutes: number } | null {
  if (!timeZone) return null;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return null;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const day = part('weekday') as Day;
  if (!DAYS.includes(day)) return null;
  const hour = Number(part('hour')) % 24;
  const minute = Number(part('minute'));
  return { day, minutes: hour * 60 + minute };
}

/**
 * Browser-side shop status with walk-in last-call window.
 * Never call during static prerender; static/no-JS UI uses NEUTRAL_STATUS.
 */
export const NEUTRAL_STATUS: ShopStatus = {
  state: 'neutral',
  isOpen: false,
  poleSpinning: false,
  today: null,
  label: "See today's hours below",
  todayHours: null,
  lastWalkIn: null,
};

export function shopStatus(
  hours: readonly OpeningHours[],
  timeZone: string,
  lastWalkInMinutesBeforeClose = 30,
  now = new Date(),
): ShopStatus {
  if (!timeZone) return NEUTRAL_STATUS;
  validateHours(hours);
  const currentClock = localClock(timeZone, now);
  if (!currentClock) return NEUTRAL_STATUS;

  const { day: today, minutes: current } = currentClock;
  const index = DAYS.indexOf(today);
  const todayEntry = hours.find(entry => entry.day === today)!;
  const todayHours = formatInterval(todayEntry);
  const cutoffClock = lastWalkInTime(todayEntry, lastWalkInMinutesBeforeClose);
  const cutoffFormatted = cutoffClock ? formatClock12(cutoffClock) : null;

  if (todayEntry.opens && todayEntry.closes) {
    const opensAt = toMinutes(todayEntry.opens);
    const closesAt = toMinutes(todayEntry.closes);
    const lastWalkInAt = Math.max(opensAt, closesAt - lastWalkInMinutesBeforeClose);

    if (current >= opensAt && current < lastWalkInAt) {
      return {
        state: 'open',
        isOpen: true,
        poleSpinning: true,
        today,
        label: `Open now · last walk-in ${cutoffFormatted}`,
        todayHours,
        lastWalkIn: cutoffFormatted,
      };
    }

    if (current >= lastWalkInAt && current < closesAt) {
      return {
        state: 'last-call',
        isOpen: true,
        poleSpinning: true,
        today,
        label: 'Last call: walk-ins closed',
        todayHours,
        lastWalkIn: cutoffFormatted,
      };
    }
  }

  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < toMinutes(entry.opens))) {
      const when = offset === 0 ? 'today' : day;
      return {
        state: 'closed',
        isOpen: false,
        poleSpinning: false,
        today,
        label: `Closed · opens ${when} ${formatClock12(entry.opens)}`,
        todayHours,
        lastWalkIn: cutoffFormatted,
      };
    }
  }

  return {
    state: 'closed',
    isOpen: false,
    poleSpinning: false,
    today,
    label: 'Closed · see opening hours',
    todayHours,
    lastWalkIn: null,
  };
}

/** Standard starter helper retained for compatibility. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  const currentClock = localClock(timeZone, now);
  if (!currentClock) return fallback;
  const { day: todayName, minutes: current } = currentClock;
  const index = DAYS.indexOf(todayName);
  const today = hours.find(entry => entry.day === todayName)!;
  if (today.opens && today.closes && current >= toMinutes(today.opens) && current < toMinutes(today.closes)) {
    return `Open now · until ${today.closes}`;
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < toMinutes(entry.opens))) {
      return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
    }
  }
  return 'Closed · see opening hours';
}
