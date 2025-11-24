import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Avatar,
  Badge,
  Dialog,
  Input,
  ScrollBar,
  Tabs,
  Tooltip,
} from 'components/ui';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators.js';
import { apiCallstoreprocedure } from '../../services/CommonService.js';
import CalendarForProgram from 'components/ui/DatePicker/CalendarForProgram.js';
import {
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaPlayCircle,
} from 'react-icons/fa';
import AphexChart from 'views/Deal/DealMaster/Donut.js';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards.js';
import {
  AMBER_500,
  BLUE_500,
  EMERALD_300,
  RED_500,
} from 'views/Controls/Dashboard/constants/tw_colors.js';
import { PROGRAMMING_DASHBOARD_SHORTCUTS } from 'views/Controls/Dashboard/constants/dashboardShortcuts.js';
import DashboardHeader from 'views/Controls/Dashboard/DashboardHeader.js';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { PiTelevisionLight } from 'react-icons/pi';
import { FaFileCircleCheck } from 'react-icons/fa6';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable.js';
import Loader from 'views/Controls/Loader.js';
import {
  mdiAlarmBell,
  mdiMotionPlayOutline,
  mdiPlayBoxLockOpenOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { useNavigate } from 'react-router-dom';
import CalendarForSchedule from 'components/ui/DatePicker/CalendarForSchedule.js';
import { apiGetPromomaster } from 'services/SchedulingService.js';
import { parseDurationE } from 'views/Controls/GLOBALFUNACTION.js';
import VideoPlayer from './ContentMaster/VideoPlayer.js';
import { CLIENT } from 'views/Controls/clientListEnum.js';

const { TabNav, TabList, TabContent } = Tabs;
const TooblbarOption = { groupBy: false, manageColumns: false };
export default function Programming() {
  const direction = useSelector((state) => state.theme.direction);
  const channel = useSelector((state) => state.locale.selectedChannel);
  const ChannelSetting = useSelector((state) => state.auth.session.ChannelSetting);
  const IsChannelwise = channel.label === CLIENT.USA_Forbes;
  const columns = useMemo(
    () => [
      {
        header: 'Content Caption',
        accessorKey: 'PromoCaption',
        cell: (props) => {
          const row = props.row.original;
          const handleImageClick = () => {
            setDialogImage(row); // Set the image URL for the dialog
            setIsOpen(true); // Open the dialog
          };
          return (
            <Tooltip title={row.PromoCaption}>
              <div className="flex items-center" onClick={handleImageClick}>
                <Badge
                  style={{ minWidth: '9px', marginRight: 10 }}
                  className={STATUS_COLOR[row.IsActive]}
                />
                <img
                  src={row.Promo_Image}
                  style={{
                    height: '30px',
                    width: '30px',
                  }}
                  className="hover:opacity-80 cursor-pointer"
                // Handle click event to open dialog
                />

                <span
                  className="ml-2 rtl:mr-2 capitalize"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '300px',
                  }}
                >
                  {row.PromoCaption}
                </span>
              </div>
            </Tooltip>
          );
        },
      },
      {
        header: 'Video ID',
        accessorKey: 'VideoID',
      },
      {
        header: 'Content Duration',
        accessorKey: 'PromoDuration',
      },
    ],
    [],
  );
  const [RunningProgramData, setRunningProgramData] = useState([]);
  const [ManagedColumnTopPromo, setManagedColumnTopPromo] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const [topPromoList, setTopPromoList] = useState([]);
  const [totalPromoList, setTotalPromoList] = useState('');
  const [mostPlayedList, setMostPlayedList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState({});
  const [externalGlobalFilter, setExternalGlobalFilter] = useState('');
  const [videoShow, setvideoShow] = useState(false);

  const STATUS_COLOR = {
    1: 'bg-emerald-500',
    0: 'bg-red-500',
  };
  const navigate = useNavigate();
  useEffect(() => {
    (async (values) => {
      setRunningProgramData([]);
      const params = {
        par_LocationCode: channel.LocationCode,
        par_ChannelCode: channel.ChannelCode,
        par_TelecastDate: new Date().toISOString().slice(0, 10),
      };
      const resp = await apiCallstoreprocedure('RunningPrograms', params);
      setRunningProgramData(resp.data);
    })();
    if (IsChannelwise) {
      (async (values) => {
        try {
          const resp = await apiCallstoreprocedure(
            'usp_TomorrowPlaySummary',
            {
              par_LocationCode: channel.LocationCode,
              par_Channelcode: channel.ChannelCode,
              par_TelecastDate: convertDateToYMD(currentDate),
            },

          );

          setDashBoradCardData(resp.data);
        } catch (error) {
          setDashBoradCardData([]);
          // alert('hello');
        }
      })();

      GetPromos();
    }
  }, [channel]);

  const COLORS = [
    { color: EMERALD_300 },
    { color: BLUE_500 },
    { color: AMBER_500 },
    { color: RED_500 },
  ];
  const GetPromos = async () => {
    setshowLoader(true);
    const Parameters = {
      LocationCode: channel.LocationCode,
      ChannelCode: channel.ChannelCode,
    };

    try {
      const resp = await apiGetPromomaster(Parameters);
      if (resp.status === 204) {
        // No data returned
        setTopPromoList([]);
        setMostPlayedList([]);
        setTotalPromoList('');
      } else {
        const { Active, InActive, data } = resp.data;
        const topPromo = data.slice(0, 10); // First 10
        const mostPlayed = data.slice(10, 20); // Next 10
        setTopPromoList(topPromo);
        setMostPlayedList(mostPlayed);
        setTotalPromoList(Active + InActive);
      }
    } catch (error) {
      console.error('Error fetching promos:', error);
      // Handle different error responses
      if (error.response?.status === 0) {
        setTopPromoList([]);
        setMostPlayedList([]);
        setTotalPromoList('');
      }
    } finally {
      // Ensure loader is always hidden
      setshowLoader(false);
    }
  };

  const [DashBoardDoughnut, setDashBoardDoughnut] = useState([]);
  const [DashBoradCardData, setDashBoradCardData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    (async (values) => {
      try {
        const resp = await apiCallstoreprocedure(
          'USP_DailyInventoryStatus',
          {
            LocationCode: channel.LocationCode,
            ChannelCode: channel.ChannelCode,
            FPCDate: convertDateToYMD(currentDate),
          },

        );
        // FPCDate: convertDateToYMD(currentDate),
        console.log('resp.data apiDashboardDoughnut,', resp.data);
        const transformedData = resp.data
          // .filter((item) => item.ReportType === 'DealType') // Filter only items where ReportType is "DealType"
          .map((item, index) => ({
            name: item.ContentStatus, // Use FieldType as name
            quantity: item.Duration,
            color: COLORS[index].color, // Use FieldAmount as quantity
          }));
        setDashBoardDoughnut(transformedData);
      } catch (error) {
        setDashBoardDoughnut([]);
        // alert('hello');
      }
    })();
  }, [currentDate, channel]);

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
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <>
      <Loader showLoader={showLoader} />
      <DashboardHeader
        Name={IsChannelwise ? 'Scheduler Dashboard' : 'Programming Dashboard'}
        Page={'Programming'}
        Links={'Programming'}
      />

      {IsChannelwise && (
        <div className="grid grid-cols-6 gap-4 mb-4">
          <div className="dark:!bg-[#1f2639] !bg-[#fff] p-4 col-span-2">
            <div
              className="list-group-item mx-2 mt-1"
              style={{ borderRadius: '3px 3px 0 0' }}
            >
              <div className="flex mb-0">
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  className="dark:!text-amber-400 !text-amber-400 "
                >
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                  })}
                </p>

                <p
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 5,
                  }}
                  className="dark:!text-gray-400 !text-gray-600"
                >
                  ,{' '}
                  {new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                  })}{' '}
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
            </div>
            <div
              className={classNames('overflow-y-auto')}
              style={{
                height: 180,
                marginTop: '5px',
              }}
            >
              <ScrollBar direction={direction}>
                {RunningProgramData.length > 0 && (
                  <>
                    {RunningProgramData.map((item, key) => (
                      <div
                        className="list-group-item flex dark:text-white text-gray-600 dark:border-b dark:border-gray-600 border-b border-gray-400 "
                        style={{
                          padding: '.75rem .75rem',
                        }}
                        key={key}
                      >
                        <Badge
                          className="mr-3 mt-1 w-3 h-3"
                          innerClass="bg-emerald-500"
                        />
                        <div>
                          <label style={{ display: 'flex' }}>
                            {item.TelecastTime}
                            {key == 0 && (
                              <span className="font-bold text-amber-600  ml-4 animate-bounce w-6 h-6">
                                Running
                              </span>
                            )}
                          </label>
                          <p className="mb-0 text-sm">{item.EventCaption}</p>
                          <p className="mb-0 text-muted text-xs">
                            <strong className="dark:!text-gray-400 !text-gray-800">
                              {item.EventDuration}
                            </strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </ScrollBar>
            </div>
          </div>

          <div
            className="col-span-2 px-5 dark:!bg-[#1f2639] !bg-[#fff] flex items-center justify-center w-full cursor-pointer animate__animated onlythis "
            onClick={() => navigate('/contentmasters')}
          >
            <div>
              <div className="flex items-center justify-center">
                <Icon
                  path={mdiMotionPlayOutline}
                  size={2.5}
                  style={{
                    color: '#45AAF2',
                  }}
                />
              </div>
              <p className="text-2xl flex items-center justify-center">
                Content
              </p>
              <div className="flex items-center justify-center">
                <p className="text-base text-red-500">Total Content -</p>
                <span className="badge ml-2">{totalPromoList}</span>
              </div>
            </div>
          </div>

          <div
            className="h-64 bg-black col-span-2 p-4 bg-no-repeat bg-center bg-cover block rounded-md"
            style={{
              backgroundImage: 'url(./bg3.png)',
            }}
          >
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div className=" col-span-1 ">
                <h3 className="!text-amber-500">{channel.label}</h3>
              </div>
              <div className=" col-span-1  flex justify-end items-center">
                <h4 className="!text-[#e1dddd] flex items-center">
                  {new Date(
                    new Date().setDate(new Date().getDate() + 1),
                  ).toLocaleDateString('en-US', options)}
                </h4>
              </div>
            </div>
            <div
              className="flex mt-8"
              style={{ justifyContent: 'space-evenly' }}
            >
              {/* {JSON.stringify(DashBoradCardData)} */}
              {[
                {
                  label: 'Total Promo',
                  name: 'Content',
                  icon: mdiPlayBoxLockOpenOutline,
                  color: '#F55C52',
                },
                {
                  label: 'Total Duration',
                  name: 'Duration',
                  icon: mdiAlarmBell,
                  color: '#df79e8',
                },
              ].map(({ label, icon, color, name }, index) => (
                <div key={index} className="text-center">
                  <Icon
                    path={icon}
                    size={2.5}
                    style={{
                      color,
                      marginLeft: 25,
                    }}
                  />
                  <h4 className="w-[110px] text-xl font-thin">{name}</h4>
                  <h4 className="text-3xl w-[110px]">
                    {Math.round(DashBoradCardData.find((item) => item.TypeName === label)
                      ?.EventType || 0)}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {channel.label !== CLIENT.USA_Forbes && (
        <div
          className={`grid grid-cols-${PROGRAMMING_DASHBOARD_SHORTCUTS.length - 1} gap-4`}
        >
          <DashboardShortcutCards shortcuts={PROGRAMMING_DASHBOARD_SHORTCUTS.filter((item) => CLIENT.INDIA_SPORTS == channel.label ? item.link != 'ContentContractMaster' : item.link != 'EventTeamPlaner')} />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div
          style={{
            borderRadius: '.5rem',
            padding: '10px',
          }}
          className="col-span-1 px-5 dark:!bg-[#1f2639] !bg-[#fff]"
        >
          <Tabs defaultValue="tab1">
            <TabList>
              <TabNav value="tab1" icon={<PiTelevisionLight />}>
                {IsChannelwise ? 'Playlist Template' : 'FPC Status'}
              </TabNav>
              {channel.label != CLIENT.USA_Forbes && (
                <TabNav value="tab2" icon={<FaFileCircleCheck />}>
                  Daily FPC
                </TabNav>
              )}
              {IsChannelwise && (
                <TabNav value="tab3" icon={<FaFileCircleCheck />}>
                  Playlist
                </TabNav>
              )}
            </TabList>

            <TabContent value="tab1">
              <div className="mt-4 p-4">
                <CalendarForProgram
                  multipleSelection
                  value={''}
                  name={channel.label == CLIENT.USA_Forbes ? 'FPC_NEW' : 'FPC'}
                />
              </div>
            </TabContent>
            <TabContent value="tab2">
              <div className="mt-4 p-4">
                <CalendarForProgram multipleSelection value={''} name="Daily" />
              </div>
            </TabContent>
            <TabContent value="tab3">
              <div className="mt-4 p-4">
                <CalendarForSchedule
                  multipleSelection
                  value={''}
                  name="Final"
                />
              </div>
            </TabContent>
          </Tabs>
        </div>
        {IsChannelwise && (
          <div
            style={{
              borderRadius: '.5rem',
              padding: '10px',
            }}
            className="col-span-2 px-5 dark:!bg-[#1f2639] !bg-[#fff] h-full"
          >
            <Tabs defaultValue="tab1">
              <TabList>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <TabNav value="tab1" icon={<PiTelevisionLight />}>
                      Top Content
                    </TabNav>
                    <TabNav value="tab2" icon={<MdOutlineSlowMotionVideo />}>
                      Most Played
                    </TabNav>
                  </div>
                  <Input
                    className="w-96"
                    placeholder="Search All Columns"
                    onChange={(e) => setExternalGlobalFilter(e.target.value)}
                    size="sm"
                  />
                </div>
              </TabList>
              <div className="p-4">
                <TabContent value="tab1">
                  <div className="h-[310px] overflow-scroll">
                    <ReportsTable
                      tableData={topPromoList}
                      originalColumns={columns}
                      toolbarOptions={TooblbarOption}
                      managedColumns={ManagedColumnTopPromo}
                      setManagedColumns={setManagedColumnTopPromo}
                      exportFileName="Top Content"
                      columnsToFormatInINR={[]}
                      tableName="Top Content"
                      externalGlobalFilter={externalGlobalFilter}
                    />
                  </div>
                </TabContent>

                <TabContent value="tab2">
                  <div className="h-[310px] overflow-scroll">
                    <ReportsTable
                      tableData={mostPlayedList}
                      originalColumns={columns}
                      toolbarOptions={TooblbarOption}
                      managedColumns={ManagedColumnTopPromo}
                      setManagedColumns={setManagedColumnTopPromo}
                      exportFileName="Most Played"
                      columnsToFormatInINR={[]}
                      tableName="Most Played"
                      externalGlobalFilter={externalGlobalFilter}
                    />
                  </div>
                </TabContent>

                <TabContent value="tab3">
                  <p>
                    In C++ its harder to shoot yourself in the foot, but when
                    you do, you blow off your whole leg. (Bjarne Stroustrup)
                  </p>
                </TabContent>
              </div>
            </Tabs>
          </div>
        )}
        {channel.label != CLIENT.USA_Forbes && (
          <div
            style={{
              borderRadius: '.5rem',
              padding: '10px',
            }}
            className="col-span-1  dark:!bg-[#1f2639] !bg-[#fff]"
          >
            <div className="grid grid-cols-3 gap-1  px-2">
              <h5 className=" col-span-3 pb-4 mb-2 border-b border-gray-700 flex items-center">
                <FaChartBar className="mr-2" size={23} /> Inventory Status{' '}
                <p className="ml-2 text-sm">(Min)</p>
              </h5>
              <div className="flex justify-between items-center col-span-3">
                <div
                  className="p-2 rounded hover:bg-sky-700  cursor-pointer"
                  onClick={handlePreviousMonth}
                >
                  <FaChevronLeft />
                </div>
                <div className="text-xl font-black dark:text-blue-50 text-gray-600">
                  {formattedDate}
                </div>
                <div
                  className="p-2 rounded hover:bg-sky-700  cursor-pointer"
                  onClick={handleNextMonth}
                >
                  <FaChevronRight />
                </div>
              </div>
              <div className="col-span-3 flex justify-center">
                <div>
                  <AphexChart data={DashBoardDoughnut} />
                </div>
              </div>

              <div className="col-span-3 flex justify-center">
                <div className="grid grid-cols-2 gap-1">
                  {DashBoardDoughnut.map((item, key) => (
                    <div
                      className="text-center"
                      style={{
                        border: '2px solid #86797970',

                        borderRadius: 5,
                        width: 150,
                      }}
                    >
                      <p key={key} className="flex items-center justify-center">
                        <p
                          className="mr-2"
                          style={{
                            backgroundColor: item.color,
                            height: 10,
                            width: 10,
                            borderRadius: '9999px',
                          }}
                        />
                        {item.name}
                      </p>
                      <p className="text-lg font-semibold dark:text-blue-50 text-gray-600">
                        {item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}{' '}
        {channel.label != CLIENT.USA_Forbes && (
          <div className="dark:!bg-[#1f2639] !bg-[#fff] p-4">
            <div
              className="list-group-item mx-2 mt-1"
              style={{ borderRadius: '3px 3px 0 0' }}
            >
              <div className="flex mb-0">
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                  }}
                  className="dark:!text-amber-400 !text-amber-400 "
                >
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                  })}
                </p>

                <p
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginLeft: 5,
                  }}
                  className="dark:!text-gray-400 !text-gray-600"
                >
                  ,{' '}
                  {new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                  })}{' '}
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
            </div>
            <div
              className={classNames('overflow-y-auto')}
              style={{
                height: 300,
                marginTop: '5px',
              }}
            >
              <ScrollBar direction={direction}>
                {RunningProgramData.length > 0 && (
                  <>
                    {RunningProgramData.map((item, key) => (
                      <div
                        className="list-group-item flex dark:text-white text-gray-600 dark:border-b dark:border-gray-600 border-b border-gray-400 "
                        style={{
                          padding: '.75rem .75rem',
                        }}
                        key={key}
                      >
                        <Badge
                          className="mr-3 mt-1 w-3 h-3"
                          innerClass="bg-emerald-500"
                        />
                        <div>
                          <label style={{ display: 'flex' }}>
                            {item.TelecastTime}
                            {key == 0 && (
                              <span className="font-bold text-amber-600  ml-4 animate-bounce w-6 h-6">
                                Running
                              </span>
                            )}
                          </label>
                          <p className="mb-0 text-sm">{item.EventCaption}</p>
                          <p className="mb-0 text-muted text-xs">
                            <strong className="dark:!text-gray-400 !text-gray-800">
                              {item.EventDuration}
                            </strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </ScrollBar>
            </div>
          </div>
        )}
      </div>

      <Dialog
        isOpen={isOpen}
        width={1000}
        height={650}
        onClose={() => {
          setIsOpen(!isOpen);
          setvideoShow(false);
        }}
      >
        {isOpen && (
          <div className="w-full h-full  ">
            {/* {JSON.stringify(dialogImage)} */}
            <div className="flex ">
              <div className="w-9/12 mr-5">
                <div className="flex items-center mt-5">
                  <Avatar size="sm" src="FAV.png" />
                  <h6
                    className="ml-2 "
                    style={{ letterSpacing: 6, color: 'rgb(127, 132, 138)' }}
                  >
                    Content
                  </h6>
                </div>
                <h1 className="mt-5 font-outfit  font-medium ">
                  {dialogImage?.PromoCaption}
                </h1>
                <div className="flex mt-5 ml-1">
                  <h5 className="mr-1">
                    {Math.floor(
                      parseDurationE(Number(ChannelSetting[0].FramePerSec), dialogImage?.PromoDuration) / 60,
                    )}{' '}
                    Hr
                  </h5>
                  <h5>{parseDurationE(Number(ChannelSetting[0].FramePerSec), dialogImage?.PromoDuration) % 60} Min</h5>
                </div>
                <div className="flex  items-center mt-5">
                  <div
                    style={{
                      height: 30,
                      border: '1px solid #f6e6e61a',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '18px 25px',
                      background: '#00000029',
                      color: 'white',
                    }}
                  >
                    {dialogImage.PromoTypeName}
                  </div>
                  <p
                    className=" font-outfit  font-medium ml-2 mr-2"
                    style={{
                      height: 30,
                      border: '1px solid #f6e6e61a',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '18px 25px',
                      background: '#00000029',
                      color: 'white',
                    }}
                  >
                    {dialogImage.VideoID}
                  </p>
                  {/* <Tooltip title="Play Video">
                    <FaPlayCircle
                      className="text-4xl cursor-pointer hover:text-sky-700"
                      onClick={() => setvideoShow(true)}
                    />
                  </Tooltip> */}
                </div>
              </div>
              <div className="flex justify-center mt-10">
                {videoShow ? (
                  <VideoPlayer link={dialogImage?.MetaData} />
                ) : dialogImage.Promo_Image ? (
                  <img
                    src={dialogImage?.Promo_Image}
                    style={{
                      height: 300,
                      width: 300,
                    }} // Handle click event to open dialog
                  />
                ) : (
                  <img
                    src={'/img/3204121.jpg'}
                    style={{
                      height: 300,
                      width: 300,
                    }} // Handle click event to open dialog
                  />
                )}
              </div>
            </div>
            <h3 className="mt-7 font-outfit font-extrabold"> Synopsis</h3>
            <p className="mt-2 font-outfit  font-medium">
              {dialogImage?.LongSynopsis}
            </p>
          </div>
        )}
      </Dialog>
    </>
  );
}
