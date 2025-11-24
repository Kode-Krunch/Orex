import React, { useMemo } from 'react';
import { FaChartBar } from 'react-icons/fa';
import ApexChart from 'react-apexcharts';

const SalesChart = ({ salesData = [], chartRef }) => {
    const chartOptions = useMemo(() => ({
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '30%',
                borderRadius: 4,
            },
        },
        colors: ['#4675bb'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: salesData.length > 0 ? salesData[0]?.monthNames || [] : [],
        },
        fill: {
            opacity: 0.9,
        },
        tooltip: {
            y: {
                formatter: (val) => `${val} Lakh`,
            },
        },
    }), [salesData]);

    return (
        <div className="col-span-3 web-card dark:!bg-[#1f2639] !bg-[#fff] px-2 py-2  h-[380px]">
            <h6 className="pb-3 mt-3 flex items-center border-b border-gray-600">
                <FaChartBar className="mr-2" size={23} />
                Sales In Month <span className="text-xs ml-2">[Lakh]</span>
            </h6>
            {salesData.length > 0 ? (
                <ApexChart
                    ref={chartRef}
                    options={chartOptions}
                    series={salesData}
                    height="85%"
                    width="100%"
                    type="bar"
                />
            ) : (
                <p className="text-center text-gray-500 mt-10">No sales data available</p>
            )}
        </div>
    );
};

export default SalesChart;
