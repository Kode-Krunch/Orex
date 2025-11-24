import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  addPropertiesToSelectedNTCs,
  insertNTCsBelowParent,
  insertNTCsInTable,
} from './utils';
import { cloneDeep } from 'lodash';
const { CLIENT } = require('views/Controls/clientListEnum');
const {
  rowDataTypesEnum,
  bulkInsertPositionEnum,
  tableTypesEnum,
  additionalRowInfoEnum,
} = require('views/Scheduling/Scheduler/enum');
const {
  isSegmentValid,
  isRowBetweenValidTime,
  getTableDataWithAdditionalInfo,
  isRowLastSegment,
  getRowWithNTC,
} = require('../../utils');

function executeBulkNTCInsert({
  insertPosition,
  time,
  selectedBreaks,
  isSkipLastBreak,
  isOnlyLastBreak,
  selectedRows,
  descriptionType,
  bulkNTCInsDesc,
  durationType,
  bulkNTCInsDuration,
  bulkNTCInsOffsetTime,
  schedulingTableData,
  channel,
  isAutoCalcNtcOffsetTime,
  selProgramsFpcId,
  isNtcGroupingEnabled,
}) {
  try {
    let newSchedulingTableData = [];
    const isChannelForbes = channel.label === CLIENT.USA_Forbes;
    if (isChannelForbes)
      newSchedulingTableData = executeBulkNTCInsertForForbes({
        selectedRows,
        time,
        descriptionType,
        bulkNTCInsDesc,
        durationType,
        bulkNTCInsDuration,
        bulkNTCInsOffsetTime,
        schedulingTableData,
        selProgramsFpcId,
      });
    else
      newSchedulingTableData = executeBulkNTCInsertForOthers({
        insertPosition,
        time,
        selectedBreaks,
        isSkipLastBreak,
        isOnlyLastBreak,
        selectedRows,
        descriptionType,
        bulkNTCInsDesc,
        durationType,
        bulkNTCInsDuration,
        bulkNTCInsOffsetTime,
        schedulingTableData,
        isAutoCalcNtcOffsetTime,
        selProgramsFpcId,
        isNtcGroupingEnabled,
        channel,
      });
    return newSchedulingTableData;
  } catch (error) {
    throw error;
  }
}

function executeBulkNTCInsertForForbes({
  selectedRows,
  time,
  descriptionType,
  bulkNTCInsDesc,
  durationType,
  bulkNTCInsDuration,
  bulkNTCInsOffsetTime,
  schedulingTableData,
  selProgramsFpcId,
}) {
  try {
    let newSchedulingTableData = [];
    for (let index = 0; index < schedulingTableData.length; index++) {
      const row = schedulingTableData[index];
      if (
        (row.F_C_S_P === rowDataTypesEnum.PROMO ||
          row.F_C_S_P === rowDataTypesEnum.SONG ||
          row.F_C_S_P === rowDataTypesEnum.LIVE) &&
        isRowBetweenValidTime(row, time) &&
        selProgramsFpcId.includes(row.FPC_ID)
      ) {
        let updatedSelectedRows = addPropertiesToSelectedNTCs(
          selectedRows,
          row,
          descriptionType,
          bulkNTCInsDesc,
          durationType,
          bulkNTCInsDuration,
          bulkNTCInsOffsetTime,
        );
        newSchedulingTableData.push(row);
        newSchedulingTableData = insertNTCsBelowParent(
          newSchedulingTableData.length - 1,
          newSchedulingTableData,
          updatedSelectedRows,
        );
      } else {
        newSchedulingTableData.push(row);
      }
    }
    return newSchedulingTableData;
  } catch (error) {
    throw error;
  }
}

