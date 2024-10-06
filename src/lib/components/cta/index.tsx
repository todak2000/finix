/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import LoaderSpin from '../loaders/LoaderSpin';
import { handleGoogle } from '@/lib/serverActions/onboarding';

import { ctaContent } from './constant';
import { useSelector } from 'react-redux';
import { user } from '@/lib/store';

const CallToAction: React.FC = () => {
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
    <section className="dark:inverted py-12">
      <div className="container mx-auto space-y-6 px-4 text-center">
        <h2 className="mb-4 font-bold">{ctaContent.header}</h2>
        <p className="mb-6">{ctaContent.subHeader}</p>
        {userr && (userr as { displayName: string }).displayName && (
          <button
            type="button"
            onClick={handleOnboarding}
            className="btn-gradient mx-auto flex flex-row items-center justify-center space-x-3 rounded-full px-4 py-3 text-xs"
          >
            {loading ? (
              <LoaderSpin />
            ) : (
              <>
                {' '}
                <span>Sign Up Now with</span> <FcGoogle className="text-lg" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
