import { PLAYLIST_SUMMARY_ICONS } from './constant';
const { apiCallstoreprocedure } = require('services/CommonService');
const {
  openNotification,
  parseDuration,
} = require('views/Controls/GLOBALFUNACTION');

const getPlaylistSummaryData = async (channel, date, AgencyCode) => {
  //const Username = useSelector((state) => state.auth.session.Username);


  let playlistSummary = [];
  try {
    const response = await apiCallstoreprocedure('USP_PlaylistSummary', {
      par_LocationCode: channel.LocationCode,
      par_Channelcode: channel.ChannelCode,
      par_TelecastDate: date,
      par_AgencyCode: AgencyCode,
    });
    if (response.status === 200) {
      response.data.forEach(
        (item) =>
          item.FieldType != 'SpotCountInLog' &&
          item.FieldType != 'LastMinSpots' &&
          // item.FieldType != 'DroppedSpots' &&
          playlistSummary.push({
            name: item.FieldType,
            count: item.FieldValue,
            title: PLAYLIST_SUMMARY_ICONS[item.FieldType].title,
            description: PLAYLIST_SUMMARY_ICONS[item.FieldType].description,
            icon: PLAYLIST_SUMMARY_ICONS[item.FieldType].icon,
            iconBorderColor:
              PLAYLIST_SUMMARY_ICONS[item.FieldType].iconBorderColor,
            color: PLAYLIST_SUMMARY_ICONS[item.FieldType].color,
            id: PLAYLIST_SUMMARY_ICONS[item.FieldType].id,
          }),
      );
    } else if (response.status === 204) {
      openNotification('info', 'No playlist summary to show');
    } else {
      openNotification(
        'error',
        'Something went wrong while fetching playlist summary',
      );
    }
  } catch (error) {
    console.error(error);
    openNotification('Something went wrong while fetching playlist summary');
  } finally {
    return playlistSummary;
  }
};

const getAsrunStartEndTime = async (channel, date) => {
  let result = [{ value: 'all', label: 'All' }];
  try {
    const response = await apiCallstoreprocedure('USP_GetAsrunStartEndTime', {
      par_LocationCode: channel.LocationCode,
      par_ChannelCode: channel.ChannelCode,
      par_Date: date,
    });
    if (response.status === 200) {
      result.push(
        ...response.data.map((time) => {
          const startTime = time.StartTime.substr(0, 8);
          const endTime = time.EndTime.substr(0, 8);
          return {
            value: `${startTime}-${endTime}`,
            label: `${startTime} - ${endTime}`,
          };
        }),
      );
    } else if (response.status !== 204) {
      throw new Error(response);
    }
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};

const isDisableSelectionForMissedSpot = (curSpot, selSpot) => {
  const dealEndDate = new Date(curSpot.DealPeriodToDate);
  // Disable if selected spot and cur spot is different
  if (
    selSpot &&
    (curSpot.DealNumber !== selSpot.DealNumber ||
      curSpot.DealLineItemNo !== selSpot.DealLineItemNo)
  )
    return true;
  // Disble if deal end date is backdated
  if (dealEndDate < new Date()) return true;
  return false;
};

const getMissedSpots = (tableData, selSpot) => {
  return tableData.map((spot) => ({
    ...spot,
    disableSelection: isDisableSelectionForMissedSpot(spot, selSpot),
  }));
};

const getDistinctSums = (selectedRowData) => {
  try {
    if (!Array.isArray(selectedRowData)) {
      return [];
    }
    const result = selectedRowData.reduce((acc, item) => {
      if (item) {
        const key = `${item.Commercial}-${item.Duration}`;
        if (!acc[key]) {
          acc[key] = {
            CommercialCaption: item.Commercial,
            CommercialDuration: item.Duration,
            CurrencySymbol: '₹',
            SpotAmountSum: 0,
            TotalDuration: 0,
            TotalCount: 0,
          };
        }
        acc[key].SpotAmountSum += item.SpotAmount;
        acc[key].TotalDuration += parseDuration(item.Duration);
        acc[key].TotalCount++;
        return acc;
      }
    }, {});
    return Object.values(result || 0);
  } catch (error) {
    throw error;
  }
};

const getMissedSpotsInSelTime = (selTime, tableData) => {
  if (selTime === 'all') return tableData;
  const [startTime, endTime] = selTime.split('-');
  return tableData.filter(
    (row) => row.ScheduleTime >= startTime && row.ScheduleTime < endTime,
  );
};

export {
  getPlaylistSummaryData,
  getAsrunStartEndTime,
  getMissedSpots,
  getDistinctSums,
  getMissedSpotsInSelTime,
};
