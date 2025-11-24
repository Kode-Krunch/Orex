import React, { useState } from 'react';
import { Chart } from 'components/shared';
import { Card } from 'components/ui';

const BarF = ({ type, COLORS }) => {
    // Define state to hold chart data
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Session Duration',
                data: [0, 14, 5, 20, 14, 30],
            },
        ],
        // categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan'],
    });

    // Function to update chart data
    const updateChartData = (newSeriesData, newCategories) => {
        setChartData({
            series: newSeriesData,
            categories: newCategories,
        });
    };

    return (
        <div>
            {/* Render first chart */}

            <Chart
                type={type}
                series={chartData.series}
                // xAxis={chartData.categories}
                customOptions={{
                    colors: COLORS,
                    stroke: {
                        width: 2,

                    },
                    yaxis: {
                        labels: {
                            show: false,
                        },
                    },
                    xaxis: {
                        labels: {
                            show: false,
                        },
                    },
                    grid: {
                        show: false,
                    },
                }}
                height={80}
            />


            {/* Render second chart */}

        </div>
    );
};

export default BarF;
