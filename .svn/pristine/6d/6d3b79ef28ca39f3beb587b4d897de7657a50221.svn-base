import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  Table,
  Card,
  Button as ButtonE,
  Input,
  Select,
  Tooltip,
  TimeInput,
  Progress,
  Notification,
  toast as toaste,
  Dialog as Dial,
  Switcher,
  Badge as Badges,
  Avatar,
  Button,
} from 'components/ui';
import { useState, useEffect, useRef } from 'react';
import { convertDateToDMY, convertDateToYMD } from 'components/validators';
import {
  Postcolumnsetting,
  Posttransmissionlog,
  apiGetExportPlayOut,
  apiGetNTCScheduling2,
  apiGetPromoScheduling2,
  apiGetRestoreDropDown,
  apiGetRestoreScheduling,
  apiGetSongScheduling2,
  apiGettransmissionlog,
  apiGettransmissionlog2,
  apiUpdateSpotStatus,
} from 'services/SchedulingService';
import { ScrollBar } from 'components/ui';
import {
  updateStartTimes,
  hideStackedSideNav,
  FilldraggedRow,
  Clock,
  UpdatePrimaryID,
} from '../general';
import '../style.css';
import {
  HiBackspace,
  HiFilm,
  HiFilter,
  HiOutlineArrowsExpand,
  HiOutlineCog,
  HiOutlineFilter,
  HiOutlineSpeakerphone,
  HiOutlineUpload,
  HiOutlineX,
} from 'react-icons/hi';
import {
  CgCheck,
  CgClose,
  CgLogIn,
  CgLogOut,
  CgMusic,
  CgRedo,
  CgSearch,
  CgUndo,
} from 'react-icons/cg';
import {
  setColumnleft,
  setColumnright,
  setheadername,
  setMainTable,
  setSecondTable,
  setValue,
} from 'store/Scheduling/SchedulingSlice';
import { apiGetPromotypemaster } from 'services/ProgrammingService';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup } from 'components/ui';
import { StickyFooter } from 'components/shared';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Checkbox } from 'components/ui';
import { Dialog } from 'primereact/dialog';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { ContextMenu } from 'primereact/contextmenu';
import { apiGetSongcategoryDrop } from 'services/MasterService';
import {
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import FilterColumn from '../FilterColumn';
import { Badge } from 'primereact/badge';
import { apiGetNTCtypedropdown } from 'services/NTCService';
import BreakwiseFinalLog from 'views/Controls/BreakwiseFinalLog';
import {
  setDatainF,
  setdatestoreF,
  settimestoreF,
} from 'store/auth/scheduling';
import { setdateForm } from 'store/locale/localeSlice';
import TimescaleBar from './TimescaleBar';
import { ExportToCSV } from 'views/Controls/ExportToCSV';
import {
  apiCallstoreprocedure,
} from 'services/CommonService';
import classNames from 'classnames';
import { GetBreakwiseDuration, GetDataCount, changeProgram } from './Cols';
import { saveAs } from 'file-saver';
import { AiOutlineSave } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Loader from 'views/Controls/Loader';
import { HiPencilSquare } from 'react-icons/hi2';
import { MdOutlineManageHistory, MdRestore } from 'react-icons/md';
import { BsViewList } from 'react-icons/bs';
import { TbFileExport } from 'react-icons/tb';
import { LuUnlock } from 'react-icons/lu';
import PushToPlayoutDialog from './PushToPlayoutDialog/PushToPlayoutDialog';
import { parseDurationE } from '../../Controls/GLOBALFUNACTION';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody } = Table;
const exportPlayoutFunction = 'new';

var SelectedBrkNo = [];

