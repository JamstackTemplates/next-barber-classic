/**
 * Price list sections and services for Straight Razor & Co. Barbers.
 *
 * Frequent owner edits:
 * - Update `price` (whole USD dollars, 5–200) to change prices on Home, /prices/ and JSON-LD.
 * - Set `available: false` to dim a service and tuck a "Not today" card into the board.
 * - Keep exactly five services with `favourite: true` for the Home letter board teaser.
 */

export interface ServiceSection {
  /** Stable, URL-safe anchor ID (lowercase letters, digits, hyphens). */
  id: string;
  /** Heading painted in gold leaf on the board's header rail. */
  title: string;
  /** Optional note displayed beneath the board's title. */
  note?: string;
  /** Display order on the price list (ascending). */
  order: number;
}

export interface Service {
  /** Stable, URL-safe ID referenced by barbers and structured data. */
  id: string;
  /** Must match a section ID in `serviceSections`. */
  sectionId: string;
  /** Service name shown on the letter board. */
  name: string;
  /** Short description shown beneath the service row. */
  description: string;
  /** Price in whole US dollars (integer, 5–200). */
  price: number;
  /** Typical chair time in minutes (multiple of 5, 5–120). */
  minutes: number;
  /** False keeps the service on the board dimmed with a "Not today" tag. */
  available: boolean;
  /** True includes the service on the Home teaser board (must total 5). */
  favourite: boolean;
  /** Optional italic qualifier (eligibility, free-between-cuts note, etc.). */
  note?: string;
}

export const serviceSections: readonly ServiceSection[] = [
  { id: 'cuts', title: 'Cuts', order: 1 },
  {
    id: 'shaves',
    title: 'Shaves',
    note: 'Allow time: the long chair is first come, first served.',
    order: 2,
  },
  { id: 'beard', title: 'Beard', order: 3 },
  {
    id: 'full-chair',
    title: 'The Full Chair',
    note: 'The full works, start to finish, in the same chair.',
    order: 4,
  },
  { id: 'between-visits', title: 'Between Visits', order: 5 },
];

