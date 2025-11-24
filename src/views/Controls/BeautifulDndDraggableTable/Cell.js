import React, { useContext } from 'react';
import TableContext from './context/TableContext';
import { DEFAULT_STYLES } from './constants';
import classNames from 'classnames';

function Cell({ row, selectedRows }) {
  /* CONTEXT */
  const { columns } = useContext(TableContext);

  /* HELPER FUNCTIONS */
  const getCellStyles = (column) => {
    const cellStyles = column.style?.cell
      ? column.style.cell
      : DEFAULT_STYLES.cell;
    return {
      width: `${
        column.style?.width ? column.style.width : DEFAULT_STYLES.width
      }%`,
      fontWeight: cellStyles.fontWeight
        ? cellStyles.fontWeight
        : DEFAULT_STYLES.cell.fontWeight,
      color: cellStyles.color ? cellStyles.color : DEFAULT_STYLES.cell.color,
      borderColor: cellStyles.borderColor
        ? cellStyles.borderColor
        : DEFAULT_STYLES.cell.borderColor,
      borderWidth: cellStyles.borderWidth
        ? cellStyles.borderWidth
        : DEFAULT_STYLES.cell.borderWidth,
      borderStyle: cellStyles.borderStyle
        ? cellStyles.borderStyle
        : DEFAULT_STYLES.cell.borderStyle,
      paddingBlock: cellStyles.paddingBlock
        ? cellStyles.paddingBlock
        : DEFAULT_STYLES.cell.paddingBlock,
      paddingInline: cellStyles.paddingInline
        ? cellStyles.paddingInline
        : DEFAULT_STYLES.cell.paddingInline,
      fontSize: cellStyles.fontSize
        ? cellStyles.fontSize
        : DEFAULT_STYLES.cell.fontSize,
      backgroundColor: cellStyles.backgroundColor
        ? cellStyles.backgroundColor
        : DEFAULT_STYLES.cell.backgroundColor,
      justifyContent: cellStyles.align
        ? cellStyles.align
        : DEFAULT_STYLES.cell.align,
    };
  };

  const getSelectedRowClassNames = () => {
    return '!bg-gray-600 !text-white !border-gray-400';
  };

  const isCurRowSelected = () =>
    selectedRows.filter((selectedRow) => selectedRow.rowIndex === row.rowIndex)
      .length > 0;

  return (
    <>
      {columns.map((column, index) => (
        <div
          style={getCellStyles(column)}
          className={classNames(
            'h-full flex-none border-y flex items-center transition-all w-full group-hover:!bg-opacity-80',
            index === 0 ? 'border-x' : 'border-r !border-l-0',
            isCurRowSelected()
              ? getSelectedRowClassNames()
              : row.cellClassNames,
          )}
          key={`${row.rowId}-${column.accessorKey}`}
        >
          <div
            className={classNames(
              'overflow-hidden whitespace-nowrap text-ellipsis',
              column.customCell && 'w-full',
            )}
          >
            {column.customCell
              ? column.customCell(row)
              : row[column.accessorKey]}
          </div>
        </div>
      ))}
    </>
  );
}

export default Cell;
