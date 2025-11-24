import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Tooltip,
  ScrollBar,
  TimeInput,
  Progress,
  Notification,
  toast,
  Dialog,
  Alert,
  Avatar,
} from 'components/ui';
import { useState, useEffect, useRef } from 'react';
import { convertDateToYMD } from 'components/validators';
import {
  PostNTCScheduling,
  Postcolumnsetting,
  apiGetNTCScheduling2,
  apiGetRestoreDropDown,
  apiGetRestoreScheduling,
} from 'services/SchedulingService';
import '../../Scheduling/style.css';
import {
  HiBackspace,
  HiFilter,
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
  CgSearch,
  CgUndo,
} from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup } from 'components/ui';
import { StickyFooter } from 'components/shared';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Checkbox } from 'components/ui';

import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { ContextMenu } from 'primereact/contextmenu';
import { apiUSP_Sch_Promo_GetContaintDetails } from 'services/MasterService';
import {
  addTimeDurations,
  convertDateFormatyyyyMMdd,
  formatDurationHHMMSSFF,
  getRandomColorButton,
  parseDuration,
  shuffleArray,
} from 'views/Controls/GLOBALFUNACTION';
import { Badge } from 'primereact/badge';
import { FaCopy, FaRegCopy } from 'react-icons/fa';
import {
  setDatainN,
  setdatestoreC,
  settimestoreC,
} from 'store/auth/scheduling';

import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import {
  apiautoshufflepromo,
  apiautoshufflepromoId,
} from 'services/LibraryService';
import { apiGetNTCtypedropdown } from 'services/NTCService';
import {
  Clock,
  FilldraggedRow,
  hideStackedSideNav,
  updateStartTimes,
} from 'views/Scheduling/general';
import FilterColumn from 'views/Scheduling/FilterColumn';
import { setdateForm } from 'store/locale/localeSlice';
import { AiOutlineSave } from 'react-icons/ai';
import classNames from 'classnames';
import { BsViewList } from 'react-icons/bs';
import { format } from 'date-fns';
import NTC_Graph from './NTC_Graph';
import { VscGraphLine } from 'react-icons/vsc';
import { LiaBroadcastTowerSolid } from 'react-icons/lia';
import {
  MdOutlineClearAll,
  MdOutlineReportGmailerrorred,
} from 'react-icons/md';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { eventColorsAg } from 'components/shared/CalendarView';
import { GrRotateLeft } from 'react-icons/gr';
// import { FaPause, FaPlay } from 'react-icons/fa';
const { Tr, Th, Td, THead, TBody } = Table;

