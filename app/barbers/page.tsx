import type { Metadata } from 'next';
import {
  AskByNameQuote,
  ChairsSequence,
  ShopHistoryRibbon,
} from '../../components/barbers-sections';
import { PageHead } from '../../components/page-head';
import { barbers } from '../../content/barbers';
import { business } from '../../content/business';
import { services } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Barbers',
  description:
    'Meet the four barbers at Straight Razor & Co. in Milwaukee — their numbered chairs, days in the shop and specialties.',
  alternates: { canonical: absoluteUrl('/barbers/') },
};

export default function BarbersPage() {
  return (
    <>
      <PageHead eyebrow="Meet the four chairs" title="The Barbers" motif="chairs">
        <p className="m-0">
          Four numbered porcelain chairs, each with its own hand and weekly schedule. Take the next
          open chair, or wait for your usual barber.
        </p>
      </PageHead>

      <ChairsSequence
        barbers={barbers}
        services={services}
        hours={business.hours}
        lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
      />

      <AskByNameQuote>
        <AskByNameQuote.Script>Ask for someone by name</AskByNameQuote.Script>
        <AskByNameQuote.Body>
          We never take appointments, but you&apos;re always welcome to wait for a particular chair.
          Pull a ticket at the door, tell the barber who calls your number who you&apos;re waiting
          for, and grab a coffee or the morning paper until their chair opens up.
        </AskByNameQuote.Body>
      </AskByNameQuote>

      <ShopHistoryRibbon>
        <ShopHistoryRibbon.Heading>On the corner since {business.founded}</ShopHistoryRibbon.Heading>
        <ShopHistoryRibbon.Ribbon>
          <ShopHistoryRibbon.Milestone year="1958">
            Doors open at 312 N Broadway with four porcelain Belmont chairs and a wall-mounted pole.
          </ShopHistoryRibbon.Milestone>
          <ShopHistoryRibbon.Milestone year="1989">
            Augie Ferraro takes over Chair 1 as the shop&apos;s third owner and keeps the walk-in rule intact.
          </ShopHistoryRibbon.Milestone>
          <ShopHistoryRibbon.Milestone year="2004">
            New black-and-white hexagonal floor tile laid from the front window to the back-bar mirror.
          </ShopHistoryRibbon.Milestone>
          <ShopHistoryRibbon.Milestone year="Today">
            Four barbers, the same corner window, fresh hot towels and still no appointment book.
          </ShopHistoryRibbon.Milestone>
        </ShopHistoryRibbon.Ribbon>
      </ShopHistoryRibbon>
    </>
  );
}
