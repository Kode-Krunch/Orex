import { validateComm } from '../commOperations/utils';
import { insertNTCsInTable } from '../ntcOperations/utils';

const {
  rowDataTypesEnum,
  tableTypesEnum,
  additionalRowInfoEnum,
} = require('views/Scheduling/Scheduler/enum');
const {
  getCorrectedDestIndexForIntraTableDrag,
  getTableDataWithAdditionalInfo,
  removeRowsFromTableData,
  getCorrectedDestIndexIfDestIndexIsNtc,
} = require('../../utils');

const getCorrectedDestIndexForPromoPage = (
  dragInfo,
  tableData,
  activeFeatures,
) => {
  let newDestIndex = dragInfo.destination.index;
  newDestIndex = getCorrectedDestIndexForIntraTableDrag(
    dragInfo,
    tableData,
    activeFeatures,
  );
  if (tableData[newDestIndex - 1].F_C_S_P === rowDataTypesEnum.COMMERCIAL) {
    newDestIndex = newDestIndex - 1;
  }
  return newDestIndex > 1 ? newDestIndex : 2;
};

const getCorrectedDestIndexForSongPage = (
  dragInfo,
  tableData,
  activeFeatures,
) => {
  let newDestIndex = dragInfo.destination.index;
  newDestIndex = getCorrectedDestIndexForIntraTableDrag(
    dragInfo,
    tableData,
    activeFeatures,
  );
  if (tableData[newDestIndex - 1].F_C_S_P === rowDataTypesEnum.COMMERCIAL) {
    newDestIndex = newDestIndex - 1;
  }
  return newDestIndex > 1 ? newDestIndex : 2;
};

const getCorrectedDestIndexForCommPage = (
  dragInfo,
  tableData,
  activeFeatures,
) => {
  let newDestIndex = dragInfo.destination.index;
  newDestIndex = getCorrectedDestIndexForIntraTableDrag(
    dragInfo,
    tableData,
    activeFeatures,
  );
  return newDestIndex > 1 ? newDestIndex : 2;
};

const getCorrectedDestIndexForNTCPage = (
  dragInfo,
  tableData,
  activeFeatures,
) => {
  let newDestIndex = dragInfo.destination.index;
  newDestIndex = getCorrectedDestIndexForIntraTableDrag(
    dragInfo,
    tableData,
    activeFeatures,
  );
  return newDestIndex > 1 ? newDestIndex : 2;
};

const getCorrectedDestIndexForFinalLogPage = (
  dragInfo,
  tableData,
  activeFeatures,
) => {
  let newDestIndex = dragInfo.destination.index;
  newDestIndex = getCorrectedDestIndexForIntraTableDrag(
    dragInfo,
    tableData,
    activeFeatures,
  );
  /* DESTINATION INDEX CORRECTION IF DESTINATION ROW IS NTC */
  newDestIndex = getCorrectedDestIndexIfDestIndexIsNtc(newDestIndex, tableData);
  return newDestIndex > 1 ? newDestIndex : 2;
};

const moveSimpleRows = (tableData, selectedRows, destIndex, isCopyEnabled) => {
  // Move rows like Promo, Song, Segment and CT
  let newTableData = [...tableData];
  const selectedRowsWithNewRowId = getTableDataWithAdditionalInfo({
    tableData: selectedRows,
    tableType: tableTypesEnum.SCHEDULING,
    additionalInfo: [additionalRowInfoEnum.ROW_ID],
  });
  newTableData.splice(destIndex, 0, ...selectedRowsWithNewRowId);
  if (!isCopyEnabled) {
    newTableData = removeRowsFromTableData(selectedRows, newTableData);
  }
  return newTableData;
};

const moveCommercials = (tableData, destIndex, selectedRows) => {
  let newTableData = [...tableData];
  const validComm = validateComm({
    destIndex,
    tableData,
    selectedRows,
  });
  if (!validComm) return false;
  const validCommWithNewRowId = getTableDataWithAdditionalInfo({
    tableData: validComm,
    tableType: tableTypesEnum.SCHEDULING,
    additionalInfo: [additionalRowInfoEnum.ROW_ID],
  });
  newTableData.splice(destIndex, 0, ...validCommWithNewRowId);
  newTableData = removeRowsFromTableData(validComm, newTableData);
  return { newTableData, validComm };
};

const moveNTCs = (
  selectedRows,
  tableData,
  destIndex,
  channel,
  isAutoCalculateOffsetTime,
  isNtcGroupingEnabled,
  isCopyEnabled,
) => {
  let result = insertNTCsInTable(
    tableData,
    destIndex,
    selectedRows,
    channel,
    isAutoCalculateOffsetTime,
    isNtcGroupingEnabled,
    true,
    isCopyEnabled,
  );
  if (!result) return false;
  let ntcsToRemove = [];
  if (!isCopyEnabled) {
    ntcsToRemove = result.insertedNTCs.map((item) => item.rowId);
  } else {
    ntcsToRemove = result.insertedNTCs
      .filter((item) => item.BookingDetailID || item.BookingDetailsID)
      .map((item) => item.rowId);
  }
  result.newTableData = result.newTableData.filter(
    (item) => !ntcsToRemove.includes(item.rowId),
  );
  result.newTableData = getTableDataWithAdditionalInfo({
    tableData: result.newTableData,
    tableType: tableTypesEnum.SCHEDULING,
    additionalInfo: [
      additionalRowInfoEnum.ROW_ID,
      additionalRowInfoEnum.ROW_INDEX,
      additionalRowInfoEnum.SEQUENCE_NO,
    ],
  });
  return result;
};

export {
  getCorrectedDestIndexForPromoPage,
  getCorrectedDestIndexForSongPage,
  getCorrectedDestIndexForCommPage,
  getCorrectedDestIndexForNTCPage,
  getCorrectedDestIndexForFinalLogPage,
  moveSimpleRows,
  moveCommercials,
  moveNTCs,
};
