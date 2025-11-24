import { reportsEnum } from '../enums/ReportsEnums';

const salesTargetReport = {
  inputs: [

    {
      type: reportsEnum.inputType.select,
      label: 'Financial Year',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_Sales',
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
            param: 'FieldTable',
            type: 'static',
            value: 'FINANCIALYEAR',
          },
        ],
        labelKey: 'DisplayLabel',
        valueKey: 'DisplayValue',
        additionalOptions: [{ label: 'All', value: 0 }],
      },
      stateKey: 'Financialyear',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Sales Executive',
      required: true,
      size: 'sm',
      options: {
        fetchType: reportsEnum.fetchType.sp,
        fetchUrl: 'USP_DropDown_Sales',
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
            param: 'FieldTable',
            type: 'static',
            value: 'EmployeeMaster',
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
      label: 'Period',
      required: true,
      size: 'sm',
      options: [
        { label: 'Yearly', value: 0 },
        { label: 'Monthly', value: 1 },
      ],
      stateKey: 'period',
    },


  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_SalesTargetReport',
    params: [
      {
        param: 'ChannelCode',
        type: 'default',
      },
      {
        param: 'LocationCode',
        type: 'default',
      },

      {
        param: 'FinancialYear',
        type: 'state',
        stateKey: 'Financialyear',

        inputType: reportsEnum.inputType.select,
      },

      {
        param: 'ClientCode',
        type: 'state',
        stateKey: 'client',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'Executive',
        type: 'state',
        stateKey: 'employee',
        inputType: reportsEnum.inputType.select,
      },

      {
        param: 'Monthly',
        type: 'state',
        stateKey: 'period',
        inputType: reportsEnum.inputType.select,
      }
    ],
  },
};

export default salesTargetReport;
