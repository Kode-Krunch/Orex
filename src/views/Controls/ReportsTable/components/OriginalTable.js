import React, { useContext } from 'react';
import MainTable from './MainTable/MainTable';
import ReportsTableContext from '../context/ReportsTableContext';

function OriginalTable({
  managedColumns,
  setManagedColumns,
  setSelectedRows,
  paginationState,
  setPaginationState,
  rowSelection,
  setRowSelection,
}) {
  /* CONTEXTS */
  const {
    formattedTableData,
    originalTableColumns,
    originalTableExportFileName,
  } = useContext(ReportsTableContext);

  return (
    <MainTable
      tableData={formattedTableData}
      originalColumns={originalTableColumns}
      managedColumns={managedColumns}
      setManagedColumns={setManagedColumns}
      exportFileName={originalTableExportFileName}
      setSelectedRows={setSelectedRows}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
}

export default OriginalTable;
