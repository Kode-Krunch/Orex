import classNames from 'classnames';
import { cloneDeep } from 'lodash';
import { CLIENT } from 'views/Controls/clientListEnum';

const {
  addTimes,
} = require('views/Scheduling/Scheduler/components/SchedulingArea/components/Summary/utils');
const {
  getRowWithNTC,
  removeRowsFromTableData,
  getTableDataWithAdditionalInfo,
  getNTCParentRow,
  getCorrectedDestIndexForFilteredTable,
} = require('../../utils');
const {
  getGroupedRows,
  getFlatArrForGroupedArr,
  openNotification,
  subtractTimes,
} = require('views/Controls/GLOBALFUNACTION');
const {
  additionalRowInfoEnum,
  tableTypesEnum,
  rowDataTypesEnum,
  featuresEnum,
  ntcDescriptionTypesEnum,
  ntcDurationTypesEnum,
} = require('views/Scheduling/Scheduler/enum');

/* -------------------------  OPERATION FUNCTIONS --------------------------- */
const executeSecToSchTableNtcInsert = (
  schTableData,
  secTableData,
  destIndex,
  selRows,
  channel,
  isAutoCalcOffsetTime,
  isNtcGroupingEnabled,
) => {
  // Validation
  if (!isInsertPosValid(schTableData, destIndex, channel)) return false;
  //Main Logic
  let newSchTableData = [...schTableData];
  let newSecTableData = [...secTableData];
  let parentRow = getNTCParentRow(destIndex, schTableData);
  let result,
    errorMsgs = [],
    isNTCsPaid = selRows[0].BookingDetailsID || selRows[0].BookingDetailID;
  let ntcsInCorrectTimeband = getNTCsInCorrectTimeband(selRows, parentRow);
  if (selRows.length > 0) {
    if (ntcsInCorrectTimeband.length === 0) {
      openNotification('danger', 'NTCs are out of timeband');
      return false;
    } else if (ntcsInCorrectTimeband.length < selRows.length) {
      errorMsgs.push('Some NTCs are out of timeband');
    }
  }
  if (isNtcGroupingEnabled) {
    result = insertNtcWithGrouping({
      parentRow,
      schTableData,
      selRows: ntcsInCorrectTimeband,
      destIndex,
      isAutoCalcOffsetTime,
    });
  } else {
    result = insertNTCsWoGrouping({
      parentRow,
      selRows: ntcsInCorrectTimeband,
      schTableData,
      destIndex,
    });
  }
  errorMsgs = pushAdditionalErrorMsgs(
    result.insertedNTCs,
    ntcsInCorrectTimeband,
    selRows,
    errorMsgs,
  );
  if (errorMsgs.length > 0) showErrors(errorMsgs);
  const existingNTCs = getRowWithNTC([parentRow], newSchTableData, false);
  let newNTCs = getTableDataWithAdditionalInfo({
    tableData: result.newNTCs,
    tableType: tableTypesEnum.SCHEDULING,
    additionalInfo: [additionalRowInfoEnum.ROW_ID],
  });
  newSchTableData = removeRowsFromTableData(existingNTCs, newSchTableData);
  newSchTableData.splice(
    newSchTableData.findIndex((row) => row.rowId === parentRow.rowId) + 1,
    0,
    ...newNTCs,
  );
  // Remove inserted rows from secondary table data for paid NTCs
  if (isNTCsPaid) {
    const insertedNTCIds = result.insertedNTCs.map((ntc) => ntc.rowId);
    newSecTableData = newSecTableData.filter(
      (ntc) => !insertedNTCIds.includes(ntc.rowId),
    );
  }
  newSchTableData = getTableDataWithAdditionalInfo({
    tableData: newSchTableData,
    tableType: tableTypesEnum.SCHEDULING,
    additionalInfo: [
      additionalRowInfoEnum.ROW_ID,
      additionalRowInfoEnum.ROW_INDEX,
      additionalRowInfoEnum.SEQUENCE_NO,
    ],
  });
  return { newSchTableData, newSecTableData };
};

