import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import BrandSpotsCard from 'views/Controls/BrandSpotsCard/BrandSpotsCard';
import LineBifurcationCard from 'views/Controls/Dashboard/LineBifurcationCard';
import Loader from 'views/Controls/Loader';

/* CONSTANTS */
const DEFAULT_TODAYS_SUMMARY_CARD_DATA = {
  title: '',
  total: {},
  data: [],
};

function AgencyDashboard() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const agencyCode = useSelector((state) => state.auth.user.AgencyCode);

  /* STATES */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todaysSummaryCard, setTodaysSummaryCard] = useState(
    DEFAULT_TODAYS_SUMMARY_CARD_DATA,
  );
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    if (currentDate && channel) getRevenueData();
  }, [currentDate, channel]);

  const getRevenueData = async () => {
    setShowLoader(true);
    let revenueData = DEFAULT_TODAYS_SUMMARY_CARD_DATA;
    try {
      const { data } = await apiCallstoreprocedure(
        'GetTodayRevenueSummary_Agencywise',
        {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          par_NTCFlag: 0,
          ScheduleDate: currentDate,
          Agencywise: agencyCode,
        },
      );
      const totalRevenue = data.find(
        (item) => item.FieldType === 'Total Revenue',
      );
      revenueData = {
        title: 'Revenue Summary',
        total: {
          label: 'Total Revenue',
          value: totalRevenue?.RevenueAmount || 'N/A',
        },
        data: data.filter((item) => item.FieldType !== 'Total Revenue'),
      };
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    } finally {
      setTodaysSummaryCard(revenueData);
      setShowLoader(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 h-[420px]">
          <BrandSpotsCard />
        </div>
        <div className="col-span-1 web-card p-3.5 h-[420px] overflow-y-scroll flex flex-col dark:!bg-[#1f2639] !bg-[#fff] ">
          <LineBifurcationCard
            title={todaysSummaryCard.title}
            total={todaysSummaryCard.total}
            data={todaysSummaryCard.data}
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
          />
        </div>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default AgencyDashboard;
