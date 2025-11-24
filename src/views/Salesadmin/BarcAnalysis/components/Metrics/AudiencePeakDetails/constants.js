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
    colors: ['rgb(251, 191, 36)'],
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      gradientToColors: ['#fcd34d91'],
      stops: [70, 100],
      opacityFrom: 1,
      opacityTo: 1,
    },
  },
  colors: ['#fcd34d91'],
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
          <strong className='text-[10px]'>${hour[dataPointIndex]}</strong><br />
          <span className='text-[9px]'>${programName[dataPointIndex]}</span><br />
          <strong className='text-[12px]'>AMA (000's): ${series[seriesIndex][dataPointIndex]}</strong></span>
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
  yaxis: {
    show: false,
  },
};

const CHART_SERIES = [
  {
    name: "AMA (000's)",
    data: [
      1234.56, 987.65, 543.21, 876.54, 345.67, 123.45, 678.9, 234.56, 890.12,
      456.78, 901.23, 345.67, 678.9, 1234.56, 890.12, 456.78, 321.09, 654.32,
      987.65, 432.1, 876.54, 345.67, 789.01, 234.56,
    ],
  },
];

export { CHART_OPTIONS, CHART_SERIES };
