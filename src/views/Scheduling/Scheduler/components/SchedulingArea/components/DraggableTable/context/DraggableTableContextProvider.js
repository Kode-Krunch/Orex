import React, { useState } from 'react';
import DraggableTableContext from './DraggableTableContext';

const DraggableTableContextProvider = ({ children }) => {
  /* STATES */
  const [tableType, setTableType] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [scrolledOffset, setScrolledOffset] = useState({});
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const [isSortEnabled, setIsSortEnabled] = useState(false);

  return (
    <DraggableTableContext.Provider
      value={{
        tableType,
        tableData,
        columns,
        selectedRows,
        scrolledOffset,
        isDragDisabled,
        isSortEnabled,
        setTableType,
        setTableData,
        setColumns,
        setSelectedRows,
        setScrolledOffset,
        setIsDragDisabled,
        setIsSortEnabled,
      }}
    >
      {children}
    </DraggableTableContext.Provider>
  );
};

export default DraggableTableContextProvider;
