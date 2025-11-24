import React, { useContext } from 'react';
import Cell from './Cell';
import { rowTypesEnum } from './enum';
import TableContext from './context/TableContext';

function Row({ row, provided, rowType, selectedRows, handleRowClick, style }) {
  /* CONTEXTS */
  const { isDragDisabled } = useContext(TableContext);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`${
        rowType === rowTypesEnum.NORMAL ? 'min-w-full' : 'w-1/2'
      } flex group ${isDragDisabled && 'hover:cursor-pointer'}`}
      {...(rowType === rowTypesEnum.NORMAL && {
        style: {
          ...style,
          ...provided.draggableProps.style,
          display: 'flex',
        },
      })}
      onClick={(event) => handleRowClick(event, row)}
    >
      <Cell row={row} selectedRows={selectedRows} />
    </div>
  );
}

export default Row;
