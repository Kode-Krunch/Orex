import MultipleAddress from './MultipleAddress/MultipleAddress';
import MapExecutives from './MapExecutives';
import ClientDetails from './ClientDetails/ClientDetails';

function AddEditClientForms({
  step,
  creditRateLimitOptions,
  countryOptions,
  stateOptions,
  cityOptions,
  executiveOptions,
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
  isGstRegistered,
  setIsGstRegistered,
  gstNumber,
  setGstNumber,
}) {
  return (
    <>
      {step === 0 && (
        <ClientDetails creditRateLimitOptions={creditRateLimitOptions} />
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
          isGstRegistered={isGstRegistered}
          setIsGstRegistered={setIsGstRegistered}
          gstNumber={gstNumber}
          setGstNumber={setGstNumber}
        />
      )}
      {step === 2 && <MapExecutives executiveOptions={executiveOptions} />}
    </>
  );
}

export default AddEditClientForms;
