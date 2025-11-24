import React, { memo } from 'react';
import ContractDetails from '../ContractDetails';
import MoviesBroadcastRunDetails from './MoviesBroadcastRunDetails';

function MoviesTab({
  countryOptions,
  amortisationTypeOptions,
  formState,
  setFormState,
  tableData,
  columns,
  eventType,
  selectedCurrency,
}) {
  return (
    <>
      <ContractDetails
        countryOptions={countryOptions}
        amortisationTypeOptions={amortisationTypeOptions}
        formState={formState}
        setFormState={setFormState}
        tableData={tableData}
        columns={columns}
        className="col-span-2"
        eventType={eventType}
        selectedCurrency={selectedCurrency}
      />
      <MoviesBroadcastRunDetails
        formState={formState}
        setFormState={setFormState}
        className="col-span-1"
        eventType={eventType}
      />
    </>
  );
}

export default memo(MoviesTab);
