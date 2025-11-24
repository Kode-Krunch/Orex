import { useEffect, useState, useRef, useCallback, memo } from 'react';
import Table from 'components/ui/Table';
import Input from 'components/ui/Input';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import AutoSizer from 'react-virtualized-auto-sizer';
import classNames from 'classnames';

const { Tr, Th, Td, THead, TBody } = Table;

const EditableCell = memo(({ getValue, row: { index }, column, table }) => {
  const { id, columnDef } = column;
  const initialValue = getValue();

  const [value, setValue] = useState(initialValue);
  const inputRef = useRef();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!table.refs) table.refs = {};
    if (!table.refs[index]) table.refs[index] = {};
    table.refs[index][id] = inputRef;
  }, [table, index, id]);

  const handleInputChange = (event) => {
    let { value } = event.target;
    value = value === '' ? columnDef.fallbackForEmptyInput || '' : value;
    if (value === '' || columnDef.inputRegex.test(value)) {
      setValue(columnDef.inputType === 'number' ? Number(value) : value);
    }
  };

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  const handleKeyDown = (e) => {
    const visibleColumns = table.getVisibleLeafColumns();
    const colIndex = visibleColumns.findIndex((col) => col.id === id);
    const moveFocus = (rowIdx, colId) => {
      const nextInput = table.refs?.[rowIdx]?.[colId];
      if (nextInput?.current) {
        nextInput.current.focus();
      }
    };
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(index, visibleColumns[colIndex + 1]?.id);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(index, visibleColumns[colIndex - 1]?.id);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(index + 1, id);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(index - 1, id);
        break;
      default:
        break;
    }
  };

  return columnDef.editable ? (
    <Input
      ref={inputRef}
      className="border-transparent bg-transparent hover:border-gray-300 !h-7"
      size="sm"
      value={value}
      onChange={handleInputChange}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <div className={columnDef.className}>{value}</div>
  );
});

const getDefaultColumn = {
  cell: EditableCell,
};

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);
  useEffect(() => {
    shouldSkipRef.current = true;
  });
  return [shouldSkip, skip];
}

function EditableTable({ tableData, setTableData, columns }) {
  /* HOOKS */
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data: tableData,
    columns,
    defaultColumn: getDefaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        if (typeof skipAutoResetPageIndex === 'function') {
          skipAutoResetPageIndex();
        }
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
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
                        className={`overflow-hidden text-ellipsis whitespace-nowrap border-r border-r-gray-600 !normal-case w-max px-2 ${
                          index === 0 && 'border-l border-l-gray-600'
                        }`}
                      >
                        <div className="text-xs py-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
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
                            'overflow-hidden text-ellipsis whitespace-nowrap border-r border-r-gray-700 text-gray-200 border-b border-b-gray-700 w-max px-2',
                            index === 0 && 'border-l border-l-gray-700',
                          )}
                        >
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
        </div>
      )}
    </AutoSizer>
  );
}

export default memo(EditableTable);
