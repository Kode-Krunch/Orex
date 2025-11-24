import { convertDateToDMY } from 'components/validators';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';

const getEventTitleForFCSP = (fcsp) => {
  return fcsp === rowDataTypesEnum.PROMO
    ? 'PROMO'
    : fcsp === rowDataTypesEnum.COMMERCIAL
    ? 'COMMERCIAL'
    : fcsp === rowDataTypesEnum.SONG
    ? 'SONG'
    : fcsp === rowDataTypesEnum.SEGMENT
    ? 'PROGRAM'
    : fcsp === rowDataTypesEnum.NTC
    ? 'NTC'
    : fcsp === rowDataTypesEnum.CONTENT_TERMINATION
    ? 'CONTENT_TERMINATION'
    : '';
};

const exportPlayoutForUSAFoodFood2 = (tableData, date) => {
  try {
    const tableDataForExport = tableData.map((row) => ({
      TelecastDate: date,
      Start_Time: row.Start_Time,
      Video_ID: row.Video_ID,
      EventTitle: getEventTitleForFCSP(row.F_C_S_P),
      Duration: row.Duration,
      SOM: '00:00:00:00',
      StartType: 'SEQ',
      EndType: 'NORMAL',
      LOGO: 'LOGO OFF',
      Empty: 'EMPTY',
      Type: 'MEDIA',
      Event_Name: row.Event_Name,
    }));
    const columns = [
      {
        header: 'DATE',
        accessorKey: 'TelecastDate',
      },
      {
        header: 'Start Time',
        accessorKey: 'Start_Time',
      },
      {
        header: 'Media ID',
        accessorKey: 'Video_ID',
      },
      {
        header: 'Event Title',
        accessorKey: 'EventTitle',
      },
      {
        header: 'Duration',
        accessorKey: 'Duration',
      },
      {
        header: 'SOM',
        accessorKey: 'SOM',
      },
      {
        header: 'StartType',
        accessorKey: 'StartType',
      },
      {
        header: 'EndType',
        accessorKey: 'EndType',
      },
      {
        header: 'LOGO',
        accessorKey: 'LOGO',
      },
      {
        header: 'Empty',
        accessorKey: 'Empty',
      },
      {
        header: 'Type',
        accessorKey: 'Type',
      },
      {
        header: 'Caption',
        accessorKey: 'Event_Name',
      },
    ];
    ExportxlswithColor(
      true,
      true,
      1,
      3,
      false,
      tableDataForExport,
      `FOODFOOD-${convertDateToDMY(date)}-MOD1`,
      columns,
      false,
    );
  } catch (error) {
    throw error;
  }
};

export { exportPlayoutForUSAFoodFood2 };
