import React, { useContext, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import OriginalTable from './components/OriginalTable';
import GroupedTable from './components/GroupedTable/GroupedTable';
import { reportsTableEnum } from './enums/ReportsTableEnums';
import ReportsTableContextProvider from './context/ReportsTableContextProvider';
import ReportsTableContext from './context/ReportsTableContext';
import { columnsToINRFormat } from '../GLOBALFUNACTION';
import { apiGETColumnSetting } from 'services/ControlsService';
import { useSelector } from 'react-redux';

/* CONSTANTS */
const DEFAULT_TOOLBAR_OPTIONS = { groupBy: true, manageColumns: true };

function ReportsTable({
  tableData,
  tableName,
  originalColumns,
  managedColumns,
  setManagedColumns,
  exportFile,
  exportFileName,
  defaultGroupByColumns,
  columnsToFormatInINR,
  toolbarOptions,
  toolbarExtraContent,
  externalGlobalFilter,
  tableType,
  setSelectedRows,
  paginationState,
  setPaginationState,
  rowSelection,
  setRowSelection,
  hideMaxPageSelector,
  selectAll = true,
  emptyDataMsg,
}) {
  return (
    <ReportsTableContextProvider>
      <ReportsTableWithContext
        tableData={tableData}
        tableName={tableName}
        originalColumns={originalColumns}
        managedColumns={managedColumns}
        setManagedColumns={setManagedColumns}
        exportFile={exportFile}
        exportFileName={exportFileName}
        defaultGroupByColumns={defaultGroupByColumns}
        columnsToFormatInINR={columnsToFormatInINR}
        toolbarOptions={toolbarOptions}
        toolbarExtraContent={toolbarExtraContent}
        externalGlobalFilter={externalGlobalFilter}
        tableType={tableType}
        setSelectedRows={setSelectedRows}
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        hideMaxPageSelector={hideMaxPageSelector}
        selectAll={selectAll}
        emptyDataMsg={emptyDataMsg}
      />
    </ReportsTableContextProvider>
  );
}

export default ReportsTable;

function ReportsTableWithContext({
  tableData,
  tableName,
  originalColumns,
  managedColumns,
  setManagedColumns,
  exportFile,
  exportFileName,
  defaultGroupByColumns,
  columnsToFormatInINR,
  toolbarOptions,
  toolbarExtraContent,
  externalGlobalFilter,
  tableType,
  setSelectedRows,
  paginationState,
  setPaginationState,
  rowSelection,
  setRowSelection,
  hideMaxPageSelector,
  selectAll,
  emptyDataMsg,
}) {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* CONTEXTS */
  const {
    formattedTableData,
    setOriginalTableData,
    setTableName,
    setFormattedTableData,
    setOriginalTableColumns,
    setOriginalTableExportFileName,
    setGroupbyOptions,
    showGlobalToolbar,
    setShowGlobalToolbar,
    setCurView,
    curView,
    setSelectedFilters,
    setSelectedGroups,
    setToolbarOptions,
    setToolbarExtraContent,
    setExternalGlobalFilter,
    setExportFile,
    setTableType,
    setFetchedColumnSetting,
    groupedTableData,
    isGroupedTableAccordionTabOpen,
    setHideMaxPageSelector,
    setSelectAll,
  } = useContext(ReportsTableContext);

  /* USE EFFECTS */
  useEffect(() => {
    /* CONTEXT INITIALIZATION */
    try {
      /* Initialize mandatory props */
      setOriginalTableColumns(originalColumns);
      setOriginalTableExportFileName(exportFileName);
      setOriginalTableData(tableData);
      setTableName(tableName);

      /* Initialize optional props */
      // Initialize external global filter
      if (typeof externalGlobalFilter === 'string') {
        setExternalGlobalFilter(externalGlobalFilter);
      }
      // Initialize export file
      if (typeof exportFile === 'boolean' && exportFile === false) {
        setExportFile(exportFile);
      }
      // Initialize table type
      if (tableType) {
        setTableType(tableType);
      }
      // Initialize toolbar options
      if (toolbarOptions) {
        setToolbarOptions(toolbarOptions);
      } else {
        setToolbarOptions(DEFAULT_TOOLBAR_OPTIONS);
      }
      setToolbarExtraContent(toolbarExtraContent);
      // Initialize columns with INR format
      if (Array.isArray(columnsToFormatInINR)) {
        setFormattedTableData(
          columnsToINRFormat(tableData, columnsToFormatInINR),
        );
      } else {
        setFormattedTableData(tableData);
      }
      // Initialize default group by columns
      if (
        Array.isArray(defaultGroupByColumns) &&
        defaultGroupByColumns.length > 0
      ) {
        /* if selectedGroupByColumns exist, render groupby view by default */
        setCurView(reportsTableEnum.currentView.GROUPED);
        setShowGlobalToolbar(true);
        setSelectedGroups(defaultGroupByColumns);
      }
      // Initialize hide max page selector
      setHideMaxPageSelector(hideMaxPageSelector);
      // Initialze select all feature
      setSelectAll(selectAll);
    } catch (error) {
      console.error(error);
    }
  }, [
    originalColumns,
    exportFileName,
    tableData,
    externalGlobalFilter,
    exportFile,
    tableType,
    toolbarOptions,
    defaultGroupByColumns,
    hideMaxPageSelector,
  ]);

  useEffect(() => {
    try {
      if (Array.isArray(formattedTableData) && formattedTableData.length > 0) {
        let groupbyOptions = [];
        originalColumns.forEach((column) => {
          if (
            column.header &&
            !column.header.toLowerCase().includes('action')
          ) {
            groupbyOptions.push({
              value: column.accessorKey,
              label: column.header,
            });
          }
        });
        setGroupbyOptions(groupbyOptions);
      }
    } catch (error) {
      console.error(error);
    }
  }, [formattedTableData]);

  useEffect(() => {
    try {
      setSelectedFilters([]);
    } catch (error) {
      console.error(error);
    }
  }, [curView]);

  useEffect(() => {
    (async () => {
      try {
        if (
          !toolbarOptions ||
          (toolbarOptions && toolbarOptions.manageColumns)
        ) {
          await setColumnSettingFromAPI();
        } else {
          setManagedColumns(Object.assign([], originalColumns));
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [
    tableData,
    groupedTableData,
    curView,
    isGroupedTableAccordionTabOpen,
    toolbarOptions,
  ]);

  /* HELPER FUNCTIONS */
  const setColumnSettingFromAPI = async () => {
    try {
      if (tableName === '') {
        console.error(
          `"tableName" prop in ReportsTable component cannot be empty.`,
        );
      }
      if (!tableName) {
        console.error(
          `"tableName" prop in "ReportsTable" component cannot be null or undefined.`,
        );
      }
      const response = await apiGETColumnSetting(tableName, token);
      if (response.status === 200) {
        setFetchedColumnSetting(response.data);
      } else if (response.status === 204) {
        console.info(`No column settings found for table: ${tableName}.`);
        setFetchedColumnSetting([]);
      } else {
        console.error(
          `Something went wrong while fetching column settings from server. Server responded with status code: ${response.status}.`,
        );
        setFetchedColumnSetting([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {formattedTableData.length > 0 ? (
        <div className="h-full flex flex-col">
          {showGlobalToolbar && <Toolbar />}
          <div className="grow p-0 h-full">
            {curView === reportsTableEnum.currentView.ORIGINAL ? (
              <OriginalTable
                managedColumns={managedColumns}
                setManagedColumns={setManagedColumns}
                setSelectedRows={setSelectedRows}
                paginationState={paginationState}
                setPaginationState={setPaginationState}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
              />
            ) : (
              <GroupedTable
                managedColumns={managedColumns}
                setManagedColumns={setManagedColumns}
                setSelectedRows={setSelectedRows}
                paginationState={paginationState}
                setPaginationState={setPaginationState}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          <div className="text-center">
            {emptyDataMsg ? emptyDataMsg : 'No data to show'}
          </div>
        </div>
      )}
    </>
  );
}
