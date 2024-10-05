/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { FiArrowDownLeft } from 'react-icons/fi';
import { LuArrowDownToLine } from 'react-icons/lu';
import { useSelector } from 'react-redux';

import { ThemeToggle } from '@/lib/components/theme-toggle';
import { formatAsMoney } from '@/lib/helpers/formatMoney';
import { user } from '@/lib/store';
import { cn } from '@/lib/styles/utils';

const Header = ({ name }: { name: string }) => {
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
          type="button"
          className="btn-gradient flex flex-row items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-normal"
        >
          {' '}
          Fund Wallet <FiArrowDownLeft />{' '}
        </button>

        <button
          type="button"
          className="flex flex-row items-center justify-center gap-2 rounded-lg border border-[#222222] px-4 py-2 text-sm font-normal dark:border-white"
        >
          Send Fund <FaLocationArrow />
        </button>
      </div>
    </div>
  );
};

const WalletBalance = ({
  name,
  balance,
}: {
  name: string;
  balance: number;
}) => {
  return (
    <div className="flex max-w-96 flex-col gap-5 rounded-xl bg-white p-6 shadow dark:invert">
      <p className="text-lg font-normal text-[#222222]">USDC Balance</p>
      <p className="text-2xl font-bold text-[#3F5AB3] dark:invert">
        ${formatAsMoney(balance)}
      </p>
      <p className="text-lg font-normal text-[#3F5AB3] dark:invert">{name}</p>
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
          className={cn('rounded-lg px-4 py-2 text-sm font-normal', {
            'bg-gray-100': !amount,
            'btn-gradient': amount,
          })}
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

const TransactionTable = ({ data }: { data: any[] }) => {
  return (
    <div className="p-6">
      {data.map((txn) => {
        return (
          <div
            key={txn}
            className="my-6 flex flex-row items-center justify-between dark:invert"
          >
            <div className="left flex flex-row items-center space-x-6">
              <LuArrowDownToLine className="text-2xl" />
              <div className="right flex flex-col gap-3">
                <p className="text-sm font-medium text-[#222222]">
                  Funded Wallet
                </p>
                <p className="text-xs font-normal text-gray-500">Jun 25 2024</p>
              </div>
            </div>
            <div className="right flex flex-col gap-3">
              <p className="text-right text-sm font-medium text-[#222222]">
                $10,000
              </p>
              <p className="text-right text-xs font-normal text-[#ee2929]">
                Successfull
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  //   const { theme } = useTheme();
  const data = useSelector(user);
  //   const usdcBalance = 1000; // Example balance, replace with actual data
  //   const transactions: any[] = []; // Example transactions, replace with actual data

  return (
    <div className="overflow-y-auto md:h-[80vh] md:overflow-hidden">
      <Header name={data && (data as { displayName: string }).displayName} />
      <div className="mt-6 flex w-full flex-col md:flex-row">
        <div className="w-full space-y-6 md:w-1/3">
          <WalletBalance
            name={data && (data as { displayName: string }).displayName}
            balance={1000}
          />
          <Converter />
        </div>
        <div className="my-6 w-full py-6 md:my-0 md:w-2/3 md:px-12 md:py-0">
          <p className="text-xl font-bold text-[#222222] dark:text-white">
            Recent transactions
          </p>
          <TransactionTable data={[1, 2, 3, 4, 5]} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
