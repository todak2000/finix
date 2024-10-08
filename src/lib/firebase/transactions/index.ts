/* eslint-disable @typescript-eslint/no-use-before-define */
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
import {
  createTransferWalletToWallet,
  getPaymentConfirmation,
} from '@/lib/circle/circle';
import { merchantWalletID, paymentState } from '@/lib/circle/constants';
import { finixFees } from '@/lib/helpers/formatMoney';

interface TxnDataProps {
  id?: string;
  createdAt?: Timestamp;
  purpose: string;
  fees?: string | number;
  paymentType: 'debit' | 'credit';
  amount: string | number;
  transactionId?: string;
  sender: string;
  reciever: string;
  fullname: string;
  paymentState: 'pending' | 'successful' | 'failed';
  walletId: string;
}

const txnOperation = new CRUDOperation(Collection.Transactions);

export const recordTransaction = async (data: TxnDataProps) => {
  if (data.walletId && data.amount && data.purpose) {
    try {
      const transactionId = data.transactionId ?? uuidv4();
      const txnData: TxnDataProps = {
        ...data,
        amount:
          data.reciever !== 'finix'
            ? parseFloat(data.amount as string).toFixed(2)
            : (finixFees(data.amount).paidAmount as number).toFixed(2),
        id: transactionId,
        fees:
          data.reciever !== 'finix' ? 0 : (finixFees(data.amount).fees ?? 0),
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

export const updateTransaction = async (
  transactionId: string,
  data: {
    key: string;
    value:
      | string
      | number
      | boolean
      | Record<string, string | number | boolean | object | null>
      | null;
  }
) => {
  if (transactionId && data) {
    try {
      const updatedTxn = await txnOperation.updateKey(
        transactionId,
        data.key,
        data.value
      );

      return {
        status: 200,
        data: updatedTxn,
        message: 'Transaction updated Successfully!',
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

export const checkPayment = async (
  paymentId: string,
  transactionState: string
) => {
  if (!paymentId || !transactionState) {
    return {
      status: 400,
      data: null,
      message: `Payment or transaction ID is empty/null`,
    };
  }

  try {
    const txnData = await txnOperation.getSingleTransaction(paymentId);
    if (
      !txnData ||
      !txnData.transactionId ||
      !txnData.walletId ||
      !txnData.amount
    ) {
      return {
        status: 400,
        data: null,
        message: `Oops! We don't have this transaction data in our database`,
      };
    }

    const { data: circleTxn } = await getPaymentConfirmation(paymentId);
    if (
      circleTxn.id !== paymentId ||
      circleTxn.status === paymentState.pending
    ) {
      return {
        status: 200,
        data: txnData,
        message: 'There was no update for this Transaction yet!',
      };
    }

    const data = {
      key: 'paymentState',
      value: circleTxn.status,
    };
    const res = await updateTransaction(paymentId, data);

    if (circleTxn.status === paymentState.paid) {
      await createTransferWalletToWallet({
        sourceWalletId: merchantWalletID,
        destinationWalletId: txnData.walletId as string,
        amount: txnData.amount,
      });
    }

    return handleResponse(res);
  } catch (error: any) {
    return {
      status: 500,
      data: null,
      message: `Error retrieving transactions: ${error.message}`,
    };
  }
};

const handleResponse = (res: any) => {
  if (res.status === 200 && res.data) {
    return {
      status: 200,
      data: res.data,
      message: 'Transaction updated successfully!',
    };
  }
  return {
    status: 500,
    message: 'Failed to update transaction.',
  };
};
