import {
  rowDataTypesEnum,
  secTableBottomToolbarFeaturesEnum,
} from 'views/Scheduling/Scheduler/enum';

const classNames = require('classnames');

const getClassNames = (isFeatureActive) => {
  try {
    return classNames(
      isFeatureActive
        ? '!bg-teal-700 hover:!bg-teal-700'
        : 'hover:!bg-teal-800',
      'transition-all !h-8 !w-8',
    );
  } catch (error) {
    console.error(error);
  }
};

const isReplaceFeatureDisabled = (
  schedulingTableSelectedRows,
  secondaryTableSelectedRows,
  isAutoCalcNtcOffsetTime,
  isNtcGroupingEnabled,
) => {
  try {
    if (
      secondaryTableSelectedRows.length === 1 &&
      schedulingTableSelectedRows.length > 0
    ) {
      const selRow = secondaryTableSelectedRows[0];
      let isSchTableSelectedRowsValid;
      if (
        selRow.F_C_S_P === rowDataTypesEnum.NTC &&
        (isAutoCalcNtcOffsetTime || isNtcGroupingEnabled)
      ) {
        isSchTableSelectedRowsValid = schedulingTableSelectedRows.every(
          (item) =>
            item.F_C_S_P === selRow.F_C_S_P &&
            item.NTCGroupCode === selRow.NTCGroupCode,
        );
      } else {
        isSchTableSelectedRowsValid = schedulingTableSelectedRows.every(
          (item) => item.F_C_S_P === selRow.F_C_S_P,
        );
      }
      if (!isSchTableSelectedRowsValid) {
        return true;
      }
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const isFeatureDisabled = (
  schedulingTableSelectedRows,
  secondaryTableSelectedRows,
  feature,
  isAutoCalcNtcOffsetTime,
  isNtcGroupingEnabled,
) => {
  try {
    switch (feature) {
      case secTableBottomToolbarFeaturesEnum.INSERT:
        return isInsertFeatureDisabled(
          schedulingTableSelectedRows,
          secondaryTableSelectedRows,
        );
      case secTableBottomToolbarFeaturesEnum.REPEAT_INSERT:
        return isRepeatInsertFeatureDisabled(
          schedulingTableSelectedRows,
          secondaryTableSelectedRows,
        );
      case secTableBottomToolbarFeaturesEnum.BULK_INSERT:
        return secondaryTableSelectedRows.length === 0 ? true : false;
      case secTableBottomToolbarFeaturesEnum.REPLACE:
        return isReplaceFeatureDisabled(
          schedulingTableSelectedRows,
          secondaryTableSelectedRows,
          isAutoCalcNtcOffsetTime,
          isNtcGroupingEnabled,
        );
      case secTableBottomToolbarFeaturesEnum.REPLACE_ALL:
        return isReplaceFeatureDisabled(
          schedulingTableSelectedRows,
          secondaryTableSelectedRows,
          isAutoCalcNtcOffsetTime,
          isNtcGroupingEnabled,
        );
      default:
        return false;
    }
  } catch (error) {
    console.error(error);
  }
};

const getBreaks = (tableData) => {
  try {
    let breaks = [];
    let maxBreaks = 0;
    tableData.forEach((row) => {
      if (Number(row.BreakNumber) > maxBreaks) {
        maxBreaks = Number(row.BreakNumber);
      }
    });
    for (let i = 1; i <= maxBreaks; i++) {
      breaks.push({ value: i, label: `Break ${i}` });
    }
    return breaks;
  } catch (error) {
    console.error(error);
  }
};

const isInsertFeatureDisabled = (schTableSelRows, secTableSelRows) =>
  schTableSelRows.length !== 1 ||
  secTableSelRows.length === 0 ||
  (secTableSelRows.length > 0 &&
    secTableSelRows[0].F_C_S_P === rowDataTypesEnum.NTC &&
    schTableSelRows.length === 1 &&
    (schTableSelRows[0].F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
      schTableSelRows[0].F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION));

const isRepeatInsertFeatureDisabled = (schTableSelRows, secTableSelRows) =>
  schTableSelRows.length !== 1 ||
  secTableSelRows.length === 0 ||
  (secTableSelRows.length > 0 &&
    secTableSelRows[0].F_C_S_P === rowDataTypesEnum.NTC &&
    schTableSelRows.length === 1 &&
    (schTableSelRows[0].F_C_S_P === rowDataTypesEnum.COMMERCIAL ||
      schTableSelRows[0].F_C_S_P === rowDataTypesEnum.CONTENT_TERMINATION ||
      schTableSelRows[0].F_C_S_P === rowDataTypesEnum.NTC));

export { getClassNames, isFeatureDisabled, getBreaks };
