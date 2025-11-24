import { updateOffsetStartTimeOfNTCs } from './utils';

const executeNtcReplaceAll = (
  schTableData,
  schTableSelRows,
  secTableSelRow,
  isAutoCalcNtcOffsetTime,
) => {
  let newSchTableData = replaceNtcRows(
    schTableData,
    schTableSelRows,
    secTableSelRow,
  );
  if (isAutoCalcNtcOffsetTime) {
    newSchTableData = updateOffsetStartTimeOfNTCs(newSchTableData);
  }
  return newSchTableData;
};

const replaceNtcRows = (schTableData, schTableSelRows, secTableSelRow) => {
  return schTableData.map((row) => {
    const replacedRow = { ...row };
    if (schTableSelRows.includes(row.Event_Name)) {
      replacedRow.Event_Name = secTableSelRow.Event_Name;
      replacedRow.Duration = secTableSelRow.Duration;
      replacedRow.VideoID = secTableSelRow.HouseID;
      replacedRow.Tape_ID = secTableSelRow.Tape_ID;
      replacedRow.NtcTypeName = secTableSelRow.NtcTypeName;
    }
    return replacedRow;
  });
};

export { executeNtcReplaceAll };
