import React, { useEffect, useState } from 'react';
import CalendarBase from './CalendarBase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiGetDailyFPCStatus } from 'services/SchedulingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { Finalog, convertDateToYMD } from 'components/validators';
import Notification from '../Notification';
import toast from '../toast';
import Loader from 'views/Controls/Loader';
import { apiCallstoreprocedure } from 'services/CommonService';
import Badge from '../Badge';
import Button from '../Buttons';

const CalendarForSchedule = ({
  name,
  multipleSelection,
  value,
  onChange,
  ...rest
}) => {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [events, setevents] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const [date, setdate] = useState(new Date());
  const [datewiseFpcStatus, setDatewiseFpcStatus] = useState(null);

  /* HOOKS */
  const nav = useNavigate();

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (channel && date) {
          setShowLoader(true);
          setDatewiseFpcStatus(await getDailyFPCStatusAsCalendarEvents());
          let data = {};
          data.par_LocationCode = channel.LocationCode;
          data.par_ChannelCode = channel.ChannelCode;
          data.par_FPCDate = convertDateToYMD(date);
          data.par_Flag = 'PLAYLIST';
          apiCallstoreprocedure('USP_Calender_Dashboard', data)
            .then((response) => {
              if (response.status == 200) {
                setevents(response.data);
              }
              if (response.status == 204) {
                setShowLoader(false);
              }
            })
            .catch((error) => {
              if (error.response.status) {
                setevents(null);
                setShowLoader(false);
              }
            });
          setShowLoader(false);
        }
      } catch (error) {
        setDatewiseFpcStatus(null);
        setevents(null);
        openNotification(
          'danger',
          `Something went wrong. Failed to fetch Daily FPC Status`,
        );
        setShowLoader(false);
        console.error(error);
      }
    })();
  }, [date, channel]);

  /* EVENT HANDLERS */
  const handleChange = (event) => {
    // alert(name)
    if (name == 'Final') {
      if (!channel) {
        toast.push(
          <Notification title="Error" type="danger">
            Kindly Select Channel
          </Notification>,
        );
        return;
      }
      const isDailyFPCPresent = datewiseFpcStatus?.some(
        (row) => row.start === convertDateToYMD(event),
      );
      if (isDailyFPCPresent) {
        nav('/finalLog', { state: { date: event } });
      } else {
        openNotification('info', 'Daily FPC not available for selected date');
      }
    }
  };

  /* HELPER FUNCTIONS */
  const getDailyFPCStatusAsCalendarEvents = async () => {
    try {
      const response = await apiGetDailyFPCStatus(
        {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          Screen: 'FINAL',
        },
        convertDateToYMD(date),
      );
      if (response.status === 200) {
        if (response.data.length === 0) {
          openNotification('info', 'Daily FPC Status not found');
        }
        return Finalog(response.data);
      } else if (response.status === 204) {
        openNotification('info', `Daily FPC Status not found`);
      } else {
        openNotification(
          'danger',
          `Failed to fetch Daily FPC Status. Server responded with status code ${response.status}`,
        );
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>

      <Loader showLoader={ShowLoader} />
      <CalendarBase
        dayClassName={(date, { selected }) => {
          const foundDate = events?.find((resultDate) => {
            return (
              new Date(resultDate.TelecastDate).getDate() === date.getDate() &&
              new Date(resultDate.TelecastDate).getMonth() === date.getMonth()
            );
          });
          function isSameDay(date1, date2) {
            return (
              date1.getFullYear() === date2.getFullYear() &&
              date1.getMonth() === date2.getMonth() &&
              date1.getDate() === date2.getDate()
            );
          }
          const today = new Date();
          const DateRender = date >= today;

          if (isSameDay(today, new Date(foundDate?.TelecastDate))) {
            return 'text-red-600 bg-orange-400 border-none';
          }
          if (foundDate && !selected) {
            if (DateRender) {
              return 'text-red-600 bg-green-400'; // Change color to red if DateRender is true
            } else {
              return 'text-red-600 bg-gray-400'; // Otherwise, use default styling
            }
          }
          if (selected) {
            return 'text-red bg-red-400';
          }

          return 'text-gray-700 dark:text-gray-200 ';
        }}
        renderDay={(date) => {
          const day = date.getDate();

          if (day !== 0) {
            return <span>{day}</span>;
          }
          return (
            <span className="relative flex justify-center items-center w-full h-full">
              {day}
              <Badge className="absolute bottom-1" innerClass="h-1 w-1" />
            </span>
          );
        }}
        onChange={handleChange}
        value={value}
        {...rest}
        onMonthChange={(e) => setdate(e)}
      />
    </>
  );
};

export default CalendarForSchedule;
