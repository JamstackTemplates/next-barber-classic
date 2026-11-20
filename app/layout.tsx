import '@fontsource/ultra';
import '@fontsource/mr-dafoe';
import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/source-serif-4/wght-italic.css';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { business } from '../content/business';
import { absoluteAssetUrl } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const ogImage = absoluteAssetUrl('/og.png');
const description = site.description || business.introduction;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description,
    ...(ogImage
      ? { images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name} — Walk-ins welcome · Milwaukee` }] }
      : {}),
  },
  twitter: {
    card: ogImage ? 'summary_large_image' : 'summary',
    title: business.name,
    description,
    ...(ogImage ? { images: [ogImage] } : {}),
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
