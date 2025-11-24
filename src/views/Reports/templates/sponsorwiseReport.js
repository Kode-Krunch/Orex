import { reportsEnum } from '../enums/ReportsEnums';

const sponsorwiseReport = {
  inputs: [
    {
      type: reportsEnum.inputType.dateRange,
      label: 'Start - End Date',
      required: true,
      size: 'sm',
      stateKey: 'date',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'Sp_sponsorwise_Report',
    params: [
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
    ],
  },
};

export default sponsorwiseReport;
