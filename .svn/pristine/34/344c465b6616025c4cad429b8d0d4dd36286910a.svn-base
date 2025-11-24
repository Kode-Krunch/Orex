const executePromoReplace = (
  schTableData,
  schTableSelectedRows,
  secTableSelectedRow,
) => {
  let newSchTableData = [...schTableData];
  /* PLACE SELECTED ROWS IN SCHEDULING TABLE */
  schTableSelectedRows.forEach((selRow) => {
    newSchTableData[selRow.rowIndex] = {
      ...selRow,
      Event_Name: secTableSelectedRow.Event_Name,
      Duration: secTableSelectedRow.Duration,
      VideoID: secTableSelectedRow.HouseID,
      Tape_ID: secTableSelectedRow.Tape_ID,
      PromoCode: secTableSelectedRow.PromoCode,
      PromoTypeCode: secTableSelectedRow.PromoType,
    };
  });
  return newSchTableData;
};

export { executePromoReplace };
