import type { Metadata } from 'next';
import { HoursLedger } from '../../components/hours-ledger';
import { PoleStatusBadge, TodayBrassPlate } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import {
  DirectionsSection,
  ShopRulesSign,
  WalkInTickets,
} from '../../components/visit-sections';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Visit',
  description:
    "Walk-in hours, open status, directions and parking for Straight Razor & Co. Barbers in Milwaukee's Historic Third Ward.",
  alternates: { canonical: absoluteUrl('/visit/') },
};

export default function VisitPage() {
  return (
    <>
      <PageHead
        eyebrow="312 N Broadway · Third Ward"
        title="Visit the Shop"
        motif="pin"
        aside={
          <PoleStatusBadge
            hours={business.hours}
            lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
            size="sm"
            tone="dark"
          />
        }
      >
        <p className="m-0">
          No appointments — walk in, pull a number and take a seat. Everything you need for today&apos;s
          hours, the take-a-number routine and parking nearby.
        </p>
      </PageHead>

      {/* Hours ledger & brass status plate */}
      <section aria-label="Hours and current status" className="paper-grain bg-bg py-12 sm:py-16">
        <div className="wrap grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <HoursLedger
              hours={business.hours}
              lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
              variant="sheet"
            />
          </div>

          <div className="space-y-5 lg:col-span-5">
            <TodayBrassPlate
              hours={business.hours}
              lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
              variant="visit"
            />
            <div className="rounded-ui border border-line bg-surface p-5 text-sm leading-relaxed text-muted">
              <p className="small-caps m-0 text-xs text-accent-ink">Good to know before you head over</p>
              <p className="mt-2 mb-0">
                Thursday and Friday evenings stay open until 8 pm for after-work cuts. Saturday
                mornings fill quickly after 9 am — early birds get the shortest wait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How walk-ins work — 4 serrated ticket stubs */}
      <WalkInTickets>
        <WalkInTickets.Heading>How walk-ins work</WalkInTickets.Heading>
        <WalkInTickets.Row>
          <WalkInTickets.Stub number="01" title="Walk in">
            Check the pole out front and push open the corner door — no phone call or sign-up needed.
          </WalkInTickets.Stub>
          <WalkInTickets.Stub number="02" title="Take a number">
            Tear a numbered ticket from the red dispenser inside the door and take a bench seat.
          </WalkInTickets.Stub>
          <WalkInTickets.Stub number="03" title="Ask if you like">
            Take the next free chair, or tell the barber who calls your ticket if you&apos;d rather
            wait for a specific chair.
          </WalkInTickets.Stub>
          <WalkInTickets.Stub number="04" title="Settle at the chair">
            Hot towel, brush-off and settle up right at the chair with card or cash.
          </WalkInTickets.Stub>
        </WalkInTickets.Row>
      </WalkInTickets>

      {/* Map and Third Ward directions & parking */}
      <DirectionsSection
        address={business.address.formatted}
        mapQuery={business.mapQuery}
        phone={business.phone}
      >
        <DirectionsSection.Heading>Finding the corner</DirectionsSection.Heading>
        <DirectionsSection.Block icon="pin" title="Street meters on N Broadway">
          Two-hour metered street parking runs along both sides of N Broadway right outside the shop
          window and around the corner on E St Paul Ave.
        </DirectionsSection.Block>
        <DirectionsSection.Block icon="ticket" title="Public Market garage">
          Just a block north of the door, the Historic Third Ward / Milwaukee Public Market parking
          structure always has covered stalls when Broadway meters are full.
        </DirectionsSection.Block>
        <DirectionsSection.Block icon="clock" title="Bus &amp; Intermodal stops">
          A five-minute walk east from Milwaukee Intermodal Station and steps from MCTS routes along
          Water Street and Broadway.
        </DirectionsSection.Block>
      </DirectionsSection>

      {/* Shop rules — enamel wall sign */}
      <ShopRulesSign>
        <ShopRulesSign.Heading>Shop Rules</ShopRulesSign.Heading>
        <ShopRulesSign.List>
          <ShopRulesSign.Rule>Phones on silent in the chair</ShopRulesSign.Rule>
          <ShopRulesSign.Rule>Kids welcome — booster seat on request</ShopRulesSign.Rule>
          <ShopRulesSign.Rule>Card or cash settled at the chair</ShopRulesSign.Rule>
          <ShopRulesSign.Rule>No appointments — take a number at the door</ShopRulesSign.Rule>
          <ShopRulesSign.Rule>
            Last walk-in {business.lastWalkInMinutesBeforeClose} minutes before close
          </ShopRulesSign.Rule>
        </ShopRulesSign.List>
      </ShopRulesSign>
    </>
  );
}