const FinalLogPage = ({ onCellSelect, evendata }) => {
  const ColumnValidation = useSelector(
    (state) => state.Scheduling.ColumnValidation,
  );
  const nav = useNavigate();
  const dateForm = useSelector((state) => state.locale.dateForm);
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);
  const LoginId = useSelector((state) => state.auth.session.LoginId);
  const MainTable = useSelector((state) => state.Scheduling.MainTable);
  const SecondTable = useSelector((state) => state.Scheduling.SecondTable);
  const Columnright = useSelector((state) => state.Scheduling.Columnright);
  const Columnleft = useSelector((state) => state.Scheduling.Columnleft);
  const value = useSelector((state) => state.Scheduling.value);
  const fpcTimes = useSelector((state) => state.Scheduling.fpcTimes);
  const BackCondition = useSelector((state) => state.Scheduling.BackCondition);
  const ChannelSetting = useSelector((state) => state.auth.session.ChannelSetting);
  const [ISRefreshDuration, setISRefreshDuration] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [breaknumbers, setbreaknumbers] = useState([]);
  const [table3Data, setTable3Data] = useState([]);
  const [colorMapping, setColorMapping] = useState({});
  const [mismatchedItems, setMismatchedItems] = useState([]);
  const [count, setcount] = useState();
  const [mismatchedItems2, setMismatchedItems2] = useState([]);
  const [TimeSpan, setTimeSpan] = useState([]);
  const [nonselectedCities, setnonSelectedCities] = useState([]);
  const [nonselectedCities1, setnonSelectedCities1] = useState([]);
  const [OffsetStartTime, setOffsetStartTime] = useState('');
  const [undo, setundo] = useState(false);
  const [redo, setredo] = useState(false);
  const [Display, setDisplay] = useState(true);
  const [name, setname] = useState('');
  const [DisplayNTC, setDisplayNTC] = useState(false);
  const [startTimeArray, setStartTimeArray] = useState([]);
  const [CountData, setCountData] = useState({
    NTC: [],
    Promos: [],
    Songs: [],
    Commercial: [],
    Programs: [],
  });
  const [segmentMoveDelete, setSegmentMoveDelete] = useState(false);
  const [selectedPrimaryID, setSelectedPrimaryID] = useState(0);
  const [by, setby] = useState();
  const [selectedComms, setSelectedComms] = useState([]);
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [table1dataversions, settable1dataversions] = useState([]);
  const [Insertpromo, setInsertpromo] = useState(true);
  const [ren, setren] = useState('Maximize');
  const [dialogIsOpen1, setIsOpen1] = useState(false);
  const [dialogIsOpen12, setIsOpen12] = useState(false);
  const [FPCIDSTORE, setFPCIDSTORE] = useState(false);
  const [EventDataName, setEventDataName] = useState(null);
  const [blankTxLogCount, setblankTxLogCount] = useState(0);
  const [copypromo, setCopypromo] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsFORNTC, setSelectedRowsFORNTC] = useState([0]);
  const [options, setoptions] = useState([]);
  const [audit, setaudit] = useState([]);
  const [auditValue, setauditValue] = useState(0);
  const [value3, setValue3] = useState();
  const [selectedRowsCopy, setSelectedRowsCopy] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [tobepastedrow, settobepastedrow] = useState(null);
  const [draggedRows, setdraggedRows] = useState([]);
  const [iscopy, setiscopy] = useState(false);
  const [isdisplaysetting, setisdisplaysetting] = useState(false);
  const [DisplayFilter, setDisplayFilter] = useState(false);
  const [AutoSchdulevisible, setAutoSchdulevisible] = useState(false);
  const [BreakwiseData, setBreakwiseData] = useState([]);
  const [starttime, setstarttime] = useState(null);
  const [endtime, setendtime] = useState(null);
  const [Commercial_scheduling_Counts, setCommercial_scheduling_Counts] =
    useState([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [TotalBreaks, setTotalBreaks] = useState(0);
  const [isPushToPlayoutDialogOpen, setIsPushToPlayoutDialogOpen] =
    useState(false);
  const exportPlayoutFileName = `${Channel.label}${convertDateToDMY(
    value,
  ).replaceAll('-', '')}`;

  useEffect(() => {
    let Event_Name = MainTable[selectedRows[0]]?.Event_Name;

    let res = MainTable.filter((row, index) => row.Event_Name == Event_Name);
    setTable3Data([...res]);
  }, [selectedRows]);

  useEffect(() => {
    dispatch(setdateForm([value, 'Final Log']));
    dispatch(setheadername(''));
    return () => {
      dispatch(setheadername('Final Log'));
    };
  }, []);
  useEffect(() => {
    dispatch(setMainTable(updateStartTimes(MainTable, false, DisplayNTC)));
    let prm = UpdatePrimaryID(MainTable);
    // setTable1Data(prm);
    dispatch(setMainTable(updateStartTimes(prm)));
    BackToBack(prm);
    auditpromoscheduling(Channel, convertDateToYMD(value));
    GetTranLog();
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
    //Commercial_scheduling_CountsApi();
  }, []);

  useEffect(() => {
    // Filter selected rows where the next row's F_C_S_P is 'NTC'
    const updatedSelectedRows = selectedRows.filter((row) => {
      const nextIndex = row + 1;
      return MainTable[nextIndex]?.F_C_S_P === 'NTC';
    });
    // setSelectedRowsFORNTC(updatedSelectedRows);

    var lstOfcm = MainTable.filter(
      (item, index) => selectedRows.includes(index) && item.F_C_S_P === 'CM',
    );
    if (lstOfcm.length > 0) {
      setCopypromo(false);
    }
    // setSelectedComms(lstOfcm);
    // Get all selected rows
    const SelRow = MainTable.filter((item, index) =>
      selectedRows.includes(index),
    );

    // Determine if the first selected row is 'NTC'
    let WithAllNTC = true;
    if (SelRow[0]?.F_C_S_P === 'NTC') {
      WithAllNTC = false;
    }

    // Create a set of primary IDs from selected rows
    const primaryIDSet = new Set(SelRow.map((item) => item.PrimaryID));

    let SelRowwithNTCIndex = MainTable.map((item, index) =>
      primaryIDSet.has(item.PrimaryID) ? index : undefined,
    ).filter((index) => index !== undefined);

    // Update selected rows if necessary
    if (WithAllNTC) {
      if (SelRowwithNTCIndex.length !== selectedRows.length) {
        // setSelectedRows(SelRowwithNTCIndex);
      }
    } else {
      SelRowwithNTCIndex = selectedRows;
    }
    const inputId = SelRowwithNTCIndex[0];
    const nearestAboveCTRow = MainTable.slice(
      0,
      MainTable.findIndex((row, index) => index === inputId),
    )
      .reverse()
      .find((row) => row.F_C_S_P === 'CT');

    const nearestbelowCTRow = MainTable.slice(
      MainTable.indexOf(nearestAboveCTRow) + 1,
    ).find((row) => row.F_C_S_P === 'CT');

    // Calculate total durations for different segments

    // Prepare the timespan array
    const timespanarray = [];
    if (nearestbelowCTRow && nearestAboveCTRow) {
      let FPC_TimeAbove = nearestAboveCTRow.FPC_Time;
      let FPC_TimeToAbove = nearestAboveCTRow.FPC_TimeTo;
      let actualendtimeAbove = nearestbelowCTRow.Tel_Time?.substring(0, 5);

      timespanarray.push([
        FPC_TimeAbove,
        FPC_TimeToAbove,
        actualendtimeAbove,
        nearestAboveCTRow.Event_Name,
      ]);

      const nearest2NextbelowCTRow = MainTable.slice(
        MainTable.indexOf(nearestbelowCTRow) + 1,
      ).find((row) => row.F_C_S_P === 'CT');

      if (nearest2NextbelowCTRow) {
        let FPC_Time = nearestbelowCTRow.FPC_Time;
        let FPC_TimeTo = nearestbelowCTRow.FPC_TimeTo;
        let actualendtime = nearest2NextbelowCTRow.Tel_Time?.substring(0, 5);

        timespanarray.push([
          FPC_Time,
          FPC_TimeTo,
          actualendtime,
          nearestbelowCTRow.Event_Name,
        ]);
      }
    }

    // Remove duplicates and update the timespan state
    // setTimeSpan([...new Set(timespanarray)]);

    let sum = 0;
    let count = 0;

    MainTable.forEach((item) => {
      if (item.F_C_S_P === 'CM') {
        const [hours, minutes, seconds, frames] =
          item.Duration.split(':').map(Number);
        // Assuming the frames are 25 fps, converting to seconds
        const totalSeconds =
          hours * 3600 + minutes * 60 + seconds + frames / 25;
        sum += totalSeconds;
      }

      if (item.F_C_S_P === 'S') {
        count++;
      }
      if (item.F_C_S_P === 'CT') {
        count--;
      }
    });

    setTotalDuration(sum);
    setTotalBreaks(count);
  }, [
    selectedRows,
    MainTable,
    setSelectedRows,
    setSelectedRowsFORNTC,
    setSelectedComms,
    setTimeSpan,
  ]);
  useEffect(() => {
    dispatch(setDatainF(MainTable));
  }, [MainTable]);
  useEffect(() => {
    if (!undo && !redo) {
      cm2.current++;
      settable1dataversions([...table1dataversions, MainTable]);
    } else if (cm2.current > 1) {
      if (undo) {
        setundo(false);
      }
      if (redo) {
        setredo(false);
      }
    }
    GetDataCount(MainTable, setCountData);
    GetBreakwiseDuration(
      MainTable,
      setBreakwiseData,
      setStartTimeArray,
      fpcTimes,
    );

    dispatch(settimestoreF(new Date().toLocaleString()));
    dispatch(setdatestoreF(value));
    const filteredData = MainTable.filter(
      (item) => item.F_C_S_P === 'CM',
    ).filter((item) => item.TxLogCode);
    const blankTxLogCountCM = filteredData.length;
    setblankTxLogCount(blankTxLogCountCM);

    const mapColors = (data) => {
      const result = {};

      MainTable.forEach((item) => {
        const { EventDefaultBackColor, F_C_S_P } = item;

        if (!result[F_C_S_P]) {
          result[F_C_S_P] = EventDefaultBackColor;
        }
      });

      return result;
    };

    setColorMapping(mapColors(MainTable));
  }, [MainTable]);

  useEffect(() => {
    const res = ColumnValidation.filter((city) => {
      return !Columnright.some(
        (selectedCity) => selectedCity.code === city.code,
      );
    });
    setnonSelectedCities(res);
  }, [Columnright]);

  const replaceData = (mismatched2x, FPC_ID) => {
    const updatedTable1Data = MainTable.map((item1) => {
      if (item1.FPC_ID === FPC_ID) {
        const matchingItemIndex = mismatched2x.findIndex(
          (item2) =>
            item1.F_C_S_P === item2.F_C_S_P &&
            item1.BreakNumber === item2.BreakNumber,
        );

        if (matchingItemIndex !== -1) {
          // Create a new object for mismatched2x[matchingItemIndex] with the updated values
          const updatedItem = {
            ...mismatched2x[matchingItemIndex],
            FPC_ID: FPC_ID, // Replace with the provided FPC_ID
            Start_Time: '00:00:00:00', // Update Start_Time as needed
          };

          return { ...item1, ...updatedItem }; // Return a new object merging item1 and updatedItem
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

    if (lastIndex !== -1) {
      updatedTable1Data.splice(lastIndex + 1, 0, ...remainingRecords);
    }

    const updtRecord = updatedTable1Data.filter((item1) => {
      const maxBreakNumber = Math.max(
        ...mismatched2x.map((item2) => item2.BreakNumber),
      );
      if (item1.FPC_ID === FPC_ID && item1.BreakNumber > maxBreakNumber) {
        return false; // Exclude this item from the filtered array
      }
      return true; // Include all other items in the filtered array
    });

    let res = updateStartTimes(updtRecord, false, DisplayNTC);
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
  const RefreshDuration = async () => {
    setShowLoader(true);
    // Transforming the data
    const transformedData = MainTable.map((item, index) => ({
      ChannelCode: Channel.ChannelCode,
      LocationCode: Channel.LocationCode,
      TelecastDate: convertDateToYMD(value),
      NewTelecastDate: convertDateToYMD(value),
      FPCTime: item.FPC_Time,
      FPC_TimeTo: item.FPC_TimeTo,
      SequenceNo: item.FPC_ID,
      RowNumber: index,
      TransmissionTime: item.Tel_Time,
      GMTTime: ' ',
      EventCode: item.ContentCode,
      EventCaption: item.Event_Name,
      HouseID: item.House_ID,
      VideoID: item.Video_ID,
      TapeID: item.TapeID,
      TCIN: item.TC_IN,
      TCOUT: item.TC_Out,
      EventDuration: item.Duration,
      EventType: item.F_C_S_P,
      SeasonNo: item.SeasonNo,
      EpisodeNo: item.EpisodeNo,
      PartNumber: 0,
      BreakNumber: item.BreakNumber,
      BookingNumber: item.BookingNumber,
      BookingDetailCode: item.BookingDetailCode,
      BookingSeqNo: item.BookingSeqNo,
      DealNumber: item.DealNo,
      DealLineItemNo: item.DealLineItemNo,
      TimeBandCode: item.TimeBandCode,
      TxTimeinSec: item.TxTimeinSec,
      IsActive: 1,
      PrimaryID: item.PrimaryID,
      BookingDetailID: item.BookingDetailID,
    }));

    try {
      // Step 1: Post transmission log data
      const resp = await Posttransmissionlog(transformedData, token);
      setShowLoader(false);
      if (resp.status === 200) {
        // openNotification('success', 'Data Saved Successfully.');
      } else if (resp.status === 204) {
        // openNotification('danger', 'Data already exists!!');
        return;
      }

      // Step 2: Call the stored procedure
      const newdata = await apiCallstoreprocedure(
        'USP_Sch_RefreshDuration',
        {
          par_LocationCode: Channel.LocationCode,
          par_ChannelCode: Channel.ChannelCode,
          par_TelecastDate: convertDateToYMD(value),
        },
      );
      setShowLoader(false);

      // Step 3: Get the updated transmission log
      const response = await apiGettransmissionlog(
        Channel,
        convertDateToYMD(value),
        'Edit',
      );
      const data = response.data;
      setShowLoader(false);
      dispatch(setMainTable(updateStartTimes(data, true, false)));
    } catch (errors) {
      setShowLoader(false);
      if (errors.response?.status === 500) {
        openNotification('danger', 'Server Error.');
      } else {
        console.error('An error occurred:', errors);
      }
    } finally {
      // Any cleanup or additional logic can go here
      discard2();
    }
    setISRefreshDuration(false);
  };

  const UpdateBookingStatus = async (BookingDetailIDs, BookingStatus) => {
    try {
      const resp = await apiUpdateSpotStatus(
        BookingDetailIDs,
        BookingStatus,
        token,
      );
      if (resp.status == 200) {
        Commercial_scheduling_CountsApi();
        return true;
      }
    } catch (errors) {
      return false;
    }
  };
  const MoveToDropBox = async () => {
    let remcheck = MainTable.filter(
      (row, index) => selectedRows.includes(index) && row.F_C_S_P !== 'CM',
    );

    if (remcheck.length > 0) {
      openNotification('warning', 'Kindly Select only Commercial.');
      return;
    }

    let BookingDetailIDs = MainTable.filter((row, index) =>
      selectedRows.includes(index),
    ).map((item) => item.BookingDetailID);

    let formattedBookingDetailIDs = BookingDetailIDs.map((val) => ({
      Id: val,
    }));

    UpdateBookingStatus(formattedBookingDetailIDs, 'E')
      .then((stat) => {
        if (stat) {
          let rem = MainTable.filter(
            (row, index) => !selectedRows.includes(index),
          );
          let res = updateStartTimes(rem, true, DisplayNTC);

          dispatch(setMainTable(res));

          const SelRow = MainTable.filter((item, index) =>
            selectedRows.includes(index),
          );
          const updatedTable2Data = [...SecondTable, SelRow[0]];

          dispatch(setSecondTable(updatedTable2Data));

          setSelectedRows([]);
        }
      })
      .catch((error) => {
        console.error('Error updating booking status:', error);
      });
  };

  const discard = () => {
    let ogversion = table1dataversions[1];
    cm2.current = 1;
    dispatch(setMainTable(updateStartTimes(ogversion)));
    settable1dataversions([[]]);
    dispatch(setValue(null));

    if (BackCondition == 'PROGRAMCALL') {
      nav('/Scheduling');
    }
  };
  const discard2 = () => {
    if (table1dataversions.length <= 2) return;

    let finalversion = table1dataversions[table1dataversions.length - 1];
    cm2.current = 2;
    settable1dataversions([[], finalversion]);
  };

  const processData = (data) => {
    return data.map((event, index, array) => {
      let txLogCode = '';
      if (
        (index > 0 &&
          array[index - 1].Event_Name === event.Event_Name &&
          array[index - 1].Event_Name != '') ||
        (index < array.length - 1 &&
          array[index + 1].Event_Name === event.Event_Name)
      ) {
        txLogCode = 'Event_Name';
      } else if (
        (index > 0 &&
          array[index - 1].Brand === event.Brand &&
          array[index - 1].Brand != '') ||
        (index < array.length - 1 &&
          array[index + 1].Brand === event.Brand &&
          array[index + 1].Brand != '')
      ) {
        txLogCode = 'Brand';
      } else if (
        (index > 0 &&
          array[index - 1].Client === event.Client &&
          array[index - 1].Client != '') ||
        (index < array.length - 1 &&
          array[index + 1].Client === event.Client &&
          array[index + 1].Client != '')
      ) {
        txLogCode = 'Client';
      }

      return {
        ...event,
        TxLogCode: txLogCode,
      };
    });
  };

  const onDialogClose = (e) => {
    setIsOpen(false);
  };

  const onDialogOk = async (e) => {
    try {
      let param = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
        FormName: 'TransmissionLog',
        TelecastDate: convertDateToYMD(value),
        D_date: auditValue.value,
      };

      const resp = await apiGetRestoreScheduling(param);

      if (resp.status == 200) {
        onCellSelect(evendata, false);
        openNotification2('success', 'Data Saved Successfully.');
      }
      if (resp.status === 204) {
        openNotification2('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification2('danger', 'Server Error.');
      }
    }

    setIsOpen(false);
  };

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

  const items = [
    {
      label: 'Copy',
      icon: 'pi pi-fw pi-copy',
      command: () => {
        copy();
      },
    },
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

  const Commercial_scheduling_CountsApi = async () => {
    const resp = await apiCallstoreprocedure('USP_Sch_Commercial_scheduling_Counts', {
      par_ChannelCode: Channel.ChannelCode,
      par_LocationCode: Channel.LocationCode,
      par_TelecastDate: convertDateToYMD(dateForm[0]),
    })
    setCommercial_scheduling_Counts(resp.data);
  };
  const GetSpots = (SpotTypes) => {
    let param = {
      ChannelCode: Channel.ChannelCode,
      LocationCode: Channel.LocationCode,
      TelecastDate: convertDateToYMD(value),
      Mode: SpotTypes,
    };
    apiCallstoreprocedure('USP_Sch_Commercial_scheduling', param)
      .then((response) => response.data)
      .then((data) => {
        dispatch(setSecondTable(data));
        let res = Object.keys(data[0]);

        let columns = res.map((row) => {
          let column = {};
          column.name = row;
          column.code = row;
          column.width = 100;
          column.header = row;
          return column;
        });

        const res1 = columns.filter((city) => {
          return !Columnleft.some(
            (selectedCity) => selectedCity.code === city.code,
          );
        });

        setnonSelectedCities1(res1);
      });
  };

  const all = () => {
    let Event_Name = MainTable[selectedRows[0]]['Event_Name'];
    let res = MainTable.filter(
      (row, index) => row.Event_Name == Event_Name,
      // selectedRows.includes(index)
    );
    setEventDataName('Rotation Info');
    setTable3Data([...res]);
  };

  const ExportPlayOut = async () => {
    const telecastDate = convertDateToDMY(value);
    const channelCode = Channel.ChannelCode;
    const locationCode = Channel.LocationCode;

    if (exportPlayoutFunction === 'old') {
      let data = { LocationCode: locationCode, ChannelCode: channelCode };
      const resp = await apiGetExportPlayOut(data, telecastDate);
      ExportToCSV(resp.data);
    } else if (exportPlayoutFunction === 'new') {
      const playlistId = '577252634066';
      const content = generateFileContent(telecastDate, playlistId);
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `${exportPlayoutFileName}.ply`);
    }
  };

  const generateFileContent = (dateStr, playlistId) => {
    try {
      let content = '';
      content += `#FILENAME ${exportPlayoutFileName}.ply\n`;
      content += `#PLAYLIST_FILE_NAME ${exportPlayoutFileName}.ply\n`;
      content += `#PLAYLISTID ${playlistId}\n`;
      content += `#PLAYLISTTC 00:00:00:00\n`;
      content += `#LISTNAME \n`;
      content += `#LISTID ${dateStr.replaceAll('-', '')}000111\n`;
      content += `#DYNAMICMEDIA FALSE\n`;
      content += `#EVENT NOTE ${dateStr.replaceAll('-', '')}\n`;

      // Initialize category count outside the loop
      let count = 1;

      MainTable.forEach((item) => {
        const listId = `${dateStr.replaceAll('-', '')}00000${item.SequenceNo
          }\n`;
        content += `#LISTID ${listId}`;
        content += `#DYNAMICMEDIA FALSE\n`;
        content += `#TC 0.00000\n`;

        if (item.F_C_S_P === 'CT') {
          content += `#EVENT NOTE ${item.Event_Name}\n`;
          content += `#LISTID 431825652124\n`;
          content += `#METADATA NOW ${item.Event_Name}\n`;
          content += `#METADATA Sname \n`;
          content += `#METADATA Mname \n`;
          content += `#STARTTIME 0;${item.FPC_Time}:00:00;-1;-1;0;;0\n`;
          content += `#PLAYLISTID ${listId}`;
          content += `#PLAYLISTTC 00:00:00:00\n`;
          content += `#CATEGORY NOW ${count}\n`;
          content += `#CATEGORY NEXT ${count}\n`;
          count++; // Increment count for the next item
        } else {
          let mediaPath = '';

          if (item.F_C_S_P === 'S') {
            mediaPath = `V:\\MOVIE PLUS\\MOVIE'S\\${item.Event_Name}\\${item.Video_ID}.mov`;
          } else if (item.F_C_S_P === 'SG') {
            mediaPath = `V:\\Songs\\${item.House_ID}.mov`;
          } else if (item.F_C_S_P === 'PR') {
            mediaPath = `V:\\MOVIE PLUS ID'S\\${item.Video_ID}.mov`;
          } else if (item.F_C_S_P === 'CM') {
            mediaPath = `V:\\TELESHOPPING AD\\${item.Video_ID}.mov`;
          }

          content += `"${mediaPath}"; 0.00000; ${parseDurationE(Number(ChannelSetting[0].FramePerSec),
            item.Duration,
          )}.00000; ; ${item.Event_Name}\n`;
        }
      });

      return content;
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  const GetTranLog = async () => {
    let data = {};

    data.LocationCode = Channel.LocationCode;
    data.ChannelCode = Channel.ChannelCode;
    let TelecastDate = convertDateToYMD(value);

    // document.getElementById('pr_id_3_label').click()
    apiGettransmissionlog2(data, TelecastDate).then((response) => {
      changeProgram(
        response.data,
        MainTable,
        setMismatchedItems,
        setcount,
        dispatch,
        setMismatchedItems2,
      );
      dispatch(setSecondTable(response.data));
    });
  };
  const PromoSchdulingSave = async () => {
    setShowLoader(true);
    const transformedData = MainTable.map((item, index) => ({
      ChannelCode: Channel.ChannelCode,
      LocationCode: Channel.LocationCode,
      TelecastDate: convertDateToYMD(value),
      NewTelecastDate: convertDateToYMD(value),
      FPCTime: item.FPC_Time,
      FPC_TimeTo: item.FPC_TimeTo,
      SequenceNo: item.FPC_ID,
      RowNumber: index,
      TransmissionTime: item.Tel_Time,
      GMTTime: ' ',
      EventCode: item.ContentCode,
      EventCaption: item.Event_Name,
      HouseID: item.House_ID,
      VideoID: item.Video_ID,
      TapeID: item.TapeID,
      TCIN: item.TC_IN,
      TCOUT: item.TC_Out,
      EventDuration: item.Duration,
      EventType: item.F_C_S_P,
      SeasonNo: item.SeasonNo,
      EpisodeNo: item.EpisodeNo,
      PartNumber: 0,
      BreakNumber: item.BreakNumber,
      BookingNumber: item.BookingNumber,
      BookingDetailCode: item.BookingDetailCode,
      BookingSeqNo: item.BookingSeqNo,
      DealNumber: item.DealNo,
      DealLineItemNo: item.DealLineItemNo,
      TimeBandCode: item.TimeBandCode,
      TxTimeinSec: item.TxTimeinSec,
      IsActive: 1,
      PrimaryID: item.PrimaryID,
      BookingDetailID: item.BookingDetailID,
    }));

    try {
      const resp = await Posttransmissionlog(transformedData, token);
      if (resp.status == 200) {
        setShowLoader(false);
        openNotification('success', 'Data Saved Successfully.');
      }
      if (resp.status === 204) {
        setShowLoader(false);
        openNotification('danger', 'Data Already Exists.');
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        setShowLoader(false);
        openNotification('danger', 'Server Error.');
      }
    }
    discard2();
    setShowLoader(false);
  };

  //Comman Function Start

  // Comm Fun End

  const cut = () => {
    setiscopy(false);
    let res = MainTable.filter((row, index) => selectedRows.includes(index));

    setdraggedRows(res);
    setSelectedRowsCopy([...selectedRows]);
  };

  const copy = () => {
    cut();
    setiscopy(true);
  };
  const paste = () => {
    const filteredTable1Data = draggedRows.filter(
      (row) => row.F_C_S_P === 'PR',
    );
    if (filteredTable1Data.length <= 0) {
      return;
    }

    let res1 = MainTable.slice(0, tobepastedrow + 1);
    let res2 = MainTable.slice(tobepastedrow + 1, MainTable.length);
    let referencerow = MainTable[tobepastedrow];

    let Updatetobepastedrow = FilldraggedRow(filteredTable1Data, referencerow);

    const updatedTable1Data = [...res1, ...Updatetobepastedrow, ...res2];

    if (!iscopy) {
      dispatch(
        setMainTable(
          updateStartTimes(
            updatedTable1Data.filter(
              (row, index) => !selectedRowsCopy.includes(index),
            ),
          ),
        ),
      );
    } else {
      dispatch(setMainTable(updatedTable1Data));
    }

    setSelectedRows([]);

    setiscopy(false);
  };

  const handleDragEnd = (result) => {
    if (
      EventDataName === 'Program Search' &&
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table2'
    ) {
      openNotification('warning', 'Content cannot be dragged.');
      return;
    }

    if (EventDataName != 'Drop Spot') {
      if (result.destination.droppableId == 'table2') {
        return;
      }
    }
    if (!result.destination) return;

    let draggedrow =
      result.source.droppableId == 'table2'
        ? SecondTable[result.source.index]
        : MainTable[result.source.index];

    if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table1'
    ) {
    } else {
      const draggedRowsValidation = MainTable.filter((row, index) =>
        selectedRows.includes(index),
      );

      for (const row of draggedRowsValidation) {
        if (row.F_C_S_P === 'S' && !segmentMoveDelete) {
          openNotification(
            'warning',
            'Segment cannot be dragged. If you want to do so kindly switch on segment Move/Delete.',
          );
          return;
        }
        if (row.F_C_S_P === 'CT' && !segmentMoveDelete) {
          openNotification('warning', 'Content cannot be dragged.');
          return;
        }
        if (row.F_C_S_P === 'C') {
          openNotification('warning', 'Cannot drag.');
          return;
        }
      }
    }

    if (draggedrow.F_C_S_P === 'C') {
      openNotification('warning', 'Cannot drag.');
      return;
    }

    if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table2'
    ) {
      if (!selectedRows.length) {
        let draggedrow = MainTable[result.source.index];
        let clonedRow = { ...draggedrow };

        dispatch(setMainTable(MainTable.filter((row) => row !== draggedrow)));

        let res1 = SecondTable.slice(0, result.destination.index);
        let res2 = SecondTable.slice(
          result.destination.index,
          SecondTable.length,
        );

        const updatedTable2Data = [...res1, clonedRow, ...res2];
        dispatch(setSecondTable(updatedTable2Data));
      } else {
        dispatch(
          setMainTable(
            MainTable.filter((row, index) => !selectedRows.includes(index)),
          ),
        );

        setSelectedRows([]);
      }
    } else if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table1'
    ) {
      if (!selectedRows2.length) {
        let draggedRow = SecondTable[result.source.index];
        let referencerow = MainTable[result.destination.index - 1];
        let clonedRow = FilldraggedRow(draggedRow, referencerow);

        let res1 = MainTable.slice(0, result.destination.index);
        let res2 = MainTable.slice(result.destination.index, MainTable.length);
        const updatedTable1Data = [...res1, clonedRow, ...res2];

        let res = updateStartTimes(updatedTable1Data, false, DisplayNTC);
        let prm = UpdatePrimaryID(res);
        dispatch(setMainTable(prm));
        BackToBack(prm);
      } else {
        const draggedRows = SecondTable.filter((row, index) =>
          selectedRows2.includes(index),
        );
        let referencerow = MainTable[result.destination.index - 1];
        let clonedRows = FilldraggedRow(draggedRows, referencerow);

        let res1 = MainTable.slice(0, result.destination.index);
        let res2 = MainTable.slice(result.destination.index, MainTable.length);

        const updatedTable1Data = [...res1, ...clonedRows, ...res2];
        let res = updateStartTimes(updatedTable1Data, false, DisplayNTC);
        let prm = UpdatePrimaryID(res);
        dispatch(setMainTable(prm));
        setSelectedRows2([]);
        BackToBack(prm);
      }
    } else if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table1'
    ) {
      let index1 = result.source.index;
      let index2 = result.destination.index;
      let draggedRow = MainTable[index1];
      let updatedTable1Data = [];

      if (selectedRows.length) {
        const draggedRows = MainTable.filter((row, index) =>
          selectedRows.includes(index),
        );
        let rowdiff = 0;
        let rowdownDiff = 0;
        if (index1 > index2) {
          rowdiff = 1;
        } else {
          rowdownDiff = 1;
        }

        let referencerow = MainTable[result.destination.index - rowdiff];
        let clonedRows = FilldraggedRow(draggedRows, referencerow);

        const updttable1Data = MainTable.map((row, index) => {
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

        let res = updateStartTimes(ActualTable1Data, false, DisplayNTC);
        let prm = UpdatePrimaryID(res);
        dispatch(setMainTable(prm));
        BackToBack(prm);
        setSelectedRows([]);
        return;
      } else {
        if (index1 > index2) {
          let referencerow = MainTable[index2 - 1];
          let draggedRow2 = FilldraggedRow(draggedRow, referencerow);
          let temp = index1;

          index1 = index2;
          index2 = temp;

          let res1 = MainTable.slice(0, index1);
          let res2 = MainTable.slice(index1, index2);
          let res3 = MainTable.slice(index2 + 1, MainTable.length);

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
          let res1 = MainTable.slice(0, index1);
          let res2 = MainTable.slice(index1 + 1, index2 + 1);
          let res3 = MainTable.slice(index2 + 1, MainTable.length);
          let referencerow = MainTable[index2];
          let draggedRow2 = FilldraggedRow(draggedRow, referencerow);

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

      let res = updateStartTimes(updatedTable1Data, false, DisplayNTC);
      let prm = UpdatePrimaryID(res);
      BackToBack(prm);
      dispatch(setMainTable(prm));
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
      let draggedRow = SecondTable[index1];
      let res1 = SecondTable.slice(0, index1);
      let res2 = SecondTable.slice(index1 + 1, index2 + 1);
      let res3 = SecondTable.slice(index2 + 1, SecondTable.length);
      const updatedTable2Data = [...res1, ...res2, draggedRow, ...res3];
      // updatedTable2Data.splice(result.destination.index, 0, draggedRow);
      let res = updateStartTimes(updatedTable2Data, false, DisplayNTC);
      let prm = UpdatePrimaryID(updatedTable2Data);
      BackToBack(prm);
      dispatch(setSecondTable(prm));
    }
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
  const BackToBack = (resrr) => {
    let updtk = processData(resrr);

    dispatch(setMainTable(updtk));
  };
  function promoinsert() {
    let promos = selectedRows2.map((index) => SecondTable[index]);

    // let promo=SecondTable[selectedRows2[0]];
    let cnt = 1;
    let res = [...MainTable];
    MainTable.forEach((row, index) => {
      if (
        SelectedBrkNo.includes(Number(row.BreakNumber)) &&
        row.F_C_S_P !== 'PR'
      ) {
        if (compareTimes(row.Start_Time, starttime) == 0) return;
        if (compareTimes(row.Start_Time, endtime) == 1) return;

        const updtpromos = FilldraggedRow(promos, MainTable[index]);
        res.splice(index + cnt, 0, ...updtpromos); // Insert promo below the matching row
        cnt = cnt + promos.length;
      } else {
      }
    });
    let restime = updateStartTimes(res, false, DisplayNTC);
    dispatch(setMainTable(restime));
  }

  function promoinsert2() {
    let promos = selectedRows2.map((index) => SecondTable[index]);
    let index = selectedRows[0];
    let RefPromos = MainTable[index];

    const updtpromos = FilldraggedRow(promos, RefPromos);

    let res1 = MainTable.slice(0, index + 1);

    let res2 = MainTable.slice(index + 1, MainTable.length);

    const updatedTable1Data = [...res1, ...updtpromos, ...res2];

    dispatch(setMainTable(updatedTable1Data));
  }
  function replace() {
    if (selectedRows.length > 1) {
      openNotification('warning', 'Kindly Select One Promo onlys.');
      return;
    }

    if (selectedRows2.length > 1) {
      openNotification('warning', 'Kindly Select One Promo onlys.');
      return;
    }

    let promos = selectedRows2.map((index) => SecondTable[index]);
    let index = selectedRows[0];

    let referencerow = MainTable[index];

    if (referencerow.F_C_S_P !== 'PR') {
      openNotification('warning', 'Kindly Select One Promo onlys.');
      return;
    }

    referencerow.Event_Name = promos[0].Event_Name;
    referencerow.Duration = promos[0].Duration;
    referencerow.Tape_ID = promos[0].Tape_ID;
    referencerow.VideoID = promos[0].VideoID;

    let res1 = MainTable.slice(0, index);

    let res2 = MainTable.slice(index + 1, MainTable.length);

    const updatedTable1Data = [...res1, referencerow, ...res2];

    let res = updateStartTimes(updatedTable1Data, false, DisplayNTC);

    dispatch(setMainTable(res));
  }
  function removepromo() {
    let remcheck = MainTable.filter(
      (row, index) =>
        selectedRows.includes(index) &&
        row.F_C_S_P !== 'PR' &&
        row.F_C_S_P !== 'SG' &&
        row.F_C_S_P !== 'NTC',
    );

    if (remcheck.length > 0) {
      openNotification('warning', 'Kindly Select only Promo/Song.');
      return;
    }

    let rem = MainTable.filter((row, index) => !selectedRows.includes(index));

    let res = updateStartTimes(rem, false, DisplayNTC);

    dispatch(setMainTable(res));

    setSelectedRows([]);
  }

  const dispatch = useDispatch();

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

  const handleHeaderUpdate = (index, newHeader) => {
    if (by == 'MAINGRID') {
      const newHeaders = [...nonselectedCities];
      newHeaders[index].header = newHeader;
      setnonSelectedCities(newHeaders);
    }
    if (by == 'LEFTGRID') {
      const newHeaders = [...nonselectedCities1];
      newHeaders[index].header = newHeader;
      setnonSelectedCities1(newHeaders);
    }
  };

  const Columns2 = () => {
    const firstprfe = [
      { header: 'FPC Time', name: 'FPC_Time', isvisible: true },
      { header: 'Play Time', name: 'Start_Time', isvisible: true },
      { header: 'Event Name', name: 'Event_Name', isvisible: true },
    ];

    const columnRightFiltered = Columnright.filter(
      (item) => !firstprfe.some((fixedItem) => fixedItem.name === item.name),
    );

    const onDragEnd = (result) => {
      if (!result.destination) return;
      const items = [...columnRightFiltered];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      dispatch(setColumnright([...firstprfe, ...items]));
    };

    return (
      <div
        className="grid grid-cols-2 gap-4"
        style={{ background: 'transparent' }}
      >
        {by === 'MAINGRID' && (
          <Card header="Visible">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {firstprfe.map((item) => (
                      <div key={item.name} className="flex">
                        {item.header}
                      </div>
                    ))}
                    {columnRightFiltered.map((data, index) => (
                      <Draggable
                        key={data.name}
                        draggableId={data.name}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex"
                          >
                            <i
                              className="pi pi-bars mr-2"
                              onClick={() =>
                                dispatch(
                                  setColumnright(
                                    columnRightFiltered.filter(
                                      (row) => row.name !== data.name,
                                    ),
                                  ),
                                )
                              }
                            ></i>
                            {data.header}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Card>
        )}
      </div>
    );
  };

  const LoadMasters = async (selectedEventTypes) => {
    try {
      if (selectedEventTypes === 1) {
        const promomst = await apiGetPromotypemaster(LoginId);
        const formattedOptions = promomst.data.map((option) => ({
          value: option.PromoTypeCode,
          label: option.PromoTypeName,
        }));
        setoptions(formattedOptions);
      }
      if (selectedEventTypes === 2) {
        const fixitem = [
          { value: 1, label: 'All' },
          { value: -2, label: 'Not Used Last 2 Days' },
          { value: -1, label: 'Frequently used in 7 Days' },
        ];
        const Channelmaster = await apiGetSongcategoryDrop();
        const formattedOptions = Channelmaster.data.map((option) => ({
          value: option.SongCategoryCode,
          label: option.SongCategoryName,
        }));
        setoptions([...fixitem, ...formattedOptions]);
      }
      if (selectedEventTypes === 3) {
        const fixitem = [{ value: 1, label: 'All' }];
        const Channelmaster = await apiGetNTCtypedropdown();
        const formattedOptions = Channelmaster.data.map((option) => ({
          value: option.NTCTypeCode,
          label: option.NTCTypeName,
        }));
        setoptions([...fixitem, ...formattedOptions]);
      }
    } catch (error) {
      console.error('Error in LoadMasters:', error);
    }
  };

  const auditpromoscheduling = async (data2) => {
    let param = {
      LocationCode: Channel.LocationCode,
      ChannelCode: Channel.ChannelCode,
      FormName: 'TransmissionLog',
      TelecastDate: data2,
    };
    const auditMaster = await apiGetRestoreDropDown(param);
    const formattedOptions = auditMaster.data.map((option) => ({
      value: option.D_date,
      label: option.D_date,
    }));
    setaudit([...audit, ...formattedOptions]);
  };

  const shworpomo = (name, selectedEventType, EventName) => {
    if (EventName == 'Promo Search') {
      apiGetPromoScheduling2(
        Channel,
        convertDateToYMD(value),
        selectedEventType,
        name,
      )
        .then((response) => {
          if (response.status == 204) {
            openNotification('info', 'Data Not Found');
            dispatch(setSecondTable([]));
            return [];
          }
          return response.data;
        })
        .then((data) => {
          if (data) {
            dispatch(setSecondTable(data));
            let res = Object.keys(data[0]);
            let columns = res.map((row) => {
              let column = {};
              column.name = row;
              column.code = row;
              column.width = 100;
              column.header = row;
              return column;
            });
            const res1 = columns.filter((city) => {
              return !Columnleft.some(
                (selectedCity) => selectedCity.code === city.code,
              );
            });
            setnonSelectedCities1(res1);
          }
        });
    }
    if (EventName == 'Song Search') {
      apiGetSongScheduling2(
        Channel,
        convertDateToYMD(value),
        selectedEventType,
        name,
      )
        .then((response) => {
          if (response.status == 204) {
            openNotification('info', 'Data Not Found');
            dispatch(setSecondTable([]));
            return [];
          }
          return response.data;
        })
        .then((data) => {
          if (data) {
            dispatch(setSecondTable(data));
            if (!data) {
              return;
            }
            let res = Object.keys(data[0]);

            let columns = res.map((row) => {
              let column = {};
              column.name = row;
              column.code = row;
              column.width = 100;
              column.header = row;
              return column;
            });

            const res1 = columns.filter((city) => {
              return !Columnleft.some(
                (selectedCity) => selectedCity.code === city.code,
              );
            });

            setnonSelectedCities1(res1);
          }
        });
    }
    if (EventName == 'NTC Search') {
      apiGetNTCScheduling2(
        Channel,
        convertDateToYMD(value),
        selectedEventType,
        name,
      )
        .then((response) => {
          if (response.status == 204) {
            openNotification('info', 'Data Not Found');
            dispatch(setSecondTable([]));
            return [];
          }
          return response.data;
        })

        .then((data) => {
          if (data) {
            dispatch(setSecondTable(data));

            let res = Object.keys(data[0]);

            let columns = res.map((row) => {
              let column = {};
              column.name = row;
              column.code = row;
              column.width = 100;
              column.header = row;
              return column;
            });

            const res1 = columns.filter((city) => {
              return !Columnleft.some(
                (selectedCity) => selectedCity.code === city.code,
              );
            });

            setnonSelectedCities1(res1);
          }
        });
    }
  };

  const replaceall = () => {
    if (selectedRows.length > 1) {
      openNotification('warning', 'Kindly Select One Promo only.');
      return;
    }

    if (selectedRows2.length > 1) {
      openNotification('warning', 'Kindly Select One Promo only.');
      return;
    }

    let row1 = MainTable[selectedRows[0]];
    let row2 = SecondTable[selectedRows2[0]];

    let res = MainTable.map((row) => {
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

    let uptime = updateStartTimes(res, false, DisplayNTC);

    dispatch(setMainTable(uptime));
  };

  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: BreakNumbers,
      // icon: 'pi pi-pause',
      defaultFocus: 'accept',
      accept: promoinsert,
      reject,
    });
  };

  const reject = () => {
    //openNotification('warning', 'You have rejected');
  };

  const Addcolumnsetting = async () => {
    const mergedData = Columnright.map((item, index) => ({
      ScreenName: 'FinalLog',
      ColumnName: item.code,
      Header: item.header,
      SequenceNo: index,
      IsVisible: 1,
    }));

    if (mergedData.length > 4) {
      try {
        const resp = await Postcolumnsetting(mergedData, token);
        if (resp.status === 200) {
          openNotification('success', 'Data Inserted Successfully.');
          return;
        }
        if (resp.status === 204) {
          openNotification('danger', 'Data Already Exists.');
          return;
        }
      } catch (errors) {
        if (errors.response.status === 500) {
          openNotification('danger', 'Server Error.');
          return;
        }
      }
    } else {
      openNotification('danger', 'Kindly select minimum 5 columns!!');
    }
  };
  const Addcolumnsetting2 = async () => {
    const mergedData = Columnleft.map((item, index) => ({
      ScreenName: 'FinalLogLeft',
      ColumnName: item.code,
      Header: item.header,
      SequenceNo: index,
      IsVisible: 1,
    }));

    if (mergedData.length > 2) {
      try {
        const resp = await Postcolumnsetting(mergedData, token);
        if (resp.status === 200) {
          openNotification('success', 'Data Inserted Successfully.');
          return;
        }
        if (resp.status === 204) {
          openNotification('danger', 'Data Already Exists.');
          return;
        }
      } catch (errors) {
        if (errors.response.status === 500) {
          openNotification('danger', 'Server Error.');
          return;
        }
      }
    } else {
      openNotification('danger', 'Kindly select minimum 2 columns.');
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
          if (by == 'MAINGRID') {
            Addcolumnsetting();
          }
          if (by == 'LEFTGRID') {
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

  const HeaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex justify-between">
          <span className="font-bold">{EventDataName}</span>

          <div className="flex ">
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
                    setby('LEFTGRID');
                  }}
                >
                  <HiOutlineCog />
                </span>
              </Tooltip>
            )}
            <ButtonE
              icon={<HiOutlineX />}
              size="xs"
              style={{
                marginTop: -5,
              }}
              onClick={() => setEventDataName(null)}
            />
          </div>
        </div>
      </div>
    );
  };
  const FilterheaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex justify-between">
          <span className="font-bold">Rotation Info</span>

          <div>
            <span className="mt-1 mr-1 flex items-center">
              <Badge value={table3Data.length} severity="success"></Badge>
              <ButtonE
                className="ml-2"
                icon={<HiOutlineX />}
                size="xs"
                onClick={() => setEventDataName(null)}
              />
            </span>
          </div>
        </div>
      </div>
    );
  };
  const BreakwiseheaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex justify-between align-items-center">
          <span className="font-bold">Break Wise Duration</span>
          <ButtonE
            icon={<HiOutlineX />}
            size="xs"
            onClick={() => setEventDataName(null)}
          />
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
          Do you want to include during these breaks?
        </div>
        <Checkbox.Group
          value={breaknumbers}
          onChange={(options) => {
            SelectedBrkNo = options;
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

  const openNotification2 = (type) => {
    toaste.push(
      <Notification title="Api Hit" type={type}>
        Timer End Api Hit
      </Notification>,
    );
  };

  let maxWidth = `${!Insertpromo ? '100%' : '70%'}`;
  return (
    <Card>
      <Loader showLoader={showLoader} />
      <div className="pb-1 pt-1 ">
        {Channel.AutoSave ? (
          <Tooltip title="Auto Save">
            <Clock
              Progress={Progress}
              PromoSchdulingSave={PromoSchdulingSave}
              openNotification={openNotification2}
            />
          </Tooltip>
        ) : null}
      </div>
      <div>
        <div className="flex justify-between ">
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
                    setby('MAINGRID');
                  }}
                >
                  <HiOutlineCog />
                </span>
              </Tooltip>

              <Tooltip title="Segment Move/Delete">
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
              </Tooltip>
              {selectedComms.length == 0 && (
                <Tooltip
                  title="Copy [Promo/Song]"
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
                </Tooltip>
              )}
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
                          let previousversion =
                            table1dataversions[cm2.current - 2];
                          if (cm2.current > 1) {
                            setundo(true);
                            cm2.current--;

                            dispatch(setMainTable(previousversion));
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
                            dispatch(setMainTable(nextversion));
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

      {/* add here froheaderadd code */}
      <ContextMenu model={items} ref={cm} breakpoint="767px" />
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* <Splitter style={{ height: '800px', border: 'none' }}>
                    <SplitterPanel size={100}> */}
        <div className={!Insertpromo ? 'flex-full-width' : 'flex gap-1'}>
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
                                filterOptions={filterOptions}
                                IsSortingAllow={false}
                                selectedCities={Columnright}
                                dispatch={dispatch}
                                ColIndex={index}
                                ColumnInfo={city}
                                DisplayFilter={DisplayFilter}
                              />
                            </>
                          ))}
                        </Tr>
                      </THead>

                      <TBody {...provided.droppableProps} className="tbodye">
                        {MainTable?.map((data, index) => (
                          <>
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
                                    // className={`backcolor rowINeed-${data.Id
                                    //   } draggble-row row-${data.Id} ${data.PrimaryID === selectedPrimaryID
                                    //     ? 'showntcRow'
                                    //     : !DisplayNTC && data.F_C_S_P === 'NTC'
                                    //       ? 'Rowhidden'
                                    //       : ''
                                    //   }`}
                                    className={`backcolor rowINeed-${EventDataName === 'Program Search'
                                      ? data.Id
                                      : data.SequenceNo
                                      } 
            draggble-row row-${EventDataName === 'Program Search' ? data.Id : data.SequenceNo
                                      } 
            ${data.PrimaryID === selectedPrimaryID
                                        ? 'showntcRow'
                                        : !DisplayNTC && data.F_C_S_P === 'NTC'
                                          ? 'Rowhidden'
                                          : ''
                                      }`}
                                    onClick={(e) => {
                                      if (e.ctrlKey) {
                                        setSelectedRows((prevSelectedRows) => {
                                          if (
                                            prevSelectedRows.includes(index)
                                          ) {
                                            return prevSelectedRows.filter(
                                              (row) => row !== index,
                                            );
                                          } else {
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
                                            item2.FPC_ID == data['FPC_ID'],
                                        );
                                      // console.log(mismatchedItem);

                                      return (
                                        <Td
                                          className={'jhh'}
                                          key={city.name}
                                          style={{
                                            borderBottom: '1px solid #8c7777',
                                            borderRight: '1px solid #8c7777',
                                            ...(selectedRows.includes(index)
                                              ? style.pressed
                                              : {
                                                backgroundColor:
                                                  data['TxLogCode']?.length >
                                                    2 &&
                                                    city.name ===
                                                    data['TxLogCode']
                                                    ? 'rgb(239 68 68)'
                                                    : data.EventDefaultBackColor,
                                                color:
                                                  data.EventDefaultFrontColor,
                                                width: data.width,
                                                fontSize: data.fontSize,
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
                                                  {data['F_C_S_P'] == 'NTC' ? (
                                                    <p
                                                      style={{ fontSize: '12' }}
                                                    >
                                                      {data['F_C_S_P']}
                                                    </p>
                                                  ) : (
                                                    <p>{data['F_C_S_P']}</p>
                                                  )}
                                                </Avatar>
                                              )}
                                            {data[city.name]}
                                            {
                                              // data.FPC_Time?.length !== 0 &&
                                              city.name == 'FPC_Time' &&
                                              data['F_C_S_P'] == 'CT' &&
                                              selectedRows.includes(index) &&
                                              (mismatchedItem ? (
                                                <span
                                                  className="pi pi-sync text-base"
                                                  style={{
                                                    cursor: 'pointer',
                                                  }}
                                                  onClick={() => {
                                                    setIsOpen12(true);
                                                    setFPCIDSTORE(
                                                      data['FPC_ID'],
                                                    );
                                                  }}
                                                ></span>
                                              ) : null)
                                            }
                                            {
                                              // data.FPC_Time?.length == 0 &&
                                              city.name == 'FPC_Time' &&
                                              (data['F_C_S_P'] == 'PR' ||
                                                data['F_C_S_P'] == 'SG' ||
                                                data['F_C_S_P'] == 'CM' ||
                                                data['F_C_S_P'] == 'NTC') &&
                                              selectedRows.includes(
                                                index,
                                              ) && (
                                                <div className="flex gap-2">
                                                  {data['F_C_S_P'] ==
                                                    'CM' && (
                                                      <Tooltip title="Drop Spot">
                                                        <button
                                                          onClick={() =>
                                                            MoveToDropBox()
                                                          }
                                                        >
                                                          <span className=" pi pi-box text-base"></span>
                                                        </button>
                                                      </Tooltip>
                                                    )}
                                                  <button
                                                    onClick={() =>
                                                      removepromo()
                                                    }
                                                  >
                                                    <span className="pi pi-trash text-base"></span>
                                                  </button>
                                                  <button
                                                    onClick={() => {
                                                      setEventDataName(
                                                        'Rotation Info',
                                                      );
                                                      all();
                                                    }}
                                                  >
                                                    <span className="pi pi-info-circle text-base"></span>
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
                                                              : data[
                                                              'PrimaryID'
                                                              ],
                                                          );
                                                        }}
                                                      >
                                                        <HiFilm />
                                                      </button>
                                                    )}
                                                </div>
                                              )
                                            }
                                            {data.FPC_Time?.length === 0 &&
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
                                                    <HiFilm />
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

                  dispatch(setMainTable(mergedData));
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
                onClick={() => {
                  setShowLoader(true);
                  apiGettransmissionlog(Channel, convertDateToYMD(value), 'GEN')
                    .then((response) => response.data)
                    .then((data) => {
                      let resdt = updateStartTimes(data, true, false);
                      if (resdt) {
                        setShowLoader(false);
                        dispatch(setMainTable(resdt));
                        setIsOpen1(false);
                      }
                    });
                }}
              >
                Yes
              </ButtonE>
            </div>
          </Dial>
          {Insertpromo ? (
            <div className="card">
              <div className=" ml-2 mb-2 grid grid-cols-9 gap-2">
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
                <Tooltip title="Generate log">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={'twoTone'}
                    icon={<HiPencilSquare />}
                    onClick={() => {
                      setIsOpen1(true);
                    }}
                  />
                </Tooltip>

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
                        MainTable,
                        'Final log',
                        newArray,
                        true,
                      );
                    }}
                  />
                </Tooltip>

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
                <Tooltip title="Play Out File Export">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant="twoTone"
                    icon={<TbFileExport />}
                    onClick={() => {
                      ExportPlayOut();
                    }}
                  />
                </Tooltip>
                <Tooltip title="Show NTC">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={DisplayNTC ? 'solid' : 'twoTone'}
                    icon={DisplayNTC ? <HiFilm /> : <HiFilm />}
                    onClick={() => {
                      setDisplayNTC(!DisplayNTC);
                      const NTCExist = MainTable.filter(
                        (item) => item.F_C_S_P === 'NTC',
                      );

                      const updatedArray = Columnright.some(
                        (item) => item.header == 'OffsetStartTime',
                      );

                      if (updatedArray) {
                        return;
                      } else {
                        if (NTCExist.length > 0) {
                          dispatch(
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
                            ]),
                          );
                          setDisplayNTC(true);
                          return;
                        }
                      }
                      if (NTCExist.length == 0) {
                        const updatedArray2 = Columnright.filter(
                          (item) => item.header !== 'OffsetStartTime',
                        );
                        setDisplayNTC(false);

                        dispatch(setColumnright(updatedArray2));
                        return;
                      }
                      let res = updateStartTimes(MainTable, true, true);

                      dispatch(setMainTable(res));
                    }}
                  />
                </Tooltip>
                <Tooltip title="Finalize">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={'twoTone'}
                    icon={<LuUnlock />}
                  />
                </Tooltip>
                <Tooltip title="Restore [Previously saved data]">
                  <ButtonE
                    className="text-lg"
                    size="sm"
                    variant={'twoTone'}
                    icon={<MdRestore />}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  />
                </Tooltip>
              </div>

              <Card>
                <div className="grid grid-flow-col auto-cols-fr gap-1">
                  <div
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <p className="CountDataLabel">Prog</p>
                    <p className="CountDatavalue">
                      {CountData.Programs.length}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <p className="CountDataLabel">Promo</p>
                    <p className="CountDatavalue">{CountData.Promos.length}</p>
                  </div>
                  <div
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <p className="CountDataLabel">Song</p>
                    <p className="CountDatavalue">{CountData.Songs.length}</p>
                  </div>

                  <div
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <p className="CountDataLabel">Spot</p>
                    <p className="CountDatavalue">
                      {CountData.Commercial.length}
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <p className="CountDataLabel">NTC</p>
                    <p className="CountDatavalue">{CountData.NTC.length}</p>
                  </div>
                </div>
              </Card>

              {EventDataName ? null : (
                <Card>
                  <div className="grid grid-cols-3 gap-2">
                    <ButtonE
                      size="xs"
                      onClick={() => {
                        setEventDataName('Promo Search');
                        setValue3(0);
                        LoadMasters(1);
                        shworpomo('0000', 0, 'Promo Search');
                      }}
                      variant="twoTone"
                      icon={<HiOutlineSpeakerphone />}
                    >
                      Insert Promo
                    </ButtonE>
                    <ButtonE
                      size="xs"
                      onClick={() => {
                        setEventDataName('Song Search');
                        setValue3(0);
                        LoadMasters(2);
                        shworpomo('', 0, 'Song Search');
                      }}
                      variant="twoTone"
                      icon={<CgMusic />}
                    >
                      Insert Song
                    </ButtonE>
                    <ButtonE
                      size="xs"
                      onClick={() => {
                        setEventDataName('NTC Search');
                        setValue3(0);
                        LoadMasters(3);
                        shworpomo('000', 0, 'NTC Search');
                      }}
                      variant="twoTone"
                      icon={<MdOutlineManageHistory />}
                    >
                      Insert NTC
                    </ButtonE>
                    <ButtonE
                      size="xs"
                      onClick={() => setEventDataName('Rotation Info')}
                    >
                      Rotation Info
                    </ButtonE>
                    <ButtonE
                      size="xs"
                      onClick={() => setEventDataName('Break Wise Duration')}
                    >
                      Duration
                    </ButtonE>
                    <Badges content={count?.length}>
                      {' '}
                      <ButtonE
                        size="xs"
                        onClick={() => {
                          setEventDataName('Program Search');
                          GetTranLog();
                          setDisplay(false);
                        }}
                      >
                        Change Program{' '}
                      </ButtonE>
                    </Badges>
                    <ButtonE
                      size="xs"
                      onClick={() => {
                        setEventDataName('Drop Spot');

                        GetSpots('D', '');
                        setDisplay(true);
                        Commercial_scheduling_CountsApi();
                      }}
                    >
                      {' '}
                      <Badges
                        content={Commercial_scheduling_Counts[3]?.FieldValue}
                      >
                        {' '}
                      </Badges>
                      Drop Spots
                    </ButtonE>

                    <ButtonE
                      size="xs"
                      onClick={() => {
                        setEventDataName('Last Minute Spots');
                        dispatch(setSecondTable([]));
                        GetSpots('N', '');
                        setDisplay(true);
                        Commercial_scheduling_CountsApi();
                      }}
                    >
                      <Badges
                        content={Commercial_scheduling_Counts[4]?.FieldValue}
                      >
                        {' '}
                      </Badges>
                      Last Minute
                    </ButtonE>
                    <ButtonE
                      size="xs"
                    // onClick={() => setEventDataName('NTC Info')}
                    >
                      NTC Info
                    </ButtonE>
                    <ButtonE
                      size="xs"
                      onClick={async () => {
                        await Commercial_scheduling_CountsApi();
                        setEventDataName('Summary');
                      }}
                    >
                      Summary
                    </ButtonE>

                    <ButtonE
                      size="xs"
                      onClick={() => setISRefreshDuration(true)}
                    >
                      Refresh Duration
                    </ButtonE>
                    <ButtonE
                      size="xs"
                      onClick={async () => {
                        await Commercial_scheduling_CountsApi();
                        setIsPushToPlayoutDialogOpen(true);
                      }}
                    >
                      Push To Playout
                    </ButtonE>
                  </div>
                </Card>
              )}
              {(() => {
                switch (EventDataName) {
                  case 'Drop Spot':
                  case 'Promo Search':
                  case 'NTC Search':
                  case 'Song Search':
                  case 'Last Minute Spots':
                  case 'Program Search':
                    return (
                      <Card
                        header={<HeaderTemplate />}
                        // style={{ height: '425px' }}
                        // footerBorder={false}
                        footer={
                          EventDataName == 'Promo Search' ||
                            EventDataName == 'Song Search'
                            ? cardFooter
                            : null
                        }
                      >
                        {Display == 'truer' ? (
                          <Input
                            placeholder="Offset Start Time"
                            value={OffsetStartTime}
                            maxLength="12"
                            size="xs"
                            style={{ marginTop: '0.5px', marginBottom: 10 }}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              // Remove non-digit characters
                              const newValue = value.replace(/\D/g, '');
                              // Format the value as HH:mm:ss:ff
                              let formattedValue = '';
                              for (
                                let i = 0;
                                i < Math.min(newValue.length, 8);
                                i += 2
                              ) {
                                if (i > 0) formattedValue += ':';
                                formattedValue += newValue.substr(i, 2);

                                if (formattedValue.split(':').length === 1) {
                                  // Hours
                                  if (parseInt(formattedValue) > 23) {
                                    formattedValue = '23';
                                  }
                                } else if (
                                  formattedValue.split(':').length === 2
                                ) {
                                  // Minutes
                                  if (
                                    parseInt(formattedValue.split(':')[1]) > 59
                                  ) {
                                    formattedValue = `${formattedValue.split(':')[0]
                                      }:59`;
                                  }
                                } else if (
                                  formattedValue.split(':').length === 3
                                ) {
                                  // Seconds
                                  if (
                                    parseInt(formattedValue.split(':')[2]) > 59
                                  ) {
                                    formattedValue = `${formattedValue.split(':')[0]
                                      }:${formattedValue.split(':')[1]}:59`;
                                  }
                                } else if (
                                  formattedValue.split(':').length === 4
                                ) {
                                  // Frames
                                  if (
                                    parseInt(formattedValue.split(':')[3]) > 23
                                  ) {
                                    formattedValue = `${formattedValue.split(':')[0]
                                      }:${formattedValue.split(':')[1]}:${formattedValue.split(':')[2]
                                      }:23`;
                                  }
                                }
                              }
                              setOffsetStartTime(formattedValue);
                              if (formattedValue.length == 11) {
                                const updatedArray = SecondTable.map((obj) => {
                                  // Modify the OffsetStartTime property as needed
                                  obj.OffsetStartTime = formattedValue; // For example, set it to "01:00:00:00"
                                  return obj;
                                });
                                dispatch(setSecondTable(updatedArray));
                              }
                            }}
                          />
                        ) : null}
                        {Display ? (
                          <>
                            {EventDataName == 'Drop Spot' ||
                              EventDataName == 'Last Minute Spots' ? null : (
                              <InputGroup className="mb-4">
                                <div className="mr-1" style={{ minWidth: 110 }}>
                                  <Select
                                    placeholder="Event Type"
                                    size="xs"
                                    isSearchable={false}
                                    value={options.find(
                                      (option) => option.value === value3,
                                    )}
                                    onChange={(e) => {
                                      setValue3(e.value);
                                    }}
                                    options={options}
                                  />
                                </div>
                                <Input
                                  placeholder="Event Caption\Video ID"
                                  size="sm"
                                  style={{ height: '38px', width: '210px' }}
                                  onChange={(e) => {
                                    setname(e.target.value);
                                  }}
                                  value={name}
                                />
                                <ButtonE
                                  icon={<CgSearch />}
                                  onClick={() => {
                                    shworpomo(name, value3, EventDataName);
                                  }}
                                />
                              </InputGroup>
                            )}
                          </>
                        ) : null}

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
                                          {Columnleft.map((city, index) => (
                                            <FilterColumn
                                              columnName={city.name}
                                              filterOptions={filterOptions}
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
                                        {SecondTable.map((data, index) => (
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
                                                  } ${data.F_C_S_P === 'S'
                                                    ? 'Rowhidden'
                                                    : ''
                                                  }`}
                                                onClick={(e) => {
                                                  if (
                                                    EventDataName ==
                                                    'Program Search'
                                                  ) {
                                                    const div1 =
                                                      document.getElementById(
                                                        'div1',
                                                      );
                                                    // let targetElement =
                                                    //   div1.querySelector(
                                                    //     `.rowINeed-${data.Id}`,
                                                    //   );
                                                    console.log(
                                                      'EventDataName',
                                                      EventDataName,
                                                    );
                                                    let elementClass =
                                                      EventDataName ===
                                                        'Program Search'
                                                        ? `rowINeed-${data.Id}`
                                                        : `rowINeed-${data.SequenceNo}`;
                                                    console.log(
                                                      'elementClass1',
                                                      elementClass,
                                                    );
                                                    let targetElement =
                                                      div1.querySelector(
                                                        `.${elementClass}`,
                                                      );

                                                    targetElement.scrollIntoView(
                                                      {
                                                        behavior: 'smooth',
                                                        block: 'center',
                                                      },
                                                    );
                                                  }
                                                  const indices =
                                                    findIndicesWithSameFPC_ID(
                                                      SecondTable,
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
                                                    className={'jhh'}
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
                  case 'Summary':
                    return (
                      <Card>
                        <div>
                          <div className="flex justify-between items-center mb-5">
                            <h4 className=""> Summary</h4>{' '}
                            <ButtonE
                              icon={<HiOutlineX />}
                              size="xs"
                              style={{
                                marginTop: -5,
                              }}
                              onClick={() => setEventDataName(null)}
                            />
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-emerald-500"
                              />
                              Total Spots
                            </div>
                            <h6>{CountData.Commercial2.length}</h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-red-500"
                              />
                              Total Schedule
                            </div>
                            <h6>{CountData.NTC.length}</h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Total Drop
                            </div>
                            <h6>
                              {Commercial_scheduling_Counts[3]?.FieldValue}
                            </h6>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Total Last Min Spot
                            </div>
                            <h6>
                              {Commercial_scheduling_Counts[4]?.FieldValue}
                            </h6>
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

                          {/* <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Out Of RODP
                            </div>
                            <p>50</p>
                          </div> */}
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Total Breaks
                              {/* <p className="text-[0.60rem] ml-1 text-yellow-500 mt-1">
                                (Sec)
                              </p> */}
                            </div>
                            <p>{TotalBreaks}</p>
                          </div>
                          <div className="flex justify-between items-center px-2  border-b pb-3 border-inherit mt-3">
                            <div className="flex items-center">
                              <Badges
                                className="mr-4"
                                innerClass="bg-yellow-500"
                              />
                              Commercial Duration{' '}
                              <p className="text-[0.60rem] ml-1 text-yellow-500 mt-1">
                                (Sec)
                              </p>
                            </div>
                            <p>{totalDuration}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  case 'Rotation Info':
                    return (
                      <Card
                        header={<FilterheaderTemplate />}
                        style={{ height: '425px' }}
                      >
                        <div style={{ width: 380 }}>
                          <div
                            style={{
                              height: '340px',
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
                                          const div1 =
                                            document.getElementById('div1');
                                          // let targetElement =
                                          //   div1.querySelector(
                                          //     `.rowINeed-${row.SequenceNo}`,
                                          //   );

                                          console.log(
                                            'EventDataName',
                                            EventDataName,
                                          );
                                          let elementClass =
                                            EventDataName === 'Program Search'
                                              ? `rowINeed-${row.Id}`
                                              : `rowINeed-${row.SequenceNo}`;
                                          console.log(
                                            'elementClass.',
                                            elementClass,
                                          );
                                          let targetElement =
                                            div1.querySelector(
                                              `.${elementClass}`,
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
                        <BreakwiseFinalLog
                          className="p-0"
                          BreakwiseData={BreakwiseData}
                          colorMapping={colorMapping}
                        />
                      </Card>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          ) : (
            <></>
          )}
        </div>
      </DragDropContext>
      <StickyFooter
        className="-mx-8  flex items-center justify-between  pl-8 pt-2"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <div style={{ height: '100%', marginRight: '20px' }}>
          <TimescaleBar timeRanges={TimeSpan} />
        </div>

        <div className="md:flex items-center mr-4">
          <ButtonE
            type="button"
            onClick={discard}
            className="mr-2"
            variant=""
            size="sm"
            icon={<HiBackspace />}
          >
            Back
          </ButtonE>
          &nbsp;
          <ButtonE
            onClick={PromoSchdulingSave}
            variant="solid"
            type="submit"
            size="sm"
            icon={<AiOutlineSave />}
          >
            Save
          </ButtonE>
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
        isOpen={ISRefreshDuration}
        style={{
          content: {
            marginTop: 250,
          },
        }}
        contentClassName="pb-0 px-0"
        onClose={() => setISRefreshDuration(false)}
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
            onClick={() => setISRefreshDuration(false)}
          >
            No
          </Button>

          <Button variant="solid" onClick={() => RefreshDuration()}>
            Yes
          </Button>
        </div>
      </Dial>
      <PushToPlayoutDialog
        isDialogOpen={isPushToPlayoutDialogOpen}
        setIsDialogOpen={setIsPushToPlayoutDialogOpen}
        CountData={CountData}
        Commercial_scheduling_Counts={Commercial_scheduling_Counts}
        TotalBreaks={TotalBreaks}
        totalDuration={totalDuration}
        blankTxLogCount={blankTxLogCount}
        ExportPlayOut={ExportPlayOut}
      />
    </Card>
  );
};

export default FinalLogPage;

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
