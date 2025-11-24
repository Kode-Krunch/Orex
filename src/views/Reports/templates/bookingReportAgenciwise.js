import { reportsEnum } from '../enums/ReportsEnums';

const bookingReportAgenciwise = {
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
    fetchUrl: 'USP_RPT_BookingReport_AgencyWise',
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
        param: 'Flag',
        type: 'static',
        value: 'AGENCYMASTER',
      },
      {
        param: 'LoginId',
        type: 'default',
      },
    ],
  },
};

export default bookingReportAgenciwise;
