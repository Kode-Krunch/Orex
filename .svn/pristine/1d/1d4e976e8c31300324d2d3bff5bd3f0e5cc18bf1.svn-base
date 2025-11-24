import React, { useEffect, useRef } from 'react';
import ApexChart from 'react-apexcharts';

function LineChart({
  width,
  chartOptions,
  chartSeries,
  additionalChartContainerClasses,
}) {
  /* HOOKS */
  const chartRef = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.windowResizeHandler();
    }
  }, [chartRef.current]);

  return (
    <div
      className={`-mt-2 pb-1 overflow-y-hidden !overflow-x-auto h-full ${additionalChartContainerClasses}`}
    >
      <div style={{ width }} className="h-full">
        <ApexChart
          ref={chartRef}
          options={chartOptions}
          series={chartSeries}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}

export default LineChart;
