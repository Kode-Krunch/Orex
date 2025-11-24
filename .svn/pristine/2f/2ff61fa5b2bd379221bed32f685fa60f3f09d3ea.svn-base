import React, { useContext, useState } from 'react';
import { TABLE_ROW_HEIGHT } from 'views/Scheduling/Scheduler/constants';
import SchedulerContext from 'views/Scheduling/Scheduler/context/SchedulerContext';
import { getBgColor, getBorderColor, getFontColor } from './utils';

function RotationInfoTable({ columns, tableData }) {
  /* CONTEXT */
  const {
    schedulingTableRef,
    schedulingTableSelectedRows,
    setSchedulingTableSelectedRows,
    setLeftClickedSchTableRow,
    maintainScrolledOffsetOfTables,
  } = useContext(SchedulerContext);

  /* STATES */
  const [hoveredRow, setHoveredRow] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);

  /* EVENT HANDLERS */
  const handleCtrlClick = (clickedRow) => {
    try {
      if (
        schedulingTableSelectedRows.filter(
          (row) => row.rowIndex === clickedRow.rowIndex,
        ).length > 0
      ) {
        setSchedulingTableSelectedRows(
          schedulingTableSelectedRows.filter(
            (row) => row.rowIndex !== clickedRow.rowIndex,
          ),
        );
      } else {
        setSchedulingTableSelectedRows([
          ...schedulingTableSelectedRows,
          ...tableData.filter((row) => row.rowIndex === clickedRow.rowIndex),
        ]);
      }
      setLeftClickedSchTableRow(clickedRow);
      maintainScrolledOffsetOfTables();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Table Header */}
      <div className="flex font-semibold text-white text-[12px] sticky top-0">
        {columns.map((column, index) => (
          <div
            style={{
              width: `${column.style.width}%`,
              height: `${TABLE_ROW_HEIGHT}px`,
            }}
            key={column.accessorKey}
            className={`flex-none flex items-center justify-${
              column.accessorKey !== 'Event_Name' && 'center'
            } px-2.5 bg-gray-700 border-gray-400 border-y border-r ${
              index === 0 && 'border-l'
            }`}
          >
            {column.header}
          </div>
        ))}
      </div>
      {/* Table Body */}
      <div>
        {tableData.map((row) => (
          <div
            key={row.rowId}
            className="hover:cursor-pointer flex"
            onMouseEnter={() => setHoveredRow(row)}
            onMouseLeave={() => setHoveredRow(null)}
            onClick={(event) => {
              if (event.button === 0 && event.ctrlKey) handleCtrlClick(row);
              else {
                schedulingTableRef.current?.scrollToItem(
                  row.rowIndex,
                  'center',
                );
                setClickedRow(row);
                setTimeout(() => {
                  maintainScrolledOffsetOfTables();
                  setLeftClickedSchTableRow(row);
                }, 0);
              }
            }}
          >
            {columns.map((column, index) => (
              <div
                key={index}
                style={{
                  height: `${TABLE_ROW_HEIGHT}px`,
                  width: `${column.style.width}%`,
                  backgroundColor: getBgColor(
                    schedulingTableSelectedRows,
                    row,
                    hoveredRow,
                    clickedRow,
                  ),
                  color: getFontColor(
                    schedulingTableSelectedRows,
                    row,
                    clickedRow,
                  ),
                  borderColor: getBorderColor(schedulingTableSelectedRows, row),
                }}
                className={`flex-none flex items-center justify-${
                  column.accessorKey !== 'Event_Name' && 'center'
                } text-[12px] py-1 px-2.5 border-b border-r ${
                  index === 0 && 'border-l'
                }`}
              >
                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {row[column.accessorKey]}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default RotationInfoTable;