const insertNTCsInTable = (
  tableData,
  destIndex,
  selRows,
  channel,
  isAutoCalcOffsetTime,
  isNtcGroupingEnabled,
  isSchTableDrag,
  isCopyEnabled,
) => {
  // Validation
  if (!isInsertPosValid(tableData, destIndex, channel)) return false;
  //Main Logic
  let newTableData = [...tableData];
  let errorMsgs = [];
  let parentRow = getNTCParentRow(destIndex, tableData);
  // Remove Paid NTCs from selection if parent is out of timeband
  const ntcsInCorrectTimeband = getNTCsInCorrectTimeband(selRows, parentRow);
  const validSelRowIds = ntcsInCorrectTimeband.map((item) => item.rowId);
  const skippedRows = selRows.filter(
    (item) => !validSelRowIds.includes(item.rowId),
  );
  // showNTCsOutOfTimebandError(ntcsInCorrectTimeband, selRows);
  if (selRows.length > 0) {
    if (ntcsInCorrectTimeband.length === 0) {
      openNotification('danger', 'NTCs are out of timeband');
      return false;
    } else if (ntcsInCorrectTimeband.length < selRows.length) {
      errorMsgs.push('Some NTCs are out of timeband');
    }
  }
  let result;
  if (isNtcGroupingEnabled) {
    result = insertNtcWithGrouping({
      parentRow,
      schTableData: tableData,
      selRows: ntcsInCorrectTimeband,
      destIndex,
      isAutoCalcOffsetTime,
      isSchTableDrag,
      isCopyEnabled,
    });
  } else {
    result = insertNTCsWoGrouping({
      parentRow,
      selRows: ntcsInCorrectTimeband,
      schTableData: tableData,
      destIndex,
    });
  }
  errorMsgs = pushAdditionalErrorMsgs(
    result.insertedNTCs,
    ntcsInCorrectTimeband,
    selRows,
    errorMsgs,
  );
  if (errorMsgs.length > 0) showErrors(errorMsgs);
  const existingNTCs = getRowWithNTC([parentRow], newTableData, false);
  newTableData = removeRowsFromTableData(existingNTCs, newTableData);
  newTableData.splice(
    newTableData.findIndex((row) => row.rowId === parentRow.rowId) + 1,
    0,
    ...result.newNTCs,
  );
  return {
    newTableData,
    insertedNTCs: result.insertedNTCs,
    skippedNTCs: [...result.skippedNTCs, ...skippedRows],
  };
};

/* -------------------------  HELPER FUNCTIONS --------------------------- */
const insertNtcWithGrouping = ({
  parentRow,
  schTableData,
  selRows,
  destIndex,
  isAutoCalcOffsetTime,
  isSchTableDrag,
  isCopyEnabled,
}) => {
  const childNTCs = getRowWithNTC([parentRow], schTableData, false);
  const groupedExistingNTCs = getGroupedRows(childNTCs, 'NTCGroupCode');
  const groupedSelNTCs = getGroupedRows(selRows, 'NTCGroupCode');
  const newNtcGroups = getNewNtcGroups(groupedExistingNTCs, groupedSelNTCs);
  const result = insertNTCsInGroups(
    newNtcGroups,
    groupedExistingNTCs,
    groupedSelNTCs,
    destIndex,
    parentRow,
    isAutoCalcOffsetTime,
    isSchTableDrag,
    isCopyEnabled,
  );
  return {
    newNTCs: getFlatArrForGroupedArr(result.newGroupedNTCs, true),
    insertedNTCs: result.insertedNTCs,
    skippedNTCs: result.skippedNTCs,
  };
};

const getNewNtcGroups = (groupedExistingNTCs, groupedSelNTCs) => {
  let newNtcGroups = Object.keys(groupedExistingNTCs);
  const selNtcGroups = Object.keys(groupedSelNTCs);
  selNtcGroups.forEach((group) => {
    if (!newNtcGroups.includes(group)) {
      newNtcGroups.push(group);
    }
  });
  return newNtcGroups;
};

