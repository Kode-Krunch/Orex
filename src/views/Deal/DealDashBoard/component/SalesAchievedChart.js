import React, { useEffect, useState } from 'react'
import { Tabs } from 'components/ui'
import { BsCalendarMonth, BsCalendar3 } from 'react-icons/bs'
import { FaChartBar } from 'react-icons/fa'
import ApexChart from 'react-apexcharts'
import { apiCallstoreprocedure } from 'services/CommonService';

const { TabNav, TabList, TabContent } = Tabs


const SalesAchievedChart = ({ salesAchievedData = [] }) => {
    const chartOptions = {
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                borderRadius: 4,
            },
        },
        colors: ['#4A90E2', '#34C759'],
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories:
                salesAchievedData.length > 0
                    ? salesAchievedData[0]?.categories || []
                    : [],
        },
        fill: { opacity: 0.9 },
        tooltip: {
            y: { formatter: (val) => `${val?.toFixed(2)} Lakh` },
        },
        legend: { position: 'top', horizontalAlign: 'center' },
    }

    return (
        <div className="h-[290px] px-2">
            {salesAchievedData.length > 0 ? (
                <ApexChart
                    options={chartOptions}
                    series={salesAchievedData}
                    height="100%"
                    width="100%"
                    type="bar"
                />
            ) : (
                <p className="text-center text-gray-500 mt-10">
                    No sales data available
                </p>
            )}
        </div>
    )
}


const SalesAchievedTabs = ({ Channel }) => {
    const [activeTab, setActiveTab] = useState('monthly')
    const [chartData, setChartData] = useState([])


    const fetchSalesData = async (mode) => {
        try {
            const flag = mode === 'monthly' ? 'M' : 'Y'
            const params = {
                ChannelId: Channel?.ChannelCode || null,
                LocationId: Channel?.LocationCode || null,
                par_Flag: flag,
            }

            const response = await apiCallstoreprocedure(
                'USP_SalesTarget_Achievement_Graph',
                params
            )

            if (response?.data?.length > 0) {
                const res = response.data
                let labels = []
                let target = []
                let achieved = []

                if (flag === 'M') {
                    labels = res.map((r) => r.MonthName)
                    target = res.map((r) => r.TargetInLakh)
                    achieved = res.map((r) => r.AchievedInLakh)
                } else {
                    labels = res.map((r) => r.FinancialYear)
                    target = res.map((r) => r.TargetInLakh)
                    achieved = res.map((r) => r.AchievedInLakh)
                }

                setChartData([
                    { name: 'Target', data: target, categories: labels },
                    { name: 'Achieved', data: achieved, categories: labels },
                ])
            } else {
                setChartData([])
            }
        } catch (err) {
            console.error('SP Fetch Error:', err)
            setChartData([])
        }
    }

    useEffect(() => {
        fetchSalesData(activeTab)
    }, [activeTab])

    return (
        <div className="col-span-3 web-card dark:!bg-[#1f2639] !bg-[#fff] px-3 py-3 h-[420px] rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <h6 className="pb-3 mt-3 flex items-center border-b border-gray-600 text-base font-semibold">
                <FaChartBar className="mr-2" size={22} />
                Sales Target & Achievements
                <span className="text-xs ml-2 text-gray-400">[Lakh]</span>
            </h6>

            {/* Tabs */}
            <Tabs value={activeTab} onChange={setActiveTab}>
                <TabList className="mt-2 mb-3 border-b border-gray-300 dark:border-gray-700">
                    <TabNav value="monthly" icon={<BsCalendarMonth size={16} />}>
                        Monthly
                    </TabNav>
                    <TabNav value="yearly" icon={<BsCalendar3 size={16} />}>
                        Yearly
                    </TabNav>
                </TabList>

                <TabContent value="monthly">
                    <SalesAchievedChart salesAchievedData={chartData} />
                </TabContent>

                <TabContent value="yearly">
                    <SalesAchievedChart salesAchievedData={chartData} />
                </TabContent>
            </Tabs>
        </div>
    )
}

export default SalesAchievedTabs
