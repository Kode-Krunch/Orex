import React, { useState } from 'react';
import TableContext from './TableContext';

const TableContextProvider = ({ children }) => {
  /* STATES */
  const [tableData, setTableData] = useState([]);
  const [tableStyle, setTableStyle] = useState(null);
  const [columns, setColumns] = useState([]);
  const [scrolledOffset, setScrolledOffset] = useState({});
  const [isDragDisabled, setIsDragDisabled] = useState(false);

  return (
    <TableContext.Provider
      value={{
        tableData,
        tableStyle,
        columns,
        scrolledOffset,
        isDragDisabled,
        setTableData,
        setTableStyle,
        setColumns,
        setScrolledOffset,
        setIsDragDisabled,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
