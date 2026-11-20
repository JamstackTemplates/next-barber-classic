import type { ReactNode } from 'react';
import { mapDirectionsUrl } from '../lib/maps';
import { ClockIcon, MapPinIcon, PhoneIcon, TicketIcon } from './art/icons';
import { GoogleMap } from './google-map';

type ChildrenProps = { children: ReactNode };

/**
 * Four serrated walk-in ticket stubs ("How walk-ins work"), wrapping 2×2 on mobile.
 */
function WalkInTicketsRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="how-walkins-heading" className="pinstripe-bg border-y border-line py-14 sm:py-16">
      <div className="wrap">{children}</div>
    </section>
  );
}

function WalkInTicketsHeading({ children }: ChildrenProps) {
  return (
    <h2 id="how-walkins-heading" className="m-0 text-center font-display text-3xl text-ink sm:text-4xl">
      {children}
    </h2>
  );
}

function WalkInTicketsRow({ children }: ChildrenProps) {
  return (
    <ol
      className="m-0 mt-10 grid grid-cols-2 gap-x-4 gap-y-8 p-0 lg:grid-cols-4 lg:gap-6"
      style={{ listStyle: 'none' }}
    >
      {children}
    </ol>
  );
}

function WalkInTicketStub({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="ticket-stub flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-dashed border-gold/80 pb-2">
          <span className="small-caps text-[0.7rem] text-gold-text">Step</span>
          <span className="font-display text-2xl text-accent-ink">{number}</span>
        </div>
        <h3 className="mt-3 mb-0 font-display text-lg text-ink">{title}</h3>
        <p className="mt-1.5 mb-0 text-sm leading-relaxed text-muted">{children}</p>
      </div>
      <p className="small-caps mt-4 mb-0 border-t border-dashed border-line pt-2 text-[0.68rem] text-muted">
        Walk-in ticket
      </p>
    </li>
  );
}

export const WalkInTickets = Object.assign(WalkInTicketsRoot, {
  Heading: WalkInTicketsHeading,
  Row: WalkInTicketsRow,
  Stub: WalkInTicketStub,
});

/**
 * Map framed like a painted oxblood window pane beside Third Ward directions & parking.
 */
function DirectionsRoot({
  address,
  mapQuery,
  phone,
  children,
}: {
  address: string;
  mapQuery: string;
  phone: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="directions-heading" className="paper-grain bg-bg py-14 sm:py-16">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        {/* Left 7 cols: GoogleMap framed in an oxblood storefront window pane */}
        <div className="lg:col-span-7">
          <div className="rounded-ui border-2 border-[#23181A] bg-accent p-3 shadow-lg">
            <div className="border-2 border-gold/80 bg-surface">
              <GoogleMap
                address={mapQuery}
                title={`Map showing Straight Razor & Co. Barbers at ${address}`}
              />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-[#FBF5E8]">
              <span className="flex items-center gap-1.5 font-semibold">
                <MapPinIcon className="h-4 w-4 text-[#F8E2A1]" />
                {address}
              </span>
              <a
                href={mapDirectionsUrl(mapQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="small-caps text-xs text-[#F8E2A1] underline hover:text-[#FBF5E8]"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Right 5 cols: parking, transit and directions text */}
        <div className="space-y-5 lg:col-span-5">
          {children}
          <p className="flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
            <PhoneIcon className="h-4 w-4 shrink-0 text-accent-ink" />
            <span>
              Lost on Broadway? Call the desk:{' '}
              <a className="text-link font-semibold" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                {phone}
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function DirectionsHeading({ children }: ChildrenProps) {
  return (
    <h2 id="directions-heading" className="m-0 font-display text-3xl text-ink">
      {children}
    </h2>
  );
}

function DirectionsBlock({
  icon,
  title,
  children,
}: {
  icon: 'pin' | 'clock' | 'ticket';
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-ui border border-gold/70 bg-surface text-accent-ink">
        {icon === 'pin' && <MapPinIcon className="h-4 w-4" />}
        {icon === 'clock' && <ClockIcon className="h-4 w-4" />}
        {icon === 'ticket' && <TicketIcon className="h-4 w-4" />}
      </div>
      <div>
        <h3 className="small-caps m-0 text-sm text-ink">{title}</h3>
        <p className="mt-1 mb-0 text-sm leading-relaxed text-muted sm:text-base">{children}</p>
      </div>
    </div>
  );
}

export const DirectionsSection = Object.assign(DirectionsRoot, {
  Heading: DirectionsHeading,
  Block: DirectionsBlock,
});

/**
 * Shop rules styled as a cream-on-oxblood enamel wall sign with rounded border and corner rivets.
 */
function ShopRulesRoot({ children }: ChildrenProps) {
  return (
    <section aria-labelledby="shop-rules-heading" className="wrap pt-8 pb-16 sm:pt-12 sm:pb-20">
      <div className="enamel-sign mx-auto max-w-4xl px-6 py-8 sm:px-10 sm:py-10">
        {/* Four brass corner rivets */}
        <span aria-hidden="true" className="absolute top-3.5 left-3.5 h-3 w-3 rounded-full border border-[#23181A] bg-[#E2BC72]" />
        <span aria-hidden="true" className="absolute top-3.5 right-3.5 h-3 w-3 rounded-full border border-[#23181A] bg-[#E2BC72]" />
        <span aria-hidden="true" className="absolute bottom-3.5 left-3.5 h-3 w-3 rounded-full border border-[#23181A] bg-[#E2BC72]" />
        <span aria-hidden="true" className="absolute right-3.5 bottom-3.5 h-3 w-3 rounded-full border border-[#23181A] bg-[#E2BC72]" />
        {children}
      </div>
    </section>
  );
}

function ShopRulesHeading({ children }: ChildrenProps) {
  return (
    <div className="text-center">
      <p className="m-0 font-script text-3xl text-[#F8E2A1]">House notice</p>
      <h2 id="shop-rules-heading" className="mt-1 mb-0 font-display text-2xl tracking-wide text-[#FBF5E8] sm:text-3xl">
        {children}
      </h2>
    </div>
  );
}

function ShopRulesList({ children }: ChildrenProps) {
  return (
    <ul className="m-0 mt-7 grid gap-4 border-t border-gold/40 pt-6 pl-0 sm:grid-cols-2 lg:grid-cols-3" style={{ listStyle: 'none' }}>
      {children}
    </ul>
  );
}

function ShopRule({ children }: ChildrenProps) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-snug text-[#FBF5E8] sm:text-base">
      <span aria-hidden="true" className="mt-1.5 inline-block h-2 w-2 shrink-0 rotate-45 bg-[#F8E2A1]" />
      <span>{children}</span>
    </li>
  );
}

export const ShopRulesSign = Object.assign(ShopRulesRoot, {
  Heading: ShopRulesHeading,
  List: ShopRulesList,
  Rule: ShopRule,
});
