const executePromoReplaceAll = (
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
      replacedRow.PromoCode = secTableSelRow.PromoCode;
      replacedRow.PromoTypeCode = secTableSelRow.PromoTypeCode;
    }
    return replacedRow;
  });
};

export { executePromoReplaceAll };
