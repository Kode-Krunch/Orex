import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, Segment } from 'components/ui';
import { Chart } from 'components/shared';
import { COLORS } from 'constants/chart.constant';
import { isEmpty } from 'lodash';
const ChartLegend = ({ label, value, badgeClass, showBadge = true }) => {
    return (
        <div className="flex gap-2">
            {showBadge && <Badge className="mt-2.5" innerClass={badgeClass} />}
            <div>
                <h5 className="font-bold">{value}</h5>
                <p>{label}</p>
            </div>
        </div>
    )
}
const StatsLine = ({ className }) => {
    const [chartData, setChartData] = useState({
        series: [],
        dates: [],
    });
    const [timeRange, setTimeRange] = useState(['month']);

    useEffect(() => {
        // Filter the sampleStats based on the selected time range
        const sampleStats = [
            { date: '01-02', value: 100 },
            { date: '02-02', value: 120 },
            { date: '03-02', value: 90 },
            { date: '04-02', value: 110 },
            { date: '05-02', value: 130 },
            { date: '06-02', value: 140 },
            { date: '07-02', value: 150 },
            { date: '08-02', value: 160 },
            { date: '09-02', value: 170 },
            { date: '10-02', value: 180 },
            { date: '11-02', value: 190 },
            { date: '12-02', value: 200 },
            { date: '13-02', value: 210 },
            { date: '14-02', value: 220 },
            { date: '15-02', value: 230 },
            { date: '16-02', value: 240 },
            { date: '17-02', value: 250 },
            { date: '18-02', value: 260 },
            { date: '19-02', value: 270 },
            { date: '20-02', value: 280 },
            { date: '21-02', value: 290 },
            { date: '22-02', value: 300 },
            { date: '23-02', value: 310 },
            { date: '24-02', value: 320 },
            { date: '25-02', value: 330 },
            { date: '26-02', value: 340 },
            { date: '27-02', value: 350 },
            { date: '28-02', value: 360 },
        ];
        const sampleStats2 = [
            { date: '01-02', value: 80 },
            { date: '02-02', value: 90 },
            { date: '03-02', value: 95 },
            { date: '04-02', value: 85 },
            { date: '05-02', value: 100 },
            { date: '06-02', value: 110 },
            { date: '07-02', value: 120 },
            { date: '08-02', value: 130 },
            { date: '09-02', value: 140 },
            { date: '10-02', value: 150 },
            { date: '11-02', value: 160 },
            { date: '12-02', value: 170 },
            { date: '13-02', value: 180 },
            { date: '14-02', value: 190 },
            { date: '15-02', value: 200 },
            { date: '16-02', value: 210 },
            { date: '17-02', value: 220 },
            { date: '18-02', value: 230 },
            { date: '19-02', value: 240 },
            { date: '20-02', value: 250 },
            { date: '21-02', value: 260 },
            { date: '22-02', value: 270 },
            { date: '23-02', value: 280 },
            { date: '24-02', value: 290 },
            { date: '25-02', value: 300 },
            { date: '26-02', value: 310 },
            { date: '27-02', value: 320 },
            { date: '28-02', value: 330 },
        ];
        console.log('timeRange', timeRange)

        const filteredStats = sampleStats.filter(stat => {
            const days = getDaysByTimeRange(timeRange);
            console.log('timeRange', timeRange, '-', days)
            const currentDate = new Date();
            const statDate = new Date(`2024-${stat.date}`);
            return (currentDate - statDate) / (1000 * 60 * 60 * 24) < days;
        });

        const filteredStats1 = sampleStats2.filter(stat => {
            const days = getDaysByTimeRange(timeRange);
            const currentDate = new Date();
            const statDate = new Date(`2024-${stat.date}`);
            return (currentDate - statDate) / (1000 * 60 * 60 * 24) < days;
        });

        // Extract dates and values from filteredStats for chartData
        const dates = filteredStats.map(stat => stat.date);
        const series = filteredStats.map(stat => stat.value);
        const series1 = filteredStats1.map(stat => stat.value);
        console.log('dates', dates)
        console.log('series', series)
        setChartData({
            series: [
                {
                    name: 'Spots',
                    data: series,
                },
                {

                    name: 'Promo',
                    data: series1,
                }
                ,
                {

                    name: 'Song',
                    data: series1,
                },

            ],
            dates: dates
        });


    }, [timeRange]);

    const getDaysByTimeRange = range => {
        switch (range[0]) {
            case 'week':
                return 7;
            case 'month':
                return 29; // Adjusted to cover all days of February
            case 'yesterday':
                return 1;
            default:
                return 7; // Default to last 7 days for 'week'
        }
    };
    const [repaint, setRepaint] = useState(false)
    useEffect(() => {
        setRepaint(true)
    }, [])
    const [type, settype] = useState('bar')
    return (
        <Card className={className}>
            <div className="flex items-center justify-between">
                <h4>Statistic</h4>
                <Segment value={timeRange} onChange={val => setTimeRange(val)} size="sm">
                    <Segment.Item value="week">Week</Segment.Item>
                    <Segment.Item value="month">Month</Segment.Item>
                    <Segment.Item value="yesterday">Yesterday</Segment.Item>
                </Segment>
            </div>
            {/* <Chart
                series={chartData.series}
                xAxis={chartData.dates}
                height="380px"
                customOptions={{ legend: { show: false } }}
            /> */}
            {repaint && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <ChartLegend
                                showBadge={false}
                                label="Total Event"
                                value={85}
                            />
                            {/* <Button onClick={() => settype('line')}>bar</Button> */}
                        </div>
                        <div className="flex gap-x-6">
                            <ChartLegend
                                badgeClass="bg-indigo-600"
                                label={'Promo'}
                                value={22}
                            />
                            <ChartLegend
                                badgeClass="bg-emerald-500"
                                label={'Song'}
                                value={40}
                            />
                            <ChartLegend
                                badgeClass="bg-emerald-500"
                                label={'Spots'}
                                value={23}
                            />
                        </div>
                    </div>
                    {type == 'line' ? <Chart
                        series={chartData.series}
                        xAxis={chartData.dates}
                        type={'line'}
                        height="380px"
                        customOptions={{

                            legend: { show: false },
                        }}
                    /> : <Chart
                        series={chartData.series}
                        xAxis={chartData.dates}
                        type={'bar'}
                        height="380px"
                        customOptions={{

                            legend: { show: false },
                        }}
                    />}

                </>
            )}
        </Card>
    );
};

export default StatsLine;
