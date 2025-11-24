import React from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  Table,
  Card,
  Button as ButtonE,
  Input,
  Select,
  Tooltip,
  ScrollBar,
  TimeInput,
  Progress,
  Dialog as Dial,
  Alert,
  Avatar,
} from 'components/ui';
import { useState, useEffect, useRef } from 'react';
import { convertDateToYMD } from 'components/validators';
import {
  PostSongscheduling,
  Postcolumnsetting,
  apiGetRestoreDropDown,
  apiGetRestoreScheduling,
  apiGetSongScheduling2,
  apiGetSongschedulDetails,
} from 'services/SchedulingService';
import { Toast } from 'primereact/toast';
import {
  updateStartTimes,
  FilldraggedRow,
  Clock,
  hideStackedSideNav_secondary,
} from '../general';
import '../style.css';
import './styles.css';
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
import { Dialog } from 'primereact/dialog';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { ContextMenu } from 'primereact/contextmenu';
import { apiGetSongcategoryDrop } from 'services/MasterService';
import {
  addTimeDurations,
  convertDateFormatyyyyMMdd,
  FORMATDATE_FOR_EVERY,
  formatDurationHHMMSSFF,
  millisecondsToTime,
  openNotification,
  parseDuration,
  timeToMilliseconds,
} from 'views/Controls/GLOBALFUNACTION';
import FilterColumn from '../FilterColumn';
import { Badge } from 'primereact/badge';
import { FaCopy, FaMusic, FaRegCopy, FaStopwatch } from 'react-icons/fa';
import {
  setDatainS,
  setdatestoreS,
  settimestoreS,
} from 'store/auth/scheduling';

import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { setdateForm } from 'store/locale/localeSlice';
import { GetBreakwiseDuration } from '../FinalLog/Cols';
import BreakwiseSong from 'views/Controls/BreakwiseSong';
import classNames from 'classnames';
import { AiOutlineSave } from 'react-icons/ai';
import { BsViewList } from 'react-icons/bs';
import Loader from 'views/Controls/Loader';
import { format } from 'date-fns';
import { TbMusicOff } from 'react-icons/tb';
const { Tr, Th, Td, THead, TBody } = Table;

var SelectedBrkNo = [];

