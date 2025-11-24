import React, { useEffect, useState } from 'react';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import DateSelector from './components/DateSelector';
import TimeSelector from '../../Controls/TimeSelector/TimeSelector';
import { Card } from 'components/ui';
import './Home.css';
import Content from './components/Content/Content';
import Header from './components/ContentHeader/Header';
import { apiCallstoreprocedure } from 'services/CommonService';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Loader from 'views/Controls/Loader';
import { format } from 'date-fns';
import { CLIENT } from 'views/Controls/clientListEnum';
import { HOURS } from './constants';

/* CONSTANTS */
const DATES_RANGE_LENGTH = 9;
const PAST_DATES_START_INDEX = -2;

function Home() {
  /* REDUX */
  const loginId = useSelector((state) => state.auth.session.LoginId);
  const token = useSelector((state) => state.auth.session.token);
  // const Channel = useSelector((state) => state.locale.selectedChannel);

  // /* GLOBAL VARIABLES */
  // const OneSolutionURL = localStorage.getItem("OneSolutionURL");
  // console.log(OneSolutionURL);
  // if (OneSolutionURL
  //   // &&
  //   // (CLIENT.USA_Forbes == Channel.label)
  // ) { window.location.replace(OneSolutionURL) }

  /* STATES */
  const [datesRange, setDatesRange] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date().getHours());
  const [originalChannelWiseContents, setOriginalChannelWiseContents] =
    useState(null);
  const [filteredChannelWiseContents, setFilteredChannelWiseContents] =
    useState(null);
  const [quickFilterOptions, setQuickFilterOptions] = useState(null);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState('all');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      hideStackedSideNav_secondary();
      setDatesRange(generateDatesRange());
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    console.log(loginId);
    if (token !== 'access_token') {
      (async () => {
        try {
          if (!selectedDate) return;
          setShowLoader(true);
          if (selectedDate.getDate() !== new Date().getDate()) {
            setSelectedTime(0);
          } else {
            setSelectedTime(new Date().getHours());
          }
          let param = {
            LoginCode: loginId,
            Date: convertDateToYMD(selectedDate),
          };
          let response = await apiCallstoreprocedure(
            'USP_GetUserwiseChannelFPC',
            param,
          );
          if (response.status === 200) {
            const content = response.data;
            setOriginalChannelWiseContents(generateChannelWiseContents(content));
            setQuickFilterOptions(getQuickFilterOptions(content));
          } else if (response.status === 204) {
            setOriginalChannelWiseContents([]);
            setQuickFilterOptions(['all']);
          } else {
            openNotification(
              'danger',
              `Unable to fetch content. Server responded with status code ${response.status}`,
            );
          }
          setShowLoader(false);
        } catch (error) {
          if (error.response.status == '401') {
            setOriginalChannelWiseContents([]);
            setQuickFilterOptions(['all']);
            return;
          }
          openNotification(
            'danger',
            'Something went wrong while fetching content',
          );
          setShowLoader(false);
        }
      })();
    }
  }, [selectedDate, token]);

  useEffect(() => {
    try {
      if (!originalChannelWiseContents) return;
      if (!searchInputValue) {
        filterContentWithQuickFilter();
      } else {
        filterContentWithSearchInputAndQuickFilter();
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    originalChannelWiseContents,
    selectedDate,
    quickFilterOptions,
    selectedQuickFilter,
    searchInputValue,
  ]);

  /* HELPER FUNCTIONS */
  const generateDatesRange = () => {
    try {
      const today = new Date();
      let datesRange = [];
      let curDateIndex = PAST_DATES_START_INDEX;
      for (let index = 0; index < DATES_RANGE_LENGTH; index++) {
        let date = new Date(today);
        date.setDate(today.getDate() + curDateIndex);
        datesRange.push({
          value:
            date.getDate() < 10
              ? `0${date.getDate()}`
              : date.getDate().toString(),
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          date: date,
        });
        curDateIndex = curDateIndex + 1;
      }
      return datesRange;
    } catch (error) {
      throw error;
    }
  };

  const generateChannelWiseContents = (content) => {
    try {
      const channels = Array.from(
        new Set(content.map((item) => item.ChannelName)),
      );
      let channelWiseContents = [];
      channels.forEach((curChannel) => {
        const curChannelContents = content.filter(
          (item) => item.ChannelName === curChannel,
        );
        const formattedCurChannelContents = {
          channelName: curChannel,
          channelLogo: curChannelContents[0].Channel_Image,
          channelContents: [],
        };
        curChannelContents.forEach((content) => {
          formattedCurChannelContents.channelContents.push({
            contentType: content.ContentTypeName,
            contentName: content.ContentName,
            startTime: content.TelecastStartTime,
            endTime: content.TelecastEndTime,
            telecastDate: content.NewTelecastDate,
            commCount: content.CommercialCount,
          });
        });
        channelWiseContents.push(formattedCurChannelContents);
      });
      return channelWiseContents;
    } catch (error) {
      throw error;
    }
  };

  const getQuickFilterOptions = (content) => {
    try {
      let quickFilterOptions = Array.from(
        new Set(content.map((item) => item.ContentTypeName)),
      );
      quickFilterOptions.unshift('all');
      return quickFilterOptions;
    } catch (error) {
      throw error;
    }
  };

  const filterContentWithQuickFilter = () => {
    try {
      if (selectedQuickFilter === 'all') {
        setFilteredChannelWiseContents(originalChannelWiseContents);
      } else if (!quickFilterOptions.includes(selectedQuickFilter)) {
        setFilteredChannelWiseContents(originalChannelWiseContents);
        setSelectedQuickFilter('all');
      } else {
        const filteredContents = originalChannelWiseContents.map((channel) => {
          return {
            channelName: channel.channelName,
            channelLogo: channel.channelLogo,
            channelContents: channel.channelContents.filter(
              (content) => content.contentType === selectedQuickFilter,
            ),
          };
        });
        setFilteredChannelWiseContents(filteredContents);
      }
    } catch (error) {
      throw error;
    }
  };

  const filterContentWithSearchInputAndQuickFilter = () => {
    try {
      let filteredContents = [];
      if (selectedQuickFilter === 'all') {
        filteredContents = filterOriginalContentWithSearchInput();
        setFilteredChannelWiseContents(originalChannelWiseContents);
      } else if (!quickFilterOptions.includes(selectedQuickFilter)) {
        filteredContents = filterOriginalContentWithSearchInput();
        setSelectedQuickFilter('all');
      } else {
        filteredContents = originalChannelWiseContents.map((channel) => {
          return {
            channelName: channel.channelName,
            channelLogo: channel.channelLogo,
            channelContents: channel.channelContents.filter(
              (content) =>
                content.contentType === selectedQuickFilter &&
                content.contentName
                  .toLowerCase()
                  .includes(searchInputValue.toLowerCase()),
            ),
          };
        });
      }
      setFilteredChannelWiseContents(filteredContents);
    } catch (error) {
      throw error;
    }
  };

  const filterOriginalContentWithSearchInput = () => {
    try {
      return originalChannelWiseContents.map((channel) => {
        return {
          channelName: channel.channelName,
          channelLogo: channel.channelLogo,
          channelContents: channel.channelContents.filter((content) => {
            return content.contentName
              .toLowerCase()
              .includes(searchInputValue.toLowerCase());
          }),
        };
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <DashboardHeader
        Name={'Home Dashboard'}
        Page={'Home'}
        Links={'Home'}
        additionalContent={
          <h3>
            <span> - </span>
            <span className="!text-teal-600">
              {format(selectedDate, 'dd-MMM-yyyy')}
            </span>
          </h3>
        }
      />
      <Card
        className="min-h-full"
        bodyClass="p-4 flex flex-col gap-8"
        bordered={false}
      >
        {Array.isArray(datesRange) && datesRange.length > 0 && (
          <DateSelector
            datesRange={datesRange}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        <div className="px-8">
          <TimeSelector
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            times={HOURS}
          />
        </div>
        {quickFilterOptions &&
          Array.isArray(quickFilterOptions) &&
          selectedQuickFilter && (
            <Header
              selectedQuickFilter={selectedQuickFilter}
              setSelectedQuickFilter={setSelectedQuickFilter}
              quickFilterOptions={quickFilterOptions}
              searchInputValue={searchInputValue}
              setSearchInputValue={setSearchInputValue}
            />
          )}
        {filteredChannelWiseContents &&
          Array.isArray(filteredChannelWiseContents) && (
            <Content
              channelWiseContents={filteredChannelWiseContents}
              selectedTime={selectedTime}
              date={selectedDate}
            />
          )}
      </Card>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default Home;
