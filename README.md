# Straight Razor & Co. Barbers

A self-contained static Next.js website for **Straight Razor & Co. Barbers** — an old-school, walk-in barbershop with four numbered chairs in Milwaukee's Historic Third Ward. Designed around the **"Gold Leaf & Barber Pole"** aesthetic: hand-lettered gold leaf on dark glass, a live spinning barber pole, oak-framed felt letter boards, black-and-white hexagonal floor tile, and a take-a-number walk-in counter.

> All business names, barber biographies, telephone numbers, email addresses and street details in this gallery template are fictitious.

## Quick start

Requires Node 24+ and npm.

```sh
npm ci
npm run dev
```

Run the full check suite (content/hours/config tests, TypeScript typecheck, and static export build):

```sh
npm run check
```

Preview the exported static site in `out/`:

```sh
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Shop-window hero with live open status, Take-a-Number walk-ins band, five-favourite felt letter board, four-chair showcase, five-step hot towel shave ritual, Visit band and `HairSalon` JSON-LD |
| `/prices/` | Full oak-framed felt letter boards by section (`Cuts`, `Shaves`, `Beard`, `The Full Chair`, `Between Visits`), sticky jump bar, House Notes card, walk-in reminder and black-on-white print layout |
| `/barbers/` | Alternating profiles for all four chairs with week-strip schedules, live browser-only "In today" tags, "Known for" links to the price list, ask-by-name note and shop history ribbon |
| `/visit/` | Live pole status in the transom, ruled Hours Ledger with computed last walk-in times, four serrated walk-in ticket stubs, framed Google Map + Third Ward parking/transit directions and enamel Shop Rules sign |
| `/contact/` | Hosted Jamstacks enquiry form (when `siteId` is configured) or email fallback, always-visible shop email + copy button, phone, address and walk-in notice |
| `/404.html` | "This chair's empty." static error page with custom illustration and links home or to the price list |

## Make it yours (owner editing guide)

| File | Owns | Frequent edits |
| --- | --- | --- |
| `content/services.ts` | Price list sections (`serviceSections`) and services (`services`) | Change a `price` (whole USD dollars, 5–200), toggle `available: false` to show `"Not today"`, adjust `minutes` (multiple of 5), or swap the 5 `favourite: true` items |
| `content/barbers.ts` | The four chairs (`barbers`) | Update a barber's `days` (`tue`–`sat`, must be open shop days), `knownFor` service IDs, `bio`, or `tool` |
| `content/business.ts` | Shared shop details (`business`) | Update `hours` (same-day intervals), `lastWalkInMinutesBeforeClose`, `phone`, `email`, `address`, `mapQuery`, `founded`, and `enquiries` tips |
| `site.config.json` | Public site metadata, domain, `timeZone` (`America/Chicago`) and Jamstacks form ID | Rename `name` here alongside `business.name`; set `domain`, `timeZone`, and `jamstacks.siteId` |
| `app/page.tsx` | Home page copy & section order | Edit hero headline, subline, walk-in lines and ritual steps directly as JSX children |
| `app/prices/page.tsx` | Price List intro, House Notes and walk-in reminder | Edit kids, seniors and tipping notes directly as JSX |
| `app/barbers/page.tsx` | Barbers intro, "Ask for someone by name" quote and shop history milestones | Edit quote and milestone copy directly as JSX |
| `app/visit/page.tsx` | Visit intro, walk-in steps, parking/transit directions and Shop Rules | Edit steps, parking guidance and enamel sign rules directly as JSX |
| `app/contact/page.tsx` | Contact intro, fallback text and walk-in sidebar notice | Edit enquiry copy without promising confirmed slots or appointments |
| `app/tailwind.input.css` | Light ("Daylight on the corner") & dark ("After hours, window lit") palette tokens, typography, textures, motion and print styles | Adjust palette tokens in `:root`, `@media (prefers-color-scheme: dark)` and `:root.dark` |
| `lib/structured-data.ts` | `HairSalon` schema.org JSON-LD | Automatically derives address, opening hours and offer catalog prices/availability from `content/` |
| `app/sitemap.ts` | Static sitemap routes | Add any newly created route here |

Do not add business details to `site.config.json`: the Jamstacks provisioner replaces that file wholesale, possibly adding `provisioningId`.

## Typography & artwork

All fonts are self-hosted via `@fontsource` (SIL Open Font License 1.1) — zero external font requests:

- **Ultra** (`@fontsource/ultra`): Display slab serif for gold-leaf window lettering, headings and letter-board prices.
- **Mr Dafoe** (`@fontsource/mr-dafoe`): Sign-painter brush script for `"& Co."`, `"Est. 1958"`, kickers and step flourishes.
- **Source Serif 4** (`@fontsource-variable/source-serif-4`): Variable serif for body copy, small-caps labels and tabular figures in the hours ledger and price list.

The home hero uses `public/barber-light.webp` and `public/barber-dark.webp`, selected by the site theme. To swap the photos, replace both files with matching landscape crops. Keep the chair and pole near the middle so they stay visible on mobile.

The site's inline illustrations, including the Barber Pole, Gold-Leaf Wordmark, Take-a-Number dispenser, Brass Chair Medallions, Barber Portraits, Shave Ritual vignettes, 404 Empty Chair and icons, are in `components/art/` and use CSS palette tokens.

## Live hours, walk-ins & accessibility

- Open status (`OpenBadge`, `TodayBrassPlate`, `PoleStatusBadge`, `HoursLedger`, `BarberInTodayTag`) computes time strictly in the browser using the configured IANA `timeZone` (`America/Chicago`) and refreshes every minute.
- Static and no-JavaScript renders remain neutral (`"See today's hours below"`, unmarked hours rows, no `"In today"` tag, and still barber poles).
- The barber pole spins only when the browser computes the shop as open and `prefers-reduced-motion` is not set to `reduce`.
- Printing `/prices/` outputs a clean black-on-white price list with the shop address, phone number and weekly hours.

## Hosted Contact form & public configuration

```json
{
  "name": "Straight Razor & Co. Barbers",
  "description": "Old-school walk-in barbershop in Milwaukee's Third Ward: classic cuts, fades, hot towel straight razor shaves and beard work. No appointments: take a number.",
  "domain": "next-barber-classic.jamstacks.net",
  "timeZone": "America/Chicago",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

- When `JAMSTACKS_SITE` or `site.config.json.jamstacks.siteId` is set, `/contact/` renders one `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap.
- Without a site ID, `/contact/` renders the direct email fallback with no embed script or host. The public email (`chair@straightrazorco.example`) is always visible.
- Navigation to and from `/contact/` uses full-document loads via `SiteLink` so the hosted runtime initializes cleanly on every visit.

### Project-path & configured-embed verification

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview JAMSTACKS_SITE=demo_site npm run build
npm start -- --base /preview --port 3000
```

## Gallery publishing assets

`jamstacks/` holds removable source-gallery metadata (`jamstacks/config.json`, light/dark captures and `jamstacks/config.test.mjs`). Customer websites can delete `jamstacks/`, `plan/` and `.claude/skills/` without affecting builds, tests or GitHub Pages deployment.

To validate gallery publishing assets separately:

```sh
node --test jamstacks/config.test.mjs
```
