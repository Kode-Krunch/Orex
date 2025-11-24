import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  avatar: '',
  userName: '',
  email: '',
  PasswordExpiry: '',
  authority: [],
  MAXSegment: '',
  Segcaption: '',
  Segcaption1: '',
  Segcaption2: '',
  title: '',
  Moduletitle: '',
  DealData: {},
  ChannelCode: '',
  LocationCode: '',
  DealDataDetails: [],
  ModuleList: [],
};

export const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState,
    SetMAXSegment: (state, action) => {
      state.MAXSegment = action.payload;
    },
    SetSegcaption: (state, action) => {
      state.Segcaption = action.payload;
    },
    SetSegcaption1: (state, action) => {
      state.Segcaption1 = action.payload;
    },
    SetSegcaption2: (state, action) => {
      state.Segcaption2 = action.payload;
    },
    settitle: (state, action) => {
      state.title = action.payload;
    },
    setModuletitle: (state, action) => {
      state.Moduletitle = action.payload;
    },
    setDealData: (state, action) => {
      state.DealData = action.payload;
    },
    setDealDataDetails: (state, action) => {
      state.DealDataDetails = action.payload;
    },
    setModuleList: (state, action) => {
      state.ModuleList = action.payload;
    },
  },
});

export const {
  setUser,
  SetMAXSegment,
  SetSegcaption,
  SetSegcaption1,
  SetSegcaption2,
  settitle,
  setModuletitle,
  setDealData,
  setDealDataDetails,
  setModuleList,
} = userSlice.actions;

export default userSlice.reducer;
