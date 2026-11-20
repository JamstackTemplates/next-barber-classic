import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { barbers, validateBarbers } from '../content/barbers.ts';
import { business } from '../content/business.ts';
import {
  favouriteServices,
  serviceById,
  services,
  serviceSections,
  validateServices,
} from '../content/services.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.formatted.trim(), 'business.address.formatted: required');
  assert.ok(
    Number.isInteger(business.lastWalkInMinutesBeforeClose) &&
      business.lastWalkInMinutesBeforeClose >= 0 &&
      business.lastWalkInMinutesBeforeClose <= 120,
    'business.lastWalkInMinutesBeforeClose: integer between 0 and 120',
  );
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('services collection satisfies all ID, pricing, duration, section and favourite rules', () => {
  assert.doesNotThrow(() => validateServices(serviceSections, services));
  assert.ok(services.length > 0, 'services: at least one service required');
  assert.equal(favouriteServices().length, 5);
  assert.ok(serviceById('classic-cut'), 'services: classic-cut entry expected');

  // Duplicate ID names the offending service
  assert.throws(
    () => validateServices(serviceSections, [...services, { ...services[0] }]),
    /classic-cut/,
  );
  // Unknown sectionId names the offending service
  assert.throws(
    () =>
      validateServices(
        serviceSections,
        services.map(s => (s.id === 'skin-fade' ? { ...s, sectionId: 'nonexistent' } : s)),
      ),
    /skin-fade/,
  );
  // Out-of-range or non-integer price names the offending service
  for (const badPrice of [4, 201, 38.5]) {
    assert.throws(
      () =>
        validateServices(
          serviceSections,
          services.map(s => (s.id === 'flat-top' ? { ...s, price: badPrice } : s)),
        ),
      /flat-top/,
    );
  }
  // Invalid minutes (not multiple of 5 or out of 5–120) names the offending service
  for (const badMinutes of [0, 7, 125]) {
    assert.throws(
      () =>
        validateServices(
          serviceSections,
          services.map(s => (s.id === 'buzz-cut' ? { ...s, minutes: badMinutes } : s)),
        ),
      /buzz-cut/,
    );
  }
  // Must keep exactly 5 favourites
  assert.throws(
    () =>
      validateServices(
        serviceSections,
        services.map(s => (s.id === 'classic-cut' ? { ...s, favourite: false } : s)),
      ),
    /5 favourites/,
  );
});

test('barbers collection validates unique chairs, knownFor service IDs and open shop days', () => {
  assert.doesNotThrow(() => validateBarbers(barbers, services, business.hours));
  assert.equal(barbers.length, 4);

  // Duplicate chair names the barber
  assert.throws(
    () =>
      validateBarbers(
        barbers.map(b => (b.id === 'marcus-bell' ? { ...b, chair: 1 } : b)),
        services,
        business.hours,
      ),
    /Marcus Bell/,
  );
  // Unknown knownFor service ID names the barber
  assert.throws(
    () =>
      validateBarbers(
        barbers.map(b => (b.id === 'tomas-ruiz' ? { ...b, knownFor: ['fake-service'] } : b)),
        services,
        business.hours,
      ),
    /Tomás Ruiz/,
  );
  // Closed shop day (Monday or Sunday) names the barber
  for (const closedDay of ['mon', 'sun'] as const) {
    assert.throws(
      () =>
        validateBarbers(
          barbers.map(b => (b.id === 'dee-kowalski' ? { ...b, days: [...b.days, closedDay] } : b)),
          services,
          business.hours,
        ),
      /Dolores "Dee" Kowalski/,
    );
  }
});

test('HairSalon JSON-LD derives address, hours and offer catalog prices from content and escapes HTML', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'HairSalon');
  assert.equal(schema.name, business.name);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.email, business.email);
  assert.equal(schema.priceRange, '$$');
  assert.equal(schema.address.streetAddress, '312 N Broadway');
  assert.equal(schema.address.addressLocality, 'Milwaukee');
  assert.equal(schema.openingHoursSpecification.length, 5); // Tue–Sat open

  const offers = schema.hasOfferCatalog.itemListElement.flatMap(sec => sec.itemListElement);
  assert.equal(offers.length, services.length);
  const classicOffer = offers.find(o => o.itemOffered.name === 'The Classic Cut');
  assert.ok(classicOffer);
  assert.equal(classicOffer.price, serviceById('classic-cut')?.price);
  assert.equal(classicOffer.priceCurrency, 'USD');

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});

test('walk-in and enquiry copy avoids confirmed-booking language and states no appointments', () => {
  const contactPage = readFileSync(new URL('../app/contact/page.tsx', import.meta.url), 'utf8');
  const homePage = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
  const visitPage = readFileSync(new URL('../app/visit/page.tsx', import.meta.url), 'utf8');
  const contactSections = readFileSync(new URL('../components/contact-sections.tsx', import.meta.url), 'utf8');

  const contactText = `${business.enquiries.introduction} ${business.enquiries.usefulToInclude.join(' ')} ${contactPage} ${contactSections}`;
  for (const forbidden of [/\bbook\b/i, /\bbooking\b/i, /\breserve\b/i, /appointment confirmed/i, /\bpayment\b/i]) {
    assert.doesNotMatch(contactText, forbidden, `Contact copy must not contain ${forbidden}`);
  }

  assert.match(homePage, /no appointments/i, 'Home page must state no appointments');
  assert.match(visitPage, /no appointments/i, 'Visit page must state no appointments');
  assert.match(contactText, /don&apos;t take appointments|do not take appointments/i, 'Contact page must state no appointments');
});
