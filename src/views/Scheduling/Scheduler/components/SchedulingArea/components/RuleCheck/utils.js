import {
  cellWarningTypesEnum,
  rowDataTypesEnum,
  ruleCheckTypesEnum,
} from 'views/Scheduling/Scheduler/enum';

const getRuleCheckTableData = (tableData, ruleCheckType) => {
  try {
    let ruleCheckTableData = [];
    if (ruleCheckType === ruleCheckTypesEnum.BACK_TO_BACK_PROMOS) {
      ruleCheckTableData = tableData.filter(
        (row) =>
          row.F_C_S_P === rowDataTypesEnum.PROMO &&
          Array.isArray(row.cellWarning) &&
          row.cellWarning.filter(
            (cellWarning) =>
              cellWarning.warningType === cellWarningTypesEnum.BACK_TO_BACK &&
              cellWarning.cell === 'Event_Name',
          ).length > 0,
      );
    } else if (ruleCheckType === ruleCheckTypesEnum.BACK_TO_BACK_SONGS) {
      ruleCheckTableData = tableData.filter(
        (row) =>
          row.F_C_S_P === rowDataTypesEnum.SONG &&
          Array.isArray(row.cellWarning) &&
          row.cellWarning.filter(
            (cellWarning) =>
              cellWarning.warningType === cellWarningTypesEnum.BACK_TO_BACK &&
              cellWarning.cell === 'Event_Name',
          ).length > 0,
      );
    } else if (ruleCheckType === ruleCheckTypesEnum.BACK_TO_BACK_COMMERCIALS) {
      ruleCheckTableData = tableData.filter(
        (row) =>
          row.F_C_S_P === rowDataTypesEnum.COMMERCIAL &&
          Array.isArray(row.cellWarning) &&
          row.cellWarning.filter(
            (cellWarning) =>
              cellWarning.warningType === cellWarningTypesEnum.BACK_TO_BACK,
          ).length > 0,
      );
    } else if (ruleCheckType === ruleCheckTypesEnum.MULTI_SPOTS) {
      ruleCheckTableData = tableData.filter(
        (row) =>
          row.F_C_S_P === rowDataTypesEnum.COMMERCIAL &&
          row.cellWarning?.filter(
            (cellWarning) =>
              cellWarning.warningType === cellWarningTypesEnum.MULTI_SPOT &&
              cellWarning.cell === 'Event_Name',
          ).length > 0,
      );
    } else if (ruleCheckType === ruleCheckTypesEnum.OUT_OF_TIMEBAND) {
      ruleCheckTableData = tableData.filter(
        (row) =>
          row.F_C_S_P === rowDataTypesEnum.COMMERCIAL &&
          row.cellWarning?.filter(
            (cellWarning) =>
              cellWarning.warningType ===
                cellWarningTypesEnum.OUT_OF_TIMEBAND &&
              cellWarning.cell === 'Event_Name',
          ).length > 0,
      );
    }
    return ruleCheckTableData;
  } catch (error) {
    throw error;
  }
};

const getCommercialRuleCheckTableColumns = (filterBy) => {
  try {
    let columns = [
      {
        header: 'Start_Time',
        accessorKey: 'Tel_Time',
        style: {
          width: '30%',
          align: 'center',
        },
      },
      {
        header: filterBy.value === 'all' ? 'Event_Name' : filterBy.value,
        accessorKey: filterBy.value === 'all' ? 'Event_Name' : filterBy.value,
        style: {
          width: '40%',
          align: 'center',
        },
      },
      {
        header: 'Duration',
        accessorKey: 'Duration',
        style: {
          width: '30%',
          align: 'center',
        },
      },
    ];
    return columns;
  } catch (error) {
    throw error;
  }
};

export { getRuleCheckTableData, getCommercialRuleCheckTableColumns };