const insertNTCsInGroups = (
  ntcGroups,
  groupedExistingNTCs,
  groupedSelNTCs,
  destIndex,
  parentRow,
  isAutoCalcOffsetTime,
  isSchTableDrag,
  isCopyEnabled,
) => {
  let newGroupedNTCs = {};
  let insertedNTCs = [];
  let skippedNTCs = [];
  ntcGroups.forEach((group) => {
    const existingNTCs = groupedExistingNTCs[group] || [];
    const selNTCs = groupedSelNTCs[group];
    if (!selNTCs) newGroupedNTCs[group] = [...existingNTCs];
    else {
      const result = insertNTCsInGroup(
        existingNTCs,
        destIndex,
        selNTCs,
        parentRow,
        isAutoCalcOffsetTime,
        isSchTableDrag,
        isCopyEnabled,
      );
      newGroupedNTCs[group] = result.newNTCs;
      insertedNTCs.push(...result.insertedNTCs);
      skippedNTCs.push(...result.skippedNTCs);
    }
  });
  return { newGroupedNTCs, insertedNTCs, skippedNTCs };
};

const insertNTCsInGroup = (
  existingNTCs,
  pDestIndex,
  selNTCs,
  parentRow,
  isAutoCalcOffsetTime,
  isSchTableDrag,
  isCopyEnabled,
) => {
  let destIndexInCurGroup = existingNTCs.findIndex(
    (row) => row.rowIndex === pDestIndex,
  );
  const curDestIndex =
    destIndexInCurGroup === -1 ? existingNTCs.length : destIndexInCurGroup;
  return insertNTCsAtIndex(
    existingNTCs,
    selNTCs,
    curDestIndex,
    parentRow,
    isAutoCalcOffsetTime,
    isSchTableDrag,
    isCopyEnabled,
  );
};

const insertNTCsAtIndex = (
  existingNTCs,
  selNTCs,
  destIndex,
  parentRow,
  isAutoCalcOffsetTime,
  isSchTableDrag,
  isCopyEnabled,
) => {
  if (isSchTableDrag) {
    return insertNTCsAtIndexForSchTableDrag(
      existingNTCs,
      destIndex,
      selNTCs,
      isAutoCalcOffsetTime,
      parentRow,
      isCopyEnabled,
    );
  } else {
    return insertNTCsAtIndexForSecToSchTableInsert(
      existingNTCs,
      destIndex,
      selNTCs,
      parentRow,
      isAutoCalcOffsetTime,
    );
  }
};

const insertNTCsAtIndexForSchTableDrag = (
  existingNTCs,
  destIndex,
  selNTCs,
  isAutoCalcOffsetTime,
  parentRow,
  isCopyEnabled,
) => {
  let newNTCs = [...existingNTCs];
  let newInsertedNTCs = [];
  let newSkippedNTCs = [];
  let curDestIndex = destIndex;
  selNTCs.forEach((ntc) => {
    const ogNewNtcs = cloneDeep(newNTCs);
    newNTCs = setSelNtcPropsToZero(newNTCs, ntc, isCopyEnabled);
    let ntcWithNewRowId = getTableDataWithAdditionalInfo({
      tableData: [ntc],
      tableType: tableTypesEnum.SCHEDULING,
      additionalInfo: [additionalRowInfoEnum.ROW_ID],
    })[0];
    // Assign destination NTC props to current NTC
    newNTCs.splice(curDestIndex, 0, ntcWithNewRowId);
    if (curDestIndex === 0)
      newNTCs[0] = {
        ...newNTCs[0],
        Start_Time: '00:00:00:00',
        Tel_Time: '00:00:00:00',
        OffsetStartTime: '00:00:00:00',
      };
    let referenceNtc;
    if (isAutoCalcOffsetTime) {
      newNTCs = updatePropOfNTCs(newNTCs, ['offsetTime', 'defaultGap']);
      referenceNtc = newNTCs.at(-1);
    } else {
      referenceNtc = ntc;
    }
    const isRefNtcWithinParent =
      addTimes(referenceNtc.OffsetStartTime, referenceNtc.Duration) <=
      parentRow.Duration;
    if (isRefNtcWithinParent) {
      newInsertedNTCs.push(ntc);
      curDestIndex++;
    } else {
      newNTCs = cloneDeep(ogNewNtcs);
      newSkippedNTCs.push(ntc);
    }
  });
  return {
    newNTCs,
    insertedNTCs: newInsertedNTCs,
    skippedNTCs: newSkippedNTCs,
  };
};

