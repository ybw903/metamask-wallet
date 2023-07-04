import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

export const popupRegistry: JSX.Element[] = [];

const initialState = {
  registryCnt: 0,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    open: (state) => {
      state.registryCnt++;
    },
    close: (state) => {
      state.registryCnt--;
    },
  },
});

export const selectPopupState = (state: RootState) => state.popup;

export const { open, close } = popupSlice.actions;
export default popupSlice.reducer;
