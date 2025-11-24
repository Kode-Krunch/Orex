import { reportsEnum } from '../enums/ReportsEnums';

const dealSummaryReport = {
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
      label: 'Filter By',
      required: true,
      options: [
        { value: 'AGENCYMASTER', label: 'Agency' },
        { value: 'CLIENTMASTER', label: 'Client' },
      ],
      stateKey: 'flag',
    },
    {
      type: reportsEnum.inputType.multiSelect,
      label: 'Select',
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
            param: 'Flag',
            type: 'state',
            stateKey: 'flag',
            inputType: reportsEnum.inputType.select,
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'entities',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_Sch_DealSummaryReport',
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
        param: 'Flag',
        type: 'state',
        stateKey: 'flag',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'FilterValues',
        type: 'state',
        stateKey: 'entities',
        inputType: reportsEnum.inputType.multiSelect,
      },
    ],
  },
};

export default dealSummaryReport;
