import {
  additionalRowInfoEnum,
  droppableIdsEnum,
  tableTypesEnum,
} from '../../../enum';
import {
  getCorrectedDestIndexForIntraTableDrag,
  getTableDataWithAdditionalInfo,
  removeRowsFromTableData,
} from '../../utils';
import { getCorrectedDestIndex } from './utils';

const executeSecPromoDrag = (
  dragInfo,
  schTableData,
  secTableData,
  secTableSelectedRows,
  activeFeatures,
  page,
) => {
  try {
    const sourceDroppableId = dragInfo.source.droppableId;
    const destinationDroppableId = dragInfo.destination.droppableId;
    const selectedRows =
      secTableSelectedRows.length > 0
        ? secTableSelectedRows
        : [secTableData[dragInfo.source.index]];
    let newSchTableData = [...schTableData],
      newSecTableData;
    if (
      sourceDroppableId === droppableIdsEnum.SECONDARY &&
      destinationDroppableId === droppableIdsEnum.SECONDARY
    ) {
      newSecTableData = executeSecTableDrag(
        dragInfo,
        secTableData,
        selectedRows,
        activeFeatures,
      );
    } else if (
      sourceDroppableId === droppableIdsEnum.SECONDARY &&
      destinationDroppableId === droppableIdsEnum.SCHEDULING
    ) {
      newSchTableData = executeSecToSchTableDrag(
        dragInfo,
        schTableData,
        selectedRows,
        activeFeatures,
        page,
      );
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
    let destinationIndex = getCorrectedDestIndexForIntraTableDrag(
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
  selectedRows,
  activeFeatures,
  page,
) => {
  try {
    let newSchTableData = [...schTableData];
    let selectedRowsWithNewRowId = getTableDataWithAdditionalInfo({
      tableData: selectedRows,
      tableType: tableTypesEnum.SCHEDULING,
      additionalInfo: [additionalRowInfoEnum.ROW_ID],
    });
    let destinationIndex = getCorrectedDestIndex(
      dragInfo.destination.index,
      schTableData,
      activeFeatures,
      page,
    );
    newSchTableData.splice(destinationIndex, 0, ...selectedRowsWithNewRowId);
    return newSchTableData;
  } catch (error) {
    throw error;
  }
};

export { executeSecPromoDrag };
