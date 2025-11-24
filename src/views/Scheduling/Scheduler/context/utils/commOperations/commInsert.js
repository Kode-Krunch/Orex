import { removeRowsFromTableData } from '../../utils';
import { getCorrectedDestIndex, validateComm } from './utils';

const executeCommInsert = (
  destIndex,
  schTableData,
  secTableData,
  selectedRows,
  activeFeatures,
) => {
  try {
    let newSchTableData = [...schTableData];
    let newSecTableData = [...secTableData];
    let destinationIndex = getCorrectedDestIndex(
      destIndex,
      schTableData,
      activeFeatures,
    );
    /* DRAG VALIDATION */
    const validComm = validateComm({
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

export { executeCommInsert };
