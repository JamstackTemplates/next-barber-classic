import { business } from '../content/business.ts';
import { orderedSections, servicesForSection } from '../content/services.ts';
import { absoluteAssetUrl, absoluteUrl } from './paths.ts';

/**
 * HairSalon schema.org structured data (schema.org has no BarberShop type).
 * Derived directly from content/business.ts and content/services.ts.
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const image = absoluteAssetUrl('/og.png');
  const openingHoursSpecification = business.hours
    .filter(entry => Boolean(entry.opens && entry.closes))
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  const hasOfferCatalog = {
    '@type': 'OfferCatalog',
    name: `${business.shortName} Price List`,
    itemListElement: orderedSections().map(section => ({
      '@type': 'OfferCatalog',
      name: section.title,
      itemListElement: servicesForSection(section.id).map(service => ({
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'USD',
        availability: service.available
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.note
            ? `${service.description} (${service.note})`
            : service.description,
        },
      })),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: business.name,
    description: business.introduction,
    foundingDate: String(business.founded),
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification,
    hasOfferCatalog,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
