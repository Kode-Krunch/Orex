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
    colors: ['rgb(96, 165, 250)'],
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      gradientToColors: ['#3b82f694'],
      stops: [70, 100],
      opacityFrom: 1,
      opacityTo: 1,
    },
  },
  colors: ['#3b82f694'],
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
      return `
        <div style="padding: 10px; color: #fff; background: #374151b0; border-radius: 5px;">
          <strong>${hour[dataPointIndex]}</strong><br />
          <span>${programName[dataPointIndex]}</span><br />
          <strong className='text-[12px]'>Rating: ${series[seriesIndex][dataPointIndex]}</strong></span>
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
];

const TABLE_DATA = [
  { hour: '00:00', ratings: 1.23 },
  { hour: '01:00', ratings: 4.56 },
  { hour: '02:00', ratings: 0.89 },
  { hour: '03:00', ratings: 3.45 },
  { hour: '04:00', ratings: 2.67 },
  { hour: '05:00', ratings: 1.78 },
  { hour: '06:00', ratings: 4.12 },
  { hour: '07:00', ratings: 0.34 },
  { hour: '08:00', ratings: 3.56 },
  { hour: '09:00', ratings: 4.89 },
  { hour: '10:00', ratings: 2.45 },
  { hour: '11:00', ratings: 1.67 },
  { hour: '12:00', ratings: 3.89 },
  { hour: '13:00', ratings: 0.78 },
  { hour: '14:00', ratings: 4.23 },
  { hour: '15:00', ratings: 2.34 },
  { hour: '16:00', ratings: 0.56 },
  { hour: '17:00', ratings: 3.12 },
  { hour: '18:00', ratings: 1.45 },
  { hour: '19:00', ratings: 4.67 },
  { hour: '20:00', ratings: 2.89 },
  { hour: '21:00', ratings: 3.45 },
  { hour: '22:00', ratings: 1.23 },
  { hour: '23:00', ratings: 0.78 },
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
];

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

export { CHART_OPTIONS, CHART_SERIES, TABLE_DATA, COLUMNS, TOOLBAR_OPTIONS };
