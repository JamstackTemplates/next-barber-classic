'use client';

import { useEffect, useState } from 'react';
import type { ServiceSection } from '../content/services';

/**
 * Sticky brass-tag anchor jump bar for /prices/.
 * Uses modern CSS `scroll-target-group: auto` + `:target-current` when supported,
 * with IntersectionObserver fallback and `aria-current="true"` sync for assistive tech.
 */
export function PriceJumpBar({ sections }: { sections: readonly ServiceSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const supportsNative =
      typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('scroll-target-group: auto');

    if (supportsNative) {
      const syncAria = () => {
        const current = document.querySelector<HTMLAnchorElement>('.price-jump-nav a:target-current');
        const href = current?.getAttribute('href');
        if (href && href.startsWith('#')) {
          setActiveId(href.slice(1));
        }
      };
      syncAria();
      document.addEventListener('scrollend', syncAria);
      return () => document.removeEventListener('scrollend', syncAria);
    }

    if (typeof IntersectionObserver === 'undefined') return;
    const targets = sections
      .map(sec => document.getElementById(sec.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    );

    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="no-print sticky top-[5.6rem] z-30 border-b border-line bg-bg/95 py-3 backdrop-blur-xs">
      <nav
        aria-label="Price list sections"
        className="price-jump-nav wrap flex gap-2 overflow-x-auto pb-0.5"
      >
        {sections.map(section => {
          const isCurrent = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isCurrent ? 'true' : undefined}
              onClick={() => setActiveId(section.id)}
              className={`small-caps shrink-0 rounded-ui border border-gold/70 bg-surface px-3.5 py-2 text-xs text-ink no-underline transition-colors hover:border-accent hover:bg-brass-bg hover:no-underline sm:text-sm ${
                isCurrent ? 'target-current' : ''
              }`}
            >
              {section.title}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
