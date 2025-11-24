import React, { useState } from 'react';
import { Button, DatePicker, Drawer, Input } from 'components/ui';
import SpotCancelDrop from 'views/Controls/SpotCancelDrop';
import { useEffect } from 'react';
import {
  apiGetAgencygetagencyasperclient,
  apiGetBrandasperclient,
  apiGetDealmaster_drop,
  apiGetclientmasterdropmaster,
} from 'services/CreditcontrolService';
import { apiGetCommercialClientBrandwisedrop } from 'services/SalesAdminService';
import {
  apiGetcancelremarkmasterdrop,
  apiGetdealsearchdrop,
} from 'services/BookingService';

const DrawerFrom = ({
  setFormState,
  formState,
  isOpen,
  onDrawerClose,
  footer,
}) => {
  const [Client, setClient] = useState([]);
  const [Brand, setBrand] = useState([]);
  const [Agency, setAgency] = useState([]);
  const [Commercial, setCommercial] = useState([]);
  const [Deal, setDeal] = useState([]);
  const [Cancel, setCancel] = useState([]);
  useEffect(() => {
    (async (values) => {
      const Client = await apiGetclientmasterdropmaster(values);
      const formattedOptions = Client.data.map((option) => ({
        value: option.ClientCode,
        label: option.ClientName,
      }));
      setClient(formattedOptions);
    })();
    (async (values) => {
      const Deal = await apiGetdealsearchdrop('');
      console.log(Deal.data);
      const formattedOptions = Deal.data.map((option) => ({
        value: option.DealNumber,
        label: option.DealCode,
      }));
      setDeal(formattedOptions);
    })();
    (async (values) => {
      const cancel = await apiGetcancelremarkmasterdrop('');

      const formattedOptions = cancel.data.map((option) => ({
        value: option.CancelRemarkCode,
        label: option.CancelRemarkName,
      }));
      setCancel(formattedOptions);
    })();
  }, []);

  const get = async (value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      Brand: '',
    }));
    setFormState((prevFormState) => ({
      ...prevFormState,
      Agency: '',
    }));
    setFormState((prevFormState) => ({
      ...prevFormState,
      Commercial: '',
    }));
    try {
      const Brand = await apiGetBrandasperclient(value);

      const formattedOptions = Brand.data.map((option) => ({
        value: option.BrandMaster.BrandCode,
        label: option.BrandMaster.BrandName,
      }));
      console.log(formattedOptions);
      setBrand(formattedOptions); // Flatten the array of arrays
    } catch (error) {
      console.error('Error fetching brand data:', error);
      setBrand([]);
    }

    try {
      const Agency = await apiGetAgencygetagencyasperclient(value);
      const formattedOptions = Agency.data.map((option) => ({
        value: option.AgencyCode,
        label: option.AgencyName,
        IsCredit: option.IsCredit,
        IsAdvPmt: option.IsAdvPmt,
        IsPDC: option.IsPDC,
        CreditDays: option.CreditDays,
        BusinessTypeCode: option.BusinessType.BusinessTypeCode,
        BusinessTypeName: option.BusinessType.BusinessTypeName,
      }));
      console.log(formattedOptions);
      setAgency(formattedOptions); // Flatten the array of arrays
    } catch (error) {
      console.error('Error fetching Agency data:', error);

      setAgency([]);
    }
  };
  const get2 = async (value) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      Commercial: '',
    }));
    try {
      const Commercial = await apiGetCommercialClientBrandwisedrop(
        value,
        formState.Client?.value,
        0,
        0,
        0,
      );

      const formattedOptions = Commercial.data.map((option) => ({
        value: option.CommercialCode,
        label: option.CommercialCaption,
      }));
      console.log(formattedOptions);
      setCommercial(formattedOptions); // Flatten the array of arrays
    } catch (error) {
      console.error('Error fetching Commercial data:', error);
      setCommercial([]);
    }
  };
  // apiGetCommercialClientBrandwisedrop2

  return (
    <Drawer
      title="Spots Details"
      isOpen={isOpen}
      onClose={onDrawerClose}
      onRequestClose={onDrawerClose}
      footer={footer}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">From Date </span>
          </div>
          <div className="">
            <DatePicker
              placeholder="From Date "
              size="sm"
              // maxDate={maxDate} minDate={minDate}
              value={formState.FromDate}
              onChange={(e) => {
                setFormState((prevFormState) => ({
                  ...prevFormState,
                  FromDate: e,
                }));
              }}
            ></DatePicker>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">To Date</span>
          </div>
          <div className="">
            <DatePicker
              placeholder="To Date"
              size="sm"
              // maxDate={maxDate} minDate={minDate}
              value={formState.ToDate}
              onChange={(e) => {
                setFormState((prevFormState) => ({
                  ...prevFormState,
                  ToDate: e,
                }));
              }}
            ></DatePicker>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Client</span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Client}
              setSelected={setFormState}
              List={Client}
              name={'Client'}
              get={get}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Agency</span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Agency}
              setSelected={setFormState}
              List={Agency}
              name={'Agency'}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Brand</span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Brand}
              setSelected={setFormState}
              List={Brand}
              name={'Brand'}
              get={get2}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Commercial</span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Commercial}
              setSelected={setFormState}
              List={Commercial}
              name={'Commercial'}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Deal no</span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Dealno}
              setSelected={setFormState}
              List={Deal}
              name={'Dealno'}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Booking no</span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Bookingno}
              setSelected={setFormState}
              List={[
                { value: '1', label: 'Data Not Found' },
                { value: '2', label: 'Data Not Found' },
                { value: '3', label: 'Data Not Found' },
              ]}
              name={'Bookingno'}
            />
          </div>
        </div>

        <div className="col-span-2">
          <div>
            <span className="FontSizeV">Select all reason to cancel </span>
          </div>
          <div className="">
            <SpotCancelDrop
              selected={formState.Cancel}
              setSelected={setFormState}
              List={Cancel}
              name={'Cancel'}
            />
          </div>
        </div>

        {/* <Button size='sm'>Cal Selected</Button> */}
      </div>
    </Drawer>
  );
};

export default DrawerFrom;
