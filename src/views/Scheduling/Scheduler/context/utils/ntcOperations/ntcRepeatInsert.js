import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { getTableDataWithAdditionalInfo } from '../../utils';
import {
  getCorrectedDestIndex,
  insertNTCsInTable,
  isInsertPosValid,
} from './utils';
import {
  additionalRowInfoEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
const lodash = require('lodash');

const executeNtcRepeatInsert = (
  destIndex,
  schTableData,
  selectedRows,
  activeFeatures,
  channel,
  isAutoCalcNtcOffsetTime,
  repeatInsertType,
  isNtcGroupingEnabled,
) => {
  try {
    let newSchTableData = [...schTableData];
    let destinationIndex = destIndex;
    let insertedNTCs = [...selectedRows];
    let iterations = 0;
    while (insertedNTCs.length > 0) {
      if (repeatInsertType === 'randomizeInsert')
        insertedNTCs = lodash.shuffle(insertedNTCs);
      destinationIndex = getCorrectedDestIndex(
        destinationIndex,
        newSchTableData,
        activeFeatures,
      );
      /* DRAG VALIDATION */
      if (!isInsertPosValid(newSchTableData, destinationIndex, channel))
        return false;
      // Get ntc parent row
      newSchTableData = getTableDataWithAdditionalInfo({
        tableData: newSchTableData,
        tableType: tableTypesEnum.SCHEDULING,
        additionalInfo: [
          additionalRowInfoEnum.ROW_ID,
          additionalRowInfoEnum.ROW_INDEX,
          additionalRowInfoEnum.SEQUENCE_NO,
        ],
      });
      const result = insertNTCsInTable(
        newSchTableData,
        destinationIndex,
        insertedNTCs,
        channel,
        isAutoCalcNtcOffsetTime,
        isNtcGroupingEnabled,
        false,
        false,
      );
      if (!result) return false;
      newSchTableData = result.newTableData;
      newSchTableData = getTableDataWithAdditionalInfo({
        tableData: result.newTableData,
        tableType: tableTypesEnum.SCHEDULING,
        additionalInfo: [
          additionalRowInfoEnum.ROW_ID,
          additionalRowInfoEnum.ROW_INDEX,
          additionalRowInfoEnum.SEQUENCE_NO,
        ],
      });
      insertedNTCs = result.insertedNTCs;
      if (iterations === 0 && insertedNTCs.length === 0) {
        openNotification('danger', 'NTCs are out of parent duration');
        return false;
      }
      destinationIndex = destinationIndex + insertedNTCs.length;
      iterations++;
    }
    return { newSchTableData };
  } catch (error) {
    throw error;
  }
};

export { executeNtcRepeatInsert };
