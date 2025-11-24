import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { Tabs, Badge, ScrollBar } from 'components/ui';
import CalendarForSchedule from 'components/ui/DatePicker/CalendarForSchedule';
import CalendarForProgram from 'components/ui/DatePicker/CalendarForProgram';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import { convertDateToYMD } from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';
import { SCHEDULING_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts';
import { CLIENT } from 'views/Controls/clientListEnum';
import {
  mdiPlayBoxLockOpen,
  mdiMovieOpenEditOutline,
  mdiAlarmBell,
  mdiMotionPlayOutline,
  mdiPlaylistMusicOutline,
  mdiBullhorn,
  mdiAlertOctagon,
} from '@mdi/js';
import { format } from 'date-fns';
import AgencyDashboard from './AgencyDashboard';

const { TabNav, TabList, TabContent } = Tabs;

const Consent = [
  { icon: mdiPlayBoxLockOpen, color: '#45AAF2' },
  { icon: mdiMovieOpenEditOutline, color: '#79dfe8' },
  { icon: mdiAlarmBell, color: '#ffbf00' },
  { icon: mdiMotionPlayOutline, color: '#F55C52' },
  { icon: mdiPlaylistMusicOutline, color: '#ffbf00' },
  { icon: mdiBullhorn, color: '#45AAF2' },
  { icon: mdiAlertOctagon, color: '#79dfe8' },
  ,
];
const Scheduling = () => {
  const direction = useSelector((state) => state.theme.direction);
  const channel = useSelector((state) => state.locale.selectedChannel);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [runningProgramData, setRunningProgramData] = useState([]);
  const [playListSummary, setPlayListSummary] = useState([]);
  const AgencyCode = useSelector((state) => state.auth.user.AgencyCode);

  const icons = [
    mdiPlayBoxLockOpen,
    mdiMovieOpenEditOutline,
    mdiAlarmBell,
    mdiMotionPlayOutline,
    mdiPlaylistMusicOutline,
    mdiBullhorn,
    mdiAlertOctagon,
  ];

  useEffect(() => {
    fetchRunningPrograms();
    fetchPlaylistSummary();
  }, [channel, currentDate]);

  const fetchRunningPrograms = async () => {
    try {
      const params = {
        par_LocationCode: channel.LocationCode,
        par_ChannelCode: channel.ChannelCode,
        par_TelecastDate: new Date().toLocaleDateString('en-CA'),
      };
      const resp = await apiCallstoreprocedure('RunningPlaylist', params);
      setRunningProgramData(resp.data || []);
    } catch (error) {
      console.error('Error fetching running programs:', error);
    }
  };

  const fetchPlaylistSummary = async () => {
    try {
      const resp = await apiCallstoreprocedure('USP_PlaylistSummary', {
        par_LocationCode: channel.LocationCode,
        par_Channelcode: channel.ChannelCode,
        par_TelecastDate: convertDateToYMD(currentDate),
        par_AgencyCode: AgencyCode,
      });

      setPlayListSummary(
        (resp.data || []).map((item, index) => ({
          name: item.FieldType,
          count: item.FieldValue,
          icon: Consent[index]?.icon,
          color: Consent[index]?.color,
        })),
      );
    } catch (error) {
      setPlayListSummary([]);
      console.error('Error fetching playlist summary:', error);
    }
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setDate(previousMonth.getDate() - 1);
    previousMonth.setMonth(previousMonth.getMonth());
    setCurrentDate(previousMonth);
  };
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setDate(nextMonth.getDate() + 1);
    nextMonth.setMonth(nextMonth.getMonth());
    setCurrentDate(nextMonth);
  };

  return (
    <>
      {AgencyCode === 0 ? (
        <>
          <DashboardHeader
            Name="Scheduling Dashboard"
            Page="Scheduling"
            Links="Scheduling"
          />
          <div
            className={`grid grid-cols-${SCHEDULING_DASHBOARD_SHORTCUTS.length} gap-4`}
          >
            <DashboardShortcutCards
              shortcuts={SCHEDULING_DASHBOARD_SHORTCUTS}
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            {/* Running Playlist Section */}
            <div className="col-span-4  p-3.5  h-[420px] rounded-lg rounded-lg web-card flex flex-col overflow-hidden hover:overflow-y-scroll hover:pr-2 dark:!bg-[#1f2639] !bg-[#fff]">
              <div
                className="list-group-item  mx-2  "
                style={{ borderRadius: '3px 3px 0 0' }}
              >
                <h5 className="dark:border-b dark:border-gray-600 border-b border-gray-400 pb-2 flex items-center">
                  <MdOutlineSlowMotionVideo className="mr-2" size={23} />{' '}
                  Running Playlist
                </h5>
                <div className="flex mb-0 mt-2">
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                    className="dark:!text-amber-400 !text-amber-400 "
                  >
                    {format(new Date(), 'EEEE')}
                  </p>

                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                    className="dark:!text-gray-400 !text-gray-600"
                  >
                    , {format(new Date(), 'dd MMMM yyyy')}
                  </p>
                </div>
              </div>
              <ScrollBar
                direction={direction}
                className="h-80 overflow-y-auto mt-2"
              >
                {runningProgramData.map((item, index) => (
                  <div
                    key={index}
                    className="flex p-3 dark:border-b dark:border-gray-600 border-b border-gray-400"
                  >
                    <Badge className="mr-3" innerClass="bg-emerald-500" />
                    <div>
                      <p className="dark:!text-gray-400 !text-gray-800 flex">
                        {item.TelecastTime}{' '}
                        {index == 0 && (
                          <span className="font-bold text-amber-600  ml-4 animate-bounce w-6 h-6">
                            Running
                          </span>
                        )}
                      </p>
                      <p className="mb-0 text-sm dark:!text-gray-400 !text-gray-800">
                        {item.EventCaption}
                      </p>
                      <p className="mb-0 text-muted text-xs dark:!text-gray-400 !text-gray-800">
                        <strong className="dark:!text-gray-400 !text-gray-800">
                          {item.EventDuration}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollBar>
            </div>

            {/* Playlist Summary Section */}
            <div className="col-span-4  p-3.5  h-[420px] rounded-lg web-card  flex flex-col overflow-hidden hover:overflow-y-scroll hover:pr-2 dark:!bg-[#1f2639] !bg-[#fff]">
              <h5 className="dark:border-b dark:border-gray-600 border-b border-gray-400 pb-2 flex items-center">
                <MdOutlineSlowMotionVideo className="mr-2" size={23} /> PlayList
                Summary
              </h5>
              <div className="flex justify-between items-center col-span-3">
                <div
                  className="p-2 rounded hover:bg-sky-700  cursor-pointer"
                  onClick={handlePreviousMonth}
                >
                  <FaChevronLeft />
                </div>
                <div className="flex mb-0 mt-2">
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                    className="dark:!text-amber-400 !text-amber-400 "
                  >
                    {currentDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                    })}
                  </p>

                  <p
                    style={{
                      fontSize: 16,
                      color: 'whitesmoke',
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                    className="dark:!text-gray-400 !text-gray-600 "
                  >
                    ,{' '}
                    {currentDate.toLocaleDateString('en-US', {
                      day: 'numeric',
                    })}{' '}
                    {currentDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
                <div
                  className="p-2 rounded hover:bg-sky-700  cursor-pointer"
                  onClick={handleNextMonth}
                >
                  <FaChevronRight />
                </div>
              </div>
              <ScrollBar
                direction={direction}
                className="h-80 overflow-y-auto mt-2"
              >
                {playListSummary.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between px-4 border-b py-3"
                  >
                    <div className="flex items-center">
                      <Icon
                        path={item.icon}
                        size={1.5}
                        className="mr-2"
                        style={{
                          color: item.color,
                        }}
                      />
                      <h5>{item.name}</h5>
                    </div>
                    <h4>{item.count}</h4>
                  </div>
                ))}
              </ScrollBar>
            </div>

            {/* Tabs Section */}
            <div className="col-span-4  p-3.5  h-[420px] rounded-lg web-card  flex flex-col overflow-hidden hover:overflow-y-scroll hover:pr-2 dark:!bg-[#1f2639] !bg-[#fff]">
              <Tabs defaultValue="tab1">
                <TabList className="mb-2">
                  <TabNav value="tab1">Final Log</TabNav>
                  <TabNav value="tab2">Daily FPC</TabNav>
                  <TabNav value="tab3">Cloud Playout</TabNav>
                </TabList>
                <TabContent value="tab1">
                  <CalendarForSchedule multipleSelection name="Final" />
                </TabContent>
                <TabContent value="tab2">
                  <CalendarForProgram multipleSelection name="Daily" />
                </TabContent>
                <TabContent value="tab3">
                  <CalendarForProgram multipleSelection name="CloudPlayout" />
                </TabContent>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <AgencyDashboard />
      )}
    </>
  );
};

export default Scheduling;
