import { reportsEnum } from '../enums/ReportsEnums';

const dealBookingAuditReport = {
  inputs: [
    {
      type: reportsEnum.inputType.date,
      label: 'Schedule Date',
      required: true,
      size: 'sm',
      stateKey: 'scheduleDate',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Client',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_List_Booking_OneDate',
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
            param: 'ScheduleDate',
            type: 'state',
            stateKey: 'scheduleDate',
            inputType: reportsEnum.inputType.date,
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
    fetchUrl: 'USP_DealBookingAuditReport',
    params: [
      {
        param: 'ChannelCode',
        type: 'default',
      },
      {
        param: 'ClientCode',
        type: 'state',
        stateKey: 'client',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'ScheduleDate',
        type: 'state',
        stateKey: 'scheduleDate',
        inputType: reportsEnum.inputType.date,
      },
    ],
  },
};

export default dealBookingAuditReport;
