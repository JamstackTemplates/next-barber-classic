import type { Metadata } from 'next';
import { EnquiryPanel, ShopSidebar } from '../../components/contact-sections';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Enquiries &amp; groups" title={business.enquiries.title} motif="envelope">
        <p className="m-0">{business.enquiries.introduction}</p>
      </PageHead>

      <div className="paper-grain bg-bg py-12 sm:py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          <EnquiryPanel
            hosted={hosted}
            siteId={site.jamstacksSite}
            embedUrl={site.jamstacksEmbedUrl}
            email={business.email}
            fallbackHeading="Write to the shop directly"
            fallbackBody="The hosted enquiry form is not connected yet. Send your note straight to our shop inbox and a barber will reply between chairs."
            footnote="Wedding party and group requests are enquiries. A barber will reply to arrange the details."
          />

          <ShopSidebar
            email={business.email}
            phone={business.phone}
            address={business.address.formatted}
            landmark={business.address.landmark}
            usefulToInclude={business.enquiries.usefulToInclude}
          >
            <ShopSidebar.Notice>
              We don&apos;t take appointments, just walk in. Use this page for wedding party or
              group grooming enquiries, gift certificates, or something left behind by a chair.
            </ShopSidebar.Notice>
          </ShopSidebar>
        </div>
      </div>
    </>
  );
}
