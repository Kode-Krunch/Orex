import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import { ACCOUNTS_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import { TW_COLORS } from 'views/Controls/Dashboard/constants/tw_colors';
import ApexChart from 'react-apexcharts';
import { Avatar, Tabs, Tooltip } from 'components/ui';
import { BsBuildingsFill } from 'react-icons/bs';
import { getRandomColor } from 'views/Controls/GLOBALFUNACTION';
import { getRandomColorClass } from 'views/Billing/BillGeneration/dtat';
const { TabNav, TabList, TabContent } = Tabs;
/* CONSTANTS */

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
  toolbar: { show: false },
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
  const categories = data.map((item) => {
    return `${item.RevenueMonth}-${item.RevenueYear}`;
  });

  const series = [
    {
      name: 'Billed',
      data: data.map((item) => item.BilledAmount.toFixed(1)),
      color: TW_COLORS.emerald['500'],
    },
    {
      name: 'Collection',
      data: data.map((item) => item.CollectionAmount.toFixed(1)),
      color: TW_COLORS.blue['500'],
    },
  ];

  return { categories, series };
};

const Accounts = () => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const monthlyRevenueStatusChartRef = useRef(null);
  const bookedVsBilledChartRef = useRef(null);
  const [revenueData, setRevenueData] = useState([]);
  const [bookingBillingData, setBookingBillingData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [TopAC, setTopAC] = useState([]);
  useEffect(() => {
    (async (values) => {
      const params = {};
      const resp = await apiCallstoreprocedure(
        'GetAgencyOutstandingAmount',
        params,
      );

      setTopAC(resp.data);
    })();
    setShowLoader(true);
    const data = {
      par_LocationCode: Channel.LocationCode,
      par_ChannelCode: Channel.ChannelCode,
    };

    apiCallstoreprocedure('usp_Billing_GetMonthlyBookedRevenue', data)
      .then((response) => {
        if (response.status == 204) {
          setRevenueData([]);
          return;
        }
        if (response.status === 200) {
          setRevenueData(response.data);
        }
        setShowLoader(false);
      })
      .catch(() => {
        setRevenueData([]);
        setShowLoader(false);
      });
  }, [Channel]);

  useEffect(() => {
    setShowLoader(true);
    const data = {
      par_LocationCode: Channel.LocationCode,
      par_ChannelCode: Channel.ChannelCode,
    };
    apiCallstoreprocedure('GetMonthlyBilledvsCollection', data)
      .then((response) => {
        if (response.status == 204) {
          setBookingBillingData([]);
          return;
        }
        if (response.status == 200) {
          setBookingBillingData(response.data);
        }
        setShowLoader(false);
      })
      .catch(() => {
        setBookingBillingData([]);
        setShowLoader(false);
      });
  }, [Channel]);

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
    <div>
      <DashboardHeader
        Name={'Accounts Dashboard'}
        Page={'Accounts'}
        Links={'Accounts'}
      />
      <div
        className={`grid grid-cols-${ACCOUNTS_DASHBOARD_SHORTCUTS.length} gap-4`}
      >
        <DashboardShortcutCards shortcuts={ACCOUNTS_DASHBOARD_SHORTCUTS} />
      </div>{' '}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 web-card pb-1 pt-3.5 dark:!bg-[#1f2639] !bg-[#fff] border-none">
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
        <div className="col-span-1 web-card pb-1 pt-3.5 dark:!bg-[#1f2639] !bg-[#fff] border-none ">
          <h4 className="px-3.5">
            Collection <span style={{ fontSize: '11px' }}>[Lakhs]</span>
          </h4>
          <ApexChart
            ref={bookedVsBilledChartRef}
            options={BOOKED_VS_BILLED_CHART.options}
            series={BOOKED_VS_BILLED_CHART.series}
            type="bar"
            width="100%"
            height={300}
          />
        </div>
        <div className="col-span-1 ">
          <Tabs
            defaultValue="tab1"
            // variant="pill"
            className="web-card px-5 py-3 dark:!bg-[#1f2639] !bg-[#fff] border-none"
          >
            <TabList>
              <TabNav value="tab1" icon={<BsBuildingsFill />}>
                Most OutStanding
              </TabNav>
            </TabList>
            <TabContent value="tab1">
              <div className="mt-3">
                <div
                  className="flex justify-between items-center px-2 py-2 dark:!bg-[#191f31] bg-white"
                  style={{
                    borderBottom: '1px solid #9d9d9d7a',
                  }}
                >
                  <p className="font-semibold dark:!text-white text-black">
                    Agency
                  </p>
                  <p className="font-semibold dark:!text-white text-black">
                    Amount
                  </p>
                </div>
                <div
                  style={{ height: 250 }}
                  className="overflow-hidden hover:overflow-y-scroll  hover:overflow-x-scroll hover:pr-2"
                >
                  {TopAC &&
                    TopAC.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center px-1 py-2"
                        style={{
                          borderBottom: '1px solid #9d9d9d7a',
                          borderStyle: 'dashed',
                        }}
                      >
                        <Tooltip title={item.Agency} placement="top-start">
                          <div className="flex items-center">
                            <Avatar
                              size="sm"
                              className={`mr-2 dark:${getRandomColorClass()} ${getRandomColorClass()} dark:!text-white text-black`}
                            >
                              {item.Agency.slice(0, 1)}
                            </Avatar>
                            <p
                              className="font-semibold text-xs dark:!text-white text-black"
                              style={{
                                width: 160,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {item.Agency}
                            </p>
                          </div>
                        </Tooltip>
                        <p className="font-semibold text-md dark:!text-white text-black">
                          ₹
                          {item.AgencyOutstandingAmount?.toLocaleString(
                            'en-IN',
                          )}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
