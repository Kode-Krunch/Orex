import { getProgramSchedule } from 'views/Scheduling/Scheduler/components/SchedulingArea/utils/utils';
import { droppableIdsEnum } from '../../../enum';
import { getCorrectedDestIndexIfDestIndexIsNtc } from '../../utils';

const executeSecProgramDrag = (
  dragInfo,
  schTableData,
  secTableData,
  secTableSelectedRows,
) => {
  try {
    const sourceDroppableId = dragInfo.source.droppableId;
    const destinationDroppableId = dragInfo.destination.droppableId;
    const selectedRows =
      secTableSelectedRows.length > 0
        ? secTableSelectedRows
        : [secTableData[dragInfo.source.index]];
    if (
      sourceDroppableId === droppableIdsEnum.SECONDARY &&
      destinationDroppableId === droppableIdsEnum.SECONDARY
    )
      return false;
    else if (
      sourceDroppableId === droppableIdsEnum.SECONDARY &&
      destinationDroppableId === droppableIdsEnum.SCHEDULING
    ) {
      let newSchTableData = [...schTableData],
        newSecTableData;
      const programsWithSegment = [];
      selectedRows.forEach((row) => {
        programsWithSegment.push(...getProgramSchedule(secTableData, row));
      });
      newSchTableData = executeSecToSchTableDrag(
        dragInfo,
        schTableData,
        programsWithSegment,
      );
      return { newSchTableData, newSecTableData };
    }
  } catch (error) {
    throw error;
  }
};

const executeSecToSchTableDrag = (dragInfo, schTableData, selectedRows) => {
  try {
    let newSchTableData = [...schTableData];
    /* DESTINATION INDEX CORRECTION IF DESTINATION ROW IS NTC */
    let destinationIndex = getCorrectedDestIndexIfDestIndexIsNtc(
      dragInfo.destination.index,
      schTableData,
    );
    newSchTableData.splice(destinationIndex, 0, ...selectedRows);
    return newSchTableData;
  } catch (error) {
    throw error;
  }
};

export { executeSecProgramDrag };
