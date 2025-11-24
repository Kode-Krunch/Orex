import { reportsEnum } from '../enums/ReportsEnums';

const programReport = {
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
      label: 'Content',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'usp_PG_GetContentList',
        params: [
          {
            param: 'LocationCode',
            type: 'default',
          },
          {
            param: 'ChannelCode',
            type: 'default',
          },
        ],
        labelKey: 'ContentName',
        valueKey: 'ContentCode',
      },
      stateKey: 'content',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'GetTxProgramReport',
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
        param: 'ContentCode',
        type: 'state',
        stateKey: 'content',
        inputType: reportsEnum.inputType.select,
      },
    ],
  },
};

export default programReport;
