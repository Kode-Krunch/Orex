import {
  bulkInsertPositionEnum,
  pagesEnum,
  rowDataTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { isRowLastSegment, isSegmentValid } from '../../utils';
import { CLIENT } from 'views/Controls/clientListEnum';
const lodash = require('lodash');

function executeSongBulkInsert(
  insertPosition,
  time,
  selectedBreaks,
  isSkipLastBreak,
  isOnlyLastBreak,
  isRandomizeIns,
  isRepeatRandomIns,
  insCountPerSeg,
  isSkipInsInSameProg,
  selectedRows,
  selProgramsFpcId,
  schedulingTableData,
  channel,
  page,
) {
  let isChannelForbes = channel === CLIENT.USA_Forbes;
  let newSchedulingTableData = [];
  let isCurBlockValid = false;
  for (let index = 0; index < schedulingTableData.length; index++) {
    const row = schedulingTableData[index];
    const nextRow = schedulingTableData[index + 1];
    const isRowSegment = row.F_C_S_P === rowDataTypesEnum.SEGMENT;
    const isRowLive = row.F_C_S_P === rowDataTypesEnum.LIVE;
    // Update the validity of the current segment
    if (row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION) {
      // Mark the segment as invalid if the row is content termination
      isCurBlockValid = false;
    } else if (isRowSegment) {
      // Validate the segment using the given time and selected breaks
      isCurBlockValid = isSegmentValid(
        row,
        time,
        selectedBreaks,
        selProgramsFpcId,
      );
    } else if (isRowLive) {
      // Validate the live row using the given time and selected breaks
      isCurBlockValid =
        isSegmentValid(row, time, selectedBreaks, selProgramsFpcId) &&
        !isChannelForbes;
    }
    // Mark the segment as invalid if isSkipLastBreak === true and row is last segment
    if (isCurBlockValid && isSkipLastBreak)
      isCurBlockValid = !isRowLastSegment(row, schedulingTableData);
    // Mark the segment as valid if isOnlyLastBreak === true and row is last segment
    if (isOnlyLastBreak)
      isCurBlockValid =
        isRowLastSegment(row, schedulingTableData) &&
        isSegmentValid(row, time, null, selProgramsFpcId);
    // Perform insertion logic if the current segment is valid
    if (isCurBlockValid) {
      let newSelectedRows = isSkipInsInSameProg
        ? [...selectedRows].filter(
            (curRow) => curRow.ContentCode !== row.ContentCode,
          )
        : [...selectedRows];
      // Case 1: Insert rows at the start of the segment
      if (insertPosition === bulkInsertPositionEnum.START && isRowSegment) {
        // Add the current row and the secondary table's selected rows
        if (isRandomizeIns) {
          if (isRepeatRandomIns)
            newSchedulingTableData.push(
              row,
              ...lodash.shuffle(newSelectedRows),
            );
          else {
            const shuffledRows = lodash.shuffle(newSelectedRows);
            const rowsToInsert = shuffledRows.slice(0, insCountPerSeg);
            newSelectedRows = shuffledRows.slice(
              insCountPerSeg,
              shuffledRows.length,
            );
            newSchedulingTableData.push(row, ...rowsToInsert);
          }
        } else newSchedulingTableData.push(row, ...newSelectedRows);
        continue; // Move to the next iteration
      }
      // Case 2: Insert rows at the end of the segment
      if (
        insertPosition === bulkInsertPositionEnum.END && // Check if insertion is at the end
        (!nextRow ||
          (nextRow && // Ensure there is a next row
            (nextRow.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION || // Check if the next row is content termination
              nextRow.F_C_S_P === rowDataTypesEnum.SEGMENT))) // Or if it's another segment
      ) {
        // If the current row is a commercial, find the insertion point
        if (
          page === pagesEnum.SONG &&
          (row.F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
            row.F_C_S_P === rowDataTypesEnum.BREAK)
        ) {
          // Traverse backward to locate the last non-commercial row
          for (let j = newSchedulingTableData.length - 1; j >= 0; j--) {
            if (
              newSchedulingTableData[j].F_C_S_P !==
                rowDataTypesEnum.COMMERCIAL &&
              newSchedulingTableData[j].F_C_S_P !== rowDataTypesEnum.BREAK
            ) {
              // Insert the secondary table's selected rows after the identified row
              let rowsToInsert = newSelectedRows;
              if (isRandomizeIns) {
                if (isRepeatRandomIns)
                  rowsToInsert = lodash.shuffle(newSelectedRows);
                else {
                  const shuffledRows = lodash.shuffle(newSelectedRows);
                  rowsToInsert = shuffledRows.slice(0, insCountPerSeg);
                  newSelectedRows = shuffledRows.slice(
                    insCountPerSeg,
                    shuffledRows.length,
                  );
                }
              }
              newSchedulingTableData.splice(
                j + 1, // Position to insert
                0,
                ...rowsToInsert, // Rows to insert
              );
              break; // Stop searching once the insertion point is found
            }
          }
        } else {
          // Otherwise, add the current row and the selected rows
          if (isRandomizeIns) {
            if (isRepeatRandomIns)
              newSchedulingTableData.push(
                row,
                ...lodash.shuffle(newSelectedRows),
              );
            else {
              const shuffledRows = lodash.shuffle(newSelectedRows);
              const rowsToInsert = shuffledRows.slice(0, insCountPerSeg);
              newSelectedRows = shuffledRows.slice(
                insCountPerSeg,
                shuffledRows.length,
              );
              newSchedulingTableData.push(row, ...rowsToInsert);
            }
          } else newSchedulingTableData.push(row, ...newSelectedRows);
          continue; // Move to the next iteration
        }
      }
    }
    // Default case: Add the current row to the updated table
    newSchedulingTableData.push(row);
  }
  return newSchedulingTableData;
}

export { executeSongBulkInsert };
