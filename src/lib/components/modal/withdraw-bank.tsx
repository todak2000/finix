/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoaderSpin from '../loaders/LoaderSpin';
import { createTransferWalletToWallet } from '@/lib/circle/circle';
import {
  paymentState,
  purpose as adminPurpose,
  transactionType,
  merchantWalletID,
} from '@/lib/circle/constants';
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

const WithdrawBank = () => {
  const userr = useSelector(user);

  const userData = userr as {
    displayName: string;
    walletId: string;
    id: string;
    bankData: Record<string, string | number>[];
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [withdrawalData, setWithdrawalData] = useState({
    amount: '',
    bank: '',
  });
  console.log(userData.bankData, 'bank data firestore');
  const withdrawToBank = async () => {
    setLoading(true);
    try {
      const txnData = {
        purpose: adminPurpose.debitBank,
        userPurpose: '',
        paymentType: transactionType.debit as 'credit' | 'debit',
        amount: withdrawalData.amount,
        fullname: userData.displayName,
        sender: userData.walletId,
        reciever: 'finix',
        paymentState: paymentState.successful as
          | 'pending'
          | 'successful'
          | 'failed',
        walletId: userData.walletId,
      };
      await createTransferWalletToWallet({
        sourceWalletId: userData.walletId,
        destinationWalletId: merchantWalletID,
        amount: withdrawalData.amount,
      });
      await recordTransaction(txnData);
      const { data: txnnData } = await getUserTransaction(userData.walletId);
      dispatch(
        setTransactions(
          transformTransactions(txnnData as OriginalTransactionProps[])
        )
      );
      dispatch(
        updateBalance({
          value: Number(withdrawalData.amount) as number,
          operation: 'subtract',
        })
      );
      Toast.success({ msg: 'Withdrawal to bank successfully' });
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
    const { name, value } = e.target;
    setWithdrawalData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    return Object.values(withdrawalData).every((field) => field.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    if (validateForm()) {
      console.log(withdrawalData);
      await withdrawToBank();
    } else {
      setLoading(false);
      Toast.error({ msg: 'Please fill in all fields.' });
    }
  };

  // Preset list of banks
  const banks = useMemo(() => {
    return userData.bankData.map((bank: Record<string, string | number>) => ({
      value: bank.bankName,
      label: `${bank.bankName} - ${bank.accountNumber} - ${bank.country}`,
    }));
  }, [userData]);

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-6 md:max-w-[500px]">
      <h5 className="font-merry text-center text-sm dark:invert">
        Withdraw Funds
      </h5>
      <div className="w-full bg-white py-6">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount to Withdraw"
            value={withdrawalData.amount}
            onChange={handleChange}
            className="mb-4 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
            required
          />
          <select
            name="bank"
            value={withdrawalData.bank}
            onChange={handleChange}
            className="mb-4 w-full rounded border-none bg-[#71b2e72c] p-2 text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
            required
          >
            <option value="Select">Select Recieving Bank</option>
            {banks.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </select>
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

export default WithdrawBank;
