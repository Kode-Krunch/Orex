import React, { memo, useEffect, useState } from 'react';
import DealDetails from './DealDetails';
import NewDealDetails from './NewDealDetails';
import BookingDetails from './BookingDetails';
import {
  apiGetAgencyCityIDCITY,
  apiGetclientcitymasterdropmaster,
  apiGetempmasterdropmaster,
} from 'services/MasterService';
import {
  hideCursorLoader,
  openNotification,
  showCursorLoader,
} from 'views/Controls/GLOBALFUNACTION';
import {
  apiGetAgencygetagencyasperclient,
  apiGetclientmasterdropmaster,
  apiGetDealmaster_drop,
  apiGetPayroutemasterDrop,
} from 'services/CreditcontrolService';
import {
  defaultUpdateFormFieldOptions,
  defaultUpdateFormState,
} from './constants';
import {
  apidealmasterBYID,
  apiGetdealdetailId,
  apiGetspottypemasterdrop,
} from 'services/DealServices';
import { fieldsEnum } from './enums';

/* CONSTANTS */
const {
  EXECUTIVE_NAME,
  CLIENT_NAME,
  CLIENT_CITY,
  AGENCY_NAME,
  AGENCY_CITY,
  PAYROUTE,
  DEAL_CATEGORY,
  SPOT_TYPE,
} = fieldsEnum;

function DealUpdate() {
  /* STATES */
  const [dealSelectorOptions, setDealSelectorOptions] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [dealDetails, setDealDetails] = useState(null);
  const [updateFormState, setUpdateFormState] = useState(
    defaultUpdateFormState,
  );
  const [updateFormFieldOptions, setUpdateFormFieldOptions] = useState(
    defaultUpdateFormFieldOptions,
  );

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        showCursorLoader();
        await setDealSelectorOptionsFn();
        await setExecutiveOptions();
        await setClientNameOptions();
        await setPayRouteOptions();
        await setSpotTypeOptions();
      } catch (error) {
        console.error(error);
      } finally {
        hideCursorLoader();
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!selectedDeal) return;
        showCursorLoader();
        setUpdateFormState(defaultUpdateFormState);
        await setDealDetailsFn(selectedDeal.value);
        await setDealCategoryOptions(selectedDeal.value);
      } catch (error) {
        console.error(error);
      } finally {
        hideCursorLoader();
      }
    })();
  }, [selectedDeal]);

  useEffect(() => {
    (async () => {
      try {
        if (!updateFormState[CLIENT_NAME]) return;
        showCursorLoader();
        await setClientCityOptions(updateFormState[CLIENT_NAME].value);
        await setAgencyNameOptions(updateFormState[CLIENT_NAME].value);
      } catch (error) {
        console.error(error);
      } finally {
        hideCursorLoader();
      }
    })();
  }, [updateFormState[CLIENT_NAME]]);

  useEffect(() => {
    (async () => {
      try {
        if (!updateFormState[AGENCY_NAME]) return;
        showCursorLoader();
        await setAgencyCityOptions(updateFormState[AGENCY_NAME].value);
      } catch (error) {
        console.error(error);
      } finally {
        hideCursorLoader();
      }
    })();
  }, [updateFormState[AGENCY_NAME]]);

  /* HELPER FUNCTIONS */
  const setDealSelectorOptionsFn = async () => {
    let options = [];
    try {
      const response = await apiGetDealmaster_drop();
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.DealNumber,
          label: option.DealCode,
        }));
      else if (response.status === 204)
        openNotification('info', 'No deals found');
      else throw new Error(response);
    } catch (error) {
      openNotification('danger', 'Something went wrong while fetching deals');
      throw error;
    } finally {
      setDealSelectorOptions(options);
    }
  };

  const setDealDetailsFn = async (dealNumber) => {
    try {
      const response = await apidealmasterBYID(dealNumber);
      if (response.status === 200) {
        setDealDetails(response.data);
      } else if (response.status === 204)
        openNotification('info', 'No details found for selected deal');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching deal details',
      );
      throw error;
    }
  };

  const setDealCategoryOptions = async (dealNumber) => {
    let options = [];
    try {
      const response = await apiGetdealdetailId(dealNumber);
      if (response.status === 200)
        options = response.data.map((option) => ({
          ...option,
          value: option.DealLineItemNo,
          label: `${option.DealLineItemNo} | ${option.DealLineItemTypeName} | ${
            option.TimeBandName ? option.TimeBandName : option.ContentName
          }`,
        }));
      else if (response.status === 204)
        openNotification('info', 'No deals category found');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching deal categories',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [DEAL_CATEGORY]: options,
      }));
    }
  };

  const setSpotTypeOptions = async () => {
    let options = [];
    try {
      const response = await apiGetspottypemasterdrop();
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.SpotTypeCode,
          label: option.SpotTypeName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No spot types found');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching spot types',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [SPOT_TYPE]: options,
      }));
    }
  };

  const setExecutiveOptions = async () => {
    let options = [];
    try {
      const response = await apiGetempmasterdropmaster();
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.EmployeeCode,
          label: option.Emp_FirstName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No executives found');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching executives',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [EXECUTIVE_NAME]: options,
      }));
    }
  };

  const setClientNameOptions = async () => {
    let options = [];
    try {
      const response = await apiGetclientmasterdropmaster();
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.ClientCode,
          label: option.ClientName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No clients found');
      else throw new Error(response);
    } catch (error) {
      openNotification('danger', 'Something went wrong while fetching clients');
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [CLIENT_NAME]: options,
      }));
    }
  };

  const setClientCityOptions = async (clientCode) => {
    let options = [];
    try {
      const response = await apiGetclientcitymasterdropmaster(clientCode);
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.Place.PlaceCode,
          label: option.Place.PlaceName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No cities found for selected client');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching cities for selected clients',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [CLIENT_CITY]: options,
      }));
    }
  };

  const setAgencyNameOptions = async (clientCode) => {
    let options = [];
    try {
      const response = await apiGetAgencygetagencyasperclient(clientCode);
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.AgencyCode,
          label: option.AgencyName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No agencies found');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching agencies',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [AGENCY_NAME]: options,
      }));
    }
  };

  const setAgencyCityOptions = async (agencyCode) => {
    let options = [];
    try {
      const response = await apiGetAgencyCityIDCITY(agencyCode);
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.Place.PlaceCode,
          label: option.Place.PlaceName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No cities found for selected agency');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching city for selected agency',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [AGENCY_CITY]: options,
      }));
    }
  };

  const setPayRouteOptions = async () => {
    let options = [];
    try {
      const response = await apiGetPayroutemasterDrop();
      if (response.status === 200)
        options = response.data.map((option) => ({
          value: option.PayRouteCode,
          label: option.PayRouteName,
        }));
      else if (response.status === 204)
        openNotification('info', 'No pay route found');
      else throw new Error(response);
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetching pay route',
      );
      throw error;
    } finally {
      setUpdateFormFieldOptions((prev) => ({
        ...prev,
        [PAYROUTE]: options,
      }));
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 grow">
      <DealDetails
        dealDetails={dealDetails}
        dealSelectorOptions={dealSelectorOptions}
        selectedDeal={selectedDeal}
        setSelectedDeal={setSelectedDeal}
      />
      <NewDealDetails
        dealDetails={dealDetails}
        updateFormFieldOptions={updateFormFieldOptions}
        updateFormState={updateFormState}
        setUpdateFormState={setUpdateFormState}
        selectedDeal={selectedDeal}
      />
      <BookingDetails dealDetails={dealDetails} />
    </div>
  );
}

export default memo(DealUpdate);
