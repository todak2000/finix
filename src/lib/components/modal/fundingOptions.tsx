/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { FaBitcoin } from 'react-icons/fa6';
import { PiBankBold } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

import { setModal } from '@/lib/store/slices/modal';

const FundingOptions = () => {
  const dispatch = useDispatch();
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
      name: 'Crypto',
      icon: <FaBitcoin />,
      value: 'crypto',
      onClick: () => {
        nextModal('crypto');
      },
    },
  ];

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6">
      <h5 className="font-merry text-center text-sm dark:invert">
        Deposit Options
      </h5>
      <div className="mb-6 w-full space-y-3">
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
      </div>
    </div>
  );
};

export default FundingOptions;
