import { AdaptableCard, Container } from 'components/shared';
import React, { useContext, useEffect } from 'react';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import Header from './components/Header';
import ActivityLogContextProvider from './context/ActivityLogContextProvider';
import SearchDialog from './components/SearchDialog/SearchDialog';
import ActivityLogContext from './context/ActivityLogContext';
import { apiGetBookingActivityForBookingCode } from 'services/SalesAdminService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { activityTypesEnum } from './enum';
import DatewiseActivities from './components/DatewiseActivities';
import ActivityInfo from './components/ActivityInfo/ActivityInfo';
import Loader from 'views/Controls/Loader';
import { useSelector } from 'react-redux';

function ActivityLog() {
  return (
    <ActivityLogContextProvider>
      <ActivityLogWithContext />
    </ActivityLogContextProvider>
  );
}

function ActivityLogWithContext() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* CONTEXT */
  const {
    formState,
    datewiseActivities,
    setDatewiseActivities,
    staticInfo,
    setStaticInfo,
    activityInfoData,
    showLoader,
    setShowLoader,
    resetPage,
  } = useContext(ActivityLogContext);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      hideStackedSideNav_secondary();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      resetPage();
    } catch (error) {
      console.error(error);
    }
  }, [channel]);

  useEffect(() => {
    (async () => {
      try {
        if (formState.client && formState.booking) {
          setShowLoader(true);
          const response = await apiGetBookingActivityForBookingCode(
            formState.booking.value,
          );
          if (response.status === 200) {
            setDatewiseActivities(generateActivities(response.data));
            setStaticInfo({
              ...staticInfo,
              bookingDuration: {
                startDate: response.data.BookingStartDate,
                endDate: response.data.BookingEndDate,
              },
            });
          } else if (response.status === 204) {
            console.error('No activities to show');
          } else {
            openNotification(
              'danger',
              `Unable to fetch activities. Server responded ${response.status}`,
            );
          }
          setShowLoader(false);
        }
      } catch (error) {
        setShowLoader(false);
        openNotification(
          'danger',
          `Something went wrong while fetching activities`,
        );
        console.error(error);
      }
    })();
  }, [formState]);

  /* HELPER FUNCTIONS */
  const generateActivities = (data) => {
    try {
      let activities = [
        {
          type: activityTypesEnum.scheduled,
          executerName: data.AddedBy,
          spots: data.bookingCount,
          dateTime: data.AddedOn,
          id: `${data.AddedBy}-${data.AddedOn}-0`,
        },
      ];
      data.BookingData.forEach((activity, index) => {
        let translatedActivity = {
          type: activity.ChangeType,
          executerName: activity.Addedby,
          executerId: activity.ChangeBy,
          spots: activity.Count,
          dateTime: activity.ChangeOn,
          id: `${data.AddedBy}-${data.ChangeOn}-${index + 1}`,
        };
        if (activity.ChangeType === activityTypesEnum.replaced) {
          translatedActivity = {
            ...translatedActivity,
            additionalInfo: [
              {
                spots: activity.Count,
                prevSpot: activity.PreviousSpot,
                newSpot: activity.NewSpot,
              },
            ],
          };
        }
        activities.push(translatedActivity);
      });
      const uniqueDates = getUniqueDates(activities);
      return getDatewiseActivities(uniqueDates, activities);
    } catch (error) {
      throw error;
    }
  };

  const getUniqueDates = (activities) => {
    try {
      const uniqueDates = new Set();
      activities.forEach((activity) => {
        const date = activity.dateTime.split('T')[0];
        uniqueDates.add(date);
      });
      return Array.from(uniqueDates);
    } catch (error) {
      throw error;
    }
  };

  const getDatewiseActivities = (uniqueDates, activities) => {
    try {
      const datewiseActivities = [];
      uniqueDates.forEach((date) => {
        const activitiesOnDate = activities.filter((activity) =>
          activity.dateTime.includes(date),
        );
        datewiseActivities.push({
          date,
          activities: activitiesOnDate,
        });
      });
      return datewiseActivities;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Container className="min-h-full">
      <AdaptableCard bordered={false} className="h-full" bodyClass="h-full">
        <div className="flex gap-4 min-h-full">
          <div
            className={`${
              activityInfoData ? 'w-[15%]' : 'w-[22%]'
            } transition-all`}
          >
            <h4 className="mb-4">Activity Log</h4>
            <Header />
          </div>
          <div
            className={`${
              activityInfoData ? 'w-[85%]' : 'w-[78%]'
            } transition-all`}
          >
            {activityInfoData ? (
              <div className="flex gap-4">
                <div className="w-1/2 border-r border-r-gray-700 pr-4">
                  <DatewiseActivities datewiseActivities={datewiseActivities} />
                </div>
                <div className="w-1/2">
                  <ActivityInfo />
                </div>
              </div>
            ) : (
              <DatewiseActivities datewiseActivities={datewiseActivities} />
            )}
          </div>
        </div>
      </AdaptableCard>
      <SearchDialog />
      <Loader showLoader={showLoader} />
    </Container>
  );
}

export default ActivityLog;
