import { reportsEnum } from '../enums/ReportsEnums';

const billedSummaryReport = {
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
      label: 'Zone',
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
            value: 'ZONEMASTER',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'zone',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'usp_BillSummaryReport',
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
        param: 'Zonecode',
        type: 'state',
        stateKey: 'zone',
        inputType: reportsEnum.inputType.select,
      },
    ],
  },
};

export default billedSummaryReport;
