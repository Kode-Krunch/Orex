import { reportsEnum } from '../enums/ReportsEnums';

const logReportAgenciwise = {
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
        fetchUrl: 'USP_DropDown_List_Booking_AgencyWise',
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
          {
            param: 'LoginId',
            type: 'default',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'client',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Sales Executive',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_List_Booking_AgencyWise',
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
            value: 'EmployeeMaster',
          },
          {
            param: 'LoginId',
            type: 'default',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'employee',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Zone',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_List_Booking_AgencyWise',
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
            value: 'ZONEMASTER',
          },
          {
            param: 'LoginId',
            type: 'default',
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
    fetchUrl: 'USP_RPT_LogReport_Agenciwise',
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
      {
        param: 'salesExecCode',
        type: 'state',
        stateKey: 'employee',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'Zonecode',
        type: 'state',
        stateKey: 'zone',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'LoginId',
        type: 'default',
      },
    ],
  },
};

export default logReportAgenciwise;
