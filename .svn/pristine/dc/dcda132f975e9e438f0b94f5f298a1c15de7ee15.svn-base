const CHART_OPTIONS = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  labels: ['Program', 'Ad Break', 'Commercial', 'Promo'],
  legend: {
    position: 'bottom',
    markers: {
      strokeWidth: 0,
    },
  },
  dataLabels: {
    enabled: true,
    dropShadow: false,
    textAnchor: 'middle',
    style: {
      fontWeight: '200',
      fontSize: 13,
      color: 'rgb(229 231 235)',
    },
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#d1d5dbab'],
  },
  fill: {
    opacity: 0.85,
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: undefined,
    },
    custom: function ({ series, seriesIndex, w }) {
      return `
        <div style="padding: 10px; color: #fff; background: #374151b0; border-radius: 5px;">
          <strong>${w.globals.labels[seriesIndex]}</strong>
          <br />
          Hours: ${series[seriesIndex]}
          <br />
          Percentage: ${(
            (series[seriesIndex] / series.reduce((acc, val) => acc + val, 0)) *
            100
          ).toFixed(2)}%
        </div>
      `;
    },
  },
};

const CHART_SERIES = [15, 4, 3, 2];

const TABLE_DATA = [
  { evType: 'Program', hours: 15 },
  { evType: 'Ad Break', hours: 4 },
  { evType: 'Commercial', hours: 3 },
  { evType: 'Promo', hours: 2 },
];

const COLUMNS = [
  {
    header: 'EV Type',
    accessorKey: 'evType',
  },
  {
    header: 'Hours',
    accessorKey: 'hours',
  },
];

const TOOLBAR_OPTIONS = { groupBy: false, manageColumns: false };

export { CHART_OPTIONS, CHART_SERIES, TABLE_DATA, COLUMNS, TOOLBAR_OPTIONS };