const setSelNtcPropsToZero = (ntcs, selNtc, isCopyEnabled) => {
  const zeroDur = '00:00:00:00';
  return ntcs.map((item) =>
    item.rowId === selNtc.rowId &&
    (!isCopyEnabled || item.BookingDetailID || item.BookingDetailsID)
      ? {
          ...item,
          OffsetStartTime: zeroDur,
          Start_Time: zeroDur,
          Tel_Time: zeroDur,
          DefaultGAP: zeroDur,
          Gap: zeroDur,
          Duration: zeroDur,
        }
      : item,
  );
};

const insertNTCsAtIndexForSecToSchTableInsert = (
  existingNTCs,
  destIndex,
  selNTCs,
  parentRow,
  isAutoCalcOffsetTime,
) => {
  let newNTCs = [...existingNTCs];
  let newInsertedNTCs = [];
  let newSkippedNTCs = [];
  let curDestIndex = destIndex;
  selNTCs.forEach((ntc) => {
    const ogNewNtcs = cloneDeep(newNTCs);
    newNTCs.splice(curDestIndex, 0, ntc);
    let referenceNtc;
    if (isAutoCalcOffsetTime) {
      newNTCs = updatePropOfNTCs(newNTCs, ['offsetTime', 'defaultGap']);
      referenceNtc = newNTCs.at(-1);
    } else {
      referenceNtc = ntc;
    }
    const isRefNtcWithinParent =
      addTimes(referenceNtc.OffsetStartTime, referenceNtc.Duration) <=
      parentRow.Duration;
    if (isRefNtcWithinParent) {
      newInsertedNTCs.push(ntc);
      curDestIndex++;
    } else {
      newNTCs = cloneDeep(ogNewNtcs);
      newSkippedNTCs.push(ntc);
    }
  });
  return {
    newNTCs,
    insertedNTCs: newInsertedNTCs,
    skippedNTCs: newSkippedNTCs,
  };
};

const insertNTCsWoGrouping = ({
  parentRow,
  selRows,
  schTableData,
  destIndex,
}) => {
  let validNTCs = getNTCsWithinParentDuration(selRows, parentRow);
  let tempSchTableData = [...schTableData];
  const validNTCsWithNewId = getTableDataWithAdditionalInfo({
    tableData: validNTCs,
    tableType: tableTypesEnum.SCHEDULING,
    additionalInfo: [additionalRowInfoEnum.ROW_ID],
  });
  tempSchTableData.splice(destIndex, 0, ...validNTCsWithNewId);
  let newNTCs = getRowWithNTC([parentRow], tempSchTableData, false);
  const validNtcIds = validNTCs.map((ntc) => ntc.rowId);
  let skippedNTCs = selRows.filter((row) => !validNtcIds.includes(row.rowId));
  return { newNTCs, insertedNTCs: validNTCs, skippedNTCs };
};

const getNTCsWithinParentDuration = (selectedRows, parentRow) => {
  let validNTCs = [];
  selectedRows.forEach((row) => {
    const offsetStartTime = addTimes(parentRow.Start_Time, row.OffsetStartTime);
    const ntcEndTime = addTimes(offsetStartTime, row.Duration);
    if (ntcEndTime <= addTimes(parentRow.Start_Time, parentRow.Duration))
      validNTCs.push(row);
  });
  return validNTCs;
};

const updatePropOfNTCs = (ntcs, properties) => {
  const newNTCs = [];
  ntcs.forEach((ntc, index) => {
    const prevNTC = newNTCs[index - 1];
    let newOffsetTime, gap;
    if (prevNTC && properties.includes('offsetTime'))
      newOffsetTime = addTimes(
        prevNTC.OffsetStartTime,
        prevNTC.Duration,
        prevNTC.DefaultGAP,
      );
    if (properties.includes('defaultGap'))
      gap = ntc.Gap ? ntc.Gap : ntc.DefaultGAP;
    if (index === 0) newNTCs.push({ ...ntc, DefaultGAP: gap });
    else {
      newNTCs.push({
        ...ntc,
        OffsetStartTime: newOffsetTime,
        Start_Time: newOffsetTime,
        Tel_Time: newOffsetTime,
        DefaultGAP: gap,
      });
    }
  });
  return newNTCs;
};

