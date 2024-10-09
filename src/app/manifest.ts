import type { MetadataRoute } from 'next';

import { APP_NAME } from './config';

const manifest = (): MetadataRoute.Manifest => ({
  short_name: APP_NAME,
  name: APP_NAME,
  lang: 'en',
  start_url: '/',
  background_color: '#FFFFFF',
  theme_color: '#3F5AB3',
  dir: 'ltr',
  display: 'standalone',
  prefer_related_applications: false,
  icons: [
    {
      src: '/logo.svg',
      purpose: 'any',
      sizes: '48x48 72x72 96x96 128x128 192x192 256x256 512x512',
    },
  ],
});

export default manifest;
