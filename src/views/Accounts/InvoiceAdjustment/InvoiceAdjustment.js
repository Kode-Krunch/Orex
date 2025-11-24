import { useState, useEffect } from 'react';
import { Button, Card } from 'components/ui';
import HeaderExtra from 'views/Controls/HeaderExtra';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import SearchInput from 'views/Controls/SearchInput';
import { StickyFooter } from 'components/shared';
import {
  getDateFromDateTime,
  getMissingObjectsInSubJSONArray,
  numberToINRFormat,
  openNotification,
} from 'views/Controls/GLOBALFUNACTION';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import DatePicker from 'components/ui/DatePicker';
import { useSelector } from 'react-redux';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { reportsTableEnum } from 'views/Controls/ReportsTable/enums/ReportsTableEnums';
import { apiCallstoreprocedure } from 'services/CommonService';
import WarningDialog from 'views/Controls/WarningDialog';
import { apiInvoicePaymentUpdate } from 'services/AccountsServices';
import Loader from 'views/Controls/Loader';
import { apiCallstoreprocedure_WithOutParam } from 'services/DealServices';
import { convertDateToYMD } from 'components/validators';

const InvoiceAdjustment = () => {
  /* REDUX */
  const channel = useSelector((state) => state.locale.selectedChannel);
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);
  const [AgencyList, setAgencyList] = useState(['']);
  const [formState, setFormState] = useState({});
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [prevSelectedRowData, setPrevSelectedRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [summaryData, setSummarydata] = useState([]);
  const [managedColumns, setManagedColumns] = useState([]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  /* USE EFFECTS */
  useEffect(() => {
    hideStackedSideNav_secondary();
    try {
      if (initialLoad) {
        (async (values) => {
          setShowLoader(true);
          const resp = await apiCallstoreprocedure_WithOutParam(
            'USP_DropDown_List_Billing',
            {
              par_LocationCode: channel.LocationCode,
              par_ChannelCode: channel.ChannelCode,
              par_FromDate: '2024-08-01',
              par_ToDate: '2024-08-31',
              FieldTable: 'AGENCYMASTER',
            },
          );
          if (resp.status == 204) {
            setAgencyList({});
            return;
          }
          console.log(resp.data);
          const AgencyListOptions = resp.data.map((Agency) => ({
            label: Agency.DisplayLabel,
            value: Agency.DisplayValue,
          }));
          setAgencyList(AgencyListOptions);
        })();
        setShowLoader(false);
      }
    } catch (error) {
      console.error(error);
      setShowLoader(false);
    }
  }, [initialLoad, channel]);

  useEffect(() => {
    (async () => {
      if (
        formState?.datesrange?.length === 2 &&
        formState.datesrange[0] &&
        formState.datesrange[1]
      ) {
        setShowLoader(true);
        const params = {
          LocationCode: channel.LocationCode,
          ChannelCode: channel.ChannelCode,
          FromDate: convertDateToYMD(formState.datesrange[0]),
          ToDate: convertDateToYMD(formState.datesrange[1]),
          AgencyCode: selectedItem.value,
        };
        const resp = await apiCallstoreprocedure(
          'usp_Bill_Payment_Adjustment',
          params,
        );
        if (resp?.data?.length > 0) {
          const updatedData = resp.data.map((row) => ({
            ...row,
            PaymentReceiveDateTime: '-',
            PaymentReceiveDate: '-',
          }));

          const columns = Object.keys(updatedData[0]).map((column) => ({
            accessorKey: column,
            header: column,
          }));
          setColumns(columns);
          setTableData(updatedData);
        } else {
          setTableData([]);
        }
        setShowLoader(false);
      }
    })();
  }, [formState.datesrange, channel]);

  useEffect(() => {
    try {
      calculateSums(selectedRows);
      updateTableDataWithPaymentReceivedDate();
    } catch (error) {
      console.error(error);
    }
  }, [selectedRows]);
  useEffect(() => {
    resetPage();
  }, [channel]);

  /* EVENT HANDLERS */
  const handlePaymentReceivedDateChange = (event) => {
    try {
      const year = event.getFullYear();
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
      const paymentReceivedDateTime = `${year}-${month}-${day}T00:00:00`;
      const formattedPaymentReceivedDate = `${event.getDate()}-${monthAbbr}-${year}`;

      setFormState((prevFormState) => {
        return {
          ...prevFormState,
          paymentReceivedDateTime: paymentReceivedDateTime,
          formattedPaymentReceivedDate: formattedPaymentReceivedDate,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    const finalData = tableData
      .filter((row) => row.PaymentReceiveDateTime !== '-')
      .map((item) => ({
        InvoiceNumber: item.InvoiceNumber,
        PaymentReceiveDate: getDateFromDateTime(item.PaymentReceiveDateTime),
      }));
    try {
      setShowLoader(true);
      const resp = await apiInvoicePaymentUpdate(finalData, token);
      setShowLoader(false);
      if (resp.status === 200) {
        setIsSaveDialogOpen(false);
        resetPage();
        openNotification('success', 'Invoice adjusted successfully');
        return;
      }
      setShowLoader(false);
    } catch (error) {
      if (error.response.status === 500) {
        openNotification('danger', 'Server Error.');
      }
      setShowLoader(false);
    }
  };

  /* HELPER FUNCTIONS */
  const calculateSums = (selectedRowData) => {
    try {
      const sums = selectedRowData.reduce(
        (acc, item) => {
          if (item) {
            acc.totalPayableAmount += item.PayableAmount;
          }
          return acc;
        },
        { totalPayableAmount: 0 },
      );
      setSummarydata(sums);
    } catch (error) {
      throw error;
    }
  };

  const updateTableDataWithPaymentReceivedDate = () => {
    try {
      let tableDataWithPaymentReceivedDate = Object.assign([], tableData);
      if (prevSelectedRowData.length < selectedRows.length) {
        selectedRows.forEach((row) => {
          tableDataWithPaymentReceivedDate[
            row.rowIndex
          ].PaymentReceiveDateTime = formState.paymentReceivedDateTime;
          tableDataWithPaymentReceivedDate[row.rowIndex].PaymentReceiveDate =
            formState.formattedPaymentReceivedDate;
        });
      } else {
        const unselectedRows = getMissingObjectsInSubJSONArray(
          prevSelectedRowData,
          selectedRows,
          'rowIndex',
        );
        unselectedRows.forEach((row) => {
          tableDataWithPaymentReceivedDate[
            row.rowIndex
          ].PaymentReceiveDateTime = '-';
          tableDataWithPaymentReceivedDate[row.rowIndex].PaymentReceiveDate =
            '-';
        });
      }
      setPrevSelectedRowData(selectedRows);
      setTableData(tableDataWithPaymentReceivedDate);
    } catch (error) {
      throw error;
    }
  };

  const resetPage = () => {
    try {
      setInputValue('');
      setSelectedItem([]);
      setAgencyList(['']);
      setFormState({});
      setTableData([]);
      setColumns([]);
      setPrevSelectedRowData([]);
      setSelectedRows([]);
      setSummarydata([]);
      setManagedColumns([]);
      setPaginationState({
        pageIndex: 0,
        pageSize: 10,
      });
      setRowSelection({});
      setInitialLoad(true);
      setIsSaveDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return (
    <>
      <Card header={<HeaderExtra />}>
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-x-5 items-center">
            <div className="col-span-4">
              <p className="text-white mb-1 font-semibold">Search Agency</p>
              {AgencyList && (
                <SearchInput
                  className={'block'}
                  SelectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  data={AgencyList}
                  placeholder="Search Agency..."
                  setInputValue={setInputValue}
                  InputValue={inputValue}
                  ResetData={resetPage}
                ></SearchInput>
              )}
            </div>
            <div className="col-span-1">
              {selectedItem?.length != 0 && (
                <>
                  <p className="text-white mb-1">Select Date Range</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DatePickerRange
                      placeholder="Select date range"
                      style={{ fontSize: '15px', marginRight: '10px' }}
                      onChange={(e) => {
                        setFormState((prevFormState) => ({
                          ...prevFormState,
                          datesrange: e,
                        }));
                      }}
                      size="sm"
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
                    <p className="text-white mb-1">Payment Received Date</p>
                    <DatePicker
                      minDate={oneMonthAgo}
                      placeholder="Pick a date"
                      onChange={(event) => {
                        handlePaymentReceivedDateChange(event);
                      }}
                      clearable={false}
                      size="sm"
                    />
                  </>
                )}
            </div>
            <div></div>
            {selectedRows.length > 0 && summaryData && (
              <div className="col-span-1 flex flex-col items-end mr-2">
                <span className="mb-1 font-medium text-gray-600 dark:text-gray-300 text-sm">
                  Total Amount
                </span>
                <span className="font-semibold text-xl text-teal-500">
                  {numberToINRFormat(summaryData.totalPayableAmount)}
                </span>
              </div>
            )}
          </div>
        </div>
        {tableData.length > 0 && (
          <>
            {formState.paymentReceivedDateTime ? (
              <ReportsTable
                tableData={tableData}
                tableName={'invoiceAdjustment'}
                originalColumns={columns}
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
                tableName={'invoiceAdjustment'}
                originalColumns={columns}
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
              onClick={() => setIsSaveDialogOpen(true)}
              variant="solid"
              type="submit"
              size="sm"
            >
              Proceed to Save
            </Button>
            &nbsp;
            <Button onClick={() => resetPage()} type="button" size="sm">
              Discard
            </Button>
          </div>
          <div
            id="myblock"
            className="grid grid-cols-2 gap-6 p-4 pt-0 pb-1 bg-gray-100 dark:bg-gray-800"
          >
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Total Invoices
              </span>
              <span className="font-medium text-lg text-teal-500">
                {tableData.length}
              </span>
            </div>
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Selected Invoices
              </span>
              <span className="font-medium text-lg text-teal-500">
                {selectedRows.length}
              </span>
            </div>
          </div>
        </StickyFooter>
      )}
      <WarningDialog
        isDialogOpen={isSaveDialogOpen}
        title="Save"
        description={`Are you sure you want to save?`}
        submitButtonTitle="Save"
        handleDialogSubmit={handleSave}
        handleDialogClose={() => setIsSaveDialogOpen(false)}
      />
      <Loader showLoader={showLoader} />
    </>
  );
};

export default InvoiceAdjustment;
