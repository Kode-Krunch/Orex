import React, { useEffect, useMemo, useState } from 'react';
import HeaderCardDealMaster from './components/HeaderCardDealMaster';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'views/Controls/Loader';
import { headerCardDetails } from './components/Constant';
import { formatNumberToIndianSystem } from 'components/validators';
import MonthlyDealProjectionCard from './components/MonthlyDealProjectionCard';
import { addDays, format, subDays } from 'date-fns';
import { apiDashboardDoughnut, apiGetdealmaster } from 'services/DealServices';
import DonutGraph from './components/DonutGraph';
import { Avatar, Button, Input, Progress, Tabs, Tooltip } from 'components/ui';
import TabNav from 'components/ui/Tabs/TabNav';
import TabList from 'components/ui/Tabs/TabList';
import { useNavigate } from 'react-router-dom';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { MdContentCopy, MdOutlineRefresh } from 'react-icons/md';
import TabContent from 'components/ui/Tabs/TabContent';
import { setContent } from 'store/base/commonSlice';
import { getRandomColorClass } from 'views/Billing/BillGeneration/dtat';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import ThisMonthDealCard from './components/ThisMonthDealCard';
import DealDetailsDialog from 'views/Controls/DealDetailsDialog/DealDetailsDialog';
import AchievementDialog from './components/AchievementDialog';
import CardData from './CardData';
import { BsInfoLg } from 'react-icons/bs';

const ToolbarOptions = { groupBy: false, manageColumns: false };

