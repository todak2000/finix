/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const initialBalanceState = 0;

const balanceSlice = createSlice({
  name: 'balance',
  initialState: initialBalanceState,
  reducers: {
    setBalance: (state, action: PayloadAction<{ value: number }>) => {
      return action.payload.value;
    },
    updateBalance: (
      state,
      action: PayloadAction<{ value: number; operation: 'add' | 'subtract' }>
    ) => {
      if (action.payload.operation === 'add') {
        return state + action.payload.value; // Add the value to the current balance
      }
      if (action.payload.operation === 'subtract') {
        return state - action.payload.value; // Subtract the value from the current balance
      }
      return state; // Return the current state if operation is not recognized
    },
  },
});

export const { setBalance, updateBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
