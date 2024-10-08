/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpin from '../loaders/LoaderSpin';
import { mockCardDeposit } from '@/lib/circle/circle';
import {
  paymentState,
  purpose as adminPurpose,
  transactionType,
} from '@/lib/circle/constants';
import {
  getUserTransaction,
  recordTransaction,
} from '@/lib/firebase/transactions';
import { finixFees, formatAsMoney } from '@/lib/helpers/formatMoney';
import { Toast } from '@/lib/helpers/Toast';
import type { OriginalTransactionProps } from '@/lib/helpers/transformer';
import { transformTransactions } from '@/lib/helpers/transformer';
import { user } from '@/lib/store';
import { setModal } from '@/lib/store/slices/modal';
import { setTransactions } from '@/lib/store/slices/transactions';

const DepositCard = () => {
  const userr = useSelector(user);

  const userData = userr as {
    displayName: string;
    walletId: string;
    id: string;
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [depositData, setDepositData] = useState({
    amount: '',
    paidAmount: 0,
    fees: 0,
  });
  const depositViaCard = async () => {
    setLoading(true);
    try {
      const txnData = {
        purpose: adminPurpose.fundCard,
        userPurpose: '',
        paymentType: transactionType.credit as 'credit' | 'debit',
        amount: depositData.amount,
        fullname: userData.displayName,
        sender: userData.walletId,
        reciever: 'finix',
        paymentState: paymentState.pending as
          | 'pending'
          | 'successful'
          | 'failed',
        walletId: userData.walletId,
      };
      const { data } = await mockCardDeposit({
        amount: depositData.amount,
        walletId: userData.walletId,
      });
      await recordTransaction({
        ...txnData,
        transactionId: data.id,
        amount: depositData.amount,
      });
      const { data: txnnData } = await getUserTransaction(userData.walletId);
      dispatch(
        setTransactions(
          transformTransactions(txnnData as OriginalTransactionProps[])
        )
      );

      Toast.success({
        msg: 'Deposit via card is now a pending transaction. it will be confirmed as soon as possible',
      });
      dispatch(setModal({ open: false, type: '' }));
    } catch (error) {
      Toast.error({
        msg: 'An error occurred while initiating the deposit. Please try again.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    const realAmount = finixFees(value);
    setDepositData({
      amount: value,
      paidAmount: realAmount.paidAmount,
      fees: realAmount.fees,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (depositData.amount !== '') {
      await depositViaCard();
    } else {
      setLoading(false);
      Toast.error({ msg: 'Please enter the amount.' });
    }
  };

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6 md:max-w-[500px]">
      <h5 className="font-merry text-center text-sm dark:invert">
        Deposit with Card
      </h5>
      <div className="w-full bg-white pb-6">
        {depositData.paidAmount > 0 && (
          <p className="my-3 rounded-lg p-2 text-center text-sm text-[#3F5AB3]">
            You will recieve{' '}
            <strong>${formatAsMoney(depositData.paidAmount)}</strong> in your
            wallet. There is a charge of{' '}
            <strong>${formatAsMoney(depositData.fees)}</strong>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount to Deposit"
            value={depositData.amount}
            onChange={handleChange}
            className="mb-4 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
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

export default DepositCard;
