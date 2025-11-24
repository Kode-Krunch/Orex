import { CalendarView, Container } from 'components/shared';
import { Card, Switcher } from 'components/ui';
import { convertDateToYMD } from 'components/validators';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  apiCreateTrafficDayClose,
  apiGetTrafficDayClose,
} from 'services/SalesAdminService';
import {
  formatDateToDDMMMYYYY,
  isChannelSelected,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { RxLockClosed } from 'react-icons/rx';
import { HiMiniLockOpen } from 'react-icons/hi2';
import Loader from 'views/Controls/Loader';
import SelectChannelDialog from 'views/Controls/SelectChannelDialog';

function TrafficDay() {
  /* REDUX STATES */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [curDate, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      (async () => {
        if (isChannelSelected(channel)) {
          setShowLoader(true);
          const response = await apiGetTrafficDayClose(
            convertDateToYMD(curDate),
            channel,
            token,
          );
          if (response.status === 200) {
            const traffics = response.data;
            generateEvents(traffics);
          } else if (response.status === 204) {
            openNotification(
              'info',
              'No Traffic Day data found for current month',
            );
          } else {
            openNotification(
              'danger',
              `Unable to get Traffic Day Close. Server responded with status code: ${response.status}`,
            );
          }
          setShowLoader(false);
        }
      })();
    } catch (error) {
      console.error(error);
    }
  }, [channel, curDate, token]);

  /* EVENT HANDLERS */
  const handleSwitcherClick = async (event) => {
    try {
      const data = {
        TrafficDate: convertDateToYMD(event.start),
        IsActive: event.extendedProps.isActive === 0 ? 1 : 0,
      };
      const response = await apiCreateTrafficDayClose(data, channel, token);
      if (response.status === 200) {
        event.setExtendedProp('isActive', data.IsActive);
        openNotification(
          'success',
          `Traffic day ${
            data.IsActive ? 'opened' : 'closed'
          } for ${formatDateToDDMMMYYYY(data.TrafficDate)}`,
        );
      } else {
        openNotification(
          'danger',
          `Something went wrong. Server returned with status code ${response.status}`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const generateEvents = (traffics) => {
    try {
      let generatedEvents = [];
      traffics.forEach((curTrafficDay) => {
        generatedEvents.push({
          title: `Event for ${curTrafficDay.date}`,
          start: curTrafficDay.date,
          end: curTrafficDay.date,
          isActive: curTrafficDay.IsActive,
        });
      });
      setEvents(generatedEvents);
    } catch (error) {
      console.error(error);
    }
  };

  const renderEventContent = ({ event }) => {
    try {
      return (
        <div className="flex justify-center items-center">
          <Switcher
            defaultChecked={event.extendedProps.isActive}
            onClick={() => {
              handleSwitcherClick(event);
            }}
            checkedContent={
              <div className="text-lg">
                <HiMiniLockOpen />
              </div>
            }
            unCheckedContent={
              <div className="text-lg">
                <RxLockClosed />
              </div>
            }
          ></Switcher>
        </div>
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isChannelSelected(channel) ? (
        <Card>
          <h4
            style={{
              fontSize: '1.25rem',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: '2.75rem',
              color: 'white',
              marginTop: '-15px',
            }}
          >
            Traffic Day
          </h4>
          <Container style={{ height: 550 }}>
            <CalendarView
              datesSet={(arg) => {
                setDate(arg.view.currentStart);
              }}
              events={events}
              eventColor="transparent"
              eventContent={renderEventContent}
            />
          </Container>
        </Card>
      ) : (
        <Card
          className="h-full"
          bodyClass="h-full flex justify-center items-center"
          bordered={false}
        >
          Please select a channel to view Traffic Day data
        </Card>
      )}
      <SelectChannelDialog />
      <Loader showLoader={showLoader} />
    </>
  );
}

export default TrafficDay;
