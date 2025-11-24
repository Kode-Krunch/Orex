import React, { useEffect, useRef, useState } from 'react';
import { BILLING_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import ApexChart from 'react-apexcharts';
import { TW_COLORS } from 'views/Controls/Dashboard/constants/tw_colors';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import Loader from 'views/Controls/Loader';
import { Tabs } from 'components/ui';
import { FaFileCircleCheck } from 'react-icons/fa6';
import CalendarForBilling from 'components/ui/DatePicker/CalendarForBilling';
import BillingAgencyWise from './BillingAgencyWise';
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

function Billing() {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const monthlyRevenueStatusChartRef = useRef(null);
  const bookedVsBilledChartRef = useRef(null);
  const [revenueData, setRevenueData] = useState([]);
  const [bookingBillingData, setBookingBillingData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const Username = useSelector((state) => state.auth.session.Username);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const AgencyCode = useSelector((state) => state.auth.user.AgencyCode);
  // useEffect(() => {
  //   setShowLoader(true);
  //   const data = {
  //     par_LocationCode: Channel.LocationCode,
  //     par_ChannelCode: Channel.ChannelCode,
  //   };

  //   apiCallstoreprocedure('usp_Billing_GetMonthlyBookedRevenue', data)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setRevenueData(response.data);
  //         console.log(response.data);
  //       }
  //       setShowLoader(false);
  //     })
  //     .catch(() => {
  //       setRevenueData([]);
  //       setShowLoader(false);
  //     });
  // }, [Channel]);

  // useEffect(() => {
  //   setShowLoader(true);
  //   const data = {
  //     par_LocationCode: Channel.LocationCode,
  //     par_ChannelCode: Channel.ChannelCode,
  //   };

  //   apiCallstoreprocedure('GetMonthlyBookedvsBilledRevenue', data)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log('data', response.data);
  //         setBookingBillingData(response.data);
  //       }
  //       setShowLoader(false);
  //     })
  //     .catch(() => {
  //       setBookingBillingData([]);
  //       setShowLoader(false);
  //     });
  // }, [Channel]);

  useEffect(() => {
    if (!Channel?.LocationCode || !Channel?.ChannelCode) return;

    const fetchData = async () => {
      setShowLoader(true);

      try {
        let response;

        if (AgencyCode != 0) {

          const data = {
            par_LocationCode: Channel.LocationCode,
            par_ChannelCode: Channel.ChannelCode,
            par_AgencyCode: AgencyCode,
          };

          response = await apiCallstoreprocedure('usp_Billing_GetMonthlyBookedRevenue_Agencywise', data);
        } else {
          const data = {
            par_LocationCode: Channel.LocationCode,
            par_ChannelCode: Channel.ChannelCode,
          };

          response = await apiCallstoreprocedure('usp_Billing_GetMonthlyBookedRevenue', data);
        }

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

  useEffect(() => {
    if (!Channel?.LocationCode || !Channel?.ChannelCode) return;

    const fetchData = async () => {
      setShowLoader(true);

      try {
        let response;

        if (AgencyCode != 0) {

          const data = {
            par_LocationCode: Channel.LocationCode,
            par_ChannelCode: Channel.ChannelCode,
            par_AgencyCode: AgencyCode,
          };

          response = await apiCallstoreprocedure('GetMonthlyBookedvsBilledRevenue_Agencywise', data);
        } else {
          const data = {
            par_LocationCode: Channel.LocationCode,
            par_ChannelCode: Channel.ChannelCode,
          };

          response = await apiCallstoreprocedure('GetMonthlyBookedvsBilledRevenue', data);
        }

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
      {AgencyCode != 0 ? (
        // 👇 Show BillingAgencyWise if LoginId = 120
        <BillingAgencyWise />
      ) : (
        <>
          {Username !== "GroupMUser" && (
            <DashboardHeader
              Name="Billing Dashboard"
              Page="Billing"
              Links="Billing"
            />
          )}

          {Username !== "GroupMUser" && (
            <div
              className={`grid grid-cols-${BILLING_DASHBOARD_SHORTCUTS.length} gap-4`}
            >
              <DashboardShortcutCards shortcuts={BILLING_DASHBOARD_SHORTCUTS} />
            </div>
          )}

          {Username !== "GroupMUser" && (
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 web-card pb-1 pt-3.5 mb-0 dark:!bg-[#1f2639] !bg-[#fff] border-none">
                <h4 className="px-3.5">
                  Monthly Revenue <span style={{ fontSize: '11px' }}>[Lakhs]</span>
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
              <div
                className="col-span-1 px-5 dark:!bg-[#1f2639] !bg-[#fff] "
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <Tabs defaultValue="tab1">
                  <TabList>
                    <TabNav value="tab1" icon={<FaFileCircleCheck />}>
                      Asrun
                    </TabNav>
                  </TabList>

                  <div className="p-4">
                    <TabContent value="tab1">
                      <div className="mt-4">
                        <CalendarForBilling
                          multipleSelection
                          value={''}
                          name="ASRUN"
                        />
                      </div>
                    </TabContent>
                  </div>
                </Tabs>
              </div>
            </div>
          )}
        </>
      )}
    </>


  );
}

export default Billing;
