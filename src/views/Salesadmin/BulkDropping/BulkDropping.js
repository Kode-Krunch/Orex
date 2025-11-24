import { Card } from 'components/ui';
import React, { useEffect, useState } from 'react';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { reportsTableEnum } from 'views/Controls/ReportsTable/enums/ReportsTableEnums';
import Loader from 'views/Controls/Loader';
import { useSelector } from 'react-redux';
import { convertDateToYMD } from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeaderExtra from 'views/Controls/HeaderExtra';

function BulkDropping() {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [date, setDate] = useState(null);
  const [bookingType, setBookingType] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedFilteredRow, setSelectedFilteredRow] = useState(null);
  // Table States
  const [spotsTableData, setSpotsTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [selectedSpots, setSelectedSpots] = useState([]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  // UI States
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      hideStackedSideNav_secondary();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      setBookingType('');
      setFilterType('');
      setSelectedFilteredRow(null);
      resetSpotsTable();
    } catch (error) {
      console.error(error);
    }
  }, [date]);

  useEffect(() => {
    try {
      setFilterType('');
      setSelectedFilteredRow(null);
      resetSpotsTable();
    } catch (error) {
      console.error(error);
    }
  }, [bookingType]);

  useEffect(() => {
    try {
      setSelectedFilteredRow(null);
      resetSpotsTable();
    } catch (error) {
      console.error(error);
    }
  }, [filterType]);

  useEffect(() => {
    (async () => {
      try {
        if (
          selectedFilteredRow &&
          typeof filterType === 'object' &&
          typeof bookingType === 'object'
        ) {
          setShowLoader(true);
          const param = {
            par_Location: channel.LocationCode,
            par_Channel: channel.ChannelCode,
            par_TelecastDate: convertDateToYMD(date),
            par_Flag: filterType.value,
            par_Mode: bookingType.value,
            FilterType: selectedFilteredRow.FilterType,
          };
          let response = await apiCallstoreprocedure(
            'USP_Sch_Bulk_DropingDetails',
            param,
          );
          if (response.status === 200) {
            setSpotsTableData(response.data);
            setColumns(
              Object.keys(response.data[0]).map((key) => {
                return { header: key, accessorKey: key };
              }),
            );
            setSelectedSpots([]);
            setRowSelection({});
          } else if (response.status === 204) {
            resetSpotsTable();
            openNotification(
              'info',
              `No spots found for ${selectedFilteredRow.FilterType}`,
            );
          } else {
            resetSpotsTable();
            openNotification(
              'danger',
              `Something went wrong while fetching spots for ${selectedFilteredRow.FilterType}. Server responded with status code ${response.status}`,
            );
          }
        } else {
          resetSpotsTable();
        }
        setShowLoader(false);
      } catch (error) {
        openNotification(
          'danger',
          `Something went wrong while fetching spots for ${selectedFilteredRow.FilterType}`,
        );
        resetSpotsTable();
        setShowLoader(false);
        console.error(error);
      }
    })();
  }, [selectedFilteredRow]);

  /* HELPER FUNCTIONS */
  const resetSpotsTable = () => {
    try {
      setSpotsTableData([]);
      setColumns([]);
      setSelectedSpots([]);
      setRowSelection({});
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-full flex flex-col">
      <Card
        header={<HeaderExtra />}
        className="mt-3 grow"
        bodyClass="h-full p-3 pb-4 flex flex-col gap-6"
        bordered={false}
      >
        <Header
          date={date}
          setDate={setDate}
          bookingType={bookingType}
          setBookingType={setBookingType}
          filterType={filterType}
          setFilterType={setFilterType}
          selectedFilteredRow={selectedFilteredRow}
          setSelectedFilteredRow={setSelectedFilteredRow}
          setShowLoader={setShowLoader}
        />
        {spotsTableData.length > 0 ? (
          <ReportsTable
            tableData={spotsTableData}
            tableName={'bulkDroppingSpots'}
            originalColumns={columns}
            managedColumns={managedColumns}
            setManagedColumns={setManagedColumns}
            exportFile={false}
            columnsToFormatInINR={[]}
            tableType={reportsTableEnum.tableTypes.SELECTABLE}
            setSelectedRows={setSelectedSpots}
            paginationState={paginationState}
            setPaginationState={setPaginationState}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        ) : (
          <Card
            className="grow"
            bodyClass="h-full flex justify-center items-center"
          >
            No spots to show
          </Card>
        )}
      </Card>
      {/* {selectedSpots.length > 0 && ( */}
      <Footer
        spotsTableData={spotsTableData}
        selectedSpots={selectedSpots}
        setSelectedSpots={setSelectedSpots}
        setPaginationState={setPaginationState}
        setRowSelection={setRowSelection}
        setSelectedFilteredRow={setSelectedFilteredRow}
        setShowLoader={setShowLoader}
      />
      {/* )} */}
      <Loader showLoader={showLoader} />
    </div>
  );
}

export default BulkDropping;
