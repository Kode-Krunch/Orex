import React, { useState, useEffect } from 'react';
import { Button, Card, Select } from 'components/ui';
import { StickyFooter } from 'components/shared';
import HeaderExtra from 'views/Controls/HeaderExtra';
import {
  apiGetAgencygetagencyasperclient,
  apiGetBrandasperclient,
  apiGetclientmasterdropmasterbydate,
  apiGetspotReplacement,
} from 'services/CreditcontrolService';
import {
  apiGetCommercialClientBrandwisedrop2,
  apiGetCommercialClientBrandwisedrop,
} from 'services/SalesAdminService';
import SearchOption from './components/SearchOptions';
import { SelectionTable } from './components/SelectionTable';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import { apipostbookingdetails } from 'services/DealServices';
import { useNavigate } from 'react-router-dom';
import { hideStackedSideNav } from 'views/Scheduling/general';
import { useDispatch, useSelector } from 'react-redux';

const CaptionReplace = () => {
  const [replaceCommercial, setReplaceCommercial] = useState();
  const [ClientList, setClientList] = useState([]);
  const [agencyList, setAgencyList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [commercialList, setCommercialList] = useState([]);
  const [commercialList2, setCommercialList2] = useState([]);
  const [selectedCommercial, setSelectedCommercial] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [displayMoreOption, setDisplayMoreOption] = useState(false);
  const [displayBasicDetails, setdisplayBasicDetails] = useState(true);
  const [data, setdata] = useState(['']);
  const [displaySpots, setDisplaySpots] = useState(false);
  const [selectItems, setSelectedItem] = useState([]);
  const Channel = useSelector((state) => state.locale.selectedChannel);

  const [formState, setFormState] = useState({});

  const currentHref = window.location.href; // Get the full URL
  const hashPart = currentHref.split('#')[1]; // Get the part after the '#'
  const spotBooking = hashPart ? hashPart.split('/')[1] : ''; // Extract "SpotBooking"
  const IsNTCPage = spotBooking === 'spotreplacementntc' ? 1 : 0;
  useEffect(() => {
    hideStackedSideNav();
    if (formState.StartDate && formState.EndDate) {
      (async (values) => {
        const resp = await apiGetclientmasterdropmasterbydate(
          formState.StartDate,
          formState.EndDate,
        );
        const clients = resp.data.map((Client) => {
          let res = {};
          res.label = Client.ClientName;
          res.value = Client.ClientCode;
          return res;
        });

        setClientList(clients);
      })();
    } else {
      setClientList([]);
    }
  }, [formState.StartDate, formState.EndDate]);

  useEffect(() => {
    if (selectedClient && selectedBrand) {
      (async () => {
        const resp = await apiGetCommercialClientBrandwisedrop(
          selectedBrand?.value,
          selectedClient?.value,
          Channel.LocationCode,
          Channel.ChannelCode,
          IsNTCPage,
        );
        console.log(resp);
        if (resp.status == 204) {
          openNotification(
            'warning',
            `Commercial not found for Brand : ${selectedBrand.label}`,
          );
          setCommercialList([]);
          setAgencyList([]);
        }
        if (resp.status == 200) {
          const clients = resp.data.map((commercial) => {
            let res = {};
            res.label = commercial.CommercialCaption;
            res.value = commercial.CommercialCode;
            res.DurInSec = commercial.DurInSec;
            return res;
          });
          console.log(clients);
          setCommercialList(clients);
        }
      })();
    }
  }, [selectedClient, selectedBrand]);

  useEffect(() => {
    if (selectedClient && selectedBrand && selectedCommercial) {
      (async () => {
        const resp = await apiGetCommercialClientBrandwisedrop2(
          selectedBrand,
          selectedClient,
          selectedCommercial,
          Channel.LocationCode,
          Channel.ChannelCode,
          IsNTCPage,
        );
        console.log(resp.data);
        if (resp.status == 204) {
          openNotification(
            'warning',
            `Commercial not found for Brand : ${selectedBrand.label}`,
          );
          setCommercialList2([]);
        }
        const clients = resp.data.map((item) => ({
          label: item.CommercialCaption,
          value: item.CommercialCode,
          DurInSec: item.DurInSec,
        }));

        console.log(clients);
        setCommercialList2(clients);
        // setClientList(clients)
      })();
    }
  }, [selectedCommercial]);

  const handleInputChange2 = (value, name) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };
  // : 'success' | 'warning' | 'danger' | 'info'

  const Getagencyasperclient = async (ID, lab) => {
    const Brand = await apiGetBrandasperclient(ID);
    const Agency = await apiGetAgencygetagencyasperclient(ID);

    if (Brand.status == 204) {
      openNotification('warning', `Brand not found for client : ${lab}`);
      setCommercialList([]);
      setAgencyList([]);
    }

    const brandOptions =
      Brand.data != ''
        ? Brand.data.map((option) => ({
            value: option.BrandMaster.BrandCode,
            label: option.BrandMaster.BrandName,
          }))
        : [];
    const formattedOptions =
      Agency.data != ''
        ? Agency.data.map((option) => ({
            value: option.AgencyCode,
            label: option.AgencyName,
            IsCredit: option.IsCredit,
            IsAdvPmt: option.IsAdvPmt,
            IsPDC: option.IsPDC,
            CreditDays: option.CreditDays,
            BusinessTypeCode: option.BusinessType.BusinessTypeCode,
            BusinessTypeName: option.BusinessType.BusinessTypeName,
          }))
        : [];
    setBrandList(brandOptions);
    setAgencyList(formattedOptions);
  };

  const handleClientChange = (data) => {
    setSelectedClient(data);
    Getagencyasperclient(data.value, data.label);
  };

  const spotData = [
    {
      name: 'Total Spots',
      value: data.length,
    },
    {
      name: 'Selected Spots',
      value: selectItems ? selectItems.length : 0,
    },
    {
      name: 'Remaining Spots',
      value: data?.length - selectItems?.length,
    },
  ];

  const spotSelectedData = (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-6 ">
        <div style={{ width: '300px' }}>
          {commercialList2.filter(
            (option) => option.value !== selectedCommercial?.value,
          ).length !== 0 ? (
            <p></p>
          ) : (
            <>
              <p className="text-red-500">
                No Commercial found for Replacement{' '}
              </p>
            </>
          )}
          <p className="lbale flex">
            Replace Commercial &nbsp; <span className="text-red-500">*</span>
          </p>

          <Select
            options={commercialList2.filter(
              (option) => option.value !== selectedCommercial?.value,
            )}
            value={commercialList2.filter(
              (option) => option == replaceCommercial,
            )}
            onChange={setReplaceCommercial}
          />
        </div>
      </div>
      <div className="col-span-6 grid grid-cols-12 gap-2">
        {spotData.map((item) => (
          <div className="col-span-4 grid-rows-6 gap-2">
            <div className="row-span-2 p-2 bg-teal-400 text-white text-center mb-2 text-md rounded-t-lg">
              {' '}
              {item.name}{' '}
            </div>
            <div className="row-span-2 p-1  bg-teal-600 text-white text-center text-xl rounded-b-lg">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OpenAvailableSpots = async (values) => {
    setDisplaySpots(true);

    const resp = await apiGetspotReplacement(
      formState,
      selectedClient,
      selectedCommercial,
      IsNTCPage,
      Channel.LocationCode,
      Channel.ChannelCode,
    );
    if (resp.status == 200) {
      if (resp.data == 'ok') {
        setdata([]);
        return;
      }
      const test = resp.data.map((item, index) => {
        return {
          srno: index + 1,
          ...item,
        };
      });

      setdata(test);
    } else if (resp.status == 204) {
      setdata([]);
    }
  };

  const columns = [
    {
      header: 'Agency',
      accessorKey: 'AgencyName',
    },
    {
      header: 'Brand',
      accessorKey: 'BrandName',
    },
    {
      header: 'Commercial',
      accessorKey: 'CommercialCaption',
    },
    {
      header: 'Duration',
      accessorKey: 'CommercialDuration',
    },
    {
      header: 'Transmission Time',
      accessorKey: 'TransmissionTime',
    },
    {
      header: 'Content',
      accessorKey: 'ContentName',
    },
    {
      header: 'Schedule Date',
      accessorKey: 'ScheduleDate',
    },
    {
      header: 'Schedule Time',
      accessorKey: 'ScheduleTime',
    },
    {
      header: 'Spot Rate',
      accessorKey: 'SpotRate',
    },
    {
      header: 'Spot Amount',
      accessorKey: 'SpotAmount',
    },
  ];

  return (
    <Card header={<HeaderExtra Component={'Caption Replacement'} />}>
      <SearchOption
        displayBasicDetails={displayBasicDetails}
        setdisplayBasicDetails={setdisplayBasicDetails}
        ClientList={ClientList}
        selectedClient={selectedClient}
        handleClientChange={handleClientChange}
        setSelectedAgency={setSelectedAgency}
        selectedAgency={selectedAgency}
        agencyList={agencyList}
        brandList={brandList}
        setSelectedBrand={setSelectedBrand}
        selectedBrand={selectedBrand}
        formState={formState}
        setFormState={setFormState}
        handleInputChange2={handleInputChange2}
        displayMoreOption={displayMoreOption}
        setDisplayMoreOption={setDisplayMoreOption}
        displaySpots={displaySpots}
        OpenAvailableSpots={OpenAvailableSpots}
        commercialList={commercialList}
        setSelectedCommercial={setSelectedCommercial}
        selectedCommercial={selectedCommercial}
        setDisplaySpots={setDisplaySpots}
      />
      {displaySpots ? (
        <Card className="mt-4" header={spotSelectedData}>
          <SelectionTable
            data={data}
            columns={columns}
            setselectedItem={setSelectedItem}
            selectedItem={selectItems}
          />

          <StickyFooter
            className="-mx-8 px-8 flex items-center justify-between py-4"
            stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="md:flex items-center">
              <Button
                className="mx-2"
                onClick={() => setDisplaySpots(!displaySpots)}
              >
                Discard
              </Button>
              <Button
                className="mx-2"
                variant="solid"
                onClick={() => {
                  const setApi = async () => {
                    const mergedData = selectItems.map((item) => ({
                      Id: item.Id,
                      // RescheduleDate: "",
                      CommercialCode: replaceCommercial.value,
                      BookingStatus: '',
                      // BookingRescheduleDate: item.BookingRescheduleDate,
                    }));
                    try {
                      const resp = await apipostbookingdetails(
                        'REPLACEMENT',
                        mergedData,
                        0,
                      );
                      if (resp.status === 200) {
                        openNotification(
                          'success',
                          'Caption Replaced Successfully',
                        );
                        setSelectedItem([]);
                        setdisplayBasicDetails(true);
                        setDisplaySpots(false);
                        setSelectedCommercial(null);
                        setSelectedBrand(null);
                        setSelectedClient(null);
                        setSelectedAgency(null);
                        return;
                      }
                    } catch (error) {
                      if (error.response.status === 500) {
                        openNotification('danger', 'Server Error.');
                        return;
                      }
                    }
                  };
                  if (selectedCommercial.value > 0) {
                    setApi();
                  } else {
                    openNotification(
                      'warning',
                      'Please Select Replace Commercial',
                    );
                  }
                }}
              >
                Replace
              </Button>
            </div>
          </StickyFooter>
        </Card>
      ) : null}
    </Card>
  );
};

export default CaptionReplace;
