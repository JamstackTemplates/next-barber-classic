import type { ReactNode } from 'react';
import { PoleStripeRule } from './art/dividers';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from './art/icons';
import { CopyEmail } from './copy-email';
import { JamstacksSupportForm } from './jamstacks-support-form';

type ChildrenProps = { children: ReactNode };

/**
 * Left column on /contact/: cream paper panel topped with a diagonal pole stripe rule,
 * rendering either the hosted JamstacksSupportForm or the clear email fallback,
 * followed by the enquiry wording note.
 */
export function EnquiryPanel({
  hosted,
  siteId,
  embedUrl,
  email,
  fallbackHeading,
  fallbackBody,
  footnote,
}: {
  hosted: boolean;
  siteId: string;
  embedUrl: string;
  email: string;
  fallbackHeading: string;
  fallbackBody: string;
  footnote: string;
}) {
  return (
    <section aria-label="Enquiry form" className="lg:col-span-7">
      <div className="overflow-hidden rounded-ui border-2 border-line bg-surface shadow-sm">
        <PoleStripeRule />
        <div className="p-6 sm:p-8">
          {hosted ? (
            <JamstacksSupportForm siteId={siteId} embedUrl={embedUrl} email={email} />
          ) : (
            <div>
              <h2 className="m-0 font-display text-2xl text-ink">{fallbackHeading}</h2>
              <p className="mt-3 text-base text-muted">{fallbackBody}</p>
              <p className="mt-4">
                <a className="text-link wrap-anywhere font-semibold" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
            </div>
          )}

          <p className="mt-6 mb-0 border-t border-line pt-4 text-sm italic text-muted">
            {footnote}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Right column on /contact/: oxblood sidebar with always-visible email, phone, address,
 * walk-in reminder and bullet list of helpful details to include.
 */
function SidebarRoot({
  email,
  phone,
  address,
  landmark,
  usefulToInclude,
  children,
}: {
  email: string;
  phone: string;
  address: string;
  landmark: string;
  usefulToInclude: readonly string[];
  children: ReactNode;
}) {
  return (
    <aside aria-label="Contact details" className="lg:col-span-5">
      <div className="oxblood-band rounded-ui border-2 border-gold/75 p-6 text-[#FBF5E8] shadow-md sm:p-8">
        {children}

        <dl className="m-0 mt-6 space-y-4 border-t border-gold/35 pt-5 text-sm sm:text-base">
          <div>
            <dt className="small-caps flex items-center gap-2 text-xs text-[#F8E2A1]">
              <EnvelopeIcon className="h-4 w-4" /> Email
            </dt>
            <dd className="m-0 mt-1">
              <a
                className="wrap-anywhere font-semibold text-[#FBF5E8] underline decoration-gold hover:text-[#F8E2A1]"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                <CopyEmail email={email} tone="on-dark" />
              </div>
            </dd>
          </div>

          {phone ? (
            <div>
              <dt className="small-caps flex items-center gap-2 text-xs text-[#F8E2A1]">
                <PhoneIcon className="h-4 w-4" /> Phone
              </dt>
              <dd className="m-0 mt-1">
                <a
                  className="font-semibold text-[#FBF5E8] underline decoration-gold hover:text-[#F8E2A1]"
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                >
                  {phone}
                </a>
              </dd>
            </div>
          ) : null}

          <div>
            <dt className="small-caps flex items-center gap-2 text-xs text-[#F8E2A1]">
              <MapPinIcon className="h-4 w-4" /> The Corner
            </dt>
            <dd className="m-0 mt-1 text-[#FBF5E8]">
              {address}
              <span className="block text-xs text-[#F3E9D3]/80">{landmark}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-gold/35 pt-5">
          <h2 className="small-caps m-0 text-sm text-[#F8E2A1]">Helpful to include</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#F3E9D3]/95">
            {usefulToInclude.map(tip => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function SidebarNotice({ children }: ChildrenProps) {
  return (
    <div className="rounded-ui border border-gold/50 bg-[#460D16]/60 px-4 py-3">
      <p className="m-0 font-script text-2xl text-[#F8E2A1]">Walk-ins only</p>
      <p className="mt-1 mb-0 text-sm leading-relaxed text-[#FBF5E8]">{children}</p>
    </div>
  );
}

export const ShopSidebar = Object.assign(SidebarRoot, {
  Notice: SidebarNotice,
});
