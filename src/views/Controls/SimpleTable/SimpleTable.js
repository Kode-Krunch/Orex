import React, { useState } from 'react';
import { Table } from 'components/ui';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import './simpleTable.css';
import AutoSizer from 'react-virtualized-auto-sizer';
import classNames from 'classnames';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const SimpleTable = ({ data, columns, trClassNames }) => {
  /* STATES */
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <div style={{ height, width }} className="overflow-auto">
          <Table>
            <THead className="sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        className={`overflow-hidden text-ellipsis whitespace-nowrap border-r border-r-gray-600 !normal-case w-max px-2 ${index === 0 && 'border-l border-l-gray-600'}`}
                        style={{
                          width: header.column.columnDef.headStyle?.width,
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none table-head-cell '
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                            style={{
                              fontSize:
                                header.column.columnDef.headStyle?.fontSize,
                              justifyContent:
                                header.column.columnDef.headStyle?.align,
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {<Sorter sort={header.column.getIsSorted()} />}
                          </div>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </THead>
            <TBody>
              {table
                .getRowModel()
                .rows.slice(0, 10)
                .map((row) => {
                  return (
                    <Tr key={row.id} className={typeof trClassNames === 'function' ? trClassNames(row.original) : ''}>
                      {row.getVisibleCells().map((cell, index) => {
                        return (
                          <Td
                            key={cell.id}
                            className={classNames(
                              'overflow-hidden text-ellipsis whitespace-nowrap border-r border-r-gray-700 text-gray-200 border-b border-b-gray-700 w-max px-2',
                              index === 0 && 'border-l border-l-gray-700',
                            )}
                            style={{
                              width: cell.column.columnDef.cellStyle?.width,
                              textAlign: cell.column.columnDef.cellStyle?.align,
                            }}
                          >
                            <div
                              className="table-body-cell"
                              style={{
                                fontWeight:
                                  cell.column.columnDef.cellStyle?.fontWeight,
                                fontSize:
                                  cell.column.columnDef.cellStyle?.fontSize,
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </div>
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
            </TBody>
          </Table>
        </div>
      )}
    </AutoSizer>
  );
};

export default SimpleTable;
