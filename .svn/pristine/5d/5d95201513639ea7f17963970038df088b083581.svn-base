import { createSlice } from '@reduxjs/toolkit';
import { pagesEnum } from 'views/Scheduling/Scheduler/enum';

export const initialState = {
  DatainPromo: [],
  DatainF: [],
  DatainN: [],
  DatainS: [],
  timestore: '',
  datestore: '',
  timestoreF: '',
  datestoreF: '',
  timestoreC: '',
  datestoreC: '',
  timestoreS: '',
  datestoreS: '',
  unsavedWork: {
    [pagesEnum.PROMO]: {},
    [pagesEnum.SONG]: {},
    [pagesEnum.COMMERCIAL]: {},
    [pagesEnum.NTC]: {},
    [pagesEnum.FINAL_LOG]: {},
  },
  resizableAreaRContainerWidth: 20,
  resizableAreaTContainerHeight: 82,
};

export const scheduling = createSlice({
  name: 'scheduling',
  initialState,
  reducers: {
    setDatainPromo: (state, action) => {
      state.DatainPromo = action.payload;
    },
    setdatestore: (state, action) => {
      state.datestore = action.payload;
    },
    settimestore: (state, action) => {
      state.timestore = action.payload;
    },
    setDatainF: (state, action) => {
      state.DatainF = action.payload;
    },
    setdatestoreF: (state, action) => {
      state.datestoreF = action.payload;
    },
    settimestoreF: (state, action) => {
      state.timestoreF = action.payload;
    },
    setDatainN: (state, action) => {
      state.DatainN = action.payload;
    },
    setdatestoreC: (state, action) => {
      state.datestoreC = action.payload;
    },
    settimestoreC: (state, action) => {
      state.timestoreC = action.payload;
    },
    setDatainS: (state, action) => {
      state.DatainS = action.payload;
    },
    setdatestoreS: (state, action) => {
      state.datestoreS = action.payload;
    },
    settimestoreS: (state, action) => {
      state.timestoreS = action.payload;
    },
    setUnsavedWork: (state, action) => {
      state.unsavedWork = action.payload;
    },
    setResizableAreaRContainerWidth: (state, action) => {
      state.resizableAreaRContainerWidth = action.payload;
    },
    setResizableAreaTContainerHeight: (state, action) => {
      state.resizableAreaTContainerHeight = action.payload;
    },
  },
});

export const {
  setDatainPromo,
  setdatestore,
  settimestore,
  setDatainF,
  setdatestoreF,
  settimestoreF,
  setDatainN,
  setdatestoreC,
  settimestoreC,
  setDatainS,
  setdatestoreS,
  settimestoreS,
  setUnsavedWork,
  setResizableAreaRContainerWidth,
  setResizableAreaTContainerHeight,
} = scheduling.actions;

export default scheduling.reducer;
