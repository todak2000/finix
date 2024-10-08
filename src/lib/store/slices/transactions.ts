import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Define the TransactionProps interface
export interface TransactionProps {
  amount: string;
  createdAt: number;
  fullname: string;
  id: string;
  paymentState: string;
  paymentType: string;
  purpose: string;
  transactionId: string;
  userPurpose: string;
  walletId: string;
}

// Define the initial state to hold an array of transactions
export const initialTransactionState: TransactionProps[] = [];

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialTransactionState,
  reducers: {
    setTransactions: (state, action: PayloadAction<TransactionProps[]>) => {
      Object.assign(state, action.payload);
    },
    updateTransactions: (state, action: PayloadAction<TransactionProps>) => {
      state.push(action.payload);
    },
    // New reducer to update a single transaction by transactionId
    updateTransactionById: (
      state,
      action: PayloadAction<{ transactionId: string; paymentState: string }>
    ) => {
      const { transactionId, paymentState } = action.payload;
      const transaction = state.find(
        (tx) => tx.transactionId === transactionId
      );
      if (transaction) {
        transaction.paymentState = paymentState;
      }
    },
  },
});

export const { setTransactions, updateTransactions, updateTransactionById } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
