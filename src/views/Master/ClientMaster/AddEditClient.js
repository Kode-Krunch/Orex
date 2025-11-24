import { Card, Steps } from 'components/ui';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { Form, Formik } from 'formik';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  getCountryOptions,
  getCreditRateLimitOptions,
  getDataToSubmitForAdd,
  getDataToSubmitForEdit,
  getExecutiveOptions,
  initPageForEdit,
} from './utils';
import Loader from 'views/Controls/Loader';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { formikInitValue, validationSchema } from './constants';
import AddEditClientForms from './components/AddEditClientForms/AddEditClientForms';
import { clientadd } from 'services/MasterService';
import {
  clientcityUpdate,
  clientupdate,
  Postclientempmap,
} from '../../../services/MasterService';

function AddEditClient() {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [step, setStep] = useState(0);
  const [formInitValues, setFormInitValues] = useState(formikInitValue);
  const [editClientDetails, setEditClientDetails] = useState(null);
  const [creditRateLimitOptions, setCreditRateLimitOptions] = useState([]);
  // Address Details
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [executiveOptions, setExecutiveOptions] = useState([]);
  const [fullAddress, setFullAddress] = useState('');
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [isGstRegistered, setIsGstRegistered] = useState(false);
  const [gstNumber, setGstNumber] = useState('');
  // UI States
  const [showLoader, setShowLoader] = useState(false);

  /* HOOKS */
  const navigate = useNavigate();
  const location = useLocation();

  /* USE EFFECTS */
  useEffect(() => {
    (async () => {
      try {
        setShowLoader(true);
        document.querySelector('.page-container').classList.add('!py-3');
        setCreditRateLimitOptions(await getCreditRateLimitOptions());
        setCountryOptions(await getCountryOptions());
        setExecutiveOptions(await getExecutiveOptions());
      } catch (error) {
        console.error(error);
        openNotification('danger', 'Something went wrong while loading page');
      } finally {
        setShowLoader(false);
      }
    })();
    return () =>
      document.querySelector('.page-container').classList.remove('!py-2');
  }, []);

  useEffect(() => {
    if (
      !location.state ||
      creditRateLimitOptions.length === 0 ||
      countryOptions.length === 0
    )
      setFormInitValues(formikInitValue);
    else {
      setEditClientDetails(location.state.clientDetails);
      initPageForEdit(
        location.state.clientDetails,
        creditRateLimitOptions,
        setFormInitValues,
        token,
      );
    }
  }, [location.state, creditRateLimitOptions, countryOptions]);

  /* EVENT HANDLERS */
  const handleSubmit = async (values) => {
    const errorMsg = `Something went wrong while ${
      editClientDetails ? 'saving changes' : 'adding client'
    }`;
    try {
      setShowLoader(true);
      let response;
      if (editClientDetails) {
        let isErrorPresent = false;
        const clientUpdateResponse = await clientupdate(
          editClientDetails.ClientCode,
          getDataToSubmitForEdit(values),
          token,
        );
        const clientUpdateResponseData = await clientUpdateResponse.json();
        if (clientUpdateResponseData.status_code !== '200')
          isErrorPresent = true;
        if (!isErrorPresent) {
          const mappedExecutives = values.mappedExecutives.map((item) => ({
            ClientCode: Number(editClientDetails.ClientCode),
            EmployeeCode: item.value,
            IsActive: 1,
          }));
          const response = await Postclientempmap(mappedExecutives, token);
          if (response.status !== 200) isErrorPresent = true;
        }
        if (!isErrorPresent) {
          const multipleAddresses = values.multipleAddresses.map((address) => ({
            ClientCode: Number(editClientDetails.ClientCode),
            AddressLine1: address.fullAddress,
            AddressLine2: '',
            CountryCode: address.country.value,
            StateCode: address.state.value,
            PlaceCode: address.city.value,
            PinCode: address.postalCode,
            GSTN_id: address.isGstRegistered ? address.gstNumber : '0',
            IsGST_registered: address.isGstRegistered ? 1 : 0,
            IsActive: 1,
          }));
          const response = await clientcityUpdate(multipleAddresses, token);
          const responseData = await response.json();
          if (responseData.code !== '200') isErrorPresent = true;
        }
        if (!isErrorPresent) {
          openNotification('success', 'Client updated successfully');
          navigate('/ClientMaster');
        } else openNotification('danger', errorMsg);
      } else {
        const data = getDataToSubmitForAdd(values);
        response = await clientadd(data, token);
        const responseData = await response.json();
        if (responseData.status_code === '200') {
          openNotification('success', 'Client added successfully');
          navigate('/ClientMaster');
        } else {
          openNotification('danger', errorMsg);
        }
      }
    } catch (error) {
      console.error(error);
      openNotification('danger', errorMsg);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        <h4>{editClientDetails ? 'Edit' : 'Add'} Client</h4>
        <Formik
          initialValues={formInitValues}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grow flex flex-col">
              <Card
                bordered={false}
                className="grow"
                bodyClass="p-3 pb-4 h-full flex flex-col"
              >
                <Steps
                  current={step}
                  className="border-b border-b-gray-700 pb-4"
                >
                  <Steps.Item title="Client Details" />
                  <Steps.Item title="Multiple Addresses" />
                  <Steps.Item title="Map Executive" />
                </Steps>
                <div className="grow h-0 overflow-auto pt-3">
                  <AddEditClientForms
                    step={step}
                    creditRateLimitOptions={creditRateLimitOptions}
                    countryOptions={countryOptions}
                    stateOptions={stateOptions}
                    cityOptions={cityOptions}
                    setStateOptions={setStateOptions}
                    setCityOptions={setCityOptions}
                    executiveOptions={executiveOptions}
                    fullAddress={fullAddress}
                    setFullAddress={setFullAddress}
                    country={country}
                    setCountry={setCountry}
                    state={state}
                    setState={setState}
                    city={city}
                    setCity={setCity}
                    postalCode={postalCode}
                    setPostalCode={setPostalCode}
                    isGstRegistered={isGstRegistered}
                    setIsGstRegistered={setIsGstRegistered}
                    gstNumber={gstNumber}
                    setGstNumber={setGstNumber}
                  />
                </div>
              </Card>
              <Footer step={step} setStep={setStep} className="mt-3" />
            </Form>
          )}
        </Formik>
      </div>
      <Loader showLoader={showLoader} />
    </>
  );
}

export default AddEditClient;
