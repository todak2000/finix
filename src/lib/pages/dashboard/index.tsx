/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useMemo, useState } from 'react';
import { FaLocationArrow, FaCopy } from 'react-icons/fa6';
import { FiArrowDownLeft } from 'react-icons/fi';
import { LuArrowDownToLine, LuArrowUpToLine, LuPlus } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';

import { paymentState } from '@/lib/circle/constants';
import LoaderSpin from '@/lib/components/loaders/LoaderSpin';
import { ThemeToggle } from '@/lib/components/theme-toggle';
import { convertTimestamp } from '@/lib/helpers/DateFormatterTemplate';
import { formatAsMoney } from '@/lib/helpers/formatMoney';
import { balance, transactions, user } from '@/lib/store';
import { setModal } from '@/lib/store/slices/modal';
import { cn } from '@/lib/styles/utils';

export interface TransactionProps {
  amount: string;
  createdAt: number;
  fullname: string;
  id: string;
  paymentState: string;
  paymentType: string;
  purpose: string;
  sender: string;
  reciever: string;
  transactionId: string;
  userPurpose: string;
  walletId: string;
}
const Header = ({ name }: { name: string }) => {
  const dispatch = useDispatch();

  const handleFund = () => {
    dispatch(setModal({ open: true, type: 'funding-options' }));
  };
  const handleWithdrawal = () => {
    dispatch(setModal({ open: true, type: 'withdraw-options' }));
  };

  const handleBank = () => {
    dispatch(setModal({ open: true, type: 'add-bank' }));
  };
  return (
    <div className="flex h-24 flex-col justify-between gap-3 rounded md:flex-row md:items-center">
      <div className="flex flex-row items-center justify-between gap-3 md:block">
        <p className="text-sm font-normal">Hi {name?.split(' ')[0]},</p>

        <p className="hidden text-xl font-bold md:block">Wallet Balance</p>
        <span className="block md:hidden">
          {' '}
          <ThemeToggle />
        </span>
      </div>
      <div className="flex flex-row items-center gap-3 md:justify-center">
        <button
          onClick={handleFund}
          type="button"
          className="btn-gradient flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-normal"
        >
          {' '}
          Deposit <FiArrowDownLeft />{' '}
        </button>

        <button
          type="button"
          onClick={handleWithdrawal}
          className="flex flex-row items-center justify-center gap-2 rounded-lg border border-[#222222] px-4 py-2 text-sm font-normal dark:border-white"
        >
          Send Fund <FaLocationArrow />
        </button>
        <button
          type="button"
          onClick={handleBank}
          className="flex flex-row items-center justify-center gap-2 rounded-lg border border-[#222222] px-4 py-2 text-sm font-normal dark:border-white"
        >
          Add Bank Details <LuPlus />
        </button>
      </div>
    </div>
  );
};

const WalletBalance = ({ name, bal }: { name: string; bal: number }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const handleCopy = () => {
    navigator.clipboard
      .writeText(name) // Copy the content to clipboard
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => {
          setCopySuccess('');
        }, 2000);
      }) // Set success message
      .catch((err) => console.error('Failed to copy: ', err));
  };
  return (
    <div className="flex max-w-96 flex-col gap-5 rounded-xl bg-white p-6 shadow dark:invert">
      <p className="text-lg font-normal text-[#222222]">USDC Balance</p>
      <p className="text-2xl font-bold text-[#3F5AB3] dark:invert">
        ${formatAsMoney(bal)}
      </p>
      <div className="flex items-center">
        <p className="text-lg font-normal text-[#3F5AB3] dark:invert">{name}</p>
        <FaCopy
          className="ml-2 cursor-pointer text-2xl text-gray-400 hover:opacity-70"
          onClick={handleCopy}
        />{' '}
        {/* Copy icon */}
        {copySuccess && (
          <span className="ml-2 text-xs text-gray-500">{copySuccess}</span>
        )}{' '}
        {/* Success message */}
      </div>
    </div>
  );
};

const CurrencySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="rounded border border-[#71B1E7] p-2 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent"
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      {/* Add more currency options as needed */}
    </select>
  </div>
);

const Converter = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const conversionRate = 0.85;
    amount && setConvertedAmount(amount * conversionRate);
  };

  return (
    <div className="flex max-w-96 flex-col gap-5 rounded-xl bg-white p-6 dark:invert">
      <p className="text-lg font-medium text-[#222222]">
        Exchange Rate Calculator
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          value={amount as number}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter Amount e.g. 1302"
          className="rounded border-none bg-[#71b2e72c] p-2 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert"
        />
        <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
        <CurrencySelect value={toCurrency} onChange={setToCurrency} />
        <button
          type="submit"
          disabled={!amount}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-normal text-black dark:invert',
            {
              'bg-gray-100': !amount,
              'btn-gradient': amount,
            }
          )}
        >
          Convert
        </button>
      </form>
      {convertedAmount !== null && (
        <p className="text-lg font-bold text-[#3F5AB3]">
          Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
};

const TransactionTable = ({
  data,
  walletId,
}: {
  data: TransactionProps[];
  walletId: string;
}) => {
  return (
    <div className="max-h-[480px] overflow-y-auto p-6">
      {data &&
        data.length > 0 &&
        data.map((txn) => {
          return (
            <div
              key={txn.transactionId}
              className="my-6 flex flex-row items-center justify-between dark:invert"
            >
              <div className="left flex flex-row items-center space-x-6">
                {txn.reciever === walletId ? (
                  <LuArrowDownToLine className="text-2xl text-green-400" />
                ) : (
                  <LuArrowUpToLine className="text-2xl text-red-400" />
                )}
                <div className="right flex flex-col gap-3">
                  <p className="text-sm font-medium text-[#222222]">
                    {txn.purpose}
                  </p>
                  <p className="text-xs font-normal text-gray-500">
                    {convertTimestamp(txn.createdAt)}
                  </p>
                </div>
              </div>
              <div className="right flex flex-col gap-3">
                <p className="text-right text-sm font-medium text-[#222222]">
                  ${formatAsMoney(txn.amount)}
                </p>
                <p
                  className={cn('text-right text-xs font-normal dark:invert', {
                    'text-[#ee2929]': txn.paymentState === paymentState.failed,
                    'text-[#eaaa0a]': txn.paymentState === paymentState.pending,
                    'text-[#07bf03]':
                      txn.paymentState === paymentState.successful,
                  })}
                >
                  {txn.paymentState}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

// Define the TypeScript interface for the transaction

const Dashboard = () => {
  const data = useSelector(user);
  const txns = useSelector(transactions);

  const walletId = useMemo(() => {
    return data && (data as { walletId: string }).walletId;
  }, [data]);

  const bal = useSelector(balance);

  return (
    <div className="overflow-y-auto md:h-[80vh] md:overflow-hidden">
      {walletId && data ? (
        <>
          <Header
            name={data && (data as { displayName: string }).displayName}
          />
          <div className="mt-6 flex w-full flex-col md:flex-row">
            <div className="w-full space-y-6 md:w-1/3">
              <WalletBalance name={walletId} bal={bal} />
              <Converter />
            </div>
            <div className="my-6 w-full py-6 md:my-0 md:w-2/3 md:px-12 md:py-0">
              <p className="text-xl font-bold text-[#222222] dark:text-white">
                Recent transactions
              </p>
              {txns && txns.length > 0 ? (
                <TransactionTable
                  data={txns as TransactionProps[]}
                  walletId={walletId}
                />
              ) : (
                <p>No transactions yet!</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="m-auto flex h-[50vh] flex-col items-center justify-center">
          <LoaderSpin />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
