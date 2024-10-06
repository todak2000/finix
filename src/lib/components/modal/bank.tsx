/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpin from '../loaders/LoaderSpin';
import { getWireAccounts, getWireInstructions } from '@/lib/circle/circle';
import {
  paymentState,
  purpose as adminPurpose,
  transactionType,
} from '@/lib/circle/constants';
import {
  getUserTransaction,
  recordTransaction,
} from '@/lib/firebase/transactions';
import { Toast } from '@/lib/helpers/Toast';
import type { OriginalTransactionProps } from '@/lib/helpers/transformer';
import { transformTransactions } from '@/lib/helpers/transformer';
import { user } from '@/lib/store';
import { setModal } from '@/lib/store/slices/modal';
import { setTransactions } from '@/lib/store/slices/transactions';

const Bank = () => {
  const userr = useSelector(user);

  const userData = userr as { displayName: string; walletId: string };
  const [amountToDeposit, setAmountToDeposit] = useState<number | null>(null);
  const [purpose, setPurpose] = useState<string>('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const initiateDeposit = async () => {
    setLoading(true);
    try {
      const txnData = {
        purpose: adminPurpose.fundBank,
        userPurpose: purpose,
        paymentType: transactionType.credit as 'credit' | 'debit',
        amount: (amountToDeposit as number).toString(),
        fullname: userData.displayName,
        sender: userData.walletId,
        reciever: 'finix',
        paymentState: paymentState.pending as
          | 'pending'
          | 'successful'
          | 'failed',
        walletId: userData.walletId,
      };
      const { data: wireAccounts } = await getWireAccounts();
      if (wireAccounts.length > 0) {
        const randomAccount =
          wireAccounts[Math.floor(Math.random() * wireAccounts.length)];
        const { data: instructions } = await getWireInstructions(
          randomAccount.id
        );
        await recordTransaction(txnData);
        const { data: txnnData } = await getUserTransaction(userData.walletId);
        dispatch(
          setTransactions(
            transformTransactions(txnnData as OriginalTransactionProps[])
          )
        );
        return { ...instructions, amount: amountToDeposit };
      } else {
        Toast.error({
          msg: 'No wire accounts available at this time. Please try again later',
        });
      }
    } catch (error) {
      Toast.error({
        msg: 'An error occurred while initiating the deposit. Please try again.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextModal = (value: string, data?: any) => {
    dispatch(setModal({ open: true, type: value, data }));
  };

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6 md:max-w-[500px]">
      <h5 className="font-merry text-center text-sm dark:invert">
        Enter Amount to Deposit
      </h5>
      <div className="w-full bg-white py-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await initiateDeposit();
            res && res.trackingRef && nextModal('instructions', res);
          }}
        >
          <input
            type="number"
            placeholder="Amount"
            value={amountToDeposit as number}
            onChange={(e) => setAmountToDeposit(Number(e.target.value))}
            className="mb-6 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
            required
          />
          <textarea
            placeholder="What is the purpose of Transaction"
            value={purpose}
            rows={5}
            onChange={(e) => setPurpose(e.target.value)}
            className="mb-6 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient flex w-full flex-row items-center justify-center rounded px-4 py-2 font-bold text-white hover:opacity-70 dark:invert"
          >
            {loading ? <LoaderSpin /> : `Submit`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Bank;
