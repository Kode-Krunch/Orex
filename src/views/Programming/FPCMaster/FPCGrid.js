import React, { useCallback, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Table from 'components/ui/Table';
import {
  Button,
  Checkbox,
  FormItemcompact,
  Input,
  Select,
  Tooltip,
  Upload,
  Dialog,
  Switcher,
  Avatar,
  Card,
} from 'components/ui';
import './fpccomman.css';
import { useDispatch } from 'react-redux';
import ProgressionBar from 'views/Controls/ProgressionBar';
import {
  PostFPCSaveAs,
  PostFPCSaveAs2,
  Postdailyfpc,
  apiGetContentmaster,
  apiGetContentmasterbyid,
  apiGetFPCMasterWithHouseID,
  apiGetPatternmasterDropDown,
  apiGetUSP_PG_FPC_Get_Content,
  apiGetcontentcontractdetailsId,
  apiGetcontentcontractmasterId,
  apiGetfpcorgrepmaster,
  apiUSP_PG_FPC_Get_Content,
} from 'services/ProgrammingService';
import {
  HiCheckCircle,
  HiOutlineCalendar,
  HiOutlineClipboardCheck,
  HiOutlineCloudUpload,
  HiOutlineDownload,
  HiOutlineInformationCircle,
  HiOutlinePencil,
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineTrash,
} from 'react-icons/hi';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useSelector } from 'react-redux';
import { ExportXls } from 'views/Controls/ExportXls';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import { AiOutlineSave } from 'react-icons/ai';
import DailyFPCApp from './DailyFPCApp';
import { FPCImportTemplate } from 'views/Controls/ImportTemplate';
import { upperCase } from 'lodash';
import appConfig from 'configs/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FORMATDATE_FOR_EVERY,
  formatDateToDDMMMYYYY,
  formatStartDate,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { MdOutlineAdd, MdOutlineFindReplace } from 'react-icons/md';
import { apiCallstoreprocedure } from 'services/CommonService';
import { format, addMinutes } from 'date-fns';
import { Slider } from 'primereact/slider';
import { PiLinkBreakBold, PiLinkBreakThin } from 'react-icons/pi';
import { setContent, setContentSeg } from 'store/base/commonSlice';
import { SetMAXSegment } from 'store/auth/userSlice';
import Loader from 'views/Controls/Loader';
import { LuCalendarDays } from 'react-icons/lu';
import { BsCalendarDate, } from 'react-icons/bs';
import { GrCertificate } from 'react-icons/gr';
import { FaExternalLinkAlt } from 'react-icons/fa';
import ContractShowDialog from './ContractShowDialog';

const { Tr, Th, Td, THead, TBody } = Table;

const LICENCE_OPTIONS = [
  { value: 'licenced', label: 'Licenced' },
  { value: 'nonLicenced', label: 'Non-Licenced' },
  { value: 'all', label: 'All' },
];
// const Content = {
//   "Data": {
//     "ContractCode": 32,
//     "ContractNo": "CONCOTACT31",
//     "ContractName": "FREEWAY PIC",
//     "SupplierCode": 1,
//     "AgreementDate": "2025-01-01",
//     "CountryCode": 78,
//     "StateCode": 13,
//     "PlaceCode": 24,
//     "AuthorisedPerson": "admin",
//     "BudgetYear": 2025,
//     "Remarks": "creative",
//     "PurchaseType": "NA",
//     "LoanPeriod": 0,
//     "ReturnDt": "1900-01-01",
//     "ReturnSupplierCode": 0,
//     "TotPayment": 0,
//     "TaxDeduction": 0,
//     "CurrencyCode": 2,
//     "CalProgCost": 0,
//     "NoProgPurchased": 0,
//     "MstcostPerProg": 0,
//     "MstcostPerHour": 0,
//     "MstcostPerContract": 0,
//     "Content_Image": "",
//     "IsActive": 1
//   },
//   "Details": [
//     {
//       "ContentContractMaster": {
//         "ContractCode": 32,
//         "ContractName": "FREEWAY PIC"
//       },
//       "ContractNo": "CONCOTACT31",
//       "RowNos": 0,
//       "ContentMaster": {
//         "ContentCode": 486,
//         "ContentName": "DELHI CRIME",
//         "Content_Image": "https://m.media-amazon.com/images/M/MV5BYjQ2YmE4OWUtNDZhZi00ZGYxLTg4MzYtYWIwMWI1NDQ5ZDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
//       },
//       "AmortisationTypeMaster": {
//         "AmortisationTypeCode": 2,
//         "AmortisationTypeName": "60% ON 1ST RUN,20% ON 2ND RUN AND 20% ON 3RD RUN BUT LIMITED TO LICENSE PERIOD"
//       },
//       "ContractStartDate": "2025-01-01",
//       "ContractEndDate": "2025-01-31",
//       "ProgCost": 500000,
//       "CostPerEp": 50000,
//       "BroadcastDayLength": 0,
//       "ExclusivityRight": 0,
//       "OrignalRun": 1,
//       "RepeatRun": 0,
//       "NoofTimein24Hrs": 0,
//       "NoofRuns": 0,
//       "TotalBroadcastRun": 0,
//       "RepeatPlayWeek": 0,
//       "RepeatPlayDay": 0,
//       "RepeatPlayHour": 0,
//       "EADofMaterial": "2025-01-01",
//       "MatDelPaidBy": "",
//       "MatRetCodePaidBy": "",
//       "ContractActive": false,
//       "BroadcastStartTime": "",
//       "BroadcastEndTime": "",
//       "MTHADD": 0,
//       "UnlimitedRuns": true,
//       "ContractRemarks": "",
//       "Content_Image": "",
//       "IsActive": 1
//     }, {
//       "ContentContractMaster": {
//         "ContractCode": 32,
//         "ContractName": "FREEWAY PIC"
//       },
//       "ContractNo": "CONCOTACT31",
//       "RowNos": 0,
//       "ContentMaster": {
//         "ContentCode": 486,
//         "ContentName": "DELHI CRIME",
//         "Content_Image": "https://m.media-amazon.com/images/M/MV5BYjQ2YmE4OWUtNDZhZi00ZGYxLTg4MzYtYWIwMWI1NDQ5ZDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
//       },
//       "AmortisationTypeMaster": {
//         "AmortisationTypeCode": 2,
//         "AmortisationTypeName": "60% ON 1ST RUN,20% ON 2ND RUN AND 20% ON 3RD RUN BUT LIMITED TO LICENSE PERIOD"
//       },
//       "ContractStartDate": "2025-01-01",
//       "ContractEndDate": "2025-01-31",
//       "ProgCost": 500000,
//       "CostPerEp": 50000,
//       "BroadcastDayLength": 0,
//       "ExclusivityRight": 0,
//       "OrignalRun": 1,
//       "RepeatRun": 0,
//       "NoofTimein24Hrs": 0,
//       "NoofRuns": 0,
//       "TotalBroadcastRun": 0,
//       "RepeatPlayWeek": 0,
//       "RepeatPlayDay": 0,
//       "RepeatPlayHour": 0,
//       "EADofMaterial": "2025-01-01",
//       "MatDelPaidBy": "",
//       "MatRetCodePaidBy": "",
//       "ContractActive": false,
//       "BroadcastStartTime": "",
//       "BroadcastEndTime": "",
//       "MTHADD": 0,
//       "UnlimitedRuns": true,
//       "ContractRemarks": "",
//       "Content_Image": "",
//       "IsActive": 1
//     },
//     {
//       "ContentContractMaster": {
//         "ContractCode": 32,
//         "ContractName": "FREEWAY PIC"
//       },
//       "ContractNo": "CONCOTACT31",
//       "RowNos": 0,
//       "ContentMaster": {
//         "ContentCode": 486,
//         "ContentName": "DELHI CRIME",
//         "Content_Image": "https://m.media-amazon.com/images/M/MV5BYjQ2YmE4OWUtNDZhZi00ZGYxLTg4MzYtYWIwMWI1NDQ5ZDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
//       },
//       "AmortisationTypeMaster": {
//         "AmortisationTypeCode": 2,
//         "AmortisationTypeName": "60% ON 1ST RUN,20% ON 2ND RUN AND 20% ON 3RD RUN BUT LIMITED TO LICENSE PERIOD"
//       },
//       "ContractStartDate": "2025-01-01",
//       "ContractEndDate": "2025-01-31",
//       "ProgCost": 500000,
//       "CostPerEp": 50000,
//       "BroadcastDayLength": 0,
//       "ExclusivityRight": 0,
//       "OrignalRun": 1,
//       "RepeatRun": 0,
//       "NoofTimein24Hrs": 0,
//       "NoofRuns": 0,
//       "TotalBroadcastRun": 0,
//       "RepeatPlayWeek": 0,
//       "RepeatPlayDay": 0,
//       "RepeatPlayHour": 0,
//       "EADofMaterial": "2025-01-01",
//       "MatDelPaidBy": "",
//       "MatRetCodePaidBy": "",
//       "ContractActive": false,
//       "BroadcastStartTime": "",
//       "BroadcastEndTime": "",
//       "MTHADD": 0,
//       "UnlimitedRuns": true,
//       "ContractRemarks": "",
//       "Content_Image": "",
//       "IsActive": 1
//     }, {
//       "ContentContractMaster": {
//         "ContractCode": 32,
//         "ContractName": "FREEWAY PIC"
//       },
//       "ContractNo": "CONCOTACT31",
//       "RowNos": 0,
//       "ContentMaster": {
//         "ContentCode": 486,
//         "ContentName": "DELHI CRIME",
//         "Content_Image": "https://m.media-amazon.com/images/M/MV5BYjQ2YmE4OWUtNDZhZi00ZGYxLTg4MzYtYWIwMWI1NDQ5ZDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg"
//       },
//       "AmortisationTypeMaster": {
//         "AmortisationTypeCode": 2,
//         "AmortisationTypeName": "60% ON 1ST RUN,20% ON 2ND RUN AND 20% ON 3RD RUN BUT LIMITED TO LICENSE PERIOD"
//       },
//       "ContractStartDate": "2025-01-01",
//       "ContractEndDate": "2025-01-31",
//       "ProgCost": 500000,
//       "CostPerEp": 50000,
//       "BroadcastDayLength": 0,
//       "ExclusivityRight": 0,
//       "OrignalRun": 1,
//       "RepeatRun": 0,
//       "NoofTimein24Hrs": 0,
//       "NoofRuns": 0,
//       "TotalBroadcastRun": 0,
//       "RepeatPlayWeek": 0,
//       "RepeatPlayDay": 0,
//       "RepeatPlayHour": 0,
//       "EADofMaterial": "2025-01-01",
//       "MatDelPaidBy": "",
//       "MatRetCodePaidBy": "",
//       "ContractActive": false,
//       "BroadcastStartTime": "",
//       "BroadcastEndTime": "",
//       "MTHADD": 0,
//       "UnlimitedRuns": true,
//       "ContractRemarks": "",
//       "Content_Image": "",
//       "IsActive": 1
//     }
//   ]
// }

