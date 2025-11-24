const CHART_OPTIONS = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 1.5,
    curve: 'smooth',
    colors: ['rgb(96, 165, 250)', 'rgb(251, 191, 36)'],
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      gradientToColors: ['#3b82f694', '#fcd34d91'],
      stops: [70, 100],
      opacityFrom: 1,
      opacityTo: 1,
    },
  },
  colors: ['#3b82f694', '#fcd34d91'],
  tooltip: {
    theme: 'dark',
    y: {
      formatter: undefined,
    },
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const hour = [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ];

      const programName = [
        'Aaj Tak News',
        'Aaj Tak News',
        'Bhagya Chakra',
        'Bhagya Chakra',
        'So Sorry',
        'Nonstop 100',
        '100 Shahar 100 Khabar',
        'Shatak Aajtak',
        'Shatak Aajtak',
        'Bahraich Hinsa Chalega Bulldozer',
        'Bahraich Hinsa Chalega Bulldozer',
        'Aajtak Halla Bol',
        'Aajtak Halla Bol',
        'Breaking News',
        'Muje Yaha Aana Hi Nahin Tha',
        'Muje Yaha Aana Hi Nahin Tha',
        'Muk-Badhiron Ke Liye Samachar',
        'Mera Gaon Mera Desh',
        'Mera Gaon Mera Desh',
        'Operation Consultant Bada Khulasa',
        'Operation Consultant Bada Khulasa',
        'Dangal',
        'Dangal',
        'Dangal',
      ];

      const actualAMA = [
        1234.56, 987.65, 543.21, 876.54, 345.67, 123.45, 678.9, 234.56, 890.12,
        456.78, 901.23, 345.67, 678.9, 1234.56, 890.12, 456.78, 321.09, 654.32,
        987.65, 432.1, 876.54, 345.67, 789.01, 234.56,
      ];

      return `
        <div style="padding: 10px; color: #fff; background: #374151b0; border-radius: 5px;">
          <strong>${hour[dataPointIndex]}</strong><br />
          <span>${programName[dataPointIndex]}</span><br />
          <strong className='text-[12px]'>Rating: ${series[seriesIndex][dataPointIndex]}</strong><br />
          <strong className='text-[12px]'>AMA (000's): ${actualAMA[dataPointIndex]}</strong>
        </div>
      `;
    },
  },
  xaxis: {
    categories: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ],
  },
};

const CHART_SERIES = [
  {
    name: 'Ratings',
    data: [
      1.23, 4.56, 0.89, 3.45, 2.67, 1.78, 4.12, 0.34, 3.56, 4.89, 2.45, 1.67,
      3.89, 0.78, 4.23, 2.34, 0.56, 3.12, 1.45, 4.67, 2.89, 3.45, 1.23, 0.78,
    ],
  },
  {
    name: "AMA (000's)",
    data: [
      5.0, 4.0, 2.2, 3.6, 1.4, 0.5, 2.7, 1.0, 3.6, 1.9, 3.6, 1.4, 2.7, 5.0, 3.6,
      1.9, 1.3, 2.7, 4.0, 1.7, 3.6, 1.4, 3.2, 1.0,
    ],
  },
];

const TABLE_DATA = [
  { hour: '00:00', ratings: 1.23, ama: 1234.56 },
  { hour: '01:00', ratings: 4.56, ama: 987.65 },
  { hour: '02:00', ratings: 0.89, ama: 543.21 },
  { hour: '03:00', ratings: 3.45, ama: 876.54 },
  { hour: '04:00', ratings: 2.67, ama: 345.67 },
  { hour: '05:00', ratings: 1.78, ama: 123.45 },
  { hour: '06:00', ratings: 4.12, ama: 678.9 },
  { hour: '07:00', ratings: 0.34, ama: 234.56 },
  { hour: '08:00', ratings: 3.56, ama: 890.12 },
  { hour: '09:00', ratings: 4.89, ama: 456.78 },
  { hour: '10:00', ratings: 2.45, ama: 901.23 },
  { hour: '11:00', ratings: 1.67, ama: 345.67 },
  { hour: '12:00', ratings: 3.89, ama: 678.9 },
  { hour: '13:00', ratings: 0.78, ama: 1234.56 },
  { hour: '14:00', ratings: 4.23, ama: 890.12 },
  { hour: '15:00', ratings: 2.34, ama: 456.78 },
  { hour: '16:00', ratings: 0.56, ama: 321.09 },
  { hour: '17:00', ratings: 3.12, ama: 654.32 },
  { hour: '18:00', ratings: 1.45, ama: 987.65 },
  { hour: '19:00', ratings: 4.67, ama: 432.1 },
  { hour: '20:00', ratings: 2.89, ama: 876.54 },
  { hour: '21:00', ratings: 3.45, ama: 345.67 },
  { hour: '22:00', ratings: 1.23, ama: 789.01 },
  { hour: '23:00', ratings: 0.78, ama: 234.56 },
];

const COLUMNS = [
  {
    header: 'Hour',
    accessorKey: 'hour',
  },
  {
    header: 'Ratings',
    accessorKey: 'ratings',
  },
  {
    header: "AMA (000's)",
    accessorKey: 'ama',
  },
];

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

export { CHART_OPTIONS, CHART_SERIES, TABLE_DATA, COLUMNS, TOOLBAR_OPTIONS };
