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
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import { apispotcancellation } from 'services/SalesAdminService';
import { apiGetcancelremarkmasterdrop } from 'services/BookingService';
import { HiClock, HiOutlineClipboardCheck } from 'react-icons/hi';
import classNames from 'classnames';
import { hideStackedSideNav_secondary } from 'views/Scheduling/general';
import ReportsTable from 'views/Controls/ReportsTable/ReportsTable';
import { reportsTableEnum } from 'views/Controls/ReportsTable/enums/ReportsTableEnums';
import { useSelector } from 'react-redux';
import ConditionalApi from './ConditionalApi';
import { convertDateToYMD } from 'components/validators';
import { apiCallstoreprocedure } from 'services/CommonService';

/* CONSTANTS */
const COLUMNS = [
  { header: 'Agency', accessorKey: 'AgencyName' },
  { header: 'Client', accessorKey: 'ClientName' },
  { header: 'Brand', accessorKey: 'BrandName' },
  { header: 'Commercial', accessorKey: 'CommercialCaption' },
  { header: 'Duration', accessorKey: 'CommercialDuration' },
  { header: 'Content', accessorKey: 'ContentName' },
  { header: 'Schedule Date', accessorKey: 'BookingScheduleDate' },
  { header: 'ScheduleTime', accessorKey: 'ScheduleTime' },
  { header: 'SpotRate', accessorKey: 'SpotRate' },
  { header: 'SpotAmount', accessorKey: 'SpotAmount' },
  { header: 'BookingCode', accessorKey: 'BookingCode' },
];

const SpotCancel = () => {
  const currentHref = window.location.href; // Get the full URL
  const hashPart = currentHref.split('#')[1]; // Get the part after the '#'
  const spotCancel = hashPart ? hashPart.split('/')[1] : '';
  const Channel = useSelector((state) => state.locale.selectedChannel);

  /* STATES */
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [formState, setFormState] = useState({ datesrange: [null, null] });
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [distinctdata, setDistinctData] = useState([]);
  const [summarydata, setSummarydata] = useState([]);
  const [isFinalSummaryDialogOpen, setIsFinalSummaryDialogOpen] =
    useState(false);
  const [managedColumns, setManagedColumns] = useState([]);
  const [paginationState, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);
  const [cancelRemarkOptions, setCancelRemarkOptions] = useState([]);
  const [selectedCancelRemark, setSelectedCancelRemark] = useState([]);
  const [isVisibleAdvanceFilter, setIsVisibleAdvanceFilter] = useState(false);

  let IsNTCPage = spotCancel.toLowerCase() === 'spotscancellation' ? 0 : 1;
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
          const cancel = await apiGetcancelremarkmasterdrop('');
          const formattedOptions = cancel.data.map((option) => ({
            value: option.CancelRemarkCode,
            label: option.CancelRemarkName,
          }));
          setCancelRemarkOptions(formattedOptions);
        })();
        setInitialLoad(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [initialLoad]);

  useEffect(() => {
    try {
      setDistinctData(getDistinctSums(selectedRows));
      calculateSums(selectedRows);
    } catch (error) {
      console.error(error);
    }
  }, [selectedRows]);

  /* EVENT HANDLERS */
  const handleConfirm = async () => {
    if (selectedCancelRemark.value) {
      const data = selectedRows.map((item) => ({
        Id: item.Id,
      }));
      try {
        const resp = await apispotcancellation(
          data,
          selectedCancelRemark.value,
          IsNTCPage,
        );
        if (resp.status === 200) {
          setIsFinalSummaryDialogOpen(false);
          resetData();
          openNotification('success', 'Spot Cancel successfully');
          return;
        }
      } catch (error) {
        if (error.response.status === 500) {
          openNotification('danger', 'Server Error.');
          return;
        }
      }
    } else {
      openNotification('warning', 'Please Select Remark');
    }
  };
  /* HELPER FUNCTIONS */
  const getData = () => {
    if (Object.keys(formState).length) {
      if (formState?.datesrange[0] && formState?.datesrange[1]) {
        (async () => {
          try {
            // Make the API call with the given parameters
            const resp = await apiGetspotcancellation(
              formState,
              selectedItem,
              0, // Assuming this is some default parameter
              'B E R', // String parameter passed to the API
              IsNTCPage, // Conditional parameter
              Channel.LocationCode,
              Channel.ChannelCode,
            );
            if (resp?.data?.length > 0) {
              setTableData(resp.data);
            } else {
              setTableData([]);
            }
          } catch (error) {
            console.error('Error fetching spot cancellation data:', error);

          }
        })();
      }
    }

  }
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

  const resetData = () => {
    try {
      setIsVisibleAdvanceFilter(false);
      setInputValue('');
      setSelectedItem([]);
      setClientList([]);
      setFormState({ datesrange: [null, null] });
      setTableData([]);
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
      setCancelRemarkOptions([]);
      setSelectedCancelRemark([]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCheckScheduling = async () => {
    if (formState?.datesrange[0] && formState?.datesrange[1]) {
      try {
        const CheckScheduling = await apiCallstoreprocedure('USP_SA_CheckSchedulingStatus', {
          Locationcode: Channel.LocationCode,
          Channelcode: Channel.ChannelCode,
          FromDate: convertDateToYMD(formState?.datesrange[0]),
          ToDate: convertDateToYMD(formState?.datesrange[1])

        });
        if (CheckScheduling.data[0]?.StatusCode == 1) {
          getData()
        }
        else {
          openNotification('danger', CheckScheduling.data[0]?.StatusMsg)
        }

      } catch (error) {
        console.error('Error fetching storage details:', error);
      }
    }
    else {
      openNotification('warning', 'Please Select Date')
    }
  }
  return (
    <>
      <Card header={<HeaderExtra Component={'Spot Cancel'} />}>
        <div >
          <div className="grid grid-cols-6 gap-2">
            <div className="col-span-3 ">
              <p className="lbale ">Search Client</p>
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
            <div className="col-span-2">
              {selectedItem?.length != 0 && (
                <>
                  <p className="lbale ">Select Date Range</p>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DatePickerRange
                      placeholder="Select date range"
                      minDate={new Date()}
                      size='sm'
                      style={{ fontSize: '15px', marginRight: '10px' }}
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
            {selectedItem?.length != 0 &&
              <div className="col-span-1 flex items-center justify-around ml-2 mt-5">
                <Button size='sm' variant="twoTone" onClick={() => setIsVisibleAdvanceFilter(!isVisibleAdvanceFilter)} >Advance Filter</Button>
                {!isVisibleAdvanceFilter && <Button size='sm' className='ml-2 w-32' variant="solid" onClick={fetchCheckScheduling}>Search</Button>}
              </div>
            }
          </div>
        </div>
        {isVisibleAdvanceFilter && (<>
          <ConditionalApi selectedItem={selectedItem} formState={formState} setFormState={setFormState} fetchCheckScheduling={fetchCheckScheduling} />

        </>)}
        <ReportsTable
          tableData={tableData}
          tableName={'spotCancel'}
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
              Proceed to Cancel
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
                {summarydata?.Duration}
              </span>
            </div>
            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Spot Amount
              </span>
              <span className="font-medium text-lg text-teal-500">
                {summarydata?.spotAmountSum}
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
        <h5 className="mt-2">Select Remark</h5>
        <Select
          options={cancelRemarkOptions}
          onChange={(e) => {
            setSelectedCancelRemark(e);
          }}
        />
        <div className="text-right mt-6 ">
          <Button variant="solid" className="mr-2" onClick={handleConfirm}>
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

export default SpotCancel;
