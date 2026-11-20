import type { ReactNode } from 'react';
import type { Service, ServiceSection } from '../content/services';
import { servicesForSection } from '../content/services';
import { formatInterval, type OpeningHours } from '../lib/hours';
import { TakeANumberDispenser } from './art/take-a-number';
import { FeltLetterBoard } from './felt-letter-board';
import { SiteLink } from './site-link';

type ChildrenProps = { children: ReactNode };

/**
 * Print-only header block so printing /prices/ produces a clean black-on-white
 * price list with the shop address, phone and weekly hours.
 */
export function PrintPriceHeader({
  name,
  address,
  phone,
  hours,
}: {
  name: string;
  address: string;
  phone: string;
  hours: readonly OpeningHours[];
}) {
  return (
    <div className="print-only mb-6 hidden border-b-2 border-ink pb-4">
      <p className="m-0 font-display text-2xl">{name}</p>
      <p className="mt-1 mb-0 text-sm">
        {address} · {phone} · Walk-ins only — no appointments
      </p>
      <p className="mt-2 mb-0 text-xs">
        {hours.map(h => `${h.day.slice(0, 3)}: ${formatInterval(h)}`).join(' · ')}
      </p>
    </div>
  );
}

/**
 * Alternates full-width and side-by-side felt boards for varied visual rhythm:
 * Cuts (full), Shaves + Beard (paired), The Full Chair (full), Between Visits (compact).
 */
export function PriceBoardsGrid({
  sections,
  allServices,
}: {
  sections: readonly ServiceSection[];
  allServices: readonly Service[];
}) {
  const byId = new Map(sections.map(s => [s.id, s]));
  const cuts = byId.get('cuts');
  const shaves = byId.get('shaves');
  const beard = byId.get('beard');
  const fullChair = byId.get('full-chair');
  const between = byId.get('between-visits');

  // Include any additional owner-added sections gracefully after the standard layout.
  const known = new Set(['cuts', 'shaves', 'beard', 'full-chair', 'between-visits']);
  const extra = sections.filter(s => !known.has(s.id));

  return (
    <div className="wrap space-y-10 py-10 sm:space-y-12 sm:py-14">
      {cuts ? (
        <FeltLetterBoard
          id={cuts.id}
          title={cuts.title}
          note={cuts.note}
          items={servicesForSection(cuts.id, allServices)}
        />
      ) : null}

      {shaves || beard ? (
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {shaves ? (
            <FeltLetterBoard
              id={shaves.id}
              title={shaves.title}
              note={shaves.note}
              items={servicesForSection(shaves.id, allServices)}
            />
          ) : null}
          {beard ? (
            <FeltLetterBoard
              id={beard.id}
              title={beard.title}
              note={beard.note}
              items={servicesForSection(beard.id, allServices)}
            />
          ) : null}
        </div>
      ) : null}

      {fullChair ? (
        <FeltLetterBoard
          id={fullChair.id}
          title={fullChair.title}
          note={fullChair.note}
          items={servicesForSection(fullChair.id, allServices)}
        />
      ) : null}

      {between ? (
        <div className="mx-auto max-w-2xl">
          <FeltLetterBoard
            id={between.id}
            title={between.title}
            note={between.note}
            items={servicesForSection(between.id, allServices)}
          />
        </div>
      ) : null}

      {extra.map(section => (
        <FeltLetterBoard
          key={section.id}
          id={section.id}
          title={section.title}
          note={section.note}
          items={servicesForSection(section.id, allServices)}
        />
      ))}
    </div>
  );
}

/**
 * Cream paper card pinned with four brass tacks for kids, seniors and tipping notes.
 */
function HouseNotesRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="house-notes-heading" className="wrap pb-14">
      <div className="paper-grain relative mx-auto max-w-4xl rounded-ui border-2 border-line bg-surface p-7 shadow-md sm:p-10">
        {/* Four brass corner tacks */}
        <span aria-hidden="true" className="absolute top-3 left-3 h-3.5 w-3.5 rounded-full border border-[#23181A] bg-gold shadow-xs" />
        <span aria-hidden="true" className="absolute top-3 right-3 h-3.5 w-3.5 rounded-full border border-[#23181A] bg-gold shadow-xs" />
        <span aria-hidden="true" className="absolute bottom-3 left-3 h-3.5 w-3.5 rounded-full border border-[#23181A] bg-gold shadow-xs" />
        <span aria-hidden="true" className="absolute right-3 bottom-3 h-3.5 w-3.5 rounded-full border border-[#23181A] bg-gold shadow-xs" />
        {children}
      </div>
    </section>
  );
}

function HouseNotesHeading({ children }: ChildrenProps) {
  return (
    <h2 id="house-notes-heading" className="m-0 text-center font-display text-2xl text-ink sm:text-3xl">
      {children}
    </h2>
  );
}

function HouseNotesGrid({ children }: ChildrenProps) {
  return <dl className="m-0 mt-7 grid gap-6 sm:grid-cols-3">{children}</dl>;
}

function HouseNotesItem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t-2 border-gold/60 pt-3">
      <dt className="small-caps text-sm text-accent-ink">{title}</dt>
      <dd className="m-0 mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{children}</dd>
    </div>
  );
}

export const HouseNotesCard = Object.assign(HouseNotesRoot, {
  Heading: HouseNotesHeading,
  Grid: HouseNotesGrid,
  Item: HouseNotesItem,
});

/**
 * Oxblood walk-ins reminder band at the bottom of /prices/ linking to /visit/.
 */
function ReminderRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="prices-walkin-heading" className="no-print oxblood-band border-y-2 border-gold/60 py-10">
      <div className="wrap flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <TakeANumberDispenser number={14} compact />
          <div>{children}</div>
        </div>
        <SiteLink href="/visit/" className="button button-on-dark shrink-0">
          Hours &amp; directions
        </SiteLink>
      </div>
    </section>
  );
}

function ReminderHeading({ children }: ChildrenProps) {
  return (
    <h2 id="prices-walkin-heading" className="m-0 font-display text-2xl text-[#FBF5E8] sm:text-3xl">
      {children}
    </h2>
  );
}

function ReminderText({ children }: ChildrenProps) {
  return <p className="mt-1.5 mb-0 max-w-xl text-sm text-[#F3E9D3]/90 sm:text-base">{children}</p>;
}

export const WalkInsReminderBand = Object.assign(ReminderRoot, {
  Heading: ReminderHeading,
  Text: ReminderText,
});
