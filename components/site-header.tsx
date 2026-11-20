'use client';

import { useEffect, useRef, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { LiveBarberPole } from './open-badge';
import { MenuIcon } from './art/icons';
import { PoleStripeRule } from './art/dividers';
import { WordmarkInline } from './art/wordmark';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/prices/', label: 'Price List' },
  { href: '/barbers/', label: 'Barbers' },
  { href: '/visit/', label: 'Visit' },
  { href: '/contact/', label: 'Contact' },
] as const;

/**
 * Branded barbershop header:
 * Cream bar with a diagonal pole stripe rule along the bottom edge, mini live barber pole
 * and flat wordmark on the left, one semantic nav (inline on desktop, native popover on mobile),
 * always-visible "Walk in today" CTA and DarkModeToggle.
 */
export function SiteHeader() {
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const onToggle = (event: Event) => {
      const e = event as ToggleEvent;
      setMenuOpen(e.newState === 'open');
    };
    menu.addEventListener('toggle', onToggle);
    return () => menu.removeEventListener('toggle', onToggle);
  }, []);

  function handleMenuButtonClick() {
    const menu = menuRef.current;
    if (!menu) return;
    // Progressive fallback for browsers lacking Popover API
    if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
      const next = !menuOpen;
      menu.classList.toggle(':popover-open', next);
      setMenuOpen(next);
    }
  }

  function closeMenu() {
    const menu = menuRef.current;
    if (!menu) return;
    if (typeof menu.hidePopover === 'function' && menu.matches(':popover-open')) {
      menu.hidePopover();
    } else {
      menu.classList.remove(':popover-open');
      setMenuOpen(false);
    }
  }

  return (
    <header className="site-header sticky top-0 z-40 bg-surface/95 backdrop-blur-xs">
      <div className="wrap flex min-h-18 items-center justify-between gap-1.5 py-2 sm:min-h-20 sm:gap-4 sm:py-2.5">
        <SiteLink
          href="/"
          className="inline-flex min-w-0 shrink items-center gap-1.5 no-underline hover:no-underline sm:gap-2.5"
          aria-label={`${business.name} — Home`}
        >
          <LiveBarberPole
            hours={business.hours}
            lastWalkInMinutesBeforeClose={business.lastWalkInMinutesBeforeClose}
            size="sm"
            mountSide="none"
            className="h-9 w-auto sm:h-14"
          />
          <WordmarkInline tone="header" />
        </SiteLink>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3.5">
          <nav aria-label="Primary" className="flex items-center">
            <button
              type="button"
              className="site-menu-button inline-flex min-h-10 items-center gap-1 rounded-ui border border-line bg-bg px-2 text-xs font-semibold text-ink hover:border-gold md:hidden"
              popoverTarget="site-nav-menu"
              popoverTargetAction="toggle"
              aria-controls="site-nav-menu"
              aria-expanded={menuOpen}
              aria-label="Menu"
              onClick={handleMenuButtonClick}
            >
              <MenuIcon className="h-4 w-4" />
              <span className="small-caps hidden text-xs min-[420px]:inline">Menu</span>
            </button>

            <ul
              ref={menuRef}
              id="site-nav-menu"
              popover="auto"
              className="site-nav-menu site-nav-links md:static md:m-0 md:flex md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none"
            >
              {NAV_LINKS.map(item => (
                <li key={item.href}>
                  <SiteLink
                    href={item.href}
                    markCurrent="page"
                    onClick={closeMenu}
                    className="small-caps block rounded-ui px-3 py-2.5 text-[0.95rem] text-ink no-underline hover:bg-bg hover:text-accent-ink hover:underline md:px-1 md:py-1 md:hover:bg-transparent"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>

          <SiteLink
            href="/visit/"
            className="button min-h-10 whitespace-nowrap px-2.5 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm"
          >
            Walk in today
          </SiteLink>

          <div className="shrink-0">
            <DarkModeToggle />
          </div>
        </div>
      </div>
      <PoleStripeRule />
    </header>
  );
}
