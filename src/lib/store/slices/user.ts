/* eslint-disable import/no-extraneous-dependencies */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  userData: Record<string, unknown> | null;
}

export const initialUserState: UserState = {
  userData: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
