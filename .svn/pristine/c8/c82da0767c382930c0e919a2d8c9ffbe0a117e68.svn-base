const executeSongReplaceAll = (
  schTableData,
  schTableSelRows,
  secTableSelRow,
) => {
  return schTableData.map((row) => {
    const replacedRow = { ...row };
    if (schTableSelRows.includes(row.Event_Name)) {
      replacedRow.Event_Name = secTableSelRow.Event_Name;
      replacedRow.Duration = secTableSelRow.Duration;
      replacedRow.VideoID = secTableSelRow.HouseID;
      replacedRow.Tape_ID = secTableSelRow.Tape_ID;
      replacedRow.SongCode = secTableSelRow.SongCode;
      replacedRow.SongTypeCode = secTableSelRow.SongTypeCode;
      replacedRow.SongCategoryCode = secTableSelRow.SongCategoryCode;
    }
    return replacedRow;
  });
};

export { executeSongReplaceAll };
