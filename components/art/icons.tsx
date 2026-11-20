import type { BarberTool } from '../../content/barbers';

type IconProps = { className?: string };

const base = 'h-5 w-5 shrink-0';

/** Bespoke 2px-line 24px barbershop icon set — zero stock icons. */
export function ScissorsIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="6.5" cy="6.5" r="3" />
      <circle cx="6.5" cy="17.5" r="3" />
      <line x1="20" y1="5" x2="9" y2="15.3" />
      <line x1="20" y1="19" x2="9" y2="8.7" />
      <circle cx="13.2" cy="12" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function RazorIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M3 8.5L13.5 5l1 4.2L4.2 12A1.5 1.5 0 0 1 3 8.5Z" />
      <path d="M14.5 9.2L20.5 17a2 2 0 0 1-3 2.5L11 11.4" />
      <circle cx="13.5" cy="9.6" r="1" fill="currentColor" />
    </svg>
  );
}

export function BrushIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 11C6.5 6.5 8.5 3.5 12 3.5S17.5 6.5 17 11Z" />
      <path d="M8 11h8l-1 4h-6l-1-4Z" />
      <path d="M9 15c-.8 1.4-1.5 3-1 4.5.3.7 1.3 1 4 1s3.7-.3 4-1c.5-1.5-.2-3.1-1-4.5" />
    </svg>
  );
}

export function CombIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="7" width="18" height="4" rx="1.5" />
      <path d="M5.5 11v6M8.5 11v6M11.5 11v6M14.5 11v6M17.5 11v6" />
    </svg>
  );
}

export function ClippersIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 6h10v3l-1.5 10.5a2 2 0 0 1-2 1.5h-3a2 2 0 0 1-2-1.5L7 9V6Z" />
      <path d="M8 3v3M10.7 3v3M13.3 3v3M16 3v3" />
      <circle cx="12" cy="13.5" r="1.4" />
    </svg>
  );
}

export function HotTowelIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="4" y="12" width="16" height="8" rx="3" />
      <circle cx="16.5" cy="16" r="1.5" />
      <path d="M8.5 9c0-1.6 1.2-2 1.2-3.5M12 8.5c0-1.6 1.2-2 1.2-3.5M15.5 9c0-1.6 1.2-2 1.2-3.5" />
    </svg>
  );
}

export function ChairIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M8 4h8v7H8z" />
      <path d="M6 11h12v4H6z" />
      <path d="M12 15v5M8 20h8M6 12v3M18 12v3" />
    </svg>
  );
}

export function ClockIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function MapPinIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  );
}

export function PhoneIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M6.5 4.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function EnvelopeIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

export function TicketIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M4 7h16v3.2a2 2 0 0 0 0 3.6V17H4v-3.2a2 2 0 0 0 0-3.6V7Z" />
      <path d="M9.5 7v10" strokeDasharray="2 2" />
    </svg>
  );
}

export function MenuIcon({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className={className}>
      <line x1="4" y1="6.5" x2="20" y2="6.5" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17.5" x2="20" y2="17.5" />
    </svg>
  );
}

export function BarberToolIcon({ tool, className = base }: { tool: BarberTool; className?: string }) {
  switch (tool) {
    case 'razor':
      return <RazorIcon className={className} />;
    case 'scissors':
      return <ScissorsIcon className={className} />;
    case 'clippers':
      return <ClippersIcon className={className} />;
    case 'brush':
      return <BrushIcon className={className} />;
  }
}

export const BARBER_TOOL_LABEL: Record<BarberTool, string> = {
  razor: 'Straight razor',
  scissors: 'Shears & comb',
  clippers: 'Precision clippers',
  brush: 'Badger brush & mug',
};
