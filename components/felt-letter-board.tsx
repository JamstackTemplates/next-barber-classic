import type { Service } from '../content/services';
import { formatPrice } from '../content/services';

/**
 * Oak-framed ribbed black felt letter board for push-in white prices.
 * Used both as the 5-favourite teaser on Home and for every section on /prices/.
 */
export function FeltLetterBoard({
  id,
  title,
  note,
  items,
  showDetails = true,
  className = '',
}: {
  id?: string;
  title: string;
  note?: string;
  items: readonly Service[];
  /** Show descriptions and duration tags (true on /prices/, concise on Home). */
  showDetails?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      tabIndex={id ? -1 : undefined}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`felt-board scroll-mt-32 ${className}`}
    >
      {/* Brass corner reinforcement plates on oak frame */}
      <span aria-hidden="true" className="pointer-events-none absolute top-1 left-1 h-2.5 w-2.5 rounded-full bg-gold shadow-xs" />
      <span aria-hidden="true" className="pointer-events-none absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-gold shadow-xs" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 rounded-full bg-gold shadow-xs" />
      <span aria-hidden="true" className="pointer-events-none absolute right-1 bottom-1 h-2.5 w-2.5 rounded-full bg-gold shadow-xs" />

      <div className="felt-board__inner">
        {/* Gold-leaf header rail */}
        <div className="border-b-2 border-gold/55 pb-3 text-center">
          <h2
            id={id ? `${id}-heading` : undefined}
            className="gold-leaf-text m-0 font-display text-2xl tracking-wider uppercase sm:text-[1.7rem]"
          >
            {title}
          </h2>
          {note ? (
            <p className="mt-1.5 mb-0 text-sm italic text-felt-muted">{note}</p>
          ) : null}
        </div>

        {/* Push-in letter rows */}
        <ul className="m-0 mt-5 list-none divide-y divide-felt-ink/12 p-0">
          {items.map((service, idx) => {
            const unavailable = !service.available;
            return (
              <li
                key={service.id}
                id={`service-${service.id}`}
                style={{ animationDelay: `${Math.min(idx * 45, 270)}ms` }}
                className={`board-row-reveal relative py-3.5 first:pt-1 last:pb-1 ${
                  unavailable ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-baseline gap-2 sm:gap-3">
                  <span className="font-serif text-base font-bold tracking-[0.06em] text-felt-ink uppercase sm:text-lg">
                    {service.name}
                  </span>

                  <span className="dotted-leader" aria-hidden="true" />

                  {showDetails ? (
                    <span className="small-caps tabular shrink-0 text-xs text-felt-muted sm:text-sm">
                      {service.minutes} min
                    </span>
                  ) : null}

                  <span
                    className={`tabular shrink-0 font-display text-xl sm:text-2xl ${
                      unavailable ? 'text-felt-muted line-through' : 'text-[#F8E2A1]'
                    }`}
                  >
                    {formatPrice(service.price)}
                  </span>
                </div>

                {showDetails ? (
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2 pr-1">
                    <div>
                      <p className="m-0 text-sm leading-snug text-felt-ink/82">
                        {service.description}
                      </p>
                      {service.note ? (
                        <p className="mt-0.5 mb-0 text-xs italic text-[#E2BC72]">
                          {service.note}
                        </p>
                      ) : null}
                    </div>

                    {unavailable ? (
                      <span
                        className="small-caps inline-block -rotate-2 rounded-xs border border-gold bg-[#FBF5E8] px-2.5 py-0.5 text-xs font-bold text-[#6B1624] shadow-sm"
                        aria-label={`${service.name}: not available today`}
                      >
                        Not today
                      </span>
                    ) : null}
                  </div>
                ) : unavailable ? (
                  <div className="mt-1 flex justify-end">
                    <span className="small-caps inline-block -rotate-2 rounded-xs border border-gold bg-[#FBF5E8] px-2.5 py-0.5 text-xs font-bold text-[#6B1624]">
                      Not today
                    </span>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
