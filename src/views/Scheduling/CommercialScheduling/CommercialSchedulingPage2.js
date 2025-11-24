import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  Table,
  Card,
  Button as ButtonE,
  Select,
  Tooltip,
  TimeInput,
  Progress,
  Notification,
  toast as toaste,
  Dialog as Dial,
  Alert,
  Badge as Badges,
  DatePicker,
  Avatar,
  Button,
} from 'components/ui';
import { useState, useEffect, useRef } from 'react';
import { convertDateToYMD } from 'components/validators';
import {
  Postcolumnsetting,
  PutCommercialSave,
  apiGetExportPlayOut,
  apiGetNTCScheduling2,
  apiGetPromoScheduling2,
  apiGetRestoreCommercialScheduling,
  apiGetSongScheduling2,
  apiGetgetauditfinallogschedulingCom,
  apiGetrestorefinallogscheduling,
  apiGettransmissionlog,
  apiGettransmissionlog2,
  apiUpdateSpotStatus,
} from 'services/SchedulingService';
import { Toast } from 'primereact/toast';
import { ScrollBar } from 'components/ui';
import {
  updateStartTimes,
  hideStackedSideNav,
  FilldraggedRow,
  Clock,
} from '../general';
import '../style.css';
import {
  HiBackspace,
  HiFilm,
  HiFilter,
  HiOutlineAdjustments,
  HiOutlineArrowsExpand,
  HiOutlineCog,
  HiOutlineFilter,
  HiOutlineRefresh,
  HiOutlineUpload,
  HiOutlineX,
} from 'react-icons/hi';
import {
  CgCheck,
  CgClose,
  CgLogIn,
  CgLogOut,
  CgRedo,
  CgUndo,
} from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { StickyFooter } from 'components/shared';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Checkbox } from 'components/ui';
import { Dialog } from 'primereact/dialog';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { ContextMenu } from 'primereact/contextmenu';
import {
  apiGetSongcategoryDrop,
  apiUSP_Sch_Promo_GetContaintDetails,
} from 'services/MasterService';
import {
  convertDateFormatyyyyMMdd,
  formatDurationHHMMSSFF,
  openNotification,
  parseDuration,
  sumDurationsss,
} from 'views/Controls/GLOBALFUNACTION';
import FilterColumn from '../FilterColumn';
import { Badge } from 'primereact/badge';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { apiGetNTCtypedropdown } from 'services/NTCService';
import BreakwiseCom from './BreakwiseCom';
import {
  setDatainF,
  setdatestoreF,
  settimestoreF,
} from 'store/auth/scheduling';
import { setdateForm } from 'store/locale/localeSlice';
import { ExportToCSV } from 'views/Controls/ExportToCSV';
import { IoMdShuffle, IoIosList } from 'react-icons/io';
import {
  apiCallstoreprocedure,
  apiCallstoreprocedure,
} from 'services/CommonService';
import classNames from 'classnames';
import { AiOutlineSave } from 'react-icons/ai';
import { parse, isAfter, isBefore, format } from 'date-fns';
import Loader from 'views/Controls/Loader';
import { BsViewList } from 'react-icons/bs';
const { Tr, Th, Td, THead, TBody } = Table;

var rulecheckgg = [
  {
    header: 'Type',
    name: 'TxLogCode',
    code: 'TxLogCode',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },

  {
    header: 'Event_Name',
    name: 'Event_Name',
    code: 'Event_Name',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'PlayTime',
    name: 'Start_Time',
    code: 'Start_Time',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Duration',
    name: 'Duration',
    code: 'Duration',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },
];
var CHeckRODPTable = [
  {
    header: 'Type',
    name: 'TxLogCode',
    code: 'TxLogCode',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },

  {
    header: 'Event_Name',
    name: 'Event_Name',
    code: 'Event_Name',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'PlayTime',
    name: 'Start_Time',
    code: 'Start_Time',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },
  {
    header: 'Duration',
    name: 'Duration',
    code: 'Duration',
    width: 'auto',
    ScreenType: 'CommercialScheduling',
    Sequence: 1,
    isvisible: true,
  },
];

const EventOptions = [
  { value: 1, label: 'Promos', shortcode: 'PR' },
  { value: 2, label: 'Songs', shortcode: 'SG' },
  { value: 3, label: 'NTCs', shortcode: 'NTC' },
  { value: 4, label: 'Last Min Spot', shortcode: 'N' },
  { value: 6, label: 'Drop Spot', shortcode: 'CM' },
  { value: 7, label: 'Programs', shortcode: 'S' },
];

