import React, {
  useRef,
  useEffect,
  useMemo,
  memo,
  useCallback,
  useState,
} from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Table from 'components/ui/Table';
import Checkbox from 'components/ui/Checkbox';
import AutoSizer from 'react-virtualized-auto-sizer';
import classNames from 'classnames';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import { Pagination } from 'components/ui';
import DebouncedInput from './DebouncedInput';
import { renderCellContent } from './utils';

const { Tr, Th, Td, THead, TBody } = Table;
const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10 / page' },
  { value: 20, label: '20 / page' },
  { value: 30, label: '30 / page' },
  { value: 40, label: '40 / page' },
  { value: 50, label: '50 / page' },
];

function IndeterminateCheckbox({ indeterminate, onChange, ...rest }) {
  /* HOOKS */
  const ref = useRef(null);

  /* USE EFFECTS */
  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Checkbox
        ref={ref}
        onChange={(_, e) => onChange(e)}
        {...rest}
        className="mx-1"
      />
    </div>
  );
}

const includesStringFilter = (row, columnId, value) => {
  const rowValue = row.getValue(columnId);
  if (typeof rowValue !== 'string') {
    return false;
  }
  return rowValue.toLowerCase().includes(value.toLowerCase());
};

function SelectableTable({
  columns, // Array
  tableData, // Array
  selectedRowIds, // Object
  setSelectedRowIds, // Set state function
  title, // String
  showRowCount, // Boolean
  additionalButtons, // ReactNode
  externalSearch, // Object with following keys: { globalFilter, setGlobalFilter }
  disableSearch, // Boolean
}) {
  /* STATES */
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  /* HOOKS */
  const tableColumns = useMemo(() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
            title="Select all"
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
            title="Select"
          />
        ),
      },
      ...columns,
    ];
  }, [columns]);

  const globalFilterMemo = useMemo(
    () => (externalSearch ? externalSearch.globalFilter : globalFilter),
    [externalSearch, globalFilter],
  );

  const setGlobalFilterMemo = useMemo(
    () => (externalSearch ? externalSearch.setGlobalFilter : setGlobalFilter),
    [externalSearch, setGlobalFilter],
  );

  const showSearch = useMemo(
    () => !externalSearch && !disableSearch,
    [externalSearch, disableSearch],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    filterFns: {
      includesString: includesStringFilter,
    },
    state: {
      rowSelection: selectedRowIds,
      columnFilters,
      globalFilter: globalFilterMemo,
    },
    onRowSelectionChange: setSelectedRowIds,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilterMemo,
    globalFilterFn: includesStringFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugHeaders: true,
    debugColumns: false,
  });

  /* HOOKS - USE CALLBACKS */
  const onPaginationChange = useCallback(
    (page) => {
      table.setPageIndex(page - 1);
    },
    [table],
  );

  const onPageSizeChange = useCallback(
    ({ value = 0 }) => {
      table.setPageSize(Number(value));
    },
    [table],
  );

  return (
    <div className="h-full flex flex-col">
      {(title || showSearch || additionalButtons) && (
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex gap-2 items-center">
            {title && <h5>{title}</h5>}
            {showRowCount && (
              <h6 className="py-0.5 px-1 bg-gray-700 rounded-md">
                {table.getFilteredRowModel().rows.length}
              </h6>
            )}
          </div>
          <div className="flex items-center gap-2">
            {showSearch && (
              <DebouncedInput
                value={globalFilterMemo ?? ''}
                placeholder="Search all columns"
                size="sm"
                className="!px-[2] !h-8"
                onChange={setGlobalFilterMemo}
              />
            )}
            {additionalButtons}
          </div>
        </div>
      )}
      <div className="grow">
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
                            className={`overflow-hidden text-ellipsis whitespace-nowrap border-r border-r-gray-600 !normal-case w-max px-2 ${index === 0 && 'border-l border-l-gray-600'
                              }`}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Th>
                        );
                      })}
                    </Tr>
                  ))}
                </THead>
                <TBody>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <Tr key={row.id}>
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <Td
                              key={cell.id}
                              className={classNames(
                                'overflow-hidden text-ellipsis whitespace-nowrap border-r border-r-gray-700  border-b border-b-gray-700 w-max px-2',
                                index === 0 && 'border-l border-l-gray-700',
                              )}
                            >
                              {renderCellContent(cell)}
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
      </div>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          total={tableData.length}
          onChange={onPaginationChange}
        />
        <div style={{ minWidth: 130 }}>
          <SelectXs
            isSearchable={false}
            value={PAGE_SIZE_OPTIONS.filter(
              (option) => option.value === table.getState().pagination.pageSize,
            )}
            options={PAGE_SIZE_OPTIONS}
            onChange={onPageSizeChange}
            blurInputOnSelect={true}
            menuPlacement="top"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(SelectableTable);
