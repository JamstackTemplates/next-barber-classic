'use client';

import { useEffect, useState } from 'react';
import { NEUTRAL_STATUS, shopStatus, type OpeningHours, type ShopStatus } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Browser-only live shop status in the configured IANA time zone.
 * Always renders NEUTRAL_STATUS during SSR and without JavaScript, then refreshes every minute.
 */
export function useShopStatus(
  hours: readonly OpeningHours[],
  lastWalkInMinutesBeforeClose = 30,
): ShopStatus {
  const [status, setStatus] = useState<ShopStatus>(NEUTRAL_STATUS);

  useEffect(() => {
    const update = () => {
      setStatus(shopStatus(hours, site.timeZone, lastWalkInMinutesBeforeClose));
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, lastWalkInMinutesBeforeClose]);

  return status;
}