export const services: readonly Service[] = [
  {
    id: 'classic-cut',
    sectionId: 'cuts',
    name: 'The Classic Cut',
    description: 'Scissor and clipper, finished with a hot towel and a straight razor neck shave.',
    price: 38,
    minutes: 30,
    available: true,
    favourite: true,
  },
  {
    id: 'skin-fade',
    sectionId: 'cuts',
    name: 'Skin Fade',
    description: 'Faded to the skin and blended by hand.',
    price: 42,
    minutes: 40,
    available: true,
    favourite: true,
  },
  {
    id: 'scissor-over-comb',
    sectionId: 'cuts',
    name: 'Scissor-Over-Comb',
    description: 'Scissors only, for longer styles and side parts.',
    price: 45,
    minutes: 40,
    available: true,
    favourite: false,
  },
  {
    id: 'flat-top',
    sectionId: 'cuts',
    name: 'Flat Top',
    description: 'Squared off with a level and a steady hand.',
    price: 40,
    minutes: 35,
    available: true,
    favourite: false,
  },
  {
    id: 'buzz-cut',
    sectionId: 'cuts',
    name: 'Buzz Cut',
    description: 'One guard all over, with a lined-up neck.',
    price: 24,
    minutes: 15,
    available: true,
    favourite: false,
  },
  {
    id: 'junior-cut',
    sectionId: 'cuts',
    name: 'Junior Cut',
    description: 'A proper cut for younger regulars.',
    price: 26,
    minutes: 25,
    available: true,
    favourite: false,
    note: '12 and under; booster seat on request',
  },
  {
    id: 'senior-cut',
    sectionId: 'cuts',
    name: 'Senior Cut',
    description: 'Classic scissor and clipper cut with hot towel finish.',
    price: 28,
    minutes: 25,
    available: true,
    favourite: false,
    note: '65 and over, Tuesday to Thursday',
  },
  {
    id: 'hot-towel-shave',
    sectionId: 'shaves',
    name: 'Hot Towel Shave',
    description: 'Hot towels, warm lather, one pass with the straight razor and a cold towel to finish.',
    price: 48,
    minutes: 45,
    available: true,
    favourite: true,
  },
  {
    id: 'royal-shave',
    sectionId: 'shaves',
    name: 'The Royal Shave',
    description: 'Two passes, pre-shave oil, a face massage and hot and cold towels.',
    price: 65,
    minutes: 60,
    available: true,
    favourite: false,
  },
  {
    id: 'head-shave',
    sectionId: 'shaves',
    name: 'Head Shave',
    description: 'Straight razor over the whole scalp, with a hot towel.',
    price: 40,
    minutes: 35,
    available: true,
    favourite: false,
  },
  {
    id: 'beard-trim',
    sectionId: 'beard',
    name: 'Beard Trim',
    description: 'Shaped with clippers and scissors.',
    price: 22,
    minutes: 20,
    available: true,
    favourite: true,
  },
  {
    id: 'beard-sculpt',
    sectionId: 'beard',
    name: 'Beard Sculpt',
    description: 'Shaped, with cheek and neck lines finished with the razor.',
    price: 32,
    minutes: 30,
    available: true,
    favourite: false,
  },
  {
    id: 'moustache-trim',
    sectionId: 'beard',
    name: 'Moustache Trim',
    description: 'Tidy, trim and a little wax if you want it.',
    price: 12,
    minutes: 10,
    available: true,
    favourite: false,
  },
  {
    id: 'cut-and-shave',
    sectionId: 'full-chair',
    name: 'The Full Chair',
    description: 'A Classic Cut and a Hot Towel Shave together.',
    price: 80,
    minutes: 75,
    available: true,
    favourite: true,
  },
  {
    id: 'cut-and-beard',
    sectionId: 'full-chair',
    name: 'Cut & Beard',
    description: 'A Classic Cut and a Beard Sculpt.',
    price: 55,
    minutes: 50,
    available: true,
    favourite: false,
  },
  {
    id: 'neck-cleanup',
    sectionId: 'between-visits',
    name: 'Neck Clean-Up',
    description: 'Warm lather and straight razor tidy around the collar and ears.',
    price: 12,
    minutes: 10,
    available: true,
    favourite: false,
    note: 'Free within two weeks of your cut',
  },
  {
    id: 'brow-tidy',
    sectionId: 'between-visits',
    name: 'Brow Tidy',
    description: 'Scissor trim.',
    price: 8,
    minutes: 5,
    available: true,
    favourite: false,
  },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function orderedSections(sections: readonly ServiceSection[] = serviceSections): ServiceSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

export function servicesForSection(
  sectionId: string,
  list: readonly Service[] = services,
): Service[] {
  return list.filter(item => item.sectionId === sectionId);
}

export function favouriteServices(list: readonly Service[] = services): Service[] {
  return list.filter(item => item.favourite);
}

export function serviceById(id: string, list: readonly Service[] = services): Service | undefined {
  return list.find(item => item.id === id);
}

/** Validate sections and services with actionable, item-specific errors. */
export function validateServices(
  sections: readonly ServiceSection[] = serviceSections,
  list: readonly Service[] = services,
): void {
  const sectionIds = new Set<string>();
  const orders = new Set<number>();
  for (const section of sections) {
    if (!section.id || !SLUG.test(section.id)) {
      throw new Error(`services section "${section.id}": id must be a URL-safe lowercase slug`);
    }
    if (sectionIds.has(section.id)) {
      throw new Error(`services section "${section.id}": duplicate section id`);
    }
    if (!section.title.trim()) {
      throw new Error(`services section "${section.id}": title is required`);
    }
    if (!Number.isInteger(section.order) || orders.has(section.order)) {
      throw new Error(`services section "${section.id}": order must be a unique integer`);
    }
    sectionIds.add(section.id);
    orders.add(section.order);
  }

  const serviceIds = new Set<string>();
  let favourites = 0;
  for (const service of list) {
    const label = service.id || service.name || '(unnamed)';
    if (!service.id || !SLUG.test(service.id)) {
      throw new Error(`service "${label}": id must be a URL-safe lowercase slug`);
    }
    if (serviceIds.has(service.id)) {
      throw new Error(`service "${service.id}": duplicate service id`);
    }
    serviceIds.add(service.id);
    if (!sectionIds.has(service.sectionId)) {
      throw new Error(`service "${service.id}": unknown sectionId "${service.sectionId}"`);
    }
    if (!service.name.trim()) {
      throw new Error(`service "${service.id}": name is required`);
    }
    if (!service.description.trim()) {
      throw new Error(`service "${service.id}": description is required`);
    }
    if (!Number.isInteger(service.price) || service.price < 5 || service.price > 200) {
      throw new Error(`service "${service.id}": price must be an integer between 5 and 200 USD`);
    }
    if (
      !Number.isInteger(service.minutes) ||
      service.minutes < 5 ||
      service.minutes > 120 ||
      service.minutes % 5 !== 0
    ) {
      throw new Error(`service "${service.id}": minutes must be a multiple of 5 between 5 and 120`);
    }
    if (typeof service.available !== 'boolean') {
      throw new Error(`service "${service.id}": available must be a boolean`);
    }
    if (typeof service.favourite !== 'boolean') {
      throw new Error(`service "${service.id}": favourite must be a boolean`);
    }
    if (service.favourite) favourites++;
  }

  if (favourites !== 5) {
    throw new Error(`services: expected exactly 5 favourites for the home board, found ${favourites}`);
  }
}
