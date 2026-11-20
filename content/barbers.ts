import type { Day, OpeningHours } from '../lib/hours.ts';
import { services, type Service } from './services.ts';
import { business } from './business.ts';

/**
 * The four chairs at Straight Razor & Co. Barbers.
 *
 * Frequent owner edits:
 * - Update a barber's `days` when their chair schedule changes (must match open shop days).
 * - Update `knownFor` using service IDs from `content/services.ts`.
 */

export const WEEKDAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type WeekdayKey = typeof WEEKDAY_KEYS[number];

export const WEEKDAY_KEY_TO_DAY: Record<WeekdayKey, Day> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export const DAY_TO_WEEKDAY_KEY: Record<Day, WeekdayKey> = {
  Monday: 'mon',
  Tuesday: 'tue',
  Wednesday: 'wed',
  Thursday: 'thu',
  Friday: 'fri',
  Saturday: 'sat',
  Sunday: 'sun',
};

export const WEEKDAY_SHORT: Record<WeekdayKey, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
  sun: 'Sun',
};

export type BarberTool = 'razor' | 'scissors' | 'clippers' | 'brush';

export interface Barber {
  /** Stable, URL-safe ID. */
  id: string;
  /** Display name. */
  name: string;
  /** Unique numbered chair in the shop (1–4). */
  chair: 1 | 2 | 3 | 4;
  /** Year the barber started at Straight Razor & Co. */
  since: number;
  /** Days the barber is at their chair (must be open shop days). */
  days: readonly WeekdayKey[];
  /** Service IDs from content/services.ts this barber is known for. */
  knownFor: readonly string[];
  /** Short one- or two-sentence biography. */
  bio: string;
  /** Signature tool icon paired with their chair. */
  tool: BarberTool;
}

export const barbers: readonly Barber[] = [
  {
    id: 'augie-ferraro',
    name: 'Augie Ferraro',
    chair: 1,
    since: 1989,
    days: ['tue', 'wed', 'thu', 'fri'],
    knownFor: ['classic-cut', 'flat-top', 'royal-shave'],
    bio: 'Third owner of the shop and its longest-serving chair. Still strops every razor himself before opening.',
    tool: 'razor',
  },
  {
    id: 'dee-kowalski',
    name: 'Dolores "Dee" Kowalski',
    chair: 2,
    since: 2004,
    days: ['tue', 'thu', 'fri', 'sat'],
    knownFor: ['scissor-over-comb', 'beard-sculpt'],
    bio: 'Scissor work and side parts that grow out right. Regulars wait for her chair on Saturdays.',
    tool: 'scissors',
  },
  {
    id: 'marcus-bell',
    name: 'Marcus Bell',
    chair: 3,
    since: 2015,
    days: ['wed', 'thu', 'fri', 'sat'],
    knownFor: ['skin-fade', 'head-shave'],
    bio: 'The fade man. Clean blends, sharp lines, and no rush on either.',
    tool: 'clippers',
  },
  {
    id: 'tomas-ruiz',
    name: 'Tomás Ruiz',
    chair: 4,
    since: 2021,
    days: ['tue', 'wed', 'sat'],
    knownFor: ['hot-towel-shave', 'beard-trim', 'junior-cut'],
    bio: 'Patient with first-timers and first haircuts, and he whips a proper lather.',
    tool: 'brush',
  },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TOOLS = new Set<BarberTool>(['razor', 'scissors', 'clippers', 'brush']);

/** Validate barbers against services and shop opening hours with barber-specific errors. */
export function validateBarbers(
  list: readonly Barber[] = barbers,
  serviceList: readonly Service[] = services,
  hours: readonly OpeningHours[] = business.hours,
): void {
  const serviceIds = new Set(serviceList.map(s => s.id));
  const openDays = new Set<WeekdayKey>(
    hours
      .filter(entry => Boolean(entry.opens && entry.closes))
      .map(entry => DAY_TO_WEEKDAY_KEY[entry.day]),
  );

  const ids = new Set<string>();
  const chairs = new Set<number>();

  for (const barber of list) {
    const label = barber.name || barber.id || '(unnamed)';
    if (!barber.id || !SLUG.test(barber.id)) {
      throw new Error(`barber "${label}": id must be a URL-safe lowercase slug`);
    }
    if (ids.has(barber.id)) {
      throw new Error(`barber "${barber.name}" (${barber.id}): duplicate barber id`);
    }
    ids.add(barber.id);
    if (!barber.name.trim()) {
      throw new Error(`barber "${barber.id}": name is required`);
    }
    if (!Number.isInteger(barber.chair) || barber.chair < 1 || barber.chair > 4) {
      throw new Error(`barber "${barber.name}": chair must be an integer from 1 to 4`);
    }
    if (chairs.has(barber.chair)) {
      throw new Error(`barber "${barber.name}": chair ${barber.chair} is already assigned`);
    }
    chairs.add(barber.chair);
    if (!Number.isInteger(barber.since) || barber.since < 1958 || barber.since > 2100) {
      throw new Error(`barber "${barber.name}": since must be a valid year from 1958 onward`);
    }
    if (!barber.bio.trim()) {
      throw new Error(`barber "${barber.name}": bio is required`);
    }
    if (!TOOLS.has(barber.tool)) {
      throw new Error(`barber "${barber.name}": unknown tool "${barber.tool}"`);
    }
    if (!barber.days.length) {
      throw new Error(`barber "${barber.name}": days must include at least one open day`);
    }
    const seenDays = new Set<WeekdayKey>();
    for (const day of barber.days) {
      if (!WEEKDAY_KEYS.includes(day)) {
        throw new Error(`barber "${barber.name}": invalid weekday key "${day}"`);
      }
      if (seenDays.has(day)) {
        throw new Error(`barber "${barber.name}": duplicate day "${day}"`);
      }
      seenDays.add(day);
      if (!openDays.has(day)) {
        throw new Error(
          `barber "${barber.name}": scheduled on ${WEEKDAY_KEY_TO_DAY[day]}, when the shop is closed`,
        );
      }
    }
    if (!barber.knownFor.length) {
      throw new Error(`barber "${barber.name}": knownFor must reference at least one service`);
    }
    for (const serviceId of barber.knownFor) {
      if (!serviceIds.has(serviceId)) {
        throw new Error(`barber "${barber.name}": knownFor references unknown service "${serviceId}"`);
      }
    }
  }
}
