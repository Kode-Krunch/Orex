import { useState, useEffect, useRef, useMemo } from 'react';
import { Tooltip, Button, Card, Drawer } from 'components/ui';
import { HiOutlinePencil, HiPlusCircle } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import InputwithVoice from 'components/ui/Input/InputwithVoice';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import Loader from 'views/Controls/Loader';
import {
  apiGetContentmaster,
  apiGetSubGenremasterDrop,
} from 'services/ProgrammingService';
import { MdEdit, MdOutlineDesktopAccessDisabled } from 'react-icons/md';
import { VscVmActive } from 'react-icons/vsc';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DrawerFooter from 'views/Controls/DrawerFooter';
import EventAddEdit from './EventAddEdit';
import { apiGetLanguagemaster } from 'services/MasterService';
import DashboardCards from './DashboardCards';
import { IoTrophyOutline } from 'react-icons/io5';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import EventEdit from './EventEdit';
import { format } from 'date-fns';
import { TbArrowMerge } from 'react-icons/tb';
import { viewsEnum } from 'views/Programming/ManageEvents/enum';
import AddEditEvent from 'views/Programming/ManageEvents/components/AddEditEvent';
import { apiGetcontentwiseevent } from 'services/EventPlannerService';
import { FiTrash2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import TeamMapping from 'views/Programming/ManageEvents/components/TeamMapping';
import {
  apiGetLocalEventMasterDrop,
  apiGetLocalEventMasterDropBySubGenre,
} from 'services/EventServices';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const HeaderExtraContent = ({
  externalGlobalFilter,
  setGlobalFilter,
  setCurView,
  curView,
  resetPage,
}) => (
  <div className="flex items-center gap-2">
    <InputwithVoice
      value={externalGlobalFilter}
      placeholder="Search events..."
      size="sm"
      onChange={(e) =>
        /^[0-9a-zA-Z\s]*$/.test(e.target.value) &&
        setGlobalFilter(e.target.value)
      }
    />

    {curView === viewsEnum.HOME && (
      <Button
        variant="solid"
        size="sm"
        icon={<HiPlusCircle />}
        onClick={() => {
          setCurView(viewsEnum.ADD);
          // seteditData({});
        }}
      >
        Add Event
      </Button>
    )}
    {(curView === viewsEnum.EDIT || curView === viewsEnum.ADD) && (
      <Button
        // variant="solid"
        size="sm"
        icon={<FiTrash2 />}
        onClick={resetPage}
      >
        Discard
      </Button>
    )}
  </div>
);

const EventMaster = () => {
  const { selectedChannel: channel } = useSelector((state) => state.locale);
  const [editData, seteditData] = useState(['']);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentMonthCount, setCurrentMonthCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [curView, setCurView] = useState(viewsEnum.HOME);
  const [languages, setLanguages] = useState([]);
  const [subGenres, setSubGenres] = useState([]);
  const [localevent, setLocalEvent] = useState([]);
  const [externalGlobalFilter, setExternalGlobalFilter] = useState('');
  const [managedColumns, setManagedColumns] = useState([]);
  const [clickedActionRowData, setClickedActionRowData] = useState(null);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'ContentName',
        header: 'ContentName',
        cell: (prop) => (
          <div className="flex items-center gap-1.5">
            <img
              height={25}
              width={25}
              className="rounded-full"
              alt=""
              src={prop.row.original.Content_Image}
            />
            <p>{prop.row.original.ContentName}</p>
          </div>
        ),
      },
      {
        accessorKey: 'SubGenreMaster',
        header: 'SubGenre',
        cell: (prop) => (
          <div className="flex items-center gap-1.5">
            <p>{prop?.row?.original?.SubGenreMaster?.SubGenreName}</p>
          </div>
        ),
      },
      {
        accessorKey: 'Language',
        header: 'Language',
        cell: (prop) => (
          <div className="flex items-center gap-1.5">
            <p>{prop?.row?.original?.Language?.LanguageName}</p>
          </div>
        ),
      },
      {
        accessorKey: 'FPCReleaseDate',
        header: 'FPCReleaseDate',
        cell: (prop) =>
          format(new Date(prop?.row?.original?.FPCReleaseDate), 'yyyy-MM-dd'),
      },
      {
        accessorKey: 'SlotDuration',
        header: 'SlotDuration',
      },
      {
        header: 'Action',
        accessorKey: 'action',
        actions: [
          {
            action: (rowIndex, rowData) => {
              return (
                <div className="text-xs font-medium !w-max">
                  <div className="flex gap-2 justify-center">
                    <Tooltip title={'Edit Event'} placement="top">
                      <Button
                        size="xs"
                        icon={<MdEdit />}
                        onClick={() => {
                          setIsDrawerOpen(true);
                          seteditData(rowData);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={'Edit Group'} placement="top">
                      <Button
                        size="xs"
                        icon={<TbArrowMerge />}
                        onClick={async () => {
                          const resp = await apiGetcontentwiseevent(rowData);
                          if (!resp.data)
                            openNotification(
                              'danger',
                              'Something went wrong while fetching content information',
                            );
                          setCurView(viewsEnum.EDIT);
                          setClickedActionRowData(resp.data);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="View Contents" placement="top">
                      <Button
                        size="xs"
                        icon={<FaRegEye />}
                        onClick={async () => {
                          const resp = await apiGetcontentwiseevent(rowData);
                          setCurView(viewsEnum.MAP_TEAMS);
                          setClickedActionRowData(resp.data);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            },
          },
        ],
      },
    ],
    [],
  );

  /* HELPER FUNCTIONS */
  const resetPage = () => {
    setClickedActionRowData(null);
    setCurView(viewsEnum.HOME);
    setShowLoader(false);
  };
  useEffect(() => {
    hideStackedSideNav_secondary();
    fetchEvents();
    (async () => {
      const Language = await apiGetLanguagemaster();
      const formattedOptions = Language.data.map((option) => ({
        value: option.LanguageCode,
        label: option.LanguageName,
      }));
      setLanguages(formattedOptions);
    })();
    (async () => {
      const SubGenre = await apiGetSubGenremasterDrop(
        channel.LocationCode,
        channel.ChannelCode,
      );
      const formattedOptions = SubGenre.data.map((option) => ({
        value: option.SubGenreCode,
        label: option.SubGenreName,
      }));
      setSubGenres(formattedOptions);
    })();

    // (async () => {
    //   const LocalEvent = await apiGetLocalEventMasterDropBySubGenre(SubGenre);
    //   const formattedOptions = LocalEvent.data.map((option) => ({
    //     value: option.LocalEventCode,
    //     label: option.LocalEventName,
    //   }));
    //   setLocalEvent(formattedOptions);
    // })();
  }, [channel]);

  const formikRef = useRef();
  const formSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };
  const onDrawerClose = async () => {
    setIsDrawerOpen(false);
    fetchEvents();

    seteditData(['']);
  };
  const fetchEvents = async () => {
    setShowLoader(true);
    try {
      const params = {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
        IsGroup: 1,
      };
      const resp = await apiGetContentmaster(params);
      const events = resp.status === 204 ? [] : resp.data;

      setData(events);
      filterEvents(events, externalGlobalFilter);
      calculateCurrentMonthCount(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      setData([]);
      setFilteredData([]);
    } finally {
      setShowLoader(false);
    }
  };

  const calculateCurrentMonthCount = (events) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const count = events.filter((event) => {
      const addedOn = new Date(event.AddedOn);
      return (
        addedOn.getFullYear() === currentYear &&
        addedOn.getMonth() === currentMonth
      );
    }).length;
    setCurrentMonthCount(count);
  };

  const filterEvents = (events, filter) => {
    const filtered = filter
      ? events.filter((event) =>
          event.ContentName.toLowerCase().includes(filter.toLowerCase()),
        )
      : events;
    setFilteredData(filtered);
  };

  const handleFilterByCard = (filterType) => {
    console.log(data.filter((item) => item.IsActive === 1));

    switch (filterType) {
      case 'Total Event':
        setFilteredData(data);
        break;
      case 'Active Event':
        setFilteredData(data.filter((item) => item.IsActive === 1));
        break;
      case 'InActive Event':
        setFilteredData(data.filter((item) => item.IsActive === 0));
        break;
      case 'Current Month Added':
        setFilteredData(
          data.filter((event) => {
            const addedOn = new Date(event.AddedOn);
            return (
              addedOn.getFullYear() === new Date().getFullYear() &&
              addedOn.getMonth() === new Date().getMonth()
            );
          }),
        );
        break;
      default:
        setFilteredData(data);
    }
  };

  useEffect(() => {
    filterEvents(data, externalGlobalFilter);
  }, [externalGlobalFilter, data]);

  return (
    <Card
      header={<HeaderExtra />}
      headerExtra={
        <HeaderExtraContent
          externalGlobalFilter={externalGlobalFilter}
          setGlobalFilter={setExternalGlobalFilter}
          setCurView={setCurView}
          curView={curView}
          resetPage={resetPage}
        />
      }
      className="flex flex-col h-full"
      bodyClass="grow"
      style={{ overflow: 'scroll' }}
    >
      {curView == viewsEnum.ADD ? (
        <EventAddEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData}
          languages={languages}
          subGenres={subGenres}
          stepperShow
        />
      ) : curView == viewsEnum.HOME ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            <DashboardCards
              title="Total Event"
              desc="Total events in the system"
              value={data.length}
              icon={<IoTrophyOutline />}
              iconColor="!bg-blue-600/50"
              onClick={handleFilterByCard}
            />
            <DashboardCards
              title="Active Event"
              desc="Events ready for scheduling"
              value={data.filter((item) => item.IsActive === 1).length}
              icon={<VscVmActive />}
              iconColor="!bg-green-600/50"
              onClick={handleFilterByCard}
            />
            <DashboardCards
              title="Inactive Event"
              desc="Inactive events"
              value={data.filter((item) => item.IsActive === 0).length}
              icon={<MdOutlineDesktopAccessDisabled />}
              iconColor="!bg-red-600/50"
              onClick={handleFilterByCard}
            />
            <DashboardCards
              title="Current Month"
              desc="Events added this month"
              value={currentMonthCount}
              icon={<MdOutlineDesktopAccessDisabled />}
              iconColor="!bg-amber-600/50"
              onClick={handleFilterByCard}
            />
          </div>
          <ReportsTable
            tableData={filteredData}
            originalColumns={columns}
            managedColumns={managedColumns}
            setManagedColumns={setManagedColumns}
            exportFileName="EventMaster"
            columnsToFormatInINR={[]}
            tableName="EventMasterDashboardTable"
            externalGlobalFilter=""
          />
        </>
      ) : curView == viewsEnum.EDIT ? (
        <AddEditEvent
          curView={curView}
          setShowLoader={setShowLoader}
          clickedActionRowData={clickedActionRowData}
          resetPage={resetPage}
          isHeaderShow={false}
        />
      ) : (
        <TeamMapping
          channel={channel}
          resetPage={resetPage}
          eventDetails={clickedActionRowData}
          setShowLoader={setShowLoader}
          isHeaderVisible={false}
        />
      )}
      <Loader showLoader={showLoader} />
      <Drawer
        title={
          <p className="text-xl font-medium text-black flex">
            <center>
              <Button size="xs" variant="twoTone" icon={<HiOutlinePencil />} />
            </center>
            &nbsp;&nbsp; Edit Event Master
          </p>
        }
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onRequestClose={() => setIsDrawerOpen(false)}
        width={
          window.screen.width > 400
            ? window.screen.width / 3
            : window.screen.width / 1.5
        }
        footer={
          <DrawerFooter
            onCancel={() => setIsDrawerOpen(false)}
            onSaveClick={formSubmit}
          />
        }
      >
        <EventEdit
          ref={formikRef}
          onDrawerClose={onDrawerClose}
          editData={editData} // Pass your editData prop
          languages={languages} // Pass your languages prop
          subGenres={subGenres} // Pass your subGenres prop
        />
      </Drawer>
    </Card>
  );
};

export default EventMaster;
