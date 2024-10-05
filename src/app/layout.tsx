import type { Metadata, Viewport } from 'next';

import Layout from '@/lib/layout';
import TanstackProvider from '@/lib/providers/TanstackProvider';
import { fontSans } from '@/lib/styles/fonts';
import { cn } from '@/lib/styles/utils';

import '@/lib/styles/globals.css';
import { APP_NAME, DESC } from './config';

export const metadata: Metadata = {
  title: {
    template: `%s`,
    default: APP_NAME,
  },
  description: DESC,
  robots: { index: true, follow: true },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
    startupImage: [
      `${process.env.NEXT_PUBLIC_DOMAIN}/seo/maskable-icon.png`,
      {
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/seo/maskable-icon.png`,
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    url: `${process.env.NEXT_PUBLIC_DOMAIN}`,
    title: APP_NAME,
    description: DESC,
    images: {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/seo/og-image.png`,
      alt: `${APP_NAME}-og-image`,
    },
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    creator: '@todak',
    card: 'summary_large_image',
    title: APP_NAME,
    description: DESC,
    images: {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/seo/og-image.png`,
      alt: `${APP_NAME}-og-image`,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3F5AB3',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <TanstackProvider>
          <Layout>
            <div className="flex-1">{children}</div>
          </Layout>
        </TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
