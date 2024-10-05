/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type React from 'react';

interface ModalState {
  open: boolean;
  type: string;
  data?: any;
  setOther?: React.Dispatch<React.SetStateAction<any>>;
}

const initialState: ModalState = {
  open: false,
  type: '',
  data: null,
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalState>) => {
      return {
        ...state,
        type: action.payload.type,
        open: action.payload.open,
        data: action.payload.data,
      };
    },
  },
});

export const { setModal } = ModalSlice.actions;

export default ModalSlice.reducer;
