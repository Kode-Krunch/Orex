import React, { useEffect, useState } from 'react';
import { CalendarView, Container } from 'components/shared';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isChannelSelected, openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  setdateForm,
  setIsSelectChannelDialogOpen,
} from 'store/locale/localeSlice';
import { FPC, convertDateToYMD, } from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';
import Loader from 'views/Controls/Loader';
import { CLIENT } from 'views/Controls/clientListEnum';

const Calendar = ({ objChannel }) => {
  /* REDUX */
  const dispatch = useDispatch();
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [events, setevents] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    let data = {};
    data.par_LocationCode = Channel.LocationCode;
    data.par_ChannelCode = Channel.ChannelCode;
    data.par_FPCDate = currentDate;
    data.par_Flag = 'FPC';

    apiCallstoreprocedure('USP_Calender_Dashboard', data)
      .then((response) => {
        if (response.status == 200) {
          setShowLoader(false);
          let dt = FPC(response.data);
          setevents(dt);
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
    dispatch(
      setdateForm([
        '',
        Channel.label == CLIENT.USA_Forbes ? 'Playlist Template' : 'FPC Master',
      ]),
    );
  }, [currentDate, Channel]);

  /* HOOKS */
  const navigate = useNavigate();

  /* EVENT HANDLERS */
  const onCellSelect = (event) => {
    const selectedDate = new Date(event.startStr);

    // Check if the selected date is the 1st or if the previous date exists
    const isFirstDay = selectedDate.getDate() === 1;
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() - 1);
    const previousDateExists = Channel.label == CLIENT.USA_Forbes || Channel.label === CLIENT.USA_GEC || Channel.label === CLIENT.USA_NEWS ? true : events?.some(e => e?.start !== undefined && e?.start?.startsWith(previousDate.toISOString().split("T")[0]));
    console.log(Channel)
    if (isFirstDay || previousDateExists) {
      if (!isChannelSelected(objChannel)) {
        return dispatch(setIsSelectChannelDialogOpen(true));
      }
      const channelQueryParam = encodeURIComponent(JSON.stringify({ objChannel }));
      navigate(`/addfpcNew?dt=${event.startStr}&chl=${channelQueryParam}`);
    } else {
      openNotification('warning', 'Kindly create FPC for the previous day before creating FPC for the selected day');
    }
  };


  return (
    <Container style={{ height: 570 }}>
      <Loader showLoader={showLoader} />
      <CalendarView
        select={onCellSelect}
        selectable
        events={events}
        datesSet={(dateInfo) => {
          setCurrentDate(
            convertDateToYMD(dateInfo.view.getCurrentData().currentDate),
          );
        }}
      />
    </Container>
  );
};

export default Calendar;
