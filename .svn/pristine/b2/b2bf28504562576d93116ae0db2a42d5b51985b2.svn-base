import { reportsEnum } from '../enums/ReportsEnums';

const agencyWiseSpotDetailsReport = {
  inputs: [
    {
      type: reportsEnum.inputType.date,
      label: 'From Date',
      required: true,
      size: 'sm',
      stateKey: 'fromDate',
    },
    {
      type: reportsEnum.inputType.date,
      label: 'To Date',
      required: true,
      size: 'sm',
      stateKey: 'toDate',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'agency',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_List_Booking',
        params: [
          {
            param: 'LocationCode',
            type: 'default',
          },
          {
            param: 'ChannelCode',
            type: 'default',
          },
          {
            param: 'FromDate',
            type: 'state',
            stateKey: 'fromDate',
            inputType: reportsEnum.inputType.date,
          },
          {
            param: 'Todate',
            type: 'state',
            stateKey: 'toDate',
            inputType: reportsEnum.inputType.date,
          },
          {
            param: 'FieldTable',
            type: 'static',
            value: 'AGENCYMASTER',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',

      },
      stateKey: 'agency',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_GetSpotDetails_AgencyWise',
    params: [
      {
        param: 'LocationCode',
        type: 'default',
      },
      {
        param: 'ChannelCode',
        type: 'default',
      },
      {
        param: 'FromDate',
        type: 'state',
        stateKey: 'fromDate',
        inputType: reportsEnum.inputType.date,
      },
      {
        param: 'Todate',
        type: 'state',
        stateKey: 'toDate',
        inputType: reportsEnum.inputType.date,
      },
      {
        param: 'AgencyCode',
        type: 'state',
        stateKey: 'agency',
        inputType: reportsEnum.inputType.select,
      },
    ],
  },
};

export default agencyWiseSpotDetailsReport;
