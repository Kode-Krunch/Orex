import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { LuCalendarCheck2 } from 'react-icons/lu';
import ApexChart from 'react-apexcharts';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import LineBifurcationCard from 'views/Controls/Dashboard/LineBifurcationCard';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import { apiCallstoreprocedure } from 'services/CommonService';
import { Month, TW_COLORS } from 'views/Controls/Dashboard/constants/tw_colors';
import { NTC_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import { format } from 'date-fns';
import Loader from 'views/Controls/Loader';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const getWeekRange = (startDate) => {
  const start = new Date(startDate);
  const end = new Date(start);

  // Set end to the last day of the week (Saturday)
  end.setDate(start.getDate() + (6 - start.getDay()));

  // Format dates as "YYYY-MM-DD"
  const formatDate = (date) => date.toISOString().split('T')[0];

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
};
const mapMonthIdToName = (id, RevenueYear) =>
  Month.find((m) => m.id === id)?.name + '-' + RevenueYear || null;

const Ntc = () => {
  const sDate = new Date();
  sDate.setDate(sDate.getDate());
  const [currentDate, setCurrentDate] = useState(sDate);

  const currentWeekStart = new Date(
    sDate.setDate(sDate.getDate() - sDate.getDay()),
  );

  const [showLoader, setShowLoader] = useState(false);
  const [weekRange, setWeekRange] = useState(
    getWeekRange(currentWeekStart.toISOString().split('T')[0]),
  );

  const goToNextWeek = () => {
    const newStart = new Date(weekRange.start);
    newStart.setDate(newStart.getDate() + 7);
    setWeekRange(getWeekRange(newStart.toISOString().split('T')[0]));
  };

  const goToPreviousWeek = () => {
    const newStart = new Date(weekRange.start);
    newStart.setDate(newStart.getDate() - 7);
    setWeekRange(getWeekRange(newStart.toISOString().split('T')[0]));
  };

  const channel = useSelector((state) => state.locale.selectedChannel);
  const [bookingsChart, setBookingsChart] = useState({
    options: {},
    series: [],
  });
  const [inventoryLeftChart, setInventoryLeftChart] = useState({
    options: {},
    series: [],
  });
  const [todaysSummaryCard, setTodaysSummaryCard] = useState({
    title: '',
    total: {},
    data: [],
  });
  useEffect(() => {
    GetRevenueData();
  }, [currentDate, channel]);

  const GetRevenueData = async () => {
    const { data: todaySummaryData } = await apiCallstoreprocedure(
      'GetTodayRevenueSummary',
      {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        par_NTCFlag: 1,
        ScheduleDate: currentDate,
      },
    );

    const totalRevenueData = todaySummaryData.find(
      (item) => item.FieldType === 'Total Revenue',
    );
    const summaryData = todaySummaryData.filter(
      (item) => item.FieldType !== 'Total Revenue',
    );

    setTodaysSummaryCard({
      title: `Today's Summary`,
      total: {
        label: `Total Revenue`,
        value: totalRevenueData?.RevenueAmount || 'N/A',
      },
      data: summaryData,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setShowLoader(true);
      try {
        const { data: monthlyBookedData, status: todayBookStatus } =
          await apiCallstoreprocedure('GetMonthlyBookedRevenue', {
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            par_NTCFlag: 1,
          });

        if (todayBookStatus == 204) {
          setBookingsChart({
            options: {},
            series: [],
          });
          setInventoryLeftChart({
            options: {},
            series: [],
          });
          setShowLoader(false);
          return;
        }

        const monthNames = monthlyBookedData
          .map((item) => mapMonthIdToName(item.RevenueMonth, item.RevenueYear))
          .filter(Boolean);
        const revenueData = monthlyBookedData.map((item) => item.BookedRevenue);

        setBookingsChart({
          options: {
            tooltip: { y: { formatter: (val) => `${val} Lakhs` } },
            chart: {
              toolbar: { show: false },
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
              },
              zoom: { enabled: false },
            },
            xaxis: { categories: monthNames, axisTicks: { show: false } },
            stroke: { curve: 'smooth' },
            dataLabels: {
              enabled: false,
              style: { color: TW_COLORS.gray['400'], fontWeight: 400 },
              background: { borderColor: TW_COLORS.gray['400'] },
            },
            legend: { show: true, markers: { strokeWidth: 0 } },
          },
          series: [{ name: 'Bookings', data: revenueData }],
        });
        setShowLoader(false);
        const { data: inventoryData, status: todaySummaryStatus } =
          await apiCallstoreprocedure('GetBookvsAvailableInvStatus', {
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            par_NTCFlag: 1,
            par_FromTelecastDate: weekRange.start,
            par_ToTelecastDate: weekRange.end,
          });

        if (todaySummaryStatus == 204) {
          setInventoryLeftChart({
            options: {},
            series: [],
          });
          return;
        }

        const extractDays = (data) =>
          data.map((item) => format(new Date(item.ScheduleDate), 'dd-MMM'));

        setInventoryLeftChart({
          options: {
            chart: { stacked: true, toolbar: { show: false } },
            plotOptions: {
              bar: {
                columnWidth: '40%',
                horizontal: false,
                borderRadius: 4,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last',
              },
            },
            dataLabels: {
              enabled: false,
              style: { color: TW_COLORS.gray['300'], fontWeight: 400 },
            },
            xaxis: {
              categories: extractDays(inventoryData),
              axisTicks: { show: false },
            },
            legend: { markers: { strokeWidth: 0 } },
          },
          series: [
            {
              name: 'Booked',
              data: inventoryData.map((item) => item.ConsumedInventory),
              color: '#b69f15',
            },
            {
              name: 'Available',
              data: inventoryData.map((item) => item.BalanceInventory),
              color: '#4675bb',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowLoader(false);
      }
    };

    fetchData();
  }, [channel, weekRange]);

  const bookingsChartRef = useRef(null);
  const inventoryLeftChartRef = useRef(null);

  useEffect(() => {
    if (bookingsChartRef.current && inventoryLeftChartRef.current) {
      bookingsChartRef.current.chart.windowResizeHandler();
      inventoryLeftChartRef.current.chart.windowResizeHandler();
    }
  }, [bookingsChart, inventoryLeftChart, channel]);

  return (
    <>
      <Loader showLoader={showLoader} />
      <DashboardHeader Name={'NTC Dashboard'} Page={'NTC'} Links={'Ntc'} />

      <div className={`grid grid-cols-${NTC_DASHBOARD_SHORTCUTS.length} gap-4`}>
        <DashboardShortcutCards shortcuts={NTC_DASHBOARD_SHORTCUTS} />
      </div>
      <div className="grid grid-cols-9 gap-4">
        <div className="col-span-3 web-card pb-1 pt-3.5 mb-0 px-2 dark:!bg-[#1f2639] !bg-[#fff] ">
          <h4
            className="pb-3 flex items-center px-2 dark:!text-gray-400 !text-black"
            style={{ borderBottom: '1px solid #595959' }}
          >
            <LuCalendarCheck2 className="mr-2" size={23} /> Bookings
          </h4>
          <p className="mt-3 pl-4 dark:!text-gray-400 !text-black">
            {bookingsChart.series[0]?.data.length} months
          </p>
          <ApexChart
            ref={bookingsChartRef}
            options={bookingsChart.options}
            series={bookingsChart.series}
            type="line"
            width="100%"
          />
        </div>
        <div className="col-span-3 web-card p-3.5 h-full  mb-0 dark:!bg-[#1f2639] !bg-[#fff]">
          <LineBifurcationCard
            title={todaysSummaryCard.title}
            total={todaysSummaryCard.total}
            data={todaysSummaryCard.data}
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
          />
        </div>
        <div className="col-span-3 web-card pt-3.5 pb-1 mb-0 dark:!bg-[#1f2639] !bg-[#fff]">
          <h4 className="px-3.5">Inventory</h4>

          <div className="flex justify-between items-center col-span-3 mb-2 px-4">
            <div
              className="p-2 rounded bg-black dark:bg-sky-700  hover:bg-sky-700  cursor-pointer"
              onClick={goToPreviousWeek}
            >
              <FaChevronLeft />
            </div>

            <div
              className="p-2 rounded bg-black  dark:bg-sky-700  hover:bg-sky-700  cursor-pointer"
              onClick={goToNextWeek}
            >
              <FaChevronRight />
            </div>
          </div>
          <ApexChart
            ref={inventoryLeftChartRef}
            options={inventoryLeftChart.options}
            series={inventoryLeftChart.series}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </>
  );
};

export default Ntc;
