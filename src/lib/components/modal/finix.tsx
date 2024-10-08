/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpin from '../loaders/LoaderSpin';
import { createTransferWalletToWallet } from '@/lib/circle/circle';
import {
  paymentState,
  purpose as adminPurpose,
  transactionType,
} from '@/lib/circle/constants';
import { getUserByEmail } from '@/lib/firebase/onboarding';
import {
  getUserTransaction,
  recordTransaction,
} from '@/lib/firebase/transactions';
import { Toast } from '@/lib/helpers/Toast';
import type { OriginalTransactionProps } from '@/lib/helpers/transformer';
import { transformTransactions } from '@/lib/helpers/transformer';
import { user } from '@/lib/store';
import { updateBalance } from '@/lib/store/slices/balance';
import { setModal } from '@/lib/store/slices/modal';
import { setTransactions } from '@/lib/store/slices/transactions';

const Finix = () => {
  const userr = useSelector(user);

  const userData = userr as { displayName: string; walletId: string };
  const [amountToDeposit, setAmountToDeposit] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleTransfer = async () => {
    setLoading(true);
    try {
      const { data } = await getUserByEmail(email);
      if (data && data.walletId) {
        await createTransferWalletToWallet({
          sourceWalletId: userData.walletId,
          destinationWalletId: data.walletId,
          amount: (amountToDeposit as number).toString(),
        });
        const txnData = {
          purpose: adminPurpose.debitTransfer,
          userPurpose: '',
          paymentType: transactionType.debit as 'credit' | 'debit',
          amount: (amountToDeposit as number).toString(),
          fullname: userData.displayName,
          sender: userData.walletId,
          reciever: data.walletId,
          paymentState: paymentState.successful as
            | 'pending'
            | 'successful'
            | 'failed',
          walletId: userData.walletId,
        };
        console.log(txnData, 'data txn');
        const c = await recordTransaction(txnData);
        console.log(c, 'data txn');
        const { data: txnnData } = await getUserTransaction(userData.walletId);
        dispatch(
          setTransactions(
            transformTransactions(txnnData as OriginalTransactionProps[])
          )
        );

        dispatch(
          updateBalance({
            value: amountToDeposit as number,
            operation: 'subtract',
          })
        );
        Toast.success({ msg: 'Transfer successfull!' });
        return { status: 200 };
      } else {
        Toast.error({
          msg: 'No wire accounts available at this time. Please try again later',
        });
      }
    } catch (error) {
      Toast.error({
        msg: 'An error occurred while initiating the deposit. Please try again.',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6 md:max-w-[500px]">
      <h5 className="font-merry text-center text-sm dark:invert">
        Enter Amount to Send
      </h5>
      <div className="w-full bg-white py-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await handleTransfer();
            if (res && res.status === 200)
              dispatch(setModal({ open: false, type: '' }));
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
          <input
            type="email"
            placeholder="Email of Recipient"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-6 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gradient flex w-full flex-row items-center justify-center rounded px-4 py-2 font-bold text-white hover:opacity-70 dark:invert"
          >
            {loading ? <LoaderSpin /> : `Send`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Finix;
