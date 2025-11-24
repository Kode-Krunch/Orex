import React, { useContext } from 'react';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { tableTypesEnum } from 'views/Scheduling/Scheduler/enum';

function ColumnWidthControl({
  column,
  columnsState,
  setColumnsState,
  tableType,
}) {
  /* CONTEXT */
  const {
    setSchedulingTableManagedColumns,
    setSecondaryTableManagedColumns,
    maintainScrolledOffsetOfTables,
  } = useContext(SchedulerContext);

  /* EVENT HANDLERS */
  const changeColumnWidth = (columnId, operation) => {
    try {
      const updatedDraggableColumns = {
        ...columnsState,
      }.draggableColumns.map((column) =>
        applyChanges(columnId, column, operation),
      );
      const updatedColumnsState = {
        ...columnsState,
        draggableColumns: updatedDraggableColumns,
      };
      setColumnsState(updatedColumnsState);
      if (tableType === tableTypesEnum.SCHEDULING) {
        setSchedulingTableManagedColumns((prevState) => {
          return {
            ...prevState,
            visibleColumns: columnsState.draggableColumns,
            removedColumns: columnsState.removedColumns,
          };
        });
      } else {
        setSecondaryTableManagedColumns((prevState) => {
          return {
            ...prevState,
            visibleColumns: columnsState.draggableColumns,
            removedColumns: columnsState.removedColumns,
          };
        });
      }
      maintainScrolledOffsetOfTables();
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while changing column width',
      );
      console.error(error);
    }
  };

  /* HELPER FUNCTIONS */
  const applyChanges = (columnId, column, operation) => {
    try {
      if (column.id === columnId) {
        let width = column.style.width;
        if (operation === 'increment') width = width + 1;
        else {
          if (width - 1 > 5) width = width - 1;
          else width = 5;
        }
        return {
          ...column,
          style: {
            ...column.style,
            width,
          },
        };
      } else return column;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex items-center border border-gray-500 text-white rounded-full">
      <div
        className={`px-2 hover:bg-gray-600 hover:cursor-pointer transition-all rounded-tl-full rounded-bl-full ${
          column.style.width === 5 &&
          'bg-gray-800 bg-opacity-60 hover:bg-gray-800 hover:cursor-not-allowed'
        }`}
        onClick={() => changeColumnWidth(column.id, 'decrement')}
      >
        -
      </div>
      <div className="!bg-gray-600 px-1.5 border-x border-x-gray-500">
        {column.style.width < 10
          ? `0${column.style.width}`
          : column.style.width}
      </div>
      <div
        className="px-2  hover:bg-gray-600 hover:cursor-pointer transition-all rounded-tr-full rounded-br-full"
        onClick={() => changeColumnWidth(column.id, 'increment')}
      >
        +
      </div>
    </div>
  );
}

export default ColumnWidthControl;
