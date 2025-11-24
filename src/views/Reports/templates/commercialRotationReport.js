import { reportsEnum } from '../enums/ReportsEnums';

const commercialRotationReport = {
  inputs: [
    {
      type: reportsEnum.inputType.dateRange,
      label: 'Start - End Date',
      required: true,
      size: 'sm',
      stateKey: 'dateRange',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Commercial Type',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'usp_GetCommercialTypeList',
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
            stateKey: 'dateRange',
            index: 0,
            inputType: reportsEnum.inputType.dateRange,
          },
          {
            param: 'Todate',
            type: 'state',
            stateKey: 'dateRange',
            index: 1,
            inputType: reportsEnum.inputType.dateRange,
          },
          {
            param: 'IsNTC',
            type: 'static',
            value: 0,
          },
        ],
        labelKey: 'CommercialTypeName',
        valueKey: 'CommercialTypeCode',
        additionalOptions: [{ label: 'All', value: 0 }],
        defaultValue: 0,
      },
      stateKey: 'commercialType',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Commercials',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'usp_GetCommercials_CommercialType',
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
            stateKey: 'dateRange',
            index: 0,
            inputType: reportsEnum.inputType.dateRange,
          },
          {
            param: 'Todate',
            type: 'state',
            stateKey: 'dateRange',
            index: 1,
            inputType: reportsEnum.inputType.dateRange,
          },
          {
            param: 'CommercialType',
            type: 'state',
            stateKey: 'commercialType',
            inputType: reportsEnum.inputType.select,
          },
          {
            param: 'IsNTC',
            type: 'static',
            value: 0,
          },
        ],
        labelKey: 'CommercialCaption',
        valueKey: 'CommercialCode',
        additionalOptions: [{ label: 'All', value: 0 }],
        defaultValue: 0,
      },
      stateKey: 'commercialCode',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'usp_RPT_SpotRotation',
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
        stateKey: 'dateRange',
        index: 0,
        inputType: reportsEnum.inputType.dateRange,
      },
      {
        param: 'Todate',
        type: 'state',
        stateKey: 'dateRange',
        index: 1,
        inputType: reportsEnum.inputType.dateRange,
      },
      {
        param: 'CommercialType',
        type: 'state',
        stateKey: 'commercialType',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'CommercialCode',
        type: 'state',
        stateKey: 'commercialCode',
        inputType: reportsEnum.inputType.select,
      },
    ],
  },
};

export default commercialRotationReport;
