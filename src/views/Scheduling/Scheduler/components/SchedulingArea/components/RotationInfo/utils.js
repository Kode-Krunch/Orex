import { getHexColorWithOpacity } from 'views/Controls/GLOBALFUNACTION';

const isRowSelected = (selectedRows, row) => {
  try {
    return selectedRows
      .map((selectedRow) => selectedRow.rowId)
      .includes(row.rowId);
  } catch (error) {
    throw error;
  }
};

const getFontColor = (selectedRows, row, clickedRow) => {
  try {
    if (isRowSelected(selectedRows, row)) {
      return 'rgb(229 231 235)';
    } else if (row.rowId === clickedRow?.rowId) return 'white';
    return row.EventDefaultFrontColor;
  } catch (error) {
    console.error(error);
  }
};

const getBgColor = (selectedRows, row, hoveredRow, clickedRow) => {
  try {
    const isRowHovered = row.rowId === hoveredRow?.rowId;
    if (isRowSelected(selectedRows, row))
      return isRowHovered ? 'rgba(71, 85, 105, 0.8)' : 'rgb(71 85 105)';
    else if (row.rowId === clickedRow?.rowId) return 'rgba(148, 163, 184, 0.9)';
    return isRowHovered
      ? getHexColorWithOpacity(row.EventDefaultBackColor, 0.8)
      : row.EventDefaultBackColor;
  } catch (error) {
    console.error(error);
  }
};

const getBorderColor = (selectedRows, row) => {
  try {
    if (isRowSelected(selectedRows, row)) {
      return 'rgb(156 163 175)';
    }
    return 'rgb(107 114 128)';
  } catch (error) {
    console.error(error);
  }
};

const closeDropDowns = (event, dropdownRef, setSecTableToolbarState) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setSecTableToolbarState((prevState) => ({
      ...prevState,
      isManageColumnsDropdownVisible: false,
    }));
  }
};

export { getBgColor, getBorderColor, getFontColor, closeDropDowns };
