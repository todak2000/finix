/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { useState } from 'react';
import { FaRegCreditCard } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { PiBankBold } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import { mockCards } from '@/lib/circle/constants';
import { setModal } from '@/lib/store/slices/modal';

const FundingOptions = () => {
  const dispatch = useDispatch();
  const [isCard, setIsCard] = useState<boolean>(false);
  const nextModal = (value: string, data?: any) => {
    dispatch(setModal({ open: true, type: value, data }));
  };

  const arr = [
    {
      name: 'Bank Transfer',
      icon: <PiBankBold />,
      value: 'bank',
      onClick: async () => {
        nextModal('bank');
      },
    },
    {
      name: 'Card',
      icon: <FaRegCreditCard />,
      value: 'card',
      onClick: () => setIsCard(true),
    },
  ];

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6">
      <h5 className="font-merry text-center text-sm dark:invert">
        Deposit Options
      </h5>

      <div className="mb-6 w-full space-y-3">
        {!isCard ? (
          <>
            {arr.map((i) => {
              return (
                <button
                  type="button"
                  key={i.name}
                  onClick={i.onClick}
                  className="flex w-full cursor-pointer flex-row items-center gap-3 rounded-lg border border-[#3F5AB3] px-6 py-3 text-[#3F5AB3] hover:opacity-70 dark:invert"
                >
                  {i.icon}
                  {i.name}
                </button>
              );
            })}
          </>
        ) : (
          <>
            {mockCards?.map((i) => {
              return (
                <button
                  type="button"
                  key={i.id as string}
                  onClick={() => nextModal('deposit-card')}
                  className="flex w-full cursor-pointer flex-row items-center gap-3 rounded-lg border border-[#3F5AB3] px-6 py-3 text-[#3F5AB3] hover:opacity-70 dark:invert"
                >
                  <FaRegCreditCard />
                  {i.issuerCountry as string} -{i.network as string} -{' '}
                  {i.bin as string}
                </button>
              );
            })}
          </>
        )}
      </div>
      {isCard && (
        <button
          type="button"
          onClick={() => setIsCard(false)}
          className="flex flex-row items-center justify-center space-x-3 text-gray-400"
        >
          <IoIosArrowRoundBack />
          Back
        </button>
      )}
    </div>
  );
};

export default FundingOptions;
