import React, { useContext, useEffect, useState } from 'react';
import { CalendarView } from 'components/shared';
import { useDispatch, useSelector } from 'react-redux';
import SchedulerContext from '../../context/SchedulerContext';
import {
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import {
  convertDateToYMD,
  Finalog,
  transformData,
} from 'components/validators';
import { setIsSelectChannelDialogOpen } from 'store/locale/localeSlice';
import UnsavedWorkExistDialog from './components/UnsavedWorkExistDialog';
import { Card } from 'components/ui';
import { apiGetDailyFPCStatus } from 'services/SchedulingService';
import { pagesEnum } from '../../enum';
import { CLIENT } from 'views/Controls/clientListEnum';
import { apiCallstoreprocedure } from 'services/CommonService';
import WorkingPageExistDialog from './components/WorkingPageExistDialog';

function SchedulingCalendar() {
  const dispatch = useDispatch();
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const unsavedWork = useSelector((state) => state.auth.scheduling.unsavedWork);

  /* CONDITION */
  const IsChannelwise = channel.label === CLIENT.USA_Forbes;

  /* CONTEXT */
  const { page, setDate, setUnsavedWorkState, setShowLoader } =
    useContext(SchedulerContext);

  /* STATES */
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [messageShowToUser, setMessageShowToUser] = useState('');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [events, setEvents] = useState(null);
  const [clickedDateEvent, setClickedDateEvent] = useState(null);
  const [isUnsavedWorkExistDialogOpen, setIsUnsavedWorkExistDialogOpen] =
    useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        if (page && channel && calendarDate) {
          setShowLoader(true);
          setEvents(await getDailyFPCStatusAsCalendarEvents());
          setShowLoader(false);
        }
      } catch (error) {
        setEvents(null);
        openNotification(
          'danger',
          `Something went wrong. Failed to fetch Daily FPC Status`,
        );
        console.error(error);
      }
    })();
  }, [page, calendarDate, channel]);

  /* EVENT HANDLERS */
  const handlePageOpenClose = async (IsOpen, page, date, callback) => {
    try {
      const PageOpen = await apiCallstoreprocedure('USP_Sch_SchedulingSameDay', {
        "Channel": channel.ChannelCode,
        "Location": channel.LocationCode,
        "TelecastDate": date,
        "IsOpen": IsOpen,
        "OpenBy": LoginId,
        "Page": page
      });
      const statusMsg = PageOpen.data[0].StatusMsg;
      setIsPageOpen(statusMsg !== 'Insert');
      if (callback) {
        callback(statusMsg !== 'Insert');
      }
      if (statusMsg !== 'Insert') {
        setMessageShowToUser(statusMsg);
      }
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Unable to open schedule. Please try again later.')
      window.location.reload()
    }
  };
  const handleUnsavedEvent = (event) => {
    if (isUnsavedWorkExist(event.startStr)) {
      setIsUnsavedWorkExistDialogOpen(true);
    } else {
      setDate(event.start);
    }
  }
  const handleDateSelect = (event) => {
    handlePageOpenClose(1, page, event.startStr, (isOpen) => {
      if (isChannelSelected(channel)) {
        const isDailyFPCPresent = events.some(
          (row) => row.start === event.startStr
        );

        if (isDailyFPCPresent) {
          setClickedDateEvent(event);
          if (!isOpen) {
            handleUnsavedEvent(event);
          }
        } else {
          openNotification('info', 'Daily FPC not available for selected date');
        }
      } else {
        dispatch(setIsSelectChannelDialogOpen(true));
      }
    });
  };
  const handleMonthChange = (dateInfo) => {
    try {
      setCalendarDate(dateInfo.view.currentStart);
    } catch (error) {
      openNotification('danger', 'Something went wrong while changing month');
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const getDailyFPCStatusAsCalendarEvents = async () => {
    try {
      const screen =
        page === pagesEnum.PROMO
          ? 'promo'
          : page === pagesEnum.COMMERCIAL
            ? 'COM'
            : page === pagesEnum.SONG
              ? 'SONG'
              : page === pagesEnum.NTC
                ? 'NTC'
                : page === pagesEnum.FINAL_LOG
                  ? 'FINAL'
                  : null;
      if (screen) {
        const response = await apiGetDailyFPCStatus(
          {
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            Screen: screen,
          },
          convertDateToYMD(calendarDate),
        );
        if (response.status === 200) {
          if (response.data.length === 0) {
            openNotification('info', 'Daily FPC Status not found');
          }
          return transformDataForPage(response.data);
        } else if (response.status === 204) {
          openNotification('info', `Daily FPC Status not found`);
        } else {
          openNotification(
            'danger',
            `Failed to fetch Daily FPC Status. Server responded with status code ${response.status}`,
          );
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  const transformDataForPage = (data) => {
    try {
      let transformedData = null;
      if (page === pagesEnum.PROMO) {
        transformedData = transformData(data, 'promoScheduling');
      } else if (page === pagesEnum.COMMERCIAL) {
        transformedData = transformData(data, 'commercialScheduling');
      } else if (page === pagesEnum.SONG) {
        transformedData = transformData(data, 'songScheduling');
      } else if (page === pagesEnum.NTC) {
        transformedData = transformData(data);
      } else if (page === pagesEnum.FINAL_LOG) {
        transformedData = Finalog(data, IsChannelwise);
      }
      return transformedData;
    } catch (error) {
      throw error;
    }
  };

  const isUnsavedWorkExist = (date) => {
    try {
      if (Object.keys(unsavedWork[page]).includes(date)) {
        setUnsavedWorkState(unsavedWork[page][date]);
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  return (
    <Card className="h-full" bodyClass="h-full">
      <CalendarView
        height="parent"
        events={events}
        select={handleDateSelect}
        datesSet={handleMonthChange}
        selectable
      />
      <UnsavedWorkExistDialog
        isOpen={isUnsavedWorkExistDialogOpen}
        setIsOpen={setIsUnsavedWorkExistDialogOpen}
        clickedDateEvent={clickedDateEvent}
        setClickedDateEvent={setClickedDateEvent}
      />
      <WorkingPageExistDialog
        isPageOpen={isPageOpen}
        setIsPageOpen={setIsPageOpen}
        messageShowToUser={messageShowToUser}
        setMessageShowToUser={setMessageShowToUser}
        handleUnsavedEvent={handleUnsavedEvent}
        clickedDateEvent={clickedDateEvent}
      />
    </Card>
  );
}

export default SchedulingCalendar;
