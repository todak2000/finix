/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { convertTimestamp } from '@/lib/helpers/DateFormatterTemplate';
import { formatAsMoney } from '@/lib/helpers/formatMoney';
import { user } from '@/lib/store';
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopyMessage('Copied!'); // Set the copy message
    setTimeout(() => setCopyMessage(''), 2000); // Clear the message after 2 seconds
  };

  return (
    <div className="relative mb-1 space-y-1">
      <p className="text-[#2222222]">
        <strong>{label}:</strong>
        {copyMessage && (
          <span className="ml-3 rounded-full bg-gray-200 px-3 py-1 text-xs text-[#3F5AB3]">
            {copyMessage}
          </span>
        )}
      </p>
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          readOnly
          className="w-full rounded border-none bg-[#71b2e72c] p-2 text-[13px] text-gray-500 focus:border-[#3F5AB3] focus:ring-[#3F5AB3] dark:invert md:text-base"
        />
        <FaCopy
          onClick={handleCopy}
          className="absolute bottom-auto right-1 top-auto cursor-pointer text-[#71B1E7] dark:invert"
          title="Copy"
        />
      </div>
    </div>
  );
};

const TransactionDetails = ({ data: txn }: { data: any }) => {
  const txnRows = [
    { label: 'Amount', value: `$${formatAsMoney(txn.amount)}` },
    { label: 'Transaction Type', value: txn.paymentType },
    {
      label: 'Purpose',
      value: txn.purpose,
    },
    {
      label: 'Transaction ID',
      value: txn.transactionId,
    },
    { label: 'Payment Status', value: txn.paymentState },
    { label: 'Payment Date', value: convertTimestamp(txn.createdAt) },
  ];

  return (
    <div className="font-roboto flex min-w-[300px] max-w-[320px] flex-col items-center justify-center gap-2 md:max-w-[500px] md:px-12">
      <h5 className="font-merry text-center text-sm dark:invert">
        Transaction Details
      </h5>
      <div className="w-full bg-white py-3 md:py-6">
        {txnRows.map((row) => (
          <InfoRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </div>
  );
};

export default TransactionDetails;
