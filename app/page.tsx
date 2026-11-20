import type { Metadata } from 'next';
import {
  ChairsShowcase,
  HomeVisitBand,
  PriceTeaser,
  RitualTimeline,
  ShopHero,
  WalkInsBand,
} from '../components/home-sections';
import { barbers } from '../content/barbers';
import { business } from '../content/business';
import { favouriteServices, serviceById } from '../content/services';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const favourites = favouriteServices();
  const classicCut = serviceById('classic-cut');

  return (
    <>
      {/* 1. Shop-window hero with today's hours, open status and classic cut price */}
      <ShopHero
        hours={business.hours}
        lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
        classicCutPrice={classicCut?.price ?? 38}
      >
        <ShopHero.Heading>
          A proper cut, a hot towel and a straight razor. Walk in.
        </ShopHero.Heading>
        <ShopHero.Subline>
          Four chairs, no appointments, since {business.founded} on the same corner. Walk in, take a
          number and take a seat.
        </ShopHero.Subline>
        <ShopHero.Actions
          primaryHref="/visit/"
          primaryLabel="Walk in today"
          secondaryHref="/prices/"
          secondaryLabel="See the price list"
        />
      </ShopHero>

      {/* 2. Walk-ins note ("Take a number") — full-bleed oxblood band */}
      <WalkInsBand>
        <WalkInsBand.Kicker>Take a number</WalkInsBand.Kicker>
        <WalkInsBand.Lines>
          <p className="m-0">No appointments.</p>
          <p className="m-0">Take a ticket at the door.</p>
          <p className="m-0">Your barber calls your number.</p>
        </WalkInsBand.Lines>
        <WalkInsBand.Note>
          Last walk-in {business.lastWalkInMinutesBeforeClose} minutes before close · Four chairs on N Broadway
        </WalkInsBand.Note>
      </WalkInsBand>

      {/* 3. Price board teaser — five house favourites on a felt letter board */}
      <PriceTeaser items={favourites} boardTitle="House Favourites">
        <PriceTeaser.Heading>On the wall since &apos;58</PriceTeaser.Heading>
        <PriceTeaser.Lede>
          Straightforward prices posted on the felt board. Every cut finishes with a warm towel and a
          straight-razor neck shave.
        </PriceTeaser.Lede>
      </PriceTeaser>

      {/* 4. The chairs — four barbers over a hex tile floor strip */}
      <ChairsShowcase barbers={barbers}>
        <ChairsShowcase.Kicker>Four numbered chairs</ChairsShowcase.Kicker>
        <ChairsShowcase.Heading>The Barbers</ChairsShowcase.Heading>
      </ChairsShowcase>

      {/* 5. The ritual — hot towel shave in five steps */}
      <RitualTimeline>
        <RitualTimeline.Kicker>The long chair</RitualTimeline.Kicker>
        <RitualTimeline.Heading>
          The hot towel shave, the way it&apos;s done
        </RitualTimeline.Heading>
        <RitualTimeline.Lede>
          Forty-five unhurried minutes in a reclined porcelain chair — steam, badger brush, honed
          steel and an ice-cold finish.
        </RitualTimeline.Lede>
        <RitualTimeline.Steps>
          <RitualTimeline.Step step={1} title="Steaming hot towel">
            A wrung cotton towel straight from the steamer softens the beard and opens the skin.
          </RitualTimeline.Step>
          <RitualTimeline.Step step={2} title="Warm mug lather">
            Rich soap whipped with a badger brush in a heated ceramic mug until the foam stands stiff.
          </RitualTimeline.Step>
          <RitualTimeline.Step step={3} title="Painted on thick">
            Slow circular strokes lift the grain across jaw, cheek and throat before the blade touches down.
          </RitualTimeline.Step>
          <RitualTimeline.Step step={4} title="Honed straight razor">
            Fresh off the leather strop for one clean, steady pass — or two on The Royal Shave.
          </RitualTimeline.Step>
          <RitualTimeline.Step step={5} title="Cold towel &amp; tonic">
            A chilled eucalyptus towel closes the pores, finished with witch hazel and bay rum.
          </RitualTimeline.Step>
        </RitualTimeline.Steps>
      </RitualTimeline>

      {/* 6. Visit band — dark felt band with hours ledger, address and large barber pole */}
      <HomeVisitBand
        hours={business.hours}
        lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
        address={business.address.formatted}
        landmark={business.address.landmark}
        phone={business.phone}
        mapQuery={business.mapQuery}
      >
        <HomeVisitBand.Heading>Pull up a chair</HomeVisitBand.Heading>
        <HomeVisitBand.Lede>
          When the pole is turning on N Broadway, the door is open. Last walk-in{' '}
          {business.lastWalkInMinutesBeforeClose} minutes before close.
        </HomeVisitBand.Lede>
      </HomeVisitBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
