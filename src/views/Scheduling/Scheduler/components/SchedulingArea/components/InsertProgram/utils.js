import { convertDateToYMD } from 'components/validators';
import { apiGettransmissionlog2 } from 'services/SchedulingService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  rowDataTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import { getDummyRow, getRowId } from '../../utils/utils';

const getProgramsWithSegment = async (channel, date) => {
  try {
    let programs = [];
    const response = await apiGettransmissionlog2(
      {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
      },
      convertDateToYMD(date),
    );
    if (response.status === 200 && response.data.length > 0)
      programs = [getDummyRow(response.data[0]), ...response.data].map(
        (row, index) => {
          let newRow = {
            ...row,
            rowId: getRowId(tableTypesEnum.SECONDARY, row),
            rowIndex: index,
          };
          if (newRow.F_C_S_P !== rowDataTypesEnum.CONTENT_TERMINATION) {
            newRow.isFiltered = false;
            newRow.isHidden = true;
          }
          return newRow;
        },
      );
    else if (response.status === 204)
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
