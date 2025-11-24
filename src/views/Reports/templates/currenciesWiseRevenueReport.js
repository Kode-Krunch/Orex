import { reportsEnum } from '../enums/ReportsEnums';

const currenciesWiseRevenueReport = {
  inputs: [
    {
      type: reportsEnum.inputType.dateRange,
      label: 'Start - End Date',
      required: true,
      size: 'sm',
      stateKey: 'date',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Client',
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
            stateKey: 'date',
            index: 0,
            inputType: reportsEnum.inputType.dateRange,
          },
          {
            param: 'Todate',
            type: 'state',
            stateKey: 'date',
            index: 1,
            inputType: reportsEnum.inputType.dateRange,
          },
          {
            param: 'FieldTable',
            type: 'static',
            value: 'CLIENTMASTER',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'client',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_Currencies_Wise_Revenue_Reports',
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
        stateKey: 'date',
        index: 0,
        inputType: reportsEnum.inputType.dateRange,
      },
      {
        param: 'Todate',
        type: 'state',
        stateKey: 'date',
        index: 1,
        inputType: reportsEnum.inputType.dateRange,
      },
      {
        param: 'ClientCode',
        type: 'state',
        stateKey: 'client',
        inputType: reportsEnum.inputType.select,
      },
    ],
  },
};

export default currenciesWiseRevenueReport;
