import {
  additionalRowInfoEnum,
  droppableIdsEnum,
  tableTypesEnum,
} from '../../../enum';
import {
  getTableDataWithAdditionalInfo,
  removeRowsFromTableData,
} from '../../utils';
import {
  getCorrectedDestIndexForSecTableDrag,
  getCorrectedDestIndex,
  validateComm,
} from './utils';

const executeSecCommDrag = (
  dragInfo,
  schTableData,
  secTableData,
  secTableSelectedRows,
  activeFeatures,
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
      const result = executeSecToSchTableDrag(
        dragInfo,
        schTableData,
        secTableData,
        selectedRows,
        activeFeatures,
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
) => {
  try {
    let newSchTableData = [...schTableData];
    let newSecTableData = [...secTableData];
    let destinationIndex = getCorrectedDestIndex(
      dragInfo.destination.index,
      schTableData,
      activeFeatures,
    );
    /* DRAG VALIDATION */
    const validComm = validateComm({
      dragInfo,
      destIndex: destinationIndex,
      tableData: schTableData,
      selectedRows,
    });
    if (!validComm) return false;
    newSchTableData.splice(destinationIndex, 0, ...validComm);
    newSecTableData = removeRowsFromTableData(validComm, newSecTableData);
    return { newSchTableData, newSecTableData };
  } catch (error) {
    throw error;
  }
};

export { executeSecCommDrag };
