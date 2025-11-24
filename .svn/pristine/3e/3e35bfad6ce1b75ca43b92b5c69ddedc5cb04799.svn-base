import classNames from 'classnames';
import React, { useContext } from 'react';
import TableContext from './context/TableContext';
import { DEFAULT_STYLES } from './constants';

function Header({ index }) {
  /* CONTEXT */
  const { columns, tableStyle } = useContext(TableContext);

  /* CONSTANTS */
  const cellHeight = tableStyle?.cell?.height
    ? tableStyle.cell.height
    : DEFAULT_STYLES.cell.height;

  /* HELPER FUNCTIONS */
  const getHeaderStyles = (column) => {
    const headerStyles = column.style?.header
      ? column.style.header
      : DEFAULT_STYLES.header;
    return {
      width: `${
        column.style?.width ? column.style.width : DEFAULT_STYLES.width
      }%`,
      fontWeight: headerStyles.fontWeight
        ? headerStyles.fontWeight
        : DEFAULT_STYLES.header.fontWeight,
      color: headerStyles.color
        ? headerStyles.color
        : DEFAULT_STYLES.header.color,
      borderColor: headerStyles.borderColor
        ? headerStyles.borderColor
        : DEFAULT_STYLES.header.borderColor,
      borderWidth: headerStyles.borderWidth
        ? headerStyles.borderWidth
        : DEFAULT_STYLES.header.borderWidth,
      borderStyle: headerStyles.borderStyle
        ? headerStyles.borderStyle
        : DEFAULT_STYLES.header.borderStyle,
      paddingBlock: headerStyles.paddingBlock
        ? headerStyles.paddingBlock
        : DEFAULT_STYLES.header.paddingBlock,
      paddingInline: headerStyles.paddingInline
        ? headerStyles.paddingInline
        : DEFAULT_STYLES.header.paddingInline,
      fontSize: headerStyles.fontSize
        ? headerStyles.fontSize
        : DEFAULT_STYLES.header.fontSize,
      backgroundColor: headerStyles.backgroundColor
        ? headerStyles.backgroundColor
        : DEFAULT_STYLES.header.backgroundColor,
      justifyContent: headerStyles.align
        ? headerStyles.align
        : DEFAULT_STYLES.header.align,
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        top: index * cellHeight,
        left: 0,
        width: '100%',
        height: cellHeight,
      }}
      className="sticky z-[2]"
    >
      {columns.map((column, index) => {
        return (
          <div
            style={getHeaderStyles(column)}
            key={column.accessorKey}
            className={classNames(
              'h-full flex-none border-y flex items-center w-full',
              index === 0 ? 'border-x' : 'border-r !border-l-0',
            )}
          >
            {/* <div
              key={column.accessorKey}
              className={
                'w-full overflow-hidden whitespace-nowrap text-ellipsis'
              }
            > */}
            <div className="overflow-hidden whitespace-nowrap text-ellipsis">
              {column.header}
            </div>
            {/* </div> */}
            {/* {activeFeatures[featuresEnum.FILTER] && (
            <FilterDropdown
              columnKey={column.accessorKey}
              isLastColumn={index === columns.length - 1}
            />
          )} */}
          </div>
        );
      })}
    </div>
  );
}

export default Header;