function executeBulkNTCInsertForOthers({
  insertPosition,
  time,
  selectedBreaks,
  isSkipLastBreak,
  isOnlyLastBreak,
  selectedRows,
  descriptionType,
  bulkNTCInsDesc,
  durationType,
  bulkNTCInsDuration,
  bulkNTCInsOffsetTime,
  schedulingTableData,
  isAutoCalcNtcOffsetTime,
  selProgramsFpcId,
  isNtcGroupingEnabled,
  channel,
}) {
  try {
    let newSchedulingTableData = [];
    let isCurBlockValid = false;
    for (let index = 0; index < schedulingTableData.length; index++) {
      const row = schedulingTableData[index];
      const nextRow = schedulingTableData[index + 1];
      const isRowSegmentOrLive =
        row.F_C_S_P === rowDataTypesEnum.SEGMENT ||
        row.F_C_S_P === rowDataTypesEnum.LIVE;
      // Update the validity of the current segment
      if (row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION) {
        // Content termination marks the end of a valid segment
        isCurBlockValid = false;
      } else if (isRowSegmentOrLive) {
        // Check if the current segment is valid based on provided criteria
        isCurBlockValid = isSegmentValid(
          row,
          time,
          selectedBreaks,
          selProgramsFpcId,
        );
      }
      // Mark the segment as invalid if isSkipLastBreak === true and row is last segment
      if (isCurBlockValid && isSkipLastBreak)
        isCurBlockValid = !isRowLastSegment(row, schedulingTableData);
      // Mark the segment as valid if isOnlyLastBreak === true and row is last segment
      if (isOnlyLastBreak)
        isCurBlockValid =
          isRowLastSegment(row, schedulingTableData) &&
          isSegmentValid(row, time, null, selProgramsFpcId);
      // If the current segment is valid, proceed with insertion logic
      if (isCurBlockValid) {
        /* Add appropriate properties to selectedRows before insert*/
        let updatedSelectedRows = addPropertiesToSelectedNTCs(
          selectedRows,
          row,
          descriptionType,
          bulkNTCInsDesc,
          durationType,
          bulkNTCInsDuration,
          bulkNTCInsOffsetTime,
        );
        // Case 1: Insert NTCs at the start of the segment
        if (
          insertPosition === bulkInsertPositionEnum.START &&
          isRowSegmentOrLive
        ) {
          newSchedulingTableData.push(row); // Add the current row (segment)
          newSchedulingTableData = getTableDataWithAdditionalInfo({
            tableData: newSchedulingTableData,
            tableType: tableTypesEnum.SCHEDULING,
            additionalInfo: [
              additionalRowInfoEnum.ROW_ID,
              additionalRowInfoEnum.ROW_INDEX,
              additionalRowInfoEnum.SEQUENCE_NO,
            ],
          });
          const result = insertNTCsInTable(
            newSchedulingTableData,
            newSchedulingTableData.length,
            updatedSelectedRows,
            channel,
            isAutoCalcNtcOffsetTime,
            isNtcGroupingEnabled,
            false,
            false,
          );
          if (!result) return false;
          newSchedulingTableData = result.newTableData;
          newSchedulingTableData = getTableDataWithAdditionalInfo({
            tableData: newSchedulingTableData,
            tableType: tableTypesEnum.SCHEDULING,
            additionalInfo: [
              additionalRowInfoEnum.ROW_ID,
              additionalRowInfoEnum.ROW_INDEX,
              additionalRowInfoEnum.SEQUENCE_NO,
            ],
          });
          continue; // Skip to the next iteration
        }
        // Case 2: Insert NTCs at the end of the segment
        if (
          insertPosition === bulkInsertPositionEnum.END && // Check if insertion is at the end
          (!nextRow ||
            (nextRow && // Ensure there is a next row
              (nextRow.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION || // Check if the next row is content termination
                nextRow.F_C_S_P === rowDataTypesEnum.SEGMENT))) // Or if it's another segment
        ) {
          // If the current row is a commercial or NTC, find the insertion point
          if (
            row.F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
            row.F_C_S_P === rowDataTypesEnum.NTC ||
            row.F_C_S_P === rowDataTypesEnum.BREAK
          ) {
            // Traverse backward to find the last non-commercial row
            for (let j = newSchedulingTableData.length - 1; j >= 0; j--) {
              if (
                newSchedulingTableData[j].F_C_S_P !==
                  rowDataTypesEnum.COMMERCIAL &&
                newSchedulingTableData[j].F_C_S_P !== rowDataTypesEnum.NTC &&
                newSchedulingTableData[j].F_C_S_P !== rowDataTypesEnum.BREAK
              ) {
                newSchedulingTableData = getTableDataWithAdditionalInfo({
                  tableData: newSchedulingTableData,
                  tableType: tableTypesEnum.SCHEDULING,
                  additionalInfo: [
                    additionalRowInfoEnum.ROW_ID,
                    additionalRowInfoEnum.ROW_INDEX,
                    additionalRowInfoEnum.SEQUENCE_NO,
                  ],
                });
                const result = insertNTCsInTable(
                  newSchedulingTableData,
                  j + 1,
                  updatedSelectedRows,
                  channel,
                  isAutoCalcNtcOffsetTime,
                  isNtcGroupingEnabled,
                  false,
                  false,
                );
                if (!result) return false;
                newSchedulingTableData = result.newTableData;
                newSchedulingTableData = getTableDataWithAdditionalInfo({
                  tableData: newSchedulingTableData,
                  tableType: tableTypesEnum.SCHEDULING,
                  additionalInfo: [
                    additionalRowInfoEnum.ROW_ID,
                    additionalRowInfoEnum.ROW_INDEX,
                    additionalRowInfoEnum.SEQUENCE_NO,
                  ],
                });
                break; // Stop searching once the parent row is found
              }
            }
          } else {
            // Otherwise, add the current row and insert NTCs below it
            newSchedulingTableData.push(row); // Add the current row
            newSchedulingTableData = getTableDataWithAdditionalInfo({
              tableData: newSchedulingTableData,
              tableType: tableTypesEnum.SCHEDULING,
              additionalInfo: [
                additionalRowInfoEnum.ROW_ID,
                additionalRowInfoEnum.ROW_INDEX,
                additionalRowInfoEnum.SEQUENCE_NO,
              ],
            });
            const result = insertNTCsInTable(
              newSchedulingTableData,
              newSchedulingTableData.length,
              updatedSelectedRows,
              channel,
              isAutoCalcNtcOffsetTime,
              isNtcGroupingEnabled,
              false,
              false,
            );
            if (!result) return false;
            newSchedulingTableData = result.newTableData;
            newSchedulingTableData = getTableDataWithAdditionalInfo({
              tableData: newSchedulingTableData,
              tableType: tableTypesEnum.SCHEDULING,
              additionalInfo: [
                additionalRowInfoEnum.ROW_ID,
                additionalRowInfoEnum.ROW_INDEX,
                additionalRowInfoEnum.SEQUENCE_NO,
              ],
            });
            continue; // Skip to the next iteration
          }
        }
      }
      // Default case: Add the current row to the new scheduling table
      newSchedulingTableData.push(row);
      newSchedulingTableData = getTableDataWithAdditionalInfo({
        tableData: newSchedulingTableData,
        tableType: tableTypesEnum.SCHEDULING,
        additionalInfo: [additionalRowInfoEnum.ROW_INDEX],
      });
    }
    return newSchedulingTableData;
  } catch (error) {
    throw error;
  }
}

