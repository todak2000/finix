/* eslint-disable import/order */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Collection from '../db';
import CRUDOperation from '../functions/CRUDOperation';

interface TxnDataProps {
  id?: string;
  createdAt?: Timestamp;
  purpose: string;
  paymentType: 'debit' | 'credit';
  amount: string | number;
  fullname: string;
  paymentState: 'pending' | 'successful' | 'failed';
  walletId: string;
}

const txnOperation = new CRUDOperation(Collection.Transactions);

export const recordTransaction = async (data: TxnDataProps) => {
  if (data.walletId && data.amount && data.purpose) {
    try {
      const transactionId = uuidv4();
      const txnData: TxnDataProps = {
        ...data,
        amount: parseFloat(data.amount as string).toFixed(2),
        id: transactionId,
        createdAt: Timestamp.fromDate(new Date()),
      };
      await txnOperation.add(txnData);

      return {
        status: 200,
        message: 'Transaction recorded Successfully!',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        status: 500,
        message: `Error recording transaction: ${error.message}`,
      };
    }
  } else {
    return {
      status: 400,
      message: `One of the fields is empty/null`,
    };
  }
};

export const getUserTransaction = async (walletId: string) => {
  if (walletId) {
    try {
      const txns = await txnOperation.getUserTransactions(walletId);

      return {
        status: 200,
        data: txns,
        message: 'Transaction retrieved Successfully!',
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        status: 500,
        message: `Error retrieving transactions: ${error.message}`,
      };
    }
  } else {
    return {
      status: 400,
      message: `Wallet ID is empty/null`,
    };
  }
};