const Days = ['0', '1', '2', '3', '4', '5', '6'];
export default function FPCGrid({
  objChannel,
  SelectedDate,
  setFCPSaveDt,
  isFPCAllowedToEdit,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateFormat = 'DD MMM YYYY';
  const FpcErrorheaders = ['StartTime', 'Content', 'Remark'];
  const { Content } = useSelector((state) => state.base.common);
  const [data, setdata] = useState(['']);
  const [emptySegmentData, setemptySegmentData] = useState(['']);
  const [expandedRows, setExpandedRows] = useState([]);
  const [SelectedRow, setSelectedRow] = useState(null);
  const [SearchContent, setSearchContent] = useState(null);
  const [ContentList, setContentList] = useState([]);
  const [orgContentList, setOrgContentList] = useState(['']);
  const [ChannelStartTime, setChannelStartTime] = useState(['']);
  const [slotDurationValue, setSlotDurationValue] = useState(0, 0);
  const [maxSlotDuration, setMaxSlotDuration] = useState(60);
  const [minSlotDuration, setMinSlotDuration] = useState(0);
  const [selectedLicence, setSelectedLicence] = useState(LICENCE_OPTIONS[2]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGeneres, setSelectedGeneres] = useState([]);
  const [Dialogbox, setDialogbox] = useState(false);
  console.log(SelectedDate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let Parameters = {
          LocationCode: Channel.LocationCode,
          ChannelCode: Channel.ChannelCode,
          EventContentCode: 0,
        };
        const resp = await apiGetContentmaster(Parameters);
        if (resp.status == 204) {
          setContentList([]);
          return;
        }
        setContentList(resp.data);
        setOrgContentList(resp.data);
        setGenreOptions(getGenreOptions(resp.data));
        const maxDuration = Math.max(
          ...resp.data.map((item) => item.SlotDuration),
        );
        const minDuration = Math.min(
          ...resp.data.map((item) => item.SlotDuration),
        );

        setMaxSlotDuration(maxDuration);
        setMinSlotDuration(minDuration);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const [dialogImage, setdialogImage] = useState({});
  const GetContents = async (IsGroup, ContentCode) => {
    try {
      const datas = await apiGetContentmasterbyid(ContentCode);
      console.log(datas.data);
      setDialogbox(true);

      setdialogImage(datas.data);
    } catch (error) { }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('slotDurationValue', slotDurationValue);
        const filteredContentList = orgContentList.filter(
          (item) =>
            item.SlotDuration >= slotDurationValue[0] &&
            item.SlotDuration <= slotDurationValue[1],
        );
        setContentList(filteredContentList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [slotDurationValue]);

  useEffect(() => {
    try {
      let filteredContentList;
      if (slotDurationValue.length === 2 && orgContentList.length > 0) {
        if (selectedGeneres.length === 0) {
          if (selectedLicence.value === 'all') {
            filteredContentList = orgContentList.filter(
              (content) =>
                content.SlotDuration >= slotDurationValue[0] &&
                content.SlotDuration <= slotDurationValue[1],
            );
          } else if (selectedLicence.value === 'licenced') {
            filteredContentList = orgContentList.filter(
              (content) =>
                content.ContentContractDetails.length > 0 &&
                content.SlotDuration >= slotDurationValue[0] &&
                content.SlotDuration <= slotDurationValue[1],
            );
          } else {
            filteredContentList = orgContentList.filter(
              (content) =>
                content.ContentContractDetails.length === 0 &&
                content.SlotDuration >= slotDurationValue[0] &&
                content.SlotDuration <= slotDurationValue[1],
            );
          }
        } else {
          const generes = selectedGeneres.map((genre) => genre.value);
          if (selectedLicence.value === 'all') {
            filteredContentList = orgContentList.filter(
              (content) =>
                generes.includes(content.ContentType.ContentTypeName) &&
                content.SlotDuration >= slotDurationValue[0] &&
                content.SlotDuration <= slotDurationValue[1],
            );
          } else if (selectedLicence.value === 'licenced') {
            filteredContentList = orgContentList.filter(
              (content) =>
                generes.includes(content.ContentType.ContentTypeName) &&
                content.ContentContractDetails.length > 0 &&
                content.SlotDuration >= slotDurationValue[0] &&
                content.SlotDuration <= slotDurationValue[1],
            );
          } else {
            filteredContentList = orgContentList.filter(
              (content) =>
                generes.includes(content.ContentType.ContentTypeName) &&
                content.ContentContractDetails.length === 0 &&
                content.SlotDuration >= slotDurationValue[0] &&
                content.SlotDuration <= slotDurationValue[1],
            );
          }
        }
        setContentList(filteredContentList);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedLicence, selectedGeneres, slotDurationValue, orgContentList]);

  const [searchContentText, setSearchContentText] = useState('');
  const [SeasonList, setSeasonList] = useState([]);
  const [EpisodeList, setEpisode] = useState([]);

  const [SelSeason, setSelSeason] = useState(null);
  const [SelEpisode, setSelEpisode] = useState(null);
  const [BreakPattSelect, setBreakPattSelect] = useState({});

  const [SelContent, setSelContent] = useState({
    value: null,
    label: 'Please Select Content',
  });

  const [Slotduration, setSlotduration] = useState('');
  const [CopyData, setCopyData] = useState([]);
  const [data10, setdata10] = useState([]);
  const [fpcimportdata, setFpcimportdata] = useState([]);
  const token = useSelector((state) => state.auth.session.token);
  const [showLoader, setshowLoader] = useState(false);
  const [isContractPopup, setisContractPopup] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState(Days);
  const [Pattern, setPattern] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const apexBarChar = async () => {
    setshowLoader(true);
    if (emptySegmentData.length == 0) {
      let transformedArray = data.map((data) => ({
        RowNumber: data.data.RowNumber,
        ContentCode:
          data.data.GroupName == 1
            ? data.children[0].data.ContentCode
            : data.data.ContentCode,
        StartTime: data.data.StartTime,
        EndTime: data.data.EndTime,
        SlotDuration: data.data.SlotDuration,
        OriginalRepeatCode: data.data.OriginalRepeatCode,
        EpisodeNo: data.data.EpisodeNo,
        ContentName:
          data.data.GroupName == 1
            ? data.children[0].data.ContentName
            : data.data.ContentName,
        ActualDuration: data.data.ActualDuration,
        SeasonNo: data.data.SeasonNo,
        BreakPatternCode: data.data.BreakPatternCode,
        BreakPattern: data.data.BreakPattern,
        HouseID: data.data.HouseID,
        ChannelTimeDescription: data.data.ChannelTimeDescription,
        Id: data.data.Id,
        TimeCategoryStartTime: data.data.TimeCategoryStartTime,
        TimeCategoryEndTime: data.data.TimeCategoryEndTime,
        MinDiff: data.data.MinDiff,
        Consumption: data.data.Consumption,
        LocationCode: data.data.LocationCode,
        ChannelCode: data.data.ChannelCode,
        TelecastDate: data.data.TelecastDate,
      }));
      transformedArray = addNewTelecastDate(transformedArray);
      try {
        const resp = await Postdailyfpc(transformedArray, token);
        if (resp.data.code === '200') {
          setDailyFPCDialogVisible(false);
          setshowLoader(false);
          openNotification('success', 'Added Succesfully');
          return;
        }
      } catch (errors) {
        if (errors.response.status == 500) {
          setDailyFPCDialogVisible(false);
          setshowLoader(false);
          openNotification('success', 'Added Succesfully');
          return;
        }
      }
    } else {
      setDailyFPCDialogVisible(false);
      setshowLoader(false);
      openNotification('danger', 'Please Create Missing Segment First..');
    }
  };

  useEffect(() => {
    if (
      data10 &&
      data10.length > 0 &&
      data10[0].Consumption &&
      data10[0].Consumption > 1
    ) {
      if (data10[0].MinDiff == 0) {
        data10[0].MinDiff = 1440;
      }
      let diff = data10[0].MinDiff - data10[0].Consumption;

      const minDuration = Math.min(
        ...ContentList.map((item) => {
          return isNaN(item.SlotDuration) || item.SlotDuration === null
            ? Infinity
            : item.SlotDuration;
        }),
      );
      const minSlotDuration =
        minDuration === Infinity || isNaN(minDuration) ? 0 : minDuration;

      console.log('minDuration', minDuration);
      if (diff < minSlotDuration) {
        diff = minSlotDuration + 10;
      }

      setSlotDurationValue([minSlotDuration, diff]);
    }
    const savdata = addNewTelecastDate(data10);

    setFCPSaveDt(savdata);
  }, [data10]);

  const addNewTelecastDate = (data) => {
    let previousNewTelecastDate = null;
    let previousSlotDuration = null;
    return data.map((item, key) => {
      let newTelecastDate;

      if (key === 0) {
        newTelecastDate = new Date(`${item.TelecastDate}T${item.StartTime}`);
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

  const handleDateChange = (newDates) => {
    const [newStartDate, newEndDate] = newDates;
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetPatternmasterDropDown(values);
      if (Array.isArray(resp.data)) {
        const formattedOptions = resp.data.map((option) => ({
          value: option.PatternCode,
          label: option.PatternName,
        }));
        setPattern(formattedOptions);
      } else {
      }
    })();
    (async (values) => {
      setshowLoader(true);
      const respfpc = await apiGetFPCMasterWithHouseID(
        objChannel.LocationCode,
        objChannel.ChannelCode,
        SelectedDate,
      );
      setshowLoader(false);
      var updt = handleStartTimeChange(0, ChannelStartTime, respfpc.data);
      setCopyData(updt);
      setdata10(updt || []);
      const groupedData = groupBy(
        updt,
        'TimeCategoryStartTime',
        'TimeCategoryEndTime',
      );
      const updatedData = updateConsumption(groupedData);

      setdata10(updatedData || []);
    })();
  }, [ChannelStartTime, SelectedDate]);

  const groupBy = (data, field1, field2) => {
    return data.reduce((acc, item) => {
      const key = `${item[field1]}-${item[field2]}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  };

  // Update Consumption for each group
  const updateConsumption = (groupedData) => {
    return Object.values(groupedData).flatMap((group) => {
      const sumSlotDuration = group.reduce(
        (sum, item) => sum + (parseInt(item.SlotDuration, 10) || 0),
        0,
      );
      const updatedGroup = group.map((item) => ({
        ...item,
        Consumption: sumSlotDuration,
      }));

      return updatedGroup;
    });
  };

  const HeaderTemplate = () => {
    return (
      <React.Fragment>
        <div className="grid grid-cols-4 gap-4 pl-2 pr-10 pb-2">
          <div className="col-span-4">
            <h5 className="font-bold">
              <ProgressionBar
                progression={Math.round(
                  data10[0]?.Consumption && data10[0]?.MinDiff
                    ? (data10[0]?.Consumption / data10[0]?.MinDiff) * 100
                    : 0, // Default to 0% if any value is missing or invalid
                )}
              />
            </h5>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="py-0 px-2 rounded-full border border-gray-800 w-max">
          {rowData.status}
        </p>
      </div>
    );
  };

  const APIHIT = async (IsLicense) => {
    try {
      setshowLoader(true); // Show loader before starting the API calls

      const [dataResponse, detailsResponse] = await Promise.all([
        apiGetcontentcontractmasterId(IsLicense),
        apiGetcontentcontractdetailsId(IsLicense)
      ]);

      dispatch(setContent({
        Data: dataResponse.data,
        Details: detailsResponse.data
      }));
      setisContractPopup(true);
      // navigate('/ContentContractEdit'); // Uncomment if navigation is needed
    } catch (error) {
      console.error('Error fetching content contract data:', error);
    } finally {
      setshowLoader(false); // Hide loader regardless of success or failure
    }
  };


  const StartTimeTemplate = (rowData) => {
    return <span style={{ fontWeight: 'bold' }}>{rowData.StartTime}</span>;
  };
  const EndTimeTemplate = (rowData) => {
    return <span style={{ fontWeight: 'bold' }}>{rowData.EndTime}</span>;
  };

  const ShowContentAndLicenseIcon = (rowData) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ marginLeft: '5px' }}>{rowData.ContentName}</span>

        <div style={{ display: 'flex', gap: '10px' }}>
          {rowData.IsLicense > 0 && (
            <Tooltip title="Show License">
              <Button
                type="button"
                className="btnEdit border-none"
                size="xs"
                icon={<GrCertificate />}
                onClick={() => {
                  APIHIT(rowData.IsLicense);
                }}
                style={{ background: 'transparent', color: 'black' }}
              />
            </Tooltip>
          )}
          <Tooltip title="Show Content Info">
            <Button
              type="button"
              className="btnEdit border-none"
              size="xs"
              icon={<HiOutlineInformationCircle />}
              onClick={() => {
                GetContents(rowData.GroupName, rowData.ContentCode);
              }}
              style={{ background: 'transparent', color: 'black' }}
            />
          </Tooltip>
        </div>
      </div>
    );
  };

  const Season_and_Episode = (rowData) => {
    const rep = arr.filter((item) => item.ShortName == rowData.status);
    const colour = rep[0]?.NewColourCode?.split('-')[0];

    return (
      <div className="flex items-center justify-center w-full h-full">
        {rowData.IsRecorded === 1 ? (
          <p
            className={`py-0.5 px-2 rounded-full 
             bg-blue-900 text-white w-max`}
          >
            LIVE
          </p>
        ) : rowData.EpisodeSpecific === 0 ? (
          <p
            className={`py-0.5 px-2 rounded-full 
           bg-blue-900 bg-opacity-80 text-white w-max`}
          >
            {rowData.ContentTypeName}
          </p>
        ) : (
          <p
            className={`py-0.5 px-2 rounded-lg 
              bg-sky-700 text-white w-max`}
          >
            S{rowData.SeasonNo} - E
            {rowData.EpisodeNo > 9
              ? rowData.EpisodeNo
              : '0' + rowData.EpisodeNo}
          </p>
        )}
      </div>
    );
  };

  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [btnMode, setbtnMode] = useState('ADD');

  const [SaveAsvisible, setSaveAsvisible] = useState(false);
  const [SaveAsvisibleDays, setSaveAsvisibleDays] = useState(false);
  const showContentList = (position, Mode) => {
    setbtnMode(Mode);
    setVisible(true);
    setDialogContentS(false);
  };

  {
    //AddContent//
  }

  const AddContent = async (name) => {
    const resp = await apiUSP_PG_FPC_Get_Content(
      '0',
      objChannel.LocationCode,
      objChannel.ChannelCode,
      SelectedDate,
      name,
    );
    console.log('resp.data', resp.data);
    if (resp.data.length > 0) {
      if (resp.data[0].ContentTypeCode == 0 && resp.data[0].ContentCode == 0) {
        openNotification('info', resp.data[0].ContentName);
        return;
      }
    }
    setSearchContent(resp.data);
    const distinctPrograms = filterDistinctPrograms(resp.data);
    console.log(distinctPrograms);
  };
  const filterDistinctPrograms = (programs) => {
    const episodeOptionsSet = new Set();
    const SeasonOptionsSet = new Set();
    programs.forEach((program) => {
      episodeOptionsSet.add(program.EpisodeNo);
      SeasonOptionsSet.add(program.SeasonNo);
    });

    const sortedEpisodeOptions = Array.from(episodeOptionsSet)
      .sort((a, b) => a - b)
      .map((value) => ({ value: Number(value), label: Number(value) }));
    const sortedSeasonOptions = Array.from(SeasonOptionsSet)
      .sort((a, b) => a - b)
      .map((value) => ({ value: Number(value), label: Number(value) }));
    // Convert Map values back to array

    if (sortedSeasonOptions.length == 0) {
      openNotification('info', 'Please check Release Date/Season-Episode.');
      return;
    }
    if (sortedEpisodeOptions.length == 1) {
      setSelSeason({ value: '1', label: '1' });
      setSelEpisode({ value: '1', label: '1' });
    }
    setSeasonList(sortedSeasonOptions);
    setEpisode(sortedEpisodeOptions);
    showContentList('right', btnMode);
  };
  {
    //AddContent//
  }
  const showSaveAs = (position, Mode) => {
    setSaveAsvisible(true);
  };

  const DonwloadFPCImport = () => {
    ExportXls([FPCImportTemplate], 'FPC_Import_Template');
  };
  const accept2 = () => {
    handleSaveASFPC();
  };

  const accept = (SelectedRowrr) => {
    if (SelectedRowrr) {
      console.log(SelectedRowrr);
      console.log(data10);
      setdata10((prevData) => {
        const updatedData = prevData.filter(
          (row) =>
            !(
              row.ContentCode === SelectedRowrr.ContentCode &&
              row.SeasonNo === SelectedRowrr.SeasonNo &&
              row.EpisodeNo === SelectedRowrr.EpisodeNo &&
              row.StartTime == SelectedRowrr.StartTime &&
              row.EndTime == SelectedRowrr.EndTime
            ),
        );
        const groupedData = groupBy(
          updatedData,
          'TimeCategoryStartTime',
          'TimeCategoryEndTime',
        );
        const updatedt = updateConsumption(groupedData);
        return updatedt;
      });
      openNotification('success', 'Removed successfully');
    } else {
      openNotification('warning', 'No row selected');
    }
  };

  const reject = () => { };
  const confirm2 = (event, SelectedRowrr) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure to remove this record?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => accept(SelectedRowrr),
      reject,
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <ConfirmPopup />

        <Tooltip title="Edit" placement="top">
          <Button
            type="button"
            className="btnEdit  mr-2"
            size="xs"
            onClick={() => {
              setSelectedRow(rowData);
              var updt = handleStartTimeChange(0, ChannelStartTime, data10);
              setdata10(updt);
              setSelContent({
                value: rowData.ContentCode,
                label: rowData.ContentName,
                SeasonNo: rowData.SeasonNo,
                EpisodeNo: rowData.EpisodeNo,
              });
              setSelSeason({
                value: rowData.SeasonNo,
                label: rowData.SeasonNo,
              });
              setSelEpisode({
                value: rowData.EpisodeNo,
                label: rowData.EpisodeNo,
              });
              setSearchContentText(rowData.ContentName);
              setSlotduration(rowData.SlotDuration);
              handleContentSelect({
                value: rowData.ContentCode,
                label: rowData.ContentName,
              });
              handlesetSeason(
                { value: rowData.ContentCode, label: rowData.ContentName },
                { value: rowData.SeasonNo, label: rowData.SeasonNo },
              );
              setBreakPattSelect({
                value: rowData.BreakPatternCode,
                label: rowData.BreakPattern,
              });
              showContentList('right', 'Modify');
            }}
            icon={<HiOutlinePencil />}
            label="Confirm"
            style={{ background: 'transparent', color: 'black' }}
          />
        </Tooltip>
        <Tooltip title="Delete" placement="top">
          <Button
            type="button"
            className="btnEdit mr-2"
            size="xs"
            icon={<HiOutlineTrash />}
            onClick={(e) => {
              confirm2(e, rowData);
            }}
            style={{ background: 'transparent', color: 'black' }}
          />
        </Tooltip>
        <Tooltip title="Replace" placement="top">
          <Button
            type="button"
            className="btnEdit mr-2"
            size="xs"
            icon={<MdOutlineFindReplace />}
            onClick={() => {
              setbtnMode('REPLACE');
              setDialogContentS(true);
            }}
            style={{ background: 'transparent', color: 'black' }}
          />
        </Tooltip>
      </>
    );
  };

  function handleStartTimeChange(index, newStartTime, data10) {
    console.log('newStartTime', newStartTime);
    const updatedData = [...data10.sort((a, b) => a.RowNumber - b.RowNumber)];
    let timeCategory = updatedData[index].TimeCategoryStartTime;
    updatedData[index].StartTime = newStartTime;
    const slotDuration = parseInt(updatedData[index].SlotDuration, 10);
    const startTime = updatedData[index].StartTime;
    const endTime = calculateEndTime(startTime, slotDuration);
    updatedData[index].EndTime = endTime;
    for (let i = index + 1; i < updatedData.length; i++) {
      let CurrentTimeCategory = updatedData[i].TimeCategoryStartTime;

      if (
        updatedData[i].StartTime !== null &&
        updatedData[i].StartTime !== ''
      ) {
        // Calculate the new end time based on the slot duration
        const slotDuration = parseInt(updatedData[i].SlotDuration, 10);
        let startTime = '';
        let formattedTime = '';
        if (timeCategory !== CurrentTimeCategory) {
          const dateTimeString = CurrentTimeCategory;
          const timeRegex = /(\d{2}:\d{2}):\d{2}/;
          const match = dateTimeString.match(timeRegex);
          if (match) {
            formattedTime = match[1];
            startTime = formattedTime;
            timeCategory = CurrentTimeCategory;
          } else {
            console.error('Invalid date-time string');
            startTime = updatedData[i - 1].EndTime;
          }
        } else {
          startTime = updatedData[i - 1].EndTime;
        }
        const endTime = calculateEndTime(startTime, slotDuration);
        // Update the start time and end time
        updatedData[i].StartTime = startTime;
        updatedData[i].EndTime = endTime;
      }
    }
    return updatedData; // Add this line to return the updatedData array
  }

  // function calculateEndTime(startTime, slotDuration) {
  //   const [hours, minutes] = startTime.split(':').map(Number);
  //   const totalMinutes = hours * 60 + minutes + slotDuration;
  //   const newHours = Math.floor(totalMinutes / 60);
  //   const newMinutes = totalMinutes % 60;

  //   return `${newHours.toString().padStart(2, '0')}:${newMinutes
  //     .toString()
  //     .padStart(2, '0')}`;
  // }
  function calculateEndTime(startTime, slotDuration) {
    console.log('startTime', startTime);
    console.log('slotDuration', slotDuration);
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + slotDuration;
    const newHours = Math.floor(totalMinutes / 60) % 24; // Wrap around after 24 hours
    const newMinutes = totalMinutes % 60;

    return `${newHours.toString().padStart(2, '0')}:${newMinutes
      .toString()
      .padStart(2, '0')}`;
  }

  const handleContentSelect = async (content) => {
    const uniqueValues = new Map();

    if (SearchContent == null || SearchContent.length == 0) {
      setshowLoader(true);
      apiGetUSP_PG_FPC_Get_Content(
        '0',
        objChannel.LocationCode,
        objChannel.ChannelCode,
        SelectedDate,
        content.label,
        token,
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length == 0) {
            setshowLoader(false);
            setSearchContent([]);
            setSeasonList([]);
          } else {
            setshowLoader(false);
            data.forEach((item) => {
              if (item.ContentCode !== content.value) return;
              const SeasonNo = item.SeasonNo;
              // If the ContentCode is not yet in the map, add it
              if (!uniqueValues.has(SeasonNo)) {
                uniqueValues.set(SeasonNo, SeasonNo);
              }
            });
            setSearchContent(data);
          }
          const res = Array.from(uniqueValues, ([value, label]) => ({
            value,
            label,
          }));

          setSeasonList(res);
        });
      setshowLoader(false);
    } else {
      SearchContent.forEach((item) => {
        if (item.ContentCode !== content.value) return;
        const SeasonNo = item.SeasonNo;
        // If the ContentCode is not yet in the map, add it
        if (!uniqueValues.has(SeasonNo)) {
          uniqueValues.set(SeasonNo, SeasonNo);
        }
      });
      const res = Array.from(uniqueValues, ([value, label]) => ({
        value,
        label,
      }));
      setSeasonList(res);
      setshowLoader(false);
    }
  };

  const handlesetSeason = async (content, season) => {
    const uniqueValues = new Map();

    if (SearchContent == null) {
      apiGetUSP_PG_FPC_Get_Content(
        '0',
        objChannel.LocationCode,
        objChannel.ChannelCode,
        SelectedDate,
        content.label,
        token,
      )
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            if (item.ContentCode !== content.value) return;

            if (item.SeasonNo !== season.value) return;

            const EpisodeNo = item.EpisodeNo;

            // If the ContentCode is not yet in the map, add it
            if (!uniqueValues.has(EpisodeNo)) {
              uniqueValues.set(EpisodeNo, EpisodeNo);
            }
          });
          const res = Array.from(uniqueValues, ([value, label]) => ({
            value,
            label,
          }));
          setEpisode(res);
        });
    } else {
      SearchContent.forEach((item) => {
        if (item.ContentCode !== content.value) return;

        if (item.SeasonNo !== season.value) return;

        const EpisodeNo = item.EpisodeNo;

        // If the ContentCode is not yet in the map, add it
        if (!uniqueValues.has(EpisodeNo)) {
          uniqueValues.set(EpisodeNo, EpisodeNo);
        }
      });
      const res = Array.from(uniqueValues, ([value, label]) => ({
        value,
        label,
      }));
      setEpisode(res);
    }
  };

  const ModifyContent = async () => {
    const fil = ContentList.filter(
      (item) =>
        item.ContentCode == SelContent.value ||
        item.ContentCode == SelContent.ContentCode,
    );
    // if (Number(Slotduration) < fil[0]?.SlotDuration) {
    //   openNotification(
    //     'info',
    //     ` Slot Duration is not less then Content Duration (${fil[0].SlotDuration})`,
    //   );
    //   return;
    // }
    if (Slotduration == null || Slotduration == 0 || Slotduration == '') {
      openNotification('info', 'Kindly Enter Duration!');
      return;
    }

    if (SelSeason === null || SelSeason === 0) {
      openNotification('info', 'Please select Season!');
      return;
    }
    if (SelEpisode === null || SelEpisode === 0) {
      openNotification('info', 'Please select Episode!');
      return;
    }
    // SeasonNo;
    // EpisodeNo;
    const filteredArray = SearchContent.filter(
      (item) =>
        item.ContentCode == (SelContent.value || SelContent.ContentCode) &&
        item.SeasonNo == SelSeason.value &&
        item.EpisodeNo == SelEpisode.value,
    );

    console.log('filteredArray:', filteredArray);
    //if you want copy of data use this message from akash//

    let isAlreadySchdule = data10.filter(
      (item) =>
        item.ContentCode == (SelContent.value || SelContent.ContentCode) &&
        item.SeasonNo == SelSeason.value &&
        item.EpisodeNo == SelEpisode.value,
    );
    if (btnMode === 'Modify') {
      isAlreadySchdule = [];
    }

    if (isAlreadySchdule.length > 0) {
      openNotification('warning', 'Event Already Schdule For This Date');
    }
    let ORG_REP = '';
    let OriginalRepeatCode = 0;
    console.log('isAlreadySchdule', isAlreadySchdule);
    console.log('isAlreadySchdule.length', isAlreadySchdule.length);
    console.log('btnMode', btnMode, '..', filteredArray.length);
    console.log(
      'ilteredArray.OriginalRepeatCode',
      filteredArray[0].OriginalRepeatCode,
    );

    if (isAlreadySchdule.length > 0) {
      ORG_REP = 'REP';
      OriginalRepeatCode = 2;
    } else if (isAlreadySchdule.length > 0 && btnMode == 'ADD') {
      ORG_REP = 'REP';
      OriginalRepeatCode = 2;
    } else if (
      filteredArray.length > 0 &&
      filteredArray[0].OriginalRepeatCode == 'REP'
    ) {
      ORG_REP = 'REP';
      OriginalRepeatCode = 2;
    } else {
      ORG_REP = 'ORG';
      OriginalRepeatCode = 1;
    }

    if (filteredArray.length > 0) {
    } else {
      filteredArray.push(...isAlreadySchdule);
    }

    const editedData = {
      RowNumber: 1,
      ContentCode: filteredArray[0]?.ContentCode,
      ContentName: filteredArray[0]?.ContentName,
      SlotDuration: Slotduration,
      EpisodeNo: filteredArray[0]?.EpisodeNo,
      SeasonNo: filteredArray[0]?.SeasonNo,
      status: ORG_REP,
      Genre: filteredArray[0]?.Genre,
      HouseID: '',
      StartTime: '00:00',
      EndTime: '00:00',
      ActualDuration: '00',
      BreakPattern: BreakPattSelect.label || '',
      BreakPatternCode: BreakPattSelect.value || null,
      LocationCode: objChannel.LocationCode,
      ChannelCode: objChannel.ChannelCode,
      TelecastDate: SelectedDate,
      EpisodeSpecific: filteredArray[0]?.EpisodeSpecific,
      Id: data10.length + 1,
      OriginalRepeatCode: OriginalRepeatCode,
      ChannelTimeDescription: '',
      TimeCategoryEndTime: '',
      TimeCategoryStartTime: '',
      RowNumber: data10?.length == 0 ? 1 : data10?.length + 1,
      MinDiff: 0,
      IsRecorded: filteredArray[0]?.IsRecorded,
      ContentTypeCode: filteredArray[0]?.ContentTypeCode,
      ContentTypeName: filteredArray[0]?.ContentTypeName,
    };
    if (data10.length !== 0) {
      // delete editedData.RowNumber;
    }
    console.log('btnMode66', editedData);
    console.log('btnMode88', SelectedRow);
    console.log('btnMode90', data10);
    let selectedIndex = 0;

    let updatedData = data10.filter((row) => row.Id === row.Id);
    console.log('updatedData', updatedData);
    let RefRow = [];
    if (btnMode === btnMode) {
      if (!SelectedRow) {
        RefRow.push(updatedData[updatedData.length - 1]);
      } else {
        RefRow.push(SelectedRow);
      }
      console.log('RefRow', RefRow);
      if (RefRow[0]) {
        editedData.LocationCode = RefRow[0].LocationCode;
        editedData.ChannelCode = RefRow[0].ChannelCode;
        editedData.ChannelTimeDescription = RefRow[0].ChannelTimeDescription;
        editedData.Consumption = RefRow[0].Consumption;
        editedData.TimeCategoryEndTime = RefRow[0].TimeCategoryEndTime;
        editedData.TimeCategoryStartTime = RefRow[0].TimeCategoryStartTime;
        editedData.RowNumber = RefRow[0].RowNumber + 1;
        editedData.MinDiff = RefRow[0].MinDiff;
        console.log('btnMode', btnMode);
        if (upperCase(btnMode) === 'ADD') {
          selectedIndex = updatedData.findIndex(
            (row) => row.Id === RefRow[0].Id,
          );
          for (let i = selectedIndex + 1; i < updatedData.length; i++) {
            updatedData[i].RowNumber = updatedData[i].RowNumber + 1;
          }
          updatedData.push(editedData);
        } else {
          console.log('btnMode1', btnMode);
          selectedIndex = updatedData.findIndex(
            (row) => row.Id === RefRow[0].Id,
          );

          updatedData[selectedIndex] = editedData;
        }
      } else {
        updatedData.push(editedData);
      }
    }

    const filteredData = updatedData.filter(
      (entry) => entry.ContentCode !== null && entry.ContentCode !== '',
    );
    var updt = handleStartTimeChange(0, ChannelStartTime, filteredData);
    console.log('updtupdt', updt);
    setdata10((prevData) => {
      const dt = [...updt];
      const groupedData = groupBy(
        dt,
        'TimeCategoryStartTime',
        'TimeCategoryEndTime',
      );
      const updatedDatax = updateConsumption(groupedData);
      return updatedDatax;
    });
    setVisible(false);
    setSearchContentText('');
    setSelContent({ value: null, label: 'Please Select Content' });
    setSelSeason(null);
    setSelEpisode(null);
    setSearchContent(null);
    setSlotduration('');
    setBreakPattSelect({});
  };

  const FooterContent = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'end' }} className="mt-5">
        <Button
          variant="solid"
          type="button"
          className="btnEdit mr-2"
          size="sm"
          icon={
            btnMode === 'ADD' ? <HiOutlinePlusCircle /> : <HiOutlinePencil />
          }
          onClick={() => ModifyContent()}
        >
          {btnMode}
        </Button>
        <Button
          type="button"
          className="btnEdit"
          size="sm"
          onClick={() => {
            setVisible(false);
            setSearchContentText('');
            setSelContent({ value: null, label: 'Please Select Content' });
            setSelSeason(null);
            setSelEpisode(null);
            setSlotduration('');
            setSearchContent(null);
            setBreakPattSelect({});
          }}
        >
          Cancel
        </Button>
      </div>
    );
  };

  /// SAVE AS FPC
  const handleCheckboxChange = (newValues) => {
    setSelectedWeekdays(newValues);
  };

  const handleSaveASFPC = async () => {
    const editedData = {
      FromDate: formatStartDate(startDate),
      ToDate: formatStartDate(endDate),
      selectedWeekdays: SaveAsvisibleDays ? Days : selectedWeekdays,
      LocationCode: objChannel.LocationCode,
      ChannelCode: objChannel.ChannelCode,
      TelecastDate: SelectedDate,
    };
    if (!SaveAsvisibleDays) {
      try {
        const resp = await PostFPCSaveAs(editedData, token);
        if (resp.data.code === '200') {
          openNotification('success', 'FPC Saved successfully');
          navigate('/fpcmaster');
          setVisible2(false);
          setSaveAsvisible(false);
          setSaveAsvisibleDays(false);
          return;
        } else {
          openNotification('danger', 'FPC Did Not Saved');
          setVisible2(false);
          setSaveAsvisible(false);
          setSaveAsvisibleDays(false);
          return;
        }
      } catch (error) {
        openNotification('danger', 'FPC Did Not Saved');
        setVisible2(false);
        setSaveAsvisible(false);
        setSaveAsvisibleDays(false);
      }
    } else {
      try {
        const resp = await PostFPCSaveAs2(editedData, token);
        if (resp.data.code === '200') {
          openNotification('success', 'FPC Saved successfully');
          navigate('/fpcmaster');
          setVisible2(false);
          setSaveAsvisible(false);
          setSaveAsvisibleDays(false);
          return;
        } else {
          openNotification('danger', 'FPC Did Not Saved');
          setVisible2(false);
          setSaveAsvisible(false);
          setSaveAsvisibleDays(false);
          return;
        }
      } catch (error) {
        openNotification('danger', 'FPC Did Not Saved');
        setVisible2(false);
        setSaveAsvisible(false);
        setSaveAsvisibleDays(false);
      }
    }
  };

  const SaveAsfooterContent = () => {
    return (
      <div className="mt-5">
        <Button
          variant="solid"
          type="button"
          className="btnEdit"
          size="sm"
          icon={<AiOutlineSave />}
          onClick={() => setVisible2(true)}
        >
          Save
        </Button>
        {/* <Button
                variant="solid"
                type="button"
                className="btnEdit"
                size="sm"
                icon={<HiOutlineTrash />}
            //onClick={setVisible(false)}
            >
                Cancel
            </Button> */}
      </div>
    );
  };

  const exportExcel = () => {
    const visibleColumns = [
      'StartTime',
      'EndTime',
      'ContentName',
      'SlotDuration',
      'status',
      'HouseID',
      'SeasonNo',
      'EpisodeNo',
    ];

    ExportXls(
      data10,
      'FPC-' + objChannel.label + '-' + SelectedDate,
      visibleColumns,
    );
  };

  const [DailyFPCdialogVisible, setDailyFPCDialogVisible] = useState(false);

  // DAily FPC END

  const setReOrder = (reorderEvent) => {
    const { value: reorderedRows, dragIndex, dropIndex } = reorderEvent;

    reorderedRows[dragIndex].ChannelTimeDescription =
      data10[dropIndex].ChannelTimeDescription;
    reorderedRows[dragIndex].TimeCategoryStartTime =
      data10[dropIndex].TimeCategoryStartTime;
    reorderedRows[dragIndex].TimeCategoryEndTime =
      data10[dropIndex].TimeCategoryEndTime;
    reorderedRows[dragIndex].MinDiff = data10[dropIndex].MinDiff;
    const updatedData = reorderedRows.map((item, index) => ({
      ...item,
      RowNumber: index + 1,
    }));

    var updt = handleStartTimeChange(0, ChannelStartTime, updatedData);
    setdata10(updt);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const SelTelecastDate = queryParams.get('dt');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogIsOpen, setdialogIsOpen] = useState(false);
  const [ConfirmCheck, setConfirmCheck] = useState(false);
  const [DialogContentS, setDialogContentS] = useState(false);
  const maxUpload = 1;
  const beforeUpload = async (files, fileList) => {
    const allowedFileType = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const invalidFileTypeMessage = 'Please upload an XLSX file!';
    if (fileList.length >= maxUpload) {
      return `You can only upload ${maxUpload} file(s)`;
    }
    const selectedFile = files[0];

    if (!allowedFileType.includes(selectedFile.type)) {
      return invalidFileTypeMessage;
    }

    setSelectedFile(selectedFile);
  };

  const openDialog = () => {
    setdialogIsOpen(true);
    setFpcimportdata([]);
  };

  const onDialogClose = (e) => {
    setdialogIsOpen(false);
  };
  const Channel = useSelector((state) => state.locale.selectedChannel);

  useEffect(() => {
    dispatch(setContent(''));
    dispatch(setContentSeg(''));
    dispatch(SetMAXSegment(''));
    const fetchChannelStartTime = async () => {
      try {
        const reps = await apiCallstoreprocedure('GetChannelStartTime', {
          par_LocationCode: Channel.LocationCode,
          par_ChannelCode: Channel.ChannelCode,
        });
        if (reps.data && reps.data.length > 0) {
          const startTime = reps.data[0].StartTime;
          if (typeof startTime === 'string') {
            setChannelStartTime(startTime.substring(0, 5));
          } else {
            openNotification(
              'danger',
              'Selected Channel Settings details Not Found.',
            );
          }
        } else {
          openNotification(
            'danger',
            'Selected Channel Settings details Not Found.',
          );
        }
      } catch (error) {
        openNotification(
          'danger',
          'Selected Channel Settings details Not Found.',
        );
      }
    };

    fetchChannelStartTime();
  }, [Channel]);

  const onDialogOKAI = async () => {
    // Replace with your actual authentication token

    const headersList = {
      Accept: '*/*',
      Authorization: `Bearer ${token}`,
    };

    const bodyContent = new FormData();

    // Convert binary data to a string
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = event.target.result;
      const blob = new Blob([arrayBuffer], { type: selectedFile.type });
      bodyContent.append('file', blob, selectedFile.name);

      // Now you can make the API call
      try {
        fetch(
          appConfig.apiPrefix +
          `/fpcmaster/upload/?LocationCode=${Channel.LocationCode}&ChannelCode=${Channel.ChannelCode}&TelecastDate=${SelTelecastDate}`,
          {
            method: 'POST',
            body: bodyContent,
            headers: headersList,
          },
        )
          .then((response) => response.json())
          .then((data) => {
            setFpcimportdata(data);
          })
          .catch((error) => { });
      } catch (error) { }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const [arr, setarr] = useState([]);
  useEffect(() => {
    (async (values) => {
      const resp = await apiGetfpcorgrepmaster(values);
      setarr(resp.data);
    })();
  }, []);

  const resp = (rowdata) => {
    if (rowdata.IsRecorded === 1 && rowdata.status == 'ORG') {
      return `bg-yellow-300`;
    }

    if (SelectedRow) {
      if (SelectedRow.Id == rowdata.Id) {
        return `bg-blue-400`;
      }
    }

    const rep = arr.filter((item) => item.ShortName == rowdata.status);
    return `bg-${rep[0]?.NewColourCode}`;
  };
  const withIcon = (component) => {
    return <div className="text-lg">{component}</div>;
  };
  const [checked, setChecked] = useState(false);

  const onSwitcherToggle = (val) => {
    setChecked(!val);
  };

  const getGenreOptions = (content) => {
    try {
      let quickFilterOptions = Array.from(
        new Set(content.map((item) => item.ContentType.ContentTypeName)),
      ).map((genre) => {
        return { value: genre, label: genre.toUpperCase() };
      });
      return quickFilterOptions;
    } catch (error) {
      throw error;
    }
  };

  const closeDialogBoxContract = useCallback(() => {
    setisContractPopup(false);
  }, []);

  const rediredctContract = useCallback(() => {
    dispatch(setContent(Content.Data))
    navigate('/ContentContractEdit');
  }, []);

  const isvisible = useCallback(() => {
    setVisible(false);
    setSearchContentText('');
    setSelContent({ value: null, label: 'Please Select Content' });
    setSelSeason(null);
    setSelEpisode(null);
    setSlotduration('');
    setBreakPattSelect({});
  }, []);


  const headerExtraContent = (
    <span className="flex items-center">
      <Button icon={<FaExternalLinkAlt />} size='sm' variant='solid' onClick={rediredctContract}>Check Contract</Button>
    </span>
  )

  return (
    <>
      <ContractShowDialog Content={Content} isContractPopup={isContractPopup} closeDialogBoxContract={closeDialogBoxContract} headerExtraContent={headerExtraContent} />
      <Loader showLoader={showLoader} />
      <HeaderTemplate />

      <div className="grid grid-cols-12 gap-1 p-0">
        <div className="col-span-11 p-0">
          <div className="card p-0">
            <div className="datatable-container">
              <DataTable
                style={{ background: 'transparent' }}
                value={data10}
                rowGroupMode="subheader"
                groupRowsBy="ChannelTimeDescription"
                sortMode="single"
                sortField="RowNumber"
                sortOrder={1}
                resizableColumns
                showGridlines
                reorderableRows
                expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                onRowReorder={setReOrder}
                selectionMode="single"
                onSelectionChange={(e) => {
                  console.log('onSelectionChange', e);
                  setSelectedRow(e.value);
                }}
                tableStyle={{
                  minWidth: '5rem',
                }}
                className="custom-row-height"
                rowClassName={(rowData) => {
                  return resp(rowData);
                  // return rowData.;
                }}
              >
                <Column
                  rowReorder
                  style={{
                    width: '3rem',
                    paddingLeft: 15,
                    color: 'black',
                  }}
                />
                <Column
                  field="StartTime"
                  header="Start Time"
                  headerStyle={{
                    textAlign: 'center',
                  }}
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                    width: '7px',
                  }}
                  body={StartTimeTemplate}
                ></Column>
                <Column
                  field="EndTime"
                  header="End Time"
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                    width: '7px',
                  }}
                  body={EndTimeTemplate}
                ></Column>
                <Column
                  field="ContentName"
                  header="Content "
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                  }}
                  body={ShowContentAndLicenseIcon}
                ></Column>

                <Column
                  field="SlotDuration"
                  header="Dur[Min]"
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                    width: '10px',
                  }}
                ></Column>

                <Column
                  field="status"
                  header="Org/Rep"
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                    width: '10px',
                  }}
                  body={statusBodyTemplate}
                ></Column>
                {/* <Column field="HouseID" header="HouseId" bodyStyle={{ textAlign: 'center',color:'black' }} ></Column> */}
                <Column
                  field="SeasonNo"
                  header="Season & Episode"
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                    width: '10px',
                  }}
                  body={Season_and_Episode}
                ></Column>
                {/* <Column
                  field="EpisodeNo"
                  header="Episode"
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                  }}
                ></Column> */}
                <Column
                  field="BreakPattern"
                  header="Pattern"
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                  }}
                ></Column>
                <Column
                  header="Action"
                  headerStyle={{
                    width: '8rem',
                    textAlign: 'center',
                  }}
                  bodyStyle={{
                    textAlign: 'center',
                    color: 'black',
                    overflow: 'visible',
                  }}
                  body={(rowData) => actionBodyTemplate(rowData)}
                />
              </DataTable>
            </div>

            <Dialog
              isOpen={visible}
              className="z-50"
              onClose={isvisible}
              width={600}
            >
              <div className="flex  justify-between items-center mb-5">
                <h3 className="dark:text-blue-400">{SelContent.ContentName}</h3>
                <div className="text-end">
                  <h6 className="ml-2  dark:text-orange-400">
                    Dur: {SelContent.SlotDuration} Min
                  </h6>
                  <p className="flex items-center">
                    Show Break Pattern
                    <Switcher
                      checked={checked}
                      onChange={onSwitcherToggle}
                      className="ml-2"
                      unCheckedContent={withIcon(<PiLinkBreakThin />)}
                      checkedContent={withIcon(<PiLinkBreakBold />)}
                    />
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                <div className="col-span-6">
                  <div className="flex mb-2">
                    <h6>
                      Insert Start Time -{' '}
                      {SelectedRow == null
                        ? data10[Number(data10.length) - 1]?.StartTime
                        : SelectedRow?.StartTime}
                    </h6>
                  </div>
                </div>
                {EpisodeList.length == 1 ? null : (
                  <div className="col-span-1">
                    <FormItemcompact
                      asterisk
                      label="Season"
                      style={{
                        width: '250px',
                      }}
                    >
                      <Select
                        options={SeasonList}
                        isDisabled={EpisodeList.length == 1}
                        value={SeasonList.find(
                          (option) => option.value === SelSeason,
                        )}
                        defaultValue={SelSeason}
                        onChange={(value) => {
                          setSelSeason(value);
                          // handlesetSeason(SelContent, value);
                        }}
                      />
                    </FormItemcompact>
                  </div>
                )}
                {EpisodeList.length == 1 ? null : (
                  <div className="col-span-1">
                    <FormItemcompact
                      asterisk
                      label="Episode"
                      style={{
                        width: '250px',
                      }}
                    >
                      <Select
                        options={EpisodeList}
                        isDisabled={EpisodeList.length == 1}
                        value={EpisodeList.find(
                          (option) => option.value === SelEpisode,
                        )}
                        defaultValue={SelEpisode}
                        onChange={(value) => setSelEpisode(value)}
                      />
                    </FormItemcompact>
                  </div>
                )}
                <div className="col-span-1">
                  <FormItemcompact
                    asterisk
                    label="Slot(Min)"
                    style={{
                      width: '250px',
                    }}
                  >
                    <Input
                      value={Slotduration}
                      size="sm"
                      onChange={(event) => {
                        const regex = /^[0-9]*$/;
                        const input = event.target.value;

                        if (
                          regex.test(input) &&
                          (input === '' || Number(input) <= 400)
                        ) {
                          setSlotduration(input); // Set the state as string to handle empty input
                        }
                      }}
                    />
                  </FormItemcompact>
                </div>
                {checked && (
                  <div className="col-span-3">
                    <FormItemcompact
                      label="Break Pattern"
                      style={{
                        width: '250px',
                      }}
                    >
                      <Select
                        placeholder="Select a Pattern"
                        options={Pattern}
                        value={Pattern.find(
                          (option) => option.value === BreakPattSelect.value,
                        )}
                        onChange={(value) => setBreakPattSelect(value)}
                      />
                    </FormItemcompact>
                  </div>
                )}
              </div>
              <FooterContent />
            </Dialog>

            <Dialog
              width={600}
              isOpen={SaveAsvisible}
              onClose={() => setSaveAsvisible(false)}
            >
              <h3 className="mb-5">FPC SaveAs Date Wise</h3>
              <div className="grid grid-cols-6 md:grid-cols-6 gap-1">
                <div className="col-span-6">
                  <label>Date Range</label>
                </div>
                <div className="col-span-6">
                  <DatePickerRange
                    minDate={new Date()}
                    value={[startDate, endDate]}
                    onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                  />
                </div>
              </div>
              <SaveAsfooterContent />
            </Dialog>
            <Dialog
              width={600}
              isOpen={SaveAsvisibleDays}
              onClose={() => setSaveAsvisibleDays(false)}
            >
              <h3 className="mb-5">FPC SaveAs Day Wise</h3>
              <div className="grid grid-cols-6 md:grid-cols-6 gap-1">
                <div className="col-span-6">
                  <label>Date Range</label>
                </div>
                <div className="col-span-6">
                  <DatePickerRange
                    minDate={new Date()}
                    value={[startDate, endDate]}
                    onChange={handleDateChange}
                    inputFormat={dateFormat}
                    size="sm"
                  />
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-6   mt-6">
                  <Checkbox.Group
                    value={selectedWeekdays}
                    onChange={handleCheckboxChange}
                  >
                    <Checkbox value="6">SU</Checkbox>
                    <Checkbox value="0">MO </Checkbox>
                    <Checkbox value="1">TU</Checkbox>
                    <Checkbox value="2">WS</Checkbox>
                    <Checkbox value="3">TH</Checkbox>
                    <Checkbox value="4">FR</Checkbox>
                    <Checkbox value="5">SA</Checkbox>
                  </Checkbox.Group>
                </div>
              </div>
              <div className="mt-5">
                <Button
                  variant="solid"
                  type="button"
                  className="btnEdit"
                  size="sm"
                  icon={<AiOutlineSave />}
                  onClick={() => setVisible2(true)}
                >
                  Save
                </Button>
              </div>
            </Dialog>
            <Dialog
              isOpen={visible2}
              onClose={() => setVisible2(false)}
              onRequestClose={() => setVisible2(false)}
            >
              <h5 className="mb-4">Confirm?</h5>
              <p>
                Are you sure want to Save As FPC for{' '}
                {formatDateToDDMMMYYYY(startDate)} to{' '}
                {formatDateToDDMMMYYYY(endDate)} ?
              </p>
              <div className="text-right mt-6">
                <Button
                  onClick={() => setVisible2(false)}
                  size="sm"
                  className="mr-2"
                >
                  No
                </Button>

                <Button variant="solid" onClick={accept2} size="sm">
                  Yes
                </Button>
              </div>
            </Dialog>
            <Dialog
              isOpen={DailyFPCdialogVisible}
              width={1200}
              height={600}
              onClose={() => setDailyFPCDialogVisible(false)}
            >
              <h4 className="mb-4">FPC Verify</h4>
              <div className="">
                <DailyFPCApp
                  data={data}
                  setdata={setdata}
                  LocationCode={objChannel.LocationCode}
                  ChannelCode={objChannel.ChannelCode}
                  SelectedDate={SelectedDate}
                  emptySegmentData={emptySegmentData}
                  setemptySegmentData={setemptySegmentData}
                ></DailyFPCApp>
              </div>
              <Button
                label="Save"
                variant="solid"
                size="sm"
                className="mt-6"
                onClick={() => {
                  apexBarChar(data, false);
                }}
              >
                Save
              </Button>
            </Dialog>
          </div>
        </div>

        <div
          className="col-span-1  flex justify-center"
        // style={{ border: '1px solid red' }}
        >
          <div>
            <div>
              <Tooltip title="Insert" placement="top">
                <Button
                  name="insert"
                  size="sm"
                  onClick={() => {
                    setbtnMode('ADD');
                    setDialogContentS(true);
                  }}
                  className="mb-1 mr-1"
                  icon={<HiOutlinePlusCircle />}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="SaveAs FPC Date" placement="top">
                <Button
                  size="sm"
                  onClick={() => showSaveAs('center')}
                  className="mb-1 mr-1"
                  icon={<BsCalendarDate />}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="SaveAs FPC Days" placement="top">
                <Button
                  size="sm"
                  onClick={() => setSaveAsvisibleDays(true)}
                  className="mb-1 mr-1"
                  icon={<LuCalendarDays />}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Export Excel" placement="top">
                <Button
                  size="sm"
                  className="mb-1 mr-1"
                  onClick={() => exportExcel()}
                  icon={<HiOutlineDownload />}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="FPC Verify" placement="top">
                <Button
                  size="sm"
                  className="mb-1 mr-1"
                  onClick={() => setDailyFPCDialogVisible(true)}
                  icon={<HiOutlineClipboardCheck />}
                  disabled={!isFPCAllowedToEdit}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Download Import Template" placement="top">
                <Button
                  size="sm"
                  className="mb-1 mr-1"
                  onClick={() => DonwloadFPCImport()}
                  icon={<HiOutlineCalendar />}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Import" placement="top">
                <Button
                  name="insert"
                  size="sm"
                  onClick={() => openDialog()}
                  className="mb-1 mr-1"
                  icon={<HiOutlinePlusCircle />}
                ></Button>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Delete Created FPC" placement="top">
                <Button
                  size="sm"
                  className="mb-1 mr-1"
                  onClick={() => setConfirmCheck(true)}
                  icon={<HiOutlineTrash />}
                ></Button>
              </Tooltip>
            </div>
          </div>
          <Dialog
            isOpen={ConfirmCheck}
            onClose={() => setConfirmCheck(false)}
            onRequestClose={() => setConfirmCheck(false)}
          >
            <h4>Do you really want to delete the FPC that was created?</h4>
            <div className="text-right mt-6">
              <Button
                className="ltr:mr-2 rtl:ml-2"
                variant="plain"
                onClick={() => setConfirmCheck(false)}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                onClick={() => {
                  setdata10([]);
                  setConfirmCheck(false);
                }}
              >
                OK
              </Button>
            </div>
          </Dialog>
          <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
          >
            {fpcimportdata.length <= 0 && (
              <>
                <Upload
                  beforeUpload={beforeUpload}
                  uploadLimit={maxUpload}
                  tip={<p className="mt-2">XLSX only</p>}
                >
                  <Button variant="solid" icon={<HiOutlineCloudUpload />}>
                    Upload your file
                  </Button>
                </Upload>
                <div className="text-right mt-6">
                  <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={onDialogClose}
                  >
                    Cancel
                  </Button>
                  <Button variant="solid" onClick={onDialogOKAI}>
                    OK
                  </Button>
                </div>
              </>
            )}
            <br></br>
            <br></br>
            {fpcimportdata.length > 0 && (
              <div
                style={{
                  height: 'auto',
                  minHeight: '100px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <Table compact>
                  <THead>
                    <Tr>
                      {FpcErrorheaders.map((header, index) => (
                        <Th key={index}>{header}</Th>
                      ))}
                    </Tr>
                  </THead>
                  <TBody>
                    {fpcimportdata.map((e, index) => (
                      <Tr key={index} style={{ border: '1px solid #E3E5EB' }}>
                        <Td style={{ border: '1px solid #E3E5EB' }}>
                          {e.StartTime}
                        </Td>
                        <Td style={{ border: '1px solid #E3E5EB' }}>
                          {e.ContentName}
                        </Td>

                        <Td style={{ border: '1px solid #E3E5EB' }}>
                          {e.Remark}
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
              </div>
            )}
          </Dialog>
        </div>
        <Dialog
          isOpen={Dialogbox}
          width={1000}
          onClose={() => setDialogbox(false)}
          onRequestClose={() => setDialogbox(false)}
        >
          <div className="w-full h-full grid grid-cols-2 gap-1">
            <div>
              <div className="flex items-center mt-5">
                <Avatar size="sm" src="FAV.png" />
                <h6
                  className="ml-2 "
                  style={{ letterSpacing: 6, color: 'rgb(127, 132, 138)' }}
                >
                  {dialogImage.ContentClassification?.ClassificationCode == 1
                    ? 'SERIES'
                    : 'Movie'}
                </h6>
              </div>
              <h1 className="mt-10 font-outfit  font-medium ">
                {dialogImage?.ContentName}
              </h1>
              <div className="flex mt-5 ml-1">
                <h6 className="mr-1">
                  {Math.floor(dialogImage?.SlotDuration / 60)}Hr
                </h6>
                <h6>{dialogImage?.SlotDuration % 60}Min</h6>
              </div>
              <div className="flex mt-5">
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
                  {dialogImage.View?.ViewName}
                </div>
              </div>

              <div className="flex mt-5">
                <p
                  className=" font-outfit  font-medium mr-2"
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
                  {dialogImage.GenreMaster?.GenreName}
                </p>
                <p
                  className=" font-outfit  font-medium"
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
                  {dialogImage.SubGenreMaster?.SubGenreName}
                </p>
              </div>
              <h3 className="mt-7 font-outfit font-extrabold"> Synopsis</h3>
              <h6 className="mt-2 font-outfit  font-medium">
                {dialogImage?.Synopsis}
              </h6>
            </div>
            <div
              className="flex justify-center items-center"
            // style={{ border: '1px solid red' }}
            >
              {dialogImage.Content_Image ? (
                <img
                  src={dialogImage?.Content_Image}
                  style={{
                    aspectRatio: '3/2',
                    objectFit: 'contain',
                    height: 450,
                    width: 450,
                  }} // Handle click event to open dialog
                />
              ) : (
                <img
                  src={'/img/3204121.jpg'}
                  style={{
                    aspectRatio: '3/2',
                    objectFit: 'contain',
                    height: 450,
                    width: 450,
                  }} // Handle click event to open dialog
                />
              )}
            </div>
          </div>
        </Dialog>
        <Dialog
          isOpen={DialogContentS}
          width={1200}
          className="z-10"
          height={'95%'}
          onClose={() => setDialogContentS(false)}
          onRequestClose={() => setDialogContentS(false)}
          contentClassName="my-4 flex flex-col"
        >
          <div className="flex justify-between items-center mr-3">
            <h4>Search Content</h4>
            <Input
              size="sm"
              prefix={<HiOutlineSearch className="text-lg" />}
              placeHolder="Search Content"
              onChange={(e) => setSearchContentText(e.target.value)}
              className="w-[30%]"
            />
          </div>
          <div className="flex justify-between items-center gap-2 mt-3 mb-4 mr-3">
            <div className="flex gap-2 grow">
              {SelectedRow !== null && (
                <div
                  className="flex items-center h-full p-2 border border-gray-700 rounded bg-teal-900 hover:cursor-not-allowed"
                  style={{ textWrap: 'nowrap' }}
                >
                  <p className="dark:!text-white text-black ">
                    <span>Insert Start Time - </span>
                    <span className="font-bold">{SelectedRow?.StartTime}</span>
                  </p>
                </div>
              )}
              <Select
                size="sm"
                placeholder="License"
                className="min-w-[20%] max-w-20%]"
                options={LICENCE_OPTIONS}
                value={selectedLicence}
                onChange={(value) => setSelectedLicence(value)}
              />
              <Select
                isMulti
                size="sm"
                placeholder="Genre"
                className="min-w-[30%] max-w-full"
                options={genreOptions}
                value={selectedGeneres}
                onChange={(value) => setSelectedGeneres(value)}
              />
            </div>
            <div className=" w-[30%] flex items-center">
              <span className="dark:!text-white text-black ">
                {slotDurationValue[0]} Min
              </span>
              {maxSlotDuration != null && (
                <Slider
                  value={slotDurationValue}
                  onChange={(e) => {
                    if (e.value[0] > e.value[1]) {
                      setSlotDurationValue([e.value[1], e.value[0]]);
                    } else {
                      setSlotDurationValue(e.value);
                    }
                  }}
                  min={minSlotDuration}
                  max={maxSlotDuration}
                  range
                  className="w-[180px] mx-3"
                />
              )}
              <span className="dark:!text-white text-black ">
                {slotDurationValue[1]} Min
              </span>
            </div>
          </div>
          <div className="grow grid grid-cols-2 gap-2 auto-rows-max mr-3 overflow-auto pr-2">
            {ContentList.filter((item) =>
              item.ContentName?.toLowerCase().includes(
                searchContentText.toLowerCase(),
              ),
            ).map((item, index) => (
              <div
                key={index}
                className="dark:!border-b dark:!border-[#484545] border-b border-[#49484857] pb-2"
              >
                <div className="bgp">
                  <div className="flex ">
                    <div>
                      <img
                        src={item.Content_Image}
                        alt="No Image Found"
                        className="rounded-lg hover:rounded-t-lg"
                        style={{ height: 100, width: 70 }}
                      />
                    </div>
                    <div className="grow">
                      <div className="flex items-center justify-between">
                        <p className=" dark:!text-white text-black  font-semibold px-4 capitalize">
                          {index + 1}. {item.ContentName}
                        </p>
                        <div className="flex gap-3 items-center">
                          {item.ContentContractDetails.length > 0 && (
                            <Tooltip title="Content Acquisition">
                              <Button
                                icon={
                                  <GrCertificate className="text-lg text-gray-200" />
                                }
                                size="xs"
                                shape="circle"
                                onClick={() =>
                                  APIHIT(item.ContentContractDetails[0].id)
                                }
                              />
                            </Tooltip>
                          )}
                          <Button
                            size="xs"
                            shape="circle"
                            icon={<MdOutlineAdd />}
                            onClick={() => {
                              AddContent(item.ContentName);
                              setSelContent(item);
                              setSlotduration(item.SlotDuration);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <p className="px-4 capitalize">

                          {new Date(item.FPCReleaseDate)?.getFullYear()}
                        </p>
                        <div
                          className="flex items-center text-xs dark:!text-white text-black  mr-2"
                          style={{
                            border: '1px solid #f6e6e61a',
                            padding: '2px 10px',
                            background: '#00000029',
                          }}
                        >
                          {item.View?.ViewName}
                        </div>
                        <p className="text-sm text-blue-400">
                          {item.ContentType.ContentTypeName}
                        </p>
                      </div>
                      <p className="text-sm  text-orange-400 px-4 mt-2">
                        {item.SlotDuration} Min
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-center">
                  <img
                    src={item.Content_Image}
                    alt="No Image Found"
                    className="rounded-lg hover:rounded-t-lg"
                    style={{ height: 180, width: 250 }}
                  />
                </div>

                <div>
                  <div className="text-center mt-2">
                    <p
                      className="dark:!text-white text-black  font-semibold px-4 capitalize"
                      style={{
                        textWrap: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.ContentName}
                    </p>
                  </div>
                  <div className="flex items-center mb-2 justify-center">
                    <div className="flex mr-2">
                      <p className="text-xs">{item.SlotDuration} Min</p>
                    </div>
                    <div
                      className="flex items-center text-xs dark:!text-white text-black  mr-2"
                      style={{
                        border: '1px solid #f6e6e61a',
                        padding: '2px 10px',
                        background: '#00000029',
                      }}
                    >
                      {item.View?.ViewName}
                    </div>

                    <Button
                      size="xs"
                      shape="circle"
                      icon={<MdOutlineAdd />}
                      onClick={() => {
                        AddContent(item.ContentName);
                        setSelContent(item);
                      }}
                    />
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </Dialog>
      </div>
    </>
  );
}
