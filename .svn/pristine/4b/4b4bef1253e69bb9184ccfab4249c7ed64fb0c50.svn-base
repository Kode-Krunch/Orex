import { executeSecToSchTableNtcInsert, getCorrectedDestIndex } from './utils';

const executeNtcInsert = (
  pDestIndex,
  schTableData,
  secTableData,
  selectedRows,
  activeFeatures,
  channel,
  isAutoCalculateOffsetTime,
  isNtcGroupingEnabled,
) => {
  try {
    let destIndex = getCorrectedDestIndex(
      pDestIndex,
      schTableData,
      activeFeatures,
    );
    return executeSecToSchTableNtcInsert(
      schTableData,
      secTableData,
      destIndex,
      selectedRows,
      channel,
      isAutoCalculateOffsetTime,
      isNtcGroupingEnabled,
    );
  } catch (error) {
    throw error;
  }
};

export { executeNtcInsert };
