'use client';

import { useEffect, useRef, useState } from 'react';

/** Progressive enhancement: the mailto link always works; the copy button appears only with JavaScript. */
export function CopyEmail({
  email,
  tone = 'default',
}: {
  email: string;
  tone?: 'default' | 'on-dark';
}) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setSupported(typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText);
    return () => clearTimeout(timer.current);
  }, []);

  if (!supported) return null;

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 4000);
  }

  const buttonClass =
    tone === 'on-dark'
      ? 'button button-on-dark min-h-9 px-3 py-1.5 text-xs'
      : 'button button-quiet';
  const statusClass =
    tone === 'on-dark' ? 'text-[.9rem] text-[#F8E2A1]' : 'text-[.9375rem] text-muted';

  return (
    <>
      <button type="button" className={buttonClass} onClick={copy}>
        Copy address
      </button>
      <span className={`copy-status ${statusClass}`} role="status" aria-live="polite">
        {state === 'copied'
          ? 'Copied to clipboard.'
          : state === 'failed'
            ? 'Couldn’t copy — select the address instead.'
            : ''}
      </span>
    </>
  );
}
