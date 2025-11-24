const {
  featuresEnum,
  rowDataTypesEnum,
  pagesEnum,
} = require('views/Scheduling/Scheduler/enum');
const {
  getCorrectedDestIndexForFilteredTable,
  getCorrectedDestIndexIfDestIndexIsNtc,
} = require('../../utils');

const getCorrectedDestIndex = (
  destIndex,
  schTableData,
  activeFeatures,
  page,
) => {
  let newDestIndex = destIndex;
  /* DESTINATION INDEX CORRECTION IF FILTER IS ACTIVE */
  if (activeFeatures[featuresEnum.FILTER]) {
    newDestIndex = getCorrectedDestIndexForFilteredTable(
      destIndex,
      schTableData,
    );
  }
  /* DESTINATION INDEX CORRECTION IF DESTINATION ROW IS NTC */
  newDestIndex = getCorrectedDestIndexIfDestIndexIsNtc(
    newDestIndex,
    schTableData,
  );
  /* DESTINATION INDEX CORRECTION IF PAGE IS SONG SCHEDULING AND INDEX IS BELOW COMMERCIAL */
  if (
    page === pagesEnum.SONG &&
    schTableData[newDestIndex - 1].F_C_S_P === rowDataTypesEnum.COMMERCIAL
  ) {
    newDestIndex = newDestIndex - 1;
  }
  return newDestIndex > 1 ? newDestIndex : 2;
};

export { getCorrectedDestIndex };
