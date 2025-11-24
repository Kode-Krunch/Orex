import { reportsEnum } from '../enums/ReportsEnums';

const barcCricbuzzReport = {
  inputs: [
    {
      type: reportsEnum.inputType.date,
      label: 'Date',
      required: true,
      size: 'sm',
      stateKey: 'toDate',
    },
    {
      type: reportsEnum.inputType.select,
      label: 'Channel 1',
      required: true,
      options: [
        { value: 'PTC_Punjabi', label: 'PTC Punjabi' },
        { value: 'PTC_Chak_De', label: 'PTC Chak De' },
      ],
      stateKey: 'flag',
    },
    {
      type: reportsEnum.inputType.multiSelect,
      label: 'Channel 2',
      required: true,
      size: 'sm',
      options: [
        { value: 'Anmol_TV', label: 'Anmol TV' },
        { value: 'Sony_Pal', label: 'Sony Pal' },
        { value: 'Goldmines', label: 'Goldmines' },
        { value: 'SONY_SAB', label: 'SONY SAB' },
        { value: 'STAR_Utsav', label: 'STAR Utsav' },
      ],
      stateKey: 'entities',
    },
  ],
  report: {
    fetchType: reportsEnum.fetchType.sp,
    fetchUrl: 'USP_BARCCompareReport',
    params: [
      {
        param: 'Date',
        type: 'state',
        stateKey: 'toDate',
        inputType: reportsEnum.inputType.date,
      },
      {
        param: 'Channel',
        type: 'state',
        stateKey: 'flag',
        inputType: reportsEnum.inputType.select,
      },
      {
        param: 'MultiChannel',
        type: 'state',
        stateKey: 'entities',
        inputType: reportsEnum.inputType.multiSelect,
      },
    ],
  },
};

export default barcCricbuzzReport;
