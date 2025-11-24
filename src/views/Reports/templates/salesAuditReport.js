import { reportsEnum } from '../enums/ReportsEnums';

const salesAuditReport = {
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
      label: 'Type',
      required: true,
      options: [
        { value: 1, label: 'Booked and Out of Time band Spots' },
        { value: 2, label: 'Booked But Not Telecasted Spots' },
        { value: 3, label: 'Telecasted Spots But Not Booked' },
        { value: 4, label: 'Drop Spots' },
      ],
      stateKey: 'flag',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'sp_Rep_SalesAuditReport',
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

export default salesAuditReport;
