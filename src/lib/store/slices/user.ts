/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const initialUserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<unknown>) => {
      if (action.payload) {
        const { createdAt, ...userDataWithoutCreatedAt } =
          action.payload as Record<string, unknown>; // Exclude createdAt
        Object.assign(state, userDataWithoutCreatedAt); // Use the modified userData
      }
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
