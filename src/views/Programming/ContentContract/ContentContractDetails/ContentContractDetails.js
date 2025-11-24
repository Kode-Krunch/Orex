import { StickyFooter } from 'components/shared';
import { Button, Card, DatePicker, Input } from 'components/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { apiCallstoreprocedure } from 'services/CommonService';
import {
  apiGetCountryDrop,
  apiGetCurrencymasterdrop,
  apiGetPlaceMasterbyId,
  apiGetStateMasterbyId,
} from 'services/MasterService';
import {
  addcontentcontractdetails,
  apiGetAmortisationTypeMaster,
  apiGetcontentcontractmasterId,
  apiGetSuppliermasterDrop,
  PostContentContract,
  PutContentContract,
} from 'services/ProgrammingService';
import {
  hideCursorLoader,
  openNotification,
  showCursorLoader,
} from 'views/Controls/GLOBALFUNACTION';
import SelectXs from 'views/Controls/SelectXs/SelectXs';
import { hideStackedSideNav } from 'views/Scheduling/general';
import ContentsTabs from './components/ContentsTabs';
import {
  getDataToSave,
  handleSelectorOptionsResponse,
  setDataForContentsTab,
} from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setQueryParams } from 'store/base/commonSlice';

function ContentContractDetails() {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);
  const queryParams = useSelector((state) => state.base.common).queryParams;
  const dispatch = useDispatch();

  /* STATES */
  // contract master state
  const [contractMasterDetailsForEdit, setContractMasterDetailsForEdit] =
    useState(null);
  // selector options
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amortisationTypeOptions, setAmortisationTypeOptions] = useState(null);
  // selected values
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [contractName, setContractName] = useState('');
  const [authorisedPerson, setAuthorisedPerson] = useState('');
  const [agreementDate, setAgreementDate] = useState(null);
  const [budgetYear, setBudgetYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  // contents area states
  const [originalContentsReponse, setOriginalContentsResponse] = useState([]);
  const [newContents, setNewContents] = useState([]);
  const [newContSelRowIds, setNewContSelRowIds] = useState({});
  const [licensedContents, setLicensedContents] = useState([]);
  const [licensedContSelRowIds, setLicensedContSelRowIds] = useState({});

  /* HOOKS */
  const navigate = useNavigate();
  const location = useLocation();

  /* HOOKS - MEMOS */
  const isPageEdit = useMemo(
    () => location.pathname === '/ContentContractEdit',
    [location],
  );

  const fieldDisabledStates = useMemo(() => {
    return {
      contractName: !selectedSupplier,
      authorisedPerson: !selectedSupplier || !contractName,
      agreementDate: !selectedSupplier || !contractName || !authorisedPerson,
      country:
        !selectedSupplier ||
        !contractName ||
        !authorisedPerson ||
        !agreementDate,
      state:
        !selectedSupplier ||
        !contractName ||
        !authorisedPerson ||
        !agreementDate ||
        !selectedCountry,
      city:
        !selectedSupplier ||
        !contractName ||
        !authorisedPerson ||
        !agreementDate ||
        !selectedCountry ||
        !selectedState,
      currency:
        !selectedSupplier ||
        !contractName ||
        !authorisedPerson ||
        !agreementDate ||
        !selectedCountry ||
        !selectedState ||
        !selectedCity,
      all:
        !selectedSupplier ||
        !contractName ||
        !authorisedPerson ||
        !agreementDate ||
        !selectedCountry ||
        !selectedState ||
        !selectedCity ||
        !selectedCurrency,
      saveBtn:
        !selectedSupplier ||
        !contractName ||
        !authorisedPerson ||
        !agreementDate ||
        !selectedCountry ||
        !selectedState ||
        !selectedCity ||
        !selectedCurrency ||
        licensedContents.length === 0,
    };
  }, [
    selectedSupplier,
    contractName,
    authorisedPerson,
    agreementDate,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedCurrency,
    licensedContents,
  ]);

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        // Guard Clause
        if (!location) return;
        if (isPageEdit && !queryParams) {
          openNotification('info', 'No contract details found');
          navigate('/ContentContractMaster');
        }
        // Main Logic
        showCursorLoader();
        hideStackedSideNav();
        document.querySelector('.page-container').classList.add('!py-2');
        const selectorOptions = await initializeSelectorOptions();
        if (isPageEdit) {
          await initializePageForEdit(selectorOptions);
        }
      } catch (error) {
        console.error(error);
        openNotification(
          'danger',
          'Something went wrong while. Please refresh the page',
        );
      } finally {
        hideCursorLoader();
      }
    })();
    return () => {
      document.querySelector('.page-container').classList.remove('!py-2');
      dispatch(setQueryParams(null));
    };
  }, [queryParams, location, isPageEdit]);

  /* EVENT HANDLERS */
  const handleSupplierChange = async (supplier) => {
    try {
      showCursorLoader();
      setSelectedSupplier(supplier);
      const response = await apiCallstoreprocedure(
        'USP_PG_GetContentBySupplier',
        { SupplierCode: supplier.value },
      );
      let responseData = [];
      if (response.status === 200) {
        responseData = response.data;
        setOriginalContentsResponse(response.data);
      } else if (response.status === 204) {
        openNotification('info', 'No contents found for the selected supplier');
      } else throw new Error();
      setDataForContentsTab(responseData, setNewContents, setLicensedContents);
    } catch (error) {
      console.error(error);
      openNotification('danger', 'Unable to fetch contents for suppliers');
    } finally {
      clearSelections();
      hideCursorLoader();
    }
  };

  const handleAgreementDateChange = (date) => {
    setAgreementDate(date);
    setBudgetYear(date.getFullYear());
  };

  const handleCountryChange = async (country) => {
    try {
      showCursorLoader();
      setSelectedCountry(country);
      setSelectedState(null);
      setSelectedCity(null);
      const response = await apiGetStateMasterbyId(country.value);
      handleSelectorOptionsResponse(
        response,
        setStateOptions,
        'StateCode',
        'StateName',
      );
    } catch (error) {
      console.error(error);
      setStateOptions([]);
      setCityOptions([]);
      openNotification(
        'danger',
        'Unable to fetch states for the selected country',
      );
    } finally {
      hideCursorLoader();
    }
  };

  const handleStateChange = async (state) => {
    try {
      showCursorLoader();
      setSelectedState(state);
      setSelectedCity(null);
      const response = await apiGetPlaceMasterbyId(state.value);
      handleSelectorOptionsResponse(
        response,
        setCityOptions,
        'PlaceCode',
        'PlaceName',
      );
    } catch (error) {
      console.error(error);
      setCityOptions([]);
      openNotification(
        'danger',
        'Unable to fetch cities for the selected states',
      );
    } finally {
      hideCursorLoader();
    }
  };

  const handleSave = async () => {
    try {
      const data = getDataToSave(
        selectedSupplier,
        contractName,
        authorisedPerson,
        agreementDate,
        budgetYear,
        selectedCountry,
        selectedState,
        selectedCity,
        selectedCurrency,
        licensedContents,
        isPageEdit,
        contractMasterDetailsForEdit,
      );
      if (isPageEdit) {
        const response = await PutContentContract(data.contract, token);
        if (response.status === 200) {
          const response = await addcontentcontractdetails(data.details, token);
          if (response.status === 200) {
            openNotification('success', 'Contract updated successfully');
            navigate('/ContentContractMaster');
          } else throw new Error();
        } else throw new Error();
      } else {
        const response = await PostContentContract(data, token);
        if (response.status === 200) {
          openNotification('success', 'Contract created successfully');
          navigate('/ContentContractMaster');
        } else if (response.status === 206)
          openNotification(
            'danger',
            `Contract already exist with name ${contractName}`,
          );
        else throw new Error();
      }
    } catch (error) {
      console.error(error);
      openNotification(
        'danger',
        'Something went wrong while saving content contract details',
      );
    }
  };

  /* HELPER FUNCTIONS */
  const clearSelections = () => {
    setNewContSelRowIds({});
    setLicensedContSelRowIds({});
  };

  /* HELPER FUNCTIONS */
  const initializeSelectorOptions = async () => {
    try {
      const supplierDropResponse = await apiGetSuppliermasterDrop();
      const countryDropResponse = await apiGetCountryDrop();
      const currencyDropResponse = await apiGetCurrencymasterdrop();
      const amortisationDropResponse = await apiGetAmortisationTypeMaster();
      const supplierDropOptions = handleSelectorOptionsResponse(
        supplierDropResponse,
        setSupplierOptions,
        'SupplierCode',
        'SupplierName',
      );
      const countryDropOptions = handleSelectorOptionsResponse(
        countryDropResponse,
        setCountryOptions,
        'CountryCode',
        'CountryName',
      );
      const currencyDropOptions = handleSelectorOptionsResponse(
        currencyDropResponse,
        setCurrencyOptions,
        'CurrencyCode',
        'CurrencyName',
      );
      const amortisationDropOptions = handleSelectorOptionsResponse(
        amortisationDropResponse,
        setAmortisationTypeOptions,
        'AmortisationTypeCode',
        'AmortisationTypeName',
      );
      return {
        supplierDropOptions,
        countryDropOptions,
        currencyDropOptions,
        amortisationDropOptions,
      };
    } catch (error) {
      openNotification(
        'danger',
        'Something went wrong while fetcing selector options',
      );
    }
  };

  const initializePageForEdit = async (selectorOptions) => {
    const {
      supplierDropOptions,
      countryDropOptions,
      currencyDropOptions,
      amortisationDropOptions,
    } = selectorOptions;
    // get contract master details
    const response = await apiGetcontentcontractmasterId(queryParams);
    if (response.status === 200) {
      const contractMasterDetails = response.data;
      setContractMasterDetailsForEdit(contractMasterDetails);
      // set supplier
      const selectedSupplier = supplierDropOptions.filter(
        (option) => option.value === contractMasterDetails.SupplierCode,
      )[0];
      setSelectedSupplier(selectedSupplier);
      // set contract name
      setContractName(contractMasterDetails.ContractName);
      // set authorised person
      setAuthorisedPerson(contractMasterDetails.AuthorisedPerson);
      //set agreement date
      setAgreementDate(new Date(contractMasterDetails.AgreementDate));
      // set budget year
      setBudgetYear(contractMasterDetails.BudgetYear);
      // set country
      const selectedCountry = countryDropOptions.filter(
        (option) => option.value === contractMasterDetails.CountryCode,
      )[0];
      setSelectedCountry(selectedCountry);
      // set state according to country
      const stateDropResponse = await apiGetStateMasterbyId(
        selectedCountry.value,
      );
      const stateDropOptions = handleSelectorOptionsResponse(
        stateDropResponse,
        setStateOptions,
        'StateCode',
        'StateName',
      );
      const selectedState = stateDropOptions.filter(
        (option) => option.value === contractMasterDetails.StateCode,
      )[0];
      setSelectedState(selectedState);
      // set city according to state
      const cityDropResponse = await apiGetPlaceMasterbyId(selectedState.value);
      const cityDropOptions = handleSelectorOptionsResponse(
        cityDropResponse,
        setCityOptions,
        'PlaceCode',
        'PlaceName',
      );
      const selectedCity = cityDropOptions.filter(
        (option) => option.value === contractMasterDetails.PlaceCode,
      )[0];
      setSelectedCity(selectedCity);
      // set currency
      setSelectedCurrency(
        currencyDropOptions.filter(
          (option) => option.value === contractMasterDetails.CurrencyCode,
        )[0],
      );
      // set allContents
      const contractDetailsResponse = await apiCallstoreprocedure(
        'USP_PG_GetContentBySupplierAndContract',
        {
          SupplierCode: selectedSupplier.value,
          ContractCode: Number(queryParams),
        },
      );
      let responseData = [];
      if (contractDetailsResponse.status === 200) {
        responseData = contractDetailsResponse.data;
        setOriginalContentsResponse(contractDetailsResponse.data);
      } else if (contractDetailsResponse.status === 204) {
        openNotification('info', 'No contents found for the selected supplier');
      } else throw new Error();
      setDataForContentsTab(
        responseData,
        setNewContents,
        setLicensedContents,
        isPageEdit,
        amortisationDropOptions,
        contractMasterDetails,
      );
    } else if (response.status === 204)
      openNotification('info', 'No contract details found');
    else throw new Error();
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <h5 className="mb-2">Content Contract Master</h5>
          <Card bodyClass="px-3 pt-3 pb-4" bordered={false}>
            <div className="grid grid-cols-5 gap-4 ">
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1 ">
                  Supplier Name <span className="text-red-700 ">*</span>
                </p>
                <SelectXs
                  options={supplierOptions}
                  value={selectedSupplier}
                  onChange={handleSupplierChange}
                  blurInputOnSelect={true}
                  isDisabled={isPageEdit}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  Contract Name <span className="text-red-700">*</span>
                </p>
                <Input
                  size="sm"
                  placeholder="Contract Name"
                  disabled={fieldDisabledStates.contractName || isPageEdit}
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  Authorised Person <span className="text-red-700">*</span>
                </p>
                <Input
                  size="sm"
                  placeholder="Person Name"
                  disabled={fieldDisabledStates.authorisedPerson}
                  value={authorisedPerson}
                  onChange={(e) => setAuthorisedPerson(e.target.value)}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  Agreement Date <span className="text-red-700">*</span>
                </p>
                <DatePicker
                  placeholder="Date"
                  size="sm"
                  disabled={fieldDisabledStates.agreementDate}
                  value={agreementDate}
                  inputFormat="DD-MMM-YYYY"
                  onChange={handleAgreementDateChange}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  Budget Year <span className="text-red-700">*</span>
                </p>
                <Input
                  disabled={true}
                  size="sm"
                  placeholder="Year"
                  value={budgetYear}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  Country <span className="text-red-700">*</span>
                </p>
                <SelectXs
                  isDisabled={fieldDisabledStates.country}
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  blurInputOnSelect={true}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  State <span className="text-red-700">*</span>
                </p>
                <SelectXs
                  isDisabled={fieldDisabledStates.state}
                  options={stateOptions}
                  value={selectedState}
                  onChange={handleStateChange}
                  blurInputOnSelect={true}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  City <span className="text-red-700">*</span>
                </p>
                <SelectXs
                  isDisabled={fieldDisabledStates.city}
                  options={cityOptions}
                  value={selectedCity}
                  onChange={setSelectedCity}
                  blurInputOnSelect={true}
                />
              </div>
              <div>
                <p className="dark:!text-slate-600 !text-gray-300 mb-1">
                  Currency <span className="text-red-700">*</span>
                </p>
                <SelectXs
                  isDisabled={fieldDisabledStates.currency}
                  options={currencyOptions}
                  value={selectedCurrency}
                  onChange={setSelectedCurrency}
                  blurInputOnSelect={true}
                />
              </div>
            </div>
          </Card>
        </div>
        <div>
          {!selectedSupplier && originalContentsReponse.length === 0 && (
            <Card
              bodyClass="p-3 h-[50vh] flex justify-center items-center"
              bordered={false}
            >
              Please select a supplier to view contents
            </Card>
          )}
          {selectedSupplier && originalContentsReponse.length === 0 && (
            <Card
              bodyClass="p-3 h-[50vh] flex justify-center items-center"
              bordered={false}
            >
              No contents to show for selected supplier
            </Card>
          )}
          {selectedSupplier && originalContentsReponse.length > 0 && (
            <Card bodyClass="p-3 pt-1" bordered={false}>
              <ContentsTabs
                newContents={newContents}
                setNewContents={setNewContents}
                newContSelRowIds={newContSelRowIds}
                setNewContSelRowIds={setNewContSelRowIds}
                licensedContents={licensedContents}
                setLicensedContents={setLicensedContents}
                licensedContSelRowIds={licensedContSelRowIds}
                setLicensedContSelRowIds={setLicensedContSelRowIds}
                countryOptions={countryOptions}
                amortisationTypeOptions={amortisationTypeOptions}
                isAllContractMasterFieldsFilled={!fieldDisabledStates.all}
                clearSelections={clearSelections}
                originalContentsReponse={originalContentsReponse}
                selectedCurrency={selectedCurrency}
              />
            </Card>
          )}
        </div>
      </div>
      <StickyFooter
        className="-mx-6 px-8 flex items-center justify-end gap-2 py-4"
        stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      >
        <Button
          size="sm"
          className="ltr:mr-3 rtl:ml-3"
          onClick={() => navigate('/ContentContractMaster')}
        >
          Back
        </Button>
        <Button
          size="sm"
          variant="solid"
          icon={<AiOutlineSave />}
          type="submit"
          disabled={fieldDisabledStates.saveBtn}
          onClick={handleSave}
        >
          Save
        </Button>
      </StickyFooter>
    </>
  );
}

export default ContentContractDetails;
