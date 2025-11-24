import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { LuCalendarCheck2 } from 'react-icons/lu';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ApexChart from 'react-apexcharts';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import LineBifurcationCard from 'views/Controls/Dashboard/LineBifurcationCard';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import { apiCallstoreprocedure } from 'services/CommonService';
import { SALES_ADMIN_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import { Month, TW_COLORS } from 'views/Controls/Dashboard/constants/tw_colors';
import { format } from 'date-fns';
import Loader from 'views/Controls/Loader';

const getWeekRange = (startDate) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + (6 - start.getDay()));
  return { start: format(start, 'yyyy-MM-dd'), end: format(end, 'yyyy-MM-dd') };
};

const mapMonthIdToName = (id, year) => Month.find((m) => m.id === id)?.name + '-' + year || null;

const Salesadmin = () => {
  const channel = useSelector((state) => state.locale.selectedChannel);
  const [showLoader, setShowLoader] = useState(false);
  const [weekRange, setWeekRange] = useState(getWeekRange(new Date()));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookingsChart, setBookingsChart] = useState({ options: {}, series: [] });
  const [inventoryLeftChart, setInventoryLeftChart] = useState({ options: {}, series: [] });
  const [todaysSummaryCard, setTodaysSummaryCard] = useState({ title: '', total: {}, data: [] });

  const goToNextWeek = () => setWeekRange(getWeekRange(new Date(weekRange.start).setDate(new Date(weekRange.start).getDate() + 7)));
  const goToPreviousWeek = () => setWeekRange(getWeekRange(new Date(weekRange.start).setDate(new Date(weekRange.start).getDate() - 7)));

  const GetRevenueData = useCallback(async () => {
    setShowLoader(true);
    try {
      const { data } = await apiCallstoreprocedure('GetTodayRevenueSummary', {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        par_NTCFlag: 0,
        ScheduleDate: currentDate,
      });

      const totalRevenue = data.find((item) => item.FieldType === 'Total Revenue');
      setTodaysSummaryCard({
        title: 'Revenue Summary',
        total: { label: 'Total Revenue', value: totalRevenue?.RevenueAmount || 'N/A' },
        data: data.filter((item) => item.FieldType !== 'Total Revenue'),
      });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setShowLoader(false);
    }
  }, [channel, currentDate]);

  useEffect(() => {
    GetRevenueData();
  }, [GetRevenueData]);

  useEffect(() => {
    const fetchData = async () => {
      setShowLoader(true);
      try {
        const { data: monthlyData } = await apiCallstoreprocedure('GetMonthlyBookedRevenue', {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          par_NTCFlag: 0,
        });

        if (monthlyData.length) {
          setBookingsChart({
            options: {
              tooltip: { y: { formatter: (val) => `${val} Lakhs` } },
              chart: { toolbar: { show: false } },
              xaxis: { categories: monthlyData.map((item) => mapMonthIdToName(item.RevenueMonth, item.RevenueYear)) },
              stroke: { curve: 'smooth' },
              dataLabels: { enabled: false },
              legend: { show: true },
            },
            series: [{ name: 'Bookings', data: monthlyData.map((item) => item.BookedRevenue) }],
          });
        }

        const { data: inventoryData } = await apiCallstoreprocedure('GetBookvsAvailableInvStatus', {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          par_NTCFlag: 0,
          par_FromTelecastDate: weekRange.start,
          par_ToTelecastDate: weekRange.end,
        });

        setInventoryLeftChart({
          options: {
            xaxis: { categories: inventoryData.map((item) => format(new Date(item.ScheduleDate), 'dd-MMM')) },
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
              style: {
                color: TW_COLORS.gray['300'],
                fontWeight: 400,
                fontSize: 8,
              },
            },
            legend: { markers: { strokeWidth: 0 } },
          },
          series: [
            { name: 'Booked', data: inventoryData.map((item) => item.ConsumedInventory), color: '#b69f15' },
            { name: 'Available', data: inventoryData.map((item) => item.BalanceInventory), color: '#4675bb' },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
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
  }, [bookingsChart, inventoryLeftChart]);

  return (
    <>
      <Loader showLoader={showLoader} />
      <div>
        <DashboardHeader
          Name="Sales Dashboard"
          Page="Sales"
          Links="SalesAdmin"
        />
        <div
          className={`grid grid-cols-${SALES_ADMIN_DASHBOARD_SHORTCUTS.length} gap-4`}
        >
          <DashboardShortcutCards
            shortcuts={SALES_ADMIN_DASHBOARD_SHORTCUTS}
          />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <div className="col-span-3 web-card pb-1 pt-3.5 mb-0 px-2 h-[420px] flex flex-col dark:!bg-[#1f2639] !bg-[#fff] ">
            <h4
              className="pb-3 flex items-center px-2"
              style={{ borderBottom: '1px solid #595959' }}
            >
              <LuCalendarCheck2 className="mr-2" size={23} /> Bookings{' '}
              <span style={{ fontSize: '11px' }} className="ml-2">
                {' '}
                [Lakhs]
              </span>
            </h4>
            <p className="mt-3 pl-4 dark:!text-gray-400 !text-black ">
              {bookingsChart.series[0]?.data.length} months
            </p>
            <div className="grow">
              <ApexChart
                ref={bookingsChartRef}
                options={bookingsChart.options}
                series={bookingsChart.series}
                type="line"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div className="col-span-3 web-card p-3.5  h-[420px] overflow-y-scroll flex flex-col dark:!bg-[#1f2639] !bg-[#fff] ">
            <div className="grow">
              <LineBifurcationCard
                title={todaysSummaryCard.title}
                total={todaysSummaryCard.total}
                data={todaysSummaryCard.data}
                setCurrentDate={setCurrentDate}
                currentDate={currentDate}
              />
            </div>
          </div>
          <div className="col-span-3 web-card pt-3.5 pb-1 mb-0 h-[420px] flex flex-col dark:!bg-[#1f2639] !bg-[#fff]">
            <div className="flex justify-between items-center col-span-3 ">
              <div
                className="p-2 rounded hover:bg-sky-700  cursor-pointer"
                onClick={goToPreviousWeek}
              >
                <FaChevronLeft />
              </div>
              <h4 className="px-2">
                Inventory <span style={{ fontSize: '11px' }}>[Minutes]</span>{' '}
              </h4>
              <div
                className="p-2 rounded hover:bg-sky-700  cursor-pointer"
                onClick={goToNextWeek}
              >
                <FaChevronRight />
              </div>
            </div>
            <div className="grow">
              <ApexChart
                ref={inventoryLeftChartRef}
                options={inventoryLeftChart.options}
                series={inventoryLeftChart.series}
                type="bar"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Salesadmin;
