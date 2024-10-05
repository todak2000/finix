/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '@/lib/components/theme-provider';

import { Footer } from './components/footer';
import { Header } from './components/header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Toaster />
        <Header />
        <main className="wrapper">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
