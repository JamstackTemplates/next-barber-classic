import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  DAYS,
  formatClock12,
  lastWalkInTime,
  openingLabel,
  shopStatus,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  assert.doesNotThrow(() => validateHours(business.hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(hours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});

test('Straight Razor & Co. walk-in boundaries in America/Chicago', () => {
  const statusAt = (iso: string) =>
    shopStatus(business.hours, 'America/Chicago', business.lastWalkInMinutesBeforeClose, new Date(iso));

  // Verify last walk-in calculations (close minus 30 minutes)
  const thursday = business.hours.find(h => h.day === 'Thursday')!;
  const saturday = business.hours.find(h => h.day === 'Saturday')!;
  assert.equal(lastWalkInTime(thursday, 30), '19:30');
  assert.equal(formatClock12('19:30'), '7:30 pm');
  assert.equal(lastWalkInTime(saturday, 30), '15:30');
  assert.equal(lastWalkInTime(business.hours[0], 30), null); // Monday closed

  // Thursday 2026-11-19 is CST (UTC-6): opens 09:00 (15:00Z), last walk-in 19:30 (01:30Z+1), closes 20:00 (02:00Z+1)
  // 1. One minute before opening (08:59 CST)
  const beforeOpen = statusAt('2026-11-19T14:59:00Z');
  assert.equal(beforeOpen.state, 'closed');
  assert.equal(beforeOpen.poleSpinning, false);
  assert.equal(beforeOpen.label, 'Closed · opens today 9 am');

  // 2. At opening (09:00 CST)
  const atOpen = statusAt('2026-11-19T15:00:00Z');
  assert.equal(atOpen.state, 'open');
  assert.equal(atOpen.poleSpinning, true);
  assert.equal(atOpen.label, 'Open now · last walk-in 7:30 pm');

  // 3. One minute before last walk-in (19:29 CST)
  const beforeLastWalkIn = statusAt('2026-11-20T01:29:00Z');
  assert.equal(beforeLastWalkIn.state, 'open');
  assert.equal(beforeLastWalkIn.poleSpinning, true);

  // 4. At last walk-in (19:30 CST) -> final 30 minutes
  const atLastWalkIn = statusAt('2026-11-20T01:30:00Z');
  assert.equal(atLastWalkIn.state, 'last-call');
  assert.equal(atLastWalkIn.poleSpinning, true);
  assert.equal(atLastWalkIn.label, 'Last call: walk-ins closed');

  // 5. One minute before close (19:59 CST)
  const beforeClose = statusAt('2026-11-20T01:59:00Z');
  assert.equal(beforeClose.state, 'last-call');
  assert.equal(beforeClose.poleSpinning, true);

  // 6. At close (20:00 CST) -> closed, opens Friday 9 am
  const atClose = statusAt('2026-11-20T02:00:00Z');
  assert.equal(atClose.state, 'closed');
  assert.equal(atClose.poleSpinning, false);
  assert.equal(atClose.label, 'Closed · opens Friday 9 am');

  // Closed Monday and Sunday -> next opening Tuesday 9 am
  const sunday = statusAt('2026-11-15T18:00:00Z');
  assert.equal(sunday.state, 'closed');
  assert.equal(sunday.poleSpinning, false);
  assert.equal(sunday.label, 'Closed · opens Tuesday 9 am');

  const monday = statusAt('2026-11-16T18:00:00Z');
  assert.equal(monday.state, 'closed');
  assert.equal(monday.poleSpinning, false);
  assert.equal(monday.label, 'Closed · opens Tuesday 9 am');
});

test('America/Chicago DST spring-forward (March) and fall-back (November) weekends preserve local hours', () => {
  const statusAt = (iso: string) =>
    shopStatus(business.hours, 'America/Chicago', business.lastWalkInMinutesBeforeClose, new Date(iso));

  // Spring-forward weekend: Sat 2026-03-07 is CST (UTC-6), Sun 2026-03-08 springs to CDT (UTC-5)
  // Saturday opens 08:00 CST (14:00Z), closes 16:00 CST (22:00Z)
  assert.equal(statusAt('2026-03-07T13:59:00Z').state, 'closed');
  assert.equal(statusAt('2026-03-07T14:00:00Z').state, 'open');
  assert.equal(statusAt('2026-03-07T21:30:00Z').state, 'last-call');
  assert.equal(statusAt('2026-03-07T22:00:00Z').state, 'closed');
  // Tuesday 2026-03-10 is CDT (UTC-5): opens 09:00 CDT (14:00Z)
  assert.equal(statusAt('2026-03-10T13:59:00Z').state, 'closed');
  assert.equal(statusAt('2026-03-10T14:00:00Z').state, 'open');

  // Fall-back weekend: Sat 2026-10-31 is CDT (UTC-5), Sun 2026-11-01 falls back to CST (UTC-6)
  // Saturday opens 08:00 CDT (13:00Z), last walk-in 15:30 CDT (20:30Z), closes 16:00 CDT (21:00Z)
  assert.equal(statusAt('2026-10-31T12:59:00Z').state, 'closed');
  assert.equal(statusAt('2026-10-31T13:00:00Z').state, 'open');
  assert.equal(statusAt('2026-10-31T20:30:00Z').state, 'last-call');
  assert.equal(statusAt('2026-10-31T21:00:00Z').state, 'closed');
  // Sunday 2026-11-01 is closed all day -> opens Tuesday 9 am
  assert.equal(statusAt('2026-11-01T16:00:00Z').label, 'Closed · opens Tuesday 9 am');
  // Tuesday 2026-11-03 is CST (UTC-6): opens 09:00 CST (15:00Z)
  assert.equal(statusAt('2026-11-03T14:59:00Z').state, 'closed');
  assert.equal(statusAt('2026-11-03T15:00:00Z').state, 'open');
});
