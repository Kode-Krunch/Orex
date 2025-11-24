import { convertDateToDMY } from 'components/validators';
import { format } from 'date-fns';
import { ExportxlswithColor } from 'views/Controls/ExportxlswithColor';
import { pagesEnum } from 'views/Scheduling/Scheduler/enum';

const exportFormat2 = (tableData, date, channel, page) => {
  try {
    let exportFileName = '';
    if (page === pagesEnum.PROMO) {
      //exportFileName = 'Promo_Schedule';
      exportFileName = `${format(date, 'ddMMyyyy')}_Promo_${channel.label === 'India Food Food' ? 'India' : channel.label
        }`;
    } else if (page === pagesEnum.SONG) {
      //exportFileName = 'Song_Schedule';
      exportFileName = `${format(date, 'ddMMyyyy')}_Song_${channel.label === 'India Food Food' ? 'India' : channel.label
        }`;
    } else if (page === pagesEnum.COMMERCIAL) {
      //exportFileName = 'Commercial_Schedule';
      exportFileName = `${format(date, 'ddMMyyyy')}_Commercial_${channel.label === 'India Food Food' ? 'India' : channel.label
        }`;
    } else if (page === pagesEnum.NTC) {
      //exportFileName = 'NTC_Schedule';
      exportFileName = `${format(date, 'ddMMyyyy')}_NTC_${channel.label === 'India Food Food' ? 'India' : channel.label
        }`;
    } else if (page === pagesEnum.FINAL_LOG) {
      //exportFileName = 'Final_Log';
      exportFileName = `${format(date, 'ddMMyyyy')}_FinalLog_${channel.label === 'India Food Food' ? 'India' : channel.label
        }`;
    }

    const tableDataForExport = tableData.map((row) => ({
      FPC_Time: row.FPC_Time ? `${row.FPC_Time}:00:00` : '',
      Tel_Time: row.Tel_Time,
      TRAISLOT: convertTimecodeToRange(row.Tel_Time),
      Event_Name: row.Event_Name,
      Duration: row.Duration,
      TC_IN: row.TC_IN,
      TC_Out: row.TC_Out,
      Video_ID: row.Video_ID,
      F_C_S_P: row.F_C_S_P,
      TelecastDate: date,
      SeasonNo: row.SeasonNo,
      EpisodeNo: row.EpisodeNo,
      DealNo: row.DealNo,
      Agency: row.Agency,
      Client: row.Client,
      Brand: row.Brand,
      Product: row.Product,
      PromoTypeName: row.PromoTypeName,
      RODP_Category: row.RODP_Category,
      BookingNumber: row.BookingNumber,
      BookingDetailCode: row.BookingDetailCode,
    }));
    const columns = [
      {
        header: 'FPCTime',
        accessorKey: 'FPC_Time',
      },
      {
        header: 'GMTTime',
        accessorKey: 'Tel_Time',
      },
      {
        header: 'TRAISLOT',
        accessorKey: 'TRAISLOT',
      },
      {
        header: 'EventCaption',
        accessorKey: 'Event_Name',
      },
      {
        header: 'EventDuration',
        accessorKey: 'Duration',
      },
      {
        header: 'TCIN',
        accessorKey: 'TC_IN',
      },
      {
        header: 'TCOUT',
        accessorKey: 'TC_Out',
      },
      {
        header: 'VideoID',
        accessorKey: 'Video_ID',
      },
      {
        header: 'EventType',
        accessorKey: 'F_C_S_P',
      },
      {
        header: 'PromoTypeName',
        accessorKey: 'PromoTypeName',
      },
      {
        header: 'TelecastDate',
        accessorKey: 'TelecastDate',
      },
      {
        header: 'SeasonNo',
        accessorKey: 'SeasonNo',
      },
      {
        header: 'EpisodeNo',
        accessorKey: 'EpisodeNo',
      },
      {
        header: 'DealNumber',
        accessorKey: 'DealNo',
      },
      {
        header: 'TimeBandName',
        accessorKey: 'RODP_Category',
      },
      {
        header: 'AgencyName',
        accessorKey: 'Agency',
      },
      {
        header: 'ClientName',
        accessorKey: 'Client',
      },
      {
        header: 'BrandName',
        accessorKey: 'Brand',
      },
      {
        header: 'ProductName',
        accessorKey: 'Product',
      },
      {
        header: 'BookingNumber',
        accessorKey: 'BookingNumber',
      },
      {
        header: 'BookingDetailCode',
        accessorKey: 'BookingDetailCode',
      },
    ];
    ExportxlswithColor(
      false,
      false,
      0,
      0,
      false,
      tableDataForExport,
      // `${format(date, 'ddMMyyyy')}FinalLog_${channel.label === 'India Food Food' ? 'India' : channel.label
      // }`,
      exportFileName,
      columns,
      false,
    );
  } catch (error) {
    throw error;
  }
};

function convertTimecodeToRange(timecode) {
  /* FUNCTION FROM CHAT-GPT */
  const [hours, minutes, seconds, frames] = timecode.split(':').map(Number);
  const startHour = String(hours).padStart(2, '0');
  const endHour = String(hours + 1).padStart(2, '0');
  return `${startHour}:00-${endHour}:00 Hrs`;
}

export { exportFormat2 };
