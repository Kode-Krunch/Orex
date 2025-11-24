import { useState, useEffect } from 'react';
import {
  apiGetRateCardmaster,
  apiGetclientmasterdropmaster,
  apiGetspotcancellation,
} from 'services/CreditcontrolService';
import {
  Button,
  Card,
  Dialog,
  Notification,
  Select,
  Tag,
  toast,
} from 'components/ui';
import HeaderExtra from 'views/Controls/HeaderExtra';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setContent, setDialogbox } from 'store/base/commonSlice';
import SpotCancelForm from './SpotCancelForm';
import DatePickerRange from 'components/ui/DatePicker/DatePickerRange';
import SearchInput from 'views/Controls/SearchInput';
import { StickyFooter } from 'components/shared';
import {
  openNotification,
  parseDuration,
} from 'views/Controls/GLOBALFUNACTION';
import { apispotcancellation } from 'services/SalesAdminService';
import { apiGetcancelremarkmasterdrop } from 'services/BookingService';
import { hideStackedSideNav } from 'views/Scheduling/general';
import ProductFilter from './SpotFilter';
import SpotFilter from './SpotFilter';
import { HiClock, HiOutlineClipboardCheck, HiPencilAlt } from 'react-icons/hi';
import classNames from 'classnames';

const SpotCancel = () => {
  const dispatch = useDispatch();
  const Channel = useSelector((state) => state.locale.selectedChannel);
  const [data, setdata] = useState(['']);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});

  const [SelectedItem, setSelectedItem] = useState([]);
  const [Deatils, setDeatils] = useState([]);
  const [SpotCopy, setSpotCopy] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [Summarydata, setSummarydata] = useState([]);
  const [distinctdata, setdistinctdata] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [SpotFilterData, setSpotFilterData] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [filterSelections, setFilterSelections] = useState({});

  useEffect(() => {
    //console.log('SpotFilterData', SpotFilterData)
    setSelectedRowData([]);
    var sdt = filterDetails();
    console.log('SpotFilterData', sdt);
    setDeatils(sdt);
  }, [SpotFilterData]);

  // const filterDetails = () => {
  //     return SpotCopy.filter(detail =>
  //         SpotFilterData.every(filter =>
  //             !filter.checkboxStatus || detail[filter.column] === filter.item
  //         )
  //     );
  // };

  const filterDetails = () => {
    const groupedFilters = SpotFilterData.reduce((acc, filter) => {
      if (filter.checkboxStatus) {
        if (!acc[filter.column]) acc[filter.column] = [];
        acc[filter.column].push(filter.item);
      }
      return acc;
    }, {});

    return SpotCopy.filter((detail) =>
      Object.keys(groupedFilters).every((column) =>
        groupedFilters[column].includes(detail[column]),
      ),
    );
  };

  useEffect(() => {
    hideStackedSideNav();
    (async (values) => {
      const resp = await apiGetclientmasterdropmaster(values);
      console.log(resp.data);
      const transformedData = resp.data.map((client) => ({
        label: client.ClientName,
        value: client.ClientCode,
      }));

      setdata(transformedData);
    })();
  }, []);

  useEffect(() => {
    (async (values) => {
      const resp = await apiGetspotcancellation(
        formState,
        SelectedItem,
        0,
        'B E R',
        Channel.LocationCode,
        Channel.ChannelCode,
      );
      setDeatils(resp.data);
      setSpotCopy(resp.data);
    })();
  }, [formState]);
  const [Cancel, setCancel] = useState([]);
  const [CancelSelect, setCancelSelect] = useState([]);

  useEffect(() => {
    const calculateSums = (selectedRowData) => {
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
      (async (values) => {
        const cancel = await apiGetcancelremarkmasterdrop('');

        const formattedOptions = cancel.data.map((option) => ({
          value: option.CancelRemarkCode,
          label: option.CancelRemarkName,
        }));
        setCancel(formattedOptions);
      })();
    };

    const calculateDistinctSums = (selectedRowData) => {
      if (!Array.isArray(selectedRowData)) {
        console.error('selectedRowData is not an array:', selectedRowData);
        return [];
      }

      console.log('selectedRowData', selectedRowData);

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
    };

    const distinctSums = calculateDistinctSums(selectedRowData);
    setdistinctdata(distinctSums);
    calculateSums(selectedRowData);
  }, [selectedRowData]);

  useEffect(() => {
    ResetData();
  }, [SelectedItem]);

  const [selectedItems, setSelectedItems] = useState([]);
  // : 'success' | 'warning' | 'danger' | 'info'

  const setApi = async () => {
    // alert(JSON.stringify(CancelSelect))
    if (CancelSelect.value) {
      const mergedData = selectedRowData.map((item) => ({
        Id: item.Id,
      }));
      try {
        const resp = await apispotcancellation(mergedData, CancelSelect.value);
        console.log(resp);
        if (resp.status === 200) {
          setIsDialogOpen(false);
          ResetData();
          openNotification('success', 'Spot Cancel successfully');
          return;
        }
      } catch (error) {
        if (error.response.status === 500) {
          openNotification('danger', 'Server Error.');
          return;
        }
      }

      console.log(mergedData);

      setCancelSelect([]);
    } else {
      openNotification('warning', 'Please Select Remark');
    }
  };

  const ResetData = () => {
    // setDeatils([])
    // setSpotCopy([])
  };

  const handleClear = () => {
    setSelectedRowData([]);
    setSelectedItems([]);
    ResetData();
  };

  return (
    <>
      <Card header={<HeaderExtra Component={'Spot Cancel'} />}>
        <div className="pl-4 mb-4">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-3 ">
              <p className="lbale ">Search Client</p>
              {data && (
                <SearchInput
                  className={'block'}
                  SelectedItem={SelectedItem}
                  setSelectedItem={setSelectedItem}
                  data={data}
                  placeholder="Search Client..."
                ></SearchInput>
              )}
            </div>
            <div className="col-span-2">
              {SelectedItem?.length != 0 && (
                <>
                  <p className="lbale ">Select Date Range</p>
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
                    />
                    {Deatils.length > 0 && (
                      <SpotFilter
                        data={SpotCopy}
                        ColumnsToFilter={[
                          'AgencyName',
                          'ClientName',
                          'BrandName',
                          'CommercialCaption',
                        ]}
                        setSpotFilterData={setSpotFilterData}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <SpotCancelForm
          setDeatils={setDeatils}
          Deatils={Deatils}
          SpotCopy={SpotCopy}
          setSpotCopy={setSpotCopy}
          setFormState={setFormState}
          formState={formState}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
          selectedRowData={selectedRowData}
          setSelectedRowData={setSelectedRowData}
        ></SpotCancelForm>
      </Card>

      {selectedRowData.length > 0 && (
        <StickyFooter
          className="-mx-8 px-8 flex items-center justify-between py-4 pt-2 pb-2"
          stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <div className="md:flex items-center">
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="solid"
              type="submit"
              size="sm"
            >
              Proceed to Cancel
            </Button>
            &nbsp;
            <Button onClick={() => handleClear()} type="button" size="sm">
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
              <span className="font-medium text-lg">{Deatils.length}</span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Selected Spots
              </span>
              <span className="font-medium text-lg">
                {selectedRowData.length}
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Duration
              </span>
              <span className="font-medium text-lg   ">
                {Summarydata?.Duration}
              </span>
            </div>

            <div className="flex flex-col lbl">
              <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
                Spot Amount
              </span>
              <span className="font-medium text-lg  ">
                {Summarydata?.spotAmountSum}
              </span>
            </div>
          </div>
        </StickyFooter>
      )}

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onRequestClose={() => setIsDialogOpen(false)}
      >
        <Card>
          {distinctdata.map((item, index) => (
            <div key={index}>
              {/* <Card>
                                <p><strong>Commercial Caption:</strong> {item.CommercialCaption}</p>
                                <p><strong>Commercial Duration:</strong> {item.CommercialDuration}</p>
                                <p><strong>Spot Amount Sum:</strong> {item.SpotAmountSum}</p>
                                <p><strong>Total Duration:</strong>{ item.TotalDuration}</p>
                                <p><strong>Total Count:</strong> {item.TotalCount}</p>
                            </Card> */}
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

                  {/* {item.SpotAmountSum} */}

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
          options={Cancel}
          onChange={(e) => {
            console.log(e);
            setCancelSelect(e);
          }}
        />
        <div className="text-right mt-6 ">
          <Button variant="solid" className="mr-2" onClick={() => setApi()}>
            Confirm
          </Button>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </div>
      </Dialog>
    </>
  );
};

export default SpotCancel;
