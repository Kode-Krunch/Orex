import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const {
  featuresEnum,
  rowDataTypesEnum,
} = require('views/Scheduling/Scheduler/enum');
const {
  getCorrectedDestIndexForFilteredTable,
  isBasicDragValid,
  isTelTimeBetweenStartAndEndTime,
  getCorrectedDestIndexIfDestIndexIsNtc,
} = require('../../utils');

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
  /* DESTINATION INDEX CORRECTION IF DESTINATION ROW IS NTC */
  destinationIndex = getCorrectedDestIndexIfDestIndexIsNtc(
    destinationIndex,
    schTableData,
  );
  return destinationIndex > 1 ? destinationIndex : 2;
};

const validateComm = ({ dragInfo, destIndex, tableData, selectedRows }) => {
  /* --------------------- GAURD CLAUSES ----------------------------- */
  // CLAUSE 1 - If operation is drag and drop, check if basic drag is valid
  if (dragInfo && !isBasicDragValid(dragInfo, destIndex)) return false;
  // CLAUSE 2 - If Commercials are placed below NTC
  if (isCommPlacedBeforeNTC(tableData, destIndex)) {
    openNotification('danger', 'Commercials cannot be placed before NTC');
    return false;
  }
  // Get valid Commercials as per different validations
  let destRow = tableData[destIndex - 1];
  let validComm = getCommWithinTimeband(selectedRows, destRow);
  if (!validComm) {
    openNotification('danger', 'Commercials are out of time band');
    return false;
  } else if (validComm.length < selectedRows.length) {
    openNotification('danger', 'One or more Commercials are out of time band');
  }
  return validComm;
};

const isCommPlacedBeforeNTC = (tableData, destIndex) => {
  return tableData[destIndex].F_C_S_P === rowDataTypesEnum.NTC;
};

const getCommWithinTimeband = (selectedRows, destRow) => {
  const result = [];
  selectedRows.forEach((row) => {
    if (isTelTimeBetweenStartAndEndTime(destRow, row)) result.push(row);
  });
  return result.length > 0 ? result : false;
};

export {
  getCorrectedDestIndexForSecTableDrag,
  getCorrectedDestIndex,
  validateComm,
};
