/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './slices/modal';
import userReducer from './slices/user';
import transactionsReducer from './slices/transactions';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    transactions: transactionsReducer,
  },
});

export default store;
// Selectors
export const modal = (state: ReturnType<typeof store.getState>) => state.modal;
export const user = (state: ReturnType<typeof store.getState>) => state.user;
export const transactions = (state: ReturnType<typeof store.getState>) =>
  state.transactions;
