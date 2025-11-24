import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  MainTable: [],
  SecondTable: [],
  Columnright: [],
  Columnleft: [],
  value: null,
  fpcTimes: {},
  ColumnValidation: [],
  headername: '',
  BackCondition: '',
};

export const SchedulingSlice = createSlice({
  name: 'Scheduling',
  initialState,
  reducers: {
    setMainTable: (state, action) => {
      state.MainTable = action.payload;
    },
    setSecondTable: (state, action) => {
      state.SecondTable = action.payload;
    },
    setColumnright: (state, action) => {
      state.Columnright = action.payload;
    },
    setColumnleft: (state, action) => {
      state.Columnleft = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setFpcTimes: (state, action) => {
      state.fpcTimes = action.payload;
    },
    setColumnValidation: (state, action) => {
      state.ColumnValidation = action.payload;
    },
    setheadername: (state, action) => {
      state.headername = action.payload;
    },
    setBackCondition: (state, action) => {
      state.BackCondition = action.payload;
    },
  },
});

export const {
  setMainTable,
  setSecondTable,
  setColumnright,
  setColumnleft,
  setValue,
  setFpcTimes,
  setColumnValidation,
  setheadername,
  setBackCondition,
} = SchedulingSlice.actions;

export default SchedulingSlice.reducer;
