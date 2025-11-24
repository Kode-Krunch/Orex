import React, { useCallback, useEffect, useRef, useState } from 'react';

import ApexChart from 'react-apexcharts';
import { TW_COLORS } from 'views/Controls/Dashboard/constants/tw_colors';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import Loader from 'views/Controls/Loader';
import { Tabs, Tooltip } from 'components/ui';
import { getRandomColorClass } from './BillGeneration/dtat';

const { TabNav, TabList, TabContent } = Tabs;
/* CONSTANTS */
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CHART_OPTIONS = {
  chart: {
    stacked: true,
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      columnWidth: '40%',
      horizontal: false,
      borderRadius: 4,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  xaxis: {
    axisTicks: { show: false },
  },
  legend: {
    markers: { strokeWidth: 0 },
  },
};
const CHART_OPTIONSBooking = {
  chart: {
    toolbar: { show: false },
  },
  dataLabels: { enabled: false },
  plotOptions: {
    bar: {
      columnWidth: '40%',
      horizontal: false,
      borderRadius: 4,
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  xaxis: {
    axisTicks: { show: false },
  },
  legend: {
    markers: { strokeWidth: 0 },
  },
};
const formatRevenueData = (data) => {
  const categories = data.map((item) => {
    return `${item.RevenueMonth}-${item.RevenueYear}`;
  });

  const series = [
    {
      name: 'Booked',
      data: data.map((item) => item.BookedRevenue),
      color: TW_COLORS.emerald['500'],
    },
    {
      name: 'Dropped',
      data: data.map((item) => item.DroppedRevenue),
      color: TW_COLORS.blue['500'],
    },
    {
      name: 'Cancelled',
      data: data.map((item) => item.CancelledRevenue),
      color: TW_COLORS.rose['500'],
    },
  ];

  return { categories, series };
};

const formatBookingData = (data) => {
  console.log(data);

  const categories = data.map((item) => {
    const monthIndex = parseInt(item.RevenueMonth, 10) - 1;
    return `${MONTH_NAMES[monthIndex]}-${item.RevenueYear}`;
  });

  const series = [
    {
      name: 'Booked',
      data: data.map((item) => item.BookedRevenue),
      color: TW_COLORS.emerald['500'],
    },
    {
      name: 'Billed',
      data: data.map((item) => item.BilledRevenue),
      color: TW_COLORS.blue['500'],
    },
  ];

  return { categories, series };
};

/* BILLING COMPONENT */

function BillingAgencyWise() {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const monthlyRevenueStatusChartRef = useRef(null);
  const bookedVsBilledChartRef = useRef(null);
  const [revenueData, setRevenueData] = useState([]);
  const [bookingBillingData, setBookingBillingData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const Username = useSelector((state) => state.auth.session.Username);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const AgencyCode = useSelector((state) => state.auth.user.AgencyCode);
  const [topClientOnly, setTopClientOnly] = useState([]);

  useEffect(() => {
    if (!Channel?.LocationCode || !Channel?.ChannelCode) return;

    const fetchData = async () => {
      setShowLoader(true);

      try {
        let response;


        const data = {
          par_LocationCode: Channel.LocationCode,
          par_ChannelCode: Channel.ChannelCode,
          par_AgencyCode: AgencyCode,
        };

        response = await apiCallstoreprocedure('usp_Billing_GetMonthlyBookedRevenue_Agencywise', data);

        if (response?.status === 200) {
          setRevenueData(response.data);
          console.log('revenue data', response.data);
        } else {
          setRevenueData([]);
        }
      } catch (err) {
        setRevenueData([]);
      } finally {
        setShowLoader(false);
      }
    };

    fetchData();
  }, [Channel, LoginId]);
  const fetchData = useCallback(async () => {
    if (!Channel) return;

    const params = {
      par_LocationCode: Channel.LocationCode,
      par_ChannelCode: Channel.ChannelCode,
      par_AgencyCode: AgencyCode
    };

    try {
      const [topClientRes] = await Promise.allSettled([
        apiCallstoreprocedure('USP_DEAL_GetTopClient', params),
      ]);

      if (topClientRes.status === 'fulfilled' && topClientRes.value?.data) {
        const setTagColorForTopClient = topClientRes.value.data.map((item) => ({
          color: getRandomColorClass(),
          ...item,
        }));
        setTopClientOnly(setTagColorForTopClient);
      } else {
        console.error('Failed to fetch Top Client:', topClientRes.reason);
      }
    } catch (error) {
      console.error('Unexpected error in fetchData:', error);
    }
  }, [Channel]);

  // ✅ trigger on Channel change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!Channel?.LocationCode || !Channel?.ChannelCode) return;

    const fetchData = async () => {
      setShowLoader(true);

      try {
        let response;
        const data = {
          par_LocationCode: Channel.LocationCode,
          par_ChannelCode: Channel.ChannelCode,
          par_AgencyCode: AgencyCode,
        };

        response = await apiCallstoreprocedure('GetMonthlyBookedvsBilledRevenue_Agencywise', data);


        if (response?.status === 200) {
          console.log('data', response.data);
          setBookingBillingData(response.data);
        } else {
          setBookingBillingData([]);
        }
      } catch (err) {
        setBookingBillingData([]);
      } finally {
        setShowLoader(false);
      }
    };

    fetchData();
  }, [Channel, LoginId]);
  useEffect(() => {
    if (monthlyRevenueStatusChartRef.current) {
      monthlyRevenueStatusChartRef.current.chart.windowResizeHandler();
    }
    if (bookedVsBilledChartRef.current) {
      bookedVsBilledChartRef.current.chart.windowResizeHandler();
    }
  }, [revenueData, bookingBillingData]);

  const { categories, series: revenueSeries } = formatRevenueData(revenueData);
  const { categories: bookingCategories, series: bookingSeries } =
    formatBookingData(bookingBillingData);

  const MONTHLY_REVENUE_STATUS_CHART = {
    options: {
      ...CHART_OPTIONS,
      xaxis: { ...CHART_OPTIONS.xaxis, categories },
    },
    series: revenueSeries,
  };

  const BOOKED_VS_BILLED_CHART = {
    options: {
      ...CHART_OPTIONSBooking,
      xaxis: { ...CHART_OPTIONSBooking.xaxis, categories: bookingCategories },
    },
    series: bookingSeries,
  };

  return (
    <>


      <DashboardHeader
        //Name="Billing Dashboard"
        Page="Billing"
        Links="Billing"
      />


      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 web-card pb-1 pt-3.5 mb-0 dark:!bg-[#1f2639] !bg-[#fff] border-none">
          <h4 className="px-3.5">
            Monthly Bookings <span style={{ fontSize: '11px' }}>[Lakhs]</span>
          </h4>

          <ApexChart
            ref={monthlyRevenueStatusChartRef}
            options={MONTHLY_REVENUE_STATUS_CHART.options}
            series={MONTHLY_REVENUE_STATUS_CHART.series}
            type="bar"
            width="100%"
            height={300}
          />
        </div>
        <div className="col-span-1 web-card pb-1 pt-3.5 mb-0 dark:!bg-[#1f2639] !bg-[#fff] border-none">
          <h4 className="px-3.5">
            Booked vs Billed <span style={{ fontSize: '11px' }}>[Lakhs]</span>
          </h4>
          <Loader showLoader={showLoader} />
          <ApexChart
            ref={bookedVsBilledChartRef}
            options={BOOKED_VS_BILLED_CHART.options}
            series={BOOKED_VS_BILLED_CHART.series}
            type="bar"
            width="100%"
            height={300}
          />
        </div>

        <div className="col-span-1 web-card pb-1 pt-3.5 mb-0 dark:!bg-[#1f2639] !bg-[#fff] border-none">
          <h4 className="px-3.5">
            Top Clients <span style={{ fontSize: '11px' }}>[Lakhs]</span>
          </h4>

          {/* Scrollable container */}
          <div className="px-4 py-2 max-h-[260px] overflow-y-auto custom-scroll">
            {topClientOnly && topClientOnly.length > 0 ? (
              <ul className="space-y-2">
                {topClientOnly
                  .sort((a, b) => Number(b.TotalAmount || 0) - Number(a.TotalAmount || 0))
                  .map((client, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between rounded-lg px-3 py-2 shadow-sm bg-gray-100 dark:bg-[#2a324d]"
                    >
                      <div className="flex items-center gap-2">
                        {/* Circle Avatar */}
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-sm ${client.color}`}
                        >
                          {client.ClientName?.charAt(0)}
                        </span>

                        {/* Client Name with Tooltip */}
                        <span
                          className="text-sm font-medium truncate max-w-[250px] cursor-pointer"
                          title={client.ClientName} // tooltip on hover
                        >
                          {client.ClientName}
                        </span>
                      </div>

                      {/* Amount */}
                      <span className="text-sm font-semibold">
                        ₹
                        {Number(client.TotalAmount || 0).toLocaleString('en-IN', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 px-3">No clients found</p>
            )}
          </div>
        </div>






      </div>

    </>


  );
}

export default BillingAgencyWise;
