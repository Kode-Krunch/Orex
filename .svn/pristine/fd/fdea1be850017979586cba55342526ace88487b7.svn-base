import React, { useEffect, useRef, useState, useCallback } from 'react';
import { apiCallstoreprocedure } from 'services/CommonService';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import { DEAL_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import { useSelector } from 'react-redux';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import DealDetailsDialog from 'views/Controls/DealDetailsDialog/DealDetailsDialog';
import { getRandomColorClass } from 'views/Billing/BillGeneration/dtat';
import ExpiringDeals from './component/ExpiringDeals';
import TopAgencyClientTabs from './component/TopAgencyClientTabs';
import SalesChart from './component/SalesChart';
import SalesAchievedChart from './component/SalesAchievedChart';
import TopExecutiveTabs from './component/TopSalesExecutive/TopExecutive';
/* CONSTANTS */
const MONTHS = [
  { id: '01', name: 'Jan' }, { id: '02', name: 'Feb' }, { id: '03', name: 'Mar' },
  { id: '04', name: 'Apr' }, { id: '05', name: 'May' }, { id: '06', name: 'Jun' },
  { id: '07', name: 'Jul' }, { id: '08', name: 'Aug' }, { id: '09', name: 'Sep' },
  { id: '10', name: 'Oct' }, { id: '11', name: 'Nov' }, { id: '12', name: 'Dec' }
];



const Deal = () => {
  /* REDUX */
  const chartRef = useRef(null);
  const Channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [topClients, setTopClients] = useState([]);
  const [topAgencies, setTopAgencies] = useState([]);
  const [salesData, setSalesData] = useState([{ monthNames: [] }]);
  const [salesAchievedData, setSalesAchievedData] = useState([{ monthNames: [] }]);
  const [expiringDeals, setExpiringDeals] = useState([]);
  const [isDealDetailsDialogOpen, setIsDealDetailsDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState({ DealNumber: '', DealCode: '' });
  const [topSalesExcecutive, setTopSalesExcecutive] = useState([]);

  /* HELPER FUNCTIONS */
  const fetchData = useCallback(async () => {
    if (!Channel) return;
    const params = {
      par_LocationCode: Channel.LocationCode,
      par_ChannelCode: Channel.ChannelCode
    };
    try {
      const [clientsRes, agenciesRes, salesRes, salesAchievedRes, dealsRes, topExec] = await Promise.allSettled([
        apiCallstoreprocedure('USP_DEAL_GetTopAgencyClient', { ...params, par_Flag: 'CLIENT' }),
        apiCallstoreprocedure('USP_DEAL_GetTopAgencyClient', { ...params, par_Flag: 'AGENCY' }),
        apiCallstoreprocedure('usp_Deal_GetMonthlySales', params),
        apiCallstoreprocedure('USP_SalesTarget_Achievement_Graph', { ...params, par_Flag: 'M' }),

        apiCallstoreprocedure('USP_DEAL_GetExpiringDeal', params),
        apiCallstoreprocedure('USP_SalesTarget_Achievement_ExecutiveWise', { ...params, par_Flag: 'M' })

      ]);
      if (clientsRes.status === 'fulfilled' && clientsRes.value?.data) {
        const setTagColorForClient = clientsRes.value.data.map((item) => ({ color: getRandomColorClass(), ...item }));
        setTopClients(setTagColorForClient);
      } else {
        console.error('Failed to fetch Top Clients:', clientsRes.reason);
      }
      if (agenciesRes.status === 'fulfilled' && agenciesRes.value?.data) {
        const setTagColorForAgencies = agenciesRes.value.data.map((item) => ({ color: getRandomColorClass(), ...item }));
        setTopAgencies(setTagColorForAgencies);

      } else {
        console.error('Failed to fetch Top Agencies:', agenciesRes.reason);
      }
      if (topExec.status === 'fulfilled' && topExec.value?.data) {
        const setTagColorForSalesExecutive = topExec.value.data.map((item) => ({ color: getRandomColorClass(), ...item }));
        setTopSalesExcecutive(setTagColorForSalesExecutive);
      } else {
        console.error('Failed to fetch Top Sales Executive:', topExec.reason);
      }

      if (salesRes.status === 'fulfilled' && salesRes.value?.data) {
        setSalesData([
          {
            name: 'Revenue',
            data: salesRes.value.data.map(item => item.TotalSalesAmount),
            monthNames: salesRes.value.data.map(item => getMonthName(item.SalesMonth)).filter(Boolean)
          }
        ]);
      } else {
        console.error('Failed to fetch Sales Data:', salesRes.reason);
      }
      if (salesAchievedRes.status === 'fulfilled' && salesAchievedRes.value?.data) {
        setSalesAchievedData([
          {
            name: 'Revenue',
            data: salesAchievedRes.value.data.map(item => item.TotalSalesAmount),
            monthNames: salesAchievedRes.value.data.map(item => getMonthName(item.SalesMonth)).filter(Boolean)
          }
        ]);
      } else {
        console.error('Failed to fetch Sales Data:', salesAchievedRes.reason);
      }

      if (dealsRes.status === 'fulfilled') {
        if (dealsRes.value?.status === 204) {
          setExpiringDeals([]);
        } else if (dealsRes.value?.status === 200) {
          setExpiringDeals(dealsRes.value.data.slice(0, 3));
        }
      } else {
        console.error('Failed to fetch Expiring Deals:', dealsRes.reason);
        if (dealsRes.reason?.response?.status === 404) {
          openNotification('warning', 'Deal Not Found');
        }
        setExpiringDeals([]);
      }

      if (topExec.status === 'fulfilled') {
        if (topExec.value?.status === 204) {
          setTopSalesExcecutive([]);
        } else if (topExec.value?.status === 200) {
          setTopSalesExcecutive(topExec.value.data.slice(0, 3));
        }
      } else {
        console.error('Failed to fetch Top Sales Executive:', topExec.reason);
        if (topExec.reason?.response?.status === 404) {
          openNotification('warning', 'Deal Not Found');
        }
        setTopSalesExcecutive([]);
      }

    } catch (error) {
      console.error('Unexpected error in fetchData:', error);
    }
  }, [Channel]);

  const handleShowDetails = (deal) => {
    setSelectedDeal({ DealNumber: deal.DealNumber, DealCode: deal.DealCode });
    setIsDealDetailsDialogOpen(true);
  };

  const getMonthName = (id) => MONTHS.find((m) => m.id === id)?.name || null;

  /* USE EFFECTS */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.windowResizeHandler();
    }
  }, [salesData]);
  useEffect(() => {
    if (chartRef.current?.chart) {
      chartRef.current.chart.windowResizeHandler();
    }
  }, [salesAchievedData]);
  return (
    <div>
      <DashboardHeader Name="Deal Dashboard" Page="Deal" Links="Deal" />
      <div className={`grid grid-cols-${DEAL_DASHBOARD_SHORTCUTS.length} gap-4`}>
        <DashboardShortcutCards shortcuts={DEAL_DASHBOARD_SHORTCUTS} />
      </div>
      <div className="grid grid-cols-9 gap-4">
        <ExpiringDeals deals={expiringDeals} onShowDetails={handleShowDetails} />
        <TopAgencyClientTabs topAgencies={topAgencies} topClients={topClients} />
        <SalesChart salesData={salesData} chartRef={chartRef} />

        <SalesAchievedChart salesData={salesAchievedData} chartRef={chartRef} />
        <TopExecutiveTabs topExec={topSalesExcecutive} />

      </div>
      {isDealDetailsDialogOpen && (
        <DealDetailsDialog
          isDialogOpen={isDealDetailsDialogOpen}
          setIsDialogOpen={setIsDealDetailsDialogOpen}
          dealNumber={selectedDeal.DealNumber}
          dealCode={selectedDeal.DealCode}
        />
      )}
    </div>
  );
};







export default Deal;
