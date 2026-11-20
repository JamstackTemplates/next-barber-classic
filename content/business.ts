import type { OpeningHours } from '../lib/hours.ts';

/**
 * Shared business details for Straight Razor & Co. Barbers.
 *
 * Frequent owner edits:
 * - `hours`: weekly opening hours (same-day intervals only; omit `opens`/`closes` when closed).
 * - `lastWalkInMinutesBeforeClose`: cutoff in minutes before closing time.
 * - `phone` / `email`: public contact details shown across Visit, Contact and the footer.
 * When renaming the shop, update both `business.name` here and `name` in `site.config.json`.
 */
export interface BusinessAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Single-line display address. */
  formatted: string;
  /** Neighbourhood cue shown alongside the address. */
  landmark: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Compact name used in short labels and headers. */
  shortName: string;
  /** Lead headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and JSON-LD. */
  introduction: string;
  /** Year the shop opened on the corner. */
  founded: number;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public telephone number. */
  phone: string;
  /** Street address and Third Ward landmark cue. */
  address: BusinessAddress;
  /** Query passed to the keyless Google Maps embed and directions links. */
  mapQuery: string;
  /** Weekly schedule, Monday through Sunday. Same-day intervals only. */
  hours: readonly OpeningHours[];
  /** Number of minutes before closing when the last walk-in is seated. */
  lastWalkInMinutesBeforeClose: number;
  /** Contact page copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Clear enquiry framing: walk-in only, no confirmed slots. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Straight Razor & Co. Barbers',
  shortName: 'Straight Razor & Co.',
  tagline: 'A proper cut, a hot towel and a straight razor. Walk in.',
  introduction:
    "Old-school walk-in barbershop in Milwaukee's Third Ward: classic cuts, fades, hot towel straight razor shaves and beard work. No appointments: take a number.",
  founded: 1958,
  email: 'chair@straightrazorco.example',
  phone: '(414) 555-0137',
  address: {
    street: '312 N Broadway',
    city: 'Milwaukee',
    region: 'WI',
    postalCode: '53202',
    country: 'US',
    formatted: '312 N Broadway, Milwaukee, WI 53202',
    landmark: 'a block from the Milwaukee Public Market in the Historic Third Ward',
  },
  mapQuery: '312 N Broadway, Milwaukee, WI 53202',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '09:00', closes: '18:00' },
    { day: 'Wednesday', opens: '09:00', closes: '18:00' },
    { day: 'Thursday', opens: '09:00', closes: '20:00' },
    { day: 'Friday', opens: '09:00', closes: '20:00' },
    { day: 'Saturday', opens: '08:00', closes: '16:00' },
    { day: 'Sunday' },
  ],
  lastWalkInMinutesBeforeClose: 30,
  enquiries: {
    title: 'Send an enquiry',
    introduction:
      'Questions, wedding parties, group grooming, gift certificates or lost and found. We are walk-in only and do not take appointments.',
    usefulToInclude: [
      'What the enquiry is about (wedding party, group grooming, gift certificate or lost and found)',
      'The date and number of people for a group or wedding party',
      'Which services you are interested in',
      'A barber you would like to ask for',
      'A phone number if you prefer a call back',
    ],
  },
};
