'use client';

import { usePathname } from 'next/navigation';
import { type ReactElement, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import DashboardWrapper from '@/lib/pages/dashboard/wrapper';

import { Footer } from './footer';
import { Header } from './header';

const WrapperComponent = ({
  children,
  session,
}: {
  children: ReactElement | ReactNode;
  session: string | null;
}) => {
  const path = usePathname();
  const isHome = path === '/';
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster />
      {!session || (session && isHome) ? (
        <>
          <Header isHome={isHome} session={session} />
          <main className="md:wrapper">{children}</main>
          <Footer />
        </>
      ) : (
        <DashboardWrapper session={session}>{children}</DashboardWrapper>
      )}
    </div>
  );
};

export default WrapperComponent;
