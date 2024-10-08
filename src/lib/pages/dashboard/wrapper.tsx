/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';
import { RiDashboardLine, RiSettings2Line } from 'react-icons/ri';

import { ThemeToggle } from '@/lib/components/theme-toggle';
import { useUserSession } from '@/lib/hooks/session';

const DashboardWrapper = ({
  children,
  session,
}: {
  children: ReactNode;
  session: string | null;
}) => {
  const { theme } = useTheme();
  useUserSession(session);
  const arr = [
    { name: 'Home', icon: <RiDashboardLine />, path: '/dashboard' },
    { name: 'Settings', icon: <RiSettings2Line />, path: '/setting' },
    // { name: 'Theme', icon: <RiSettings2Line />, path: '/setting' },
  ];
  return (
    <div className="flex h-screen w-full flex-row justify-between md:overflow-hidden">
      <aside className="hidden h-screen w-48 min-w-16 -translate-x-full border-r bg-white transition-transform dark:invert sm:translate-x-0 md:block">
        <div className="dark:inverted h-full overflow-y-auto px-3 py-4">
          <ul className="flex flex-col space-y-5 p-6 font-medium">
            <Image
              alt="logo-text image"
              src={theme === 'light' ? '/logo-black.svg' : '/logo.svg'}
              width={70}
              height={70}
              className="mb-12 dark:invert"
              loading="lazy"
            />
            {arr.map((i) => {
              return (
                <Link
                  key={i.name}
                  className="flex flex-row items-center gap-3 text-black"
                  href={i.path}
                >
                  {i.icon}
                  {i.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <span className="absolute bottom-10 flex w-full flex-row items-center justify-center text-black">
          <ThemeToggle />
        </span>
      </aside>
      <main className="w-full max-w-full p-6 md:h-screen md:w-[calc(100vw-170px)]">
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
