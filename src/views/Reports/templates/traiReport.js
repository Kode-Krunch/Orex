import { reportsEnum } from '../enums/ReportsEnums';

const traiReport = {
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
      label: 'Minutes',
      required: true,
      options: [
        { value: 1, label: '60' },
        { value: 2, label: '30' },
      ],
      stateKey: 'flag',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_TRAIInventoryReport',
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
  },
};

export default traiReport;