function executeBulkNTCInsertBelowExactMatch(
  time,
  bulkInsertExactMatchString,
  schTableData,
  selectedRows,
  channel,
  isAutoCalcNtcOffsetTime,
  selProgramsFpcId,
  isNtcGroupingEnabled,
) {
  return new Promise((resolve, reject) => {
    try {
      let newSchTableData = [];
      // let isAnyNTCsInserted = null;
      for (let index = 0; index < schTableData.length; index++) {
        const row = schTableData[index];
        newSchTableData.push(row);
        newSchTableData = newSchTableData.map((row, index) => ({
          ...row,
          rowIndex: index,
        }));
        if (
          selProgramsFpcId.includes(row.FPC_ID) &&
          (row.F_C_S_P === rowDataTypesEnum.SEGMENT ||
            row.F_C_S_P === rowDataTypesEnum.PROMO ||
            row.F_C_S_P === rowDataTypesEnum.SONG) &&
          row.Event_Name.toLowerCase().includes(
            bulkInsertExactMatchString.toLowerCase(),
          ) &&
          isRowBetweenValidTime(row, time)
        ) {
          const childNTCs = getRowWithNTC([row], schTableData, false);
          newSchTableData = [...cloneDeep(newSchTableData), ...childNTCs];
          newSchTableData = newSchTableData.map((row, index) => ({
            ...row,
            rowIndex: index,
          }));
          const destIndex = newSchTableData.length;
          // let ntcParentRow = getNTCParentRow(destIndex, newSchTableData);
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
            destIndex,
            selectedRows,
            channel,
            isAutoCalcNtcOffsetTime,
            isNtcGroupingEnabled,
            false,
            false,
          );
          if (!result) return false;
          newSchTableData = result.newTableData;
          newSchTableData = getTableDataWithAdditionalInfo({
            tableData: newSchTableData,
            tableType: tableTypesEnum.SCHEDULING,
            additionalInfo: [
              additionalRowInfoEnum.ROW_ID,
              additionalRowInfoEnum.ROW_INDEX,
              additionalRowInfoEnum.SEQUENCE_NO,
            ],
          });
          index += childNTCs.length;
        }
      }
      if (schTableData.length === newSchTableData.length) {
        openNotification('danger', 'No NTC parent with exact match found');
        newSchTableData = false;
      }
      resolve(newSchTableData);
    } catch (error) {
      reject(error);
    }
  });
}

export { executeBulkNTCInsert, executeBulkNTCInsertBelowExactMatch };
