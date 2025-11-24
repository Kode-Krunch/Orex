import {
  openNotification,
  subtractTimes,
} from 'views/Controls/GLOBALFUNACTION';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';
import { addTimes } from '../Summary/utils';

const getSelectedRowSummary = (selectedRows) => {
  try {
    const count = selectedRows.length;
    let duration = '00:00:00:00';
    selectedRows.forEach(
      (row) => (duration = addTimes(duration, row.Duration)),
    );
    return `${count}-[${duration.slice(0, 11)}]`;
  } catch (error) {
    openNotification('danger', 'Something went wrong while fetching summary');
    console.error(error);
  }
};

const getContentIndexes = (tableData, selectedRow) => {
  try {
    if (selectedRow) {
      const rowIndex = tableData.findIndex(
        (row) => row.rowId === selectedRow.rowId,
      );
      let startIndex, endIndex;
      const slicedTableData = tableData.slice(0, rowIndex + 1);
      for (let i = slicedTableData.length - 1; i >= 0; i--) {
        if (
          slicedTableData[i].F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION
        ) {
          startIndex = tableData.findIndex(
            (row) => row.rowId === slicedTableData[i].rowId,
          );
          break;
        }
      }
      for (let i = rowIndex + 1; i < tableData.length; i++) {
        if (tableData[i].F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION) {
          endIndex =
            tableData.findIndex((row) => row.rowId === tableData[i].rowId) - 1;
          break;
        }
      }
      return {
        startIndex: startIndex || 1,
        endIndex: endIndex || tableData.length - 1,
      };
    } else
      return {
        startIndex: null,
        endIndex: null,
      };
  } catch (error) {
    throw error;
  }
};

const getTotalDurationInContentForRowType = (
  contentIndexes,
  tableData,
  selectedRow,
  rowDataType,
) => {
  try {
    let duration = '00:00:00:00';
    if (
      selectedRow &&
      contentIndexes.startIndex !== null &&
      contentIndexes.endIndex !== null
    ) {
      const segments = tableData
        .slice(contentIndexes.startIndex, contentIndexes.endIndex + 1)
        .filter((row) => row.F_C_S_P === rowDataType);
      segments.forEach((segment) => {
        duration = addTimes(duration, segment.Duration);
      });
    }
    return duration;
  } catch (error) {
    openNotification('danger', 'Something went wrong while fetching summary');
    console.error(error);
  }
};

const getSlotDuration = (contentIndexes, tableData, leftClickedSchTableRow) => {
  try {
    let duration = '00:00:00:00';
    if (
      leftClickedSchTableRow &&
      contentIndexes.startIndex !== null &&
      contentIndexes.endIndex !== null
    ) {
      const ctRow = tableData[contentIndexes.startIndex];
      if (ctRow.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION)
        duration = subtractTimes(
          `${ctRow.FPC_TimeTo}:00:00`,
          `${ctRow.FPC_Time}:00:00`,
        );
    }
    return duration;
  } catch (error) {
    openNotification('danger', 'Something went wrong while fetching summary');
    console.error(error);
  }
};

const getTotalContentDuration = (
  contentIndexes,
  schedulingTableData,
  leftClickedSchTableRow,
) => {
  try {
    let totalDuration = '00:00:00:00';
    if (
      leftClickedSchTableRow &&
      contentIndexes.startIndex !== null &&
      contentIndexes.endIndex !== null
    ) {
      for (
        let index = contentIndexes.startIndex;
        index <= contentIndexes.endIndex;
        index++
      ) {
        if (
          schedulingTableData[index] &&
          schedulingTableData[index].F_C_S_P !== rowDataTypesEnum.NTC
        )
          totalDuration = addTimes(
            totalDuration,
            schedulingTableData[index].Duration,
          );
      }
    }
    return totalDuration;
  } catch (error) {
    throw error;
  }
};

export {
  getSelectedRowSummary,
  getContentIndexes,
  getTotalDurationInContentForRowType,
  getSlotDuration,
  getTotalContentDuration,
};
