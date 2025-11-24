import React, { useEffect, useState } from 'react';
import CalendarBase from './CalendarBase';
import { isSameDate } from './utils';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  convertDateToYMD,
  transformData,
  transformDataAsrun,
} from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';
import Loader from 'views/Controls/Loader';
import Badge from '../Badge';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apiGetDailyFPCStatus } from 'services/SchedulingService';

const CalendarForBilling = (props) => {
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const { name, multipleSelection, value, onChange, ...rest } = props;

  const [date, setdate] = useState(new Date());
  const nav = useNavigate();

  const handleChange = (date) => {
    if (name == 'FPC') {
      const channelQueryParam = encodeURIComponent(
        JSON.stringify({ objChannel: Channel }),
      );
      nav('/addfpcNew?dt=' + convertDateToYMD(date) + '&chl=' + channelQueryParam);
    }
    if (name == 'Daily') {
      const channelQueryParam = encodeURIComponent(
        JSON.stringify({ objChannel: Channel }),
      );
      nav(
        '/DailyFPCApp/?dt=' +
        convertDateToYMD(date) +
        '&chl=' +
        channelQueryParam,
      );
    }
    if (name == 'ASRUN') {
      nav('/AsrunMatching');
    }

    if (!multipleSelection) {
      return onChange(date);
    }

    const isSelected = value.some((val) => isSameDate(val, date));

    return onChange(
      isSelected
        ? value.filter((val) => !isSameDate(val, date))
        : [...value, date],
    );
  };
  const [events, setevents] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        let data = {};
        data.LocationCode = Channel.LocationCode;
        data.ChannelCode = Channel.ChannelCode;
        data.Screen = 'ASRUN';
        let TelecastDate = convertDateToYMD(date);
        let response;
        setevents(null);

        response = await apiGetDailyFPCStatus(data, TelecastDate);

        if (response) {
          if (response.status === 200) {
            setevents(transformDataAsrun(response.data));
          } else if (response.status == 404) {
            openNotification('warning', 'Data Not Found');
            setevents(null);
          } else if (response.status == 500) {
            openNotification('danger', 'Server Error.');
            setevents(null);
          }
        }
        setShowLoader(false);
      } catch (error) {
        openNotification(
          'danger',
          'Something went wrong while fetching FPC Status',
        );
        setShowLoader(false);
        console.error(error);
      }
    })();
  }, [date, Channel]);
  return (
    <>
      {' '}
      <Loader showLoader={ShowLoader} />
      <CalendarBase
        // defaultView="year"
        dayClassName={(date, { selected }) => {
          const foundDate = events?.find((resultDate) => {
            return (
              new Date(resultDate.start).getDate() === date.getDate() &&
              new Date(resultDate.start).getMonth() === date.getMonth()
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

          if (isSameDay(today, new Date(foundDate?.start))) {
            return 'text-red-600 bg-orange-400 border-none';
          }
          if (foundDate && !selected) {
            if (DateRender) {
              return 'text-red-600 bg-green-400'; // Change color to red if DateRender is true
            } else {
              return 'text-red-600 bg-green-400'; // Otherwise, use default styling
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
        onMonthChange={(e) => setdate(e)}
        value={value}
        {...rest}
      />
    </>
  );
};

export default CalendarForBilling;
