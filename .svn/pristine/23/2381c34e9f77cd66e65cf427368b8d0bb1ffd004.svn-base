import {
  apiGetCommercialClientBrandwisedrop,
  apiGetCommercialClientBrandwisedrop2,
} from 'services/SalesAdminService';
import {
  RO_CALENDAR_TO_EXCEL_COLUMN_SEQUENCE,
  RO_IMPORT_FILE_ROW_SKIP_THRESHOLD,
} from './constants';
import {
  COMM_OPTIONS_KEY,
  COMM_TITLE_COLUMNS_IN_IMPORTED_FILE,
  DEAL_LINE_NO_OPTIONS_KEY,
  DEAL_LINE_TITLE_COLUMNS_IN_IMPORTED_FILE,
  DEAL_LINE_TYPE_COLUMNS_IN_IMPORTED_FILE,
  DUR_COLUMNS_IN_IMPORTED_FILE,
  DURATION_COLUMN_KEY,
  RATE_COLUMNS_IN_IMPORTED_FILE,
  SEL_COMM_KEY,
  SEL_DEAL_LINE_NO_KEY,
} from './RoImportCalendar/constants';
import {
  convertArrayToExcel,
  getPresentColumn,
} from 'views/Controls/GLOBALFUNACTION';
import { getSpotsTotal } from './RoImportCalendar/utils';

function generateCustomArray(data) {
  return Object.keys(data)
    .filter((key) => key.startsWith('Y')) // Filter only date-related keys
    .map((key) => {
      let [midRaw, commercialId] = key.split('|');
      let mid = midRaw.substring(1); // Extract MID from Yx
      let { date, value } = data[key];
      if (value > 0 && value !== null && value !== undefined) {
        // Ensure valid value
        let newKey = `${mid}|${commercialId}|${date}|${data.MID}|${data.position}`;
        return { [newKey]: `${newKey}|${value}` };
      }
      return null; // Skip invalid entries
    })
    .filter(Boolean); // Remove null values
}

