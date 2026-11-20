import { EmptyChairArt } from '../components/art/empty-chair';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="paper-grain bg-bg">
      <div className="wrap flex flex-col items-center py-14 text-center sm:py-20">
        <EmptyChairArt />
        <p className="mt-6 mb-0 font-script text-4xl text-accent-ink sm:text-5xl">
          Sorry, friend
        </p>
        <h1 className="mt-2 mb-0 font-display text-4xl text-ink sm:text-5xl">
          This chair&apos;s empty.
        </h1>
        <p className="mt-4 max-w-md text-base text-muted sm:text-lg">
          That page isn&apos;t on our board. Step back to the front window or check the price list.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <SiteLink href="/" className="button">
            Back to the front door
          </SiteLink>
          <SiteLink href="/prices/" className="button button-quiet">
            See the price list
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
