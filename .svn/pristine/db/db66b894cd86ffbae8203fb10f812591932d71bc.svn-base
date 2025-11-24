import { saveAs } from 'file-saver';
import { parseDurationE } from 'views/Controls/GLOBALFUNACTION';

const exportPlayoutForPly = (
  telecastDate,
  tableData,
  exportPlayoutFileName,
) => {
  try {
    const content = generateFileContentForPly(
      telecastDate,
      '577252634066',
      exportPlayoutFileName,
      tableData,
    );
    saveAs(
      new Blob([content], { type: 'text/plain;charset=utf-8' }),
      `${exportPlayoutFileName}.ply`,
    );
  } catch (error) {
    throw error;
  }
};

const generateFileContentForPly = (
  telecastDate,
  playlistId,
  exportPlayoutFileName,
  tableData,
) => {
  try {
    let content = '';
    content += `#FILENAME ${exportPlayoutFileName}.ply\n`;
    content += `#PLAYLIST_FILE_NAME ${exportPlayoutFileName}.ply\n`;
    content += `#PLAYLISTID ${playlistId}\n`;
    content += `#PLAYLISTTC 00:00:00:00\n`;
    content += `#LISTNAME \n`;
    content += `#LISTID ${telecastDate.replaceAll('-', '')}000111\n`;
    content += `#DYNAMICMEDIA FALSE\n`;
    content += `#EVENT NOTE ${telecastDate.replaceAll('-', '')}\n`;
    // Initialize category count outside the loop
    let count = 1;
    tableData.forEach((item) => {
      const listId = `${telecastDate.replaceAll('-', '')}00000${item.SequenceNo
        }\n`;
      content += `#LISTID ${listId}`;
      content += `#DYNAMICMEDIA FALSE\n`;
      content += `#TC 0.00000\n`;
      if (item.F_C_S_P === 'CT') {
        content += `#EVENT NOTE ${item.Event_Name}\n`;
        content += `#LISTID 431825652124\n`;
        content += `#METADATA NOW ${item.Event_Name}\n`;
        content += `#METADATA Sname \n`;
        content += `#METADATA Mname \n`;
        content += `#STARTTIME 0;${item.FPC_Time}:00:00;-1;-1;0;;0\n`;
        content += `#PLAYLISTID ${listId}`;
        content += `#PLAYLISTTC 00:00:00:00\n`;
        content += `#CATEGORY NOW ${count}\n`;
        content += `#CATEGORY NEXT ${count}\n`;
        count++; // Increment count for the next item
      } else {
        let mediaPath = '';
        if (item.F_C_S_P === 'S') {
          mediaPath = `V:\\MOVIE PLUS\\MOVIE'S\\${item.Event_Name}\\${item.Video_ID}.mov`;
        } else if (item.F_C_S_P === 'SG') {
          mediaPath = `V:\\Songs\\${item.House_ID}.mov`;
        } else if (item.F_C_S_P === 'PR') {
          mediaPath = `V:\\MOVIE PLUS ID'S\\${item.Video_ID}.mov`;
        } else if (item.F_C_S_P === 'CM') {
          mediaPath = `V:\\TELESHOPPING AD\\${item.Video_ID}.mov`;
        }
        content += `"${mediaPath}"; 0.00000; ${parseDurationE(24,
          item.Duration,
        )}.00000; ; ${item.Event_Name}\n`;
      }
    });
    return content;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export { exportPlayoutForPly };
