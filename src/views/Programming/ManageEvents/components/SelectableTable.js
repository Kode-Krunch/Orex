import { useRef, useEffect, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Table from 'components/ui/Table';
import Checkbox from 'components/ui/Checkbox';
import 'views/Controls/Displaytable.css';
import { rankItem } from '@tanstack/match-sorter-utils';
import Sorter from 'components/ui/Table/Sorter';

/* CONSTANTS */
const { Tr, Th, Td, THead, TBody } = Table;

/* COMPONENTS */
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

function SelectableTable({
  data,
  columns,
  selectedRowIndexes,
  setSelectedRows,
  globalFilter,
  setGlobalFilter,
}) {
  /* STATES */
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      setRowSelection(selectedRowIndexes);
    } catch (error) {
      console.error(error);
    }
  }, [selectedRowIndexes]);

  useEffect(() => {
    try {
      const selectedRowIds = Object.keys(rowSelection);
      let newSelectedRows = [];
      selectedRowIds.forEach((id) => {
        const original =
          table.getCoreRowModel().rowsById[id]?.original || undefined;
        if (original) newSelectedRows.push({ ...original });
      });
      setSelectedRows([...newSelectedRows]);
    } catch (error) {
      console.error(error);
    }
  }, [rowSelection]);

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
      ...columns,
    ];
  }, []);

  const table = useReactTable({
    data,
    columns: tableColumns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      rowSelection,
      columnFilters,
      globalFilter,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const newRowSelection =
        updater instanceof Function ? updater(rowSelection) : updater;
      setRowSelection(newRowSelection);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  /* HELPER FUNCTIONS */
  function fuzzyFilter(row, columnId, value, addMeta) {
    try {
      const itemRank = rankItem(row.getValue(columnId), value);
      addMeta({
        itemRank,
      });
      return itemRank.passed;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="root-container">
      <Table className="table" borderlessRow={false}>
        <THead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id} className="tr3">
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.id === 'select' ? '10%' : 'auto' }}
                >
                  {header.id === 'select' ? (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </>
                  ) : (
                    <div
                      className="py-px flex items-center gap-1 hover:cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <Sorter sort={header.column.getIsSorted()} />
                    </div>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody className="tbody">
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id} className="tr">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td
                      key={cell.id}
                      style={{
                        width:
                          cell.column.columnDef.id === 'select'
                            ? '10%'
                            : 'auto',
                      }}
                    >
                      <div className="py-px">
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
  );
}

export default SelectableTable;
