import { forwardRef, useContext } from 'react';
import { VariableSizeList as List } from 'react-window';
import Header from './Header';
import Row from './Row';
import { Draggable } from '@hello-pangea/dnd';
import TableContext from './context/TableContext';

const StickyList = ({
  children,
  stickyIndices,
  tableRef,
  StickyListContext,
  ...rest
}) => {
  /* CONTEXT */
  const { scrolledOffset } = useContext(TableContext);

  return (
    <StickyListContext.Provider
      value={{ ItemRenderer: children, stickyIndices }}
    >
      <List
        itemData={{ ItemRenderer: children, stickyIndices }}
        {...rest}
        ref={tableRef}
        initialScrollOffset={scrolledOffset}
      >
        {ItemWrapper}
      </List>
    </StickyListContext.Provider>
  );
};

const ItemWrapper = ({ data, index, style }) => {
  const { ItemRenderer, stickyIndices } = data;
  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }
  return <ItemRenderer index={index} style={style} />;
};

const innerElementType = (StickyListContext) =>
  forwardRef(({ children, ...rest }, ref) => (
    <StickyListContext.Consumer>
      {({ stickyIndices }) => (
        <div ref={ref} {...rest}>
          {stickyIndices.map((index) => (
            <Header key={index} index={index} />
          ))}

          {children}
        </div>
      )}
    </StickyListContext.Consumer>
  ));

function RenderRow({ rowType, selectedRows, handleRowClick, index, style }) {
  /* CONTEXT */
  const { tableData, isDragDisabled } = useContext(TableContext);

  if (!tableData) return <></>;
  const row = tableData[index];

  return (
    <>
      {(typeof tableData[index].isFiltered === 'boolean' &&
        !tableData[index].isFiltered) ||
      tableData[index].isHidden ? (
        <Draggable
          key={tableData[index].rowId}
          draggableId={tableData[index].rowId}
          index={index}
          isDragDisabled={true}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
              }}
            />
          )}
        </Draggable>
      ) : (
        <Draggable
          key={tableData[index].rowId}
          draggableId={tableData[index].rowId}
          index={index}
          isDragDisabled={isDragDisabled}
        >
          {(provided) => (
            <Row
              row={row}
              provided={provided}
              rowType={rowType}
              selectedRows={selectedRows}
              handleRowClick={handleRowClick}
              style={style}
            />
          )}
        </Draggable>
      )}
    </>
  );
}

export { StickyList, ItemWrapper, innerElementType, RenderRow };
