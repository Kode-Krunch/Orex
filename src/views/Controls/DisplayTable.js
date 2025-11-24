import React, { useEffect, useState } from 'react';
import { Pagination, Select, Table, Tooltip } from 'components/ui';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from '@tanstack/react-table';
import { Button } from 'components/ui';
import { HiDownload, HiOutlinePencil, HiOutlineX } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import './Displaytable.css';
import TableRowSkeleton from 'components/shared/loaders/TableRowSkeleton';
import { ExportxlswithColor } from './ExportxlswithColor';
import { BsPencilSquare } from 'react-icons/bs';
import { rankItem } from '@tanstack/match-sorter-utils';
import { FaRegEye } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { TbDownload } from 'react-icons/tb';
import { apiCallstoreprocedure } from 'services/CommonService';
// import { startsWith } from 'lodash';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody, Sorter } = Table;
const pageSizeOption = [
  { value: 10, label: '10 / page' },
  { value: 20, label: '20 / page' },
  { value: 30, label: '30 / page' },
  { value: 40, label: '40 / page' },
  { value: 50, label: '50 / page' },
];

/* HELPER FUNCTIONS */
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

const DisplayTable = ({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  seteditData,
  openDrawer,
  ExportName,
}) => {
  /* REDUX */
  const themeColor = useSelector((state) => state.theme.themeColor);
  const mode = useSelector((state) => state.theme.mode);
  /* STATES */
  const [columnFilters, setColumnFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* HOOKS */
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugHeaders: true,
    debugColumns: false,
    debugTable: true,
  });

  /* USE EFFECTS */
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, []);

  /* EVENT HANDLERS */
  const onPaginationChange = (page) => {
    table.setPageIndex(page - 1);
  };

  const onSelectChange = (value) => {
    table.setPageSize(Number(value));
  };

  /* HELPER FUNCTIONS */
  function fuzzyFilter(row, columnId, value, addMeta) {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });
    return itemRank.passed;
  }

  return (
    <div className="root-container">
      <Table className="table">
        <THead
          className="border-b-1 "
          style={{
            borderColor: themeColor,
            height: '4%',
          }}
          variant="solid"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id} className="tr3">
              <Th
                className={mode == 'dark' ? 'srno th' : 'srno th Light'}
                style={{ textAlign: 'Center' }}
              >
                <h6
                  className={
                    mode == 'dark'
                      ? 'capitalize  text-xs'
                      : 'capitalize   text-xs Light'
                  }
                >
                  Sr.
                </h6>
              </Th>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width: header.column.columnDef.headStyle?.width,
                    }}
                  >
                    <h6 className="capitalize text-xs">
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
                                className={`cursor-all-scroll ${
                                  header.column.getIsResizing()
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
              {ExportName == 'ExchangeMaster' ||
              ExportName.includes('Retrieved Spots') ||
              ExportName.includes('Matched Spots') ||
              ExportName.includes('Missed Spots') ||
              ExportName.includes('All Spots') ||
              ExportName.includes('Imported Spots') ||
              ExportName.includes('Bill Spots') ||
              ExportName === '' ? null : (
                <Th className={mode == 'dark' ? 'actions ' : 'actions '}>
                  <center className="capitalize text-center font-bold ">
                    Actions
                  </center>
                </Th>
              )}
            </Tr>
          ))}
        </THead>
        {isLoading ? (
          <TableRowSkeleton columns={3} rows={5} />
        ) : (
          <TBody className="tbody">
            {table.getRowModel().rows.map((row, index) => {
              const currentPage = table.getState().pagination.pageIndex;
              const pageSize = table.getState().pagination.pageSize;
              const serialNumber = currentPage * pageSize + index + 1;
              return (
                <Tr key={row.id} className="tr">
                  <Td
                    className={
                      mode == 'dark'
                        ? 'text-xs  srno td'
                        : 'text-xs  srno tdLight'
                    }
                    style={{ textAlign: 'Center' }}
                  >
                    {serialNumber}
                  </Td>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        className={
                          mode == 'dark'
                            ? 'text-xs  font-medium  td'
                            : 'text-xs   font-medium  tdLight'
                        }
                        style={{
                          width: cell.column.columnDef.cellStyle?.width,
                        }}
                      >
                        <p className="text-xs">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </p>
                      </Td>
                    );
                  })}
                  {ExportName == 'ExchangeMaster' ||
                  ExportName.includes('Retrieved Spots') ||
                  ExportName.includes('Matched Spots') ||
                  ExportName.includes('Missed Spots') ||
                  ExportName.includes('All Spots') ||
                  ExportName.includes('Imported Spots') ||
                  ExportName.includes('Bill Spots') ||
                  ExportName === '' ? null : ExportName.includes(
                      'Credit/Debit Note Bills',
                    ) ? (
                    <Td
                      className={
                        mode == 'dark'
                          ? 'text-xs font-medium  td !w-max'
                          : 'text-xs font-medium  tdLight '
                      }
                    >
                      <center>
                        <Tooltip
                          title={`Generate ${row.original.noteType.label} Note`}
                        >
                          <Button
                            className="btnEdit"
                            size="xs"
                            icon={<BsPencilSquare />}
                            onClick={() => {
                              seteditData(row.original);
                            }}
                          ></Button>
                        </Tooltip>
                      </center>
                    </Td>
                  ) : ExportName.includes('Credit/Debit Notes Edit') ? (
                    <Td
                      className={
                        mode == 'dark'
                          ? 'text-xs font-medium  td '
                          : 'text-xs font-medium  tdLight '
                      }
                    >
                      <div className="flex gap-2 justify-center">
                        <Tooltip title="View Note">
                          <Button size="xs" icon={<FaRegEye />} />
                        </Tooltip>
                        <Tooltip title="Download Note">
                          <Button size="xs" icon={<TbDownload />} />
                        </Tooltip>
                        {row.original.IRNNumber === '' &&
                          row.original.QRCODE === '' && (
                            <Tooltip title="Edit Note">
                              <Button
                                size="xs"
                                icon={<GoPencil />}
                                onClick={() => {
                                  seteditData(row.original);
                                }}
                              />
                            </Tooltip>
                          )}
                      </div>
                    </Td>
                  ) : (
                    <Td
                      className={
                        mode == 'dark'
                          ? 'text-xs font-medium actions td '
                          : 'text-xs font-medium  actions tdLight '
                      }
                    >
                      <center>
                        <Button
                          className="btnEdit"
                          size="xs"
                          icon={<HiOutlinePencil />}
                          onClick={() => {
                            seteditData(row.original);
                            openDrawer(row.original);
                          }}
                        ></Button>

                        {ExportName == 'SpotBooking' &&
                          row.original.BookingCode?.startsWith('uns') && (
                            <Button
                              className="btnEdit ml-2"
                              size="xs"
                              icon={<HiOutlineX />}
                              onClick={async () => {
                                try {
                                  const reps = await apiCallstoreprocedure(
                                    'USP_DELETE_TEMPBooking',
                                    {
                                      par_BookingNumber:
                                        row.original.BookingNumber,
                                    },
                                  );
                                  // Handle the response (reps) as needed
                                  console.log(reps);
                                } catch (error) {
                                  // Handle any errors that occur during the API call
                                  console.error(
                                    'Error calling stored procedure:',
                                    error,
                                  );
                                }
                              }}
                            ></Button>
                          )}
                      </center>
                    </Td>
                  )}
                </Tr>
              );
            })}
          </TBody>
        )}
      </Table>
      <div className="bottom-actions-container">
        {data?.length > 10 && (
          <div className="flex items-center justify-between mt-1">
            <Pagination
              pageSize={table.getState().pagination.pageSize}
              currentPage={table.getState().pagination.pageIndex + 1}
              total={data.length}
              onChange={onPaginationChange}
            />
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
              {data.length > 10 ? (
                <div style={{ minWidth: 130 }}>
                  <Select
                    size="sm"
                    isSearchable={false}
                    value={pageSizeOption.filter(
                      (option) =>
                        option.value === table.getState().pagination.pageSize,
                    )}
                    options={pageSizeOption}
                    onChange={(option) => onSelectChange(option.value)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className="flex  justify-start mt-2">
          <h1 className="text-xs  font-light">Records : {data?.length}</h1>
        </div>
      </div>
    </div>
  );
};

export default DisplayTable;
