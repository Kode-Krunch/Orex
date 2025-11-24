import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  // currentRouteKey: '',
  currentRouteTitle: '',
  Dialogbox: false,
  DialogboxName: '',
  groupid: '',
  Content: [],
  ContentSeg: [],
  TXCode: [],
  Search: '',
  Path: '',
  queryParams: null,
};

export const commonSlice = createSlice({
  name: 'base/common',
  initialState,
  reducers: {
    // setCurrentRouteKey: (state, action) => {
    //     state.currentRouteKey = action.payload
    // },
    setCurrentRouteTitle: (state, action) => {
      state.currentRouteTitle = action.payload;
    },
    setPath: (state, action) => {
      state.Path = action.payload;
    },
    setDialogbox: (state, action) => {
      state.Dialogbox = action.payload;
    },
    setDialogboxName: (state, action) => {
      state.DialogboxName = action.payload;
    },
    setContent: (state, action) => {
      state.Content = action.payload;
    },
    setContentSeg: (state, action) => {
      state.ContentSeg = action.payload;
    },
    setTXCode: (state, action) => {
      state.TXCode = action.payload;
    },
    setGroupid: (state, action) => {
      state.groupid = action.payload;
    },
    setSearch: (state, action) => {
      state.Content = action.payload;
    },
    setQueryParams: (state, action) => {
      state.queryParams = action.payload;
    },
  },
});

export const {
  // setCurrentRouteKey,
  setCurrentRouteTitle,
  setDialogbox,
  setDialogboxName,
  setContent,
  setContentSeg,
  setGroupid,
  setTXCode,
  setSearch,
  setPath,
  setQueryParams,
} = commonSlice.actions;

export default commonSlice.reducer;
