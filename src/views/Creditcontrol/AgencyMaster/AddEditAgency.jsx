import { Card, Steps } from 'components/ui';
import React, { useEffect, useState } from 'react';
import AddAgencyForms from './components/AddAgencyForms/AddAgencyForms';
import Footer from './components/Footer';
import { Form, Formik } from 'formik';
import { openNotification } from 'views/Controls/GLOBALFUNACTION';
import {
  getBusinessTypeOptions,
  getClientOptions,
  getCountryOptions,
  getCreditRateLimitOptions,
  getDataToSubmit,
  getExecutiveOptions,
  initPageForEdit,
} from './utils';
import Loader from 'views/Controls/Loader';
import { agencyadd, agencyput } from 'services/CreditcontrolService';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { formikInitValue, validationSchema } from './constants';

function AddEditAgency() {
  /* REDUX */
  const token = useSelector((state) => state.auth.session.token);

  /* STATES */
  const [step, setStep] = useState(0);
  const [formInitValues, setFormInitValues] = useState(formikInitValue);
  const [editAgencyDetails, setEditAgencyDetails] = useState(null);
  const [creditRateLimitOptions, setCreditRateLimitOptions] = useState([]);
  const [businessTypeOptions, setBusinessTypeOptions] = useState([]);
  // Address Details
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [executiveOptions, setExecutiveOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [fullAddress, setFullAddress] = useState('');
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [erpCode, setErpCode] = useState('');
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
        setBusinessTypeOptions(await getBusinessTypeOptions());
        setCountryOptions(await getCountryOptions());
        setExecutiveOptions(await getExecutiveOptions());
        setClientOptions(await getClientOptions());
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
      businessTypeOptions.length === 0 ||
      countryOptions.length === 0
    )
      setFormInitValues(formikInitValue);
    else {
      setEditAgencyDetails(location.state.agencyDetails);
      initPageForEdit(
        location.state.agencyDetails,
        creditRateLimitOptions,
        businessTypeOptions,
        setFormInitValues,
      );
    }
  }, [
    location.state,
    creditRateLimitOptions,
    businessTypeOptions,
    countryOptions,
  ]);

  /* EVENT HANDLERS */
  const handleSubmit = async (values) => {
    const errorMsg = `Something went wrong while ${
      editAgencyDetails ? 'saving changes' : 'adding agency'
    }`;
    try {
      setShowLoader(true);
      const data = getDataToSubmit(values);
      let response;
      if (editAgencyDetails)
        response = await agencyput(data, token, editAgencyDetails.AgencyCode);
      else response = await agencyadd(data, token);
      const responseData = await response.json();
      if (responseData.code === '200') {
        openNotification(
          'success',
          editAgencyDetails
            ? 'Agency updated successfully'
            : 'Agency added successfully',
        );
        navigate('/AgencyMaster');
      } else {
        openNotification('danger', errorMsg);
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
        <h4>{editAgencyDetails ? 'Edit' : 'Add'} Agency</h4>
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
                  <Steps.Item title="Agency Details" />
                  <Steps.Item title="Multiple Addresses" />
                  <Steps.Item title="Map Executive" />
                  <Steps.Item title="Map Client" />
                </Steps>
                <div className="grow h-0 overflow-auto pt-3">
                  <AddAgencyForms
                    step={step}
                    creditRateLimitOptions={creditRateLimitOptions}
                    businessTypeOptions={businessTypeOptions}
                    countryOptions={countryOptions}
                    stateOptions={stateOptions}
                    cityOptions={cityOptions}
                    setStateOptions={setStateOptions}
                    setCityOptions={setCityOptions}
                    executiveOptions={executiveOptions}
                    clientOptions={clientOptions}
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
                    erpCode={erpCode}
                    setErpCode={setErpCode}
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

export default AddEditAgency;
