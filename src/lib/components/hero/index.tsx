/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';

import LoaderSpin from '../loaders/LoaderSpin';
import { handleGoogle } from '@/lib/serverActions/onboarding';
import { user } from '@/lib/store';

import { heroHeaders } from './constant';

const HeroSection: React.FC = () => {
  const { push } = useRouter();
  const userr = useSelector(user);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOnboarding = async () => {
    setLoading(true);
    const res = await handleGoogle(push);
    setLoading(false);

    console.log(res, 'oboading response');
  };
  return (
    <div className="dark:inverted flex min-h-[50vh] flex-col items-center justify-center bg-cover bg-center px-6 text-center">
      <h1 className="mb-4 font-logo text-4xl font-extrabold md:text-6xl">
        {heroHeaders.header}
      </h1>
      <p className="my-8 text-lg md:text-xl">{heroHeaders.subHeader}</p>
      <div className="flex flex-row items-center justify-center space-x-6">
        {(!userr || !(userr as { displayName: string }).displayName) && (
          <button
            type="button"
            onClick={handleOnboarding}
            className="btn btn-gradient flex flex-row items-center justify-center space-x-3 rounded-full px-4 py-3 text-xs hover:opacity-70"
          >
            {loading ? (
              <LoaderSpin />
            ) : (
              <>
                {' '}
                <span>Create Your Wallet</span> <FcGoogle className="text-lg" />
              </>
            )}
          </button>
        )}
        <a href="/#how" className="btn-tertiary rounded-full px-4 py-3 text-xs">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
