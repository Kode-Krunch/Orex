
import Chart from 'react-apexcharts'
//import { COLORS } from 'constants/chart.constant'

const Donuts = ({ data, CountData }) => {
    const labels = data.map(item => item.label);
    const series = data.map(item => item.value);
    const colors = data.map(item => item.color);

    console.log('Donuts-colors', CountData);
    // console.log('Donuts-colors', CountData[0].PR);
    console.log('Donuts-colors', labels)
    const staticColors = ['red', '#f50a7b', '#f198cc'];
    return (
        <Chart
            options={{
                colors: colors,
                // plotOptions: {
                //     pie: {
                //         colors: staticColors
                //     }
                // },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
                labels: labels
            }}
            series={series}
            height={300}
            type="donut"
        />
    )
}

export default Donuts

