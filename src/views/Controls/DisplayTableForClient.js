import React, { useEffect, useState } from 'react';
import { Button, Table } from 'components/ui';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import './Displaytable.css';
import TableRowSkeleton from 'components/shared/loaders/TableRowSkeleton';
import { ExportxlswithColor } from './ExportxlswithColor';
import { HiDownload } from 'react-icons/hi';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody, Sorter } = Table;
export const handleExportToExcel = (columns, table, ExportName) => {
  const mapping = {};
  columns.forEach((item) => {
    if (item.accessorKey) {
      mapping[item.accessorKey] = item.header;
    }
  });
  if (Array.isArray(table)) {
    ExportxlswithColor(
      false,
      false,
      0,
      0,
      true,
      table,
      ExportName,
      columns,
      false,
    );
  } else {
    // Update keys in the data array based on the mapping
    const updatedArray = table.getCoreRowModel().rows.map((item) => {
      const updatedItem = {};
      Object.keys(item.original).forEach((key) => {
        if (mapping[key]) {
          updatedItem[mapping[key]] = item.original[key];
        } else {
          updatedItem[key] = item.original[key];
        }
      });
      return updatedItem;
    });
    const news = [
      ...columns,
      {
        header: 'IsActive',
        accessorKey: 'IsActive',
      },
    ];
    ExportxlswithColor(
      false,
      false,
      0,
      0,
      true,
      updatedArray,
      ExportName,
      news,
      false,
    );
  }
};

const DisplayTableForClient = ({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  ExportName
}) => {
  /* REDUX */
  const themeColor = useSelector((state) => state.theme.themeColor);

  /* STATES */
  const [sorting, setSorting] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* USE EFFECTS */
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  /* TABLE PROPERTIES */
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const mode = useSelector((state) => state.theme.mode);
  return (
    <div className="root-container">
      <Table className="table">
        <THead
          className="border-b-1  "
          style={{
            borderColor: themeColor,
            height: '4%',
          }}
          variant="solid"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr
              key={headerGroup.id}
              className="tr3"
              style={{ height: '34px;!important' }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    style={{ height: '34px;!important' }}
                    key={header.id}
                    colSpan={header.colSpan}
                    className={mode == 'dark' ? 'ht' : 'Light'}
                  >
                    <h6 className="text-xs">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none '
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {
                            <>
                              <Sorter sort={header.column.getIsSorted()} />

                              <div
                                className={`cursor-all-scroll ${header.column.getIsResizing()
                                  ? 'isResizing'
                                  : ''
                                  }`}
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                              ></div>
                            </>
                          }
                        </div>
                      )}
                    </h6>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </THead>
        {isLoading ? (
          <TableRowSkeleton columns={1} rows={0} />
        ) : (
          <TBody className="tbody">
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id} className="tr">
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        // className={`text-xs    ${
                        //   themeColo2r.mode == 'dark' ? 'td4' : 'td2'
                        // }`}
                        className={
                          mode == 'dark'
                            ? 'text-xs text-center srno td'
                            : 'text-xs text-center srno tdLight'
                        }
                      >
                        <p className="  ">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </p>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </TBody>
        )}
      </Table>
      <div className="flex items-center justify-end mt-1">
        <Button
          variant="solid"
          className="mr-2"
          onClick={() => {
            handleExportToExcel(columns, table, ExportName);
          }}
          style={{ width: 130 }}
          block
          size="sm"
          icon={<HiDownload />}
        >
          Export
        </Button>

      </div>
    </div>
  );
};

export default DisplayTableForClient;
