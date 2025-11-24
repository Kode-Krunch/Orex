import React from 'react';
import AgencyDetails from './AgencyDetails/AgencyDetails';
import MultipleAddress from './MultipleAddress/MultipleAddress';
import MapExecutives from './MapExecutives';
import MapClients from './MapClients';

function AddAgencyForms({
  step,
  creditRateLimitOptions,
  businessTypeOptions,
  countryOptions,
  stateOptions,
  cityOptions,
  executiveOptions,
  clientOptions,
  setStateOptions,
  setCityOptions,
  fullAddress,
  setFullAddress,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  postalCode,
  setPostalCode,
  erpCode,
  setErpCode,
  isGstRegistered,
  setIsGstRegistered,
  gstNumber,
  setGstNumber,
}) {
  return (
    <>
      {step === 0 && (
        <AgencyDetails
          creditRateLimitOptions={creditRateLimitOptions}
          businessTypeOptions={businessTypeOptions}
        />
      )}
      {step === 1 && (
        <MultipleAddress
          countryOptions={countryOptions}
          stateOptions={stateOptions}
          cityOptions={cityOptions}
          setStateOptions={setStateOptions}
          setCityOptions={setCityOptions}
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
      )}
      {step === 2 && <MapExecutives executiveOptions={executiveOptions} />}
      {step === 3 && <MapClients clientOptions={clientOptions} />}
    </>
  );
}

export default AddAgencyForms;
