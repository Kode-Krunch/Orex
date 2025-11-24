import { flexRender } from '@tanstack/react-table';
import React from 'react';

const renderCellContent = (cell) => {
  const value = cell.getValue();
  if (React.isValidElement(value)) {
    return value;
  } else {
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  }
};

export { renderCellContent };
