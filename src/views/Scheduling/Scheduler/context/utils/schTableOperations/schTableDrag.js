import {
  additionalRowInfoEnum,
  pagesEnum,
  rowDataTypesEnum,
  tableTypesEnum,
} from '../../../enum';
import {
  getRowWithNTC,
  getTableDataWithAdditionalInfo,
  removeRowsFromTableData,
} from '../../utils';
import { validateComm } from '../commOperations/utils';
import {
  getCorrectedDestIndexForCommPage,
  getCorrectedDestIndexForFinalLogPage,
  getCorrectedDestIndexForNTCPage,
  getCorrectedDestIndexForPromoPage,
  getCorrectedDestIndexForSongPage,
  moveCommercials,
  moveNTCs,
  moveSimpleRows,
} from './utils';

const executeSchTableDrag = (
  dragInfo,
  tableData,
  schTableSelRows,
  activeFeatures,
  channel,
  page,
  isAutoCalculateOffsetTime,
  isCopyEnabled,
  isNtcGroupingEnabled,
) => {
  let selectedRows =
    schTableSelRows.length > 0
      ? schTableSelRows
      : [tableData[dragInfo.source.index]];
  if (page === pagesEnum.PROMO) {
    return executePromoDrag(
      dragInfo,
      tableData,
      selectedRows,
      activeFeatures,
      isCopyEnabled,
    );
  } else if (page === pagesEnum.SONG) {
    return executeSongDrag(
      dragInfo,
      tableData,
      selectedRows,
      activeFeatures,
      isCopyEnabled,
    );
  } else if (page === pagesEnum.COMMERCIAL) {
    return executeCommDrag(dragInfo, tableData, selectedRows, activeFeatures)
      .newTableData;
  } else if (page === pagesEnum.NTC) {
    const result = executeNTCDrag(
      dragInfo,
      tableData,
      selectedRows,
      channel,
      isAutoCalculateOffsetTime,
      activeFeatures,
      isCopyEnabled,
      isNtcGroupingEnabled,
    );
    if (!result) return false;
    return result.newTableData;
  } else if (page === pagesEnum.FINAL_LOG) {
    const result = executeFinalLogDrag(
      dragInfo,
      tableData,
      selectedRows,
      channel,
      isAutoCalculateOffsetTime,
      activeFeatures,
      isCopyEnabled,
      isNtcGroupingEnabled,
    );
    if (!result) return false;
    return result;
  }
};

const executePromoDrag = (
  dragInfo,
  tableData,
  selectedRows,
  activeFeatures,
  isCopyEnabled,
) => {
  const destIndex = getCorrectedDestIndexForPromoPage(
    dragInfo,
    tableData,
    activeFeatures,
  );
  return moveSimpleRows(tableData, selectedRows, destIndex, isCopyEnabled);
};

const executeSongDrag = (
  dragInfo,
  tableData,
  selectedRows,
  activeFeatures,
  isCopyEnabled,
) => {
  const destIndex = getCorrectedDestIndexForSongPage(
    dragInfo,
    tableData,
    activeFeatures,
  );
  return moveSimpleRows(tableData, selectedRows, destIndex, isCopyEnabled);
};

const executeCommDrag = (dragInfo, tableData, selectedRows, activeFeatures) => {
  const destIndex = getCorrectedDestIndexForCommPage(
    dragInfo,
    tableData,
    activeFeatures,
  );
  return moveCommercials(tableData, destIndex, selectedRows);
};

const executeNTCDrag = (
  dragInfo,
  tableData,
  selectedRows,
  channel,
  isAutoCalculateOffsetTime,
  activeFeatures,
  isCopyEnabled,
  isNtcGroupingEnabled,
) => {
  const destIndex = getCorrectedDestIndexForNTCPage(
    dragInfo,
    tableData,
    activeFeatures,
  );
  return moveNTCs(
    selectedRows,
    tableData,
    destIndex,
    channel,
    isAutoCalculateOffsetTime,
    isNtcGroupingEnabled,
    isCopyEnabled,
  );
};

const executeFinalLogDrag = (
  dragInfo,
  tableData,
  selectedRows,
  channel,
  isAutoCalculateOffsetTime,
  activeFeatures,
  isCopyEnabled,
  isNtcGroupingEnabled,
) => {
  let newTableData = [...tableData];
  if (selectedRows.every((row) => row.F_C_S_P === rowDataTypesEnum.NTC)) {
    // If all selected rows are NTCs, execute NTC drag
    const result = executeNTCDrag(
      dragInfo,
      tableData,
      selectedRows,
      channel,
      isAutoCalculateOffsetTime,
      activeFeatures,
      isCopyEnabled,
      isNtcGroupingEnabled,
    );
    if (!result) return false;
    newTableData = result.newTableData;
  } else {
    let newSelRows = [...selectedRows];
    if (
      newSelRows.length === 1 &&
      (newSelRows[0].F_C_S_P === rowDataTypesEnum.SEGMENT ||
        newSelRows[0].F_C_S_P === rowDataTypesEnum.PROMO ||
        newSelRows[0].F_C_S_P === rowDataTypesEnum.SONG ||
        newSelRows[0].F_C_S_P === rowDataTypesEnum.LIVE)
    ) {
      newSelRows = getRowWithNTC(newSelRows, tableData);
    }
    const destIndex = getCorrectedDestIndexForFinalLogPage(
      dragInfo,
      tableData,
      activeFeatures,
    );
    const commercials = newSelRows.filter(
      (row) => row.F_C_S_P === rowDataTypesEnum.COMMERCIAL,
    );
    let validComm = [];
    if (commercials.length > 0) {
      validComm = validateComm({
        destIndex,
        tableData,
        selectedRows: commercials,
      });
      if (!validComm) validComm = [];
    }
    const validCommRowIds = validComm.map((row) => row.rowId);
    const validSelRows = newSelRows.filter(
      (row) =>
        validCommRowIds.includes(row.rowId) ||
        row.F_C_S_P !== rowDataTypesEnum.COMMERCIAL,
    );
    // Get valid selected rows
    const validSelRowsWithNewRowId = getTableDataWithAdditionalInfo({
      tableData: validSelRows,
      tableType: tableTypesEnum.SCHEDULING,
      additionalInfo: [additionalRowInfoEnum.ROW_ID],
    });
    // Move rows
    newTableData.splice(destIndex, 0, ...validSelRowsWithNewRowId);
    let rowsToRemove = [...validSelRows];
    if (isCopyEnabled)
      rowsToRemove = rowsToRemove.filter(
        (row) =>
          row.F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
          (row.F_C_S_P === rowDataTypesEnum.NTC && row.BookingDetailID),
      );
    newTableData = removeRowsFromTableData(rowsToRemove, newTableData);
  }
  return newTableData;
};

export { executeSchTableDrag };
