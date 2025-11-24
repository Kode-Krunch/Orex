import React, { useRef, useEffect, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Table from 'components/ui/Table';
import Checkbox from 'components/ui/Checkbox';
import { Button, Pagination, Select } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table;

function IndeterminateCheckbox({ indeterminate, onChange, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);
  return <Checkbox ref={ref} onChange={(_, e) => onChange(e)} {...rest} />;
}

const BillingTable = ({
  selectedRows,
  setSelectedRows,
  SummaryShowApi,
  data,
  col,
  globalFilter,
  setGlobalFilter,
  activeTab,
}) => {
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(() => {
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
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...col,
    ];
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const newRowSelection =
        updater instanceof Function ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);

      const selectedRowIds = Object.keys(newRowSelection);
      const newSelectedRows = selectedRowIds.map((id) => {
        const original = table.getRowModel().rowsById[id]?.original || {};
        return { ...original, id };
      });
      setSelectedRows([...newSelectedRows]);
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const onPaginationChange = (page) => {
    table.setPageIndex(page - 1);
  };

  const totalData = data.length;

  const onSelectChange = (value = 0) => {
    table.setPageSize(Number(value));
  };

  const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
  ];

  return (
    <div>
      <Table compact borderlessRow={false} oveerflow>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id} colSpan={header.colSpan}>
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
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <Pagination
          pageSize={table.getState().pagination.pageSize}
          currentPage={table.getState().pagination.pageIndex + 1}
          total={totalData}
          onChange={onPaginationChange}
        />
        <div style={{ minWidth: 130 }} className="flex">
          {/* <Button
            size="sm"
            className=" mr-2"
            disabled={!selectedRows.length}
            variant="solid"
            onClick={() => SummaryShowApi()}
          >
            Generate Bill
          </Button> */}

          <Button
            size="sm"
            className="mr-2"
            disabled={!selectedRows.length}
            variant="solid"
            onClick={() => {
              if (activeTab === "5") {
                // 🟢 Sponsor tab selected
                SummaryShowApi("sponsor");
              } else {
                // 🟢 Default for all others
                SummaryShowApi("default");
              }
            }}
          >
            Generate Bill
          </Button>

          <Select
            size="sm"
            isSearchable={false}
            value={pageSizeOption.filter(
              (option) => option.value === table.getState().pagination.pageSize,
            )}
            options={pageSizeOption}
            onChange={(option) => onSelectChange(option?.value)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default BillingTable;