// Function to filter data for Today, Tomorrow, Yesterday, and Day Before Yesterday
const filterDataByDate = (data) => {
  return data.map((dayData) => {
    const date = Object.keys(dayData)[0]; // Get the date
    const labelIndex = date;
    const label = FORMATDATE_FOR_EVERY(new Date(date)); // Use special labels or fallback to the date itself

    return { date, hoursData: dayData[date], label, labelIndex }; // Add label for rendering
  });
};
const ScrollOnId = (value) => {
  const SongschedulDetailsDiv = document.getElementById('SongschedulDetails');
  let targetElement = SongschedulDetailsDiv.querySelector(
    `.SongschedulDetails-${convertDateToYMD(value)}`,
  );
  if (targetElement == null) return;
  targetElement.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

const SongSchedulingPage = ({
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
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [nonselectedCities, setnonSelectedCities] = useState([]);
  const [nonselectedCities1, setnonSelectedCities1] = useState([]);
  const [cities1, setcities1] = useState([]);
  const [SongschedulDetails, setSongschedulDetails] = useState([]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dayBeforeYesterday = new Date(today);
  dayBeforeYesterday.setDate(today.getDate() - 2);

  useEffect(() => {
    dispatch(setdateForm([value, 'Song Scheduling']));
    setheadername('');
    return () => {
      setheadername('Song Scheduling');
    };
  }, []);
  const [undo, setundo] = useState(false);
  const [redo, setredo] = useState(false);
  const [table2DataCopy, setTable2DataCopy] = useState(false);
  const [table1DataCopy, setTable1DataCopy] = useState([...table1Data]);
  const [selectedPromos, setselectedPromos] = useState(null);
  const [selectedPromoDuration, setselectedPromoDuration] = useState(null);
  const [isProgrambase, setIsProgrambase] = useState(true);
  const [isSongschedulDetails, setisSongschedulDetails] = useState(false);
  const [isComBrk, setIsComBrk] = useState(false);
  const [SlotDuration, setSlotDuration] = useState('');

  const [Display, setDisplay] = useState(true);
  const [DisplayS, setDisplayS] = useState(false);
  const [DisplayFilter, setDisplayFilter] = useState(false);
  const [EventDataName, setEventDataName] = useState('');
  function findIndicesWithSameFPC_ID(array, fpcId) {
    const indices = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].FPC_ID === fpcId) {
        indices.push(i);
      }
    }
    return indices;
  }

  const [by, setby] = useState();
  // console.log(by);
  const [columnFilters, setColumnFilters] = useState([
    {
      columnName: '',
      filterValue: '',
      filterOption: 'contains',
    },
  ]);

  const toast = useRef(null);

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
    openNotification(type, message);
  };
  const handleRowDeleteButtonClick = () => {
    removepromo();
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
  const [DialIsOpen, setDialIsOpen] = useState(false);

  const openDialog = () => {
    auditpromoscheduling(Channel, convertDateToYMD(value));
    setIsOpen(true);
  };

  const onDialogClose = (e) => {
    // console.log('onDialogClose', e)
    setIsOpen(false);
  };

  const onDialogOk = async (e) => {
    setShowLoader(true);
    try {
      // console.log(transformedData)
      let param = {
        LocationCode: Channel.LocationCode,
        ChannelCode: Channel.ChannelCode,
        FormName: 'SongScheduling',
        TelecastDate: convertDateToYMD(value),
        D_date: auditValue.value,
      };

      const resp = await apiGetRestoreScheduling(param);

      if (resp.status == 200) {
        onCellSelect(evendata, false);
        openNotification('success', 'Data Saved Successfully.');
        setShowLoader(false);
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        setShowLoader(false);
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        setShowLoader(false);
      }
    }
    setShowLoader(false);
    setIsOpen(false);
  };

  const [table1dataversions, settable1dataversions] = useState([]);
  const [Insertpromo, setInsertpromo] = useState(true);
  const [copypromo, setCopypromo] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [selectedRowsCopy, setSelectedRowsCopy] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tobepastedrow, settobepastedrow] = useState(null);
  const [draggedRows, setdraggedRows] = useState([]);
  const [iscopy, setiscopy] = useState(false);
  const [isdisplaysetting, setisdisplaysetting] = useState(false);
  const [AutoSchdulevisible, setAutoSchdulevisible] = useState(false);
  const [BreakwiseData, setBreakwiseData] = useState([]);
  const [PromototalDuration, setPromototalDuration] = useState(false);
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
        removepromo();
      },
    },
  ];

  const all = () => {
    // console.log('table1Data', table1Data);

    let Event_Name = table1Data[selectedRows[0]]['Event_Name'];
    let res = table1Data.filter(
      (row, index) => row.Event_Name == Event_Name,
      // selectedRows.includes(index)
    );
    setTable3Data([...res]);
    setActiveIndex(1);
  };
  const getClassName = (value) => {
    if (value === 0) return 'SelectedSongRow '; // light red for zero
    if (value >= 3) return 'SelectedSongRow red'; // red for 3 or more
    if (value >= 1 && value < 3) return 'SelectedSongRow orange'; // orange for 1-2
    return 'SelectedSongRow'; // default class
  };
  const SongSchdulingSave = async () => {
    setShowLoader(true);
    console.log('table1Data', table1Data);
    const filteredData = table1Data
      .map((item, index) => ({ Position: index + 1, ...item }))
      .filter((item) => item.F_C_S_P == 'SG');

    const transformedData = filteredData.map((item) => ({
      LocationCode: value2.LocationCode,
      ChannelCode: value2.ChannelCode,
      TelecastDate: convertDateToYMD(value),
      NewTelecastDate: convertDateToYMD(value),
      TelecastTime: item.Start_Time, // Replace with actual value
      PromoCode: item.PromoCode,
      ContentCode: item.ContentCode,
      BreakNumber: Number(item.BreakNumber),
      SeasonNo: item.SeasonNo,
      EpisodeNo: item.Ep_No,
      Position: item.Position,
      SongTypeCode: Number(item.SongTypeCode),
      ActualTelecastTime: item.Start_Time, // Replace with actual value
      DayOfWeek: 0, // Replace with actual value
      NewDayOfWeek: 0, // Replace with actual value
      FPC_ID: item.FPC_ID,
      IsActive: 1,
      SongCode: item.SongCode,
      SongCategoryCode: Number(item.SongCategoryCode),
    }));

    try {
      console.log(transformedData);
      const resp = await PostSongscheduling(transformedData, token);
      // console.log(resp);
      // console.log(resp.status);
      if (resp.status == 200) {
        openNotification('success', 'Data Saved Successfully.');
        setShowLoader(false);
      }
      if (resp.status === 204) {
        openNotification('danger', 'Data Already Exists.');
        setShowLoader(false);
        return;
      }
    } catch (errors) {
      if (errors.response.status == 500) {
        openNotification('danger', 'Server Error.');
        setShowLoader(false);
      }
    }
    discard2();
    setShowLoader(false);
  };

  //Comman Function Start

  // Comm Fun End

  const cut = () => {
    setiscopy(false);
    let res = table1Data.filter((row, index) => selectedRows.includes(index));

    setdraggedRows(res);
    setSelectedRowsCopy([...selectedRows]);
  };

  const copy = () => {
    cut();
    setiscopy(true);
  };
  useEffect(() => {
    hideStackedSideNav_secondary();
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
  const paste = () => {
    const filteredTable1Data = draggedRows.filter(
      (row) => row.F_C_S_P === 'SG',
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
      // console.log(selectedRowsCopy);
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

  const paste2 = () => {
    let tobepastedrow2 = 0;
    let res1 = table1Data.slice(0, tobepastedrow2);
    let res2 = table1Data.slice(tobepastedrow2, table1Data.length);
    const updatedTable1Data = [...res1, ...draggedRows, ...res2];
    setTable1Data(updatedTable1Data);
    setSelectedRows2([]);
  };

  function sumDurations(data, eventtype, startindex, endindex) {
    let totalDuration = 0;

    const filterdata = data.slice(startindex, endindex);
    // console.log('filterdata', filterdata);

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
      // console.log('not dragg');
      return;
    }
    if (draggedrow.F_C_S_P === 'CT') {
      show('Content cannot be dragged', 'warning');
      // console.log('not dragg');
      return;
    }
    if (draggedrow.F_C_S_P === 'C') {
      show('Cannot dragged', 'warning');
      // console.log('not dragg');
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
        const updatedTable2Data = [...res1, ...draggedrows, ...res2];

        setSelectedRows([]);
      }
    } else if (
      result.source.droppableId === 'table2' &&
      result.destination.droppableId == 'table1'
    ) {
      console.log('referencerow', result.destination.index);
      if (!selectedRows2.length) {
        let draggedRow = table2Data[result.source.index];
        let referencerow = table1Data[result.destination.index - 1];
        let clonedRow = { ...draggedRow };

        // console.log(clonedRow);
        clonedRow.SeasonNo = referencerow.SeasonNo;
        clonedRow.Ep_No = referencerow.Ep_No;

        clonedRow.ContentCode = referencerow.ContentCode;
        clonedRow.BreakNumber = referencerow.BreakNumber;
        clonedRow.Ep_No = referencerow.Ep_No;
        clonedRow.SeasonNo = referencerow.SeasonNo;
        clonedRow.FPC_ID = referencerow.FPC_ID;
        clonedRow.Start_Time = '00:00:00:00';

        // setTable2Data(table2Data.filter((row) => row !== draggedRow))

        let res1 = table1Data.slice(0, result.destination.index);
        let res2 = table1Data.slice(
          result.destination.index,
          table1Data.length,
        );
        const updatedTable1Data = [...res1, clonedRow, ...res2];

        let res = updateStartTimes(updatedTable1Data, isProgrambase, isComBrk);
        setTable1Data(res);
        BackToBack(res);
        // console.log(updatedTable1Data);
      } else {
        const draggedRows = table2Data.filter((row, index) =>
          selectedRows2.includes(index),
        );
        let referencerow = table1Data[result.destination.index - 1];
        let clonedRows = draggedRows.map((row) => {
          let clonedRow = { ...row };

          clonedRow.SeasonNo = referencerow.SeasonNo;
          clonedRow.Ep_No = referencerow.Ep_No;
          clonedRow.ContentCode = referencerow.ContentCode;
          clonedRow.BreakNumber = referencerow.BreakNumber;
          clonedRow.Ep_No = referencerow.Ep_No;
          clonedRow.SeasonNo = referencerow.SeasonNo;
          clonedRow.FPC_ID = referencerow.FPC_ID;
          clonedRow.Start_Time = '00:00:00:00';

          return clonedRow;
        });

        // setTable2Data(
        //     table2Data.filter(
        //         (row, index) => !selectedRows2.includes(index)
        //     )
        // )

        let res1 = table1Data.slice(0, result.destination.index);
        let res2 = table1Data.slice(
          result.destination.index,
          table1Data.length,
        );

        const updatedTable1Data = [...res1, ...clonedRows, ...res2];
        let res = updateStartTimes(updatedTable1Data, isProgrambase, isComBrk);
        setTable1Data(res);
        BackToBack(res);
        setSelectedRows2([]);
      }
    } else if (
      result.source.droppableId === 'table1' &&
      result.destination.droppableId == 'table1'
    ) {
      // console.log('selectedRows', selectedRows);

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
              F_C_S_P: copypromo ? row.F_C_S_P : 'DELETE',
            };
          }
          return row;
        });

        // console.log('updttable1Data', updttable1Data);

        let index = result.destination.index;
        // console.log('index', index);
        let res1 = updttable1Data.slice(0, index + rowdownDiff);
        let res2 = updttable1Data.slice(
          index + rowdownDiff,
          updttable1Data.length,
        );
        const updatedTable1Data = [...res1, ...clonedRows, ...res2];

        const ActualTable1Data = updatedTable1Data.filter(
          (row) => row.F_C_S_P !== 'DELETE',
        );
        // console.log(ActualTable1Data);
        let res = updateStartTimes(ActualTable1Data, isProgrambase, isComBrk);

        setTable1Data(res);
        BackToBack(res);
        setSelectedRows([]);
        return;
      } else {
        if (index1 > index2) {
          // console.log('index1 > index2');
          let referencerow = table1Data[index2 - 1];
          let draggedRow2 = { ...draggedRow };

          draggedRow2.BreakNumber = referencerow.BreakNumber;
          draggedRow2.SeasonNo = referencerow.SeasonNo;
          draggedRow2.Ep_No = referencerow.Ep_No;
          draggedRow2.ContentCode = referencerow.ContentCode;
          draggedRow2.FPC_ID = referencerow.FPC_ID;

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

          let draggedRow2 = { ...draggedRow };
          draggedRow2.BreakNumber = referencerow.BreakNumber;
          draggedRow2.SeasonNo = referencerow.SeasonNo;
          draggedRow2.Ep_No = referencerow.Ep_No;
          draggedRow2.ContentCode = referencerow.ContentCode;
          draggedRow2.FPC_ID = referencerow.FPC_ID;

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

      let res = updateStartTimes(updatedTable1Data, isProgrambase, isComBrk);
      BackToBack(res);
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
      let res = updateStartTimes(updatedTable2Data, isProgrambase, isComBrk);
      // console.log('updatedTable2Data', updatedTable2Data);
      // console.log('res', res);

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

  function promoinsert() {
    let promos = selectedRows2.map((index) => table2Data[index]);
    // console.log('SelectedBrkNo',SelectedBrkNo)

    // let promo=table2Data[selectedRows2[0]];
    let cnt = 1;
    let res = [...table1Data];
    table1Data.forEach((row, index) => {
      if (
        SelectedBrkNo.includes(Number(row.BreakNumber)) &&
        row.F_C_S_P !== 'SG'
      ) {
        // console.log(row.Start_Time);
        // console.log(starttime);
        // console.log(compareTimes(row.Start_Time, starttime));

        if (compareTimes(row.Start_Time, starttime) == 0) return;
        if (compareTimes(row.Start_Time, endtime) == 1) return;

        // console.log('index',index)
        // console.log('res[index]',table1Data[index])
        const updtpromos = FilldraggedRow(promos, table1Data[index]);
        res.splice(index + cnt, 0, ...updtpromos); // Insert promo below the matching row
        cnt = cnt + promos.length;
      } else {
        // console.log('else index', index, row.BreakNumber, row.F_C_S_P)
      }
    });
    let restime = updateStartTimes(res, isProgrambase, isComBrk);
    setTable1Data(restime);
  }

  function replace() {
    if (selectedRows.length > 1) {
      show('Please Select One Song only.', 'warning');
      return;
    }

    if (selectedRows2.length > 1) {
      show('Please Select One Song only.', 'warning');
      return;
    }
    console.log(selectedRows2, 'selectedRows2');
    let promos = selectedRows2.map((index) => table2Data[index]);
    let index = selectedRows[0];

    //let referencerow = table1Data[index];
    let referencerow = { ...table1Data[index] }; // Create a new object

    if (referencerow.F_C_S_P !== 'SG') {
      show('Please Select Song.', 'warning');
      return;
    }

    referencerow.Event_Name = promos[0].Event_Name;
    referencerow.Duration = promos[0].Duration;
    referencerow.Tape_ID = promos[0].Tape_ID;
    referencerow.VideoID = promos[0].VideoID;

    let res1 = table1Data.slice(0, index);

    let res2 = table1Data.slice(index + 1, table1Data.length);

    const updatedTable1Data = [...res1, referencerow, ...res2];

    let res = updateStartTimes(updatedTable1Data, isProgrambase, isComBrk);
    setTable1Data(res);
  }
  function removepromo() {
    let remcheck = table1Data.filter(
      (row, index) => selectedRows.includes(index) && row.F_C_S_P !== 'SG',
    );

    if (remcheck.length > 0) {
      show('Please Select only Song.', 'warning');
      return;
    }

    let rem = table1Data.filter((row, index) => !selectedRows.includes(index));

    let res = updateStartTimes(rem, isProgrambase, isComBrk);
    setTable1Data(res);

    setSelectedRows([]);
  }

  useEffect(() => {
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
    // console.log('starttime', starttime);
    // console.log('endtime', endtime);
  }, [starttime, endtime]);

  useEffect(() => {
    const selectedItems = table1Data.filter(
      (item, index) => selectedRows.includes(index) && item.F_C_S_P === 'SG',
    );

    const sumOfDuration = selectedItems.reduce((sum, item) => {
      return sum + parseDuration(item.Duration);
    }, 0);
    setselectedPromoDuration(formatDurationHHMMSSFF(sumOfDuration));
    const inputId = selectedRows[0];
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

    if (nearestAboveCTRow && nearestbelowCTRow) {
      const resultMilliseconds =
        timeToMilliseconds(nearestbelowCTRow.FPC_Time + ':00:00') -
        timeToMilliseconds(nearestAboveCTRow.FPC_Time + ':00:00');
      const slotd = millisecondsToTime(resultMilliseconds);
      setSlotDuration(slotd);
    }

    const PromototalDuration = sumDurations(
      table1Data,
      'SG',
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

    setPromototalDuration(PromototalDuration);
    setSegmenttotalDuration(SegmenttotalDuration);
    setCommercialDuration(CommercialDuration);

    setselectedPromos(selectedItems.length);
  }, [selectedRows]);
  const [colorMapping, setColorMapping] = useState({});
  const [startTimeArray, setStartTimeArray] = useState([]);
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

    GetBreakwiseDuration(
      table1Data,
      setBreakwiseData,
      setStartTimeArray,
      fpcTimes,
    );
    const mapColors = (data) => {
      const result = {};

      table1Data.forEach((item) => {
        const { EventDefaultBackColor, F_C_S_P } = item;

        if (!result[F_C_S_P]) {
          result[F_C_S_P] = EventDefaultBackColor;
        }
      });

      return result;
    };

    setColorMapping(mapColors(table1Data));
  }, [table1Data]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDatainS(table1Data));

    dispatch(settimestoreS(new Date().toLocaleString()));

    dispatch(setdatestoreS(value));
    // console.log(table1Data);
  }, [table1Data]);

  useEffect(() => {
    LoadMasters();
  }, []);

  useEffect(() => {
    // console.log('selectedCities', selectedCities)
    const res = cities.filter((city) => {
      return !Columnright.some(
        (selectedCity) => selectedCity.code === city.code,
      );
    });
    // console.log(res);
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

  const LoadMasters = async () => {
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

  const Columns2 = () => {
    const firstprfe = [
      {
        header: 'FPC Time',
        name: 'FPC_Time',
        code: 'FPC_Time',
        width: 'auto',
        ScreenType: 'Song',
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
        ScreenType: 'Song',
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
                  // console.log(result);

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
                      // console.log(res);
                      // console.log(data);
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
                        // console.log(myString);
                        // console.log(lengthOfString);
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
                      // console.log(res);
                      // console.log(data);
                      // console.log(Columnleft.length);
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
                        // console.log(myString);
                        // console.log(lengthOfString);
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

  const [options, setoptions] = useState([
    { value: 1, label: 'All' },
    { value: -2, label: 'Not Used Last 2 Days' },
    { value: -1, label: 'Frequntly used in 7 Days' },
  ]);
  const [audit, setaudit] = useState([]);
  const [name, setname] = useState('');
  const [value3, setValue3] = useState();
  const [auditValue, setauditValue] = useState(0);

  useEffect(() => {
    Channelmaster();
    auditpromoscheduling(Channel, convertDateToYMD(value));
  }, []);

  const Channelmaster = async () => {
    const Channelmaster = await apiGetSongcategoryDrop();
    const formattedOptions = Channelmaster.data.map((option) => ({
      value: option.SongCategoryCode,
      label: option.SongCategoryName,
    }));
    setoptions([...options, ...formattedOptions]);
  };

  const auditpromoscheduling = async (data1, data2) => {
    let param = {
      LocationCode: Channel.LocationCode,
      ChannelCode: Channel.ChannelCode,
      FormName: 'SongScheduling',
      TelecastDate: data2,
    };
    const auditMaster = await apiGetRestoreDropDown(param);
    const formattedOptions = auditMaster.data.map((option) => ({
      value: option.D_date,
      label: option.D_date,
    }));
    setaudit([...formattedOptions]);
  };
  const SongschedulDetailsApi = async (SongCode, TelecastDate, InHour) => {
    const SongschedulDetailsList = await apiGetSongschedulDetails(
      SongCode,
      TelecastDate,
      InHour,
    );
    const filteredData = filterDataByDate(SongschedulDetailsList.data);
    setisSongschedulDetails(true);
    setSongschedulDetails(filteredData);
  };
  useEffect(() => {
    if (isSongschedulDetails) {
      ScrollOnId(value);
    }
  }, [isSongschedulDetails]);

  const shworpomo = () => {
    apiGetSongScheduling2(value2, convertDateToYMD(value), 1, name)
      .then((response) => {
        if (response.status == 204) {
          openNotification('info', 'Song Not Found');
          setTable2Data([]);
          return;
        }
        return response.data;
      })
      .then((data) => {
        if (data) {
          const updatedData = data.map((item) => ({
            ...item,
            F_C_S_P: 'SG',
          }));
          setTable2Data(updatedData);
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
          setTable2DataCopy(data);
          const res1 = columns.filter((city) => {
            return !Columnleft.some(
              (selectedCity) => selectedCity.code === city.code,
            );
          });
          setnonSelectedCities1(res1);
        }
      });
  };

  const replaceall = () => {
    if (selectedRows.length > 1) {
      show('Please Select One Song only.', 'warning');
      return;
    }

    if (selectedRows2.length > 1) {
      show('Please Select One Song only.', 'warning');
      return;
    }

    let row1 = table1Data[selectedRows[0]];
    let row2 = table2Data[selectedRows2[0]];

    let res = table1Data.map((row) => {
      if (row.Event_Name === row1.Event_Name && row.F_C_S_P === 'SG') {
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

    console.log('res*', res);
    let uptime = updateStartTimes(res, isProgrambase, isComBrk);
    setTable1Data(uptime);
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
    show('Rejected', 'warning');
  };

  const [message, setMessage] = useTimeOutMessage();
  const [showLoader, setShowLoader] = useState(false);
  const [log, setlog] = useState('');
  const Addcolumnsetting = async () => {
    const mergedData = Columnright.map((item, index) => ({
      ScreenName: 'Song',
      ColumnName: item.code,
      Header: item.header,
      SequenceNo: index,
      IsVisible: 1,
    }));
    // console.log(Columnright);
    // console.log(mergedData);
    if (mergedData.length > 4) {
      try {
        const resp = await Postcolumnsetting(mergedData, token);
        if (resp.status === 200) {
          setlog('success');
          setMessage('Data Inserted Successfully.');
          return;
        }
        if (resp.status === 204) {
          openNotification('danger', 'Data Already Exists.');
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
      setMessage('Kindly Select minimum 5 Columns');
    }
  };
  const Addcolumnsetting2 = async () => {
    const mergedData = Columnleft.map((item, index) => ({
      ScreenName: 'PromoLeft',
      ColumnName: item.code,
      Header: item.header,
      SequenceNo: index,
      IsVisible: 1,
    }));
    // console.log(Columnleft);
    // console.log(mergedData);
    if (mergedData.length > 2) {
      try {
        const resp = await Postcolumnsetting(mergedData, token);
        if (resp.status === 200) {
          setlog('success');
          setMessage('Data Inserted Successfully.');
          return;
        }
        if (resp.status === 204) {
          openNotification('danger', 'Data Already Exists.');
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
      setMessage('Kindly Select minimum 2 Columns');
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
  const HeaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex justify-between">
          <span className="font-bold">Song Search</span>

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
                    setby('she');
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
  const BreakwiseheaderTemplate = (options) => {
    const className = `${options.className} justify-content-space-between`;

    return (
      <div className={className}>
        <div className="flex align-items-center">
          <span className="font-bold">Break Wise Duration</span>
        </div>

        <div className="flex align-items-end">
          <div>{options.togglerElement}</div>
        </div>
      </div>
    );
  };
  const FooterTemplate = (options) => {
    const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;
    // console.log(activeIndex)
    return (
      <div className={className}>
        <div className="flex items-center gap-2 p-1">
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
          <Tooltip title="Delete Selected Songs">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              onClick={() => removepromo()}
            >
              <span className="lbl pi pi-trash text-xl"></span>
            </button>
          </Tooltip>
          <Tooltip title="Delete All Songs">
            <button
              className="p-panel-header-icon p-link mr-2 lbl "
              onClick={() => setDialIsOpen(true)}
            >
              <span className="lbl pi pi-minus-circle text-xl"></span>
            </button>
          </Tooltip>
        </div>
      </div>
    );
  };
  const processData = (data) => {
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
          Do you want to include songs during these breaks?
        </div>
        <Checkbox.Group
          value={breaknumbers}
          onChange={(options) => {
            // console.log('options', options);
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

  const deleteallpromos = () => {
    // console.log(table1Data);
    let res = [...table1Data];
    let filtereddata = res.filter((row) => row.F_C_S_P !== 'SG');
    setDialIsOpen(false);
    setTable1Data(filtereddata);
  };
  // console.log(table1Data);

  useEffect(() => {
    BackToBack(table1Data);
  }, []);

  const BackToBack = (resrr) => {
    console.log('BackToBack_updtk');
    let updtk = processData(resrr);
    console.log('updtk', updtk);
    setTable1Data(updtk);
  };
  let maxWidth = `${!Insertpromo ? '100%' : '80%'}`;
  useEffect(() => {
    let Event_Name = table1Data[selectedRows[0]]?.Event_Name;

    let res = table1Data.filter((row, index) => row.Event_Name == Event_Name);
    setTable3Data([...res]);
  }, [selectedRows]);
  return (
    <>
      <Loader showLoader={showLoader} />
      {message && (
        <Alert className="mb-4" type={log} showIcon>
          {message}
        </Alert>
      )}
      {Channel.AutoSave ? (
        <Tooltip title="Auto Save">
          <Clock
            Progress={Progress}
            PromoSchdulingSave={SongSchdulingSave}
            openNotification={openNotification}
          />{' '}
        </Tooltip>
      ) : null}
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
                    setby('he');
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
                            </>
                          ))}
                        </Tr>
                      </THead>

                      <TBody {...provided.droppableProps} className="tbodye">
                        {table1Data.map((data, index) => (
                          <>
                            <Draggable
                              key={data.id}
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
                                  // className={`draggble-row row-${data.Id}`}
                                  className={`backcolor  rowINeed-${data.Id
                                    } draggble-row row-${data.Id} ${!isComBrk && data.F_C_S_P === 'C'
                                      ? 'Rowhidden'
                                      : ''
                                    }`}
                                  onClick={(e) => {
                                    // getpromo(data);
                                    setisSongschedulDetails(false);
                                    setSongschedulDetails([]);
                                    setSelectedRowsData(data);

                                    if (e.ctrlKey) {
                                      setSelectedRows((prevSelectedRows) => {
                                        if (prevSelectedRows.includes(index)) {
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
                                  {Columnright.map((city) => (
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
                                              data['TxLogCode']?.length > 2 &&
                                                city.name === data['TxLogCode']
                                                ? 'red'
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
                                        {data[city.name]}
                                        {data['FPC_Time'].length === 0 &&
                                          city.name === 'FPC_Time' &&
                                          data['F_C_S_P'] === 'SG' &&
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
            {/* </Card> */}
          </div>

          {Insertpromo ? (
            <div className="card">
              <Card>
                <div className=" ml-2 mb-2 grid grid-cols-6 gap-2">
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
                          'Song Scheduling',
                          newArray,
                          true,
                        );
                      }}
                    />
                  </Tooltip>
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
                  <Tooltip title="Copy Song">
                    <ButtonE
                      className="text-lg"
                      size="sm"
                      variant={copypromo ? 'solid' : 'twoTone'}
                      icon={copypromo ? <FaCopy /> : <FaRegCopy />}
                      onClick={() => {
                        setCopypromo(!copypromo);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Start Time Program Base">
                    <ButtonE
                      className="text-lg"
                      size="sm"
                      variant={isProgrambase ? 'solid' : 'twoTone'}
                      icon={isProgrambase ? <FaStopwatch /> : <FaStopwatch />}
                      onClick={() => {
                        setIsProgrambase(!isProgrambase);
                        let res = updateStartTimes(
                          table1Data,
                          isProgrambase,
                          isComBrk,
                        );
                        setTable1Data(res);
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Song Telecasted">
                    <ButtonE
                      className="text-lg"
                      size="sm"
                      variant={isSongschedulDetails ? 'solid' : 'twoTone'}
                      icon={isSongschedulDetails ? <FaMusic /> : <TbMusicOff />}
                      onClick={() => {
                        if (EventDataName !== 'Event Search') {
                          if (selectedRowsData?.F_C_S_P === 'SG') {
                            SongschedulDetailsApi(
                              Number(selectedRowsData.SongCode),
                              convertDateToYMD(value),
                              1,
                            );
                          } else {
                            openNotification(
                              'warning',
                              'You Have Not Selected Any Song',
                            );
                          }
                        }
                      }}
                    />
                  </Tooltip>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <ButtonE
                    size="xs"
                    onClick={() => {
                      setEventDataName('Event Search');

                      // LoadMasters(2);
                      shworpomo();
                      setDisplay(true);
                    }}
                  >
                    Insert Song
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
                        {Display ? (
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
                              maxLength="20"
                              style={{ height: '38px', width: 'auto' }}
                              onChange={(e) => {
                                setname(e.target.value);
                              }}
                              value={name}
                            />
                            <ButtonE
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
                                                  } draggble-row row-${data.Id} ${!DisplayS &&
                                                    data.F_C_S_P === 'S'
                                                    ? 'Rowhidden'
                                                    : ''
                                                  }`}
                                                onClick={(e) => {
                                                  SongschedulDetailsApi(
                                                    Number(data.SongCode),
                                                    convertDateToYMD(value),
                                                    1,
                                                  );
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
                                              `.rowINeed-${row.Id}`,
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
                        <BreakwiseSong
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
        className="  pt-2 "
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        {isSongschedulDetails && (
          //  h-80
          <div>
            <div
              id="SongschedulDetails"
              className="table-container w-3/4"
              style={{ maxHeight: '150px', overflowY: 'auto' }}
            >
              <table border="1">
                <thead>
                  <tr>
                    <th>TeleCast Date</th>
                    <th>00</th>
                    <th>01</th>
                    <th>02</th>
                    <th>03</th>
                    <th>04</th>
                    <th>05</th>
                    <th>06</th>
                    <th>07</th>
                    <th>08</th>
                    <th>09</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                    <th>17</th>
                    <th>18</th>
                    <th>19</th>
                    <th>20</th>
                    <th>21</th>
                    <th>22</th>
                    <th>23</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {SongschedulDetails.map((dayData, dayIndex) => {
                    return (
                      <tr
                        key={dayIndex}
                        className={`SongschedulDetails-${dayData.labelIndex}`}
                        style={{
                          background:
                            dayData.label === 'Today' ? '#a4a0a012' : 'initial',
                        }}
                      >
                        <td className="SelectedSongHeader">{dayData.label}</td>
                        {/* Show the day label */}
                        {dayData.hoursData.map((hourData, index) => {
                          const hour = Object.keys(hourData)[0];
                          const value = hourData[hour];

                          return (
                            <td key={index} className={getClassName(value)}>
                              {value == 0 ? '' : value}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="md:flex items-center">
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
              onClick={SongSchdulingSave}
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
                  Backdated Songs are non-editable
                </p>
              )}
          </div>

          <div
            id="myblock"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 pt-0 pb-1 bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Selected Songs
              </span>
              <span className="font-medium text-lg">
                {selectedPromos}-[{selectedPromoDuration}]
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Segments
              </span>
              <span className="font-medium text-lg">
                {segmenttotalDuration}
              </span>
            </div>
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Commericals
              </span>
              <span className="font-medium text-lg   ">
                {commercialDuration}
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Song
              </span>
              <span className="font-medium text-lg  ">
                {PromototalDuration}
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Program
              </span>
              <span className="font-medium text-lg"> {SlotDuration}</span>
            </div>
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Total
              </span>
              {selectedRows.length > 0 && (
                <span className="font-medium text-lg  ">
                  {addTimeDurations(
                    addTimeDurations(
                      addTimeDurations(PromototalDuration, '00:00:00:00'),
                      segmenttotalDuration,
                    ),
                    commercialDuration,
                  )}
                </span>
              )}
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
          placeholder="Please Select"
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
      <Dial isOpen={DialIsOpen} onClose={() => setDialIsOpen(false)}>
        <h5 className="mb-4">Confirm You Want to Delete</h5>
        <div className="text-right mt-6">
          <ButtonE
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={() => setDialIsOpen(false)}
          >
            Cancel
          </ButtonE>
          <ButtonE variant="solid" onClick={() => deleteallpromos()}>
            Okay
          </ButtonE>
        </div>
      </Dial>
    </>
  );
};

export default SongSchedulingPage;

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
