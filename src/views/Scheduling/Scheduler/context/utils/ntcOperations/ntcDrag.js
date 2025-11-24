import {
  additionalRowInfoEnum,
  droppableIdsEnum,
  tableTypesEnum,
} from '../../../enum';
import {
  getTableDataWithAdditionalInfo,
  isBasicDragValid,
  removeRowsFromTableData,
} from '../../utils';
import {
  executeSecToSchTableNtcInsert,
  getCorrectedDestIndex,
  getCorrectedDestIndexForSecTableDrag,
} from './utils';

const executeSecNTCDrag = (
  dragInfo,
  schTableData,
  secTableData,
  secTableSelectedRows,
  activeFeatures,
  channel,
  isAutoCalculateOffsetTime,
  isNtcGroupingEnabled,
) => {
  try {
    const sourceDroppableId = dragInfo.source.droppableId;
    const destDroppableId = dragInfo.destination.droppableId;
    const selectedRows =
      secTableSelectedRows.length > 0
        ? secTableSelectedRows
        : [secTableData[dragInfo.source.index]];
    let newSchTableData = [...schTableData],
      newSecTableData;
    if (
      sourceDroppableId === droppableIdsEnum.SECONDARY &&
      destDroppableId === droppableIdsEnum.SECONDARY
    ) {
      newSecTableData = executeSecTableDrag(
        dragInfo,
        secTableData,
        selectedRows,
        activeFeatures,
      );
    } else if (
      sourceDroppableId === droppableIdsEnum.SECONDARY &&
      destDroppableId === droppableIdsEnum.SCHEDULING
    ) {
      const result = executeSecToSchTableDrag(
        dragInfo,
        schTableData,
        secTableData,
        selectedRows,
        activeFeatures,
        channel,
        isAutoCalculateOffsetTime,
        isNtcGroupingEnabled,
      );
      if (!result) return false;
      newSchTableData = result.newSchTableData;
      newSecTableData = result.newSecTableData;
    }
    return { newSchTableData, newSecTableData };
  } catch (error) {
    throw error;
  }
};

const executeSecTableDrag = (
  dragInfo,
  tableData,
  selectedRows,
  activeFeatures,
) => {
  try {
    let newTableData = [...tableData];
    let selectedRowsWithNewRowId = getTableDataWithAdditionalInfo({
      tableData: selectedRows,
      tableType: tableTypesEnum.SECONDARY,
      additionalInfo: [additionalRowInfoEnum.ROW_ID],
    });
    let destinationIndex = getCorrectedDestIndexForSecTableDrag(
      dragInfo,
      tableData,
      activeFeatures,
    );
    newTableData.splice(destinationIndex, 0, ...selectedRowsWithNewRowId);
    newTableData = removeRowsFromTableData(selectedRows, newTableData);
    return newTableData;
  } catch (error) {
    throw error;
  }
};

const executeSecToSchTableDrag = (
  dragInfo,
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
      dragInfo.destination.index,
      schTableData,
      activeFeatures,
    );
    if (dragInfo && !isBasicDragValid(dragInfo, destIndex)) return false;
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

export { executeSecNTCDrag };
