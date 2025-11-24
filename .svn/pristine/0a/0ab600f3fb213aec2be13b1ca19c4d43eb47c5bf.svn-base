import { useState, useEffect } from 'react';
import {
  apiGetclientmasterdropmaster,
  apiGetspotcancellation,
} from 'services/CreditcontrolService';
import { Button, Card, Dialog, Select, Tag } from 'components/ui';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import SearchInput from 'views/Controls/SearchInput';
import { StickyFooter } from 'components/shared';
import {
  getDateFromDateTime,
  getMissingObjectsInSubJSONArray,
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import { HiClock, HiOutlineClipboardCheck } from 'react-icons/hi';
import classNames from 'classnames';
import DatePicker from 'components/ui/DatePicker';
import { apipostbookingdetails } from 'services/DealServices';
import { useSelector } from 'react-redux';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { reportsTableEnum } from 'views/Controls/ReportsTable/enums/ReportsTableEnums';

/* CONSTANTS */
const COLUMNS = [
  { header: 'Agency', accessorKey: 'AgencyName' },
  { header: 'Client', accessorKey: 'ClientName' },
  { header: 'Brand', accessorKey: 'BrandName' },
  { header: 'Commercial', accessorKey: 'CommercialCaption' },
  { header: 'Duration', accessorKey: 'CommercialDuration' },
  { header: 'Content', accessorKey: 'ContentName' },
  { header: 'Schedule Date', accessorKey: 'BookingScheduleDate' },
  { header: 'Re-Schedule Date', accessorKey: 'BookingRescheduleDate' },
  { header: 'Schedule Time', accessorKey: 'ScheduleTime' },
  { header: 'Spot Rate', accessorKey: 'SpotRate' },
  { header: 'Spot Amount', accessorKey: 'SpotAmount' },
  { header: 'Line Item From Date', accessorKey: 'LineItemFromDate' },
  { header: 'Line Item End Date', accessorKey: 'LineItemEndDate' },
  { header: 'BookingCode', accessorKey: 'BookingCode' },
];

const SPOT_TYPE = [
  { value: '2', label: 'Booked But Not Telecasted' },
  { value: '1', label: 'Booked And Missed' },
];

const MakeGoodReschedule = () => {
  const currentHref = window.location.href; // Get the full URL
  const hashPart = currentHref.split('#')[1]; // Get the part after the '#'
  const spotBooking = hashPart ? hashPart.split('/')[1] : ''; // Extract "SpotBooking"
  let IsNTCPage = spotBooking === 'MakeGoodReschedule' ? 0 : 1;
  /* REDUX */
  const path = useSelector((state) => state.base.common.Path);
  /* STATES */
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);
  const [clientList, setClientList] = useState(['']);
  const [spotTypedata, setSpotTypedata] = useState(['']);
  const [formState, setFormState] = useState({});
  const [tableData, setTableData] = useState([]);
  const [prevSelectedRowData, setPrevSelectedRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [distinctdata, setDistinctData] = useState([]);
  const [summaryData, setSummarydata] = useState([]);
  const [isFinalSummaryDialogOpen, setIsFinalSummaryDialogOpen] =
    useState(false);
  const [managedColumns, setManagedColumns] = useState([]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);

  /* USE EFFECTS */
  useEffect(() => {
    try {
      if (initialLoad) {
        hideStackedSideNav_secondary();
        (async (values) => {
          const response = await apiGetclientmasterdropmaster(values);
          const clientListOptions = response.data.map((client) => ({
            label: client.ClientName,
            value: client.ClientCode,
          }));
          setClientList(clientListOptions);
        })();
        setInitialLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [initialLoad]);

  useEffect(() => {
    (async () => {
      if (
        formState?.datesrange?.length === 2 &&
        formState.datesrange[0] &&
        formState.datesrange[1] &&
        spotTypedata.value > 0
      ) {
        const resp = await apiGetspotcancellation(
          formState,
          selectedItem,
          spotTypedata.value,
          'B R',
          IsNTCPage,
          Channel.LocationCode,
          Channel.ChannelCode,
        );
        // Initialize table table data with reschedule date
        resp.data.forEach((row) => {
          row.RescheduleDate = '-';
          row.BookingRescheduleDate = '-';
        });

        if (resp?.data?.length > 0) {
          setTableData(resp.data);
        } else {
          setTableData([]);
        }
      }
    })();
  }, [formState.datesrange, spotTypedata, Channel]);

  useEffect(() => {
    try {
      if (formState.rescheduleDate) {
        setCheckboxDisabilityInTableData(formState.rescheduleDate);
      }
    } catch (error) {
      console.error(error);
    }
  }, [formState.rescheduleDate]);

  useEffect(() => {
    try {
      setDistinctData(getDistinctSums(selectedRows));
      calculateSums(selectedRows);
      updateTableDataWithRescheduleDate();
    } catch (error) {
      console.error(error);
    }
  }, [selectedRows]);

  /* EVENT HANDLERS */
  const handleRescheduleDateChange = (event) => {
    try {
      const year = event.getFullYear(); // Get the year (YYYY)
      const monthsAbbreviation = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthAbbr = monthsAbbreviation[event.getMonth()];
      const month = String(event.getMonth() + 1).padStart(2, '0');
      const day = String(event.getDate()).padStart(2, '0');
      const formattedRescheduleDate = `${year}-${month}-${day}T00:00:00`;
      const formattedBookingRescheduleDate = `${monthAbbr} ${event.getDate()} ${year} 12:00AM`;

      setFormState((prevFormState) => {
        return {
          ...prevFormState,
          rescheduleDate: formattedRescheduleDate,
          bookingRescheduleDate: formattedBookingRescheduleDate,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    const finalData = tableData
      .filter((row) => row.RescheduleDate !== '-')
      .map((item) => ({
        Id: item.Id,
        RescheduleDate: getDateFromDateTime(item.RescheduleDate),
        CommercialCode: 0,
        BookingStatus: '',
        SpotTypeCode: spotTypedata.value,
      }));
    try {
      const resp = await apipostbookingdetails(
        'MAKEGOODRESCHEDULE',
        finalData,
        IsNTCPage,
      );
      if (resp.status === 200) {
        setIsFinalSummaryDialogOpen(false);
        resetData();
        openNotification('success', 'Spot MakeGood Reschedule Successfully');
        return;
      }
    } catch (error) {
      if (error.response.status === 500) {
        openNotification('danger', 'Server Error.');
        return;
      }
    }
  };

  /* HELPER FUNCTIONS */
  const setCheckboxDisabilityInTableData = (rescheduleDate) => {
    try {
      const rescheduleDateObj = new Date(rescheduleDate);
      rescheduleDateObj.setHours(0, 0, 0, 0);
      setTableData((oldState) => {
        const newState = Object.assign([], oldState);
        newState.forEach((curRow) => {
          const lineItemFromDateObj = new Date(curRow.LineItemFromDate);
          lineItemFromDateObj.setHours(0, 0, 0, 0);
          const lineItemEndDateObj = new Date(curRow.LineItemEndDate);
          lineItemEndDateObj.setHours(0, 0, 0, 0);
          if (
            rescheduleDateObj >= lineItemFromDateObj &&
            rescheduleDateObj <= lineItemEndDateObj
          ) {
            curRow.disableSelection = false;
          } else curRow.disableSelection = true;
        });
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getDistinctSums = (selectedRowData) => {
    try {
      if (!Array.isArray(selectedRowData)) {
        return [];
      }
      const result = selectedRowData.reduce((acc, item) => {
        if (item) {
          const key = `${item.CommercialCaption}-${item.CommercialDuration}`;
          if (!acc[key]) {
            acc[key] = {
              CommercialCaption: item.CommercialCaption,
              CommercialDuration: item.CommercialDuration,
              CurrencySymbol: item.CurrencySymbol,
              SpotAmountSum: 0,
              TotalDuration: 0,
              TotalCount: 0,
            };
          }
          acc[key].SpotAmountSum += item.SpotAmount;
          acc[key].TotalDuration += parseDuration(item.CommercialDuration);
          acc[key].TotalCount++;
          return acc;
        }
      }, {});
      return Object.values(result || 0);
    } catch (error) {
      throw error;
    }
  };

  const calculateSums = (selectedRowData) => {
    try {
      const sums = selectedRowData.reduce(
        (acc, item) => {
          if (item) {
            acc.spotAmountSum += item.SpotAmount;
            acc.spotRateSum += item.SpotRate;
            acc.Duration += parseDuration(item.CommercialDuration);
          }
          return acc;
        },
        { spotAmountSum: 0, spotRateSum: 0, Duration: 0 },
      );
      setSummarydata(sums);
    } catch (error) {
      throw error;
    }
  };

  const updateTableDataWithRescheduleDate = () => {
    try {
      let tableDataWithUpdatedRescheduleDate = Object.assign([], tableData);
      if (prevSelectedRowData.length < selectedRows.length) {
        selectedRows.forEach((row) => {
          if (row.RescheduleDate === '-' && row.disableSelection === false) {
            tableDataWithUpdatedRescheduleDate[row.rowIndex].RescheduleDate =
              formState.rescheduleDate;
            tableDataWithUpdatedRescheduleDate[
              row.rowIndex
            ].BookingRescheduleDate = formState.bookingRescheduleDate;
          }
        });
      } else {
        const unselectedRows = getMissingObjectsInSubJSONArray(
          prevSelectedRowData,
          selectedRows,
          'rowIndex',
        );
        unselectedRows.forEach((row) => {
          tableDataWithUpdatedRescheduleDate[row.rowIndex].RescheduleDate = '-';
          tableDataWithUpdatedRescheduleDate[
            row.rowIndex
          ].BookingRescheduleDate = '-';
        });
      }
      setPrevSelectedRowData(selectedRows);
      setTableData(tableDataWithUpdatedRescheduleDate);
    } catch (error) {
      throw error;
    }
  };

  const resetData = () => {
    // alert('h');
    setInputValue('');
    setSelectedItem([]);
    setClientList(['']);
    setSpotTypedata(['']);
    setFormState({});
    setTableData([]);
    setPrevSelectedRowData([]);
    setSelectedRows([]);
    setDistinctData([]);
    setSummarydata([]);
    setIsFinalSummaryDialogOpen(false);
    setManagedColumns([]);
    setPaginationState({
      pageIndex: 0,
      pageSize: 10,
    });
    setRowSelection({});
    setInitialLoad(true);
  };

  return (
    <>
      <Card header={<HeaderExtra />}>
        <div className="mb-5">
          <div className="grid grid-cols-4 gap-x-5">
            <div className="col-span-3">
              <p className="lbale">Search Client</p>
              {clientList && (
                <SearchInput
                  className={'block'}
                  SelectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  data={clientList}
                  placeholder="Search Client..."
                  setInputValue={setInputValue}
                  InputValue={inputValue}
                  ResetData={resetData}
                ></SearchInput>
              )}
            </div>
            <div className="col-span-1 ">
              {selectedItem?.length != 0 && (
                <>
                  <p className="lbale ">Spot Type</p>
                  <Select
                    size="sm"
                    className="mb-4"
                    placeholder="Please Select"
                    options={SPOT_TYPE}
                    onChange={(e) => setSpotTypedata(e)}
                  ></Select>
                </>
              )}
            </div>
            <div className="col-span-1">
              {selectedItem?.length != 0 && (
                <>
                  <p className="lbale">Select Date Range</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DatePickerRange
                      placeholder="Select date range"
                      style={{ fontSize: '15px', marginRight: '10px' }}
                      value={formState?.datesrange}
                      onChange={(e) => {
                        setFormState((prevFormState) => ({
                          ...prevFormState,
                          datesrange: e,
                        }));
                      }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="col-span-1">
              {selectedItem?.length != 0 &&
                formState?.datesrange?.length === 2 &&
                formState?.datesrange[0] &&
                formState?.datesrange[1] && (
                  <>
                    <p className="lbale">Reschedule To</p>
                    <DatePicker
                      minDate={new Date()}
                      placeholder="Pick a date"
                      onChange={(event) => {
                        handleRescheduleDateChange(event);
                      }}
                      clearable={false}
                    />
                  </>
                )}
            </div>
          </div>
        </div>

        {tableData.length > 0 && (
          <>
            {formState.rescheduleDate ? (
              <ReportsTable
                tableData={tableData}
                tableName={'makeGoodReschedule'}
                originalColumns={COLUMNS}
                managedColumns={managedColumns}
                setManagedColumns={setManagedColumns}
                exportFile={false}
                columnsToFormatInINR={[]}
                tableType={reportsTableEnum.tableTypes.SELECTABLE}
                setSelectedRows={setSelectedRows}
                paginationState={paginationState}
                setPaginationState={setPaginationState}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
              />
            ) : (
              <ReportsTable
                tableData={tableData}
                tableName={'makeGoodReschedule'}
                originalColumns={COLUMNS}
                managedColumns={managedColumns}
                setManagedColumns={setManagedColumns}
                exportFile={false}
                columnsToFormatInINR={[]}
              />
            )}
          </>
        )}
      </Card>
      {selectedRows.length > 0 && (
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-between py-4 pt-2 pb-2"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="md:flex items-center">
            <Button
              onClick={() => setIsFinalSummaryDialogOpen(true)}
              variant="solid"
              type="submit"
              size="sm"
            >
              Proceed to Reschedule
            </Button>
            &nbsp;
            <Button onClick={() => resetData()} type="button" size="sm">
              Discard
            </Button>
          </div>
          <div
            id="myblock"
            className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6 p-4 pt-0 pb-1 
                                    bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Total Spots
              </span>
              <span className="font-medium text-lg text-teal-500">
                {tableData.length}
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Selected Spots
              </span>
              <span className="font-medium text-lg text-teal-500">
                {selectedRows.length}
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Duration
              </span>
              <span className="font-medium text-lg text-teal-500">
                {summaryData?.Duration}
              </span>
            </div>
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Spot Amount
              </span>
              <span className="font-medium text-lg text-teal-500">
                {summaryData?.spotAmountSum}
              </span>
            </div>
          </div>
        </StickyFooter>
      )}
      <Dialog
        isOpen={isFinalSummaryDialogOpen}
        onClose={() => setIsFinalSummaryDialogOpen(false)}
        onRequestClose={() => setIsFinalSummaryDialogOpen(false)}
      >
        <Card>
          {distinctdata.map((item, index) => (
            <div key={index}>
              <div>
                <div
                  className={classNames(
                    'flex items-center justify-between rounded-lg p-2 cursor-pointer user-select',
                    'bg-gray-50 dark:bg-gray-700/60 hover:bg-gray-100 dark:hover:bg-gray-700/90',
                    'mb-3',
                  )}
                >
                  <div className="flex items-center rounded-full font-semibold text-xs">
                    <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full  mr-2">
                      <HiOutlineClipboardCheck className="text-base" />
                      <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                        {item.TotalCount}
                      </span>
                    </div>
                    {'  '}
                    <div className="flex items-center">
                      <div className="text-gray-900 dark:text-gray-300 text-xs">
                        {item.CommercialCaption} [{item.CommercialDuration}]
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-900 dark:text-gray-300 text-lg">
                    <Tag showCloseButton={false}>
                      <div className="flex items-center text-sm">
                        <span className="mr-1">
                          <HiClock />
                        </span>{' '}
                        {item.TotalDuration} sec
                      </div>
                    </Tag>
                  </div>

                  <div className="text-gray-900 dark:text-gray-300 text-lg">
                    <Tag showCloseButton={false}>
                      <span className="text-lg">
                        {item.CurrencySymbol} {item.SpotAmountSum}
                      </span>
                    </Tag>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>
        <div className="text-right mt-6 ">
          <Button
            variant="solid"
            className="mr-2"
            onClick={() => handleConfirm()}
          >
            Confirm
          </Button>
          <Button onClick={() => setIsFinalSummaryDialogOpen(false)}>
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default MakeGoodReschedule;
