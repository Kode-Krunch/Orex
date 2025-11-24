import { apiPOSTColumnSetting } from 'services/ControlsService';
import {
  isJSONArrayEqual,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { featuresEnum } from 'views/Scheduling/Scheduler/enum';

const getColumns = (columnType, managedColumns) => {
  try {
    if (columnType === 'draggable') {
      return managedColumns.visibleColumns;
    } else {
      return managedColumns.removedColumns;
    }
  } catch (error) {
    console.error(error);
  }
};

const reorderColumns = (list, startIndex, endIndex) => {
  try {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  } catch (error) {
    throw error;
  }
};

const onDragEnd = (result, columnsState, setColumnsState) => {
  try {
    if (!result.destination) {
      return;
    }
    const newItems = reorderColumns(
      columnsState.draggableColumns,
      result.source.index,
      result.destination.index,
    );
    setColumnsState({ ...columnsState, draggableColumns: newItems });
  } catch (error) {
    openNotification('danger', 'Something went wrong');
    console.error(error);
  }
};

const handleHeaderChange = (event, column, columnsState, setColumnsState) => {
  try {
    const newDraggableColumns = columnsState.draggableColumns.map((col) => {
      if (col.id === column.id) {
        return {
          ...col,
          header: event.target.innerText,
        };
      }
      return col;
    });
    setColumnsState({ ...columnsState, draggableColumns: newDraggableColumns });
  } catch (error) {
    console.log(error);
  }
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.target.blur();
  }
};

const handleRemoveColumn = (column, columnsState, setColumnsState) => {
  try {
    const newDraggableColumns = columnsState.draggableColumns.filter(
      (col) => col.id !== column.id,
    );
    const newRemovedColumns = [...columnsState.removedColumns, column];
    setColumnsState({
      draggableColumns: newDraggableColumns,
      removedColumns: newRemovedColumns,
    });
  } catch (error) {
    openNotification('danger', 'Something went wrong while removing column');
    console.error(error);
  }
};

const handleReset = (managedColumns, setColumnsState) => {
  try {
    setColumnsState({
      draggableColumns: managedColumns.originalColumns,
      removedColumns: [],
    });
  } catch (error) {
    openNotification('danger', 'Something went wrong while resetting columns');
    console.error(error);
  }
};

const getColumnSettingsToPersist = (columnsState, tableName) => {
  try {
    let data = columnsState.draggableColumns.map((column, index) => {
      return {
        ScreenName: tableName,
        Header: column.header,
        ColumnName: column.id,
        ColumnWidht: column.style.width,
        SequenceNo: index,
        IsVisible: 1,
      };
    });
    let index = columnsState.draggableColumns.length;
    columnsState.removedColumns.forEach((column) => {
      data.push({
        ScreenName: tableName,
        Header: column.header,
        ColumnName: column.id,
        ColumnWidht: column.style.width,
        SequenceNo: index,
        IsVisible: 0,
      });
      index++;
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const persistColumnSettingsToDB = async (columnSettings, token) => {
  try {
    const response = await apiPOSTColumnSetting(columnSettings);
    if (response.status !== 200) {
      openNotification(
        'danger',
        `Something went wrong while saving column settings`,
      );
    }
  } catch (error) {
    openNotification(
      'danger',
      'Something went wrong while saving column settings',
    );
    console.error(error);
  }
};

const handleApply = async (
  tableName,
  columnsState,
  managedColumns,
  setManagedColumns,
  setActiveFeatures,
  token,
  isCloseDropdown,
) => {
  try {
    let columnSettings = [];
    setManagedColumns((prevState) => {
      return {
        ...prevState,
        visibleColumns: columnsState.draggableColumns,
        removedColumns: columnsState.removedColumns,
      };
    });
    if (isCloseDropdown)
      setActiveFeatures((prevState) => ({
        ...prevState,
        [featuresEnum.MANAGE_COLUMNS]: {
          isDropdownVisible: false,
          isActive:
            columnsState.removedColumns.length > 0 ||
            !isJSONArrayEqual(
              managedColumns.originalColumns,
              columnsState.draggableColumns,
            ),
        },
      }));
    if (typeof tableName === 'string')
      columnSettings = getColumnSettingsToPersist(columnsState, tableName);
    else
      console.error(
        `Scheduling Table Column Settings not saved. schedulingTableName must be string but got ${typeof tableName}`,
      );
    if (columnSettings.length > 0) {
      persistColumnSettingsToDB(columnSettings, token);
    }
  } catch (error) {
    openNotification('danger', 'Something went wrong while applying changes');
    console.error(error);
  }
};

const handleAddColumn = (column, columnsState, setColumnsState) => {
  try {
    const newDraggableColumns = [...columnsState.draggableColumns, column];
    const newRemovedColumns = columnsState.removedColumns.filter(
      (col) => col.id !== column.id,
    );
    setColumnsState({
      draggableColumns: newDraggableColumns,
      removedColumns: newRemovedColumns,
    });
  } catch (error) {
    openNotification('danger', 'Something went wrong while adding column');
    console.error(error);
  }
};

const getClassNamesForHeaderButtons = (isFeatureEnabled) => {
  try {
    return isFeatureEnabled
      ? '!bg-teal-700 hover:!bg-teal-800'
      : '!bg-gray-700 hover:!bg-gray-800 hover:!bg-opacity-60';
  } catch (error) {
    console.error(error);
  }
};

export {
  getColumns,
  onDragEnd,
  handleHeaderChange,
  handleKeyDown,
  handleRemoveColumn,
  handleReset,
  handleApply,
  handleAddColumn,
  getClassNamesForHeaderButtons,
};
