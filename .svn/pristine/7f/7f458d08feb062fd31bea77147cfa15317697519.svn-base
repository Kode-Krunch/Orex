import { reportsEnum } from '../enums/ReportsEnums';

const commercialsReportAgenciwise = {
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
      },
      stateKey: 'client',
    },
    {
      type: reportsEnum.inputType.multiSelect,
      label: 'Commercial',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_List',
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
            value: 'Commercials',
          },
          {
            param: 'ClientCode',
            type: 'state',
            stateKey: 'client',
            inputType: reportsEnum.inputType.select,
          },
          {
            param: 'Param2',
            type: 'static',
            value: '',
          },
          {
            param: 'Param3',
            type: 'static',
            value: '',
          },
          {
            param: 'Param4',
            type: 'static',
            value: '',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'commercials',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'GetCommercialsData_AgencyWise',
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
        param: 'CommercialCodes',
        type: 'state',
        stateKey: 'commercials',
        inputType: reportsEnum.inputType.multiSelect,
      },
      {
        param: 'LoginId',
        type: 'default',
      },
    ],
  },
};

export default commercialsReportAgenciwise;
