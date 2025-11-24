import { convertDateToYMD } from 'components/validators';
import { apiGettransmissionlog2 } from 'services/SchedulingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  rowDataTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { getRowId } from '../../utils/utils';

const generateProgramsWithSegmentFromSchedule = (
  schedulingTableData,
  schedule,
) => {
  try {
    let programs = [];
    const programsFromSchedulingTable = schedulingTableData.filter(
      (row) => row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION,
    );
    const programsFromSchedule = schedule.filter(
      (row) => row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION,
    );
    programsFromSchedule.forEach((row, index) => {
      if (
        (programsFromSchedulingTable[index] &&
          row.FPC_Time !== programsFromSchedulingTable[index].FPC_Time) ||
        (programsFromSchedulingTable[index] &&
          row.Event_Name !== programsFromSchedulingTable[index].Event_Name)
      )
        programs.push({
          ...row,
          EventDefaultBackColor: '#b91b1c',
          EventDefaultFrontColor: 'white',
          rowId: getRowId(tableTypesEnum.SECONDARY, row),
        });
      else
        programs.push({
          ...row,
          rowId: getRowId(tableTypesEnum.SECONDARY, row),
        });
      programs.push(
        ...schedule
          .filter(
            (scheduleRow) =>
              scheduleRow.F_C_S_P === rowDataTypesEnum.SEGMENT &&
              scheduleRow.FPC_ID === row.FPC_ID,
          )
          .map((row) => ({
            ...row,
            rowId: getRowId(tableTypesEnum.SECONDARY, row),
          })),
      );
    });
    return programs;
  } catch (error) {
    throw error;
  }
};

const getProgramsWithSegment = async (channel, date, schedulingTableData) => {
  try {
    let programs = [];
    const response = await apiGettransmissionlog2(
      {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
      },
      convertDateToYMD(date),
    );
    if (response.status === 200 && response.data.length > 0) {
      programs = generateProgramsWithSegmentFromSchedule(
        schedulingTableData,
        response.data,
      );
      programs = programs.map((row, index) => ({ ...row, rowIndex: index }));
    } else if (response.status === 204)
      openNotification('info', 'No programs found');
    else
      openNotification(
        'danger',
        'Something went wrong while fetching programs',
      );
    return programs;
  } catch (error) {
    throw error;
  }
};

export { getProgramsWithSegment };
