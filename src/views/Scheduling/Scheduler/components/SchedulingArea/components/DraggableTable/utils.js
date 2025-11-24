import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { getRowWithNTC } from 'views/Scheduling/Scheduler/context/utils';
import {
  featuresEnum,
  pagesEnum,
  rowDataTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';

const isRowDragDisabled = (
  page,
  activeFeatures,
  row,
  index,
  tableType,
  secondaryTableSelectedRows,
) => {
  try {
    if (
      secondaryTableSelectedRows.length > 0 &&
      tableType === tableTypesEnum.SCHEDULING
    )
      return true;
    else if (page === pagesEnum.COMMERCIAL) {
      if (row.F_C_S_P !== rowDataTypesEnum.COMMERCIAL) return true;
    } else if (page === pagesEnum.PROMO) {
      if (row.F_C_S_P !== rowDataTypesEnum.PROMO) return true;
    } else if (page === pagesEnum.SONG) {
      if (row.F_C_S_P !== rowDataTypesEnum.SONG) return true;
    } else if (page === pagesEnum.NTC) {
      if (row.F_C_S_P !== rowDataTypesEnum.NTC || isNTCDragDisabled(row))
        return true;
    } else if (page === pagesEnum.FINAL_LOG) {
      if (
        (!activeFeatures[featuresEnum.MANAGE_SEGMENT] &&
          (row.F_C_S_P === rowDataTypesEnum.SEGMENT ||
            row.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION)) ||
        (activeFeatures[featuresEnum.MANAGE_SEGMENT] &&
          tableType === tableTypesEnum.SCHEDULING &&
          index === 1) ||
        isNTCDragDisabled(row)
      )
        return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

const isRowSelected = (selectedRows, row) => {
  try {
    return selectedRows
      .map((selectedRow) => selectedRow.rowId)
      .includes(row.rowId);
  } catch (error) {
    throw error;
  }
};

const isRowLeftClicked = (
  tableType,
  leftClickedSchTableRow,
  leftClickedSecTableRow,
  selectedRows,
  row,
) => {
  try {
    return (
      (tableType === tableTypesEnum.SCHEDULING &&
        leftClickedSchTableRow &&
        row.rowId === leftClickedSchTableRow.rowId &&
        !isRowSelected(selectedRows, row)) ||
      (tableType === tableTypesEnum.SECONDARY &&
        leftClickedSecTableRow &&
        row.rowId === leftClickedSecTableRow.rowId &&
        !isRowSelected(selectedRows, row))
    );
  } catch (error) {
    throw error;
  }
};

const isColumnWarningColumn = (cellWarning, column) => {
  try {
    for (let index = cellWarning.length - 1; index >= 0; index--) {
      const curCellWarning = cellWarning[index];
      if (curCellWarning.cell === column.accessorKey) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const getFontColor = (
  tableType,
  leftClickedSchTableRow,
  leftClickedSecTableRow,
  selectedRows,
  row,
  column,
) => {
  try {
    if (
      Array.isArray(row.cellWarning) &&
      isColumnWarningColumn(row.cellWarning, column)
    ) {
      for (let index = row.cellWarning.length - 1; index >= 0; index--) {
        const cellWarning = row.cellWarning[index];
        if (cellWarning.cell === column.accessorKey) {
          return cellWarning.fontColor;
        }
      }
    } else if (
      isRowLeftClicked(
        tableType,
        leftClickedSchTableRow,
        leftClickedSecTableRow,
        selectedRows,
        row,
      )
    ) {
      return 'rgb(229 231 235)';
    } else if (isRowSelected(selectedRows, row)) {
      return 'rgb(229 231 235)';
    }
    return row.EventDefaultFrontColor;
  } catch (error) {
    console.error(error);
  }
};

const getBgColor = (
  tableType,
  leftClickedSchTableRow,
  leftClickedSecTableRow,
  selectedRows,
  row,
  column,
) => {
  try {
    if (
      Array.isArray(row.cellWarning) &&
      isColumnWarningColumn(row.cellWarning, column)
    ) {
      for (let index = row.cellWarning.length - 1; index >= 0; index--) {
        const cellWarning = row.cellWarning[index];
        if (cellWarning.cell === column.accessorKey) {
          return cellWarning.bgColor;
        }
      }
    } else if (
      isRowLeftClicked(
        tableType,
        leftClickedSchTableRow,
        leftClickedSecTableRow,
        selectedRows,
        row,
      )
    ) {
      return 'rgba(148, 163, 184, 0.9)';
    } else if (isRowSelected(selectedRows, row)) {
      return 'rgb(71 85 105)';
    }
    if (
      tableType === tableTypesEnum.SCHEDULING &&
      row.customCellColor &&
      column.accessorKey in row.customCellColor
    )
      return row.customCellColor[column.accessorKey];
    else return row.EventDefaultBackColor;
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

const getUpdatedSelectedRows = (
  selectedRows,
  clickedRow,
  tableType,
  schedulingTableData,
  secTableSelRows,
) => {
  let newSelectedRows = [...selectedRows];
  const isSelected = isRowSelected(newSelectedRows, clickedRow);
  if (tableType === tableTypesEnum.SECONDARY) {
    return isSelected
      ? newSelectedRows.filter((row) => row.rowId !== clickedRow.rowId)
      : [...newSelectedRows, clickedRow];
  }
  if (newSelectedRows.length === 0) {
    // Allow all selections
    if (
      clickedRow.F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
      clickedRow.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION
    ) {
      newSelectedRows = isSelected
        ? newSelectedRows.filter((row) => row.rowId !== clickedRow.rowId)
        : [...newSelectedRows, clickedRow];
    } else if (
      clickedRow.F_C_S_P === rowDataTypesEnum.PROMO ||
      clickedRow.F_C_S_P === rowDataTypesEnum.SONG ||
      clickedRow.F_C_S_P === rowDataTypesEnum.SEGMENT ||
      clickedRow.F_C_S_P === rowDataTypesEnum.LIVE
    ) {
      const rowWithNTCs =
        secTableSelRows.length > 0
          ? [clickedRow]
          : getRowWithNTC([clickedRow], schedulingTableData);
      const unselectingRowIds = rowWithNTCs.map((row) => row.rowId);
      newSelectedRows = isSelected
        ? newSelectedRows.filter(
            (row) => !unselectingRowIds.includes(row.rowId),
          )
        : [...newSelectedRows, ...rowWithNTCs];
    } else if (clickedRow.F_C_S_P === rowDataTypesEnum.NTC) {
      if (!isSelected) {
        newSelectedRows.push(clickedRow);
      } else {
        newSelectedRows = newSelectedRows.filter(
          (row) => row.rowId !== clickedRow.rowId,
        );
      }
    }
  } else {
    const isAllSelectedRowsNTCs = newSelectedRows.every(
      (row) => row.F_C_S_P === rowDataTypesEnum.NTC,
    );
    if (!isAllSelectedRowsNTCs) {
      if (
        clickedRow.F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
        clickedRow.F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION
      ) {
        newSelectedRows = isSelected
          ? newSelectedRows.filter((row) => row.rowId !== clickedRow.rowId)
          : [...newSelectedRows, clickedRow];
      } else if (
        clickedRow.F_C_S_P === rowDataTypesEnum.PROMO ||
        clickedRow.F_C_S_P === rowDataTypesEnum.SONG ||
        clickedRow.F_C_S_P === rowDataTypesEnum.SEGMENT ||
        clickedRow.F_C_S_P === rowDataTypesEnum.LIVE
      ) {
        const rowWithNTCs =
          secTableSelRows.length > 0
            ? [clickedRow]
            : getRowWithNTC([clickedRow], schedulingTableData);
        const unselectingRowIds = rowWithNTCs.map((row) => row.rowId);
        newSelectedRows = isSelected
          ? newSelectedRows.filter(
              (row) => !unselectingRowIds.includes(row.rowId),
            )
          : [...newSelectedRows, ...rowWithNTCs];
      } else {
        openNotification(
          'danger',
          'You cannot select NTCs since your previous selection contains non NTC rows',
        );
      }
    } else {
      if (clickedRow.F_C_S_P === rowDataTypesEnum.NTC) {
        if (!isSelected) {
          newSelectedRows.push(clickedRow);
        } else {
          newSelectedRows = newSelectedRows.filter(
            (row) => row.rowId !== clickedRow.rowId,
          );
        }
      } else {
        openNotification(
          'danger',
          'You can only select NTC rows since your previous selection contains only NTC rows',
        );
      }
    }
  }
  return newSelectedRows;
};

const isRowNTCCompatible = (row) => {
  try {
    return (
      row.F_C_S_P !== rowDataTypesEnum.COMMERCIAL &&
      row.F_C_S_P !== rowDataTypesEnum.CONTENT_TERMINATION &&
      row.F_C_S_P !== rowDataTypesEnum.NTC
    );
  } catch (error) {
    throw error;
  }
};

const getNTCRowsForParentRow = (parentRow, tableData) => {
  try {
    let index = parentRow.rowIndex + 1;
    let ntcRows = [];
    while (tableData[index]?.F_C_S_P === rowDataTypesEnum.NTC) {
      ntcRows.push(tableData[index]);
      index++;
    }
    return ntcRows;
  } catch (error) {
    throw error;
  }
};

const getUpdatedSelectedRowsForShiftClick = (
  row,
  selectedRows,
  tableData,
  tableType,
  isManageSegmentActive,
) => {
  try {
    let newSelectedRows = [];
    if (selectedRows.length === 0) newSelectedRows = [row];
    else {
      let lastSelectedRow = selectedRows[selectedRows.length - 1];
      if (row.rowIndex < lastSelectedRow.rowIndex) {
        newSelectedRows = tableData
          .slice(row.rowIndex, lastSelectedRow.rowIndex + 1)
          .reverse();
        let firstRow = newSelectedRows[0];
        if (
          tableType === tableTypesEnum.SCHEDULING &&
          isRowNTCCompatible(firstRow)
        ) {
          newSelectedRows = [
            ...getNTCRowsForParentRow(firstRow, tableData),
            ...newSelectedRows,
          ];
        }
      } else {
        newSelectedRows = tableData.slice(
          lastSelectedRow.rowIndex,
          row.rowIndex + 1,
        );
        let lastRow = newSelectedRows[newSelectedRows.length - 1];
        if (
          tableType === tableTypesEnum.SCHEDULING &&
          isRowNTCCompatible(lastRow)
        ) {
          newSelectedRows = [
            ...newSelectedRows,
            ...getNTCRowsForParentRow(lastRow, tableData),
          ];
        }
      }
    }
    if (isManageSegmentActive)
      newSelectedRows = newSelectedRows.filter(
        (row) => row.rowIndex !== 0 && row.rowIndex !== 1,
      );
    else
      newSelectedRows = newSelectedRows.filter(
        (row) =>
          row.F_C_S_P !== rowDataTypesEnum.CONTENT_TERMINATION &&
          row.F_C_S_P !== rowDataTypesEnum.SEGMENT,
      );
    return newSelectedRows;
  } catch (error) {
    throw error;
  }
};

const isNTCDragDisabled = (row) => {
  return row.F_C_S_P === rowDataTypesEnum.NTC && row.NTCGroupCode === 999;
};

export {
  isRowDragDisabled,
  getFontColor,
  getBgColor,
  getBorderColor,
  getUpdatedSelectedRows,
  getUpdatedSelectedRowsForShiftClick,
  isRowNTCCompatible,
};
