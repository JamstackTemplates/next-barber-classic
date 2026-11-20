import { business } from '../content/business';
import { HexTileBand } from './art/dividers';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { WordmarkInline } from './art/wordmark';
import { SiteLink } from './site-link';

/**
 * Branded back-door footer: hex tile strip across the top, then an oxblood wooden door panel
 * with gold-leaf wordmark, Est. 1958 in script, address, compact hours, contact and credit.
 */
export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="site-footer mt-0">
      <HexTileBand height={30} />
      <div className="oxblood-band border-t-2 border-gold/60 text-[#FBF5E8]">
        <div className="wrap py-12 sm:py-14">
          <div className="grid gap-10 border border-gold/40 bg-[#4A0D18]/35 p-6 sm:p-8 lg:grid-cols-12">
            {/* Left column: gold-leaf wordmark, script est. 1958 & address */}
            <div className="lg:col-span-5">
              <SiteLink href="/" className="inline-block no-underline hover:no-underline">
                <WordmarkInline tone="footer" />
              </SiteLink>
              <p className="mt-1 font-script text-3xl text-[#F8E2A1]">
                Est. {business.founded}
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F3E9D3]/90">
                Four chairs, walk-ins only — classic cuts, skin fades, hot towel straight razor
                shaves and beard work in Milwaukee&apos;s Historic Third Ward.
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-[#FBF5E8]">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#E2BC72]" />
                <span>
                  {business.address.formatted}
                  <span className="block text-xs text-[#F3E9D3]/80">
                    {business.address.landmark}
                  </span>
                </span>
              </p>
            </div>

            {/* Middle column: compact weekly hours */}
            <div className="lg:col-span-4">
              <h2 className="small-caps text-sm text-[#F8E2A1]">Shop Hours</h2>
              <dl className="tabular mt-3 space-y-1.5 text-sm text-[#F3E9D3]">
                <div className="flex justify-between gap-4 border-b border-gold/20 pb-1">
                  <dt>Tue – Wed</dt>
                  <dd>9 am – 6 pm</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gold/20 pb-1">
                  <dt>Thu – Fri</dt>
                  <dd>9 am – 8 pm</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-gold/20 pb-1">
                  <dt>Saturday</dt>
                  <dd>8 am – 4 pm</dd>
                </div>
                <div className="flex justify-between gap-4 text-[#E2BC72]">
                  <dt>Sun – Mon</dt>
                  <dd>Closed</dd>
                </div>
              </dl>
              <p className="mt-2.5 text-xs text-[#F3E9D3]/80">
                Last walk-in {business.lastWalkInMinutesBeforeClose} minutes before close. No appointments.
              </p>
            </div>

            {/* Right column: contact & quick links */}
            <div className="lg:col-span-3">
              <h2 className="small-caps text-sm text-[#F8E2A1]">The Shop</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4 shrink-0 text-[#E2BC72]" />
                  <a className="text-[#FBF5E8] underline decoration-gold/70 hover:text-[#F8E2A1]" href={telHref}>
                    {business.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <EnvelopeIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#E2BC72]" />
                  <a
                    className="wrap-anywhere text-[#FBF5E8] underline decoration-gold/70 hover:text-[#F8E2A1]"
                    href={`mailto:${business.email}`}
                  >
                    {business.email}
                  </a>
                </li>
              </ul>

              <nav aria-label="Footer" className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-gold/25 pt-4 text-sm">
                <SiteLink href="/prices/" className="small-caps text-[#F8E2A1] no-underline hover:underline">
                  Price List
                </SiteLink>
                <SiteLink href="/barbers/" className="small-caps text-[#F8E2A1] no-underline hover:underline">
                  Barbers
                </SiteLink>
                <SiteLink href="/visit/" className="small-caps text-[#F8E2A1] no-underline hover:underline">
                  Visit
                </SiteLink>
                <SiteLink href="/contact/" className="small-caps text-[#F8E2A1] no-underline hover:underline">
                  Contact
                </SiteLink>
              </nav>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#F3E9D3]/80">
            <p className="m-0">
              {business.name} · {business.address.street}, {business.address.city}
            </p>
            <span title="Made with love by jamstacks.net">
              with <span role="img" aria-label="love">❤️</span>{' '}
              <a
                className="text-[#F8E2A1] no-underline hover:underline"
                href="https://jamstacks.net"
              >
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
