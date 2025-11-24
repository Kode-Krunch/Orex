//import Chart from 'react-apexcharts'

import { Card } from 'components/ui'
import { Chart } from 'components/shared'

const Bar = ({ type, COLORS }) => {
    const data = [
        {
            name: 'Net Profit',
            data: [74, 55, 97, 26, 90, 80, 50, 100, 90, 50, 86, 90, 50, 86,],
        },

    ]
    const visitorChartData = {

        series: [

            {

                name: 'Session Duration',

                data: [74, 55, 97, 26, 90, 80, 50, 100, 90, 50, 86,]

            },

        ],

        categories: [

            '01 Jan',

            '02 Jan',

            '03 Jan',

            '04 Jan',

            '05 Jan',

            '06 Jan',

            '07 Jan',

            '08 Jan',

            '09 Jan',

            '10 Jan',

            '11 Jan',

            '12 Jan',

        ],

    }
    return (
        <>
            {type == 'bar' ? <Chart
                customOptions={{

                    colors: COLORS,
                    dataLabels: {
                        enabled: false, // Already hides data labels
                    },
                    stroke: {
                        width: 5,
                    },


                    // Hide background lines (gridlines)
                    grid: {
                        show: false, // Set to false to hide all gridlines
                    },

                    xaxis: {

                        // Hide x-axis label (optional)
                        labels: {
                            show: false,
                        },
                        axisBorder: {
                            show: false, // Set to false to hide the x-axis line and label
                        },
                        axisTicks: {
                            show: false, // Set to false to hide x-axis tick marks (optional)
                        },
                    },

                    tooltip: {
                        y: {
                            formatter: (val) => `$${val} thousands`,
                        },
                    },

                    yaxis: {
                        // Hide Y-axis labels (might be specific depending on the library)
                        labels: {
                            show: false,
                        },
                    },

                }}

                series={data}
                height={150}
                type={type}
            /> : type == 'area' ?
                <Chart
                    type={type}
                    series={visitorChartData.series}
                    xAxis={visitorChartData.categories}
                    customOptions={{
                        colors: COLORS,
                        stroke: {
                            width: 2,
                        },
                        yaxis: {
                            // Hide Y-axis labels (might be specific depending on the library)
                            labels: {
                                show: false,
                            },
                        },
                        xaxis: {
                            // Hide x-axis label (optional)
                            labels: {
                                show: false,
                            },
                        },
                        grid: {
                            show: false, // Set to false to hide all gridlines
                        }
                    }}
                    height={150}

                />
                : <Chart
                    type={'area'}
                    series={visitorChartData.series}
                    xAxis={visitorChartData.categories}
                    customOptions={{
                        colors: COLORS,
                        stroke: {
                            width: 2,
                            curve: 'stepline',

                        },
                        yaxis: {
                            // Hide Y-axis labels (might be specific depending on the library)
                            labels: {
                                show: false,
                            },
                        },
                        xaxis: {
                            // Hide x-axis label (optional)
                            labels: {
                                show: false,
                            },
                        },
                        grid: {
                            show: false, // Set to false to hide all gridlines
                        }
                    }}
                    height={150}

                />}

        </>
    )

}



export default Bar