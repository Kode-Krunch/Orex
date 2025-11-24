import Icon from '@mdi/react';
import { convertDateToYMD } from 'components/validators';
import React, { useEffect, useMemo, useState } from 'react';
import {
  mdiAlarmBell,
  mdiAlertOctagon,
  mdiBullhorn,
  mdiMotionPlayOutline,
  mdiMovieOpenEditOutline,
  mdiPlayBoxLockOpen,
  mdiPlaylistMusicOutline,
} from '@mdi/js';
import { BsInfoLg, BsPersonSquare } from 'react-icons/bs';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { apiCallstoreprocedure } from 'services/CommonService';
import DashboardShortcutCards from 'views/Controls/Dashboard/DashboardShortcutCards';
import {
  AMBER_500,
  BLUE_500,
  EMERALD_300,
  RED_500,
} from 'views/Controls/Dashboard/constants/tw_colors';
import { TbBrandBooking } from 'react-icons/tb';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { Avatar, Button, Input, Tabs, Tooltip } from 'components/ui';
import { useNavigate } from 'react-router-dom';
import { setContent } from 'store/base/commonSlice';
import { HiBackspace } from 'react-icons/hi';
import CardShow from './CardShow';
import { StickyFooter } from 'components/shared';
import Loader from 'views/Controls/Loader';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import {
  CurrencyFormatter,
  FORMATDATE_FOR_EVERY,
} from 'views/Controls/GLOBALFUNACTION';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { getRandomColorClass } from 'views/Billing/BillGeneration/dtat';
import BookingDetailsDialog from 'views/Controls/BookingDetailsDialog/BookingDetailsDialog';
const { TabNav, TabList, TabContent } = Tabs;
const TABLE_COLUMNS_ColumnBookings = [
  {
    header: 'SalesExecutive',
    accessorKey: 'SalesExecutive',
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
  {
    header: 'Agency',
    accessorKey: 'Agency',
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
  {
    header: 'Brand',
    accessorKey: 'Brand',
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
  {
    header: 'FCT',
    accessorKey: 'FCT',
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
  {
    header: 'Revenue',
    accessorKey: 'Revenue',
    cell: (props) => {
      const row = props.row.original;
      return (
        <div>
          <CurrencyFormatter amountString={row.Revenue} />
        </div>
      );
    },
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
  {
    header: 'Deal',
    accessorKey: 'DealCode',
    options: {
      cell: {
        style: {
          paddingBlock: '0px',
        },
      },
    },
  },
];
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

const crdt = new Date();
const last30Days = new Date(crdt);
last30Days.setDate(crdt.getDate() - 60);
const next30Days = new Date(crdt);
next30Days.setDate(crdt.getDate() + 30);

const currentHref = window.location.href; // Get the full URL
const hashPart = currentHref.split('#')[1]; // Get the part after the '#'
const spotBooking = hashPart ? hashPart.split('/')[1] : '';
const Path = spotBooking == 'RoImport' || spotBooking == 'SpotBooking' ? 0 : 1;

const ToolbarOptionsBooking = { groupBy: false, manageColumns: false };
const BookingDashbaord = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentMonthROList, setCurrentMonthROList] = useState([]);
  const [nextMonthROList, setNextMonthROList] = useState([]);
  const [activityOverin30daysROList, setActivityOverin30daysROList] = useState(
    [],
  );
  const [unsavedROList, setUnsavedROList] = useState([]);
  const Channel = useSelector((state) => state.locale.selectedChannel);

  const Dealcolumns = useMemo(
    () => [
      {
        header: 'Deal Number',
        accessorKey: 'DealCode',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div
              className="flex justify-center cursor-pointer"
              style={{
                // border: '1px solid red',
                padding: '5px',
                borderRadius: '100px',
                backgroundColor: '#5B92E633',
                color: '#fff',
                letterSpacing: '0.2px',
                fontWeight: 900,
              }}
              onClick={() => {
                dispatch(
                  setContent({
                    label: `${row.DealCode} | ${row.ClientName} | ${row.AgencyName}`,
                    value: row.DealNumber,
                  }),
                );
                navigate(
                  spotBooking === 'SpotBooking'
                    ? '/BookingDetails'
                    : spotBooking === 'RoImport'
                      ? '/RoImportDetails'
                      : '/NTCBookingDetails',
                );
              }}
            >
              {row.DealCode}
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
      {
        header: 'Client',
        accessorKey: 'ClientName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <div className="flex items-center  ">
                <Avatar
                  size={25}
                  className={`dark:${getRandomColorClass()} ${getRandomColorClass()}`}
                >
                  {row?.ClientName?.slice(0, 1)}
                </Avatar>
                <p className="ml-2 capitalize">{row?.ClientName}</p>
              </div>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
      {
        header: 'Agency',
        accessorKey: 'AgencyName',
        cell: (props) => {
          const row = props.row.original;
          return (
            <div>
              <div className="flex items-center  ">
                {/* <Avatar size={25} className={`${getRandomColor()}`}>
                {row.ClientName.slice(0, 1)}
              </Avatar> */}
                <p className="ml-2 capitalize">{row.AgencyName}</p>
              </div>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },

      {
        header: 'Start Date',
        accessorKey: 'DealPeriodFromDate',
        cell: (props) => {
          const row = props.row.original;
          const res = FORMATDATE_FOR_EVERY(new Date(row.DealPeriodFromDate));
          return (
            <div>
              <div className="flex items-center">
                <p className="ml-2 capitalize">{res}</p>
              </div>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
      {
        header: 'End Date',
        accessorKey: 'DealPeriodToDate',
        cell: (props) => {
          const row = props.row.original;
          const res = FORMATDATE_FOR_EVERY(new Date(row.DealPeriodToDate));
          return (
            <div>
              <div className="flex items-center">
                <p className="ml-2 capitalize">{res}</p>
              </div>
            </div>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },

      {
        header: 'Amount',
        accessorKey: 'TotalAmount',
        cell: (props) => {
          const row = props.row.original;
          const num = row.TotalAmount.toString();
          const CurrencySymbol = row.CurrencySymbol;

          return (
            <p>
              {CurrencySymbol} {Number(num)?.toLocaleString('en-IN')}.00
            </p>
          );
        },
        options: {
          cell: {
            style: {
              paddingBlock: '0px',
            },
          },
        },
      },
    ],
    [],
  );
  const BOOKING_DASHBOARD_SHORTCUTS = [
    {
      key: 'order',
      name: 'This Month ROs',
      nav: 'blue-500',
      count: currentMonthROList.length,
      icon: <FaHandHoldingUsd style={{ fontSize: 35, color: BLUE_500 }} />,
      details:
        'Manage and track active release orders for scheduled advertisements.',
    },
    {
      key: 'order1',
      name: 'Next Month ROs',

      nav: 'red-500',
      count: nextMonthROList.length,
      icon: <BsPersonSquare style={{ fontSize: 35, color: RED_500 }} />,
      details: 'Manage and track release orders scheduled for Next month',
    },
    {
      key: 'order2',
      name: 'Over in 30days',
      nav: 'amber-500',
      count: activityOverin30daysROList.length,
      icon: <BsPersonSquare style={{ fontSize: 35, color: AMBER_500 }} />,
      details: 'Track release orders set to expire within the next 30 days.',
    },
    {
      key: 'order3',
      name: 'Unsaved ROs',
      nav: 'emerald-500',
      count: unsavedROList.length,
      icon: <BsPersonSquare style={{ fontSize: 35, color: EMERALD_300 }} />,
      details: 'Manage Unsaved release orders for scheduled advertisements.',
    },
  ];

  const [managedColumnBookings, setManagedColumnBookings] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [bookingDataColumns] = useState(getTableColumnsWithActions());
  const [dealDataColumns] = useState(Dealcolumns);
  const [SelectedRowBooking, setSelectedRowBooking] = useState('');
  const [dateRange, setDateRange] = useState([last30Days, next30Days]);
  const [activeROList, setActiveROList] = useState([]);
  const [allROList, setALLROList] = useState([]);
  const [bookingSummaryDetails, setBookingSummaryDetails] = useState([]);
  const [showLoader, setShowLoader] = useState([]);
  const [cardName, setCardName] = useState('');
  const [dealExpiresin30Days, setDealExpiresin30Days] = useState(['']);
  const [isBookingDetailsDialogOpen, setIsBookingDetailsDialogOpen] =
    useState(false);
  const [selectedBooking, setSelectedBooking] = useState({
    BookingNumber: '',
    BookingCode: '',
  });

  useEffect(() => {
    try {
      hideStackedSideNav_secondary();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // alert('h');
    FetchApi('USP_ActiveROList', setActiveROList);
    FetchApi('USP_UnsavedROList', setUnsavedROList);
    FetchApi('USP_ActivityOverin30daysROList', setActivityOverin30daysROList);
    FetchApi('USP_BookingSummaryDetails', setBookingSummaryDetails);
    FetchApi('USP_NextMonthROList', setNextMonthROList);
    FetchApi('USP_CurrentMonthROList', setCurrentMonthROList);
    FetchApi('USP_AllROList', setALLROList);
    setCardName('');
  }, [Channel, Path, dateRange]);

  const FetchApi = (name, setFunation) => {
    setShowLoader(true);
    const isntc = Path;
    let data = {};
    data.par_LocationCode = Channel.LocationCode;
    data.par_ChannelCode = Channel.ChannelCode;
    if (name == 'USP_AllROList') {
      data.par_FromBookingDate = convertDateToYMD(dateRange[0]);
      data.par_ToBookingDate = convertDateToYMD(dateRange[1]);
    } else {
      data.par_TelecastDate = convertDateToYMD(new Date());
    }

    data.par_IsNTC = isntc;

    apiCallstoreprocedure(name, data)
      .then((response) => {
        if (response.status == 200) {
          setShowLoader(false);
          setFunation(response.data);
        }

        if (response.status == 204) {
          setShowLoader(false);
          setFunation([]);
        }
      })
      .catch((error) => {
        if (error.response.status) {
          setFunation([]);
          setShowLoader(false);
        }
      });
  };

  useEffect(() => {
    if (SelectedRowBooking) {
      const datas = data.filter(
        (item) => item.BookingNumber == SelectedRowBooking,
      );

      dispatch(setContent(datas[0]));
      navigate(
        spotBooking === 'SpotBooking'
          ? '/BookingDetails'
          : spotBooking === 'RoImport'
            ? '/RoImportDetails'
            : '/NTCBookingDetails',
      );
      setSelectedRowBooking('');
    }
  }, [SelectedRowBooking]);

  function getTableColumnsWithActions() {
    try {
      return [
        {
          header: 'Booking Code',
          accessorKey: 'BookingCode',
          cell: (props) => {
            const row = props.row.original;
            return (
              <div className="flex items-center justify-between gap-2">
                <div
                  className="flex justify-center cursor-pointer dark:!bg-[#5B92E633] !bg-[#070c1333] text-black dark:!text-white px-3 py-1.5"
                  style={{
                    borderRadius: '100px',
                    letterSpacing: '0.2px',
                    fontWeight: 900,
                  }}
                  onClick={() => {
                    setSelectedRowBooking(row.BookingNumber);
                  }}
                >
                  {row.BookingCode}
                </div>
                <Tooltip title="Show Details">
                  <Button
                    shape="circle"
                    icon={<BsInfoLg className="text-xs" />}
                    size="xs"
                    className="!h-5 !w-5 ml-2"
                    onClick={() => handleShowDetailsClick(row)}
                  />
                </Tooltip>
              </div>
            );
          },
          options: {
            cell: {
              style: {
                paddingBlock: '0px',
              },
            },
          },
        },
        {
          header: 'Client',
          accessorKey: 'Client',
          cell: (props) => {
            const row = props.row.original;
            return (
              <div>
                <div className="flex items-center  ">
                  {/* <Avatar size={25} src={'/img/avatars/thumb-8.jpg'}></Avatar> */}
                  <Avatar
                    size={25}
                    className={`dark:${getRandomColorClass()} ${getRandomColorClass()} text-black dark:!text-white`}
                  >
                    {row.Client.slice(0, 1)}
                  </Avatar>
                  <p className="ml-2 capitalize">{row.Client}</p>
                </div>
              </div>
            );
          },
          options: {
            cell: {
              style: {
                paddingBlock: '0px',
              },
            },
          },
        },
        ...TABLE_COLUMNS_ColumnBookings,
      ];
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDealData({
      isApproved: 1,
      isExpiring: 1,
      isRejected: 0,
      procedureName: 'USP_DealDisplay',
    });
  }, []);

  const fetchDealData = async ({
    isApproved = 0,
    isExpiring = 0,
    isRejected = 0,
    procedureName = '',
  }) => {
    if (!procedureName) {
      console.warn('Procedure name is required.');
      return;
    }

    const params = {
      par_IsApproved: isApproved,
      par_IsExpiring: isExpiring,
      par_IsRejected: isRejected,
      par_LocationCode: Channel?.LocationCode,
      par_ChannelCode: Channel?.ChannelCode,
    };

    try {
      const response = await apiCallstoreprocedure(procedureName, params);
      if (response?.data) {
        setDealExpiresin30Days(response.data);
      } else {
        console.warn('No data returned from procedure call.');
      }
    } catch (error) {
      console.error('Error fetching deal data:', error);
    }
  };

  const handleShowDetailsClick = (booking) => {
    setSelectedBooking({
      BookingNumber: booking.BookingNumber,
      BookingCode: booking.BookingCode,
    });
    setIsBookingDetailsDialogOpen(true);
  };

  return (
    <div>
      <Loader showLoader={showLoader} />
      {cardName ? (
        <div className="h-[500px] overflow-scroll">
          {(() => {
            switch (cardName) {
              case 'This Month ROs':
                return (
                  <div>
                    <h3 className="mb-2">{cardName}</h3>
                    <CardShow
                      Data={currentMonthROList}
                      setSelectedRowBooking={setSelectedRowBooking}
                      setData={setCurrentMonthROList}
                    />
                  </div>
                );
              case 'Next Month ROs':
                return (
                  <div>
                    <h3 className="mb-2">{cardName}</h3>
                    <CardShow
                      Data={nextMonthROList}
                      setSelectedRowBooking={setSelectedRowBooking}
                      setData={setNextMonthROList}
                    />
                  </div>
                );
              case 'Unsaved ROs':
                return (
                  <div>
                    <h3 className="mb-2">{cardName}</h3>
                    <CardShow
                      Data={unsavedROList}
                      setSelectedRowBooking={setSelectedRowBooking}
                      setData={setUnsavedROList}
                    />
                  </div>
                );
              case 'Over in 30days':
                return (
                  <div>
                    <h3 className="mb-2">{cardName}</h3>
                    <CardShow
                      Data={activityOverin30daysROList}
                      setSelectedRowBooking={setSelectedRowBooking}
                      setData={setActivityOverin30daysROList}
                    />
                  </div>
                );

              default:
                return null;
            }
          })()}
          <StickyFooter
            className="-mx-8 px-8 flex items-center justify-between py-4"
            stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="md:flex items-center">
              <Button
                className="mx-2"
                size="sm"
                icon={<HiBackspace />}
                //   disabled={step === 0}
                onClick={() => {
                  setCardName('');
                }}
              >
                Back
              </Button>
            </div>
          </StickyFooter>
        </div>
      ) : (
        <div>
          <div
            className={`grid grid-cols-${BOOKING_DASHBOARD_SHORTCUTS.length + 1
              } gap-4`}
          >
            <DashboardShortcutCards
              shortcuts={BOOKING_DASHBOARD_SHORTCUTS}
              StateCall={setCardName}
            />

            <div
              className={`web-card animate__animated p-2 onlythis col-span-1 dark:!bg-[#1f2639] !bg-[#fff] dark:!border-[#374558] dark:!border`}
            >
              <div className="">
                <h4
                  className="flex items-center pb-2 dark:!text-gray-400 text-gray-500"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: 0,
                    borderBottom: '1px solid #9d9d9d7a',
                    borderStyle: 'dashed',
                  }}
                >
                  <TbBrandBooking
                    style={{
                      color: '#F55C52',
                      marginRight: 4,
                      height: 25,
                      width: 25,
                    }}
                  />
                  Next Day Booking
                </h4>

                {bookingSummaryDetails &&
                  bookingSummaryDetails.map((item, index) => (
                    <div
                      className="mt-2 pb-2"
                      style={{
                        borderBottom: '1px solid #9d9d9d7a',
                        borderStyle: 'dashed',
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <p className="flex items-center dark:!text-gray-400 text-gray-500">
                          <Icon
                            path={Consent[index].icon}
                            size={1.2}
                            style={{
                              color: Consent[index].color,
                              marginRight: 4,
                            }}
                          />
                          {item.FieldType}
                        </p>
                        <p className="text-lg font-semibold dark:!text-gray-400 text-gray-500">
                          {item.FieldValue}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="web-card animate__animated onlythis px-2 py-3 dark:!bg-[#1f2639] !bg-[#fff]">
            <Tabs defaultValue="tab3" variant="pill">
              <div className="flex justify-between items-center">
                <TabList>
                  <div className="flex justify-between items-center">
                    <TabNav value="tab1">All Bookings</TabNav>
                    <TabNav value="tab3">Running RO </TabNav>
                    <TabNav value="tab2">RO Over in 30days</TabNav>
                    <TabNav value="tab4">Deal Expires in 30 Days</TabNav>
                    <div className="flex">
                      <TabContent value="tab1">
                        <div className="flex justify-end items-center">
                          <div className="flex">
                            <DatePickerRange
                              value={dateRange}
                              placeholder="Pick date & time"
                              size="sm"
                              className="mr-2"
                              onChange={(e) => setDateRange(e)}
                            />
                          </div>
                        </div>
                      </TabContent>
                    </div>
                  </div>
                </TabList>
                <div className="flex">
                  <Input
                    style={{ width: '200px' }}
                    size="sm"
                    value={globalFilter ?? ''}
                    placeholder="Search"
                    onChange={(e) => {
                      if (/^[0-9a-zA-Z\s/]*$/.test(e.target.value)) {
                        setGlobalFilter(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <TabContent value="tab1">
                <div className="h-[230px] overflow-scroll">
                  <ReportsTable
                    tableData={allROList}
                    toolbarOptions={ToolbarOptionsBooking}
                    originalColumns={bookingDataColumns}
                    managedColumns={managedColumnBookings}
                    setManagedColumns={setManagedColumnBookings}
                    exportFileName="Booking Master"
                    columnsToFormatInINR={[]}
                    externalGlobalFilter={globalFilter}
                  />
                </div>
              </TabContent>

              <TabContent value="tab2">
                <div className="h-[230px] overflow-scroll">
                  <ReportsTable
                    tableData={activityOverin30daysROList}
                    toolbarOptions={ToolbarOptionsBooking}
                    originalColumns={bookingDataColumns}
                    managedColumns={managedColumnBookings}
                    setManagedColumns={setManagedColumnBookings}
                    exportFileName="Booking Master"
                    columnsToFormatInINR={[]}
                    externalGlobalFilter={globalFilter}
                  />
                </div>
              </TabContent>
              <TabContent value="tab3">
                <div className="h-[230px] overflow-scroll">
                  <ReportsTable
                    tableData={activeROList}
                    toolbarOptions={ToolbarOptionsBooking}
                    originalColumns={bookingDataColumns}
                    managedColumns={managedColumnBookings}
                    setManagedColumns={setManagedColumnBookings}
                    exportFileName="Booking Master"
                    columnsToFormatInINR={[]}
                    externalGlobalFilter={globalFilter}
                  />
                </div>
              </TabContent>
              <TabContent value="tab4">
                <div className="h-[230px] overflow-scroll">
                  <ReportsTable
                    tableData={dealExpiresin30Days}
                    toolbarOptions={ToolbarOptionsBooking}
                    originalColumns={dealDataColumns}
                    managedColumns={managedColumnBookings}
                    setManagedColumns={setManagedColumnBookings}
                    exportFileName="Booking Master"
                    columnsToFormatInINR={[]}
                    externalGlobalFilter={globalFilter}
                  />
                </div>
              </TabContent>
            </Tabs>
          </div>
        </div>
      )}
      {isBookingDetailsDialogOpen && (
        <BookingDetailsDialog
          isDialogOpen={isBookingDetailsDialogOpen}
          setIsDialogOpen={setIsBookingDetailsDialogOpen}
          bookingNumber={selectedBooking.BookingNumber}
          bookingCode={selectedBooking.BookingCode}
        />
      )}
    </div>
  );
};

export default BookingDashbaord;
