/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { CiBank } from 'react-icons/ci';
import { FaBitcoin } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import { user } from '@/lib/store';
import { setModal } from '@/lib/store/slices/modal';

const WithdrawOptions = () => {
  const dispatch = useDispatch();
  const userr = useSelector(user);

  const userData = userr as {
    bankData: Record<string, string | number>[];
  };
  const nextModal = (value: string, data?: any) => {
    dispatch(setModal({ open: true, type: value, data }));
  };

  const arr = [
    {
      name: 'Finix',
      icon: <FaBitcoin />,
      value: 'finix',
      onClick: () => {
        nextModal('finix');
      },
    },
    {
      name: 'Local Bank',
      icon: <CiBank />,
      value: 'withdraw-bank',
      onClick: () => {
        nextModal(
          userData.bankData && userData.bankData.length > 0
            ? 'withdraw-bank'
            : 'add-bank'
        );
      },
    },
  ];

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6">
      <h5 className="font-merry text-center text-sm dark:invert">
        Withdrawal Options
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

export default WithdrawOptions;