const isNTCPlacedBelowComm = (tableData, destIndex) => {
  return tableData[destIndex - 1].F_C_S_P === rowDataTypesEnum.COMMERCIAL;
};

const isNTCPlacedBelowCT = (tableData, destIndex) => {
  return (
    tableData[destIndex - 1].F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION
  );
};

const isNTCPlacedBelowLive = (tableData, destIndex) => {
  return tableData[destIndex - 1].F_C_S_P === rowDataTypesEnum.LIVE;
};

const isInsertPosValid = (tableData, destIndex, channel) => {
  let isDragValid = true;
  /* --------------------- GAURD CLAUSES ----------------------------- */
  // CLAUSE 1 - If NTCs are placed below Commercial
  if (isNTCPlacedBelowComm(tableData, destIndex)) {
    openNotification('danger', 'NTC cannot be placed after Commercial');
    isDragValid = false;
  }
  // CLAUSE 2 - If NTCs are placed below Content Termination
  if (isNTCPlacedBelowCT(tableData, destIndex)) {
    openNotification(
      'danger',
      'NTC cannot be placed after Content Termination',
    );
    isDragValid = false;
  }
  // CLAUSE 4 - If channel is forbes and NTCs are placed below
  if (
    channel.label === CLIENT.USA_Forbes &&
    isNTCPlacedBelowLive(tableData, destIndex)
  ) {
    openNotification('danger', 'NTC cannot be placed after Live Event');
    return false;
  }
  return isDragValid;
};

const getNTCsInCorrectTimeband = (selRows, parentRow) =>
  selRows.filter(
    (row) =>
      (!row.BookingDetailID && !row.BookingDetailsID) ||
      (parentRow.Start_Time >= row.SpotStartTime &&
        parentRow.Start_Time <= row.SpotEndTime),
  );

const pushAdditionalErrorMsgs = (
  insertedNTCs,
  ntcsInCorrectTimeband,
  selRows,
  pErrorMsgs,
) => {
  let errorMsgs = cloneDeep(pErrorMsgs);
  if (selRows.length > 0) {
    if (insertedNTCs.length === 0) {
      errorMsgs.push("NTCs are out of their parent's duration");
    } else {
      if (insertedNTCs.length === ntcsInCorrectTimeband.length) {
        if (insertedNTCs.length < selRows.length)
          errorMsgs.push("Some NTCs are out of their parent's duration");
      } else if (insertedNTCs.length < ntcsInCorrectTimeband.length) {
        errorMsgs.push("Some NTCs are out of their parent's duration");
      }
    }
  }
  return errorMsgs;
};

const showErrors = (errorMsgs) => {
  openNotification(
    'danger',
    <>
      {errorMsgs.map((msg, index) => (
        <>
          <div
            className={classNames(
              'flex gap-1 items-center py-1',
              index !== errorMsgs.length - 1 && 'border-b border-b-gray-600',
            )}
          >
            <p>{msg}</p>
          </div>
        </>
      ))}
    </>,
  );
};

const getCorrectedDestIndexForSecTableDrag = (
  dragInfo,
  secTableData,
  activeFeatures,
) => {
  const sourceIndex = dragInfo.source.index;
  const destIndex = dragInfo.destination.index;
  let destinationIndex = destIndex;
  /* DESTINATION INDEX CORRECTION IF FILTER IS ACTIVE */
  if (activeFeatures[featuresEnum.FILTER]) {
    destinationIndex = getCorrectedDestIndexForFilteredTable(
      destIndex,
      secTableData,
    );
  }
  if (sourceIndex < destinationIndex) {
    /* DESTINATION INDEX CORRECTION IF DRAG IS TOP TO BOTTOM */
    destinationIndex = destinationIndex + 1;
  }
  return destinationIndex;
};

