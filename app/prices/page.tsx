import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { PriceJumpBar } from '../../components/price-jump-bar';
import {
  HouseNotesCard,
  PriceBoardsGrid,
  PrintPriceHeader,
  WalkInsReminderBand,
} from '../../components/prices-sections';
import { business } from '../../content/business';
import { orderedSections, services } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Price List',
  description:
    'Full walk-in barbershop price list: classic cuts, skin fades, hot towel straight razor shaves, beard trims and combos.',
  alternates: { canonical: absoluteUrl('/prices/') },
};

export default function PricesPage() {
  const sections = orderedSections();

  return (
    <>
      <PageHead eyebrow="Posted on the felt board" title="Price List" motif="comb">
        <p className="m-0">
          Every service, chair time and walk-in rule in plain sight. All prices are whole US dollars,
          settled at the chair by card or cash.
        </p>
      </PageHead>

      <PriceJumpBar sections={sections} />

      <div className="paper-grain bg-bg">
        <div className="wrap pt-6">
          <PrintPriceHeader
            name={business.name}
            address={business.address.formatted}
            phone={business.phone}
            hours={business.hours}
          />
        </div>

        <PriceBoardsGrid sections={sections} allServices={services} />

        <HouseNotesCard>
          <HouseNotesCard.Heading>House Notes</HouseNotesCard.Heading>
          <HouseNotesCard.Grid>
            <HouseNotesCard.Item title="Kids &amp; first cuts">
              Young regulars 12 and under get a patient chair and a wooden booster seat on request.
              First-haircut keepsake envelopes are always behind the counter.
            </HouseNotesCard.Item>
            <HouseNotesCard.Item title="Seniors">
              Regulars 65 and over enjoy our Senior Cut rate Tuesday through Thursday — same scissor
              and clipper care, hot towel and razor neck tidy.
            </HouseNotesCard.Item>
            <HouseNotesCard.Item title="Tipping &amp; payment">
              Card and cash are both welcome at the chair. Tips go straight to your barber, never
              split through a register pool.
            </HouseNotesCard.Item>
          </HouseNotesCard.Grid>
        </HouseNotesCard>
      </div>

      <WalkInsReminderBand>
        <WalkInsReminderBand.Heading>No appointments — just walk in</WalkInsReminderBand.Heading>
        <WalkInsReminderBand.Text>
          Take a ticket from the dispenser by the door. Last walk-in is taken{' '}
          {business.lastWalkInMinutesBeforeClose} minutes before close.
        </WalkInsReminderBand.Text>
      </WalkInsReminderBand>
    </>
  );
}
