import classNames from 'classnames';
import { Tooltip } from 'components/ui';
import React, { useState } from 'react';
import SpotsDialog from './SpotsDialog';

const HeaderCell = ({ column }) => (
  <div
    className={classNames(
      'py-2 border-y border-gray-600 text-white font-semibold',
      `w-[${column.width}]`,
      column.accessorKey === 'BrandName' ? 'pl-3' : 'text-center px-1',
    )}
  >
    {column.header}
  </div>
);

const RowCell = ({ column, row, isFirst, isLast }) => {
  /* STATES */
  const [isSpotsDialogOpen, setIsSpotsDialogOpen] = useState(false);

  /* CONSTANTS */
  const isTotal = row.rowType === 'total';

  return (
    <div
      className={classNames(
        'py-3 overflow-hidden whitespace-nowrap text-ellipsis transition-all',
        `w-[${column.width}]`,
        isFirst
          ? 'rounded-l-md pl-3 peer hover:bg-teal-300 hover:bg-opacity-70 hover:text-white'
          : isLast
          ? 'rounded-r-md text-center px-1'
          : 'text-center',
        isTotal
          ? 'text-gray-300 font-semibold bg-gray-700 bg-opacity-50'
          : 'border-b border-b-gray-700 peer-hover:bg-teal-300 peer-hover:bg-opacity-70 peer-hover:text-white',
      )}
    >
      {column.accessorKey === 'BrandName' ? (
        <Tooltip title={row[column.accessorKey]}>
          {row[column.accessorKey]}
        </Tooltip>
      ) : (
        <>
          <span
            className={classNames(
              'py-2 px-3 rounded-lg transition-all',
              isTotal
                ? 'text-white'
                : 'hover:bg-teal-300 hover:bg-opacity-70 hover:text-white cursor-pointer font-semibold',
            )}
            onClick={() => setIsSpotsDialogOpen(true)}
          >
            {row[column.accessorKey]}
          </span>
          {isSpotsDialogOpen && (
            <SpotsDialog
              isOpen={isSpotsDialogOpen}
              setIsOpen={setIsSpotsDialogOpen}
              date={new Date(column.accessorKey)}
              brandCode={row.BrandCode}
            />
          )}
        </>
      )}
    </div>
  );
};

function BrandSpotsTable({ tableData, columns }) {
  return (
    <div className="h-0 grow flex flex-col">
      <div className="flex">
        {columns.map((col) => (
          <HeaderCell key={col.accessorKey} column={col} />
        ))}
      </div>
      <div className="grow overflow-auto">
        {tableData.length > 0 ? (
          <>
            {tableData.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {columns.map((col, colIndex) => (
                  <RowCell
                    key={col.accessorKey}
                    column={col}
                    row={row}
                    isFirst={colIndex === 0}
                    isLast={colIndex === columns.length - 1}
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            No spots to show
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandSpotsTable;
