/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RiDashboardLine } from 'react-icons/ri';

import LoaderSpin from '@/lib/components/loaders/LoaderSpin';
import { ThemeToggle } from '@/lib/components/theme-toggle';
import { useUserSession } from '@/lib/hooks/session';
import { handleGoogle } from '@/lib/serverActions/onboarding';

import { navbarContent } from './constants';

export const Header = ({
  isHome,
  session,
}: {
  isHome: boolean;
  session: string | null;
}) => {
  const { theme } = useTheme();
  const userSessionId = useUserSession(session);
  const { push } = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const handleOnboarding = async () => {
    setLoading(true);
    await handleGoogle(push);
    setLoading(false);
  };

  const handleTransition = (id: string) => {
    const doc = document.getElementById(id);
    doc && doc.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="border-primary sticky top-0 z-10 w-full border-b backdrop-blur-md">
      <section className="wrapper mx-auto flex items-center justify-between py-2">
        <Image
          alt="logo-text image"
          src={theme === 'light' ? '/logo-black.svg' : '/logo.svg'}
          width={70}
          height={70}
          loading="lazy"
        />
        <div className="ml-auto flex flex-row items-center space-x-4">
          {isHome && (
            <>
              <nav className="hidden space-x-4 md:flex md:space-x-8">
                {navbarContent.map((i: { text: string; link: string }) => {
                  return (
                    <Link
                      key={i.text}
                      href={i.link}
                      onClick={
                        i.link.includes('#')
                          ? (e) => {
                              e.preventDefault();
                              handleTransition(i.link.split('#')[1]);
                            }
                          : () => null
                      }
                      className="font-logo text-sm font-medium hover:opacity-70"
                    >
                      {i.text}
                    </Link>
                  );
                })}
              </nav>
              {!userSessionId && (
                <button
                  onClick={handleOnboarding}
                  type="button"
                  className="btn btn-gradient flex flex-row items-center justify-center space-x-3 rounded-lg px-4 py-3 text-xs hover:opacity-70"
                >
                  {loading ? (
                    <LoaderSpin />
                  ) : (
                    <>
                      {' '}
                      <span>Get Started with</span>{' '}
                      <FcGoogle className="text-lg" />
                    </>
                  )}
                </button>
              )}
            </>
          )}
          {userSessionId && (
            <Link
              href="/dashboard"
              className="flex flex-row items-center gap-2 font-logo text-sm font-medium hover:opacity-70"
            >
              <RiDashboardLine />
              Dashboard
            </Link>
          )}
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
};