const getCommOptions = async (
  commDur,
  brandCode,
  clientCode,
  locationCode,
  channelCode,
  isNtc,
) => {
  let options = [];
  try {
    let response;
    if (Number(commDur) > 0)
      response = await apiGetCommercialClientBrandwisedrop2(
        { value: brandCode },
        { value: clientCode },
        { DurInSec: commDur },
        locationCode,
        channelCode,
        isNtc,
      );
    else
      response = await apiGetCommercialClientBrandwisedrop(
        brandCode,
        clientCode,
        locationCode,
        channelCode,
        isNtc,
      );
    if (response.status === 200) {
      options = response.data.map((option) => ({
        ...option,
        value: option.CommercialCode,
        label: `${option.VideoID} - ${option.CommercialCaption}`,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    return options;
  }
};

const getDataForRoCalendar = async (
  pdfData,
  formState,
  DealData,
  Channel,
  IsNTCPage,
  DealDataDetails,
) => {
  let result = [];
  if (pdfData.status !== 'success') return result;
  let newTableData = [];
  let durColumn = '';
  let commOptions = {};
  for (let index = 0; index < pdfData.rows.length; index++) {
    const row = pdfData.rows[index];
    const daysObj = row.Days;
    // Get days values from import file
    let days = {};
    let undefinedRowsCount = 0;
    for (let index = 1; index <= 31; index++) {
      if (index in daysObj) days[index] = daysObj[index];
      else undefinedRowsCount++;
      if (undefinedRowsCount === RO_IMPORT_FILE_ROW_SKIP_THRESHOLD) break;
    }
    // Skip row if values not found for given threshold limit
    if (undefinedRowsCount === RO_IMPORT_FILE_ROW_SKIP_THRESHOLD) continue;
    // Get duration column column
    if (!durColumn)
      durColumn = getPresentColumn(daysObj, DUR_COLUMNS_IN_IMPORTED_FILE);
    // Get commercial options for current row
    if (!(`${daysObj[durColumn]}` in commOptions))
      commOptions[`${daysObj[durColumn]}`] = await getCommOptions(
        Number(daysObj[durColumn]) > 0 ? daysObj[durColumn] : 0,
        formState.brand,
        DealData?.ClientCode,
        Channel.LocationCode,
        Channel.ChannelCode,
        IsNTCPage,
      );
    const curRowCommOptions = commOptions[`${daysObj[durColumn]}`];
    const commTitleColumn = getPresentColumn(
      daysObj,
      COMM_TITLE_COLUMNS_IN_IMPORTED_FILE,
    );
    // Get deal line no options for current row
    newTableData.push({
      [DURATION_COLUMN_KEY]:
        Number(daysObj[durColumn]) > 0 ? Number(daysObj[durColumn]) : '-',
      [DEAL_LINE_NO_OPTIONS_KEY]: getDealLineOptions(row.Days, DealDataDetails),
      [SEL_DEAL_LINE_NO_KEY]: undefined,
      [COMM_OPTIONS_KEY]: curRowCommOptions,
      [SEL_COMM_KEY]: curRowCommOptions.filter(
        (option) => option.label === daysObj[commTitleColumn],
      )[0],
      ...days,
    });
  }
  return newTableData;
};

const getDealLineOptions = (row, DealDataDetails) => {
  const titleColumn = getPresentColumn(
    row,
    DEAL_LINE_TITLE_COLUMNS_IN_IMPORTED_FILE,
  );
  const title = row[titleColumn].toLowerCase();
  const rowType = title.includes('rodp')
    ? 'rodp'
    : title.includes('program')
    ? 'program'
    : 'all';

  let dealLineOptions = [];
  if (rowType === 'all') {
    dealLineOptions = DealDataDetails;
  } else {
    const paymentTypeColumn = getPresentColumn(
      row,
      DEAL_LINE_TYPE_COLUMNS_IN_IMPORTED_FILE,
    );
    let paymentType = row[paymentTypeColumn].toLowerCase();
    paymentType = paymentType.includes('paid')
      ? 'paid'
      : paymentType.includes('bonus')
      ? 'bonus'
      : 'all';
    const rateColumn = getPresentColumn(row, RATE_COLUMNS_IN_IMPORTED_FILE);
    let rate = Number(row[rateColumn].toLowerCase());
    dealLineOptions = DealDataDetails.filter(
      (dealLine) =>
        dealLine.DealLineItemTypeName.toLowerCase().includes(rowType) &&
        dealLine.SpotTypeName.toLowerCase().includes(paymentType) &&
        dealLine.Rate === rate,
    );
  }
  dealLineOptions = dealLineOptions.map((dealLine) => ({
    ...dealLine,
    value: dealLine.TimeBandCode,
    label: `${dealLine.DealLineItemNo} | ${dealLine.TimeBandName} | ${dealLine.SpotTypeName}`,
  }));
  return dealLineOptions;
};

const getDataForAddDealLine = async (
  formState,
  DealData,
  Channel,
  IsNTCPage,
  DealDataDetails,
) => {
  // Get days values from import file
  let days = {};
  for (let index = 1; index <= 31; index++) {
    days[index] = '';
  }
  // Get commercial options
  const commOptions = await getCommOptions(
    0,
    formState.brand,
    DealData?.ClientCode,
    Channel.LocationCode,
    Channel.ChannelCode,
    IsNTCPage,
  );
  // Get deal line no options
  const Days = {
    'Program/Time': '',
    'Pmt\nType': '',
  };
  const rowData = {
    [DURATION_COLUMN_KEY]: '-',
    [DEAL_LINE_NO_OPTIONS_KEY]: getDealLineOptions(Days, DealDataDetails),
    [SEL_DEAL_LINE_NO_KEY]: undefined,
    [COMM_OPTIONS_KEY]: commOptions,
    [SEL_COMM_KEY]: undefined,
    ...days,
  };
  return rowData;
};

const isAllFieldsValid = (roCalendarData, month, bookingRefNumber) => {
  let isRoCalendarDataValid = true;
  roCalendarData.forEach((row) => {
    if (!row[SEL_DEAL_LINE_NO_KEY] || !row[SEL_COMM_KEY]) {
      isRoCalendarDataValid = false;
      return;
    }
  });
  return month && bookingRefNumber && isRoCalendarDataValid;
};

const isAllDealLineHaveSpots = (tableData) => {
  let result = true;
  tableData.forEach((row) => {
    if (getSpotsTotal(row) === 0) {
      result = false;
      return;
    }
  });
  return result;
};

const convertRoCalendarDataToExcel = (roCalendarData, brandName) => {
  let convertedData = [];
  roCalendarData.forEach((row) => {
    const days = {};
    for (let index = 1; index <= 31; index++) {
      days[index] = row[index];
    }
    let convertedRow = {
      VIDEOID: row.selComm.VideoID,
      RODP: `${row.selDealLineNo.StartTime.slice(
        0,
        5,
      )}-${row.selDealLineNo.EndTime.slice(0, 5)}`,
      SPOTTYPE: row.selDealLineNo.SpotTypeName.toUpperCase(),
      PROG: '',
      ...days,
      'DEAL ORD': row.selDealLineNo.DealLineItemNo,
      BrandName: brandName,
    };
    convertedData.push(convertedRow);
  });
  return convertArrayToExcel(
    convertedData,
    RO_CALENDAR_TO_EXCEL_COLUMN_SEQUENCE,
    'Ro_Import.xlsx',
    'return',
  );
};

export {
  generateCustomArray,
  getCommOptions,
  getDataForRoCalendar,
  getDataForAddDealLine,
  isAllFieldsValid,
  isAllDealLineHaveSpots,
  convertRoCalendarDataToExcel,
};
