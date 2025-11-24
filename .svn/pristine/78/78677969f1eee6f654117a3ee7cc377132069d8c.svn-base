import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contSegMasterSearchKeyword: '',
};

export const contentSegSlice = createSlice({
  name: 'contentSegment',
  initialState,
  reducers: {
    setContSegMasterSearchKeyword: (state, action) => {
      state.contSegMasterSearchKeyword = action.payload;
    },
  },
});

export const { setContSegMasterSearchKeyword } = contentSegSlice.actions;

export default contentSegSlice.reducer;