var SelectedBrkNo = [];
const icons = [
  <MdOutlineClearAll />,
  <LiaBroadcastTowerSolid />,
  <MdOutlineReportGmailerrorred />,
  <FiChevronsLeft />,
  <FiChevronsRight />,
  // Add more icons as needed
];
const NTCSchedulingPage = ({
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
  console.log(table1Data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setdateForm([value, 'NTC Scheduling']));
    setheadername('');
    return () => {
      setheadername('NTC Scheduling');
    };
  }, []);

  const ArrayDisplay = ({ array }) => {
    // Check if the array has more than one element
    if (array.length > 1) {
      return (
        <div>
          <p>Do you want to remove selected NTC?</p>
        </div>
      );
    } else if (array.length === 1) {
      return (
        <p> Do you want to remove '{table1Data[selectedRows]?.Event_Name}'?</p>
      );
    } else {
      return <p>NTC Not Selected.!</p>;
    }
  };
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [ColumnsExist, setColumnsExist] = useState([]);
  const [ColumnsExistLeft, setColumnsExistLeft] = useState([]);
  const [yupo, setyupo] = useState([]);
  const [cities1, setcities1] = useState([]);
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

  const [undo, setundo] = useState(false);
  const [redo, setredo] = useState(false);
  const [table2DataCopy, setTable2DataCopy] = useState(false);
  const table1DataCopy = [...table1Data];
  const [fpcTimes2, setfpcTimes2] = useState([]);
  const [NTCdata, setNTCdata] = useState([]);
  const [selectedNTCs, setselectedNTCs] = useState(null);
  const [selectedNTCDuration, setselectedNTCDuration] = useState(null);
  const [isProgrambase, setIsProgrambase] = useState(true);
  const [isComBrk, setIsComBrk] = useState(false);
  const [DisplayFilter, setDisplayFilter] = useState(false);
  const [Display, setDisplay] = useState(true);
  const [EventDataName, setEventDataName] = useState('');
  const [selectedEventType, setSelectedEventType] = useState(1);

  const [SettingCols, setSettingCols] = useState();

  const [columnFilters, setColumnFilters] = useState([
    {
      columnName: '',
      filterValue: '',
      filterOption: 'contains',
    },
  ]);

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

  const tableContainerRef = useRef(null);

  const show = (message, type) => {
    openNotification2(type, message);
  };
  const handleRowDeleteButtonClick = () => {
    removeNTC();
  };

  const handleRowFilterButtonClick = () => {
    all();
  };
  const discard = () => {
    let ogversion = table1dataversions[1];
    cm2.current = 1;
    setTable1Data(ogversion);
    settable1dataversions([[]]);
    setValue(null);
  };
  const discard2 = () => {
    if (table1dataversions.length <= 2) return;

    let finalversion = table1dataversions[table1dataversions.length - 1];
    cm2.current = 2;
    settable1dataversions([[], finalversion]);
  };

  const [dialogIsOpen, setIsOpen] = useState(false);
  const [isOpenAutoShuffle, setIsOpenAutoShuffle] = useState(false);
  const [ReplacedialogIsOpen, setReplacedialogIsOpen] = useState(false);
  const [ReplacedialogIsOpenAll, setReplacedialogIsOpenAll] = useState(false);
  const [RemovedialogIsOpenAll, setRemovedialogIsOpenAll] = useState(false);
  const [RemovedialogIsOpen, setRemovedialogIsOpen] = useState(false);
  const [autoShuffleID, setAutoShuffleID] = useState(0);

  const openDialog = () => {
    auditNTCscheduling(Channel, convertDateToYMD(value));
    setIsOpen(true);
  };

  const shworpomo2 = (value3, name) => {
    apiGetNTCScheduling2(value2, convertDateToYMD(value), value3, name)
      .then((response) => {
        if (response.status == 204) {
          setTable2Data([]);
          return;
        }
        return response.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
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

        setColumnsExistLeft(res1);
      });
  };
  const FunctionSmartShuffle = async () => {
    let Totaltimeuse = '00:00:00:00';
    let mergedDataIndex = 0;

    const resp = await apiautoshufflepromoId(autoShuffleID);

    const mergedData = resp.data.map((item) => ({
      TapeId: item.NTCMaster.VideoID,
      VideoID: item.NTCMaster.VideoID,
      NTCCode: item.NTCMaster.NTCCode,
      NTCCaption: item.NTCMaster.NTCCaption,
      NTCDuration: item.NTCMaster.NTCDuration,
    }));

    let shuffledData = shuffleArray(mergedData);
    const updatedArray = [];

    console.log(table1Data);

    table1Data.forEach((item, index) => {
      updatedArray.push(item);
      let currentId = table1Data[table1Data.length - 1].Id + 1;

      if (item.F_C_S_P === 'S') {
        Totaltimeuse = '00:00:00:00';

        for (let i = 0; i < shuffledData.length; i++) {
          const NTCItem = shuffledData[mergedDataIndex];
          console.log('Totaltimeuse', Totaltimeuse);
          Totaltimeuse = addTimeDurations(Totaltimeuse, NTCItem.NTCDuration);
          console.log('Totaltimeuse', Totaltimeuse);
          if (parseDuration(Totaltimeuse) < 25) {
            updatedArray.push({
              Id: currentId++, // Increment index to insert below
              FPC_ID: item.FPC_ID,
              LocationCode: null,
              ChannelCode: null,
              FPC_Time: '',
              Start_Time: '00:00:00:00',
              Event_Name: NTCItem.NTCCaption,
              ContentCode: item.ContentCode,
              NTCTypeCode: 1,
              SeasonNo: item.SeasonNo,
              Ep_No: item.Ep_No,
              Tape_ID: NTCItem.TapeId,
              BreakNumber: item.BreakNumber,
              Duration: NTCItem.NTCDuration,
              F_C_S_P: 'NTC',
              NTCCode: NTCItem.NTCCode,
              EventDefaultFrontColor: '#333333',
              EventDefaultBackColor: '#4DD4DF',
              VideoID: NTCItem.VideoID,
            });
          }
        }
        if (mergedDataIndex + 1 >= shuffledData.length) {
          mergedDataIndex = 0;
        } else {
          mergedDataIndex = mergedDataIndex + 1;
        }
      }
    });

    console.log(updatedArray);
    setTable1Data(updatedArray);
  };

  const RestorePreviousVersion = async (e) => {
    try {
      let param = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
        FormName: 'NTCScheduling',
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

  const [table1dataversions, settable1dataversions] = useState([]);
  const [InsertNTC, setInsertNTC] = useState(true);
  const [copyNTC, setCopyNTC] = useState(false);
  const [ShowGraph, setShowGraph] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsCopy, setSelectedRowsCopy] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tobepastedrow, settobepastedrow] = useState(null);
  const [draggedRows, setdraggedRows] = useState([]);
  const [iscopy, setiscopy] = useState(false);
  const [isdisplaysetting, setisdisplaysetting] = useState(false);
  const [AutoSchdulevisible, setAutoSchdulevisible] = useState(false);
  const [SelectedFPC, setSelectedFPC] = useState([]);
  const [BreakwiseData, setBreakwiseData] = useState([]);

  const [NTCtotalDuration, setNTCtotalDuration] = useState(false);
  const [segmenttotalDuration, setSegmenttotalDuration] = useState(false);
  const [commercialDuration, setCommercialDuration] = useState(false);

  const [starttime, setstarttime] = useState(null);
  const [endtime, setendtime] = useState(null);

  const token = useSelector((state) => state.auth.session.token);
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
        removeNTC();
      },
    },
  ];

  function GetBreakwiseDuration(table1data) {
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
          //    existingBreakNumber.data.push({ ...rest });
          if (F_C_S_P === 'NTC') {
            if (existingBreakNumber.totalDuration === undefined) {
              existingBreakNumber.totalDuration = 0;
            }
            existingBreakNumber.totalDuration += parseDuration(Duration);
          } else {
            existingBreakNumber.totalDuration += 0;
          }
        } else {
          existingFPC.data.push({
            BreakNumber,
            totalDuration: 0,
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
              totalDuration: F_C_S_P === 'NTC' ? parseDuration(Duration) : 0,
            },
          ],
        });
      }

      return result;
    }, []);

    let lets = groupedData;
    console.log('lets', lets);

    const FPCTimewithDuration = [];
    lets.forEach((item, key) => {
      const totalDuration = item.data.reduce(
        (acc, breakItem) => acc + breakItem.totalDuration,
        0,
      );
      FPCTimewithDuration.push({
        FPC_Time: item.FPC_Time,
        totalDuration: Math.round(totalDuration),
      });
    });

    const newData = FPCTimewithDuration.map((item, index) => {
      const matchKey = Object.keys(fpcTimes).find(
        (key) => fpcTimes[key] === item.FPC_Time,
      );
      if (matchKey) {
        return { ...item, columnIndex: matchKey };
      }
      return item;
    });
    console.log('newData fpcTimes2', newData);
    setfpcTimes2(newData);
    const transformedData = lets.map((item) => {
      const children = item.data.map((breakItem) => ({
        key: `${item.FPC_ID}-${breakItem.BreakNumber}`,
        label: 'BreakNumber',
        icon: 'pi pi-fw pi-file',
        data: {
          BreakNumber: breakItem.BreakNumber,
          totalDuration: breakItem.totalDuration,
        },
      }));
      const totalDurationSum = children.reduce(
        (sum, child) => sum + child.data.totalDuration,
        0,
      );

      return {
        key: `${item.FPC_ID}`,
        label: 'Event_Name',
        icon: 'pi pi-fw pi-cog',
        data: {
          Event_Name: '[' + item.FPC_Time + '] ' + item.Event_Name,
          BreakNumber: children.length,
          totalDuration: totalDurationSum,
          FPC_Time: item.FPC_Time,
        },
        children,
      };
    });
    console.log('transformedData', transformedData);
    setBreakwiseData(transformedData);
  }
  const all = () => {
    console.log('table1Data', table1Data);
    const Rotation = table1Data.map((item, key) => ({
      ...item,
      columnIndex: key,
    }));

    setIsPanelOpen(false);
    setIsPanelOpen1(true);
    setIsPanelOpen2(false);
    let Event_Name = Rotation[selectedRows[0]]['Event_Name'];
    let res = Rotation.filter(
      (row, index) => row.Event_Name == Event_Name,
      // selectedRows.includes(index)
    );
    setTable3Data([...res]);
    setActiveIndex(1);
  };
  const NTCSchdulingSave = async () => {
    //const resp = await PostFPCSaveAs(table1Data, token)
    console.log('table1Data', table1Data);

    const filteredData = table1Data
      .map((item, index) => ({ Position: index + 1, ...item }))
      .filter((item) => item.F_C_S_P === 'NTC');

    const transformedData = filteredData.map((item) => ({
      LocationCode: value2.LocationCode,
      ChannelCode: value2.ChannelCode,
      TelecastDate: convertDateToYMD(value),
      NewTelecastDate: convertDateToYMD(value),
      TelecastTime: item.Start_Time, //  with actual value
      NTCCode: item.NTCCode,
      ContentCode: item.ContentCode,
      BreakNumber: Number(item.BreakNumber),
      SeasonNo: item.SeasonNo,
      EpisodeNo: item.Ep_No,
      Position: item.Position,
      NTCTypeCode: Number(item.NTCTypeCode),
      ActualTelecastTime: item.Start_Time, //  with actual value
      NTCDuration: item.NTCDuration,
      DayOfWeek: 0, //  with actual value
      NewDayOfWeek: 0, //  with actual value
      FPC_ID: item.FPC_ID,
      Sec_ID: 0,
      NTCLayer: item.NTCLayer,
      IsActive: 1,
      OffsetStartTime: item.OffsetStartTime,
    }));
    try {
      console.log('transformedData', transformedData);
      const resp = await PostNTCScheduling(transformedData, token);
      console.log(resp);
      console.log(resp.status);
      if (resp.status == 200) {
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
    discard2();
  };
  const openNotification2 = (type, m) => {
    toast.push(
      <Notification title={type} type={type}>
        {m}
      </Notification>,
    );
  };

  const cut = () => {
    setiscopy(false);
    let res = table1Data.filter((row, index) => selectedRows.includes(index));
    // console.log(selectedRows);
    setdraggedRows(res);
    setSelectedRowsCopy([...selectedRows]);
    // setTable1Data(table1Data.filter((row, index) => !selectedRows.includes(index)));
  };

  const getNTC = async (data) => {
    // alert('hh')
    {
      const datsa = await apiUSP_Sch_Promo_GetContaintDetails(
        data,
        convertDateToYMD(value),
        value2,
      );
      setNTCdata(datsa.data);
    }
  };
  const copy = () => {
    cut();
    setiscopy(true);
  };
  const paste = () => {
    const filteredTable1Data = draggedRows.filter(
      (row) => row.F_C_S_P === 'NTC',
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
      console.log(selectedRowsCopy);
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

  const handleDragEnd = (result) => {
    if (EventDataName != 'Drop Spot') {
      if (result.destination.droppableId == 'table2') {
        return;
      }
    }
    if (!result.destination) return;

    // console.log(result.source); console.log(result.destination); console.log(selectedRows);

    let draggedrow =
      result.source.droppableId == 'table2'
        ? table2Data[result.source.index]
        : table1Data[result.source.index];

    // console.log('draggedRows.F_C_S_P', draggedrow.F_C_S_P)
    if (draggedrow.F_C_S_P === 'S') {
      show('Segment cannot be dragged', 'warning');
      console.log('not dragg');
      return;
    }
    if (draggedrow.F_C_S_P === 'CT') {
      show('Content cannot be dragged', 'warning');
      console.log('not dragg');
      return;
    }
    if (draggedrow.F_C_S_P === 'C') {
      show('Cannot drag', 'warning');
      console.log('not dragg');
      return;
    }

    if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table2'
    ) {
      if (!selectedRows.length) {
        let draggedrow = table1Data[result.source.index];
        let clonedRow = { ...draggedrow };
        setTable1Data(table1Data.filter((row) => row !== draggedrow));

        let res1 = table2Data.slice(0, result.destination.index);
        let res2 = table2Data.slice(
          result.destination.index,
          table2Data.length,
        );

        const updatedTable2Data = [...res1, clonedRow, ...res2];
        setTable2Data(updatedTable2Data);
      } else {
        const draggedrows = table1Data.filter((row, index) =>
          selectedRows.includes(index),
        );
        setTable1Data(
          table1Data.filter((row, index) => !selectedRows.includes(index)),
        );

        let res1 = table2Data.slice(0, result.destination.index);
        let res2 = table2Data.slice(
          result.destination.index,
          table2Data.length,
        );

        setSelectedRows([]);
      }
    } else if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table1'
    ) {
      if (!selectedRows2.length) {
        let draggedRow = table2Data[result.source.index];
        let referencerow = table1Data[result.destination.index - 1];
        let clonedRow = FilldraggedRow(draggedRow, referencerow);

        let res1 = table1Data.slice(0, result.destination.index);
        let res2 = table1Data.slice(
          result.destination.index,
          table1Data.length,
        );
        const updatedTable1Data = [...res1, clonedRow, ...res2];

        let res = updateStartTimes(
          updatedTable1Data,
          isProgrambase,
          isComBrk,
          'NTC',
        );
        setTable1Data(res);
        // console.log(updatedTable1Data);
      } else {
        const draggedRows = table2Data.filter((row, index) =>
          selectedRows2.includes(index),
        );
        let referencerow = table1Data[result.destination.index - 1];
        let clonedRows = FilldraggedRow(draggedRows, referencerow);

        let res1 = table1Data.slice(0, result.destination.index);
        let res2 = table1Data.slice(
          result.destination.index,
          table1Data.length,
        );

        const updatedTable1Data = [...res1, ...clonedRows, ...res2];
        let res = updateStartTimes(
          updatedTable1Data,
          isProgrambase,
          isComBrk,
          'NTC',
        );
        setTable1Data(res);
        setSelectedRows2([]);
      }
    } else if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table1'
    ) {
      console.log('selectedRows', selectedRows);

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
        let clonedRows = FilldraggedRow(draggedRows, referencerow);

        const updttable1Data = table1Data.map((row, index) => {
          if (selectedRows.includes(index)) {
            return {
              ...row,
              F_C_S_P: copyNTC ? row.F_C_S_P : 'DELETE',
            };
          }
          return row;
        });

        console.log('updttable1Data', updttable1Data);

        let index = result.destination.index;
        console.log('index', index);
        let res1 = updttable1Data.slice(0, index + rowdownDiff);
        let res2 = updttable1Data.slice(
          index + rowdownDiff,
          updttable1Data.length,
        );
        const updatedTable1Data = [...res1, ...clonedRows, ...res2];

        const ActualTable1Data = updatedTable1Data.filter(
          (row) => row.F_C_S_P !== 'DELETE',
        );
        console.log(ActualTable1Data);
        let res = updateStartTimes(
          ActualTable1Data,
          isProgrambase,
          isComBrk,
          'NTC',
        );

        setTable1Data(res);
        setSelectedRows([]);
        return;
      } else {
        if (index1 > index2) {
          console.log('index1 > index2');
          let referencerow = table1Data[index2 - 1];
          let draggedRow2 = FilldraggedRow(draggedRow, referencerow);

          let temp = index1;

          index1 = index2;
          index2 = temp;

          let res1 = table1Data.slice(0, index1);
          let res2 = table1Data.slice(index1, index2);
          let res3 = table1Data.slice(index2 + 1, table1Data.length);

          updatedTable1Data = [...res1, draggedRow2, ...res2, ...res3];

          if (copyNTC) {
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

          updatedTable1Data = [...res1, ...res2, draggedRow2, ...res3];

          if (copyNTC) {
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

      let res = updateStartTimes(
        updatedTable1Data,
        isProgrambase,
        isComBrk,
        'NTC',
      );

      setTable1Data(res);
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
      let res = updateStartTimes(
        updatedTable2Data,
        isProgrambase,
        isComBrk,
        'NTC',
      );
      console.log('updatedTable2Data', updatedTable2Data);
      console.log('res', res);
      setTable2Data(updatedTable2Data);
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

  function NTCinsert() {
    let NTCs = selectedRows2.map((index) => table2Data[index]);
    // console.log('SelectedBrkNo',SelectedBrkNo)

    // let NTC=table2Data[selectedRows2[0]];
    let cnt = 1;
    let res = [...table1Data];
    table1Data.forEach((row, index) => {
      if (
        SelectedBrkNo.includes(Number(row.BreakNumber)) &&
        row.F_C_S_P !== 'NTC'
      ) {
        console.log(row.Start_Time);
        console.log(starttime);
        console.log(compareTimes(row.Start_Time, starttime));

        if (compareTimes(row.Start_Time, starttime) == 0) return;
        if (compareTimes(row.Start_Time, endtime) == 1) return;

        // console.log('index',index)
        // console.log('res[index]',table1Data[index])
        const updtNTCs = FilldraggedRow(NTCs, table1Data[index]);
        res.splice(index + cnt, 0, ...updtNTCs); // Insert NTC below the matching row
        cnt = cnt + NTCs.length;
      } else {
        // console.log('else index', index, row.BreakNumber, row.F_C_S_P)
      }
    });
    let restime = updateStartTimes(res, isProgrambase, isComBrk, 'NTC');
    setTable1Data(restime);
  }

  function NTCinsert2() {
    let NTCs = selectedRows2.map((index) => table2Data[index]);
    let index = selectedRows[0];
    let RefNTCs = table1Data[index];

    const updtNTCs = FilldraggedRow(NTCs, RefNTCs);

    let res1 = table1Data.slice(0, index + 1);

    let res2 = table1Data.slice(index + 1, table1Data.length);

    const updatedTable1Data = [...res1, ...updtNTCs, ...res2];
    setTable1Data(updatedTable1Data);
  }
  function replace() {
    let NTCs = selectedRows2.map((index) => table2Data[index]);
    let index = selectedRows[0];

    //let referencerow = table1Data[index];
    let referencerow = { ...table1Data[index] };

    if (referencerow.F_C_S_P !== 'NTC') {
      show('Please Select NTC.', 'warning');
      return;
    }

    referencerow.Event_Name = NTCs[0].Event_Name;
    referencerow.Duration = NTCs[0].Duration;
    referencerow.Tape_ID = NTCs[0].Tape_ID;
    referencerow.VideoID = NTCs[0].VideoID;

    let res1 = table1Data.slice(0, index);

    let res2 = table1Data.slice(index + 1, table1Data.length);

    const updatedTable1Data = [...res1, referencerow, ...res2];

    let res = updateStartTimes(
      updatedTable1Data,
      isProgrambase,
      isComBrk,
      'NTC',
    );
    setTable1Data(res);
    setReplacedialogIsOpen(false);
  }
  function findIndicesWithSameFPC_ID(array, fpcId) {
    const indices = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].FPC_ID === fpcId) {
        indices.push(i);
      }
    }
    return indices;
  }
  function removeNTC() {
    console.log('removeNTC');
    let remcheck = table1Data.filter(
      (row, index) => selectedRows.includes(index) && row.F_C_S_P !== 'NTC',
    );

    if (remcheck.length > 0) {
      show('Please Select only NTC.', 'warning');
      return;
    }

    let rem = table1Data.filter((row, index) => !selectedRows.includes(index));

    let res = updateStartTimes(rem, isProgrambase, isComBrk, 'NTC');
    setTable1Data(res);
    setRemovedialogIsOpen(false);
    setSelectedRows([]);
  }

  useEffect(() => {
    hideStackedSideNav();
    const gboxElement = document.getElementsByClassName('Gbox')[0];
    const gboxElement1 = document.getElementsByClassName('Gbox1')[0];
    if (gboxElement) {
      gboxElement.style.display = 'none';
      gboxElement1.style.display = 'none';
    } // Optionally, you might want to revert the change when the component unmounts
    return () => {
      if (gboxElement) {
        gboxElement.style.display = 'block';
        gboxElement1.style.display = 'block';
      }
    };
  }, []);

  useEffect(() => {
    const selectedItems = table1Data.filter(
      (item, index) => selectedRows.includes(index) && item.F_C_S_P === 'NTC',
    );

    const sumOfDuration = selectedItems.reduce((sum, item) => {
      return sum + parseDuration(item.Duration);
    }, 0);
    setselectedNTCDuration(formatDurationHHMMSSFF(sumOfDuration));

    console.log(
      'selectedItems Count',
      selectedItems.length,
      formatDurationHHMMSSFF(sumOfDuration),
    );

    const inputId = selectedRows[0];
    console.log('inputId', inputId);
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
    console.log('nearestAboveCTRow');
    console.log('nearestAboveCTRow', nearestAboveCTRow);
    console.log(nearestbelowCTRow);

    const NTCtotalDuration = sumDurations(
      table1Data,
      'NTC',
      table1Data.indexOf(nearestAboveCTRow),
      table1Data.indexOf(nearestbelowCTRow),
    );

    const SegmenttotalDuration = sumDurations(
      table1Data,
      'S',
      table1Data.indexOf(nearestAboveCTRow),
      table1Data.indexOf(nearestbelowCTRow),
    );
    const CommercialDuration = sumDurations(
      table1Data,
      'C',
      table1Data.indexOf(nearestAboveCTRow),
      table1Data.indexOf(nearestbelowCTRow),
    );

    setNTCtotalDuration(NTCtotalDuration);
    setSegmenttotalDuration(SegmenttotalDuration);
    setCommercialDuration(CommercialDuration);

    setselectedNTCs(selectedItems.length);
  }, [selectedRows]);

  useEffect(() => {
    // console.log('table1Data', table1Data)
    if (!undo && !redo) {
      cm2.current++;
      settable1dataversions([...table1dataversions, table1Data]);
      // table1dataversions.push(table1Data)
    } else if (cm2.current > 1) {
      if (undo) {
        setundo(false);
      }
      if (redo) {
        setredo(false);
      }
    }
    GetBreakwiseDuration(table1Data);
  }, [table1Data]);

  useEffect(() => {
    dispatch(setDatainN(table1Data));

    dispatch(settimestoreC(new Date().toLocaleString()));

    dispatch(setdatestoreC(value));
    console.log(table1Data);
  }, [table1Data]);

  useEffect(() => {
    // console.log('table2Data', table2Data)
  }, [table2Data]);

  useEffect(() => {
    // console.log('selectedCities', selectedCities)
    const res = cities.filter((city) => {
      return !Columnright.some(
        (selectedCity) => selectedCity.code === city.code,
      );
    });
    console.log(res);
    setColumnsExist(res);
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
    if (SettingCols == 'MainRightColums') {
      const newHeaders = [...ColumnsExist];
      newHeaders[index].header = newHeader;
      setColumnsExist(newHeaders);
    }
    if (SettingCols == 'MainLeftColums') {
      const newHeaders = [...ColumnsExistLeft];
      newHeaders[index].header = newHeader;
      setColumnsExistLeft(newHeaders);
    }
  };

  const Columns2 = () => {
    return (
      <div
        className="grid grid-cols-2 gap-4"
        style={{ background: 'transparent' }}
      >
        {SettingCols == 'MainRightColums' && (
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
                  let draggedRow = Columnright[index1];
                  let res1 = Columnright.slice(0, index1);
                  let res2 = Columnright.slice(index1 + 1, index2 + 1);
                  let res3 = Columnright.slice(index2 + 1, Columnright.length);
                  const updatedTable1Data = [
                    ...res1,
                    ...res2,
                    draggedRow,
                    ...res3,
                  ];
                  setColumnright(updatedTable1Data);
                }}
              >
                <Droppable droppableId="list1">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {Columnright.map((data, index) => (
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
                              style={provided.draggableProps.style}
                            >
                              <i
                                className="pi pi-bars mr-2"
                                onClick={() => {
                                  let res = Columnright.filter(
                                    (row) => row.name != data.name,
                                  );
                                  setColumnright(res);
                                }}
                              ></i>
                              <i
                                className="pi pi-minus-circle mr-2"
                                onClick={() => {
                                  let res = Columnright.filter(
                                    (row) => row.name != data.name,
                                  );
                                  setColumnright(res);
                                }}
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
            )}
          </Card>
        )}
        {SettingCols == 'MainRightColums' && (
          <Card header={<p style={{ fontSize: '16px' }}>Hidden</p>}>
            {ColumnsExist.map((data, index) => (
              <>
                {' '}
                <div key={index}>
                  <i
                    className="pi pi-plus-circle mr-2"
                    onClick={() => {
                      let res = ColumnsExist.filter(
                        (row) => row.name != data.name,
                      );
                      console.log(res);
                      console.log(data);
                      setColumnsExist(res);
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
                  <div style={{ marginBottom: '10px', marginTop: '10px' }}>
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
                    <Button
                      shape="circle"
                      variant="plain"
                      size="xs"
                      style={{ padding: '5px', marginTop: '3px' }}
                      onClick={() => {
                        const myString = valueheader;
                        const lengthOfString = myString.length;
                        console.log(myString);
                        console.log(lengthOfString);
                        if (valueheader.length > 0) {
                          handleHeaderUpdate(index, valueheader);
                          setSelectedItemIndex(null);
                        }
                      }}
                      icon={<CgCheck />}
                    />
                    &nbsp;
                    <Button
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
        {SettingCols == 'MainLeftColums' && (
          <Card header={<p style={{ fontSize: '16px' }}>Visible</p>}>
            {Columnleft != null && (
              <DragDropContext
                onDragEnd={(result) => {
                  console.log(result);

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
                <Droppable droppableId="list2">
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
                              <div style={{ width: 200 }}>
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
        {SettingCols == 'MainLeftColums' && (
          <Card header={<p style={{ fontSize: '16px' }}>Hidden</p>}>
            {ColumnsExistLeft.map((data, index) => (
              <>
                <div key={index}>
                  <i
                    className="pi pi-plus-circle mr-2"
                    onClick={() => {
                      let res = ColumnsExistLeft.filter(
                        (row) => row.name != data.name,
                      );
                      console.log(res);
                      console.log(data);
                      console.log(Columnleft.length);
                      if (Columnleft.length > 2) {
                        setColumnsExistLeft(res);
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
                  <div style={{ marginBottom: '10px', marginTop: '10px' }}>
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
                    <Button
                      shape="circle"
                      variant="plain"
                      size="xs"
                      style={{ padding: '5px', marginTop: '3px' }}
                      onClick={() => {
                        const myString = valueheader;
                        const lengthOfString = myString.length;
                        console.log(myString);
                        console.log(lengthOfString);
                        if (valueheader.length > 0) {
                          handleHeaderUpdate(index, valueheader);
                          setSelectedItemIndex(null);
                        }
                      }}
                      icon={<CgCheck />}
                    />
                    &nbsp;
                    <Button
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
  const [name, setname] = useState('TEST');
  const [value3, setValue3] = useState();
  const [auditValue, setauditValue] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelOpen1, setIsPanelOpen1] = useState(false);
  const [isPanelOpen2, setIsPanelOpen2] = useState(false);
  const [NTCTemplate, setNTCTemplate] = useState([]);
  useEffect(() => {
    Channelmaster();
    auditNTCscheduling(Channel, convertDateToYMD(value));
  }, []);
  const LoginId = useSelector((state) => state.auth.session.LoginId);

  useEffect(() => {
    (async () => {
      const resp = await apiautoshufflepromo();
      const mergedData = resp.data.map((option) => ({
        value: option.TemplateNo,
        label: option.TemplateNo,
      }));
      console.log('mergedData', mergedData);
      setNTCTemplate(mergedData);
    })();
  }, []);

  const Channelmaster = async () => {
    const Channelmaster = await apiGetNTCtypedropdown();
    const formattedOptions = Channelmaster.data.map((option) => ({
      value: option.NTCTypeCode,
      label: option.NTCTypeName,
    }));
    setoptions([...options, ...formattedOptions]);
  };

  const auditNTCscheduling = async (data1, data2) => {
    let param = {
      LocationCode: Channel.LocationCode,
      ChannelCode: Channel.ChannelCode,
      FormName: 'NTCScheduling',
      TelecastDate: data2,
    };
    const auditMaster = await apiGetRestoreDropDown(param);
    const formattedOptions = auditMaster.data.map((option) => ({
      value: option.D_date,
      label: option.D_date,
    }));
    setaudit([...formattedOptions]);
  };

  const shworpomo = () => {
    apiGetNTCScheduling2(value2, convertDateToYMD(value), value3, name)
      .then((response) => response.data)
      .then((data) => {
        if (!data) {
          return;
        }
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
        setcities1(columns);
        console.log(res);
        console.log(columns);
        setTable2DataCopy(data);
        const res1 = columns.filter((city) => {
          return !Columnleft.some(
            (selectedCity) => selectedCity.code === city.code,
          );
        });
        console.log(res);
        setColumnsExistLeft(res1);
      });
  };
  // console.log(value)

  const replaceall = () => {
    if (selectedRows.length > 1) {
      show('Please Select One NTC only.', 'warning');
      return;
    }

    if (selectedRows2.length > 1) {
      show('Please Select One NTC only.', 'warning');
      return;
    }

    let row1 = table1Data[selectedRows[0]];
    let row2 = table2Data[selectedRows2[0]];

    let res = table1Data.map((row) => {
      if (row.Event_Name === row1.Event_Name && row.F_C_S_P === 'NTC') {
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

    let uptime = updateStartTimes(res, isProgrambase, isComBrk, 'NTC');
    console.log(uptime);

    setTable1Data(uptime);
    setReplacedialogIsOpenAll(false);
  };

  const confirm1 = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: BreakNumbers,
      // icon: 'pi pi-pause',
      defaultFocus: 'accept',
      accept: NTCinsert,
      reject,
    });
  };

  const reject = () => {
    show('You have rejected', 'warning');
  };

  const [message, setMessage] = useTimeOutMessage();
  const [log, setlog] = useState('');
  const Addcolumnsetting = async () => {
    const mergedData = Columnright.map((item, index) => ({
      ScreenName: 'NTC',
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
      setMessage('Please Select Aleast 5 Columns');
    }
  };
  const Addcolumnsetting2 = async () => {
    const mergedData = Columnleft.map((item, index) => ({
      ScreenName: 'NTCLeft',
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
      setMessage('Please Select Aleast 2 Columns');
    }
  };

  const [OffsetStartTime, setOffsetStartTime] = useState('');

  const HeaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex justify-between">
          <span className="font-bold">NTC Search</span>

          <div className="flex ">
            {selectedRows2 && selectedRows2.length > 0 && (
              <Tooltip placement="top" title="Columns Setting">
                <span
                  style={{
                    fontSize: 20,
                    marginRight: '10px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setAutoSchdulevisible(true);
                    setSettingCols('MainLeftColums');
                  }}
                >
                  <HiOutlineCog />
                </span>
              </Tooltip>
            )}
            <Button
              icon={<HiOutlineX />}
              size="xs"
              style={{
                marginTop: -5,
              }}
              onClick={() => setEventDataName(' ')}
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
            <span className="mt-1 mr-1">
              <Badge value={table3Data.length} severity="success"></Badge>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const FooterTemplate = (options) => {
    const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;

    return (
      <div className={className}>
        <div className="flex items-center gap-2 p-1">
          <Tooltip placement="top" title="Insert NTC">
            <button
              onClick={NTCinsert2}
              className="p-panel-header-icon p-link mr-2 lbl "
            >
              <span className="lbl pi pi-caret-left text-xl"></span>
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Bulk Insert">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              onClick={confirm1}
            >
              <span className="lbl pi pi-backward text-xl"></span>
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Replace">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              onClick={() => {
                setReplacedialogIsOpen(true);
                if (selectedRows.length > 1) {
                  show('Please Select One NTC only.', 'warning');
                  return;
                }

                if (selectedRows2.length > 1) {
                  show('Please Select One NTC only.', 'warning');
                  return;
                }
              }}
            >
              <span className="lbl pi pi-file text-xl"></span>
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Replace All">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              onClick={() => setReplacedialogIsOpenAll(true)}
            >
              <span className="lbl pi pi-clone text-xl"></span>
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Delete Selected NTCs">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              // onClick={removeNTC}
              onClick={() => setRemovedialogIsOpen(true)}
            >
              <span className="lbl pi pi-trash text-xl"></span>
            </button>
          </Tooltip>
          <Tooltip placement="top" title="Delete All NTC">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              onClick={() => setRemovedialogIsOpenAll(true)}
            >
              <span className="lbl pi pi-minus-circle text-xl"></span>
            </button>
          </Tooltip>
        </div>
      </div>
    );
  };

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
          Do you want to include NTC's during these breaks?
        </div>
        <Checkbox.Group
          value={breaknumbers}
          onChange={(options) => {
            console.log('options', options);
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
  // console.log('fpcTimes', fpcTimes)
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

  const openNotification = (type) => {
    toast.push(
      <Notification title="Api Hit" type={type}>
        Timer End Api Hit
      </Notification>,
    );
  };

  const deleteallNTCs = () => {
    // console.log(table1Data);
    let res = [...table1Data];
    let filtereddata = res.filter((row) => row.F_C_S_P !== 'NTC');
    setTable1Data(filtereddata);
    setRemovedialogIsOpenAll(false);
  };
  console.log(table1Data);

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

  let maxWidth = `${!InsertNTC ? '100%' : '80%'}`;
  return (
    <>
      {!ShowGraph ? (
        <>
          {message && (
            <Alert className="mb-4" type={log} showIcon>
              {message}
            </Alert>
          )}
          {Channel.AutoSave ? (
            <Tooltip placement="top" title="Auto Save">
              {' '}
              <Clock
                Progress={Progress}
                NTCSchdulingSave={NTCSchdulingSave}
                openNotification={openNotification}
              />{' '}
            </Tooltip>
          ) : null}
          <div>
            <div className="flex justify-between ">
              {isdisplaysetting && (
                <div className="flex justify-start">
                  <Tooltip placement="top" title="Columns Setting">
                    <span
                      style={{
                        fontSize: 25,
                        marginTop: '5px',
                        marginRight: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setAutoSchdulevisible(true);
                        setSettingCols('MainRightColums');
                      }}
                    >
                      <HiOutlineCog />
                    </span>
                  </Tooltip>
                </div>
              )}
              <div className="flex justify-end">
                {isdisplaysetting && (
                  <div className="flex justify-end gap-2">
                    <div className="flex justify-justify-end gap-2">
                      <div className="flex justify-end">
                        {fpcTimes2.map((item, key) => (
                          <Button
                            size="xs"
                            className="ml-1 fpctimebtn"
                            key={key}
                            onClick={() => {
                              console.log('fpctimebtn', item.columnIndex);
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
                              backgroundColor: adjustColorBrightness(
                                '#b3ffec',
                                1 - item.totalDuration / 1000,
                              ),
                              color: 'black',
                            }}
                          >
                            {item.FPC_Time}
                          </Button>
                        ))}
                      </div>

                      <div className="flex justify-end gap-1">
                        <Tooltip placement="top" title="Undo">
                          <Button
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
                          <Tooltip placement="top" title="Redo">
                            <Button
                              shape="circle"
                              size="sm"
                              variant="twoTone"
                              onClick={() => {
                                let nextversion =
                                  table1dataversions[cm2.current];
                                setredo(true);
                                cm2.current++;
                                setTable1Data(nextversion);
                              }}
                              icon={<CgRedo />}
                            />
                          </Tooltip>
                        )}

                        <Tooltip placement="top" title="Hide">
                          <Button
                            shape="circle"
                            size="sm"
                            variant="twoTone"
                            onClick={() => setInsertNTC(!InsertNTC)}
                            icon={InsertNTC ? <CgLogIn /> : <CgLogOut />}
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
            <div className={!InsertNTC ? 'flex-full-width' : 'flex gap-1'}>
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
                <ScrollBar>
                  <Droppable droppableId="table1">
                    {(provided) =>
                      Columnright != null && (
                        <Table
                          ref={combineRefs(
                            provided.innerRef,
                            tableContainerRef,
                          )}
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
                                </>
                              ))}
                            </Tr>
                          </THead>

                          <TBody
                            {...provided.droppableProps}
                            className="tbodye"
                          >
                            {table1Data.map((data, index) => (
                              <>
                                <Draggable
                                  key={data.id}
                                  draggableId={`row-${index}`}
                                  index={index}
                                >
                                  {(provided) => (
                                    // (isComBrk || data.F_C_S_P !== 'C') && (
                                    <Tr
                                      ref={combineRefs(
                                        provided.innerRef,
                                        tableContainerRef,
                                      )}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      // className={`draggble-row row-${data.Id}`}
                                      className={`draggble-row row-${data.Id} ${!isComBrk && data.F_C_S_P === 'C'
                                        ? 'Rowhidden'
                                        : ''
                                        }`}
                                      onClick={(e) => {
                                        const SelectedFPC = table1Data.filter(
                                          (row) => row.FPC_ID == data.FPC_ID,
                                        );
                                        console.log(
                                          'filteredData',
                                          SelectedFPC,
                                        );
                                        setSelectedFPC(SelectedFPC);

                                        getNTC(data);
                                        if (e.ctrlKey) {
                                          setSelectedRows(
                                            (prevSelectedRows) => {
                                              if (
                                                prevSelectedRows.includes(index)
                                              ) {
                                                return prevSelectedRows.filter(
                                                  (row) => row !== index,
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
                                        } else {
                                          setSelectedRows([index]);
                                        }
                                      }}
                                      onContextMenu={(e) => {
                                        cm.current.show(e);
                                        settobepastedrow(index);
                                      }}
                                    >
                                      {Columnright.map((city) => (
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
                                                  data.EventDefaultBackColor,
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
                                            {data[city.name]}
                                            {data['FPC_Time'].length === 0 &&
                                              city.name === 'FPC_Time' &&
                                              data['F_C_S_P'] === 'NTC' &&
                                              selectedRows.includes(index) && (
                                                <div className="flex gap-2">
                                                  <button
                                                    onClick={() =>
                                                      handleRowDeleteButtonClick(
                                                        index,
                                                      )
                                                    }
                                                  >
                                                    <span className="  pi pi-trash text-base"></span>
                                                  </button>
                                                  <button
                                                    onClick={() =>
                                                      handleRowFilterButtonClick(
                                                        index,
                                                      )
                                                    }
                                                  >
                                                    <span className="  pi pi-info-circle text-base"></span>
                                                  </button>
                                                </div>
                                              )}
                                          </div>
                                        </Td>
                                      ))}
                                    </Tr>
                                    // )
                                  )}
                                </Draggable>
                              </>
                            ))}
                            {provided.placeholder}
                          </TBody>
                        </Table>
                      )
                    }
                  </Droppable>
                </ScrollBar>
              </div>

              {InsertNTC ? (
                <div className="card">
                  <Card>
                    <div className=" ml-2 mb-2 grid grid-cols-5 gap-2">
                      <Tooltip placement="top" title="Menu">
                        <Button
                          className="text-lg"
                          size="sm"
                          variant={isdisplaysetting ? 'solid' : 'twoTone'}
                          icon={
                            isdisplaysetting ? <BsViewList /> : <BsViewList />
                          }
                          onClick={() => {
                            setisdisplaysetting(!isdisplaysetting);
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Export">
                        <Button
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
                              'NTC log',
                              newArray,
                              true,
                            );
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Restore">
                        <Button
                          className="text-lg"
                          size="sm"
                          variant={'twoTone'}
                          icon={<HiOutlineRefresh />}
                          onClick={() => {
                            openDialog();
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Filter">
                        <Button
                          className="text-lg"
                          size="sm"
                          variant={DisplayFilter ? 'solid' : 'twoTone'}
                          icon={
                            DisplayFilter ? <HiFilter /> : <HiOutlineFilter />
                          }
                          onClick={() => {
                            setDisplayFilter(!DisplayFilter);
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Copy NTC">
                        <Button
                          className="text-lg"
                          size="sm"
                          variant={copyNTC ? 'solid' : 'twoTone'}
                          icon={copyNTC ? <FaCopy /> : <FaRegCopy />}
                          onClick={() => {
                            setCopyNTC(!copyNTC);
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Show Graph">
                        <Button
                          className="text-lg"
                          size="sm"
                          variant="twoTone"
                          icon={<VscGraphLine />}
                          onClick={() => {
                            if (SelectedFPC.length == 0) {
                              openNotification2(
                                'warning',
                                'Please Select Content',
                              );
                            } else {
                              setShowGraph(true);
                            }
                          }}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="Rotation Info">
                        <Button
                          size="sm"
                          className="text-lg"
                          variant="twoTone"
                          icon={<GrRotateLeft />}
                          onClick={() => {
                            setEventDataName('Rotation Info');
                            all();
                          }}
                        />
                      </Tooltip>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {options.map((item, index) => (
                        <Button
                          key={index}
                          className="text-lg"
                          size="xs"
                          variant="twoTone"
                          color={Object.values(eventColorsAg)[index]?.button}
                          icon={icons[index % icons.length]} // Use modulo to loop through icons
                          onClick={() => {
                            setEventDataName('Event Search');
                            setSelectedEventType(item.value);
                            setValue3(1);
                            setname('');

                            shworpomo2(item.value, '0000');
                            setDisplay(true);
                          }}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </Card>
                  {(() => {
                    switch (EventDataName) {
                      case 'Event Search':
                        return (
                          <Card
                            header={<HeaderTemplate />}
                            footer={<FooterTemplate />}
                          >
                            <Input
                              placeholder="Offset Start Time"
                              value={OffsetStartTime}
                              maxLength="12"
                              size="sm"
                              style={{ marginTop: '0.5px' }}
                              className="mb-1"
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
                                      parseInt(formattedValue.split(':')[1]) >
                                      59
                                    ) {
                                      formattedValue = `${formattedValue.split(':')[0]
                                        }:59`;
                                    }
                                  } else if (
                                    formattedValue.split(':').length === 3
                                  ) {
                                    // Seconds
                                    if (
                                      parseInt(formattedValue.split(':')[2]) >
                                      59
                                    ) {
                                      formattedValue = `${formattedValue.split(':')[0]
                                        }:${formattedValue.split(':')[1]}:59`;
                                    }
                                  } else if (
                                    formattedValue.split(':').length === 4
                                  ) {
                                    // Frames
                                    if (
                                      parseInt(formattedValue.split(':')[3]) >
                                      23
                                    ) {
                                      formattedValue = `${formattedValue.split(':')[0]
                                        }:${formattedValue.split(':')[1]}:${formattedValue.split(':')[2]
                                        }:23`;
                                    }
                                  }
                                }
                                setOffsetStartTime(formattedValue);
                                if (formattedValue.length == 11) {
                                  const updatedArray = table2Data.map((obj) => {
                                    // Modify the OffsetStartTime property as needed
                                    obj.OffsetStartTime = formattedValue; // For example, set it to "01:00:00:00"
                                    return obj;
                                  });
                                  setTable2Data(updatedArray);
                                }
                              }}
                            />
                            <br />

                            {Display ? (
                              <InputGroup className="mb-4">
                                {/* <div className="mr-1" style={{ minWidth: 110 }}>
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
                                </div> */}
                                <Input
                                  placeholder="Event Caption\Video ID"
                                  size="sm"
                                  style={{ height: '38px', width: '100%' }}
                                  onChange={(e) => {
                                    setname(e.target.value);
                                  }}
                                  value={name}
                                />
                                <Button
                                  icon={<CgSearch />}
                                  onClick={() => shworpomo()}
                                />
                              </InputGroup>
                            ) : null}

                            <ConfirmPopup />
                            <div style={{ width: 'auto' }}>
                              <div
                                style={{
                                  height: '300px',
                                  overflow: 'auto',
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
                                                  table2DataCopy={
                                                    table2DataCopy
                                                  }
                                                  filterOptions={filterOptions}
                                                  columnFilters={columnFilters}
                                                  setColumnFilters={
                                                    setColumnFilters
                                                  }
                                                  IsSortingAllow={true}
                                                  selectedCities={Columnleft}
                                                  setSelectedCities={
                                                    setColumnleft
                                                  }
                                                  ColIndex={index}
                                                  ColumnInfo={city}
                                                  DisplayFilter={DisplayFilter}
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
                                                    className={`backcolor rowINeed-${data.SequenceNo
                                                      } draggble-row row-${data.Id
                                                      } ${false &&
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
                                                        setSelectedRows2(
                                                          indices,
                                                        );
                                                        return;
                                                      }
                                                      // return
                                                      // setSelectedRows2(indices)
                                                      if (e.ctrlKey) {
                                                        setSelectedRows2(
                                                          (
                                                            prevSelectedRows,
                                                          ) => {
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
                                                        if (
                                                          selectedRows2.length
                                                        ) {
                                                          setSelectedRows2(
                                                            (
                                                              prevSelectedRows,
                                                            ) => {
                                                              // Check if the row is already selected
                                                              if (
                                                                prevSelectedRows.includes(
                                                                  index,
                                                                )
                                                              ) {
                                                                // If selected, remove it
                                                                return prevSelectedRows.filter(
                                                                  (row) =>
                                                                    row !==
                                                                    index,
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
                                                        setSelectedRows2([
                                                          index,
                                                        ]);
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
                                                              width:
                                                                data.width,
                                                            }),
                                                        }}
                                                      >
                                                        {' '}
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
                      case 'Rotation Info':
                        return (
                          <Card header={<FilterheaderTemplate />}>
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
                                              const div1 =
                                                document.getElementById('div1');
                                              let targetElement =
                                                div1.querySelector(
                                                  `.row-${row.columnIndex}`,
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
                                                ...(selectedRows2.includes(
                                                  index,
                                                )
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
                                                ...(selectedRows2.includes(
                                                  index,
                                                )
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
                                                ...(selectedRows2.includes(
                                                  index,
                                                )
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
            className="-mx-8 px-8 flex items-center justify-between py-4 pt-2 pb-2"
            stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="md:flex items-center">
              <Button
                type="button"
                onClick={discard}
                className="mr-2"
                variant=""
                size="sm"
                icon={<HiBackspace />}
              >
                Back
              </Button>
              &nbsp;
              <Button
                onClick={NTCSchdulingSave}
                variant="solid"
                type="submit"
                disabled={
                  convertDateFormatyyyyMMdd(value) <
                  format(new Date(), 'yyyy-MM-dd')
                }
                size="sm"
                icon={<AiOutlineSave />}
              >
                Save
              </Button>
              {convertDateFormatyyyyMMdd(value) <
                format(new Date(), 'yyyy-MM-dd') && (
                  <p className="ml-2 text-red-500">
                    Backdated NTCs are non-editable
                  </p>
                )}
            </div>
          </StickyFooter>
          <Dialog
            width={800}
            height={500}
            isOpen={AutoSchdulevisible}
            onClose={() => setAutoSchdulevisible(false)}
            onRequestClose={() => setAutoSchdulevisible(false)}
          >
            <h5 className="mb-4">Columns Setting</h5>
            <Columns2 />

            <div className="mt-5">
              <Button
                size="sm"
                icon={<CgClose />}
                onClick={() => setAutoSchdulevisible(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                icon={<CgCheck style={{ marginTop: '2px' }} />}
                onClick={() => {
                  setAutoSchdulevisible(false);
                  if (SettingCols == 'MainRightColums') {
                    Addcolumnsetting();
                  }
                  if (SettingCols == 'MainLeftColums') {
                    Addcolumnsetting2();
                  }
                }}
                autoFocus
                size="sm"
              >
                Save&nbsp;&nbsp;
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={dialogIsOpen}
            onClose={() => setIsOpen(false)}
            onRequestClose={() => setIsOpen(false)}
          >
            <h5 className="mb-4">Restore Previous Version </h5>
            <Select
              placeholder="Please Select"
              options={audit}
              onChange={(e) => setauditValue(e)}
            ></Select>

            <div className="text-right mt-6">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="solid" onClick={RestorePreviousVersion}>
                Ok
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={RemovedialogIsOpen}
            style={{
              content: {
                marginTop: 250,
              },
            }}
            contentClassName="pb-0 px-0"
            onClose={() => setRemovedialogIsOpen(false)}
            onRequestClose={() => setRemovedialogIsOpen(false)}
          >
            <div className="px-6 pb-6">
              <h5 className="mb-4">Remove NTC</h5>
              <h6 className="mb-4">
                <ArrayDisplay array={selectedRows} />
              </h6>
            </div>

            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                onClick={() => setRemovedialogIsOpen(false)}
              >
                Cancel
              </Button>

              <Button variant="solid" onClick={() => removeNTC()}>
                Okay
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={RemovedialogIsOpenAll}
            style={{
              content: {
                marginTop: 250,
              },
            }}
            contentClassName="pb-0 px-0"
            onClose={() => setRemovedialogIsOpenAll(false)}
            onRequestClose={() => setRemovedialogIsOpenAll(false)}
          >
            <div className="px-6 pb-6">
              <h5 className="mb-4">Remove NTC</h5>
              <h6 className="mb-4">Do you want to remove all 'NTC'?</h6>
            </div>

            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                onClick={() => setRemovedialogIsOpenAll(false)}
              >
                Cancel
              </Button>

              <Button variant="solid" onClick={() => deleteallNTCs()}>
                Okay
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={ReplacedialogIsOpenAll}
            style={{
              content: {
                marginTop: 250,
              },
            }}
            contentClassName="pb-0 px-0"
            onClose={() => setReplacedialogIsOpenAll(false)}
            onRequestClose={() => setReplacedialogIsOpenAll(false)}
          >
            <div className="px-6 pb-6">
              <h5 className="mb-4">Replace NTC</h5>
              <h6 className="mb-4">
                Do you want to replace all '
                {table1Data[selectedRows]?.Event_Name}' with '
                {table2Data[selectedRows2]?.Event_Name}'?
              </h6>
            </div>

            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                onClick={() => setReplacedialogIsOpenAll(false)}
              >
                Cancel
              </Button>

              <Button variant="solid" onClick={() => replaceall()}>
                Okay
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={ReplacedialogIsOpen}
            style={{
              content: {
                marginTop: 250,
              },
            }}
            contentClassName="pb-0 px-0"
            onClose={() => setReplacedialogIsOpen(false)}
            onRequestClose={() => setReplacedialogIsOpen(false)}
          >
            <div className="px-6 pb-6">
              <h5 className="mb-4">Replace NTC</h5>
              <h6 className="mb-4">
                Do you want to replace '{table1Data[selectedRows]?.Event_Name}'
                with '{table2Data[selectedRows2]?.Event_Name}'?
              </h6>
            </div>

            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                onClick={() => setReplacedialogIsOpen(false)}
              >
                Cancel
              </Button>

              <Button variant="solid" onClick={() => replace()}>
                Okay
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={isOpenAutoShuffle}
            onClose={() => setIsOpenAutoShuffle(false)}
            onRequestClose={() => setIsOpenAutoShuffle(false)}
          >
            <h5 className="mb-4">Smart Shuffle</h5>
            <Select
              placeholder="Please Select"
              options={NTCTemplate}
              onChange={(e) => setAutoShuffleID(e.value)}
            ></Select>
            <div className="text-right mt-6">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                variant="plain"
                onClick={() => setIsOpenAutoShuffle(false)}
              >
                Cancel
              </Button>
              <Button variant="solid" onClick={FunctionSmartShuffle}>
                Ok
              </Button>
            </div>
          </Dialog>
        </>
      ) : (
        <div>
          <NTC_Graph
            JSONData={SelectedFPC}
            setSelectedFPC={setSelectedFPC}
            FPCData={table1Data}
          />
          <Button onClick={() => setShowGraph(false)}>Back</Button>
        </div>
      )}
    </>
  );
};

export default NTCSchedulingPage;

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
