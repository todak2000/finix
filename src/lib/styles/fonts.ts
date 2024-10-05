import {
  Plus_Jakarta_Sans as FontSans,
  Dosis as FontLogo,
} from 'next/font/google';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontLogo = FontLogo({
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
  adjustFontFallback: false,
});