const getCorrectedDestIndex = (destIndex, schTableData, activeFeatures) => {
  let destinationIndex = destIndex;
  /* DESTINATION INDEX CORRECTION IF FILTER IS ACTIVE */
  if (activeFeatures[featuresEnum.FILTER]) {
    destinationIndex = getCorrectedDestIndexForFilteredTable(
      destIndex,
      schTableData,
    );
  }
  return destinationIndex > 1 ? destinationIndex : 2;
};

const addPropertiesToSelectedNTCs = (
  selectedRows,
  parentRow,
  descriptionType,
  bulkNTCInsDesc,
  durationType,
  bulkNTCInsDuration,
  bulkNTCInsOffsetTime,
) => {
  try {
    let updatedSelectedRows = selectedRows.map((curRow) => ({
      ...curRow,
      Description:
        descriptionType === ntcDescriptionTypesEnum.PARENT
          ? parentRow.Event_Name
          : descriptionType === ntcDescriptionTypesEnum.CUSTOM
          ? bulkNTCInsDesc
          : curRow.Description,
      Duration:
        durationType === ntcDurationTypesEnum.PARENT
          ? subtractTimes(parentRow.Duration, bulkNTCInsOffsetTime)
          : durationType === ntcDurationTypesEnum.CUSTOM
          ? bulkNTCInsDuration
          : curRow.Duration,
      OffsetStartTime: bulkNTCInsOffsetTime,
    }));
    return updatedSelectedRows;
  } catch (error) {
    throw error;
  }
};

const insertNTCsBelowParent = (parentIndex, tableData, selectedRows) => {
  try {
    const parentRow = tableData[parentIndex];
    let newTableData = [...tableData];
    let insertIndex = parentIndex + 1;
    selectedRows.forEach((selectedRow) => {
      // Insert NTCs that fits within the parent duration
      const ntcStartTime = addTimes(
        parentRow.Start_Time,
        selectedRow.OffsetStartTime,
      );
      const ntcEndTime = addTimes(ntcStartTime, selectedRow.Duration);
      if (ntcEndTime <= addTimes(parentRow.Start_Time, parentRow.Duration)) {
        newTableData.splice(insertIndex, 0, {
          ...selectedRow,
          Start_Time: ntcStartTime,
          Tel_Time: ntcStartTime,
        });
        insertIndex = insertIndex + 1;
      }
    });
    return newTableData;
  } catch (error) {
    throw error;
  }
};

const updateOffsetStartTimeOfNTCs = (tableData) => {
  const newTableData = [];
  tableData.forEach((row, index) => {
    if (index === 0) newTableData.push(row);
    else {
      const prevRow = newTableData[index - 1];
      if (prevRow.F_C_S_P !== rowDataTypesEnum.NTC) newTableData.push(row);
      else {
        if (prevRow.NTCGroupCode !== row.NTCGroupCode) newTableData.push(row);
        else {
          const newOffsetTime = addTimes(
            prevRow.OffsetStartTime,
            prevRow.Duration,
            prevRow.DefaultGAP,
          );
          newTableData.push({
            ...row,
            OffsetStartTime: newOffsetTime,
            Start_Time: newOffsetTime,
            Tel_Time: newOffsetTime,
          });
        }
      }
    }
  });
  return newTableData;
};

const setNtcPropsToZero = (ntcs) => {
  const zeroDur = '00:00:00:00';
  return ntcs.map((ntc) => ({
    ...ntc,
    OffsetStartTime: zeroDur,
    Start_Time: zeroDur,
    Tel_Time: zeroDur,
    DefaultGAP: zeroDur,
    Gap: zeroDur,
  }));
};

export {
  // Operation Functions
  executeSecToSchTableNtcInsert,
  insertNTCsInTable,
  // Helper Functions
  updatePropOfNTCs,
  isInsertPosValid,
  getCorrectedDestIndexForSecTableDrag,
  getCorrectedDestIndex,
  addPropertiesToSelectedNTCs,
  insertNTCsBelowParent,
  updateOffsetStartTimeOfNTCs,
  setNtcPropsToZero,
};
