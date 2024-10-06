/* eslint-disable import/no-extraneous-dependencies */
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

import { SESSION_COOKIE_NAME } from '../serverActions/constants';
import { ThemeProvider } from '@/lib/components/theme-provider';

import WrapperComponent from './components/Wrapper';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const session = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WrapperComponent session={session}>{children}</WrapperComponent>;
    </ThemeProvider>
  );
};

export default Layout;
