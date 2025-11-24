import React, { useContext, useEffect, useState } from 'react';
import ReportsContextProvider from './context/ReportsContextProvider';
import ReportsContext from './context/ReportsContext';
import { useSelector } from 'react-redux';
import { reportsJSON } from './reportsJSON';
import { Card } from 'components/ui';
import Loader from 'views/Controls/Loader';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import InputsContainer from './components/InputsContainer';
import HeaderExtra from 'views/Controls/HeaderExtra';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';

function Reports() {
  return (
    <ReportsContextProvider>
      <ReportsWithContext />
    </ReportsContextProvider>
  );
}

export default Reports;

function ReportsWithContext() {
  /* REDUX */
  const path = useSelector((state) => state.base.common.Path);
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* CONTEXTS */
  const {
    pathEndpoint,
    setPathEndpoint,
    reportsStructure,
    setReportsStructure,
    showLoader,
    reportsTableData,
    resetPage,
  } = useContext(ReportsContext);

  /* STATES */
  const [columns, setColumns] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      resetPage();
      // Set the endpoint and report's structure in context
      if (path.length > 0) {
        hideStackedSideNav_secondary();
        const endPoint = path.split('/').at(-1).toLowerCase();
        setPathEndpoint(endPoint);
        if (endPoint in reportsJSON) {
          setReportsStructure(reportsJSON[endPoint]);
        } else {
          throw new Error(
            `Reports JSON Structure not found for path: ${path}. Make sure to add the JSON structure in src/views/Reports/reportsJSON.js`,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [path, channel]);

  useEffect(() => {
    try {
      // Set columns for report's table
      if (reportsStructure) {
        if (reportsTableData.length > 0) {
          setColumns(
            Object.keys(reportsTableData[0]).map((column) => ({
              accessorKey: column,
              header: column,
            })),
          );
        } else {
          setColumns([]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [reportsTableData, reportsStructure]);

  return (
    <>
      <Card
        header={<HeaderExtra />}
        headerExtra={<></>}
        className="flex flex-col min-h-[87vh]"
        bodyClass="grow flex flex-col pt-3"
      >
        <div className="pb-4 border-b border-b-gray-700 mb-4">
          <InputsContainer />
        </div>
        {reportsTableData.length > 0 ? (
          <ReportsTable
            tableData={reportsTableData}
            tableName={`${pathEndpoint}Report`}
            originalColumns={columns}
            managedColumns={managedColumns}
            setManagedColumns={setManagedColumns}
            exportFileName={`${pathEndpoint} Report`}
            columnsToFormatInINR={[]}
          />
        ) : (
          <div className="grow flex justify-center items-center">
            No reports to show
          </div>
        )}
      </Card>
      <Loader showLoader={showLoader} />
    </>
  );
}
