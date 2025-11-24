import { createSlice } from '@reduxjs/toolkit';
import appConfig from 'configs/app.config';

const initialState = {
  currentLang: appConfig.locale,
  selectedCurrency: [],
  selectedChannel: [],
  channelList: null,
  isSelectChannelDialogOpen: null,
  DatainPromo: [],
  timestore: '',
  datestore: '',
  LOADERCHECK: false,
  STARCAST: [],
  dateForm: [new Date(), ''],
  NotificationList: [],
  notifications: [],
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.currentLang = action.payload;
    },

    setDatainPromo: (state, action) => {
      state.DatainPromo = action.payload;
    },
    setdatestore: (state, action) => {
      state.datestore = action.payload;
    },
    settimestore: (state, action) => {
      state.timestore = action.payload;
    },
    setselectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
    setChannelList: (state, action) => {
      state.channelList = action.payload;
    },
    setIsSelectChannelDialogOpen: (state, action) => {
      state.isSelectChannelDialogOpen = action.payload;
    },
    setselectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setdateForm: (state, action) => {
      state.dateForm = action.payload;
    },
    setLOADERCHECK: (state, action) => {
      state.LOADERCHECK = action.payload;
    },
    setSTARCAST: (state, action) => {
      state.STARCAST = action.payload;
    },
    setNotificationList: (state, action) => {
      state.NotificationList = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const {
  setLang,
  setselectedChannel,
  setChannelList,
  setIsSelectChannelDialogOpen,
  setDatainPromo,
  settimestore,
  setdatestore,
  setdateForm,
  setselectedCurrency,
  setLOADERCHECK,
  setSTARCAST,
  setNotificationList,
  setNotifications,
} = localeSlice.actions;

export default localeSlice.reducer;
