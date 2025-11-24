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
      gradientToColors: ['#347ff0'],
      stops: [0, 100],
      opacityFrom: 1,
      opacityTo: 1,
    },
  },
  colors: ['#5583ca'],
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
          <strong className='text-[12px]'>Rating: ${series[seriesIndex][dataPointIndex]}</strong></span>
        </div>
      `;
    },
  },
};

const CHART_SERIES = [
  {
    name: 'Ratings',
    data: [
      4.3, 1.8, 2.7, 5.0, 3.1, 4.4, 1.2, 3.8, 4.1, 2.6, 3.3, 5.0, 1.9, 2.4,
    ],
  },
];

const TABLE_DATA = [
  { programName: 'NONSTOP 100', ratings: 5.0 },
  { programName: 'MERA GAON MERA DESH', ratings: 5.0 },
  { programName: 'SHATAK AAJTAK', ratings: 4.4 },
  { programName: 'AAJ TAK NEWS', ratings: 4.3 },
  { programName: 'BREAKING NEWS', ratings: 4.1 },
  { programName: 'AAJTAK HALLA BOL', ratings: 3.8 },
  { programName: 'MUK-BADHIRON KE LIYE SAMACHAR', ratings: 3.3 },
  { programName: '100 SHAHAR 100 KHABAR', ratings: 3.1 },
  { programName: 'SO SORRY', ratings: 2.7 },
  { programName: 'MUJE YAHA AANA HI NAHIN THA', ratings: 2.6 },
  { programName: 'DANGAL', ratings: 2.4 },
  { programName: 'OPERATION CONSULTANT BADA KHULASA', ratings: 1.9 },
  { programName: 'BHAGYA CHAKRA', ratings: 1.8 },
  { programName: 'BAHRAICH HINSA CHALEGA BULLDOZER', ratings: 1.2 },
];

const COLUMNS = [
  {
    header: 'Program Name',
    accessorKey: 'programName',
  },
  {
    header: 'Ratings',
    accessorKey: 'ratings',
  },
];

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

export { CHART_OPTIONS, CHART_SERIES, TABLE_DATA, COLUMNS, TOOLBAR_OPTIONS };
