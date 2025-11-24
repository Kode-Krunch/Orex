import { apiGetExportPlayOut } from 'services/SchedulingService';
import { CLIENT } from 'views/Controls/clientListEnum';
import { ExportToCSV, ExportToCSVCustomName } from 'views/Controls/ExportToCSV';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';

const exportPlayoutForCSV = async (channel, telecastDate) => {
  try {
    const response = await apiGetExportPlayOut(
      {
        LocationCode: channel.LocationCode,
        ChannelCode: channel.ChannelCode,
      },
      telecastDate,
    );
    if (response.status === 200) {
      if (channel.label === CLIENT.ANI_PLUS) {
        const date = new Date(telecastDate);

        const formatted = date.toISOString().slice(2, 10).replace(/-/g, '');

        ExportToCSVCustomName(response.data, `Aniplus_bats_${formatted}`);
      }
      else {
        ExportToCSV(response.data);
      }

    }
    else openNotification('danger', 'Something went wrong while exporting CSV');
  } catch (error) {
    throw error;
  }
};

export { exportPlayoutForCSV };
