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
      horizontal: true,
      columnWidth: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ['Peak', 'Non-Peak'],
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
      const fullNames = ['Peak', 'Non-Peak'];

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
    name: 'Ratings',
    data: [1234.56, 123.45],
  },
];

export { CHART_OPTIONS, CHART_SERIES };
