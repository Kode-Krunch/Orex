import { reportsEnum } from '../enums/ReportsEnums';

const epgReport = {
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
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_Sch_EPGReport',
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
    ],
  },
};

export default epgReport;
