import { convertDateToDMY } from 'components/validators';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import { rowDataTypesEnum } from 'views/Scheduling/Scheduler/enum';

const exportPlayoutForOsc = (date, tableData, channel) => {
  try {
    const content = generateFileContentForOsc(
      convertDateToDMY(date),
      tableData,
    );
    saveAs(
      new Blob([content], { type: 'text/plain;charset=utf-8' }),
      `${format(date, 'ddMMyyyy')}-0530-530_${
        channel.label === 'India Food Food' ? 'India' : channel.label
      }.osc`,
    );
  } catch (error) {
    throw error;
  }
};

const generateFileContentForOsc = (telecastDate, tableData) => {
  try {
    let content = '';
    tableData.forEach((row) => {
      if (row.F_C_S_P !== rowDataTypesEnum.CONTENT_TERMINATION) {
        content += `ITEM\n`;
        content += `preset_date ${telecastDate.replaceAll('-', '/')}\n`;
        content += `preset_time ${row.Tel_Time}\n`;
        content += `clip ${row.Video_ID}\n`;
        content += `title ${row.Event_Name}\n`;
        content += `clip_dur ${row.Duration}\n`;
        content += `mode 1\n`;
        content += `type 1\n`;
        content += `end\n`;
      }
    });
    return content;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { exportPlayoutForOsc };
