import { Button, Card, Tabs } from 'components/ui';
import { Column } from 'primereact/column';
import { TreeTable } from 'primereact/treetable';
import React, { useState, useEffect } from 'react';
import { dailyfpcAprovel, dailyfpcAprovelSpots, deletedailyfpcAprovel, Postdailyfpc } from 'services/ProgrammingService';
import Table from 'components/ui/Table';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ContentEdit from '../ContentsegMaster/ContentsegEdit';
import { setContent, setContentSeg } from 'store/base/commonSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HiDotsHorizontal,
} from 'react-icons/hi';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { MdLiveTv, } from 'react-icons/md';
import { BiCameraMovie, } from 'react-icons/bi';
import { theme } from 'twin.macro';
import { RiMovieLine, RiRefreshLine } from 'react-icons/ri';
import { GrDocumentMissing, GrDocumentVideo } from 'react-icons/gr';
import { isScheduleAllowedToEditFn } from 'views/Scheduling/Scheduler/components/SchedulingArea/utils/utils';
import { setdateForm } from 'store/locale/localeSlice';
import { addMinutes, format } from 'date-fns';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { PiExportDuotone } from 'react-icons/pi';
import { IoSaveOutline } from 'react-icons/io5';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Loader from 'views/Controls/Loader';
import WarningDialog from 'views/Controls/WarningDialog';
const { TabNav, TabList, TabContent } = Tabs;
const { Tr, Th, Td, THead, TBody } = Table;
const DailyFPCApp = ({ }) => {
  const twColor = theme`colors`;
  const COLOR_3 = twColor.emerald['300'];
  const COLOR_2 = twColor.blue['500'];
  const COLOR_4 = twColor.amber['500'];
  const COLOR_5 = twColor.red['500'];
  const COLOR_yellow = twColor.yellow['500'];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setdata] = useState(['']);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);
  const mode = useSelector((state) => state.theme.mode);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let SelTelecastDate = queryParams.get('dt');
  const [emptySegmentData, setemptySegmentData] = useState([]);
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false);
  const [TotalOrg, setTotalOrg] = useState(0);
  const [TotalRep, setTotalRep] = useState(0);
  const [TotalLive, setTotalLive] = useState(0);
  const [curTab, setCurTab] = useState('tab1');
  const [isFPCAllowedToEdit, setIsFPCAllowedToEdit] = useState(null);

  const COLUMNS = [
    { header: 'Start Time', accessorKey: 'StartTime', align: 'right' },
    { header: 'End Time', accessorKey: 'EndTime', align: 'right' },
    { header: 'Content', accessorKey: 'ContentName', align: 'right' },
    { header: 'Dur', accessorKey: 'SlotDuration', align: 'right' },
    { header: 'ORG/REP', accessorKey: 'status', align: 'right' },
    { header: 'Season', accessorKey: 'SeasonNo', align: 'right' },
    { header: 'Episode', accessorKey: 'EpisodeNo', align: 'right' },

  ];
  const SaveDailyFPC = async () => {
    setShowLoader(true);
    try {
      if (emptySegmentData.length > 0) {
        openNotification('danger', 'Please create missing segments first.');
        return;
      }
      let transformedArray = data.map(({ data, children }) => ({
        RowNumber: data.RowNumber,
        ContentCode: data.GroupName === 1 ? children?.[0]?.data?.ContentCode : data.ContentCode,
        StartTime: data.StartTime,
        EndTime: data.EndTime,
        SlotDuration: data.SlotDuration,
        OriginalRepeatCode: data.OriginalRepeatCode,
        EpisodeNo: data.EpisodeNo,
        ContentName: data.GroupName === 1 ? children?.[0]?.data?.ContentName : data.ContentName,
        ActualDuration: data.ActualDuration,
        SeasonNo: data.SeasonNo,
        BreakPatternCode: data.BreakPatternCode,
        BreakPattern: data.BreakPattern,
        HouseID: data.HouseID,
        ChannelTimeDescription: data.ChannelTimeDescription,
        Id: data.Id,
        TimeCategoryStartTime: data.TimeCategoryStartTime,
        TimeCategoryEndTime: data.TimeCategoryEndTime,
        MinDiff: data.MinDiff,
        Consumption: data.Consumption,
        LocationCode: data.LocationCode,
        ChannelCode: data.ChannelCode,
        TelecastDate: data.TelecastDate,
      }));
      transformedArray = addNewTelecastDate(transformedArray);
      const response = await Postdailyfpc(transformedArray, token);
      if (response?.data?.code === '200') {
        openNotification('success', 'Added successfully.');
      } else {
        openNotification('danger', response?.data?.message || 'Failed to save FPC.');
      }

    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 500) {
        openNotification('danger', 'Something went wrong. Please try again.');
      } else {
        console.error('SaveDailyFPC error:', error);
        openNotification('danger', 'Something went wrong. Please try again.');
      }
    } finally {
      setShowLoader(false);
    }
  };


  useEffect(() => {
    if (!dialogIsOpen) {
      setShowLoader(true);

      (async () => {
        try {
          let response;

          if (Channel?.ChannelCode === 14) {
            response = await dailyfpcAprovelSpots(
              Channel.LocationCode,
              Channel.ChannelCode,
              SelTelecastDate
            );
          } else {
            response = await dailyfpcAprovel(
              Channel.LocationCode,
              Channel.ChannelCode,
              SelTelecastDate
            );
          }

          const rawData = response?.data || [];
          const transformedData = [];
          const emptySegmentData = [];

          let srMain = 1;
          let srSegment = 1;
          let srEmpty = 1;

          rawData.forEach((item, itemIndex) => {
            const transformedItem = {
              key: `${itemIndex}`,
              data: {
                ...item,
                Sr_NO: srMain++,
                segment: undefined,
                ContentTypeCode: item.ContentTypeCode,
                OriginalRepeatCode: item.OriginalRepeatCode,
              },
            };

            if (item.segment?.length > 0) {
              transformedItem.children = item.segment.map((segment, segIndex) => ({
                key: `${itemIndex}-${segIndex}`,
                data: {
                  ...item,
                  Sr_NO: srSegment++,
                  ContentName: segment.SegmentCaption,
                  StartTime: segment.TCIN,
                  EndTime: segment.TCOUT,
                  ContentCode: segment.ContentCode,
                  EpisodeNo: item.EpisodeNo,
                  SeasonNo: item.SeasonNo,
                  ContentTypeCode: item.ContentTypeCode,
                  open: 'dailyfpc',
                  OriginalRepeatCode: item.OriginalRepeatCode,
                },
              }));
            } else {
              emptySegmentData.push({
                ...item,
                Sr_NO: srEmpty++,
                ContentCode: item.ContentCode,
                ContentName: item.ContentName,
                ContentTypeCode: item.ContentTypeCode,
                StartTime: item.StartTime,
                EndTime: item.EndTime,
                EpisodeNo: item.EpisodeNo,
                SeasonNo: item.SeasonNo,
                open: 'dailyfpc',
                OriginalRepeatCode: item.OriginalRepeatCode,
              });
            }

            transformedData.push(transformedItem);
          });

          // Count types
          const totalOrg = transformedData.filter(item => item.data?.status === 'ORG').length;
          const totalRep = transformedData.filter(item => item.data?.status === 'REP').length;
          const totalLive = transformedData.filter(item => item.data?.IsRecorded === 1).length;

          // Set states
          setTotalOrg(totalOrg);
          setTotalRep(totalRep);
          setTotalLive(totalLive);
          setemptySegmentData(emptySegmentData);
          setdata(transformedData);
        } catch (error) {
          console.error('❌ Error in useEffect -> dailyFPC fetch:', error);
          // Optionally show user feedback with toast or modal
        } finally {
          setShowLoader(false);
        }
      })();
    }
  }, [Channel, SelTelecastDate, dialogIsOpen]);

  useEffect(() => {
    (async () => {
      if (!SelTelecastDate || !Channel || !token) return;
      setIsFPCAllowedToEdit(
        await isScheduleAllowedToEditFn(
          new Date(SelTelecastDate),
          Channel,
          token,
        ),
      );
    })();
  }, [SelTelecastDate, Channel, token]);

  const opendui = (item) => {
    setIsOpen(true);
    console.log(item);
    dispatch(setContent([]));
    dispatch(setContentSeg(item));
  };
  const rowClassName = (rowData) => {
    return {
      'bg-teal-500 text-black': rowData.data?.status === 'ORG',
      'bg-orange-500 text-black': rowData.data?.status === 'REP',
    };
  };

  useEffect(() => {
    const gboxElement = document.getElementsByClassName('Gbox2')[0];
    const gboxElementchild =
      document.getElementsByClassName('Gbox2')[0].children[1];
    dispatch(setdateForm([new Date(SelTelecastDate), 'Daily FPC Approval']));
    if (gboxElement) {
      gboxElement.style.display = 'block';
      gboxElementchild.style.display = 'block';
    } // Optionally, you might want to revert the change when the component unmounts
    return () => {
      if (gboxElement) {
        gboxElement.style.display = 'none';
        gboxElementchild.style.display = 'none';
      }
    };
  }, []);

  const addNewTelecastDate = (data) => {
    let previousNewTelecastDate = null;
    let previousSlotDuration = null;
    return data.map((item, key) => {
      let newTelecastDate;

      if (key === 0) {
        if (item.TelecastDate)
          newTelecastDate = new Date(`${item.TelecastDate}T${item.StartTime}`);
        else newTelecastDate = new Date(item.NewTelecastDate);
      } else {
        newTelecastDate = addMinutes(
          previousNewTelecastDate,
          parseInt(previousSlotDuration),
        );
      }
      previousNewTelecastDate = newTelecastDate;
      previousSlotDuration = item.SlotDuration;
      return {
        ...item,
        RowNumber: key + 1,
        NewTelecastDate: format(
          new Date(newTelecastDate),
          'yyyy-MM-dd HH:mm:ss',
        ),
      };
    });
  };
  const reGenerate = async () => {
    setShowLoader(true);

    try {
      const response = await deletedailyfpcAprovel(
        Channel.LocationCode,
        Channel.ChannelCode,
        SelTelecastDate
      );

      const transformedData = [];
      const emptySegmentData = [];
      let srNoMain = 1;
      let srNoSegment = 1;
      let srNoEmptySegment = 1;

      response.data.forEach((item, mainIndex) => {
        const transformedItem = {
          key: `${mainIndex}`,
          data: {
            ...item,
            Sr_NO: srNoMain++,
            segment: undefined,
            ContentTypeCode: item.ContentTypeCode,
            OriginalRepeatCode: item.OriginalRepeatCode,
          },
        };

        if (item.segment && item.segment.length > 0) {
          transformedItem.children = item.segment.map((segment, segIndex) => ({
            key: `${mainIndex}-${segIndex}`,
            data: {
              ...item,
              Sr_NO: srNoSegment++,
              ContentName: segment.SegmentCaption,
              StartTime: segment.TCIN,
              EndTime: segment.TCOUT,
              ContentCode: segment.ContentCode,
              EpisodeNo: item.EpisodeNo,
              SeasonNo: item.SeasonNo,
              ContentTypeCode: item.ContentTypeCode,
              open: 'dailyfpc',
              OriginalRepeatCode: item.OriginalRepeatCode,
            },
          }));
        } else {
          emptySegmentData.push({
            ...item,
            Sr_NO: srNoEmptySegment++,
            ContentCode: item.ContentCode,
            ContentName: item.ContentName,
            ContentTypeCode: item.ContentTypeCode,
            StartTime: item.StartTime,
            EndTime: item.EndTime,
            EpisodeNo: item.EpisodeNo,
            SeasonNo: item.SeasonNo,
            open: 'dailyfpc',
            OriginalRepeatCode: item.OriginalRepeatCode,
          });
        }

        transformedData.push(transformedItem);
      });

      // Calculate totals
      const totalOrg = transformedData.filter(item => item.data?.status === 'ORG').length;
      const totalRep = transformedData.filter(item => item.data?.status === 'REP').length;
      const totalLive = transformedData.filter(item => item.data?.IsRecorded === 1).length;

      // Update state
      setTotalOrg(totalOrg);
      setTotalRep(totalRep);
      setTotalLive(totalLive);
      setemptySegmentData(emptySegmentData);
      setdata(transformedData);
    } catch (error) {
      console.error('Error in reGenerate:', error);
      // Optionally show an error message to the user
      // toast.error("Failed to regenerate data. Please try again.");
    } finally {
      setShowLoader(false);
      setIsDiscardDialogOpen(false)
    }
  };

  return (
    <Card>
      <Loader showLoader={showLoader} />
      <div className="">
        {dialogIsOpen && <ContentEdit setIsOpen={setIsOpen} />}
        {!dialogIsOpen && (
          <div>
            <div className={`grid grid-cols-1 gap-4 mb-4 mt-2 lg:grid-cols-5`}>
              <div
                className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
                style={{ height: 200 }}
                onClick={() => setCurTab('tab2')}
              >
                <div className="card-bodyR">
                  <div className="flex justify-between">
                    <div className="flex ">
                      {mode === 'dark' ? (
                        <div
                          className={` animate__animated onlythis2 order order1`}
                          style={{}}
                        >
                          <span>
                            <GrDocumentMissing
                              style={{ fontSize: 32, color: COLOR_5 }}
                            />
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          icon={
                            <GrDocumentMissing
                              style={{ fontSize: 32, color: COLOR_5 }}
                            />
                          }
                          className={`!bg-red-500 !bg-opacity-25 !border-transparent`}
                        />
                      )}
                    </div>
                    <div>
                      <HiDotsHorizontal />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-1">
                    <span className="text-lg font-extrabold dark:!text-gray-400 text-black">
                      Missing Segments
                    </span>
                    <h3 className="text-2xl">{emptySegmentData.length}</h3>
                  </div>
                  <div>
                    <p className="text-xs dark:!text-gray-400 text-black">
                      Missing Segments are portions of a program or broadcast
                      that were not aired or were incomplete
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
                style={{ height: 200 }}
                onClick={() => setCurTab('tab1')}
              >
                <div className="card-bodyR">
                  <div className="flex justify-between">
                    <div className="flex ">
                      {mode === 'dark' ? (
                        <div
                          className={` animate__animated onlythis2 order`}
                          style={{}}
                        >
                          <span>
                            <GrDocumentVideo
                              style={{ fontSize: 32, color: COLOR_2 }}
                            />
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          icon={
                            <GrDocumentVideo
                              style={{ fontSize: 32, color: COLOR_2 }}
                            />
                          }
                          className={`!bg-blue-500 !bg-opacity-25 !border-transparent`}
                        />
                      )}
                    </div>
                    <div>
                      <HiDotsHorizontal />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-2">
                    <span className="text-lg font-extrabold dark:!text-gray-400 text-black">
                      Programs
                    </span>
                    <h3 className="text-2xl">{data.length}</h3>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs dark:!text-gray-400 text-black">
                      Program scheduled in FPC defines the broadcast times for
                      shows.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
                style={{ height: 200 }}
              >
                <div className="card-bodyR">
                  <div className="flex justify-between">
                    <div className="flex ">
                      {mode === 'dark' ? (
                        <div
                          className={` animate__animated onlythis2 order order3`}
                          style={{}}
                        >
                          <span>
                            <RiMovieLine
                              style={{ fontSize: 32, color: COLOR_3 }}
                            />
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          icon={
                            <RiMovieLine
                              style={{ fontSize: 32, color: COLOR_3 }}
                            />
                          }
                          className={`!bg-emerald-500 !bg-opacity-25 !border-transparent`}
                        />
                      )}
                    </div>
                    <div>
                      <HiDotsHorizontal />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-2">
                    <span className="text-lg font-extrabold dark:!text-gray-400 text-black">
                      Original Programs
                    </span>
                    <h3 className="text-2xl">{TotalOrg}</h3>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs dark:!text-gray-400 text-black">
                      Original Programs refer to shows that are aired for the
                      first time.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
                style={{ height: 200 }}
              >
                <div className="card-bodyR">
                  <div className="flex justify-between">
                    <div className="flex ">
                      {mode === 'dark' ? (
                        <div
                          className={` animate__animated onlythis2 order order2`}
                          style={{}}
                        >
                          <span>
                            <BiCameraMovie
                              style={{ fontSize: 32, color: COLOR_4 }}
                            />
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          icon={
                            <BiCameraMovie
                              style={{ fontSize: 32, color: COLOR_4 }}
                            />
                          }
                          className={`!bg-amber-500 !bg-opacity-25 !border-transparent`}
                        />
                      )}
                    </div>
                    <div>
                      <HiDotsHorizontal />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-2">
                    <span className="text-lg font-extrabold dark:!text-gray-400 text-black">
                      Repeat Programs
                    </span>
                    <h3 className="text-2xl">{TotalRep}</h3>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs dark:!text-gray-400 text-black">
                      Repeat Programs are previously aired shows broadcast
                      again.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`web-card animate__animated onlythis flex justify-center col-span-1 cursor-pointer  dark:!bg-[#1f2639]
          !bg-[#fff] dark:!border-[#374558]
           dark:!border`}
                style={{ height: 200 }}
              >
                <div className="card-bodyR">
                  <div className="flex justify-between">
                    <div className="flex ">
                      {mode === 'dark' ? (
                        <div
                          className={` animate__animated onlythis2 order order7`}
                          style={{}}
                        >
                          <span>
                            <MdLiveTv
                              style={{ fontSize: 32, color: COLOR_yellow }}
                            />
                          </span>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          icon={
                            <MdLiveTv
                              style={{ fontSize: 32, color: COLOR_yellow }}
                            />
                          }
                          className={`!bg-yellow-500 !bg-opacity-25 !border-transparent`}
                        />
                      )}
                    </div>
                    <div>
                      <HiDotsHorizontal />
                    </div>
                  </div>
                  <div className="flex-grow-1 mt-2">
                    <span className="text-lg font-extrabold dark:!text-gray-400 text-black">
                      Live Program
                    </span>
                    <h3 className="text-2xl">{TotalLive}</h3>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs dark:!text-gray-400 text-black">
                      Live Program refers to a show that is broadcast in
                      real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Tabs value={curTab} onChange={(event) => setCurTab(event)}>
              <div className="flex justify-between items-center border-b-2 border-b-gray-700 mb-3">
                <TabList className="border-b-[0px]">
                  <TabNav value="tab1">FPC</TabNav>
                  <TabNav value="tab2">Missing Segment</TabNav>
                </TabList>
              </div>
              <TabContent value="tab1">
                {' '}
                <div className="mt-2">
                  <TreeTable
                    resizableColumns
                    value={data}
                    tableStyle={{ minWidth: '50rem' }}
                    rowClassName={rowClassName}
                    scrollable
                    scrollHeight="400px"
                  >
                    <Column
                      field="Sr_NO"
                      header="Sr NO"
                      expander
                      style={{
                        width: 100,
                      }}
                      body={(rowData) => {
                        return (
                          <span
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: 600,
                              width: 70,
                            }}
                          >
                            {rowData.data?.Sr_NO}
                          </span>
                        );
                      }}
                    ></Column>
                    <Column
                      field="StartTime"
                      header="Start Time"
                      style={{
                        width: 100,
                      }}
                      body={(rowData) => {
                        return (
                          <p
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: 600,
                              width: 120,
                            }}
                          >
                            {rowData.data?.StartTime}
                          </p>
                        );
                      }}
                    ></Column>
                    <Column
                      field="EndTime"
                      header="End Time"
                      style={{
                        width: 100,
                      }}
                      body={(rowData) => {
                        return (
                          <p
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: 600,
                              width: 120,
                            }}
                          >
                            {rowData.data?.EndTime}
                          </p>
                        );
                      }}
                    ></Column>
                    <Column
                      field="ContentName"
                      header="Content"
                      style={{
                        width: 320,
                      }}
                      body={(rowData) => {
                        return (
                          <p
                            style={{
                              color: 'black',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontSize: 12,
                              fontWeight: 600,
                              padding: 2,
                              margin: 2,
                            }}
                          >
                            {rowData.data?.ContentName}
                          </p>
                        );
                      }}
                    ></Column>
                    <Column
                      field="SlotDuration"
                      header="Dur"
                      style={{ width: 50 }}
                      body={(rowData) => {
                        return (
                          <p
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: 600,
                              width: 70,
                            }}
                          >
                            {rowData.data?.SlotDuration}
                          </p>
                        );
                      }}
                    ></Column>
                    <Column
                      field="status"
                      header="ORG/REP"
                      style={{ width: 100 }}
                      body={(rowData) => {
                        return (
                          <p
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: 600,
                              width: 120,
                            }}
                          >
                            {rowData.data?.status}
                          </p>
                        );
                      }}
                    ></Column>
                    <Column
                      field="SeasonNo"
                      header="Season & Episode "
                      style={{ width: 200 }}
                      body={(rowData) => {
                        return (
                          <p
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {rowData.data?.IsRecorded === 1
                              ? 'LIVE'
                              : rowData.data?.EpisodeSpecific === 0
                                ? rowData.data?.ContentTypeName
                                : `S${rowData.data?.SeasonNo} & E${rowData.data?.EpisodeNo}`}
                          </p>
                        );
                      }}
                    ></Column>
                  </TreeTable>
                </div>
              </TabContent>{' '}
              <TabContent value="tab2">
                <Table borderlessRow={false} overflow={true} className="mt-2">
                  <THead>
                    <Tr>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        Sr No
                      </Th>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        Start Time
                      </Th>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        End Time
                      </Th>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        Content
                      </Th>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        SE & EP
                      </Th>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        ORG / REP
                      </Th>
                      <Th
                        style={{
                          width: 70,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        Action
                      </Th>
                    </Tr>
                  </THead>
                  <TBody>
                    {emptySegmentData.map((item, index) => (
                      <Tr
                        key={index}
                        className={
                          item.status === 'REP'
                            ? 'bg-orange-500 '
                            : 'bg-teal-500 '
                        }
                      >
                        <Td className="dark:text-black border border-current  ">
                          {item.Sr_NO}
                        </Td>
                        <Td
                          style={{
                            width: 70,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                          className="dark:text-black border border-current "
                        >
                          {item.StartTime}
                        </Td>
                        <Td
                          style={{
                            width: 70,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                          className="dark:text-black border border-current "
                        >
                          {item.EndTime}
                        </Td>
                        <Td
                          className="dark:text-black border border-current "
                          style={{
                            width: 70,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {item.ContentName}
                        </Td>
                        <Td
                          className="dark:text-black border border-current "
                          style={{
                            width: 70,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          S{item.SeasonNo} & E{item.EpisodeNo}
                        </Td>
                        <Td
                          className="dark:text-black border border-current "
                          style={{
                            width: 70,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {item.OriginalRepeatCode === 1 ? 'ORG' : 'REP'}
                        </Td>
                        <Td
                          className="dark:text-black border border-current "
                          style={{
                            width: 70,
                            fontWeight: 700,
                          }}
                        >
                          {item.OriginalRepeatCode === 1 ? (
                            // <FaPlusCircle
                            //   onClick={() => opendui(item)}
                            //   className="cursor-pointer"
                            //   style={{ fontSize: 15 }}
                            // />
                            <Button size="xs" variant="twoTone" onClick={() => opendui(item)} icon={<FaPlusCircle />} />
                          ) : (
                            <></>
                          )}
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
              </TabContent>
            </Tabs>
          </div>
        )}
        <Button
          label="Save"
          size="sm"
          icon={<IoIosArrowRoundBack />}
          className="mt-6 mr-2"
          onClick={() => {
            navigate('/DailyFpcApproval');
          }}
        >
          Discard
        </Button>
        <Button
          label="Save"
          variant="solid"
          icon={<IoSaveOutline />}
          size="sm"
          className="mt-6 mr-2"
          onClick={() => {
            SaveDailyFPC();
          }}
          disabled={!isFPCAllowedToEdit}
        >
          Save
        </Button>
        <Button
          icon={<PiExportDuotone />}
          size='sm'
          variant='solid'
          className="mt-6 mr-2"
          onClick={() => {
            function flattenData(input) {
              let result = [];

              input.forEach(item => {
                // Push parent data
                result.push(item.data);

                // Check if children exist and push their data
                if (item.children) {
                  item.children.forEach(child => {
                    result.push(child.data);
                  });
                }
              });

              return result;
            }
            const Expordata = flattenData(data)
            console.log(Expordata)
            ExportxlswithColor(
              false,
              false,
              0,
              0,
              true,
              Expordata,
              'Daily FPC Approval',
              COLUMNS,
              false,
            )
          }}>Export</Button>

        <Button size='sm'
          icon={<RiRefreshLine />}
          variant='solid' className="mt-6 mr-2"
          onClick={() => setIsDiscardDialogOpen(true)}>re-Generate Daily FPC</Button>
        <WarningDialog
          isDialogOpen={isDiscardDialogOpen}
          title="re-Generate"
          description={`Are you sure you want to re-Generate Daily FPC?`}
          submitButtonTitle="re-Generate"
          handleDialogSubmit={reGenerate}
          handleDialogClose={() => setIsDiscardDialogOpen(false)}
          isSubmitButtonShow={true}
        />
      </div>
    </Card>
  );
};

export default DailyFPCApp;