const DealMaster = () => {
  const hashPart = window.location.href.split('#')[1];
  const dealMasterFlag = hashPart ? hashPart.split('/')[1] : '';
  const [isDealMaster] = useState(dealMasterFlag.toLowerCase() === 'dealmaster'); // Renamed flag to isDealMaster for clarity

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channel = useSelector((state) => state.locale.selectedChannel);

  const [showLoader, setShowLoader] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [dashboardDoughnut, setDashboardDoughnut] = useState([]);
  const [doughnutSum, setDoughnutSum] = useState(0);
  const [currentTab, setCurrentTab] = useState('tab1');
  const [isCustomCardVisible, setIsCustomCardVisible] = useState(true);
  const [customCardName, setCustomCardName] = useState('');
  const [monthlyProjection, setMonthlyProjection] = useState([]);
  const [yearlyTargetAchieved, setYearlyTargetAchieved] = useState([]);
  const [dueAndOverdue, setDueAndOverdue] = useState({});
  const [activeDeals, setActiveDeals] = useState(0);
  const [approvalPending, setApprovalPending] = useState(0);
  const [dealExpires, setDealExpires] = useState(0);
  const [salesExecutiveData, setSalesExecutiveData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 60)),
    new Date(new Date().setDate(new Date().getDate() + 30)),
  ]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [allDeals, setAllDeals] = useState([]);
  const [thisMonthDeals, setThisMonthDeals] = useState([]);
  const [recentDeals, setRecentDeals] = useState([]);
  const [expiredDeals, setExpiredDeals] = useState([]);
  const [rejectedDeals, setRejectedDeals] = useState([]);
  const [managedColumns, setManagedColumns] = useState({ // Consolidated managed columns into one state object
    all: [],
    recent: [],
    expired: [],
    rejected: [],
  });
  const [isDealDetailsOpen, setIsDealDetailsOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState({ DealNumber: '', DealCode: '' });
  const [monthlySalesGrowth, setMonthlySalesGrowth] = useState(0);
  const [isAchievementOpen, setIsAchievementOpen] = useState(false);
  const [selectedSalesExecId, setSelectedSalesExecId] = useState(null);
  const [hardRefresh, setHardRefresh] = useState(1);

  // Memoized columns for tables
  const tableColumns = useMemo(() => [
    {
      header: 'Deal Number',
      accessorKey: 'DealCode',
      cell: ({ row: { original } }) => (
        <div className="flex justify-between items-center gap-2">
          <div
            className="cursor-pointer bg-gray-500 dark:bg-[#5B92E633] text-black dark:text-gray-400 px-3 py-1 rounded-full font-bold"
            onClick={() => {
              dispatch(setContent(original));
              navigate(isDealMaster ? '/DealMasterAdd' : '/SponsoredDealAdd', { state: { mode: 'edit' } });
            }}
          >
            {original.DealCode}
          </div>
          <div className="flex justify-between items-center gap-2">
            <Tooltip title="Show Details">
              <Button
                shape="circle"
                icon={<BsInfoLg className="text-sm" />}
                size="xs"
                className="!h-5 !w-5"
                onClick={() => handleShowDetails(original)}
              />
            </Tooltip>
            <Tooltip title="Copy Deal">
              <Button
                shape="circle"
                icon={<MdContentCopy className="text-sm" />}
                size="xs"
                className="!h-6 !w-6"
                onClick={() => {
                  dispatch(setContent(original));
                  navigate(isDealMaster ? '/DealMasterAdd' : '/SponsoredDealAdd', { state: { mode: 'copy' } });
                }}
              />
            </Tooltip>
          </div>
        </div>
      ),
      options: { cell: { style: { paddingBlock: 0 } } },
    },
    {
      header: 'Client',
      accessorKey: 'ClientName',
      cell: ({ row: { original } }) => (
        <div className="flex items-center">
          <Avatar
            size={25}
            className={`dark:${original.color} ${original.color} dark:text-gray-200 text-gray-800`}
          >
            {original.ClientName.charAt(0)}
          </Avatar>
          <p className="ml-2 capitalize">{original.ClientName}</p>
        </div>
      ),
      options: { cell: { style: { paddingBlock: 0 } } },
    },
    {
      header: 'Start Date',
      accessorKey: 'DealPeriodFromDate',
      cell: ({ row: { original } }) => (
        <p className="capitalize">
          {format(new Date(original.DealPeriodFromDate), 'dd MMM yyyy')}
        </p>
      ),
      options: { cell: { style: { paddingBlock: 0 } } },
    },
    {
      header: 'End Date',
      accessorKey: 'DealPeriodToDate',
      cell: ({ row: { original } }) => (
        <p className="capitalize">
          {format(new Date(original.DealPeriodToDate), 'dd MMM yyyy')}
        </p>
      ),
      options: { cell: { style: { paddingBlock: 0 } } },
    },
    {
      header: 'Utilization',
      cell: ({ row: { original } }) => {
        const total = Number(original.TotalAmount);
        const balance = Number(original.BalanceAmount);
        const utilization = total === 0 ? 0 : ((balance / total) * 100).toFixed(2);
        return (
          <Progress
            color={utilization < 90 ? 'green-500' : 'red-500'}
            size="sm"
            className="rounded"
            percent={100 - utilization}
            customInfo
          />
        );
      },
      options: { cell: { style: { paddingBlock: 0 } } },
    },
    {
      header: 'Amount',
      accessorKey: 'TotalAmount',
      cell: ({ row: { original } }) => {
        const { TotalAmount, CurrencySymbol } = original;
        const formattedAmount = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(TotalAmount);
        return (
          <p className="cursor-pointer flex items-center font-semibold">
            {`${CurrencySymbol} ${formattedAmount}`}
          </p>
        );
      },
      options: { cell: { style: { paddingBlock: 0 } } },
    },
  ], [isDealMaster]); // Added dependency on isDealMaster

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setShowLoader(true);
      const params = { LocationCode: channel.LocationCode, ChannelCode: channel.ChannelCode };
      const apiCalls = [
        { key: 'salesPerformance', procedure: 'USP_DealDashboardSalesPerformance', params },
        { key: 'dueAmount', procedure: 'Get_DueAmountandOverDueAmount', params },
        { key: 'monthlyProjection', procedure: 'USP_DealDashboardMontlyProjection', params },
        { key: 'yearlyTarget', procedure: 'USP_DealDashboardYearlyTargetAcheived', params: {} },
        { key: 'activeDeals', procedure: 'USP_DealDashboardActiveDeals', params },
        { key: 'approvalPending', procedure: 'USP_DealDashboardApprovalPendingDeals', params },
        { key: 'dealExpires', procedure: 'USP_DealDashboardDealExpiresinMonth', params },
        { key: 'thisMonthDeal', procedure: 'usp_Deal_ThisMonthDeal', params },
        { key: 'monthlySalesGrowth', procedure: 'USP_MonthlySalesGrowth', params },
      ];

      try {
        const results = await Promise.allSettled(
          apiCalls.map(({ procedure, params }) => apiCallstoreprocedure(procedure, params))
        );
        results.forEach((result, index) => {
          const { key } = apiCalls[index];
          if (result.status === 'fulfilled') {
            const data = result.value.data || [];
            switch (key) {
              case 'salesPerformance':
                setSalesExecutiveData(data);
                break;
              case 'dueAmount':
                setDueAndOverdue(data[0] || {});
                break;
              case 'monthlyProjection':
                setMonthlyProjection(data);
                break;
              case 'yearlyTarget':
                setYearlyTargetAchieved(data);
                break;
              case 'activeDeals':
                setActiveDeals(data[0]?.ActiveDeals || 0);
                break;
              case 'approvalPending':
                setApprovalPending(data[0]?.ApprovalPendingDeals || 0);
                break;
              case 'dealExpires':
                setDealExpires(data[0]?.DealExpiresinMonth || 0);
                break;
              case 'thisMonthDeal':
                setThisMonthDeals(formatDeals(data));
                break;
              case 'monthlySalesGrowth':
                setMonthlySalesGrowth(data[0]?.MonthlySalesGrowth || 0);
                break;
              default:
                break;
            }
          }
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setShowLoader(false);
        setIsDashboardVisible(true);
      }
    };
    fetchDashboardData();
  }, [channel, isDealMaster]); // Added dependency

  // Fetch doughnut data
  useEffect(() => {
    const fetchDoughnut = async () => {
      try {
        const resp = await apiDashboardDoughnut(format(currentDate, 'yyyy-MM-dd'));
        const transformed = resp.data
          .filter((item) => item.ReportType === 'DealType')
          .map((item) => ({ name: item.FieldType, quantity: item.FieldAmount }));
        setDashboardDoughnut(transformed);
        setDoughnutSum(transformed.reduce((acc, { quantity }) => acc + quantity, 0));
      } catch (error) {
        setDashboardDoughnut([]);
        setDoughnutSum(0);
      }
    };
    fetchDoughnut();
  }, [currentDate]);

  // Fetch deals based on dateRange and hardRefresh
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      fetchAllDeals();
      fetchExpiredDeals();
    }
  }, [dateRange, hardRefresh, channel, isDealMaster]);

  useEffect(() => {
    fetchRecentDeals();
    fetchRejectedDeals();
  }, [hardRefresh, channel, isDealMaster]);

  // Helper to format deals with color and optional filter
  const formatDeals = (data) => {
    const colored = data.map((item) => ({ color: getRandomColorClass(), ...item }));
    return isDealMaster ? colored : colored.filter((item) => item.DealTypeName === 'SPONSORED');
  };

  // Generalized fetch function
  const fetchDeals = async (procedure, params, setter) => {
    setShowLoader(true);
    try {
      const resp = await apiCallstoreprocedure(procedure, params);
      if (resp.status === 200) {
        const data = resp.data.filter((item) => isDealMaster ? item.GSTN_id == 0 : item.GSTN_id == 1)
        setter(formatDeals(data));
      } else if (resp.status === 204) {
        setter([]);
      }
    } catch (error) {
      openNotification('warning', `${procedure} Not Found!`);
      console.error('Error:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const fetchAllDeals = async () => {
    const params = { LocationCode: channel.LocationCode, ChannelCode: channel.ChannelCode };
    setShowLoader(true);
    try {
      const resp = await apiGetdealmaster(params, dateRange);
      if (resp.status === 200) {
        const data = resp.data.filter((item) => isDealMaster ? item.GSTN_id == 0 : item.GSTN_id == 1)
        setAllDeals(formatDeals(data));
      } else if (resp.status === 204) {
        setAllDeals([]);
      }
    } catch (error) {
      openNotification('warning', 'Deals Not Found!');
      console.error('Error:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const fetchRecentDeals = () => fetchDeals('RecentlyAddDeal', { LocationCode: channel.LocationCode, ChannelCode: channel.ChannelCode }, setRecentDeals);
  const fetchExpiredDeals = () => fetchDeals('USP_DEAL_GetExpireDeal', {
    LocationCode: channel.LocationCode,
    ChannelCode: channel.ChannelCode,
    FromDate: format(dateRange[0], 'yyyy-MM-dd'),
    Todate: format(dateRange[1], 'yyyy-MM-dd'),
  }, setExpiredDeals);
  const fetchRejectedDeals = () => fetchDeals('USP_DealDisplay', {
    par_IsApproved: 0,
    par_IsExpiring: 0,
    par_IsRejected: 2,
    par_LocationCode: channel.LocationCode,
    par_ChannelCode: channel.ChannelCode,
  }, setRejectedDeals);

  const handlePreviousDate = () => setCurrentDate(subDays(currentDate, 1));
  const handleNextDate = () => setCurrentDate(addDays(currentDate, 1));

  const handleShowDetails = (deal) => {
    setSelectedDeal({ DealNumber: deal.DealNumber, DealCode: deal.DealCode });
    setIsDealDetailsOpen(true);
  };

  const openAchievementDialog = (id) => {
    setSelectedSalesExecId(id);
    setIsAchievementOpen(true);
  };

  return (
    <div className="p-4 mb-4 dark:bg-slate-800 bg-slate-100">
      {isDashboardVisible && (
        <>
          {isCustomCardVisible ? (
            <>
              {isDealMaster && (
                <div className="grid grid-cols-6 gap-2 mb-2">
                  <HeaderCardDealMaster
                    item={headerCardDetails[0]}
                    setIsCustomCardVisible={setIsCustomCardVisible}
                    setCustomCardName={setCustomCardName}
                    statusCount={activeDeals}
                  />
                  <HeaderCardDealMaster
                    item={headerCardDetails[1]}
                    setIsCustomCardVisible={setIsCustomCardVisible}
                    setCustomCardName={setCustomCardName}
                    statusCount={approvalPending}
                  />
                  <HeaderCardDealMaster
                    item={headerCardDetails[2]}
                    setIsCustomCardVisible={setIsCustomCardVisible}
                    setCustomCardName={setCustomCardName}
                    statusCount={dealExpires}
                  />
                  <HeaderCardDealMaster
                    item={headerCardDetails[3]}
                    setIsCustomCardVisible={setIsCustomCardVisible}
                    setCustomCardName={setCustomCardName}
                    statusCount={`₹ ${formatNumberToIndianSystem(yearlyTargetAchieved[0]?.TargetAmount || 0)}`}
                    percent={(yearlyTargetAchieved[0]?.TargetAchievedPercent || 0).toFixed()}
                    handleClickFn={() => navigate('/SalesTarget')}
                  />
                  <MonthlyDealProjectionCard monthlyProjection={monthlyProjection} />
                </div>
              )}
              <div className={`grid gap-2 ${isDealMaster ? 'grid-cols-5' : 'grid-cols-1'}`}>
                <div className={`${isDealMaster ? 'col-span-4' : 'col-span-1'} web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border`}>
                  <div className="card-bodyR">
                    <Tabs
                      value={currentTab}
                      onChange={(val) => {
                        setCurrentTab(val);
                        setGlobalFilter('');
                      }}
                      variant="pill"
                      className="h-[500px] flex flex-col"
                    >
                      <div className="flex justify-between items-center">
                        <TabList>
                          <TabNav value="tab1">Recent Deal</TabNav>
                          <TabNav value="tab2">All Deal</TabNav>
                          <TabNav value="tab3">Expired Deal</TabNav>
                          <TabNav value="tab4">Rejected Deals</TabNav>
                        </TabList>
                        <div className="flex">
                          {['tab2', 'tab3'].includes(currentTab) && (
                            <DatePickerRange
                              value={dateRange}
                              placeholder="Pick date & time"
                              size="sm"
                              className="mr-2"
                              onChange={setDateRange}
                            />
                          )}
                          <Input
                            style={{ width: '200px' }}
                            size="sm"
                            value={globalFilter}
                            className="ml-2"
                            placeholder="Search"
                            onChange={(e) => /^[0-9a-zA-Z\s/]*$/.test(e.target.value) && setGlobalFilter(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              dispatch(setContent([]));
                              navigate(isDealMaster ? '/DealMasterAdd' : '/SponsoredDealAdd', { state: { mode: 'add', flag: isDealMaster } });
                            }}
                            size="sm"
                            variant="solid"
                            className="ml-2"
                          >
                            {isDealMaster ? 'Add Deal' : 'Add Sponsor Deal'}
                          </Button>
                          <Button
                            onClick={() => setHardRefresh(Math.random())}
                            size="sm"
                            variant="solid"
                            className="ml-2"
                            icon={<MdOutlineRefresh />}
                          />
                        </div>
                      </div>

                      <TabContent value="tab1" className="">
                        <div className="mt-2">
                          <ReportsTable
                            tableData={recentDeals.filter((item) => item.GSTN_id == isDealMaster ? 0 : 1)}
                            originalColumns={tableColumns}
                            managedColumns={managedColumns.recent}
                            setManagedColumns={(cols) => setManagedColumns({ ...managedColumns, recent: cols })}
                            toolbarOptions={ToolbarOptions}
                            exportFileName="Recent Deals"
                            tableName="Recent Deals"
                            externalGlobalFilter={globalFilter}
                            columnsToFormatInINR={[]}
                          />
                        </div>
                      </TabContent>
                      <TabContent value="tab2" className="">
                        <div className="mt-2">
                          <ReportsTable
                            tableData={allDeals.filter((item) => item.GSTN_id == isDealMaster ? 0 : 1)}
                            originalColumns={tableColumns}
                            managedColumns={managedColumns.all}
                            setManagedColumns={(cols) => setManagedColumns({ ...managedColumns, all: cols })}
                            toolbarOptions={ToolbarOptions}
                            exportFileName="All Deals"
                            tableName="All Deals"
                            externalGlobalFilter={globalFilter}
                            columnsToFormatInINR={[]}
                          />
                        </div>
                      </TabContent>

                      <TabContent value="tab3" className="">
                        <div className="mt-2">
                          <ReportsTable
                            tableData={expiredDeals.filter((item) => item.GSTN_id == isDealMaster ? 0 : 1)}
                            originalColumns={tableColumns}
                            managedColumns={managedColumns.expired}
                            setManagedColumns={(cols) => setManagedColumns({ ...managedColumns, expired: cols })}
                            toolbarOptions={ToolbarOptions}
                            exportFileName="Expired Deals"
                            tableName="Expired Deals"
                            externalGlobalFilter={globalFilter}
                            columnsToFormatInINR={[]}
                          />
                        </div>
                      </TabContent>
                      <TabContent value="tab4" className="">
                        <div className="mt-2">
                          <ReportsTable
                            tableData={rejectedDeals.filter((item) => item.GSTN_id == isDealMaster ? 0 : 1)}
                            originalColumns={tableColumns}
                            managedColumns={managedColumns.rejected}
                            setManagedColumns={(cols) => setManagedColumns({ ...managedColumns, rejected: cols })}
                            toolbarOptions={ToolbarOptions}
                            exportFileName="Rejected Deals"
                            tableName="Rejected Deals"
                            externalGlobalFilter={globalFilter}
                            columnsToFormatInINR={[]}
                          />
                        </div>
                      </TabContent>
                    </Tabs>
                  </div>
                </div>
                {isDealMaster && (
                  <div className="web-card dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border h-[600px]">
                    <DonutGraph
                      handlePreviousMonth={handlePreviousDate}
                      handleNextMonth={handleNextDate}
                      currentDate={currentDate}
                      dashBoardDoughnut={dashboardDoughnut}
                      sum={doughnutSum}
                      title="Earn by Categories"
                    />
                  </div>
                )}
              </div>
              {isDealMaster && (
                <ThisMonthDealCard
                  thisMonthDealList={thisMonthDeals}
                  handleShowDetailsClick={handleShowDetails}
                  monthlySalesGrowthData={monthlySalesGrowth}
                  dueAmountandOverDueAmount={dueAndOverdue}
                  salesExecutiveData={salesExecutiveData}
                  openDialog={openAchievementDialog}
                />
              )}
              {isDealDetailsOpen && isDealMaster && (
                <DealDetailsDialog
                  isDialogOpen={isDealDetailsOpen}
                  setIsDialogOpen={setIsDealDetailsOpen}
                  dealNumber={selectedDeal.DealNumber}
                  dealCode={selectedDeal.DealCode}
                />
              )}
              {isAchievementOpen && isDealMaster && (
                <AchievementDialog
                  salesExecutiveData={salesExecutiveData}
                  isAchievementDialogOpen={isAchievementOpen}
                  getSalesExecutiveId={selectedSalesExecId}
                  setIsAchievementDialogOpen={setIsAchievementOpen}
                  setGetSalesExecutiveId={setSelectedSalesExecId}
                />
              )}
            </>
          ) : (
            <CardData
              data={[] /* Assuming dealMasterData is not used; if needed, fetch accordingly */}
              setIsCustomCardVisible={setIsCustomCardVisible}
              Name={customCardName}
            />
          )}
        </>
      )}
      <Loader showLoader={showLoader} />
    </div>
  );
};

export default DealMaster;