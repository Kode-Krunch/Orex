import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commMasterSearchKeyword: '',
};

export const commMasterSlice = createSlice({
  name: 'commMaster',
  initialState,
  reducers: {
    setCommMasterSearchKeyword: (state, action) => {
      state.commMasterSearchKeyword = action.payload;
    },
  },
});

export const { setCommMasterSearchKeyword } = commMasterSlice.actions;

export default commMasterSlice.reducer;
