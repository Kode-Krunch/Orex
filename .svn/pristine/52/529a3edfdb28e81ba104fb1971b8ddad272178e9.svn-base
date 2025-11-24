import classNames from 'classnames';
import React, { useContext } from 'react';
import DraggableTableContext from './context/DraggableTableContext';
import { TABLE_ROW_HEIGHT } from 'views/Scheduling/Scheduler/constants';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import {
  featuresEnum,
  operationTypesEnum,
  tableTypesEnum,
} from 'views/Scheduling/Scheduler/enum';
import FilterDropdown from './FilterDropDown';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

function SortingIcon({ sortingInfo, column }) {
  return (
    <div className="flex flex-col items-center">
      {sortingInfo.sort === 'none' || sortingInfo.column !== column ? (
        <FaSort />
      ) : (
        sortingInfo.column === column &&
        (sortingInfo.sort === 'asc' ? (
          <FaSortUp className="text-teal-500" />
        ) : (
          <FaSortDown className="text-teal-500" />
        ))
      )}
    </div>
  );
}

function Header({ index }) {
  /* CONTEXT */
  const { columns, tableType, isSortEnabled } = useContext(
    DraggableTableContext,
  );
  const {
    activeFeatures,
    schTableSortingInfo,
    setSchTableSortingInfo,
    secTableSortingInfo,
    setSecTableSortingInfo,
    executeOperation,
  } = useContext(SchedulerContext);

  /* EVENT HANDLERS */
  const handleSort = (column) => {
    if (tableType === tableTypesEnum.SCHEDULING) {
      let newSchTableSortingInfo = { ...schTableSortingInfo };
      if (schTableSortingInfo.sort === 'none')
        newSchTableSortingInfo = { column, tableType, sort: 'asc' };
      else if (schTableSortingInfo.sort === 'asc')
        newSchTableSortingInfo = { column, tableType, sort: 'desc' };
      else if (schTableSortingInfo.sort === 'desc')
        newSchTableSortingInfo = { column, tableType, sort: 'none' };
      setSchTableSortingInfo(newSchTableSortingInfo);
      executeOperation({
        operation: operationTypesEnum.SORT,
        sortingInfo: newSchTableSortingInfo,
      });
    } else {
      let newSecTableSortingInfo = { ...secTableSortingInfo };
      if (secTableSortingInfo.sort === 'none')
        newSecTableSortingInfo = { column, tableType, sort: 'asc' };
      else if (secTableSortingInfo.sort === 'asc')
        newSecTableSortingInfo = { column, tableType, sort: 'desc' };
      else if (secTableSortingInfo.sort === 'desc')
        newSecTableSortingInfo = { column, tableType, sort: 'none' };
      setSecTableSortingInfo(newSecTableSortingInfo);
      executeOperation({
        operation: operationTypesEnum.SORT,
        sortingInfo: newSecTableSortingInfo,
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        top: index * TABLE_ROW_HEIGHT,
        left: 0,
        width: '100%',
        height: TABLE_ROW_HEIGHT,
      }}
      className="sticky z-[2]"
    >
      {columns.map((column, index) => (
        <div
          style={{
            width: `${column.style.width}%`,
            textAlign: activeFeatures[featuresEnum.FILTER]
              ? 'start'
              : column.accessorKey !== 'Event_Name' && 'center',
          }}
          key={column.accessorKey}
          className={classNames(
            'h-full flex-none bg-gray-700 border-gray-400 border-y flex items-center py-1 pl-2.5 pr-1.5',
            index === 0 ? 'border-x' : 'border-r',
          )}
        >
          <div
            key={column.accessorKey}
            className={`w-full text-white font-semibold text-[12px] overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-2 ${
              isSortEnabled ? 'hover:cursor-pointer' : ''
            }`}
            onClick={() => isSortEnabled && handleSort(column.accessorKey)}
          >
            {column.header}
            {isSortEnabled && (
              <SortingIcon
                sortingInfo={
                  tableType === tableTypesEnum.SCHEDULING
                    ? schTableSortingInfo
                    : secTableSortingInfo
                }
                column={column.accessorKey}
              />
            )}
          </div>
          {activeFeatures[featuresEnum.FILTER] && (
            <FilterDropdown
              columnKey={column.accessorKey}
              isLastColumn={index === columns.length - 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Header;
