import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  promoMasterSearchKeyword: '',
};

export const promoMasterSlice = createSlice({
  name: 'promoMaster',
  initialState,
  reducers: {
    setPromoMasterSearchKeyword: (state, action) => {
      state.promoMasterSearchKeyword = action.payload;
    },
  },
});

export const { setPromoMasterSearchKeyword } = promoMasterSlice.actions;

export default promoMasterSlice.reducer;
