import { Droppable } from '@hello-pangea/dnd';
import React, { createContext, useContext, useEffect } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { innerElementType, RenderRow, StickyList } from './tableUtils';
import { rowTypesEnum } from './enum';
import Row from './Row';
import TableContextProvider from './context/TableContextProvider';
import TableContext from './context/TableContext';
import { DEFAULT_STYLES } from './constants';

function BeautifulDndDraggableTable({
  droppableId,
  droppableMessage,
  tableData,
  columns,
  selectedRows,
  style,
  scrolledOffset,
  tableRef,
  isDragDisabled,
  handleRowClick,
}) {
  return (
    <TableContextProvider>
      <BeautifulDndDraggableTableWithContext
        droppableIdProp={droppableId}
        droppableMessageProp={droppableMessage}
        tableDataProp={tableData}
        columnsProp={columns}
        selectedRowsProp={selectedRows}
        tableStyleProp={style}
        scrolledOffsetProp={scrolledOffset}
        tableRef={tableRef}
        isDragDisabledProp={isDragDisabled}
        handleRowClickProp={handleRowClick}
      />
    </TableContextProvider>
  );
}

function BeautifulDndDraggableTableWithContext({
  droppableIdProp,
  droppableMessageProp,
  tableDataProp,
  columnsProp,
  selectedRowsProp,
  tableStyleProp,
  scrolledOffsetProp,
  tableRef,
  isDragDisabledProp,
  handleRowClickProp,
}) {
  /* CONTEXTS */
  const {
    tableData,
    setTableData,
    setColumns,
    tableStyle,
    setTableStyle,
    setScrolledOffset,
    setIsDragDisabled,
  } = useContext(TableContext);
  const StickyListContext = createContext();
  StickyListContext.displayName = 'StickyListContext';

  useEffect(() => {
    /* INITIALIZE DRAGGABLE TABLE */
    setTableData(tableDataProp);
    setColumns(columnsProp);
    if (tableStyleProp) setTableStyle(tableStyleProp);
    else setTableStyle(DEFAULT_STYLES);
    setScrolledOffset(scrolledOffsetProp);
    setIsDragDisabled(isDragDisabledProp);
  }, [
    tableDataProp,
    columnsProp,
    tableStyleProp,
    scrolledOffsetProp,
    isDragDisabledProp,
  ]);

  return (
    <Droppable
      droppableId={droppableIdProp}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => {
        return (
          <Row
            row={tableData[rubric.source.index]}
            provided={provided}
            rowType={rowTypesEnum.CLONE}
            selectedRows={selectedRowsProp}
            handleRowClick={handleRowClickProp}
          />
        );
      }}
    >
      {(provided) => (
        <div ref={provided.innerRef} className="h-full w-full flex flex-col">
          <AutoSizer>
            {({ height, width }) => (
              <StickyList
                height={height}
                innerElementType={innerElementType(StickyListContext)}
                itemCount={tableData.length}
                itemSize={(index) =>
                  (typeof tableData[index].isFiltered === 'boolean' &&
                    !tableData[index].isFiltered) ||
                  tableData[index].isHidden
                    ? 0
                    : tableStyle?.cell?.height
                    ? tableStyle.cell.height
                    : DEFAULT_STYLES.cell.height
                }
                stickyIndices={[0]}
                width={width}
                outerRef={provided.innerRef}
                tableRef={tableRef}
                StickyListContext={StickyListContext}
              >
                {({ index, style }) => (
                  <RenderRow
                    rowType={rowTypesEnum.NORMAL}
                    selectedRows={selectedRowsProp}
                    handleRowClick={handleRowClickProp}
                    index={index}
                    style={style}
                  />
                )}
              </StickyList>
            )}
          </AutoSizer>
          {tableData.length <= 1 && (
            <div className="grow flex justify-center items-center">
              {droppableMessageProp}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}

export default BeautifulDndDraggableTable;