const CommercialSchedulingPage = ({
  table1Data,
  setTable1Data,
  cities,
  setcities,
  Columnright,
  setColumnright,
  table2Data,
  setTable2Data,
  table3Data,
  setTable3Data,
  fpcTimes,
  value,
  value2,
  setValue,
  breaknumbers,
  setbreaknumbers,
  Columnleft,
  setColumnleft,
  onCellSelect,
  evendata,
  setheadername,
}) => {
  console.log('table2Data', table2Data);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const dateForm = useSelector((state) => state.locale.dateForm);
  console.log();
  const [mismatchedItems, setMismatchedItems] = useState([]);
  const [count, setcount] = useState();
  const [dropcount, setdropcount] = useState(0);
  const [lastmincount, setlastmincount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [Commercial_scheduling_Counts, setCommercial_scheduling_Counts] =
    useState([
      // {
      //     "FieldValue": 0,
      //     "FieldName": "TotalCount"
      // },
      // {
      //     "FieldValue": 0,
      //     "FieldName": "BookedCount"
      // },
      // {
      //     "FieldValue": 0,
      //     "FieldName": "CancelCount"
      // },
      // {
      //     "FieldValue": 0,
      //     "FieldName": "DroppedCount"
      // },
      // {
      //     "FieldValue": 0,
      //     "FieldName": "LastMinCount"
      // }
    ]);
  const [mismatchedItems2, setMismatchedItems2] = useState([]);
  const [ExportPlayoutCSV, setExportPlayoutCSV] = useState([]);
  //    const [events, setevents] = useState(['2020', '2021', '2022', '2023']);
  const [TimeSpan, setTimeSpan] = useState([]);

  useEffect(() => {
    dispatch(setdateForm([value, 'Commercial Scheduling']));
    setheadername('');
    return () => {
      setheadername('Commercial Scheduling');
    };
  }, []);
  useEffect(() => {
    let resdt = updateStartTimes(table1Data, true, false);
    setTable1Data(resdt);
  }, []);

  useEffect(() => {
    Commercial_scheduling_CountsApi();
    //GetSpots('D', '');
  }, [table1Data]);

  const Commercial_scheduling_CountsApi = async () => {
    console.log('Calling API...');
    try {
      const resp = await apiCallstoreprocedure('USP_Sch_Commercial_scheduling_Counts', {
        par_ChannelCode: Channel.ChannelCode,
        par_LocationCode: Channel.LocationCode,
        par_TelecastDate: convertDateToYMD(dateForm[0]),
      })
      setCommercial_scheduling_Counts(resp.data);
      if (resp.data.length > 1) {
        setdropcount(resp.data[3]?.FieldValue);
        setlastmincount(resp.data[4]?.FieldValue);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const CheckRODPALLRows = () => {
    let newdata = [];
    table1Data.forEach((row) => {
      if (row.F_C_S_P === 'CM') {
        const telTime = parse(row.Tel_Time, 'HH:mm:ss:SS', new Date());
        const spotStartTime = row.SpotStartTime
          ? parse(row.SpotStartTime, 'HH:mm:ss', new Date())
          : null;
        const spotEndTime = row.SpotEndTime
          ? parse(row.SpotEndTime, 'HH:mm:ss', new Date())
          : null;

        if (spotStartTime && spotEndTime) {
          const isWithinTime =
            isAfter(telTime, spotStartTime) && isBefore(telTime, spotEndTime);
          if (!isWithinTime) {
            const updatedRow = { ...row, TxLogCode: 'Out of RODP' };
            newdata.push(updatedRow);
          }
        } else {
          const updatedRow = { ...row, TxLogCode: 'Out of RODP' };
          newdata.push(updatedRow);
        }
      }
    });

    console.log(newdata);
    setOutOfRODP(newdata);
  };
  const changeProgram = (tableData) => { };

  const replaceData = (mismatched2x, FPC_ID) => {
    const updatedTable1Data = table1Data.map((item1) => {
      if (item1.FPC_ID === FPC_ID) {
        const matchingItemIndex = mismatched2x.findIndex(
          (item2) =>
            item1.F_C_S_P === item2.F_C_S_P &&
            item1.BreakNumber === item2.BreakNumber,
        );

        if (matchingItemIndex !== -1) {
          mismatched2x[matchingItemIndex].FPC_ID = FPC_ID;
          mismatched2x[matchingItemIndex].Start_Time = '00:00:00:00';
          // mismatched2x[matchingItemIndex].EventDefaultBackColor = item1.EventDefaultBackColor;
          // mismatched2x[matchingItemIndex].EventDefaultFrontColor = item1.EventDefaultFrontColor;

          return { ...item1, ...mismatched2x[matchingItemIndex] };
        } else {
          return item1;
        }
      }
      return item1;
    });

    const remainingRecords = mismatched2x.filter(
      (item2) =>
        !updatedTable1Data.some(
          (item1) =>
            item1.F_C_S_P === item2.F_C_S_P &&
            item1.FPC_ID === FPC_ID &&
            item1.BreakNumber === item2.BreakNumber,
        ),
    );

    const lastIndex = updatedTable1Data.reduce((acc, item, index) => {
      if (item.FPC_ID === FPC_ID) {
        acc = index;
      }
      return acc;
    }, -1);

    if (lastIndex === -1) {
    } else {
      updatedTable1Data.splice(lastIndex + 1, 0, ...remainingRecords);
    }

    const updtRecord = updatedTable1Data.filter((item1) => {
      const maxBreakNumber = Math.max(
        ...mismatched2x.map((item2) => item2.BreakNumber),
      );
      // Filter out items with FPC_ID equal to FPC_ID and BreakNumber greater than maxBreakNumber
      if (item1.FPC_ID === FPC_ID && item1.BreakNumber > maxBreakNumber) {
        return false; // Exclude this item from the filtered array
      }
      return true; // Include all other items in the filtered array
    });

    let res = updateStartTimes(updtRecord, true, DisplayNTC);
    let prm = UpdatePrimaryID(res);

    return prm;
  };

  function findIndicesWithSameFPC_ID(array, fpcId) {
    const indices = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].FPC_ID === fpcId) {
        indices.push(i);
      }
    }
    return indices;
  }

  const [nonselectedCities, setnonSelectedCities] = useState([]);
  const [nonselectedCities1, setnonSelectedCities1] = useState([]);

  const [undo, setundo] = useState(false);
  const [redo, setredo] = useState(false);
  const [Display, setDisplay] = useState(true);

  const [table2DataCopy, setTable2DataCopy] = useState(false);
  const [promodata, setpromodata] = useState([]);
  const [selectedCommericals, setselectedCommericals] = useState(null);
  const [selectedComDuration, setselectedComDuration] = useState(null);
  const [DisplayNTC, setDisplayNTC] = useState(false);
  const [DisplayS, setDisplayS] = useState(false);
  const [startTimeArray, setStartTimeArray] = useState([]);
  const [donutdata, setDonutdata] = useState([]);
  const [CountData, setCountData] = useState({
    NTC: [],
    Promos: [],
    Songs: [],
    Commercial: [],
    Programs: [],
  });
  const [table1DataCopy, setTable1DataCopy] = useState([...table1Data]);
  const [segmentMoveDelete, setSegmentMoveDelete] = useState(false);
  const [selectedPrimaryID, setSelectedPrimaryID] = useState(0);
  const [by, setby] = useState();

  const [columnFilters, setColumnFilters] = useState([
    {
      columnName: '',
      filterValue: '',
      filterOption: 'contains',
    },
  ]);

  const toast = useRef(null);
  let height = '80vh';

  const openDialog = () => {
    auditpromoscheduling(Channel, convertDateToYMD(value));
    setIsOpen(true);
  };
  const cm = useRef(null);
  const cm2 = useRef(0);

  const references = [];
  references[0] = useRef(null);
  references[1] = useRef(null);
  references[2] = useRef(null);
  references[3] = useRef(null);
  references[4] = useRef(null);
  references[5] = useRef(null);
  references[6] = useRef(null);
  references[7] = useRef(null);
  references[8] = useRef(null);
  references[9] = useRef(null);
  references[10] = useRef(null);

  const tableContainerRef = useRef(null);

  const show = (message, type) => {
    openNotification2(type, message);
  };
  const handleRowDeleteButtonClick = () => {
    removepromo();
  };
  const handleRowDropButtonClick = () => {
    MoveToDropBox();
  };

  const MoveToDropBox = async () => {
    let remcheck = table1Data.filter(
      (row, index) => selectedRows.includes(index) && row.F_C_S_P !== 'CM',
    );

    if (remcheck.length > 0) {
      show('Kindly Select only Commercial.', 'warning');
      return;
    }
    let BookingDetailIDs = table1Data
      .filter((row, index) => selectedRows.includes(index))
      .map((item) => item.BookingDetailID);
    let formattedBookingDetailIDs = BookingDetailIDs.map((val) => ({
      Id: val,
    }));

    UpdateBookingStatus(formattedBookingDetailIDs, 'E')
      .then((stat) => {
        if (stat) {
          let rem = table1Data.filter(
            (row, index) => !selectedRows.includes(index),
          );
          let res = updateStartTimes(rem, true, DisplayNTC);
          setTable1Data(res);

          const SelRow = table1Data.filter((item, index) =>
            selectedRows.includes(index),
          );
          const updatedTable2Data = [...table2Data, SelRow[0]];
          setTable2Data(updatedTable2Data);

          setSelectedRows([]);
        }
      })
      .catch((error) => {
        console.error('Error updating booking status:', error);
      });
  };

  const UpdateBookingStatus = async (BookingDetailIDs, BookingStatus) => {
    try {
      const resp = await apiUpdateSpotStatus(
        BookingDetailIDs,
        BookingStatus,
        token,
      );
      if (resp.status == 200) {
        return true;
      }
    } catch (errors) {
      return false;
    }
  };

  const handleRowFilterButtonClick = () => {
    setEventDataName('Rotation Info');
    all();
  };
  const discard = () => {
    let ogversion = table1dataversions[1];
    cm2.current = 1;
    setTable1Data(ogversion);
    settable1dataversions([[]]);
    setValue(null);
  };

  const GetEventTypewiseDuration = (t1data) => {
    return t1data.reduce((acc, item) => {
      const key = item.F_C_S_P;
      if (item.F_C_S_P !== 'CT') {
        if (!acc[key]) {
          acc[key] = {
            F_C_S_P: key,
            sumDuration: 0,
            colors: item.EventDefaultBackColor,
          };
        }
        acc[key].sumDuration += parseDuration(item.Duration);
      }
      return acc;
    }, {});
  };

  const GetDataCount = (table1Data) => {
    const filteredNTC = table1Data.filter((obj) => obj.F_C_S_P === 'S');
    const filteredPR = table1Data.filter((obj) => obj.F_C_S_P === 'PR');
    const filteredSG = table1Data.filter((obj) => obj.F_C_S_P === 'SG');
    const filteredC = table1Data.filter((obj) => obj.F_C_S_P === 'CM');
    const filteredP = table1Data.filter((obj) => obj.F_C_S_P === 'CT');
    setCountData({
      NTC: [],
      Promos: [],
      Songs: [],
      Commercial: [],
      Programs: [],
    });

    setCountData((prevState) => ({
      ...prevState,
      NTC: [...prevState.NTC, ...filteredNTC],
      Promos: [...prevState.Promos, ...filteredPR],
      Songs: [...prevState.Songs, ...filteredSG],
      Commercial: [...prevState.Commercial, ...filteredC],
      Programs: [...prevState.Programs, ...filteredP],
    }));
  };

  const [dialogIsOpen, setIsOpen] = useState(false);
  const [isImportSequenceDialogOpen, setIsImportSequenceDialogOpen] =
    useState(false);
  const [ISSmartShuffle, setISSmartShuffle] = useState(false);
  const SSmartShuffle = async () => {
    const newdata = await apiCallstoreprocedure('AutoShuffle2', {
      par_LocationCode: Channel.LocationCode,
      par_ChannelCode: Channel.ChannelCode,
      par_scheduledate: convertDateToYMD(value),
      par_BreakDur: 200,
    });
    console.log(newdata);
  };
  const [dialogIsOpen1, setIsOpen1] = useState(false);
  const [dialogIsOpen12, setIsOpen12] = useState(false);
  const [FPCIDSTORE, setFPCIDSTORE] = useState(false);
  const onDialogClose = (e) => {
    setIsOpen(false);
  };

  const handleImportSequenceDialogClose = (e) => {
    setIsImportSequenceDialogOpen(false);
  };

  const onDialogOk = async (e) => {
    setShowLoader(true);
    try {
      let param = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
        ScheduleDate: convertDateToYMD(value),
        D_date: auditValue.value,
      };

      const resp = await apiGetRestoreCommercialScheduling(param);

      if (resp.status == 200) {
        onCellSelect(evendata, false);
        openNotification2('success', 'Data Saved Successfully.');
        setShowLoader(false);
      }
      if (resp.status === 204) {
        openNotification2('danger', 'Data Already Exists.');
        setShowLoader(false);
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification2('danger', 'Server Error.');
        setShowLoader(false);
      }
      setShowLoader(false);
    }

    setIsOpen(false);
  };

  const [table1dataversions, settable1dataversions] = useState([]);
  const [Insertpromo, setInsertpromo] = useState(true);
  const [ren, setren] = useState('Maximize');
  const toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    const cancelFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      setren('Minimize');
      requestFullScreen.call(docEl);
    } else {
      setren(' Maximize');
      cancelFullScreen.call(doc);
    }
  };
  const [EventDataName, setEventDataName] = useState('');

  const [copypromo, setCopypromo] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsFORNTC, setSelectedRowsFORNTC] = useState([0]);

  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [selectedRowsCopy, setSelectedRowsCopy] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [tobepastedrow, settobepastedrow] = useState(null);
  const [draggedRows, setdraggedRows] = useState([]);
  const [iscopy, setiscopy] = useState(false);
  const [isdisplaysetting, setisdisplaysetting] = useState(false);
  const [DisplayFilter, setDisplayFilter] = useState(false);
  const [AutoSchdulevisible, setAutoSchdulevisible] = useState(false);

  const [BreakwiseData, setBreakwiseData] = useState([]);
  const [PromototalDuration, setPromototalDuration] = useState(false);
  const [segmenttotalDuration, setSegmenttotalDuration] = useState(false);
  const [commercialDuration, setCommercialDuration] = useState(false);
  const [CommercialDurationBrkWise, setCommercialDurationBrkWise] = useState(
    [],
  );
  const [starttime, setstarttime] = useState(null);
  const [endtime, setendtime] = useState(null);

  const token = useSelector((state) => state.auth.session.token);
  const items = [
    // {
    //   label: 'Copy',
    //   icon: 'pi pi-fw pi-copy',
    //   command: () => {
    //     copy();
    //   },
    //},
    {
      label: 'Cut',
      icon: 'pi pi-fw pi-search',
      command: () => {
        cut();
        setiscopy(false);
      },
    },
    {
      label: 'Paste',
      icon: 'pi pi-fw pi-search',
      command: () => {
        paste();
      },
    },

    {
      label: 'Rotation Info',
      icon: 'pi pi-fw pi-info-circle',
      command: () => {
        all();
      },
    },
    {
      label: 'Remove',
      icon: 'pi pi-fw pi-trash',
      command: () => {
        removepromo();
      },
    },
  ];

  function GetBreakwiseDuration(table1data) {
    GetStartEndtimeArray(table1data);

    const groupedData = table1data.reduce((result, item) => {
      const {
        FPC_Time,
        Event_Name,
        FPC_ID,
        BreakNumber,
        Duration,
        F_C_S_P,
        ...rest
      } = item;

      const existingFPC = result.find((group) => group.FPC_ID === FPC_ID);

      if (existingFPC) {
        const existingBreakNumber = existingFPC.data.find(
          (subgroup) => subgroup.BreakNumber === BreakNumber,
        );

        if (existingBreakNumber) {
          if (F_C_S_P === 'PR') {
            if (existingBreakNumber.totalDuration === undefined) {
              existingBreakNumber.totalDuration = 0;
            }
            existingBreakNumber.totalDuration += parseDuration(Duration);
          } else if (F_C_S_P === 'NTC') {
            if (existingBreakNumber.totalNTCCount === undefined) {
              existingBreakNumber.totalNTCCount = 0;
            }
            existingBreakNumber.totalNTCCount += 1;
          } else if (F_C_S_P === 'SG') {
            if (existingBreakNumber.totalSGDuration === undefined) {
              existingBreakNumber.totalSGDuration = 0;
            }
            existingBreakNumber.totalSGDuration += parseDuration(Duration);
          } else if (F_C_S_P === 'CM') {
            if (existingBreakNumber.totalCMDuration === undefined) {
              existingBreakNumber.totalCMDuration = 0;
            }
            existingBreakNumber.totalCMDuration += parseDuration(Duration);
          } else {
            existingBreakNumber.totalDuration += 0;
            existingBreakNumber.totalSGDuration += 0;
            existingBreakNumber.totalNTCCount += 0;
            existingBreakNumber.totalCMDuration += 0;
          }
        } else {
          existingFPC.data.push({
            BreakNumber,
            totalDuration: F_C_S_P === 'PR' ? parseDuration(Duration) : 0,
            totalNTCCount: F_C_S_P === 'NTC' ? 1 : 0,
            totalSGDuration: F_C_S_P === 'SG' ? parseDuration(Duration) : 0,
            totalCMDuration: F_C_S_P === 'CM' ? parseDuration(Duration) : 0,
          });
        }
      } else {
        result.push({
          FPC_Time,
          FPC_ID,
          Event_Name,
          data: [
            {
              BreakNumber,
              totalDuration: F_C_S_P === 'PR' ? parseDuration(Duration) : 0,
              totalNTCCount: F_C_S_P === 'NTC' ? 1 : 0,
              totalSGDuration: F_C_S_P === 'SG' ? parseDuration(Duration) : 0,
              totalCMDuration: F_C_S_P === 'CM' ? parseDuration(Duration) : 0,
            },
          ],
        });
      }

      return result;
    }, []);

    console.log('groupedData', groupedData);

    const FPCTimewithDuration = groupedData.map((item) => {
      const totalDuration = item.data.reduce(
        (acc, breakItem) => acc + breakItem.totalDuration,
        0,
      );
      const totalSGDuration = item.data.reduce(
        (acc, breakItem) => acc + breakItem.totalSGDuration,
        0,
      );
      const totalCMDuration = item.data.reduce(
        (acc, breakItem) => acc + breakItem.totalCMDuration,
        0,
      );

      return {
        FPC_Time: item.FPC_Time,
        totalDuration: Math.round(totalDuration),
        totalSGDuration: Math.round(totalSGDuration),
        totalCMDuration: Math.round(totalCMDuration),
      };
    });

    const newData = FPCTimewithDuration.map((item) => {
      const matchKey = Object.keys(fpcTimes).find(
        (key) => fpcTimes[key] === item.FPC_Time,
      );
      if (matchKey) {
        return { ...item, columnIndex: matchKey };
      }
      return item;
    });

    console.log('lets', groupedData);

    const transformedData = groupedData.map((item) => {
      const children = item.data.map((breakItem) => ({
        key: `${item.FPC_ID}-${breakItem.BreakNumber}`,
        label: 'BreakNumber',
        icon: 'pi pi-fw pi-file',
        data: {
          BreakNumber: breakItem.BreakNumber,
          totalDuration: breakItem.totalDuration,
          totalSGDuration: breakItem.totalSGDuration,
          totalCMDuration: breakItem.totalCMDuration,
        },
      }));

      const totalDurationSum = children.reduce(
        (sum, child) => sum + child.data.totalDuration,
        0,
      );
      const totalSongDurationSum = children.reduce(
        (sum, child) => sum + child.data.totalSGDuration,
        0,
      );
      const totalCMDurationSum = children.reduce(
        (sum, child) => sum + child.data.totalCMDuration,
        0,
      );

      return {
        key: `${item.FPC_ID}`,
        label: 'Event_Name',
        icon: 'pi pi-fw pi-cog',
        data: {
          Event_Name: `[${item.FPC_Time}] ${item.Event_Name}`,
          BreakNumber: children.length,
          totalDuration: totalDurationSum,
          totalSGDuration: totalSongDurationSum,
          totalCMDuration: totalCMDurationSum,
          FPC_Time: item.FPC_Time,
        },
        children,
      };
    });

    console.log('transformedData', transformedData);
    setBreakwiseData(transformedData);
  }

  const all = () => {
    // let Event_Name = table1Data[selectedRows[0]]['Event_Name'];
    let res = table1Data.filter(
      (row, index) => row.F_C_S_P === 'CM',
      // selectedRows.includes(index)
    );

    setTable3Data([...res]);
  };

  const GetTranLog = async () => {
    let data = {};

    data.LocationCode = value2.LocationCode;
    data.ChannelCode = value2.ChannelCode;
    let TelecastDate = convertDateToYMD(value);

    // document.getElementById('pr_id_3_label').click()
    apiGettransmissionlog2(data, TelecastDate).then((response) => {
      changeProgram(response.data);
      setTable2Data(response.data);
    });
  };
  const ComSchdulingSave = async () => {
    setShowLoader(true);
    const transformedData = table1Data
      .filter((item) => item.F_C_S_P === 'CM')
      .map((item, index) => ({
        Id: item.BookingDetailID,
        BreakNumber: item.BreakNumber != null ? item.BreakNumber : 0,
        ContentCode: item.ContentCode,
        logged: 1,
        BookingStatus: 'B',
        SpotPositionNumber: index + 1,
        ScheduleTime: item.ScheduleTime,
      }));

    try {
      const resp = await PutCommercialSave(transformedData, token);

      if (resp.status == 200) {
        openNotification2('success', 'Data Saved Successfully.');
        setShowLoader(false);
      }
      if (resp.status === 204) {
        openNotification2('danger', 'Data Already Exists.');
        setShowLoader(false);
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification2('danger', 'Server Error.');
        setShowLoader(false);
      }
    }
    setShowLoader(false);
  };

  const openNotification2 = (type, m) => {
    toaste.push(
      <Notification title={type} type={type}>
        {m}
      </Notification>,
    );
  };

  //Comman Function Start

  // Comm Fun End

  const cut = () => {
    setiscopy(false);
    let res = table1Data.filter((row, index) => selectedRows.includes(index));

    setdraggedRows(res);
    setSelectedRowsCopy([...selectedRows]);
    // setTable1Data(table1Data.filter((row, index) => !selectedRows.includes(index)));
  };
  const getpromo = async (data) => {
    // alert('hh')
    {
      const datsa = await apiUSP_Sch_Promo_GetContaintDetails(
        data,
        convertDateToYMD(value),
        value2,
      );
      setpromodata(datsa.data);
    }
  };
  const copy = () => {
    cut();
    setiscopy(false);
  };
  const paste = () => {
    const filteredTable1Data = draggedRows.filter(
      (row) => row.F_C_S_P === 'CM',
    );
    if (filteredTable1Data.length <= 0) {
      return;
    }

    let res1 = table1Data.slice(0, tobepastedrow + 1);
    let res2 = table1Data.slice(tobepastedrow + 1, table1Data.length);
    let referencerow = table1Data[tobepastedrow];

    let Updatetobepastedrow = FilldraggedRow(filteredTable1Data, referencerow);

    const updatedTable1Data = [...res1, ...Updatetobepastedrow, ...res2];

    if (!iscopy) {
      setTable1Data(
        updatedTable1Data.filter(
          (row, index) => !selectedRowsCopy.includes(index),
        ),
      );
    } else {
      setTable1Data(updatedTable1Data);
    }

    setSelectedRows([]);

    setiscopy(false);
  };

  function sumDurations(data, eventtype, startindex, endindex) {
    let a = sumDurationsBrkWise(data, eventtype, startindex, endindex);
    let totalDuration = 0;

    const filterdata = data.slice(startindex, endindex);
    console.log('filterdata', filterdata);
    filterdata.forEach((item) => {
      if (item.F_C_S_P === eventtype) {
        totalDuration += parseDuration(item.Duration);
      }
    });

    return formatDurationHHMMSSFF(totalDuration);
  }

  function sumDurationsBrkWise(data, eventtype, startindex, endindex) {
    const filterdata = data.slice(startindex, endindex);
    let totalDuration = 0;
    let maxBreakNumber = 0;
    filterdata.forEach((item) => {
      const breakNumber = item.BreakNumber;
      if (breakNumber > maxBreakNumber) {
        maxBreakNumber = breakNumber;
      }
    });
    console.log('maxBreakNumber', maxBreakNumber);
    let totalDurationByBreak = Array.from(
      { length: maxBreakNumber },
      (v, i) => ({
        BreakNumber: i + 1,
        TotalDurationByBreak: 0,
      }),
    );

    // filterdata.forEach((item) => {
    //     if (item.F_C_S_P === eventtype) {
    //         const breakNumber = item.BreakNumber;
    //         const durationInFrames = parseDuration(item.Duration);
    //         totalDurationByBreak[breakNumber - 1].TotalDurationByBreak += durationInFrames;
    //     }
    // });
    filterdata.forEach((item) => {
      if (item.F_C_S_P === eventtype) {
        const breakNumber = item.BreakNumber;
        const durationInFrames = parseDuration(item.Duration);

        // Check if breakNumber is valid
        if (breakNumber > 0 && breakNumber <= totalDurationByBreak.length) {
          totalDurationByBreak[breakNumber - 1].TotalDurationByBreak +=
            durationInFrames;
        } else {
          console.error(`Invalid breakNumber: ${breakNumber}`);
        }
      }
    });

    let result = totalDurationByBreak.map((entry) => ({
      BreakNumber: entry.BreakNumber,
      TotalDurationByBreak: formatDurationHHMMSSFF(entry.TotalDurationByBreak),
      TotalDurationByBreakint: entry.TotalDurationByBreak,
    }));

    return result;
  }

  function CheckRODP(draggedRows, referencerow) {
    console.log('draggedRows', draggedRows);
    console.log('referencerow', referencerow);
    const parseDuration = (timeString) => {
      const [hours, minutes, seconds, frames] = timeString
        .split(':')
        .map(Number);
      return hours * 3600 + minutes * 60 + seconds + frames / 24; // Assuming 24 frames per second
    };

    const draggedRowsArray = Array.isArray(draggedRows)
      ? draggedRows
      : [draggedRows];

    return draggedRowsArray.every((draggedRow) => {
      if (draggedRow.SpotStartTime == null) {
        if (draggedRow.ContentCode == referencerow.ContentCode) {
          return true;
        } else {
          openNotification(
            'danger',
            'Kindly Schedule in Same Program.',
            'BATS',
          );
          return false;
        }
      }

      const draggedStartTime = parseDuration(draggedRow.SpotStartTime + ':00');
      const draggedEndTime = parseDuration(draggedRow.SpotEndTime + ':00');
      const referenceTime = parseDuration(referencerow.Tel_Time + ':00');

      if (
        draggedStartTime <= referenceTime &&
        draggedEndTime >= referenceTime
      ) {
        return true;
      } else {
        openNotification('danger', 'Out of TimeBand', 'BATS');
        return false;
      }
    });
  }

  // function CheckRODP(draggedRows, referencerow) {

  //     return draggedRows.every(draggedRow => {
  //         const draggedStartTime = parseDurationE(draggedRow.SpotStartTime + ":00");
  //         const draggedEndTime = parseDurationE(draggedRow.SpotEndTime + ":00");
  //         const referenceTime = parseDurationE(referencerow.Tel_Time + ":00");

  //         if (draggedStartTime <= referenceTime && draggedEndTime <= referenceTime) {
  //             return true; // Condition met, continue checking
  //         } else {
  //             openNotification('danger', 'Out of TimeBand', 'BATS');
  //             return false; // Condition failed, stop checking
  //         }
  //     });
  // }

  const handleDragEnd = (result) => {
    if (EventDataName != 'Drop Spot') {
      if (result.destination.droppableId == 'table2') {
        return;
      }
    }
    if (!result.destination) return;
    //console.log('result.source.droppableId', result.source.droppableId)

    let draggedrow =
      result.source.droppableId == 'table2'
        ? table2Data[result.source.index]
        : table1Data[result.source.index];

    console.log('draggedrow', draggedrow);

    if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table1'
    ) {
    } else {
      const draggedRowsValidation = table1Data.filter((row, index) =>
        selectedRows.includes(index),
      );

      for (const row of draggedRowsValidation) {
        if (row.F_C_S_P === 'S' && !segmentMoveDelete) {
          show('Segment cannot be dragged', 'warning');
          return;
        }
        if (row.F_C_S_P === 'CT' && !segmentMoveDelete) {
          show('Content cannot be dragged', 'warning');
          return;
        }
      }

      // if (draggedrow.F_C_S_P === 'S' && (!segmentMoveDelete)) {
      //     show('Segment cannot be dragged');
      //     return;
      // }
      // if (draggedrow.F_C_S_P === 'CT') {
      //     show('Segment cannot be dragged');
      //     return;
      // }
    }

    if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table2'
    ) {
      if (!selectedRows.length) {
        let draggedrow = table1Data[result.source.index];
        let BookingDetailIDs = table1Data
          .filter((row, index) => selectedRows.includes(index))
          .map((item) => item.BookingDetailID);
        let formattedBookingDetailIDs = BookingDetailIDs.map((val) => ({
          Id: val,
        }));
        UpdateBookingStatus(formattedBookingDetailIDs, 'E').then((stat) => {
          if (stat) {
            let clonedRow = { ...draggedrow };
            setTable1Data(table1Data.filter((row) => row !== draggedrow));

            console.log('clonedRow', clonedRow);
            const updatedTable2Data = [...table2Data, clonedRow];
            setTable2Data(updatedTable2Data);

            // const updatedTable2Data = [...res1, clonedRow, ...res2];
            // setTable2Data(updatedTable2Data);
            setdropcount((dropcount) => dropcount + 1);
          }
        });
      } else {
        const draggedrows = table1Data.filter((row, index) =>
          selectedRows.includes(index),
        );
        let BookingDetailIDs = table1Data
          .filter((row, index) => selectedRows.includes(index))
          .map((item) => item.BookingDetailID);
        let formattedBookingDetailIDs = BookingDetailIDs.map((val) => ({
          Id: val,
        }));
        UpdateBookingStatus(formattedBookingDetailIDs, 'E').then((stat) => {
          if (stat) {
            setTable1Data(
              table1Data.filter((row, index) => !selectedRows.includes(index)),
            );

            let res1 = table2Data.slice(0, result.destination.index);
            let res2 = table2Data.slice(
              result.destination.index,
              table2Data.length,
            );
            const updatedTable2Data = [...res1, ...draggedrows, ...res2];
            setTable2Data(updatedTable2Data);
            setSelectedRows([]);
            setdropcount((dropcount) => dropcount + 1);
          }
        });
      }
    } else if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table1'
    ) {
      console.log(
        'result.destination.index0*',
        result.destination.index,
        selectedRows2.length,
      );
      if (!selectedRows2.length) {
        console.log('result.destination.index2', result.destination.index);
        let draggedRow = table2Data[result.source.index];
        let referencerow = table1Data[result.destination.index - 1];
        console.log('CheckRODP4');
        if (!CheckRODP(draggedRow, referencerow)) {
          draggedRow = [];
          referencerow = [];
          return;
        }
        let clonedRow = FilldraggedRow(draggedRow, referencerow);
        let res1 = table1Data.slice(0, result.destination.index);
        let res2 = table1Data.slice(
          result.destination.index,
          table1Data.length,
        );
        const updatedTable1Data = [...res1, clonedRow, ...res2];
        let res = updateStartTimes(updatedTable1Data, true, DisplayNTC);
        let prm = UpdatePrimaryID(res);
        setTable2Data(table2Data.filter((row) => row !== draggedrow));

        setTable1Data(prm);
        BackToBack(prm);
      } else {
        let draggedRows = table2Data.filter((row, index) =>
          selectedRows2.includes(index),
        );
        // console.log('result.destination.index0_draggedRows1', draggedRows)
        let referencerow = table1Data[result.destination.index - 1];
        console.log('CheckRODP5');
        console.log(CheckRODP(draggedRows, referencerow));
        if (!CheckRODP(draggedRows, referencerow)) {
          console.log('CheckRODP5');
          draggedRows = [];
          referencerow = [];
          return;
        }
        let BookingDetailIDs = table2Data
          .filter((row, index) => selectedRows2.includes(index))
          .map((item) => item.BookingDetailID);
        let formattedBookingDetailIDs = BookingDetailIDs.map((val) => ({
          Id: val,
        }));
        UpdateBookingStatus(formattedBookingDetailIDs, 'B')
          .then((stat) => {
            if (stat) {
              referencerow = table1Data[result.destination.index - 1];
              let clonedRows = FilldraggedRow(draggedRows, referencerow);

              let res1 = table1Data.slice(0, result.destination.index);
              let res2 = table1Data.slice(
                result.destination.index,
                table1Data.length,
              );

              const updatedTable1Data = [...res1, ...clonedRows, ...res2];
              let res = updateStartTimes(updatedTable1Data, true, DisplayNTC);
              let prm = UpdatePrimaryID(res);
              setTable1Data(prm);
              BackToBack(prm);
              setTable2Data(table2Data.filter((row) => row !== draggedrow));
              setSelectedRows2([]);
              setdropcount((dropcount) => dropcount - 1);
            }
          })
          .catch((error) => {
            console.error('Error updating booking status:', error);
          });
      }
    } else if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table1'
    ) {
      let index1 = result.source.index;
      let index2 = result.destination.index;
      let draggedRow = table1Data[index1];
      let updatedTable1Data = [];

      if (selectedRows.length) {
        const draggedRows = table1Data.filter((row, index) =>
          selectedRows.includes(index),
        );
        let rowdiff = 0;
        let rowdownDiff = 0;
        if (index1 > index2) {
          rowdiff = 1;
        } else {
          rowdownDiff = 1;
        }

        let referencerow = table1Data[result.destination.index - rowdiff];
        if (!CheckRODP(draggedRows, referencerow)) {
          draggedRow = [];
          referencerow = [];
          return;
        }

        // draggedRows.forEach(draggedRow => {
        //     console.log('result. referencerow3*', parseDuration((draggedRow.SpotEndTime + ":00")))
        //     console.log('result. referencerow3', parseDuration(referencerow.Tel_Time))

        //     if (parseDuration(draggedRow.SpotStartTime + ":00") <= parseDuration(referencerow.Tel_Time)
        //         && parseDuration((draggedRow.SpotEndTime + ":00")) > parseDuration(referencerow.Tel_Time)) {

        //     } else {
        //         //alert("Out Of Timeband")
        //         openNotification('danger', 'Out of TimeBand', 'BATS')
        //         draggedRows = []
        //         referencerow = []
        //         return
        //     }
        // });

        let clonedRows = FilldraggedRow(draggedRows, referencerow);

        const updttable1Data = table1Data.map((row, index) => {
          if (selectedRows.includes(index)) {
            return {
              ...row,
              F_C_S_P: copypromo ? row.F_C_S_P : 'DELETE',
            };
          }
          return row;
        });

        let index = result.destination.index;

        let res1 = updttable1Data.slice(0, index + rowdownDiff);
        let res2 = updttable1Data.slice(
          index + rowdownDiff,
          updttable1Data.length,
        );
        const updatedTable1Data = [...res1, ...clonedRows, ...res2];

        const ActualTable1Data = updatedTable1Data.filter(
          (row) => row.F_C_S_P !== 'DELETE',
        );

        let res = updateStartTimes(ActualTable1Data, true, DisplayNTC);
        console.log('res', res);
        let prm = UpdatePrimaryID(res);
        console.log('prm', prm);
        setTable1Data(prm);
        BackToBack(prm);
        setSelectedRows([]);
        return;
      } else {
        if (index1 > index2) {
          let referencerow = table1Data[index2 - 1];
          //let draggedRow2 = { ...draggedRow };
          let draggedRow2 = FilldraggedRow(draggedRow, referencerow);

          // draggedRow2.BreakNumber = referencerow.BreakNumber;
          // draggedRow2.SeasonNo = referencerow.SeasonNo;
          // draggedRow2.EpisodeNo = referencerow.EpisodeNo;
          // draggedRow2.ContentCode = referencerow.ContentCode;
          // draggedRow2.FPC_ID = referencerow.FPC_ID;
          // draggedRow2.Start_Time = "00:00:00:00"
          let temp = index1;

          index1 = index2;
          index2 = temp;

          let res1 = table1Data.slice(0, index1);
          let res2 = table1Data.slice(index1, index2);
          let res3 = table1Data.slice(index2 + 1, table1Data.length);

          updatedTable1Data = [...res1, draggedRow2, ...res2, ...res3];

          if (copypromo) {
            updatedTable1Data = [
              ...res1,
              draggedRow2,
              ...res2,
              draggedRow,
              ...res3,
            ];
          }
        } else {
          let res1 = table1Data.slice(0, index1);
          let res2 = table1Data.slice(index1 + 1, index2 + 1);
          let res3 = table1Data.slice(index2 + 1, table1Data.length);
          let referencerow = table1Data[index2];
          let draggedRow2 = FilldraggedRow(draggedRow, referencerow);
          // let draggedRow2 = { ...draggedRow };
          // draggedRow2.BreakNumber = referencerow.BreakNumber;
          // draggedRow2.SeasonNo = referencerow.SeasonNo;
          // draggedRow2.EpisodeNo = referencerow.EpisodeNo;
          // draggedRow2.ContentCode = referencerow.ContentCode;
          // draggedRow2.FPC_ID = referencerow.FPC_ID;
          // draggedRow2.Start_Time = "00:00:00:00"

          updatedTable1Data = [...res1, ...res2, draggedRow2, ...res3];

          if (copypromo) {
            updatedTable1Data = [
              ...res1,
              draggedRow,
              ...res2,
              draggedRow2,
              ...res3,
            ];
          }
        }
      }

      let res = updateStartTimes(updatedTable1Data, true, DisplayNTC);
      let prm = UpdatePrimaryID(res);
      setTable1Data(prm);
      BackToBack(prm);
    } else if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table2'
    ) {
      let index1 = result.source.index;
      let index2 = result.destination.index;

      if (index1 > index2) {
        let temp = index1;
        index1 = index2;
        index2 = temp;
      }
      let draggedRow = table2Data[index1];
      let res1 = table2Data.slice(0, index1);
      let res2 = table2Data.slice(index1 + 1, index2 + 1);
      let res3 = table2Data.slice(index2 + 1, table2Data.length);
      const updatedTable2Data = [...res1, ...res2, draggedRow, ...res3];
      // updatedTable2Data.splice(result.destination.index, 0, draggedRow);
      let res = updateStartTimes(updatedTable2Data, true, DisplayNTC);
      let prm = UpdatePrimaryID(updatedTable2Data);
      setTable2Data(prm);
    }
  };
  const processData = (data) => {
    return data.map((event, index, array) => {
      let txLogCode = '';
      console.log('event.Brand', event.Brand);
      if (
        (index > 0 &&
          array[index - 1].Event_Name === event.Event_Name &&
          event.Event_Name != null &&
          event.Event_Name !== '') ||
        (index < array.length - 1 &&
          array[index + 1].Event_Name === event.Event_Name &&
          event.Event_Name != null &&
          event.Event_Name !== '')
      ) {
        txLogCode = 'Event_Name';
      } else if (
        (index > 0 &&
          array[index - 1].Brand === event.Brand &&
          event.Brand != null &&
          String(event.Brand).trim() !== '') ||
        (index < array.length - 1 &&
          array[index + 1].Brand === event.Brand &&
          event.Brand != null &&
          String(event.Brand).trim() !== '')
      ) {
        txLogCode = 'Brand';
      } else if (
        (index > 0 &&
          array[index - 1].Client === event.Client &&
          event.Client != null &&
          event.Client !== '') ||
        (index < array.length - 1 &&
          array[index + 1].Client === event.Client &&
          event.Client != null &&
          event.Client !== '')
      ) {
        txLogCode = 'Client';
      }

      return {
        ...event,
        TxLogCode: txLogCode,
      };
    });
  };

  const processData2 = (data) => {
    return data.map((event, index, array) => {
      let txLogCode = '';
      if (
        (index > 0 && array[index - 1].Event_Name === event.Event_Name) ||
        (index < array.length - 1 &&
          array[index + 1].Event_Name === event.Event_Name)
      ) {
        txLogCode = 'Event_Name';
      } else if (
        (index > 0 && array[index - 1].Brand === event.Brand) ||
        (index < array.length - 1 && array[index + 1].Brand === event.Brand)
      ) {
        txLogCode = 'Brand';
      } else if (
        (index > 0 && array[index - 1].Client === event.Client) ||
        (index < array.length - 1 && array[index + 1].Client === event.Client)
      ) {
        txLogCode = 'Brand';
      }

      return {
        ...event,
        TxLogCode: txLogCode,
      };
    });
  };
  function createArray(max, index) {
    if (max > index) {
      let temp = max;
      max = index;
      index = temp;
    }

    const arrayLength = index - max + 1; // Calculate the necessary array length
    const resultArray = Array(arrayLength).fill(0); // Create an array filled with zeros

    for (let i = 0; i < arrayLength; i++) {
      resultArray[i] = max + i; // Fill the array with the desired values
    }

    return resultArray;
  }

  function compareTimes(time1, time2) {
    const [hours1, minutes1] = time1.split(':').slice(0, 2);
    // Extract hours and minutes for time2:
    // const [hours2, minutes2] = time2.split(':')
    let hours2 = time2.getHours();
    let minutes2 = time2.getMinutes();

    // Convert hours and minutes to numbers:

    const time1InMinutes = Number(hours1) * 60 + Number(minutes1);
    const time2InMinutes = Number(hours2) * 60 + Number(minutes2);

    if (time1InMinutes < time2InMinutes) {
      return 0;
    } else if (time1InMinutes > time2InMinutes) {
      return 1;
    } else {
      return 2;
    }
  }

  function promoinsert2() {
    let promos = selectedRows2.map((index) => table2Data[index]);
    let index = selectedRows[0];
    let RefPromos = table1Data[index];

    const updtpromos = FilldraggedRow(promos, RefPromos);

    let res1 = table1Data.slice(0, index + 1);

    let res2 = table1Data.slice(index + 1, table1Data.length);

    const updatedTable1Data = [...res1, ...updtpromos, ...res2];
    setTable1Data(updatedTable1Data);
  }
  function replace() {
    if (selectedRows.length > 1) {
      show('Kindly Select One Promo onlys.', 'warning');
      return;
    }

    if (selectedRows2.length > 1) {
      show('Kindly Select One Promo only.', 'warning');
      return;
    }

    let promos = selectedRows2.map((index) => table2Data[index]);
    let index = selectedRows[0];

    let referencerow = table1Data[index];

    if (referencerow.F_C_S_P !== 'PR') {
      show('Kindly Select Promo.', 'warning');
      return;
    }

    referencerow.Event_Name = promos[0].Event_Name;
    referencerow.Duration = promos[0].Duration;
    referencerow.Tape_ID = promos[0].Tape_ID;
    referencerow.VideoID = promos[0].VideoID;

    let res1 = table1Data.slice(0, index);

    let res2 = table1Data.slice(index + 1, table1Data.length);

    const updatedTable1Data = [...res1, referencerow, ...res2];

    let res = updateStartTimes(updatedTable1Data, true, DisplayNTC);
    setTable1Data(res);
  }
  function removepromo() {
    let remcheck = table1Data.filter(
      (row, index) =>
        selectedRows.includes(index) &&
        row.F_C_S_P !== 'PR' &&
        row.F_C_S_P !== 'SG' &&
        row.F_C_S_P !== 'NTC',
    );

    if (remcheck.length > 0) {
      show('Kindly Select only Promo/Song.', 'warning');
      return;
    }

    let rem = table1Data.filter((row, index) => !selectedRows.includes(index));

    let res = updateStartTimes(rem, true, DisplayNTC);
    setTable1Data(res);

    setSelectedRows([]);
  }

  useEffect(() => {
    hideStackedSideNav();
    const gboxElement2 = document.getElementsByClassName('Gbox2')[0];
    const gboxElementchild =
      document.getElementsByClassName('Gbox2')[0].children[1];
    gboxElement2.style.display = 'block';
    gboxElementchild.style.display = 'block';
    return () => {
      gboxElement2.style.display = 'none';
      gboxElementchild.style.display = 'none';
    };
  }, []);

  function GetStartEndtimeArray(dtst) {
    var StartTimeArray = [];
    var index_st = 0;
    var st = '';
    var FPC_TimeTo = '';
    var ed = '';
    let cnint = 0;
    StartTimeArray = [];
    for (let i = 0; i < dtst.length; i++) {
      if (dtst[i].F_C_S_P === 'CT') {
        st = dtst[i].FPC_Time;
        FPC_TimeTo = dtst[i].FPC_TimeTo;
        index_st = i;

        // var endrow = dtst
        //     .slice(i + 1, dtst.length)
        //     .find((row) => row.F_C_S_P === 'CT');
        var endrow = dtst
          .slice(i + 1, dtst.length)
          .find((row) => row.F_C_S_P === 'CT');

        if (endrow === null || endrow === undefined) {
          endrow = dtst[dtst.length - 2];
        }

        if (endrow) {
          ed = dtst.indexOf(endrow);

          StartTimeArray.push({
            StartTime: st,
            EndTime: FPC_TimeTo,
            PlayTime: dtst[ed + 1].Start_Time,
            Diffrance:
              parseDuration(dtst[ed + 1].Start_Time) -
              parseDuration(FPC_TimeTo + ':00:00'),
            columnIndex: cnint + 1,
          });
          cnint = cnint + 1;
        } else {
        }
      }
    }

    setStartTimeArray(StartTimeArray);
  }
  console.log('startTimeArray', startTimeArray);
  useEffect(() => {
    const updatedSelectedRows = selectedRows.filter((row, index) => {
      console.log('row', row);
      const nextIndex = row + 1;
      if (table1Data[nextIndex].F_C_S_P === 'NTC') {
        return true;
      }
      return false;
    });

    setSelectedRowsFORNTC(updatedSelectedRows);
    //console.log('updatedSelectedRows', updatedSelectedRows);

    const SelNTCRow = table1Data.filter(
      (item, index) =>
        item.F_C_S_P === 'NTC' && selectedRows.some((row) => index === row + 1),
    );

    console.log('SelNTCRow', SelNTCRow);

    const SelRow = table1Data.filter((item, index) =>
      selectedRows.includes(index),
    );

    let WithAllNTC = true;
    if (SelRow[0] && SelRow[0].F_C_S_P === 'NTC') {
      WithAllNTC = false;
    }

    const primaryIDSet = new Set(SelRow.map((item) => item.PrimaryID));
    let SelRowwithNTCIndex = table1Data
      .map((item, index) => {
        if (primaryIDSet.has(item.PrimaryID)) {
          return index;
        }
      })
      .filter((index) => index !== undefined);

    if (WithAllNTC) {
      if (SelRowwithNTCIndex.length != selectedRows.length) {
        setSelectedRows(SelRowwithNTCIndex);
      }
    } else {
      SelRowwithNTCIndex = selectedRows;
    }

    const selectedItems = table1Data.filter(
      (item, index) =>
        SelRowwithNTCIndex.includes(index) && item.F_C_S_P === 'CM',
    );
    //console.log('SelRowwithNTCIndex', SelRowwithNTCIndex)
    const sumOfDuration = selectedItems.reduce((sum, item) => {
      return sum + parseDuration(item.Duration);
    }, 0);

    console.log('SelRowwithNTCIndexsumOfDuration', sumOfDuration);
    setselectedComDuration(formatDurationHHMMSSFF(sumOfDuration));

    const inputId = SelRowwithNTCIndex[0];

    const nearestAboveCTRow = table1Data
      .slice(
        0,
        table1Data.findIndex((row, index) => index === inputId),
      )
      .reverse()
      .find((row) => row.F_C_S_P === 'CT');

    const nearestbelowCTRow = table1Data
      .slice(table1Data.indexOf(nearestAboveCTRow) + 1, table1Data.length)
      .find((row) => row.F_C_S_P === 'CT');

    // const PromototalDuration = sumDurations(
    //     table1Data,
    //     'CM',
    //     table1Data.indexOf(nearestAboveCTRow),
    //     table1Data.indexOf(nearestbelowCTRow),
    // );

    const SegmenttotalDuration = sumDurations(
      table1Data,
      'S',
      table1Data.indexOf(nearestAboveCTRow),
      table1Data.indexOf(nearestbelowCTRow),
    );
    const CommercialDuration = sumDurations(
      table1Data,
      'CM',
      table1Data.indexOf(nearestAboveCTRow),
      table1Data.indexOf(nearestbelowCTRow),
    );

    let CommercialDurationBrkWise = sumDurationsBrkWise(
      table1Data,
      'CM',
      table1Data.indexOf(nearestAboveCTRow),
      table1Data.indexOf(nearestbelowCTRow),
    );

    console.log('CommercialDurationBrkWise*', CommercialDurationBrkWise);
    setCommercialDurationBrkWise([CommercialDurationBrkWise]);

    setSegmenttotalDuration(SegmenttotalDuration);
    setCommercialDuration(CommercialDuration);

    setselectedCommericals(selectedItems.length);

    console.log(nearestAboveCTRow);
    console.log(nearestbelowCTRow);

    var timespanarray = [];

    if (nearestbelowCTRow !== undefined && nearestAboveCTRow !== undefined) {
      let FPC_TimeAbove = nearestAboveCTRow.FPC_Time;
      let FPC_TimeToAbove = nearestAboveCTRow.FPC_TimeTo;
      let actualendtimeAbove = nearestbelowCTRow.Tel_Time;

      timespanarray.push([
        FPC_TimeAbove,
        FPC_TimeToAbove,
        actualendtimeAbove.substring(0, 5),
        nearestAboveCTRow.Event_Name,
      ]);

      const nearest2NextbelowCTRow = table1Data
        .slice(table1Data.indexOf(nearestbelowCTRow) + 1, table1Data.length)
        .find((row) => row.F_C_S_P === 'CT');

      console.log('nearest2NextbelowCTRow', nearest2NextbelowCTRow);
      var nearest3NextbelowCTRow = [];
      if (nearest2NextbelowCTRow !== undefined) {
        let FPC_Time = nearestbelowCTRow.FPC_Time;
        let FPC_TimeTo = nearestbelowCTRow.FPC_TimeTo;
        let actualendtime = nearest2NextbelowCTRow.Tel_Time;
        timespanarray.push([
          FPC_Time,
          FPC_TimeTo,
          actualendtime.substring(0, 5),
          nearestbelowCTRow.Event_Name,
        ]);

        nearest3NextbelowCTRow = table1Data
          .slice(
            table1Data.indexOf(nearest2NextbelowCTRow) + 1,
            table1Data.length,
          )
          .find((row) => row.F_C_S_P === 'CT');
      }

      // if (nearest2NextbelowCTRow !== undefined && nearest3NextbelowCTRow !== undefined) {
      //     let FPC_Time2 = nearest2NextbelowCTRow.FPC_Time;
      //     let FPC_TimeTo2 = nearest2NextbelowCTRow.FPC_TimeTo;
      //     let actualendtime2 = nearest3NextbelowCTRow.Tel_Time;
      //     timespanarray.push([FPC_Time2, FPC_TimeTo2, actualendtime2.substring(0, 5)])
      // }
    }

    let unique = [...new Set(timespanarray)];
    console.log('unique', unique);
    setTimeSpan(unique);
    //setevents(unique);

    // setTimeout(() => {
    //     const connectors = document.getElementsByClassName(
    //         'p-timeline-event-connector',
    //     );
    //     console.log(connectors);
    //      if (red) {
    //         connectors[0].style.backgroundColor = 'brown';
    //         connectors[1].style.backgroundColor = 'brown';
    //     } else if (green) {
    //         connectors[0].style.backgroundColor = 'green';
    //     } else {
    //         console.warn(
    //             'There are less than two connectors found. Unable to colorize.',
    //         );
    //     }
    //      const eventMarkers = document.getElementsByClassName(
    //         'p-timeline-event-marker',
    //     );

    //     if (red) {
    //          const thirdMarker = eventMarkers[2];
    //         thirdMarker.style.border = 'none';
    //         thirdMarker.style.borderRadius = '0';
    //         thirdMarker.style.width = 'auto';
    //     } else {
    //          console.warn(
    //             'There are less than three markers found. Unable to remove the third one.',
    //         );
    //     }
    // }, 100);
  }, [selectedRows]);

  useEffect(() => {
    let prm = UpdatePrimaryID(table1Data);
    setTable1Data(prm);
    BackToBack(prm);
  }, []);

  const [blankTxLogCount, setblankTxLogCount] = useState(0);
  const [TotalBreaks, setTotalBreaks] = useState(0);
  const [rulecheck, setrulecheck] = useState([]);
  const [OutOfRODP, setOutOfRODP] = useState([]);
  const [DatePickerRangeImport, setDatePickerRangeImport] = useState([
    null,
    null,
  ]);
  const [colorMapping, setColorMapping] = useState({});

  const handleClick = async () => {
    if (DatePickerRangeImport) {
      const param = {
        ChannelCode: Channel.ChannelCode,
        scheduledate_From: convertDateToYMD(dateForm[0]),
        scheduledate_To: convertDateToYMD(DatePickerRangeImport),
      };

      try {
        const resp = await apiCallstoreprocedure('Spot_Replicate', param);
        // Handle the response here
        if (resp.status == 200) {
          openNotification('success', 'Sequence imported Successfully.');
          setDatePickerRangeImport([null, null]);
          setIsImportSequenceDialogOpen(false);
        }
      } catch (error) {
        if (error.response.status == 500) {
          openNotification('danger', 'Server Error.');
          setDatePickerRangeImport([null, null]);
          setIsImportSequenceDialogOpen(false);
        }
      }
    } else {
      openNotification('danger', 'Kindly Select Date');
    }
  };
  useEffect(() => {
    console.log(
      'table1Data 1552 table1Data 1552 table1Data 1552 table1Data 1552',
    );
    if (!undo && !redo) {
      cm2.current++;
      settable1dataversions([...table1dataversions, table1Data]);
    } else if (cm2.current > 1) {
      if (undo) {
        setundo(false);
      }
      if (redo) {
        setredo(false);
      }
    }
    GetDataCount(table1Data);

    var t1groupdata = GetEventTypewiseDuration(table1Data);

    setDonutdata(
      Object.values(t1groupdata).map((group) => ({
        label: getLabel(group.F_C_S_P),
        value: group.sumDuration,
        color: group.colors,
      })),
    );

    GetBreakwiseDuration(table1Data);

    const filteredData = table1Data
      .filter((item) => item.F_C_S_P === 'CM')
      .filter((item) => item.TxLogCode);
    console.log('table1Data00p', filteredData);
    setrulecheck(filteredData);

    const blankTxLogCountCM = filteredData.length;
    setblankTxLogCount(blankTxLogCountCM);
    const mapColors = (data) => {
      const result = {};
      const uniqueEventNames = new Set();
      table1Data.forEach((item) => {
        const { EventDefaultBackColor, F_C_S_P, Event_Name } = item;
        // Collect unique event names
        if (Event_Name) {
          uniqueEventNames.add(Event_Name);
        }
        // Map colors
        if (!result[F_C_S_P]) {
          result[F_C_S_P] = EventDefaultBackColor;
        }
      });
      // Convert Set to Array and log unique event names
      const uniqueEventNamesArray = Array.from(uniqueEventNames).length;
      console.log('colorMapping', uniqueEventNamesArray);
      setTotalBreaks(uniqueEventNamesArray);
      return result;
    };

    setColorMapping(mapColors(table1Data));
    CheckRODPALLRows();
  }, [table1Data]);

  function getLabel(value) {
    const option = EventOptions.find((option) => option.shortcode === value);
    return option ? option.label : value;
  }

  function UpdatePrimaryID(data) {
    let lastPrimaryID = 0;
    const newData = [];

    data.forEach((item) => {
      if (item.F_C_S_P !== 'NTC') {
        lastPrimaryID++;
      }
      // Create a new object with the updated primary ID
      const newItem = { ...item, PrimaryID: lastPrimaryID };
      newData.push(newItem);
    });

    return newData;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('table1Datappppp', table1Data);
    dispatch(setDatainF(table1Data));

    dispatch(settimestoreF(new Date().toLocaleString()));

    dispatch(setdatestoreF(value));
  }, [table1Data]);

  useEffect(() => {
    console.log('Columnright Columnright1612 ', cities);
    const res = cities.filter((city) => {
      return !Columnright.some(
        (selectedCity) => selectedCity.code === city.code,
      );
    });

    setnonSelectedCities(res);
  }, [Columnright]);

  const combineRefs =
    (...refs) =>
      (el) => {
        refs.forEach((ref) => {
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        });
      };

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [valueheader, setvalueheader] = useState('');
  const handleHeaderUpdate = (index, newHeader) => {
    if (by == 'he') {
      const newHeaders = [...nonselectedCities];
      newHeaders[index].header = newHeader;
      setnonSelectedCities(newHeaders);
    }
    if (by == 'she') {
      const newHeaders = [...nonselectedCities1];
      newHeaders[index].header = newHeader;
      setnonSelectedCities1(newHeaders);
    }
  };

  console.log(DisplayNTC, '---', selectedPrimaryID);
  console.log(table1Data);
  const Columns2 = () => {
    const firstprfe = [
      {
        header: 'FPC Time',
        name: 'FPC_Time',
        code: 'FPC_Time',
        width: 'auto',
        ScreenType: 'Commercial Scheduling',
        Sequence: 1,
        isvisible: true,
      },
      {
        header: 'Play Time',
        name: 'Start_Time',
        code: 'Start_Time',
        width: 'auto',
        ScreenType: 'Song',
        Sequence: 1,
        isvisible: true,
      },
      {
        header: 'Event Name',
        name: 'Event_Name',
        code: 'Event_Name',
        width: 'auto',
        ScreenType: 'Commercial Scheduling',
        Sequence: 1,
        isvisible: true,
      },
    ];
    const columnRightWithoutFirstprfe = Columnright.filter(
      (item) => !firstprfe.some((fixedItem) => fixedItem.name === item.name),
    );
    return (
      <div
        className="grid grid-cols-2 gap-4"
        style={{ background: 'transparent' }}
      >
        {by == 'he' && (
          <Card header={<p style={{ fontSize: '16px' }}>Visible</p>}>
            {Columnright != null && (
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) return;

                  let index1 = result.source.index;
                  let index2 = result.destination.index;

                  if (index1 > index2) {
                    let temp = index1;
                    index1 = index2;
                    index2 = temp;
                  }

                  let draggedRow = columnRightWithoutFirstprfe[index1];
                  let res1 = columnRightWithoutFirstprfe.slice(0, index1);
                  let res2 = columnRightWithoutFirstprfe.slice(
                    index1 + 1,
                    index2 + 1,
                  );
                  let res3 = columnRightWithoutFirstprfe.slice(
                    index2 + 1,
                    columnRightWithoutFirstprfe.length,
                  );
                  const updatedTable1Data = [
                    ...res1,
                    ...res2,
                    draggedRow,
                    ...res3,
                  ];
                  console.log('updatedTable1Data********', updatedTable1Data);
                  setColumnright([...firstprfe, ...updatedTable1Data]);
                }}
              >
                <Droppable droppableId="list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {firstprfe.map((fixedItem, index) => (
                        <div className="flex" key={fixedItem.name}>
                          {fixedItem.header}
                        </div>
                      ))}
                      {columnRightWithoutFirstprfe.map((data, index) => (
                        <Draggable
                          key={data.name}
                          draggableId={`item-${data.name}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="flex">
                                <i
                                  className="pi pi-bars mr-2"
                                  onClick={() => {
                                    let res =
                                      columnRightWithoutFirstprfe.filter(
                                        (row) => row.name != data.name,
                                      );
                                    console.log('setColumnright', res);
                                    setColumnright([...firstprfe, ...res]);
                                  }}
                                ></i>
                                <i
                                  className="pi pi-minus-circle mr-2"
                                  onClick={() => {
                                    let res =
                                      columnRightWithoutFirstprfe.filter(
                                        (row) => row.name != data.name,
                                      );
                                    setColumnright([...firstprfe, ...res]);
                                  }}
                                ></i>
                                {data.header}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Card>
        )}
        {by == 'she' && (
          <Card header={<p style={{ fontSize: '16px' }}>Visible</p>}>
            {Columnleft != null && (
              <DragDropContext
                onDragEnd={(result) => {
                  if (!result.destination) return;

                  let index1 = result.source.index;
                  let index2 = result.destination.index;

                  if (index1 > index2) {
                    let temp = index1;
                    index1 = index2;
                    index2 = temp;
                  }

                  let draggedRow = Columnleft[index1];
                  let res1 = Columnleft.slice(0, index1);
                  let res2 = Columnleft.slice(index1 + 1, index2 + 1);
                  let res3 = Columnleft.slice(index2 + 1, Columnleft.length);
                  const updatedTable1Data = [
                    ...res1,
                    ...res2,
                    draggedRow,
                    ...res3,
                  ];
                  setColumnleft(updatedTable1Data);
                }}
              >
                <Droppable droppableId="list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {Columnleft.map((data, index) => (
                        <Draggable
                          key={data.name}
                          draggableId={`item-${data.name}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="flex">
                                <i
                                  className="pi pi-bars mr-2"
                                  onClick={() => {
                                    let res = Columnleft.filter(
                                      (row) => row.name != data.name,
                                    );
                                    setColumnleft(res);
                                  }}
                                ></i>
                                {Columnleft.length < 4 ? (
                                  <i className="pi pi-minus-circle mr-2"></i>
                                ) : (
                                  <i
                                    className="pi pi-minus-circle mr-2"
                                    onClick={() => {
                                      let res = Columnleft.filter(
                                        (row) => row.name != data.name,
                                      );
                                      setColumnleft(res);
                                    }}
                                  ></i>
                                )}
                                {data.header}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Card>
        )}
        {by == 'he' && (
          <Card header={<p style={{ fontSize: '16px' }}>Hidden</p>}>
            {nonselectedCities.map((data, index) => (
              <>
                {' '}
                <div key={index}>
                  <i
                    className="pi pi-plus-circle mr-2"
                    onClick={() => {
                      let res = nonselectedCities.filter(
                        (row) => row.name != data.name,
                      );

                      setnonSelectedCities(res);
                      setColumnright([data, ...Columnright]);
                    }}
                  ></i>
                  <span
                    onClick={() => {
                      setSelectedItemIndex(index);
                      setvalueheader('');
                    }}
                  >
                    {data.header}
                  </span>
                </div>
                {selectedItemIndex === index && (
                  <div
                    className="flex"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  >
                    <input
                      style={{
                        color: 'black',
                        borderRadius: '5px',
                        padding: '5px',
                        height: '35px',
                        width: '150px',
                        background: 'transparent',
                        border: '1px solid gray',
                      }}
                      placeholder="Header name"
                      // value={valueheader}
                      onBlur={(e) => {
                        setvalueheader(e.target.value);
                      }}
                    />
                    &nbsp;
                    <ButtonE
                      shape="circle"
                      variant="plain"
                      size="xs"
                      style={{ padding: '5px', marginTop: '3px' }}
                      onClick={() => {
                        const myString = valueheader;
                        const lengthOfString = myString.length;

                        if (valueheader.length > 0) {
                          handleHeaderUpdate(index, valueheader);
                          setSelectedItemIndex(null);
                        }
                      }}
                      icon={<CgCheck />}
                    />
                    &nbsp;
                    <ButtonE
                      shape="circle"
                      variant="plain"
                      size="xs"
                      style={{ padding: '5px', marginTop: '3px' }}
                      onClick={() => {
                        setSelectedItemIndex(null);
                      }}
                      icon={<CgClose />}
                    />
                  </div>
                )}
              </>
            ))}
          </Card>
        )}
        {by == 'she' && (
          <Card header={<p style={{ fontSize: '16px' }}>Hidden</p>}>
            {nonselectedCities1.map((data, index) => (
              <>
                <div key={index}>
                  <i
                    className="pi pi-plus-circle mr-2"
                    onClick={() => {
                      let res = nonselectedCities1.filter(
                        (row) => row.name != data.name,
                      );

                      if (Columnleft.length > 2) {
                        setnonSelectedCities1(res);
                        setColumnleft([data, ...Columnleft]);
                      }
                    }}
                  ></i>
                  <span
                    onClick={() => {
                      setSelectedItemIndex(index);
                      setvalueheader('');
                    }}
                  >
                    {data.header}
                  </span>
                </div>
                {selectedItemIndex === index && (
                  <div
                    className="flex"
                    style={{ marginBottom: '10px', marginTop: '10px' }}
                  >
                    <input
                      style={{
                        color: 'black',
                        borderRadius: '5px',
                        padding: '5px',
                        height: '35px',
                        width: '150px',
                        background: 'transparent',
                        border: '1px solid gray',
                      }}
                      placeholder="Header name"
                      // value={valueheader}
                      onBlur={(e) => {
                        setvalueheader(e.target.value);
                      }}
                    />
                    &nbsp;
                    <ButtonE
                      shape="circle"
                      variant="plain"
                      size="xs"
                      style={{ padding: '5px', marginTop: '3px' }}
                      onClick={() => {
                        const myString = valueheader;
                        const lengthOfString = myString.length;

                        if (valueheader.length > 0) {
                          handleHeaderUpdate(index, valueheader);
                          setSelectedItemIndex(null);
                        }
                      }}
                      icon={<CgCheck />}
                    />
                    &nbsp;
                    <ButtonE
                      shape="circle"
                      variant="plain"
                      size="xs"
                      style={{ padding: '5px', marginTop: '3px' }}
                      onClick={() => {
                        setSelectedItemIndex(null);
                      }}
                      icon={<CgClose />}
                    />
                  </div>
                )}
              </>
            ))}
          </Card>
        )}
      </div>
    );
  };
  const [options, setoptions] = useState([{ value: 0, label: 'All' }]);
  const [audit, setaudit] = useState([]);

  const [auditValue, setauditValue] = useState(0);
  const [value3, setValue3] = useState();
  const [selectedEventType, setSelectedEventType] = useState(1);

  useEffect(() => {
    // LoadMasters();
    auditpromoscheduling(Channel, convertDateToYMD(value));
    GetTranLog();
  }, []);

  const LoginId = useSelector((state) => state.auth.session.LoginId);

  const LoadMasters = async (selectedEventTypes) => {
    if (selectedEventTypes == 1) {
      // Drop Spot
    }
    if (selectedEventTypes == 2) {
      var fixitem = [
        { value: 1, label: 'All' },
        { value: -2, label: 'Not Used Last 2 Days' },
        { value: -1, label: 'Frequntly used in 7 Days' },
      ];
      const Channelmaster = await apiGetSongcategoryDrop();
      const formattedOptions = Channelmaster.data.map((option) => ({
        value: option.SongCategoryCode,
        label: option.SongCategoryName,
      }));
      setoptions([...fixitem, ...formattedOptions]);
    }
    if (selectedEventTypes == 3) {
      var fixitem = [{ value: 1, label: 'All' }];
      const Channelmaster = await apiGetNTCtypedropdown();
      const formattedOptions = Channelmaster.data.map((option) => ({
        value: option.NTCTypeCode,
        label: option.NTCTypeName,
      }));
      setoptions([...fixitem, ...formattedOptions]);
    }
  };

  const auditpromoscheduling = async (data1, data2) => {
    const auditMaster = await apiGetgetauditfinallogschedulingCom(data1, data2);
    const formattedOptions = auditMaster.data.map((option) => ({
      value: option.D_date,
      label: option.D_date,
    }));
    console.log(formattedOptions);
    setaudit([...formattedOptions]);
  };

  const shworpomo = (value3, name) => {
    console.log(name);
    if (selectedEventType == 1) {
      apiGetPromoScheduling2(value2, convertDateToYMD(value), value3, name)
        .then((response) => response.data)
        .then((data) => {
          setTable2Data(data);

          let res = Object.keys(data[0]);

          let columns = res.map((row) => {
            let column = {};
            column.name = row;
            column.code = row;
            column.width = 100;
            column.header = row;
            return column;
          });

          setTable2DataCopy(data);
          const res1 = columns.filter((city) => {
            return !Columnleft.some(
              (selectedCity) => selectedCity.code === city.code,
            );
          });

          setnonSelectedCities1(res1);
        });
    }
    if (selectedEventType == 2) {
      apiGetSongScheduling2(value2, convertDateToYMD(value), value3, name)
        .then((response) => response.data)
        .then((data) => {
          setTable2Data(data);

          let res = Object.keys(data[0]);

          let columns = res.map((row) => {
            let column = {};
            column.name = row;
            column.code = row;
            column.width = 100;
            column.header = row;
            return column;
          });

          setTable2DataCopy(data);
          const res1 = columns.filter((city) => {
            return !Columnleft.some(
              (selectedCity) => selectedCity.code === city.code,
            );
          });

          setnonSelectedCities1(res1);
        });
    }
    if (selectedEventType == 3) {
      apiGetNTCScheduling2(value2, convertDateToYMD(value), value3, name)
        .then((response) => response.data)
        .then((data) => {
          setTable2Data(data);

          let res = Object.keys(data[0]);

          let columns = res.map((row) => {
            let column = {};
            column.name = row;
            column.code = row;
            column.width = 100;
            column.header = row;
            return column;
          });

          setTable2DataCopy(data);
          const res1 = columns.filter((city) => {
            return !Columnleft.some(
              (selectedCity) => selectedCity.code === city.code,
            );
          });

          setnonSelectedCities1(res1);
        });
    }
  };

  const GetSpots = (SpotTypes, name, vselectedEventType = 0) => {
    console.log('selectedEventType', selectedEventType);
    if (vselectedEventType == 0) {
      vselectedEventType = selectedEventType;
    }
    console.log('vselectedEventType', vselectedEventType);
    if (vselectedEventType == 1) {
      // Drop Spot
      let param = {
        ChannelCode: Channel.ChannelCode,
        LocationCode: Channel.LocationCode,
        TelecastDate: convertDateToYMD(value),
        Mode: SpotTypes,
      };
      apiCallstoreprocedure('USP_Sch_Commercial_scheduling', param)
        .then((response) => response.data)
        .then((data) => {
          setTable2Data(data);
          console.log('setTable2DataCopy*', data);
          let res = Object.keys(data[0]);

          let columns = res.map((row) => {
            let column = {};
            column.name = row;
            column.code = row;
            column.width = 100;
            column.header = row;
            return column;
          });
          console.log('setTable2DataCopy', data);
          setTable2DataCopy(data);
          const res1 = columns.filter((city) => {
            return !Columnleft.some(
              (selectedCity) => selectedCity.code === city.code,
            );
          });

          setnonSelectedCities1(res1);
        });
    }
  };

  const replaceall = () => {
    if (selectedRows.length > 1) {
      show('Kindly select minimum one promo.', 'warning');
      return;
    }

    if (selectedRows2.length > 1) {
      show('Kindly Select atleast One Promo.', 'warning');
      return;
    }

    let row1 = table1Data[selectedRows[0]];
    let row2 = table2Data[selectedRows2[0]];

    let res = table1Data.map((row) => {
      if (row.Event_Name === row1.Event_Name && row.F_C_S_P === 'PR') {
        return {
          ...row,
          Event_Name: row2.Event_Name,
          Duration: row2.Duration,
          Tape_ID: row2.Tape_ID,
          VideoID: row2.VideoID,
        };
      }
      return row;
    });

    let uptime = updateStartTimes(res, true, DisplayNTC);
    setTable1Data(uptime);
  };

  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: BreakNumbers,
      // icon: 'pi pi-pause',
      defaultFocus: 'accept',
      accept: promoinsert2,
      reject,
    });
  };

  const reject = () => {
    //openNotification2('You have rejected', 'warning');
  };

  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const Addcolumnsetting = async () => {
    const mergedData = Columnright.map((item, index) => ({
      ScreenName: 'Commercial Scheduling',
      ColumnName: item.code,
      Header: item.header,
      SequenceNo: index,
      IsVisible: 1,
    }));

    if (mergedData.length > 4) {
      try {
        const resp = await Postcolumnsetting(mergedData, token);
        if (resp.status === 200) {
          setlog('success');
          setMessage('Data Inserted Successfully.');
          return;
        }
        if (resp.status === 204) {
          openNotification2('danger', 'Data Already Exists.');
          return;
        }
      } catch (errors) {
        if (errors.response.status === 500) {
          setlog('error');
          setMessage('Server Error.');
          return;
        }
      }
    } else {
      setlog('danger');
      setMessage('Kindly Select Aleast 5 Columns');
    }
  };
  const Addcolumnsetting2 = async () => {
    const mergedData = Columnleft.map((item, index) => ({
      ScreenName: 'CommercialSchedulingLeft',
      ColumnName: item.code,
      Header: item.header,
      SequenceNo: index,
      IsVisible: 1,
    }));

    if (mergedData.length > 2) {
      try {
        const resp = await Postcolumnsetting(mergedData, token);
        if (resp.status === 200) {
          setlog('success');
          setMessage('Data Inserted Successfully.');
          return;
        }
        if (resp.status === 204) {
          openNotification2('danger', 'Data Already Exists.');
          return;
        }
      } catch (errors) {
        if (errors.response.status === 500) {
          setlog('error');
          setMessage('Server Error.');
          return;
        }
      }
    } else {
      setlog('danger');
      setMessage('Kindly Select Aleast 2 Columns');
    }
  };
  const AutoSchdulefooterContent = (
    <div>
      <ButtonE
        size="sm"
        icon={<CgClose />}
        onClick={() => setAutoSchdulevisible(false)}
      >
        Cancel
      </ButtonE>
      <ButtonE
        variant="solid"
        icon={<CgCheck style={{ marginTop: '2px' }} />}
        onClick={() => {
          setAutoSchdulevisible(false);
          if (by == 'he') {
            Addcolumnsetting();
          }
          if (by == 'she') {
            Addcolumnsetting2();
          }
        }}
        autoFocus
        size="sm"
      >
        Save&nbsp;&nbsp;
      </ButtonE>
    </div>
  );

  const [yupo, setyupo] = useState([]);
  useEffect(() => {
    setyupo([]);
    for (let i = 1; i < table1Data.length; i++) {
      // Start from index 1 to skip the first element
      const currentObject = table1Data[i];
      if (currentObject.F_C_S_P === 'NTC') {
        const previousObject = table1Data[i - 1];
        if (
          previousObject.F_C_S_P === 'S' &&
          previousObject.Start_Time < currentObject.OffsetStartTime
        ) {
          setyupo((prevState) => [
            ...prevState,
            { ...currentObject, index: i },
          ]);
        }
      }
    }
  }, [table1Data]);
  const HeaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between items-center`;

    return (
      <div className={className}>
        <div className="flex justify-between items-center">
          <span className="font-bold">{EventDataName}</span>

          <div className="flex items-center ">
            {selectedRows2 && selectedRows2.length > 0 && (
              <Tooltip title="Columns Setting">
                <span
                  style={{
                    fontSize: 20,
                    marginRight: '10px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setAutoSchdulevisible(true);
                    setby('she');
                  }}
                >
                  <HiOutlineCog />
                </span>
              </Tooltip>
            )}
            <div className="mt-2">
              <ButtonE
                icon={<HiOutlineX />}
                size="xs"
                style={{
                  marginTop: -5,
                }}
                onClick={() => setEventDataName('')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const FilterheaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between items-center`;

    return (
      <div className={className}>
        <div className="flex justify-between items-center">
          <span className="font-bold">Rotation Info</span>

          <div className="flex items-center ">
            <span className="mt-1 mr-1">
              <Badge value={table3Data.length} severity="success"></Badge>
            </span>
            <div className="mt-2">
              <ButtonE
                icon={<HiOutlineX />}
                size="xs"
                style={{
                  marginTop: -5,
                }}
                onClick={() => setEventDataName('')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const BreakwiseheaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between items-center`;

    return (
      <div className={className}>
        <div className="flex justify-between items-center">
          <div className="flex align-items-center items-center">
            <span className="font-bold">Break Wise Duration</span>
          </div>
          <div className="mt-2">
            <ButtonE
              icon={<HiOutlineX />}
              size="xs"
              style={{
                marginTop: -5,
              }}
              onClick={() => setEventDataName('')}
            />
          </div>
        </div>
        <div className="flex align-items-end">
          <div>{options.togglerElement}</div>
        </div>
      </div>
    );
  };

  const cardFooter = (
    <div className="flex">
      <Tooltip title="Insert Promo">
        <button
          onClick={promoinsert2}
          className="p-panel-header-icon p-link mr-2 lbl "
        >
          <span className="lbl pi pi-caret-left text-xl"></span>
        </button>
      </Tooltip>
      <Tooltip title="Bulk Insert">
        <button
          className="p-panel-header-icon p-link mr-2 lbl "
          onClick={confirm1}
        >
          <span className="lbl pi pi-backward text-xl"></span>
        </button>
      </Tooltip>
      <Tooltip title="Replace">
        <button
          className="p-panel-header-icon p-link mr-2 lbl "
          onClick={replace}
        >
          <span className="lbl pi pi-file text-xl"></span>
        </button>
      </Tooltip>
      <Tooltip title="Replace All">
        <button
          className="p-panel-header-icon p-link mr-2 lbl "
          onClick={replaceall}
        >
          <span className="lbl pi pi-clone text-xl"></span>
        </button>
      </Tooltip>
      <Tooltip title="Delete Selected Promos">
        <button
          className="p-panel-header-icon p-link mr-2 lbl "
          onClick={removepromo}
        >
          <span className="lbl pi pi-trash text-xl"></span>
        </button>
      </Tooltip>
    </div>
  );
  useEffect(() => {
    let Event_Name = table1Data[selectedRows[0]]?.Event_Name;

    let res = table1Data.filter((row, index) => row.Event_Name == Event_Name);
    setTable3Data([...res]);
  }, [selectedRows]);
  // const [breaknumbers,setbreaknumbers]=useState([])
  // useEffect(() => {
  // }, [breaknumbers])
  const generateCheckboxes = () => {
    const checkboxes = [];
    for (let i = 1; i <= 6; i++) {
      checkboxes.push(
        <Checkbox key={i} value={i}>
          Break {i}
        </Checkbox>,
      );
    }
    return checkboxes;
  };

  const BreakNumbers = () => {
    return (
      <div>
        <div className="text-700 mb-6">
          Do you want to include commercials during these breaks?
        </div>
        <Checkbox.Group
          value={breaknumbers}
          onChange={(options) => {
            // SelectedBrkNo = options;
            setbreaknumbers(options);
          }}
        >
          {generateCheckboxes()}
        </Checkbox.Group>
        <ul className="list-none p-0 m-0">
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="mr-5 flex align-items-center mt-3">
              <TimeInput
                value={starttime}
                onChange={setstarttime}
                style={{ color: 'black' }}
              />
              <TimeInput
                value={endtime}
                onChange={setendtime}
                style={{ color: 'black' }}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const filterOptions = [
    { value: 'starts_with', label: 'Starts With' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Not Contains' },
    { value: 'ends_with', label: 'Ends With' },
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    // { value: 'clear', label: 'Clear'},
  ];

  // Convert the string to a JavaScript Date object

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)

  const deleteallpromos = () => {
    let res = [...table1Data];
    let filtereddata = res.filter((row) => row.F_C_S_P !== 'PR');
    setTable1Data(filtereddata);
  };

  function adjustColorBrightness(hex, factor) {
    // Parse hex color value to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Adjust brightness
    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);

    // Ensure values are in valid range
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));

    // Convert back to hex
    const result = `#${((r << 16) | (g << 8) | b)
      .toString(16)
      .padStart(6, '0')}`;

    return result;
  }
  function toggleCircle() {
    const circle = document.getElementsByClassName('circle')[0];

    // Check the current display state and toggle accordingly
    if (circle.style.display === 'none') {
      circle.style.display = 'block'; // Show the element
    } else {
      circle.style.display = 'none'; // Hide the element
    }
  }
  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(?:^|\s)\S/g, (char) => {
      return char.toUpperCase();
    });
  };

  let maxWidth = `${!Insertpromo ? '100%' : '70%'}`;
  // const Channel = useSelector((state) => state.locale.selectedChannel);

  const BackToBack = (resrr) => {
    console.log('BackToBack_updtk');
    let updtk = processData(resrr);
    console.log('updtk', updtk);
    setTable1Data(updtk);
  };

  return (
    <>
      <Loader showLoader={showLoader} />
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      <div className="pb-1 pt-1 ">
        {Channel.AutoSave ? (
          <Tooltip title="Auto Save">
            <Clock
              Progress={Progress}
              PromoSchdulingSave={ComSchdulingSave}
              openNotification={openNotification}
            />
          </Tooltip>
        ) : null}
      </div>
      <div>
        <div className="flex justify-between">
          {isdisplaysetting && (
            <div className="flex justify-start">
              <Tooltip title="Columns Setting">
                <span
                  style={{
                    fontSize: 25,
                    marginTop: '5px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setAutoSchdulevisible(true);
                    setby('he');
                  }}
                >
                  <HiOutlineCog />
                </span>
              </Tooltip>
              {/* <Tooltip title="Start Time Program base">
                                <InputSwitch
                                    checked={isProgrambase}
                                    onChange={(e) => {
                                        setIsProgrambase(e.value);
                                        
                                        let res = updateStartTimes(table1Data, e.value, DisplayNTC);
                                        setTable1Data(res);
                                    }}
                                    style={{
                                        fontSize: 20,
                                        marginTop: '5px',
                                        marginRight: '10px',
                                        marginBottom: '10px',
                                        cursor: "pointer"
                                    }}
                                />
                            </Tooltip> */}
              {/* <Tooltip title="Segment Move/Delete">
                                <Switcher
                                    style={{
                                        fontSize: 20,
                                        cursor: 'pointer',
                                        padding: '5px',
                                    }}
                                    checked={segmentMoveDelete}
                                    onChange={(e) => {
                                        setSegmentMoveDelete(!e);
                                    }}
                                />
                            </Tooltip> */}

              {/* <Tooltip
                                title="Copy"
                                style={{
                                    fontSize: 20,
                                    cursor: 'pointer',
                                    padding: '5px',
                                }}
                            >
                                <Switcher
                                    style={{
                                        fontSize: 20,
                                        cursor: 'pointer',
                                        padding: '5px',
                                    }}
                                    checked={copypromo}
                                    onChange={(e) => {
                                        setCopypromo(!e);
                                    }}
                                />
                            </Tooltip> */}
            </div>
          )}
          <div className="flex justify-end">
            {isdisplaysetting && (
              <div className="flex justify-end gap-2">
                <div className="flex justify-justify-end gap-2">
                  <div
                    className=""
                    style={{
                      overflow: 'auto',
                      whiteSpace: 'nowrap',
                      width: 600,
                      height: 45,
                    }}
                  >
                    {startTimeArray.map((item, key) => (
                      <ButtonE
                        size="xs"
                        className="ml-1 fpctimebtn"
                        key={key}
                        onClick={() => {
                          const div1 = document.getElementById('div1');
                          let targetElement = div1.querySelector(
                            `.row-${item.columnIndex}`,
                          );
                          targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                          });
                        }}
                        style={{
                          backgroundColor:
                            item.Diffrance > 0 ? '#f26f7f' : '#6ff2b9',
                          //adjustColorBrightness('#b3ffec', 1 - item.totalDuration / 1000),
                          color: 'black',
                        }}
                      >
                        {item.StartTime}
                      </ButtonE>
                    ))}
                  </div>

                  <div className="flex justify-end gap-1">
                    <Tooltip title="Undo">
                      <ButtonE
                        shape="circle"
                        size="sm"
                        variant="twoTone"
                        onClick={() => {
                          let currentversion =
                            table1dataversions[cm2.current - 1];
                          let previousversion =
                            table1dataversions[cm2.current - 2];
                          if (cm2.current > 1) {
                            setundo(true);
                            cm2.current--;
                            setTable1Data(previousversion);
                          }
                        }}
                        icon={<CgUndo />}
                      />
                    </Tooltip>
                    {cm2.current < table1dataversions.length && (
                      <Tooltip title="Redo">
                        <ButtonE
                          shape="circle"
                          size="sm"
                          variant="twoTone"
                          onClick={() => {
                            let nextversion = table1dataversions[cm2.current];
                            setredo(true);
                            cm2.current++;
                            setTable1Data(nextversion);
                          }}
                          icon={<CgRedo />}
                        />
                      </Tooltip>
                    )}

                    <Tooltip title="Hide">
                      <ButtonE
                        shape="circle"
                        size="sm"
                        variant="twoTone"
                        onClick={() => setInsertpromo(!Insertpromo)}
                        icon={Insertpromo ? <CgLogIn /> : <CgLogOut />}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toast ref={toast} />
      {/* add here froheaderadd code */}
      <ContextMenu model={items} ref={cm} breakpoint="767px" />
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* <Splitter style={{ height: '800px', border: 'none' }}>
                    <SplitterPanel size={100}> */}
        <div className={!Insertpromo ? 'flex-full-width' : 'flex gap-5'}>
          <div
            className="grid grid-cols-1 gap-2  table-container"
            style={{
              backgroundColor: '#1F2937',
              overflow: 'auto',
              maxHeight: '100vh',
              maxWidth: maxWidth,
              height: '80vh',
            }}
            id="div1"
          >
            {/* <Card className="pt-0"> */}
            <ScrollBar>
              <Droppable droppableId="table1">
                {(provided) =>
                  Columnright != null && (
                    <Table
                      ref={combineRefs(provided.innerRef, tableContainerRef)}
                      className="resizable-table"
                    >
                      <THead className="theade">
                        <Tr className="tre">
                          {Columnright.map((city, index) => (
                            <>
                              <FilterColumn
                                columnName={city.name}
                                table2Data={table1Data}
                                setTable2Data={setTable1Data}
                                table2DataCopy={table1DataCopy}
                                filterOptions={filterOptions}
                                columnFilters={columnFilters}
                                setColumnFilters={setColumnFilters}
                                IsSortingAllow={false}
                                selectedCities={Columnright}
                                setSelectedCities={setColumnright}
                                ColIndex={index}
                                ColumnInfo={city}
                                DisplayFilter={DisplayFilter}
                              />
                              {/* <OverlayPanel ref={op}>
                              <Columns />
                            </OverlayPanel>
                            <OverlayPanel ref={op2}
                              <Columns2 />
                            </OverlayPanel> */}
                            </>
                          ))}
                        </Tr>
                      </THead>

                      <TBody {...provided.droppableProps} className="tbodye">
                        {table1Data.map((data, index) => (
                          <>
                            {/* data.F_C_S_P === 'C' && */}
                            {(DisplayNTC || data.F_C_S_P !== 'C') && (
                              <Draggable
                                key={data.Id}
                                draggableId={`row-${index}`}
                                index={index}
                              >
                                {(provided) => (
                                  <Tr
                                    ref={combineRefs(
                                      provided.innerRef,
                                      tableContainerRef,
                                    )}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    // className={`backcolor draggble-row row-${data.Id}     ${!DisplayNTC && data.F_C_S_P === 'NTC' ? 'Rowhidden' : ''}  ${data.PrimaryID === selectedPrimaryID ? 'showntcRow' : ''} `}
                                    className={`backcolor  rowINeed-${data.SequenceNo
                                      }  draggble-row row-${data.Id} ${data.PrimaryID === selectedPrimaryID
                                        ? 'showntcRow'
                                        : !DisplayNTC && data.F_C_S_P === 'NTC'
                                          ? 'Rowhidden'
                                          : ''
                                      }
                                                                                `}
                                    onClick={(e) => {
                                      if (data['F_C_S_P'] === 'CM') {
                                        all();
                                      }
                                      // getpromo(data);
                                      //setSelectedRowsData(data)
                                      if (e.ctrlKey) {
                                        setSelectedRows((prevSelectedRows) => {
                                          if (
                                            prevSelectedRows.includes(index)
                                          ) {
                                            return prevSelectedRows.filter(
                                              (row) => row !== index,
                                            );
                                          } else {
                                            // If not selected, add it
                                            return [...prevSelectedRows, index];
                                          }
                                        });
                                      } else {
                                        setSelectedRows([index]);
                                      }
                                    }}
                                    onContextMenu={(e) => {
                                      cm.current.show(e);
                                      settobepastedrow(index);
                                    }}
                                  >
                                    {Columnright.map((city) => {
                                      const mismatchedItem =
                                        mismatchedItems.find(
                                          (item2) =>
                                            item2.FPC_ID === data['FPC_ID'],
                                        );
                                      return (
                                        <Td
                                          className={'jhh '}
                                          key={city.name}
                                          style={{
                                            borderBottom: '1px solid #8c7777',
                                            borderRight: '1px solid #8c7777',
                                            ...(selectedRows.includes(index)
                                              ? style.pressed
                                              : {
                                                backgroundColor:
                                                  data['TxLogCode'].length >
                                                    2 &&
                                                    city.name ===
                                                    data['TxLogCode']
                                                    ? '#C0C0C0'
                                                    : data.EventDefaultBackColor,
                                                color:
                                                  data.EventDefaultFrontColor,
                                                width: data.width,
                                              }),
                                          }}
                                        >
                                          <div
                                            className={
                                              city.name === 'Event_Name'
                                                ? 'flex items-center '
                                                : 'flex justify-center items-center'
                                            }
                                          >
                                            {city.name === 'Event_Name' &&
                                              data['Event_Name'] &&
                                              data['F_C_S_P'] && (
                                                <Avatar
                                                  size={20}
                                                  shape="circle"
                                                  className={classNames(
                                                    'mr-4 text-white dark:text-white bg-black dark:bg-black',
                                                  )}
                                                >
                                                  {data['F_C_S_P']}
                                                </Avatar>
                                              )}
                                            {data['FPC_Time'].length !== 0 &&
                                              city.name === 'FPC_Time' &&
                                              data['F_C_S_P'] === 'CT' &&
                                              selectedRows.includes(index) &&
                                              (mismatchedItem ? (
                                                <span
                                                  className=" pi pi-sync text-base"
                                                  style={{ cursor: 'pointer' }}
                                                  onClick={() => {
                                                    setIsOpen12(true);

                                                    setFPCIDSTORE(
                                                      data['FPC_ID'],
                                                    );
                                                  }}
                                                ></span>
                                              ) : null)}{' '}
                                            {data[city.name]}
                                            {data['FPC_Time'].length === 0 &&
                                              city.name === 'FPC_Time' &&
                                              (data['F_C_S_P'] === 'PR' ||
                                                data['F_C_S_P'] === 'SG' ||
                                                data['F_C_S_P'] === 'CM') &&
                                              selectedRows.includes(index) && (
                                                <div className="flex gap-2">
                                                  <Tooltip title="Drop Spot">
                                                    <button
                                                      onClick={() =>
                                                        handleRowDropButtonClick(
                                                          index,
                                                        )
                                                      }
                                                    >
                                                      <span className=" pi pi-box text-base"></span>
                                                    </button>
                                                  </Tooltip>
                                                  <button
                                                    onClick={() =>
                                                      handleRowFilterButtonClick(
                                                        index,
                                                      )
                                                    }
                                                  >
                                                    <span className=" pi pi-info-circle text-base"></span>
                                                  </button>
                                                  {selectedRowsFORNTC.includes(
                                                    index,
                                                  ) && (
                                                      <button
                                                        onClick={() => {
                                                          setSelectedPrimaryID(
                                                            selectedPrimaryID ===
                                                              data['PrimaryID']
                                                              ? 0
                                                              : data['PrimaryID'],
                                                          );
                                                        }}
                                                      >
                                                        <HiFilm />
                                                      </button>
                                                    )}
                                                </div>
                                              )}
                                            {data['FPC_Time'].length === 0 &&
                                              city.name === 'FPC_Time' &&
                                              data['F_C_S_P'] === 'S' &&
                                              selectedRowsFORNTC.includes(
                                                index,
                                              ) && (
                                                <div className="flex gap-2">
                                                  <button
                                                    onClick={() => {
                                                      setSelectedPrimaryID(
                                                        selectedPrimaryID ===
                                                          data['PrimaryID']
                                                          ? 0
                                                          : data['PrimaryID'],
                                                      );
                                                    }}
                                                  >
                                                    {/* <span className=" pi pi-link text-base"></span> */}
                                                    <HiFilm size={80} />
                                                  </button>
                                                </div>
                                              )}
                                          </div>
                                        </Td>
                                      );
                                    })}
                                  </Tr>
                                )}
                              </Draggable>
                            )}
                          </>
                        ))}
                        {provided.placeholder}
                      </TBody>
                    </Table>
                  )
                }
              </Droppable>
            </ScrollBar>
            {/* </Card> */}
          </div>
          <Dial
            isOpen={dialogIsOpen12}
            onClose={() => setIsOpen12(false)}
            onRequestClose={() => setIsOpen12(false)}
          >
            <h5 className="mb-4">Are you sure you want to change program?</h5>
            <div className="grid grid-cols-2 gap-2">
              <Card header="Current Program">
                {/* console.log(mismatchedItems); console.log(mismatchedItems2); */}
                {
                  // Filtering the items based on conditions and mapping them to JSX elements
                  mismatchedItems
                    .filter(
                      (itm) =>
                        itm.FPC_ID === FPCIDSTORE && itm.F_C_S_P === 'CT',
                    )
                    .map((item, index) => (
                      <p key={index} style={{ fontSize: 12, color: 'wheat' }}>
                        {/* Displaying -1 if F_C_S_P === 'S', otherwise displaying Event_Name */}
                        {item.Event_Name}
                      </p>
                    ))
                }
                <p style={{ fontSize: 12, color: 'wheat' }}>
                  Totel Break&nbsp;= &nbsp;
                  {
                    mismatchedItems.filter(
                      (itm) => itm.FPC_ID === FPCIDSTORE && itm.F_C_S_P === 'S',
                    ).length
                  }
                </p>
              </Card>
              <Card header="New Program">
                {/* console.log(mismatchedItems); console.log(mismatchedItems2); */}
                {mismatchedItems2
                  .filter(
                    (itm) => itm.FPC_ID == FPCIDSTORE && itm.F_C_S_P === 'CT',
                  )
                  .map((item, index) => (
                    <p style={{ fontSize: 12, color: 'wheat' }}>
                      {item.Event_Name}
                    </p>
                  ))}
                <p style={{ fontSize: 12, color: 'wheat' }}>
                  Totel Break&nbsp;= &nbsp;
                  {
                    mismatchedItems2.filter(
                      (itm) => itm.FPC_ID === FPCIDSTORE && itm.F_C_S_P === 'S',
                    ).length
                  }
                </p>
              </Card>
            </div>
            <div className="text-right mt-6">
              <ButtonE
                className="ltr:mr-2 rtl:ml-2"
                variant="plain"
                onClick={() => setIsOpen12(false)}
              >
                No
              </ButtonE>
              <ButtonE
                variant="solid"
                onClick={() => {
                  const mergedData = replaceData(mismatchedItems2, FPCIDSTORE);
                  setIsOpen12(false);

                  const news = mismatchedItems.filter(
                    (itm) => itm.FPC_ID != FPCIDSTORE,
                  );
                  setMismatchedItems(news);
                  const count = news.filter(
                    (item) => item.F_C_S_P === 'CT',
                  ).length;
                  setcount(count);
                  setTable1Data(mergedData);
                }}
              >
                Yes
              </ButtonE>
            </div>
          </Dial>
          <Dial
            isOpen={dialogIsOpen1}
            onClose={() => setIsOpen1(false)}
            onRequestClose={() => setIsOpen1(false)}
          >
            <h5 className="mb-4">Are you sure to Generate log. ?</h5>
            <div className="text-right mt-6">
              <ButtonE
                className="ltr:mr-2 rtl:ml-2"
                variant="plain"
                onClick={() => setIsOpen1(false)}
              >
                No
              </ButtonE>
              <ButtonE
                variant="solid"
                onClick={() =>
                  apiGettransmissionlog(Channel, convertDateToYMD(value), 'GEN')
                    .then((response) => response.data)
                    .then((data) => {
                      let resdt = updateStartTimes(data, true, false);
                      if (resdt) {
                        setTable1Data(resdt);
                        setIsOpen1(false);
                      }
                    })
                }
              >
                Yes
              </ButtonE>
            </div>
          </Dial>
          {Insertpromo ? (
            <div className="card flex flex-col gap-5">
              <div className="grid grid-cols-9 gap-2">
                <Tooltip title="Menu">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={isdisplaysetting ? 'solid' : 'twoTone'}
                    icon={isdisplaysetting ? <BsViewList /> : <BsViewList />}
                    onClick={() => {
                      setisdisplaysetting(!isdisplaysetting);
                    }}
                  />
                </Tooltip>
                {/* <Tooltip title="Generate log">
                                    <ButtonE
                                        className="text-lg"
                                        size="sm"
                                        variant={'twoTone'}
                                        icon={<HiDatabase />}
                                        onClick={() => {
                                            setIsOpen1(true);
                                        }}
                                    />
                                </Tooltip> */}

                <Tooltip title="Export">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlineUpload />}
                    onClick={() => {
                      const newArray = Columnright.map((item) => {
                        const { header, ...rest } = item;
                        return rest;
                      });
                      ExportxlswithColor(
                        false,
                        false,
                        0,
                        0,
                        true,
                        table1Data,
                        'Commercial Scheduling',
                        newArray,
                        true,
                      );
                    }}
                  />
                </Tooltip>
                {/* <Tooltip title="Auto Schedule">
                                    <ButtonE
                                        className="text-lg"
                                        size="sm"
                                        variant="twoTone"
                                        icon={<HiOutlineViewGrid />}
                                        onClick={() => {
                                            alert('Auto Schedule');
                                        }}
                                    />
                                </Tooltip> */}
                <Tooltip title={ren}>
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlineArrowsExpand />}
                    onClick={() => {
                      toggleFullScreen();
                    }}
                  />
                </Tooltip>
                <Tooltip title="Filter">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={DisplayFilter ? 'solid' : 'twoTone'}
                    icon={DisplayFilter ? <HiFilter /> : <HiOutlineFilter />}
                    onClick={() => {
                      setDisplayFilter(!DisplayFilter);
                    }}
                  />
                </Tooltip>
                {/* <Tooltip title="Play Out File Export">
                                    <ButtonE
                                        className="text-lg"
                                        size="sm"
                                        variant="twoTone"
                                        icon={<HiFolderOpen />}
                                        onClick={() => {
                                            ExportPlayOut()
                                        }}
                                    />
                                </Tooltip> */}
                {/* <Tooltip title="Show NTC">
                                    <ButtonE
                                        className="text-lg"
                                        size="sm"
                                        variant={DisplayNTC ? 'solid' : 'twoTone'}
                                        icon={DisplayNTC ? <HiFilm /> : <HiFilm />}
                                        onClick={() => {
                                            setDisplayNTC(!DisplayNTC);
                                            const NTCExist = table1Data.filter((item) => item.F_C_S_P === 'NTC');

                                            const updatedArray = Columnright.some(
                                                (item) => item.header == 'OffsetStartTime',
                                            );

                                            if (updatedArray) {
                                                return;
                                            } else {
                                                if (NTCExist.length > 0) {
                                                    setColumnright([
                                                        ...Columnright,
                                                        {
                                                            ScreenType: 'FinalLog',
                                                            Sequence: 2,
                                                            code: 'OffsetStartTime',
                                                            header: 'OffsetStartTime',
                                                            isvisible: true,
                                                            name: 'OffsetStartTime',
                                                            width: '90',
                                                        },
                                                    ]);

                                                    setDisplayNTC(true);
                                                    return;
                                                }
                                            }
                                            if (NTCExist.length == 0) {
                                                const updatedArray2 = Columnright.filter(
                                                    (item) => item.header !== 'OffsetStartTime',
                                                );
                                                setDisplayNTC(false);
                                                setColumnright(updatedArray2);
                                                return;
                                            }
                                            let res = updateStartTimes(table1Data, true, true);
                                            // console.log(res);
                                            setTable1Data(res);
                                        }}
                                    />
                                </Tooltip> */}
                <Tooltip title="Restore">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={'twoTone'}
                    icon={<HiOutlineRefresh />}
                    onClick={() => {
                      openDialog();
                    }}
                  />
                </Tooltip>
                <Tooltip title="Smart Shuffle">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={DisplayFilter ? 'solid' : 'twoTone'}
                    icon={DisplayFilter ? <IoMdShuffle /> : <IoMdShuffle />}
                    onClick={() => setISSmartShuffle(true)}
                  />
                </Tooltip>
                <Tooltip title="Import Sequence">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={'twoTone'}
                    icon={<IoIosList />}
                    onClick={() => {
                      setIsImportSequenceDialogOpen(true);
                    }}
                  />
                </Tooltip>
              </div>

              <Card className={`${EventDataName ? 'hidden' : null} `}>
                <div
                  className=" web-card px-5"
                  style={{ height: 200, overflow: 'scroll' }}
                >
                  <h4
                    className=""
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.8)',
                      letterSpacing: 0,
                    }}
                  >
                    Break Wise Inventory
                  </h4>
                  {CommercialDurationBrkWise?.map((item, index) => (
                    <div key={index}>
                      {Object.entries(item).map(([key, value]) => (
                        <div className="mb-2">
                          <div className="flex justify-between items-center mx-1">
                            <p>Break Number - {value.BreakNumber}</p>{' '}
                            <p key={key}>{`${
                              // JSON.stringify
                              value.TotalDurationByBreak
                              }`}</p>
                          </div>
                          <Progress
                            percent={
                              (Number(
                                parseDuration(value.TotalDurationByBreak),
                              ) /
                                180) *
                              100
                            }
                            size="xl"
                            color="green-500"
                            customInfo={<></>}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ButtonE
                    size="xs"
                    onClick={() => {
                      // if (dropcount != 0) {
                      console.log('Drop Spots');
                      GetSpots('D', '');
                      setEventDataName('Drop Spot');
                      setSelectedEventType(1);
                      setValue3(2);
                      LoadMasters(1);
                      GetSpots('D', '', 1);

                      setDisplay(true);
                    }}
                  >
                    {' '}
                    <Badges content={dropcount}> </Badges>
                    Drop Spots
                  </ButtonE>

                  <ButtonE
                    size="xs"
                    onClick={() => {
                      setEventDataName('Last Minute Spots');
                      setTable2Data([]);
                      setSelectedEventType(2);
                      setValue3(1);
                      LoadMasters(2);
                      GetSpots('N', '', 2);
                      setDisplay(true);
                      // Commercial_scheduling_CountsApi()
                      // if (lastmincount > 0) {
                      //     setEventDataName('Last Minute Spots');
                      //     setTable2Data([])
                      //     setSelectedEventType(2);
                      //     setValue3(1);
                      //     LoadMasters(2);
                      //     GetSpots('N', '')
                      //     setDisplay(true);
                      // } else {
                      //     openNotification2('info', "There are no New booked spots.")//
                      // }
                    }}
                  >
                    <Badges content={lastmincount}> </Badges>
                    Last Minute
                  </ButtonE>
                  <ButtonE
                    size="xs"
                    onClick={() => {
                      setEventDataName('Rules Check');
                    }}
                  >
                    <Badges content={blankTxLogCount}> </Badges>
                    Rules Check
                  </ButtonE>

                  <ButtonE
                    size="xs"
                    onClick={() => {
                      setEventDataName('Verify RODP');
                      // GetTranLog();
                      // setDisplay(false);
                      CheckRODPALLRows();
                    }}
                  >
                    Check RODP
                  </ButtonE>
                  {/* </Badges> */}

                  <ButtonE
                    size="xs"
                    onClick={() => setEventDataName('Break Wise Duration')}
                  >
                    Duration
                  </ButtonE>
                  <ButtonE
                    size="xs"
                    onClick={() => setEventDataName('Rotation Info')}
                  >
                    Rotation Info
                  </ButtonE>
                  <ButtonE
                    size="xs"
                    onClick={() => setEventDataName('Summary')}
                  >
                    Summary
                  </ButtonE>
                </div>
              </Card>
              {/* {EventDataName} */}
              {(() => {
                switch (EventDataName) {
                  case 'Drop Spot':
                  case 'Last Minute Spots':
                  case 'Program Search':
                    return (
                      <Card
                        header={<HeaderTemplate />}
                      // style={{ height: '425px' }}
                      // footerBorder={false}
                      //footer={EventDataName == 'Drop Spot' ? cardFooter : null}
                      >
                        <ConfirmPopup />
                        <div style={{ width: 'auto' }}>
                          <div
                            style={{
                              height: '400px',
                              width: '400px',
                              overflow: 'hidden',
                            }}
                          >
                            <ScrollBar>
                              <Droppable droppableId="table2">
                                {(provided, snapshot) => {
                                  return (
                                    <Table
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      className="table table-striped"
                                    >
                                      <THead>
                                        <Tr className="tre">
                                          {Columnleft.map((city, index) => (
                                            <FilterColumn
                                              columnName={city.name}
                                              table2Data={table2Data}
                                              setTable2Data={setTable2Data}
                                              table2DataCopy={table2DataCopy}
                                              filterOptions={filterOptions}
                                              columnFilters={columnFilters}
                                              setColumnFilters={
                                                setColumnFilters
                                              }
                                              IsSortingAllow={true}
                                              selectedCities={Columnleft}
                                              setSelectedCities={setColumnleft}
                                              ColIndex={index}
                                              ColumnInfo={city}
                                            />
                                          ))}
                                        </Tr>
                                      </THead>
                                      <TBody {...provided.droppableProps}>
                                        {table2Data.map((data, index) => (
                                          <Draggable
                                            key={data.Id}
                                            draggableId={`row1-${index}`}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <Tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`backcolor draggble-row row-${data.Id
                                                  } ${!DisplayS &&
                                                    data.F_C_S_P === 'S'
                                                    ? 'Rowhidden'
                                                    : ''
                                                  }`}
                                                onClick={(e) => {
                                                  const indices =
                                                    findIndicesWithSameFPC_ID(
                                                      table2Data,
                                                      data.FPCIDForDrag,
                                                    );
                                                  if (indices.length > 0) {
                                                    setSelectedRows2(indices);
                                                    return;
                                                  }
                                                  // return
                                                  // setSelectedRows2(indices)
                                                  if (e.ctrlKey) {
                                                    setSelectedRows2(
                                                      (prevSelectedRows) => {
                                                        // Check if the row is already selected
                                                        if (
                                                          prevSelectedRows.includes(
                                                            index,
                                                          )
                                                        ) {
                                                          // If selected, remove it
                                                          return prevSelectedRows.filter(
                                                            (row) =>
                                                              row !== index,
                                                          );
                                                        } else {
                                                          // If not selected, add it
                                                          return [
                                                            ...prevSelectedRows,
                                                            index,
                                                          ];
                                                        }
                                                      },
                                                    );
                                                  } else if (e.shiftKey) {
                                                    e.preventDefault();
                                                    if (selectedRows2.length) {
                                                      setSelectedRows2(
                                                        (prevSelectedRows) => {
                                                          // Check if the row is already selected
                                                          if (
                                                            prevSelectedRows.includes(
                                                              index,
                                                            )
                                                          ) {
                                                            // If selected, remove it
                                                            return prevSelectedRows.filter(
                                                              (row) =>
                                                                row !== index,
                                                            );
                                                          } else {
                                                            // If not selected, add all
                                                            let sorted =
                                                              prevSelectedRows.sort();
                                                            let max =
                                                              sorted[
                                                              sorted.length -
                                                              1
                                                              ];
                                                            let shiftAdded =
                                                              createArray(
                                                                max,
                                                                index,
                                                              );

                                                            return [
                                                              ...prevSelectedRows,
                                                              ...shiftAdded,
                                                            ];
                                                          }
                                                        },
                                                      );
                                                    }
                                                  } else {
                                                    setSelectedRows2([index]);
                                                  }
                                                }}
                                              >
                                                {Columnleft.map((city) => (
                                                  <Td
                                                    className={'jhh '}
                                                    key={city.name}
                                                    style={{
                                                      borderBottom:
                                                        '1px solid #8c7777',
                                                      borderRight:
                                                        '1px solid #8c7777',
                                                      ...(selectedRows2.includes(
                                                        index,
                                                      )
                                                        ? style.pressed
                                                        : {
                                                          backgroundColor:
                                                            data.EventDefaultBackColor,
                                                          color:
                                                            data.EventDefaultFrontColor,
                                                          width: data.width,
                                                        }),
                                                    }}
                                                  >
                                                    <div
                                                      className={
                                                        city.name ===
                                                          'Event_Name'
                                                          ? 'flex items-center '
                                                          : 'flex justify-center items-center'
                                                      }
                                                    >
                                                      {data[city.name]}
                                                    </div>
                                                  </Td>
                                                ))}
                                              </Tr>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </TBody>
                                    </Table>
                                  );
                                }}
                              </Droppable>
                            </ScrollBar>
                          </div>
                        </div>
                      </Card>
                    );
                  case 'Rules Check':
                    return (
                      <Card
                        header={<HeaderTemplate />}
                      // style={{ height: '425px' }}
                      // footerBorder={false}
                      //footer={EventDataName == 'Drop Spot' ? cardFooter : null}
                      >
                        <ConfirmPopup />
                        <div style={{ width: 'auto' }}>
                          <div
                            style={{
                              height: '300px',
                              width: '400px',
                              overflow: 'hidden',
                            }}
                          >
                            <ScrollBar>
                              <Droppable droppableId="table2">
                                {(provided, snapshot) => {
                                  return (
                                    <Table
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      className="table table-striped"
                                    >
                                      <THead>
                                        <Tr className="tre">
                                          {rulecheckgg.map((city, index) => (
                                            <FilterColumn
                                              columnName={city.name}
                                              table2Data={table2Data}
                                              setTable2Data={setTable2Data}
                                              table2DataCopy={table2DataCopy}
                                              filterOptions={filterOptions}
                                              columnFilters={columnFilters}
                                              setColumnFilters={
                                                setColumnFilters
                                              }
                                              IsSortingAllow={true}
                                              selectedCities={rulecheckgg}
                                              // setSelectedCities={setColumnleft}
                                              ColIndex={index}
                                              ColumnInfo={city}
                                            />
                                          ))}
                                        </Tr>
                                      </THead>
                                      <TBody {...provided.droppableProps}>
                                        {rulecheck.map((data, index) => (
                                          <Draggable
                                            key={data.Id}
                                            draggableId={`row1-${index}`}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <Tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`backcolor draggble-row row-${data.Id
                                                  } ${!DisplayS &&
                                                    data.F_C_S_P === 'S'
                                                    ? 'Rowhidden'
                                                    : ''
                                                  }`}
                                                onClick={(e) => {
                                                  const indices =
                                                    findIndicesWithSameFPC_ID(
                                                      table2Data,
                                                      data.FPCIDForDrag,
                                                    );
                                                  if (indices.length > 0) {
                                                    setSelectedRows2(indices);
                                                    return;
                                                  }
                                                  // return
                                                  // setSelectedRows2(indices)
                                                  if (e.ctrlKey) {
                                                    setSelectedRows2(
                                                      (prevSelectedRows) => {
                                                        // Check if the row is already selected
                                                        if (
                                                          prevSelectedRows.includes(
                                                            index,
                                                          )
                                                        ) {
                                                          // If selected, remove it
                                                          return prevSelectedRows.filter(
                                                            (row) =>
                                                              row !== index,
                                                          );
                                                        } else {
                                                          // If not selected, add it
                                                          return [
                                                            ...prevSelectedRows,
                                                            index,
                                                          ];
                                                        }
                                                      },
                                                    );
                                                  } else if (e.shiftKey) {
                                                    e.preventDefault();
                                                    if (selectedRows2.length) {
                                                      setSelectedRows2(
                                                        (prevSelectedRows) => {
                                                          // Check if the row is already selected
                                                          if (
                                                            prevSelectedRows.includes(
                                                              index,
                                                            )
                                                          ) {
                                                            // If selected, remove it
                                                            return prevSelectedRows.filter(
                                                              (row) =>
                                                                row !== index,
                                                            );
                                                          } else {
                                                            // If not selected, add all
                                                            let sorted =
                                                              prevSelectedRows.sort();
                                                            let max =
                                                              sorted[
                                                              sorted.length -
                                                              1
                                                              ];
                                                            let shiftAdded =
                                                              createArray(
                                                                max,
                                                                index,
                                                              );

                                                            return [
                                                              ...prevSelectedRows,
                                                              ...shiftAdded,
                                                            ];
                                                          }
                                                        },
                                                      );
                                                    }
                                                  } else {
                                                    setSelectedRows2([index]);
                                                  }
                                                }}
                                              >
                                                {rulecheckgg.map((city) => (
                                                  <Td
                                                    className={
                                                      city.name === 'Event_Name'
                                                        ? 'jhh'
                                                        : 'tde'
                                                    }
                                                    key={city.name}
                                                    style={{
                                                      ...(selectedRows2.includes(
                                                        index,
                                                      )
                                                        ? style.pressed
                                                        : {
                                                          backgroundColor:
                                                            data.EventDefaultBackColor,
                                                          color:
                                                            data.EventDefaultFrontColor,
                                                          width: data.width,
                                                        }),
                                                    }}
                                                  >
                                                    {data[city.name]}
                                                  </Td>
                                                ))}
                                              </Tr>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </TBody>
                                    </Table>
                                  );
                                }}
                              </Droppable>
                            </ScrollBar>
                          </div>
                        </div>
                      </Card>
                    );
                  case 'Verify RODP':
                    return (
                      <Card
                        header={<HeaderTemplate />}
                      // style={{ height: '425px' }}
                      // footerBorder={false}
                      //footer={EventDataName == 'Drop Spot' ? cardFooter : null}
                      >
                        <ConfirmPopup />
                        <div style={{ width: 'auto' }}>
                          <div
                            style={{
                              height: '300px',
                              width: '400px',
                              overflow: 'hidden',
                            }}
                          >
                            <ScrollBar>
                              <Droppable droppableId="table2">
                                {(provided, snapshot) => {
                                  return (
                                    <Table
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      className="table table-striped"
                                    >
                                      <THead>
                                        <Tr className="tre">
                                          {CHeckRODPTable.map((city, index) => (
                                            <FilterColumn
                                              columnName={city.name}
                                              table2Data={table2Data}
                                              setTable2Data={setTable2Data}
                                              table2DataCopy={table2DataCopy}
                                              filterOptions={filterOptions}
                                              columnFilters={columnFilters}
                                              setColumnFilters={
                                                setColumnFilters
                                              }
                                              IsSortingAllow={true}
                                              selectedCities={rulecheckgg}
                                              // setSelectedCities={setColumnleft}
                                              ColIndex={index}
                                              ColumnInfo={city}
                                            />
                                          ))}
                                        </Tr>
                                      </THead>
                                      <TBody {...provided.droppableProps}>
                                        {OutOfRODP.map((data, index) => (
                                          <Draggable
                                            key={data.Id}
                                            draggableId={`row1-${index}`}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <Tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={`backcolor draggble-row row-${data.Id
                                                  } ${!DisplayS &&
                                                    data.F_C_S_P === 'S'
                                                    ? 'Rowhidden'
                                                    : ''
                                                  }`}
                                                onClick={(e) => {
                                                  const indices =
                                                    findIndicesWithSameFPC_ID(
                                                      table2Data,
                                                      data.FPCIDForDrag,
                                                    );
                                                  if (indices.length > 0) {
                                                    setSelectedRows2(indices);
                                                    return;
                                                  }
                                                  // return
                                                  // setSelectedRows2(indices)
                                                  if (e.ctrlKey) {
                                                    setSelectedRows2(
                                                      (prevSelectedRows) => {
                                                        // Check if the row is already selected
                                                        if (
                                                          prevSelectedRows.includes(
                                                            index,
                                                          )
                                                        ) {
                                                          // If selected, remove it
                                                          return prevSelectedRows.filter(
                                                            (row) =>
                                                              row !== index,
                                                          );
                                                        } else {
                                                          // If not selected, add it
                                                          return [
                                                            ...prevSelectedRows,
                                                            index,
                                                          ];
                                                        }
                                                      },
                                                    );
                                                  } else if (e.shiftKey) {
                                                    e.preventDefault();
                                                    if (selectedRows2.length) {
                                                      setSelectedRows2(
                                                        (prevSelectedRows) => {
                                                          // Check if the row is already selected
                                                          if (
                                                            prevSelectedRows.includes(
                                                              index,
                                                            )
                                                          ) {
                                                            // If selected, remove it
                                                            return prevSelectedRows.filter(
                                                              (row) =>
                                                                row !== index,
                                                            );
                                                          } else {
                                                            // If not selected, add all
                                                            let sorted =
                                                              prevSelectedRows.sort();
                                                            let max =
                                                              sorted[
                                                              sorted.length -
                                                              1
                                                              ];
                                                            let shiftAdded =
                                                              createArray(
                                                                max,
                                                                index,
                                                              );

                                                            return [
                                                              ...prevSelectedRows,
                                                              ...shiftAdded,
                                                            ];
                                                          }
                                                        },
                                                      );
                                                    }
                                                  } else {
                                                    setSelectedRows2([index]);
                                                  }
                                                }}
                                              >
                                                {rulecheckgg.map((city) => (
                                                  <Td
                                                    className={
                                                      city.name === 'Event_Name'
                                                        ? 'jhh'
                                                        : 'tde'
                                                    }
                                                    key={city.name}
                                                    style={{
                                                      ...(selectedRows2.includes(
                                                        index,
                                                      )
                                                        ? style.pressed
                                                        : {
                                                          backgroundColor:
                                                            data.EventDefaultBackColor,
                                                          color:
                                                            data.EventDefaultFrontColor,
                                                          width: data.width,
                                                        }),
                                                    }}
                                                  >
                                                    {data[city.name]}
                                                  </Td>
                                                ))}
                                              </Tr>
                                            )}
                                          </Draggable>
                                        ))}
                                        {provided.placeholder}
                                      </TBody>
                                    </Table>
                                  );
                                }}
                              </Droppable>
                            </ScrollBar>
                          </div>
                        </div>
                      </Card>
                    );

                  case 'Summary':
                    return (
                      <Card
                      // header={<HeaderTemplate />}
                      // style={{ height: '425px' }}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <h4 className=""> Summary</h4>{' '}
                            <ButtonE
                              icon={<HiOutlineX />}
                              size="xs"
                              style={{
                                marginTop: -5,
                              }}
                              onClick={() => setEventDataName('')}
                            />
                          </div>
                          {/* <div className='px-2 mb-5' >
                                                <h3>130</h3>
                                                <p>Total Revenue</p>
                                            </div> */}
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-emerald-500"
                              />
                              Spots
                            </div>
                            <h6>
                              {Number(CountData.Commercial.length) +
                                Number(dropcount) +
                                Number(lastmincount)}
                            </h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-red-500"
                              />
                              Schedule
                            </div>
                            <h6>{CountData.Commercial.length}</h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Drops
                            </div>
                            <h6>{dropcount}</h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Last Min Spots
                            </div>
                            <h6>{lastmincount}</h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Back to Back
                            </div>
                            <p>{blankTxLogCount}</p>
                          </div>

                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Out Of RODP
                            </div>
                            <p>0</p>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Breaks
                            </div>
                            <p>{TotalBreaks}</p>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Commercial Duration in Min
                            </div>
                            <p>
                              {Number(
                                parseDuration(
                                  sumDurationsss(table1Data) + ':00',
                                ) / 60,
                              )}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  case 'Rotation Info':
                    return (
                      <Card
                        header={<FilterheaderTemplate />}
                        style={{ height: '500px' }}
                      >
                        <div style={{ width: 380 }}>
                          <div
                            style={{
                              height: '400px',
                              overflow: 'auto',
                            }}
                          >
                            <ScrollBar>
                              <Table>
                                <THead>
                                  <Tr>
                                    <Th>Play Time</Th>
                                    <Th>Event_Name</Th>
                                    <Th>Duration</Th>
                                  </Tr>
                                </THead>

                                <TBody>
                                  {table3Data.map((row, index) => {
                                    return (
                                      <Tr
                                        onClick={() => {
                                          console.log(row.SequenceNo);
                                          const div1 =
                                            document.getElementById('div1');
                                          let targetElement =
                                            div1.querySelector(
                                              `.rowINeed-${row.SequenceNo}`,
                                            );
                                          targetElement.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'center',
                                          });
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        className={`backcolor`}
                                        key={index}
                                      >
                                        <Td
                                          // style={{
                                          //     width: '120px',
                                          //     maxWidth: '120px',
                                          //     overflow: 'hidden',
                                          //     textOverflow: 'ellipsis',
                                          //     whiteSpace: 'nowrap',
                                          //     opacity: '0.5',
                                          //     border: '1px solid white'
                                          // }}
                                          className={'tde'}
                                          style={{
                                            ...(selectedRows2.includes(index)
                                              ? style.pressed
                                              : {
                                                backgroundColor:
                                                  row.EventDefaultBackColor,
                                                color:
                                                  row.EventDefaultFrontColor,
                                                width: row.width,
                                              }),
                                          }}
                                        >
                                          {row.Start_Time}
                                        </Td>
                                        <Td
                                          className={'tde'}
                                          style={{
                                            ...(selectedRows2.includes(index)
                                              ? style.pressed
                                              : {
                                                backgroundColor:
                                                  row.EventDefaultBackColor,
                                                color:
                                                  row.EventDefaultFrontColor,
                                                width: row.width,
                                              }),
                                          }}
                                        >
                                          {row.Event_Name}
                                        </Td>

                                        <Td
                                          className={'tde'}
                                          style={{
                                            ...(selectedRows2.includes(index)
                                              ? style.pressed
                                              : {
                                                backgroundColor:
                                                  row.EventDefaultBackColor,
                                                color:
                                                  row.EventDefaultFrontColor,
                                                width: row.width,
                                              }),
                                          }}
                                        >
                                          {row.Duration}
                                        </Td>
                                      </Tr>
                                    );
                                  })}
                                </TBody>
                              </Table>
                            </ScrollBar>
                          </div>
                        </div>
                      </Card>
                    );
                  case 'Break Wise Duration':
                    return (
                      <Card header={<BreakwiseheaderTemplate />}>
                        <BreakwiseCom
                          className="p-0"
                          BreakwiseData={BreakwiseData}
                        />
                      </Card>
                    );

                  default:
                    return null;
                }
              })()}

              {/* <Card header={'Restriced'} >{yupo.map((item) => (
                                <div className='flex justify-between' style={{ border: '1px solid white' }}>
                                    <h6>{item.Event_Name}</p>


                                    <ButtonE icon={<HiOutlineX />} size='xs' style={{
                                        marginTop: -5
                                    }} onClick={() => {



                                        const updatedArray = table1Data.filter((items, indexs) => indexs !== item.index);
                                        console.log(item.index)
                                        console.log(table1Data);
                                        setTable1Data(updatedArray);
                                    }
                                    }
                                    />
                                </div>
                            ))}</Card> */}

              {/* <Card>
                                <Donuts data={donutdata} CountData={CountData}></Donuts>
                            </Card> */}
            </div>
          ) : (
            <></>
          )}
        </div>

        {/* </SplitterPanel>
                </Splitter> */}
      </DragDropContext>
      <StickyFooter
        className="-mx-8 px-8 py-4 pt-2 pb-2"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <ButtonE
              type="button"
              onClick={discard}
              className="mr-2"
              variant=""
              size="sm"
              icon={<HiBackspace />}
            >
              Back
            </ButtonE>{' '}
            &nbsp;
            <ButtonE
              onClick={ComSchdulingSave}
              variant="solid"
              type="submit"
              size="sm"
              disabled={
                convertDateFormatyyyyMMdd(value) <
                format(new Date(), 'yyyy-MM-dd')
              }
              icon={<AiOutlineSave />}
            >
              Save
            </ButtonE>{' '}
            {convertDateFormatyyyyMMdd(value) <
              format(new Date(), 'yyyy-MM-dd') && (
                <p className="ml-2 text-red-500">
                  Backdated Commercials are non-editable
                </p>
              )}
          </div>
          <div className="flex items-center">
            <div className="flex flex-col lbl mr-2">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm mr-2 text-center">
                Total Spots
              </span>
              <span className="font-medium text-lg text-center">
                {CountData.Commercial.length}
              </span>
            </div>
            <div className="flex flex-col lbl mr-2">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm mr-2 text-center">
                Selected Spots
              </span>
              <span className="font-medium text-lg text-center">
                {selectedCommericals}
              </span>
            </div>
            <div className="flex flex-col lbl mr-5">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm mr-2 text-center">
                Selected Duration
              </span>
              <span className="font-medium text-lg text-center">
                {selectedComDuration}
              </span>
            </div>
          </div>
        </div>
      </StickyFooter>
      <Dialog
        header="Colums Setting"
        visible={AutoSchdulevisible}
        position="top"
        style={{ width: '40vw', backgroundColor: '#111827' }}
        onHide={() => setAutoSchdulevisible(false)}
        footer={AutoSchdulefooterContent}
        draggable={false}
        resizable={false}
        className="lmop"
      >
        <Columns2 />
      </Dialog>
      <Dial
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Restore Previous Version </h5>
        <Select
          placeholder="Kindly Select"
          options={audit}
          onChange={(e) => setauditValue(e)}
        ></Select>
        <div className="text-right mt-6">
          <ButtonE className="ltr:mr-2 rtl:ml-2" onClick={onDialogClose}>
            Cancel
          </ButtonE>
          <ButtonE variant="solid" onClick={onDialogOk}>
            Ok
          </ButtonE>
        </div>
      </Dial>
      <Dial
        isOpen={isImportSequenceDialogOpen}
        onClose={handleImportSequenceDialogClose}
      // onRequestClose={handleImportSequenceDialogClose}
      >
        <h5 className="mb-4">Import Sequence</h5>
        <DatePicker
          vlaue={DatePickerRangeImport}
          placeholder="Pick a date"
          onChange={(e) => setDatePickerRangeImport(e)}
        />
        <div className="text-right mt-6">
          <ButtonE
            className="ltr:mr-2 rtl:ml-2"
            onClick={handleImportSequenceDialogClose}
          >
            Cancel
          </ButtonE>
          <ButtonE variant="solid" onClick={handleClick}>
            Ok
          </ButtonE>
        </div>
      </Dial>
      <Dial
        isOpen={ISSmartShuffle}
        style={{
          content: {
            marginTop: 250,
          },
        }}
        contentClassName="pb-0 px-0"
        onClose={() => setISSmartShuffle(false)}
      // onRequestClose={onDialogClose}
      >
        <div className="px-6 pb-6">
          <h5 className="mb-4">Update Duration</h5>

          <p>
            We are currently saving your data. You will get updated duration
            accordingly.
          </p>
        </div>

        <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            onClick={() => setISSmartShuffle(false)}
          >
            No
          </Button>

          <Button variant="solid" onClick={() => SSmartShuffle()}>
            Yes
          </Button>
        </div>
      </Dial>
    </>
  );
};

export default CommercialSchedulingPage;

const style = {
  pressed: {
    //color: 'rgb(243 244 246/var(--tw-text-opacity))',
    boxShadow: '0px 0px 0px rgb(198, 198, 198)',
    transition: 'background-color 0.1s ease-in-out',
    scale: 1,
  },
  pressed2: {
    //color: 'rgb(243 244 246/var(--tw-text-opacity))',
    boxShadow: '0px 0px 0px rgb(13, 12, 12)',
    transition: 'background-color 0.1s ease-in-out',
    scale: 1,
  },
};
