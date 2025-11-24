import { reportsEnum } from '../enums/ReportsEnums';

const promoRotationReport = {
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
      label: 'Promo Type',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'usp_Get_ScheduledPromoTypes',
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
        ],
        labelKey: 'PromoTypeName',
        valueKey: 'PromoTypeCode',
        additionalOptions: [{ label: 'All', value: 0 }],
        defaultValue: 0,
      },
      stateKey: 'promoType',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Promo Name',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'usp_Get_ScheduledPromos',
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
        ],
        labelKey: 'PromoCaption',
        valueKey: 'PromoCode',
        additionalOptions: [{ label: 'All', value: 0 }],
        defaultValue: 0,
      },
      stateKey: 'promoCode',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Mode',
      required: true,
      options: [
        { value: 0, label: 'Summary' },
        { value: 1, label: 'Detail' },
      ],
      stateKey: 'mode',
    },

    // Sample input of inputType.date
    // {
    //   type: reportsEnum.inputType.date,
    //   label: 'Date',
    //   required: true,
    //   size: 'sm',
    //   stateKey: 'date',
    // },

    // Sample input of inputType.multiSelect
    // {
    //   type: reportsEnum.inputType.multiSelect,
    //   label: 'Multi Select',
    //   required: true,
    //   size: 'sm',
    //   options: {
    //     fetchType: reportsEnum.fetchType.sp,
    //     fetchUrl: 'usp_Get_ScheduledPromos',
    //     params: [
    //       {
    //         param: 'LocationCode',
    //         type: 'default',
    //       },
    //       {
    //         param: 'ChannelCode',
    //         type: 'default',
    //       },
    //       {
    //         param: 'FromDate',
    //         type: 'state',
    //         stateKey: 'dateRange',
    //         index: 0,
    //         inputType: reportsEnum.inputType.dateRange,
    //       },
    //       {
    //         param: 'Todate',
    //         type: 'state',
    //         stateKey: 'dateRange',
    //         index: 1,
    //         inputType: reportsEnum.inputType.dateRange,
    //       },
    //     ],
    //     labelKey: 'PromoCaption',
    //     valueKey: 'PromoCode',
    //     additionalOptions: [{ label: 'All', value: 0 }],
    //     defaultValue: [0],
    //   },
    //   stateKey: 'multiSelect',
    // },

    // Sample input of inputType.checkbox
    // {
    //   type: reportsEnum.inputType.checkbox,
    //   label: 'Checkbox',
    //   size: 'sm',
    //   stateKey: 'checkbox',
    //   defaultValue: 1,
    // },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'usp_RPT_PromoRotation',
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
        param: 'PromoType',
        type: 'state',
        stateKey: 'promoType',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'PromoCode',
        type: 'state',
        stateKey: 'promoCode',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'Mode',
        type: 'state',
        stateKey: 'mode',
        inputType: reportsEnum.inputType.select,
      },

      // Sample param of inputType.date
      // {
      //   param: 'Date',
      //   type: 'state',
      //   stateKey: 'date',
      //   inputType: reportsEnum.inputType.date,
      // },

      // Sample param of inputType.multiSelect
      // {
      //   param: 'MultiSelect',
      //   type: 'state',
      //   stateKey: 'multiSelect',
      //   inputType: reportsEnum.inputType.multiSelect,
      // },

      // Sample param of inputType.checkbox
      // {
      //   param: 'Checkbox',
      //   type: 'state',
      //   stateKey: 'checkbox',
      //   inputType: reportsEnum.inputType.checkbox,
      // },
    ],
  },
};

export default promoRotationReport;
