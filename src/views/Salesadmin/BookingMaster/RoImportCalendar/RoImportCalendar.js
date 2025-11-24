import React, { useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  getColumnsForDateRange,
  getCommonPinningStyles,
  getSpotsTotal,
  getTotalDuration,
} from './utils';
import {
  CELL_HEIGHT,
  PINNED_COLUMNS,
  PINNED_COLUMNS_DEF,
  SEL_COMM_KEY,
  SEL_DEAL_LINE_NO_KEY,
} from './constants';
import { getFieldTotal } from 'views/Controls/GLOBALFUNACTION';

function RoImportCalendar({
  containerRef,
  dateRange,
  calendarData = [],
  setCalendarData,
}) {
  /* PRE-PROCESSING */
  const columns = [...PINNED_COLUMNS_DEF, ...getColumnsForDateRange(dateRange)];

  /* HOOKS */
  const scrollContainerRef = useRef(null);
  const table = useReactTable({
    data: calendarData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning: {
        left: PINNED_COLUMNS,
      },
    },
    meta: {
      updateCell: (rowIndex, columnId, value, otherTopLevelValues) => {
        setCalendarData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                ...otherTopLevelValues,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      updateTable: (newTableData) => setCalendarData(newTableData),
    },
  });

  return (
    <>
      {calendarData.length > 0 ? (
        <div
          className="overflow-x-scroll relative"
          style={{ width: containerRef.current?.offsetWidth }}
          ref={scrollContainerRef}
        >
          <div
            style={{
              width: table.getTotalSize(),
              borderCollapse: 'separate',
              borderSpacing: 0,
            }}
          >
            <div>
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  key={headerGroup.id}
                  className="border-x border-x-gray-700 flex"
                >
                  {headerGroup.headers.map((header) => {
                    const { column } = header;
                    return (
                      <div
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ ...getCommonPinningStyles(column) }}
                        className="px-1 py-1.5 flex items-center justify-center gap-1 font-bold text-white bg-gray-700"
                      >
                        <div className="whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </div>
                        {(header.id === SEL_DEAL_LINE_NO_KEY ||
                          header.id === SEL_COMM_KEY) && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <div>
              {table.getRowModel().rows.map((row, index) => (
                <>
                  <div
                    key={row.id}
                    className="flex items-center border-x border-x-gray-700"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { column } = cell;
                      return (
                        <div
                          key={cell.id}
                          style={{ ...getCommonPinningStyles(column) }}
                          className="px-1 py-1 text-center bg-gray-800"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Render Total Row */}
                  {index === table.getRowModel().rows.length - 1 && (
                    <div
                      key={row.id}
                      className={
                        'flex items-center border-x border-x-gray-700 border-t border-t-gray-700 mt-2'
                      }
                    >
                      {row.getVisibleCells().map((cell) => {
                        const { column } = cell;
                        const accessorKey = column.columnDef.accessorKey;
                        const tableData = table
                          .getRowModel()
                          .rows.map((row) => row.original);
                        return (
                          <div
                            key={cell.id}
                            style={{
                              ...getCommonPinningStyles(column),
                              height: CELL_HEIGHT,
                            }}
                            className={`px-1 py-1 text-center bg-gray-800 text-gray-300 my-1 text-xs flex items-center justify-center ${
                              accessorKey === SEL_COMM_KEY
                                ? '!font-semibold !text-gray-200 !text-base !justify-end'
                                : ''
                            }`}
                          >
                            {accessorKey === 'delete' ||
                            accessorKey === SEL_DEAL_LINE_NO_KEY
                              ? ''
                              : accessorKey === SEL_COMM_KEY
                              ? 'Total'
                              : accessorKey === 'spots'
                              ? tableData.reduce(
                                  (sum, row) => sum + getSpotsTotal(row),
                                  0,
                                )
                              : accessorKey === 'totalDur'
                              ? tableData.reduce(
                                  (sum, row) => sum + getTotalDuration(row),
                                  0,
                                )
                              : getFieldTotal(tableData, accessorKey)}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-28 flex items-center justify-center rounded-lg bg-gray-900 bg-opacity-40">
          No deal line to show
        </div>
      )}
    </>
  );
}

export default RoImportCalendar;
