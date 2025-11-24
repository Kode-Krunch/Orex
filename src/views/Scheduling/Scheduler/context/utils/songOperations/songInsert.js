import {
  additionalRowInfoEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { getTableDataWithAdditionalInfo } from '../../utils';
import { getCorrectedDestIndex } from './utils';

const executeSongInsert = (
  destIndex,
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
      destIndex,
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

export { executeSongInsert };
