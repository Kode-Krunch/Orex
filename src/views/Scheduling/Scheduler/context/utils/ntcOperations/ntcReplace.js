import { updateOffsetStartTimeOfNTCs } from './utils';

const executeNtcReplace = (
  schTableData,
  schTableSelectedRows,
  secTableSelectedRow,
  isAutoCalcNtcOffsetTime,
) => {
  let newSchTableData = replaceNtcRows(
    schTableData,
    schTableSelectedRows,
    secTableSelectedRow,
  );
  if (isAutoCalcNtcOffsetTime) {
    newSchTableData = updateOffsetStartTimeOfNTCs(newSchTableData);
  }
  return newSchTableData;
};

const replaceNtcRows = (schTableData, schTableSelRows, secTableSelRow) => {
  let newSchTableData = [...schTableData];
  schTableSelRows.forEach((selRow) => {
    newSchTableData[selRow.rowIndex] = {
      ...selRow,
      Event_Name: secTableSelRow.Event_Name,
      Duration: secTableSelRow.Duration,
      VideoID: secTableSelRow.HouseID,
      Tape_ID: secTableSelRow.Tape_ID,
      NtcTypeName: secTableSelRow.NtcTypeName,
    };
  });
  return newSchTableData;
};

export { executeNtcReplace };
