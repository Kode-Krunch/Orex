const CHART_OPTIONS = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: 25,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      'AT News',
      'BHAGYA',
      'SO SORRY',
      'NONSTOP',
      '100 SHAHAR',
      'SHATAK',
      'BHCB',
      'HALLA BOL',
      'BREAKING',
      'MYAHNT',
      'M-BKLS',
      'MGMD',
      'OP CONSULT',
      'DANGAL',
    ],
    tickPlacement: 'on',
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '12px',
        colors: 'rgb(229, 231, 235)',
      },
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['rgb(209, 213, 219)'],
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      gradientToColors: ['rgb(245, 158, 11)'],
      stops: [0, 100],
      opacityFrom: 1,
      opacityTo: 1,
    },
  },
  colors: ['rgb(192, 168, 141)'],
  tooltip: {
    theme: 'dark',
    y: {
      formatter: undefined,
    },
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const fullNames = [
        'AAJ TAK NEWS',
        'BHAGYA CHAKRA',
        'SO SORRY',
        'NONSTOP 100',
        '100 SHAHAR 100 KHABAR',
        'SHATAK AAJTAK',
        'BAHRAICH HINSA CHALEGA BULLDOZER',
        'AAJTAK HALLA BOL',
        'BREAKING NEWS',
        'MUJE YAHA AANA HI NAHIN THA',
        'MUK-BADHIRON KE LIYE SAMACHAR',
        'MERA GAON MERA DESH',
        'OPERATION CONSULTANT BADA KHULASA',
        'DANGAL',
      ];

      return `
        <div style="padding: 10px; color: #fff; background: #374151b0; border-radius: 5px;">
          <span className='text-[10px]'>${fullNames[dataPointIndex]}</span><br />
          <strong className='text-[12px]'>AMA (000's): ${series[seriesIndex][dataPointIndex]}</strong></span>
        </div>
      `;
    },
  },
};

const CHART_SERIES = [
  {
    name: `AMA (000's)`,
    data: [
      946.58, 905.9, 1399.7, 444.89, 383.63, 1318.4, 461.06, 815.15, 265.86,
      386.06, 1033.13, 792.13, 482.27, 1310.29,
    ],
  },
];

const TABLE_DATA = [
  { programName: 'SHATAK AAJTAK', ama: 1399.7 },
  { programName: 'AAJTAK HALLA BOL', ama: 1318.4 },
  { programName: 'BAHRAICH HINSA CHALEGA BULLDOZER', ama: 1310.29 },
  { programName: 'NONSTOP 100', ama: 946.58 },
  { programName: 'MERA GAON MERA DESH', ama: 905.9 },
  { programName: 'OPERATION CONSULTANT BADA KHULASA', ama: 792.13 },
  { programName: '100 SHAHAR 100 KHABAR', ama: 815.15 },
  { programName: 'DANGAL', ama: 1033.13 },
  { programName: 'BHAGYA CHAKRA', ama: 482.27 },
  { programName: 'MUK-BADHIRON KE LIYE SAMACHAR', ama: 461.06 },
  { programName: 'AAJ TAK NEWS', ama: 444.89 },
  { programName: 'BREAKING NEWS', ama: 383.63 },
  { programName: 'MUJE YAHA AANA HI NAHIN THA', ama: 386.06 },
  { programName: 'SO SORRY', ama: 265.86 },
];

const COLUMNS = [
  {
    header: 'Program Name',
    accessorKey: 'programName',
  },
  {
    header: `AMA (000's)`,
    accessorKey: 'ama',
  },
];

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

export { CHART_OPTIONS, CHART_SERIES, TABLE_DATA, COLUMNS, TOOLBAR_OPTIONS };
